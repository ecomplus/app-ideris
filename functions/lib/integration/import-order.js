const ecomUtils = require('@ecomplus/utils')
const { firestore } = require('firebase-admin')
const Ideris = require('../ideris/constructor')
const parseOrder = require('./parsers/order-to-ecomplus/')
const parseStatus = require('./parsers/order-to-ecomplus/status')
const handleJob = require('./handle-job')

module.exports = ({ appSdk, storeId, auth }, iderisLoginToken, queueEntry, appData) => {
  const iderisOrderId = queueEntry.nextId
  const ideris = new Ideris(iderisLoginToken)

  ideris.preparing
    .then(() => {
      const job = ideris.axios.get(`/Pedido/${iderisOrderId}`)
        .then(({ data }) => {
          if (data && Array.isArray(data.result)) {
            const iderisOrder = data.result.find(({ id }) => id === iderisOrderId)
            if (iderisOrder) {
              const listEndpoint = `/orders.json?hidden_metafields.value=${iderisOrderId}_ideris`
              return appSdk.apiRequest(storeId, listEndpoint, 'GET', null, auth)

                .then(({ response }) => {
                  const { result } = response.data
                  if (!result.length) {
                    return appSdk.apiRequest(storeId, '/orders.json', 'POST', parseOrder(iderisOrder), auth)
                  }

                  const { fulfillmentStatus, financialStatus } = parseStatus(iderisOrder)
                  const orderId = result[0]._id
                  const promises = []
                  const data = {
                    _id: ecomUtils.randomObjectId(),
                    date_time: new Date().toISOString(),
                    flags: ['from-ideris']
                  }
                  if (fulfillmentStatus) {
                    data.status = fulfillmentStatus
                    appSdk.apiRequest(storeId, `/orders/${orderId}/fulfillments.json`, 'POST', data, auth)
                  }
                  if (financialStatus) {
                    data.status = financialStatus
                    appSdk.apiRequest(storeId, `/orders/${orderId}/payments_history.json`, 'POST', data, auth)
                  }

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
    })
    .catch(console.error)
}
