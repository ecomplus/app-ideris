const ecomClient = require('@ecomplus/client')
const errorHandling = require('../store-api/error-handling')
const Ideris = require('../ideris/constructor')
const parseProduct = require('./parsers/product-to-ideris')
const handleJob = require('./handle-job')

module.exports = ({ appSdk, storeId }, iderisLoginToken, queueEntry, iderisProductPayload) => {
  const productId = queueEntry.nextId
  return ecomClient.store({
    storeId,
    url: `/products/${productId}.json`
  })

    .then(({ data }) => {
      const product = data
      const ideris = new Ideris(iderisLoginToken)
      const job = ideris.preparing
        .then(() => {
          return ideris.axios.get(`/Produto/?sku=${product.sku}`)
            .catch(err => {
              if (err.response && err.response.status === 400) {
                return { result: [] }
              }
              throw err
            })
            .then(({ data }) => {
              if (Array.isArray(data.result)) {
                const iderisProduct = data.result.find(({ sku }) => sku === product.sku)
                let method
                if (iderisProduct) {
                  iderisProductPayload = {
                    id: iderisProduct.id
                  }
                  method = 'put'
                } else {
                  method = 'post'
                }
                return ideris.axios[method]('/Produto', parseProduct(product, iderisProductPayload))
              }
            })
        })
        .catch(console.error)
      handleJob({ appSdk, storeId }, queueEntry, job)
    })

    .catch(err => {
      errorHandling(err)
      throw err
    })
}
