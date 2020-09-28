const ecomUtils = require('@ecomplus/utils')

module.exports = (product, iderisProductId, appData) => {
  const hasVariations = product.variations && product.variations.length
  let iderisProduct = {
    valorVenda: ecomUtils.price(product),
    quantidadeEstoquePrincipal: product.quantity
  }

  if (!iderisProductId) {
    iderisProduct = {
      categoriaIdIderis: 1,
      subCategoriaIdIderis: 1,
      marcaIdIderis: 1,
      departamentoIdIderis: 8,
      categoriaML: 'MLB3530',
      ...appData.ideris_product_data,
      sku: product.sku,
      titulo: ecomUtils.name(product, 'pt_br').substring(0, 60),
      valorCusto: product.cost_price || 1,
      ...iderisProduct
    }

    iderisProduct.descricaoLonga = product.body_text || product.body_html
    if (iderisProduct.descricaoLonga) {
      iderisProduct.descricaoLonga = iderisProduct.descricaoLonga.substring(0, 5000)
    } else {
      iderisProduct.descricaoLonga = product.short_description || product.name
    }

    if (product.ml_category_id) {
      iderisProduct.categoriaML = product.ml_category_id
    }
    if (product.warranty) {
      iderisProduct.garantia = product.warranty
    }
    if (product.gtin && product.gtin[0]) {
      iderisProduct.ean = product.gtin[0]
    }

    if (product.weight && product.weight.value) {
      iderisProduct.peso = product.weight.value
      switch (product.weight.unit) {
        case 'mg':
          iderisProduct.peso *= 0.001
          break
        case 'kg':
          iderisProduct.peso *= 1000
      }
      iderisProduct.pesoEmbalagem = iderisProduct.peso / 1000
    }
    if (product.dimensions) {
      for (const side in product.dimensions) {
        if (product.dimensions[side] && product.dimensions[side].value) {
          const field = side === 'width' ? 'largura'
            : side === 'height' ? 'altura'
              : 'comprimento'
          iderisProduct[field] = product.dimensions[side].value
          switch (product.dimensions[side].unit) {
            case 'mm':
              iderisProduct[field] *= 0.1
              break
            case 'm':
              iderisProduct[field] *= 100
          }
          iderisProduct[`${field}Embalagem`] = iderisProduct[field] / 100
        }
      }
    }

    if (product.pictures && product.pictures.length) {
      iderisProduct.Imagem = []
      for (let i = 0; i < product.pictures.length && i < 10; i++) {
        const { zoom, big, normal } = product.pictures[i]
        const img = (zoom || big || normal)
        if (img && /\.(jpg|jpeg|png)$/i.test(img.url)) {
          iderisProduct.Imagem.push({
            urlImagem: img.url
          })
        }
      }
    }
  } else {
    iderisProduct.id = iderisProductId
    if (!appData.update_price) {
      delete iderisProduct.valorVenda
    }
    if (hasVariations || !appData.update_quantity) {
      delete iderisProduct.quantidadeEstoquePrincipal
    }
  }

  if (hasVariations && (!iderisProductId || appData.update_quantity)) {
    iderisProduct.Variacao = []
    product.variations.forEach((variation, i) => {
      const iderisVariation = {
        skuVariacao: variation.sku || `${product.sku}-${(i + 1)}`,
        quantidadeVariacao: variation.quantity || product.quantity || 1
      }
      if (!iderisProductId) {
        const spec = Object.keys(variation.specifications)[0]
        iderisVariation.nomeAtributo = spec || 'R'
        iderisVariation.valorAtributo = spec && variation.specifications[spec][0]
          ? variation.specifications[spec][0].text
          : Math.floor(Math.random() * 1000).toString()
        const img = ecomUtils.img(product, variation.picture_id, 'zoom')
        if (img) {
          iderisVariation.Imagem = [{
            urlImagem: img.url
          }]
        }
      }
      iderisProduct.Variacao.push(iderisVariation)
    })
  }

  return iderisProduct
}
