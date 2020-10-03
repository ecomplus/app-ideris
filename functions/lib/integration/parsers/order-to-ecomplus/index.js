const ecomUtils = require('@ecomplus/utils')
const ecomClient = require('@ecomplus/client')
const getStatus = require('./status')

module.exports = (iderisOrder, storeId, appData) => new Promise((resolve, reject) => {
  const buyer = {
    _id: ecomUtils.randomObjectId(),
    locale: 'pt_br',
    main_email: iderisOrder.compradorEmail,
    display_name: iderisOrder.compradorApelido,
    name: {
      family_name: iderisOrder.compradorSobrenome,
      given_name: iderisOrder.compradorPrimeiroNome
    },
    registry_type: iderisOrder.compradorTipoDocumento === 'CNPJ' ? 'j' : 'p'
  }

  if (iderisOrder.compradorDocumento) {
    buyer.doc_number = iderisOrder.compradorDocumento.replace(/\D/g, '')
    buyer.doc_country = 'BR'
  }
  if (iderisOrder.compradorTelefone) {
    buyer.phones = [{
      country_code: 55,
      number: iderisOrder.compradorTelefone.replace(/\D/g, '')
    }]
  }

  const order = {
    source_name: iderisOrder.marketplace
      ? iderisOrder.marketplace.substring(0, 30)
      : 'Ideris',
    code: iderisOrder.codigo,
    opened_at: iderisOrder.data,
    seller_status: iderisOrder.status,
    amount: {
      total: iderisOrder.valorTotalComFrete,
      subtotal: iderisOrder.valorTotal,
      freight: iderisOrder.valorTotalComFrete - iderisOrder.valorTotal
    },
    buyers: [buyer],
    staff_notes: `Pedido importado do Ideris com ID ${iderisOrder.id}`,
    hidden_metafields: [{
      _id: ecomUtils.randomObjectId(),
      namespace: 'ideris',
      field: 'ref_id',
      value: `${iderisOrder.id}_ideris`
    }]
  }

  if (iderisOrder.enderecoEntregaCep) {
    const shippingLine = {
      _id: ecomUtils.randomObjectId(),
      from: {
        zip: '-',
        ...appData.sender_address
      },
      to: {
        zip: iderisOrder.enderecoEntregaCep
      },
      total_price: order.amount.freight
    }

    ;[
      ['enderecoEntregaCompleto', 'line_address'],
      ['enderecoEntregaRua', 'street'],
      ['enderecoEntregaBairro', 'borough'],
      ['enderecoEntregaCidade', 'city'],
      ['enderecoEntregaEstado', 'province'],
      ['enderecoEntregaComentario', 'complement'],
      ['enderecoEntrega_NomeResponsavelRecebimento', 'name']
    ].forEach((iderisField, addressField) => {
      if (iderisOrder[iderisField]) {
        shippingLine.to[addressField] = iderisOrder[iderisField]
      }
    })

    if (parseInt(iderisOrder.enderecoEntregaNumero, 10) >= 1) {
      shippingLine.to.number = parseInt(iderisOrder.enderecoEntregaNumero, 10)
    }
    if (iderisOrder.enderecoEntregaPais === 'Brasil') {
      if (iderisOrder.enderecoEntrega_TelefoneResponsavelRecebimento) {
        shippingLine.to.phone = {
          country_code: 55,
          number: iderisOrder.enderecoEntrega_TelefoneResponsavelRecebimento.replace(/\D/g, '')
        }
      }
    }
    if (iderisOrder.numeroRastreio) {
      shippingLine.tracking_codes = [{
        code: iderisOrder.numeroRastreio
      }]
    }

    const { fulfillmentStatus } = getStatus(iderisOrder)
    if (fulfillmentStatus) {
      shippingLine.status = {
        current: fulfillmentStatus
      }
    }
    order.shipping_lines = [shippingLine]
  }

  if (iderisOrder.tipoEntrega) {
    order.shipping_method_label = `${iderisOrder.tipoEntrega} (Ideris)`
  }

  if (Array.isArray(iderisOrder.Pagamento)) {
    order.transactions = iderisOrder.Pagamento
      .map(({ codigoPagamento, statusPagamento, formaPagamento, numeroParcelasPagamento }) => {
        let methodName, methodCode
        switch (formaPagamento) {
          case 'credit_card':
            methodName = 'Cartão de crédito'
            break
          case 'ticket':
          case 'banking_billet':
            methodName = 'Boleto bancário'
            methodCode = 'banking_billet'
            break
          case 'online_debit':
            methodName = 'Débito online'
            break
          case 'account_deposit':
            methodName = 'Depósito em conta'
            break
          case 'debit_card':
            methodName = 'Cartão de débito'
            break
          case 'balance_on_intermediary':
          case 'account_money':
            methodName = 'Crédito no intermediador'
            methodCode = 'balance_on_intermediary'
            break
          case 'loyalty_points':
            methodName = 'Pontos'
            break
          default:
            methodName = formaPagamento
            methodCode = 'other'
        }

        methodName += ' (Ideris)'
        if (!order.payment_method_label) {
          order.payment_method_label = methodName
        }

        const transaction = {
          _id: ecomUtils.randomObjectId(),
          amount: iderisOrder.valorTotalComFrete / iderisOrder.Pagamento.length,
          intermediator: {
            transaction_code: codigoPagamento,
            payment_method: {
              code: formaPagamento,
              name: methodName
            }
          },
          status: {
            current: getStatus(iderisOrder, statusPagamento).financialStatus || 'unknown'
          },
          payment_method: {
            name: methodName,
            code: methodCode || formaPagamento
          }
        }

        if (numeroParcelasPagamento >= 2) {
          transaction.installments = {
            number: numeroParcelasPagamento
          }
        }
        return transaction
      })
  }

  order.items = []
  if (Array.isArray(iderisOrder.Item)) {
    return Promise.all(iderisOrder.Item.map(({
      skuProdutoItem,
      tituloProdutoItem,
      codigoProdutoItem,
      caminhoImagemItem,
      quantidadeItem,
      precoUnitarioItem
    }) => {
      let query = `sku:"${skuProdutoItem}" OR variations.sku:"${skuProdutoItem}"`
      if (/-\d{0,2}$/.test(skuProdutoItem)) {
        query += ` OR sku:"${skuProdutoItem.replace(/-\d{0,2}$/, '')}"`
      }

      ecomClient.search({
        url: `/items.json?q=${encodeURIComponent(query)}`
      }).then(({ data }) => {
        const item = {
          _id: ecomUtils.randomObjectId(),
          name: tituloProdutoItem,
          sku: skuProdutoItem,
          quantity: quantidadeItem,
          price: precoUnitarioItem,
          final_price: precoUnitarioItem,
          flags: [`ideris-${codigoProdutoItem}`.substring(0, 20)]
        }
        if (caminhoImagemItem) {
          item.picture = {
            zoom: {
              url: caminhoImagemItem
            }
          }
        }

        if (Array.isArray(data.hits.hits) && data.hits.hits.length) {
          const { _id, sku, variations } = (
            data.hits.hits.find(({ _source }) => _source.sku === skuProdutoItem) ||
            data.hits.hits[0]
          )._source
          item.product_id = _id
          if (sku !== skuProdutoItem && variations) {
            const variation = variations.find(({ sku }) => sku === skuProdutoItem)
            if (variation) {
              item.variation_id = variation._id
            }
          }
        } else {
          item.product_id = ecomUtils.randomObjectId()
        }

        order.items.push(item)
      })
    })).then(() => resolve(order)).catch(reject)
  }

  resolve(order)
})
