const ecomUtils = require('@ecomplus/utils')
const axios = require('axios')
const FormData = require('form-data')

const removeAccents = str => str.replace(/áàãâÁÀÃÂ/g, 'a')
  .replace(/éêÉÊ/g, 'e')
  .replace(/óõôÓÕÔ/g, 'o')
  .replace(/íÍ/g, 'e')
  .replace(/úÚ/g, 'u')
  .replace(/çÇ/g, 'c')

const tryImageUpload = (storeId, auth, originImgUrl, product) => new Promise(resolve => {
  axios.get(originImgUrl, {
    responseType: 'arraybuffer'
  })
    .then(({ data }) => {
      const form = new FormData()
      form.append('file', Buffer.from(data), originImgUrl.replace(/.*\/([^/]+)$/, '$1'))

      return axios.post(`https://apx-storage.e-com.plus/${storeId}/api/v1/upload.json`, form, {
        headers: {
          ...form.getHeaders(),
          'X-Store-ID': storeId,
          'X-My-ID': auth.myId,
          'X-Access-Token': auth.accessToken
        }
      })

        .then(({ data, status }) => {
          if (data.picture) {
            for (const imgSize in data.picture) {
              if (data.picture[imgSize] && data.picture[imgSize].size !== undefined) {
                delete data.picture[imgSize].size
              }
            }
            resolve({
              _id: ecomUtils.randomObjectId(),
              ...data.picture
            })
          }
          const err = new Error('Unexpected Storage API response')
          err.response = { data, status }
          throw err
        })
    })

    .catch(err => {
      console.error(err)
      resolve({
        _id: ecomUtils.randomObjectId(),
        zoom: {
          url: originImgUrl,
          alt: product.name
        }
      })
    })
}).then(picture => {
  if (product && product.pictures) {
    product.pictures.push(picture)
  }
  return picture
})

module.exports = (iderisProduct, storeId, auth) => new Promise((resolve, reject) => {
  const name = iderisProduct.titulo.trim()
  let slug = removeAccents(name.toLowerCase())
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_./]/g, '')
  if (/[a-z0-9]/.test(slug.charAt(0))) {
    slug = `p-${slug}`
  }

  const product = {
    sku: iderisProduct.sku,
    name,
    slug,
    cost_price: iderisProduct.valorCusto,
    price: iderisProduct.valorVenda,
    quantity: iderisProduct.quantidadeEstoquePrincipal
  }

  if (iderisProduct.descricaoLonga) {
    const descriptionField = iderisProduct.descricaoLonga.charAt(0) === '<' ? 'body_html' : 'body_text'
    product[descriptionField] = iderisProduct.descricaoLonga
  }
  if (iderisProduct.categoriaML) {
    product.ml_category_id = iderisProduct.categoriaML
  }
  if (iderisProduct.garantia) {
    product.warranty = iderisProduct.garantia
  }
  if (iderisProduct.ean) {
    product.gtin = [iderisProduct.ean]
  }

  const weight = (iderisProduct.pesoEmbalagem && iderisProduct.pesoEmbalagem * 1000) || iderisProduct.peso
  if (weight > 0) {
    product.weight = {
      unit: 'g',
      value: parseFloat(weight)
    }
  }

  ;[
    ['largura', 'width'],
    ['altura', 'height'],
    ['comprimento', 'length']
  ].forEach(([lado, side]) => {
    const dimension = (iderisProduct[`${lado}Embalagem`] && iderisProduct[`${lado}Embalagem`] * 100) ||
      iderisProduct[lado]
    if (dimension > 0) {
      if (!product.dimensions) {
        product.dimensions = {}
      }
      product.dimensions[side] = {
        unit: 'cm',
        value: dimension
      }
    }
  })

  if (Array.isArray(iderisProduct.Variacao) && iderisProduct.Variacao.length) {
    product.variations = []
    iderisProduct.Variacao.forEach(({
      skuVariacao,
      quantidadeVariacao,
      Combinacao
    }) => {
      if (Combinacao && Combinacao.length) {
        const specText = Combinacao[0].descricao
        if (specText) {
          const gridId = removeAccents(Combinacao[0].tipoVariacao.toLowerCase())
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '')
            .substring(0, 30)

          if (gridId.length >= 2) {
            const variation = {
              _id: ecomUtils.randomObjectId(),
              name: `${name} / ${specText}`.substring(0, 100),
              sku: skuVariacao,
              quantity: quantidadeVariacao,
              specifications: {
                [gridId]: [{
                  text: specText
                }]
              }
            }
            if (gridId !== 'colors') {
              variation.specifications[gridId][0].value = removeAccents(specText.toLowerCase())
                .substring(0, 100)
            }
            product.variations.push(variation)
          }
        }
      }
    })
  }

  if (iderisProduct.caminhoImagem && typeof iderisProduct.caminhoImagem === 'string') {
    product.pictures = []
    return tryImageUpload(storeId, auth, iderisProduct.caminhoImagem, product)
      .finally(() => {
        if (product.variations && product.variations.length) {
          const promises = []
          for (let i = 0; i < iderisProduct.Variacao.length && promises.length < 7; i++) {
            const { caminhoImagemVariacao } = iderisProduct.Variacao[i]
            if (
              caminhoImagemVariacao &&
              typeof caminhoImagemVariacao === 'string' &&
              product.variations[i] &&
              caminhoImagemVariacao !== iderisProduct.caminhoImagem
            ) {
              promises.push(new Promise(resolve => setTimeout(() => {
                tryImageUpload(storeId, auth, caminhoImagemVariacao, product).then(({ _id }) => {
                  product.variations[i].picture_id = _id
                  resolve()
                })
              }, (promises.length + 1) * 2000)))
            }
          }

          Promise.all(promises).then(() => resolve(product))
        } else {
          resolve(product)
        }
      })
  }

  resolve(product)
})
