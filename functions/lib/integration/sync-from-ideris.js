const { firestore } = require('firebase-admin')
const ecomClient = require('@ecomplus/client')
const { setup } = require('@ecomplus/application-sdk')
const getAppData = require('../store-api/get-app-data')
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

const fetchItemBySku = (storeId, sku) => ecomClient.search({
  storeId,
  url: '/items.json',
  data: {
    query: {
      bool: {
        should: [{
          term: { sku }
        }, {
          nested: {
            path: 'variations',
            query: {
              bool: {
                filter: [{
                  term: { 'variations.sku': sku }
                }]
              }
            }
          }
        }]
      }
    }
  }
}).then(({ data }) => {
  const hit = Array.isArray(data.hits.hits) && data.hits.hits[0] && data.hits.hits[0]
  if (hit) {
    const { _id, _source } = hit
    return {
      _id,
      ..._source
    }
  }
  return null
})

const fetchIderisUpdates = ({ appSdk, storeId }) => {
  return new Promise((resolve, reject) => {
    getAppData({ appSdk, storeId })
      .then(appData => {
        resolve()

        const iderisLoginToken = appData.ideris_login_token
        if (typeof iderisLoginToken === 'string' && iderisLoginToken) {
          const documentRef = firestore().doc(`ideris_last_update/${storeId}_${iderisLoginToken}`)
          const ideris = new Ideris(iderisLoginToken)
          ideris.preparing
            .then(() => documentRef.get())

            .then(documentSnapshot => {
              let lastDate, lastId
              if (documentSnapshot.exists) {
                lastDate = documentSnapshot.get('dataHora')
                lastId = documentSnapshot.get('idInternoProduto')
              }

              return ideris.axios.get('/MovimentoProduto?horasRetroativas=6')
                .then(({ data }) => {
                  // console.log(`> #${storeId} sync ${JSON.stringify(data)}`)
                  if (data && Array.isArray(data.result)) {
                    const iderisUpdates = []
                    data.result
                      .sort((a, b) => {
                        return a.dataHora < b.dataHora
                          ? -1
                          : a.dataHora > b.dataHora ? 1 : 0
                      })
                      .forEach(iderisUpdate => {
                        const { dataHora, idInternoProduto } = iderisUpdate
                        if (
                          lastDate > dataHora ||
                          (lastDate === dataHora && idInternoProduto === lastId)
                        ) {
                          return
                        }
                        const savedUpdateById = iderisUpdates.find(({ idInternoProduto }) => {
                          return idInternoProduto === iderisUpdate.idInternoProduto
                        })
                        if (!savedUpdateById) {
                          iderisUpdates.push(iderisUpdate)
                        } else if (savedUpdateById.dataHora <= dataHora) {
                          Object.assign(savedUpdateById, iderisUpdate)
                        }
                      })

                    if (iderisUpdates.length) {
                      const skus = iderisUpdates.map(({ skuPrincipal }) => skuPrincipal).join()
                      console.log(`> #${storeId} sync SKUs '${skus}'`)
                      return appSdk.getAuth(storeId).then(async auth => {
                        let lastIderisOrder
                        for (let i = 0; i < iderisUpdates.length && i < 20; i++) {
                          const { skuPrincipal, qtdeAtual } = iderisUpdates[i]
                          try {
                            const item = await fetchItemBySku(storeId, skuPrincipal)
                            if (item) {
                              let quantity = parseInt(qtdeAtual, 10)
                              if (!quantity || quantity < 0) {
                                quantity = 0
                              }
                              const variation = item.variations && item.variations
                                .find(({ sku }) => sku === skuPrincipal)
                              let endpoint = `/products/${item._id}`
                              if (variation) {
                                endpoint += `/variations/${variation._id}`
                              }
                              endpoint += '/quantity.json'
                              await appSdk.apiRequest(storeId, endpoint, 'PUT', { quantity }, auth)
                              console.log(`> #${storeId} updated SKU '${skuPrincipal}'`)
                              lastIderisOrder = iderisUpdates[i]
                            }
                          } catch (err) {
                            console.error(err)
                            i = 999
                          }
                        }

                        if (lastIderisOrder) {
                          return documentRef.set(lastIderisOrder)
                        }
                      })
                    }
                  }
                })
            })

            .catch(err => {
              const { response, config } = err
              if (response && response.status === 401 && config && config.url.endsWith('/Login')) {
                console.log(`> Unauthorized Ideris token #${storeId} ${iderisLoginToken}`)
              } else {
                console.error(err)
              }
            })
        }
      })
      .catch(reject)
  })
}

module.exports = context => setup(null, true, firestore())
  .then(appSdk => {
    return listStoreIds().then(storeIds => {
      const runAllStores = fn => storeIds
        .sort(() => Math.random() - Math.random())
        .map(storeId => fn({ appSdk, storeId }))
      return Promise.all(runAllStores(fetchIderisUpdates))
    })
  })
  .catch(console.error)
