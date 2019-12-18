import fetch from 'request/oldFetch'

export const apiWithdrawList = (listForm) => {
  return fetch({
    url: 'withdraw/list',
    method: "post",
    data: listForm
  })
}

export const apiRecordslist = (listForm) => {
  return fetch({
    url: 'rechargeRecords/list',
    method: "post",
    data: listForm
  })
}

export const apiGetMerchantComb = (listForm) => {
  return fetch({
    url: 'rechargeRecords/getMerchantComb',
    method: "post",
    data: listForm
  })
}

export const apiRechargeStatusComb = (listForm) => {
  return fetch({
    url: 'rechargeRecords/getRechargeStatusComb',
    method: "post",
    data: listForm
  })
}

export const apiWithdrawExport = (listForm) => {
  return fetch({
    url: 'withdraw/withdrawExport',
    method: "post",
    data: listForm,
    responseType: 'blob'
  })
}

export const apiWithdrawStatusComb = (listForm) => {
  return fetch({
    url: 'withdraw/getWithdrawStatusComb',
    method: "post",
    data: listForm
  })
}

export const apiRechargeExport = (listForm) => {
  return fetch({
    url: 'rechargeRecords/rechargeExport',
    method: "post",
    data: listForm,
    responseType: 'blob'
  })
}
