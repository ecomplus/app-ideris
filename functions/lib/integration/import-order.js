const ecomUtils = require('@ecomplus/utils')
const { firestore } = require('firebase-admin')
const Ideris = require('../ideris/constructor')
const parseOrder = require('./parsers/order-to-ecomplus/')
const parseStatus = require('./parsers/order-to-ecomplus/status')
const handleJob = require('./handle-job')

const getLastStatusRecord = records => {
  let statusRecord
  records.forEach(record => {
    if (record && (!statusRecord || !record.date_time || record.date_time >= statusRecord.date_time)) {
      statusRecord = record
    }
  })
  return statusRecord
}

module.exports = ({ appSdk, storeId, auth }, iderisLoginToken, queueEntry, appData) => new Promise(resolve => {
  const iderisOrderId = queueEntry.nextId
  const ideris = new Ideris(iderisLoginToken)

  ideris.preparing
    .then(() => {
      const job = ideris.axios.get(`/Pedido/${iderisOrderId}`)
        .then(({ data }) => {
          if (data && Array.isArray(data.result)) {
            const iderisOrder = data.result.find(({ id }) => id === iderisOrderId)
            if (iderisOrder) {
              const listEndpoint = `/orders.json?hidden_metafields.value=${iderisOrderId}_ideris` +
                '&fields=_id,payments_history,fulfillments'
              return appSdk.apiRequest(storeId, listEndpoint, 'GET', null, auth)

                .then(({ response }) => {
                  const { result } = response.data
                  if (!result.length) {
                    return appSdk.apiRequest(storeId, '/orders.json', 'POST', parseOrder(iderisOrder), auth)
                  }

                  const { fulfillmentStatus, financialStatus } = parseStatus(iderisOrder)
                  const order = result[0]
                  const promises = []
                  const data = {
                    _id: ecomUtils.randomObjectId(),
                    date_time: new Date().toISOString(),
                    flags: ['from-ideris']
                  }
                  ;[
                    [financialStatus, 'payments_history'],
                    [fulfillmentStatus, 'fulfillments']
                  ].forEach(([newStatus, subresource]) => {
                    if (
                      newStatus &&
                      (!order[subresource] || getLastStatusRecord(order[subresource]) !== financialStatus)
                    ) {
                      data.status = newStatus
                      appSdk.apiRequest(storeId, `/orders/${order._id}/${subresource}.json`, 'POST', data, auth)
                    }
                  })

                  return Promise.all(promises)
                })

                .then(payload => {
                  try {
                    firestore()
                      .doc(`ideris_orders/${storeId}_${iderisOrderId}`)
                      .set({
                        storeId,
                        iderisOrder,
                        updatedAt: firestore.Timestamp.fromDate(new Date())
                      })
                  } catch (err) {
                    console.error(err)
                  }
                  return payload
                })
            }
            return null
          }
        })
      handleJob({ appSdk, storeId }, queueEntry, job)
      job.then(payload => console.log(`> Import order job: ${JSON.stringify(payload)}`)).catch(console.error)
    })
    .catch(console.error)
    .finally(resolve)
})
