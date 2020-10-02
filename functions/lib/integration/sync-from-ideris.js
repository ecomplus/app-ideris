const { firestore } = require('firebase-admin')
const { setup } = require('@ecomplus/application-sdk')
const getAppData = require('../store-api/get-app-data')
const updateAppData = require('./../../lib/store-api/update-app-data')
const Ideris = require('../ideris/constructor')

const listStoreIds = () => {
  const storeIds = []
  const date = new Date()
  date.setHours(date.getHours() - 24)

  return firestore()
    .collection('ecomplus_app_auth')
    .where('updated_at', '>', firestore.Timestamp.fromDate(date))
    .get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const storeId = documentSnapshot.get('store_id')
        if (storeIds.indexOf(storeId) === -1) {
          storeIds.push(storeId)
        }
      })
      return storeIds
    })
}

const fetchNewIderisOrders = ({ appSdk, storeId }) => {
  return new Promise((resolve, reject) => {
    getAppData({ appSdk, storeId })
      .then(appData => {
        resolve()

        const iderisLoginToken = appData.ideris_login_token
        if (typeof iderisLoginToken === 'string' && iderisLoginToken) {
          const documentRef = firestore().doc(`ideris_last_order/${storeId}_${iderisLoginToken}`)
          const ideris = new Ideris(iderisLoginToken)
          ideris.preparing
            .then(() => documentRef.get())

            .then(documentSnapshot => {
              let dateStart, lastId
              if (documentSnapshot.exists) {
                dateStart = new Date(documentSnapshot.get('data'))
                lastId = documentSnapshot.get('id')
              } else {
                dateStart = new Date()
                dateStart.setMinutes(dateStart.getMinutes() - 5)
              }

              return ideris.axios.get(`/ListaPedido?dataInicial=${dateStart.toISOString()}`)
                .then(({ data }) => {
                  if (data && Array.isArray(data.result)) {
                    let iderisIds = appData.importation && appData.importation.order_ids
                    if (!Array.isArray(iderisIds)) {
                      iderisIds = []
                    }
                    data.result.forEach(({ id }) => {
                      if ((!lastId || lastId < id) && iderisIds.indexOf(String(id)) === -1) {
                        iderisIds.push(String(id))
                      }
                    })
                    if (iderisIds.length) {
                      const promise = iderisIds.length >= 7
                        ? queueImportOrders({ appSdk, storeId }, iderisIds)
                        : updateSavedOrders({ appSdk, storeId }, ideris, iderisIds)
                      return promise.then(() => documentRef.set(data.result[data.result.length - 1]))
                    } else {
                      return updateSavedOrders({ appSdk, storeId }, ideris)
                    }
                  }
                })
            })

            .catch(console.error)
        }
      })
      .catch(reject)
  })
}

const updateSavedOrders = ({ appSdk, storeId }, ideris, iderisIds = []) => {
  return firestore()
    .collection('ideris_orders')
    .where('storeId', '==', storeId).orderBy('updatedAt', 'asc').limit(20).get()

    .then(querySnapshot => {
      const updateIderisIds = []
      querySnapshot.forEach(documentSnapshot => {
        const { iderisOrder } = documentSnapshot.data()
        const timestamp = Date.now()
        const orderUpdateTime = new Date(iderisOrder.data).getTime()
        if (
          iderisOrder &&
          iderisOrder.id &&
          timestamp - orderUpdateTime <= 60 * 24 * 60 * 60 * 1000
        ) {
          const id = String(iderisOrder.id)
          if (
            iderisIds.indexOf(id) === -1 &&
            updateIderisIds.indexOf(id) === -1 &&
            timestamp - orderUpdateTime >= 10 * 60 * 1000
          ) {
            updateIderisIds.push(id)
          }
        } else {
          documentSnapshot.ref.delete().catch(console.error)
        }
      })

      if (updateIderisIds.length) {
        return ideris.axios.get(`/Pedido?ids=${updateIderisIds.join(',')}`)
          .then(({ data }) => {
            if (data && Array.isArray(data.result)) {
              const promises = []
              let countUpdateIds = 0
              data.result.forEach(({ id, status }) => {
                const promise = firestore().doc(`ideris_orders/${storeId}_${id}`)
                  .get().then(documentSnapshot => {
                    if (
                      documentSnapshot.exists &&
                      documentSnapshot.get('iderisOrder.status') === status
                    ) {
                      return null
                    }
                    if (countUpdateIds < 7) {
                      iderisIds.push(String(id))
                      countUpdateIds++
                    }
                    return true
                  })
                promises.push(promise)
              })
              return Promise.all(promises)
            }
          })
      }
      return true
    })

    .then(() => queueImportOrders({ appSdk, storeId }, iderisIds))
}

const queueImportOrders = (appSession, iderisIds) => {
  if (iderisIds && iderisIds.length) {
    return updateAppData(appSession, {
      importation: {
        __order_ids: iderisIds
      }
    })
  }
  return Promise.resolve(null)
}

module.exports = context => setup(null, true, firestore())
  .then(appSdk => {
    return listStoreIds().then(storeIds => {
      const runAllStores = fn => storeIds
        .sort(() => Math.random() - Math.random())
        .map(storeId => fn({ appSdk, storeId }))
      return Promise.all(runAllStores(fetchNewIderisOrders))
    })
  })
  .catch(console.error)
