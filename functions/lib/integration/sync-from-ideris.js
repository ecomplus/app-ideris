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
        return storeIds
      })
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
                      return updateAppData({ appSdk, storeId }, {
                        importation: {
                          order_ids: iderisIds
                        }
                      }).then(() => documentRef.set(data.result[data.result.length - 1]))
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

module.exports = context => {
  setup(null, true, firestore())
    .then(appSdk => {
      return listStoreIds().then(storeIds => {
        return Promise.all(
          storeIds.sort(() => Math.random() - Math.random())
            .map(storeId => fetchNewIderisOrders({ appSdk, storeId }))
        )
      })
    })
    .catch(console.error)
}
