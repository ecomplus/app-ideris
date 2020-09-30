const ecomClient = require('@ecomplus/client')
const Ideris = require('../ideris/constructor')
const parseProduct = require('./parsers/product-to-ecomplus')
const handleJob = require('./handle-job')

module.exports = ({ appSdk, storeId, auth }, iderisLoginToken, queueEntry, appData) => {
  const sku = queueEntry.nextId
  return ecomClient.search({
    url: `/items.json?q=${encodeURIComponent(`sku:"${sku}"`)}`
  }).then(({ data }) => {
    const productId = Array.isArray(data.hits.hits) && data.hits.hits[0] && data.hits.hits[0]._id
    const ideris = new Ideris(iderisLoginToken)

    ideris.preparing
      .then(() => {
        const job = ideris.axios.get(`/Produto/?sku=${sku}`)
          .then(({ data }) => {
            if (data && Array.isArray(data.result)) {
              const iderisProduct = data.result.find(iderisProduct => sku === iderisProduct.sku)
              if (iderisProduct) {
                const endpoint = productId ? `/products/${productId}.json` : '/products.json'
                const method = productId ? 'PATCH' : 'POST'
                return parseProduct(iderisProduct, storeId, auth).then(product => {
                  // console.log(JSON.stringify(product))
                  return appSdk.apiRequest(storeId, endpoint, method, product, auth)
                })
              }
            }
            throw new Error('Ideris product not found')
          })
        handleJob({ appSdk, storeId }, queueEntry, job)
      })
      .catch(console.error)
  })
}
