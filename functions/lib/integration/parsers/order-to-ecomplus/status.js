const parsePaymentStatus = iderisPaymentStatus => {
  switch (iderisPaymentStatus) {
    case 'pending':
    case 'under_analysis':
    case 'authorized':
    case 'unauthorized':
    case 'paid':
    case 'voided':
    case 'in_dispute':
    case 'refunded':
      return iderisPaymentStatus
    case 'approved':
      return 'paid'
    case 'canceled':
    case 'cancelled':
      return 'voided'
    case 'open':
      return 'pending'
    case 'analysis':
      return 'under_analysis'
    case 'dispute':
      return 'in_dispute'
  }
}

module.exports = (iderisOrder, iderisPaymentStatus) => {
  let financialStatus, fulfillmentStatus
  const { status } = iderisOrder
  if (/aprovado/i.test(status)) {
    financialStatus = 'paid'
  } else if (/separação/i.test(status)) {
    fulfillmentStatus = 'in_separation'
  } else if (/expedi/i.test(status)) {
    fulfillmentStatus = 'ready_for_shipping'
  } else if (/transito/i.test(status)) {
    fulfillmentStatus = 'shipped'
  } else if (/entregue/i.test(status)) {
    fulfillmentStatus = 'delivered'
  } else if (/cancelado/i.test(status)) {
    financialStatus = 'voided'
  } else if (/pagamento pend/i.test(status)) {
    financialStatus = 'pending'
  } else if (/vencido/i.test(status)) {
    financialStatus = 'voided'
  } else if (/devolução/i.test(status)) {
    financialStatus = 'refunded'
    fulfillmentStatus = 'returned'
  } else if (/troca/i.test(status)) {
    fulfillmentStatus = 'returned_for_exchange'
  }

  if (!financialStatus) {
    if (!iderisPaymentStatus && Array.isArray(iderisOrder.Pagamento) && iderisOrder.Pagamento.length) {
      iderisPaymentStatus = iderisOrder.Pagamento[0].statusPagamento
    }
    financialStatus = parsePaymentStatus(iderisPaymentStatus)
  }

  return { financialStatus, fulfillmentStatus }
}
