const ecomClient = require('@ecomplus/client')
const errorHandling = require('../store-api/error-handling')
const Ideris = require('../ideris/constructor')
const parseProduct = require('./parsers/product-to-ideris')
const handleJob = require('./handle-job')

module.exports = ({ appSdk, storeId }, iderisLoginToken, queueEntry, appData) => {
  const productId = queueEntry.nextId
  return ecomClient.store({
    storeId,
    url: `/products/${productId}.json`
  })

    .then(({ data }) => {
      const product = data
      const ideris = new Ideris(iderisLoginToken)

      ideris.preparing
        .then(() => {
          const job = ideris.axios.get(`/Produto/?sku=${product.sku}`)
            .catch(err => {
              if (err.response && err.response.status === 400) {
                return {}
              }
              throw err
            })

            .then(({ data }) => {
              let iderisProductId
              if (data && Array.isArray(data.result)) {
                const iderisProduct = data.result.find(({ sku }) => sku === product.sku)
                if (iderisProduct) {
                  iderisProductId = iderisProduct.id
                }
              }
              return ideris.axios[iderisProductId ? 'put' : 'post'](
                '/Produto',
                parseProduct(product, iderisProductId, appData)
              )
            })
          handleJob({ appSdk, storeId }, queueEntry, job)
        })
        .catch(console.error)
    })

    .catch(err => {
      errorHandling(err)
      throw err
    })
}
