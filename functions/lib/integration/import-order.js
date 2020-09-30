const { firestore } = require('firebase-admin')
const Ideris = require('../ideris/constructor')
const parseOrder = require('./parsers/order-to-ecomplus/')
const parseStatus = require('./parsers/order-to-ecomplus/status')
const handleJob = require('./handle-job')

const getLastStatus = records => {
  let statusRecord
  records.forEach(record => {
    if (record && (!statusRecord || !record.date_time || record.date_time >= statusRecord.date_time)) {
      statusRecord = record
    }
  })
  return statusRecord && statusRecord.status
}

module.exports = ({ appSdk, storeId, auth }, iderisLoginToken, queueEntry, appData) => new Promise(resolve => {
  const iderisOrderId = queueEntry.nextId
  const ideris = new Ideris(iderisLoginToken)

  ideris.preparing
    .then(() => {
      const job = ideris.axios.get(`/Pedido/${iderisOrderId}`)
        .then(({ data }) => {
          if (data && Array.isArray(data.result)) {
            const iderisOrder = data.result.find(({ id }) => String(id) === String(iderisOrderId))
            if (iderisOrder) {
              const documentRef = firestore().doc(`ideris_orders/${storeId}_${iderisOrderId}`)
              return documentRef.get().then(documentSnapshot => {
                if (
                  documentSnapshot.exists &&
                  documentSnapshot.get('iderisOrder.status') === iderisOrder.status
                ) {
                  // console.log(`> Skipping Ideris order ${iderisOrderId}`)
                  return null
                }

                const listEndpoint = `/orders.json?hidden_metafields.value=${iderisOrderId}_ideris` +
                  '&fields=_id,payments_history,fulfillments'
                return appSdk.apiRequest(storeId, listEndpoint, 'GET', null, auth)

                  .then(({ response }) => {
                    const { result } = response.data
                    if (!result.length) {
                      return parseOrder(iderisOrder, storeId, appData).then(order => {
                        return appSdk.apiRequest(storeId, '/orders.json', 'POST', order, auth)
                      })
                    }

                    const { fulfillmentStatus, financialStatus } = parseStatus(iderisOrder)
                    const order = result[0]
                    const promises = []
                    const data = {
                      date_time: new Date().toISOString(),
                      flags: ['from-ideris']
                    }
                    ;[
                      [financialStatus, 'payments_history'],
                      [fulfillmentStatus, 'fulfillments']
                    ].forEach(([newStatus, subresource]) => {
                      if (
                        newStatus &&
                        (!order[subresource] || getLastStatus(order[subresource]) !== financialStatus)
                      ) {
                        data.status = newStatus
                        const endpoint = `/orders/${order._id}/${subresource}.json`
                        promises.push(appSdk.apiRequest(storeId, endpoint, 'POST', data, auth))
                      }
                    })

                    return Promise.all(promises).then(([firstResult]) => firstResult)
                  })

                  .then(payload => {
                    try {
                      documentRef.set({
                        storeId,
                        iderisOrder,
                        updatedAt: firestore.Timestamp.fromDate(new Date())
                      })
                    } catch (err) {
                      console.error(err)
                    }
                    return (payload && payload.response) || payload
                  })
              })
            }
          }
          throw new Error('Ideris order not found')
        })
      handleJob({ appSdk, storeId }, queueEntry, job)
    })
    .catch(console.error)
    .finally(resolve)
})
