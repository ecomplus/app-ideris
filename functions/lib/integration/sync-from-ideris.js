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
                dateStart.setMinutes(dateStart.getMinutes() - 3)
              }

              return ideris.axios.get(`/ListaPedido?dataInicial=${dateStart.toISOString()}`)
                .then(({ data }) => {
                  if (data && Array.isArray(data.result)) {
                    let iderisIds = appData.importation && appData.importation.order_ids
                    if (!Array.isArray(iderisIds)) {
                      iderisIds = []
                    }
                    data.result.forEach(({ id }) => {
                      if (!lastId || lastId < id) {
                        iderisIds.push(String(id))
                      }
                    })
                    if (iderisIds.length) {
                      return updateSavedOrders({ appSdk, storeId }, iderisIds)
                        .then(() => documentRef.set(data.result[data.result.length - 1]))
                    } else {
                      return updateSavedOrders({ appSdk, storeId })
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

const updateSavedOrders = ({ appSdk, storeId }, iderisIds = []) => {
  return firestore()
    .collection('ideris_orders')
    .where('storeId', '==', storeId).orderBy('updatedAt', 'asc').limit(6).get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const { iderisOrder } = documentSnapshot.data()
        if (
          iderisOrder &&
          iderisOrder.id &&
          Date.now() - new Date(iderisOrder.data).getTime() <= 60 * 24 * 60 * 60 * 1000
        ) {
          iderisIds.push(String(iderisOrder.id))
        } else {
          documentSnapshot.ref.delete().catch(console.error)
        }
      })
      return queueImportOrders({ appSdk, storeId }, iderisIds)
    })
}

const queueImportOrders = (appSession, iderisIds) => {
  if (iderisIds && iderisIds.length) {
    return updateAppData(appSession, {
      importation: {
        order_ids: iderisIds
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
