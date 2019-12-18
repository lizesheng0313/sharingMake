import fetch from 'request/oldFetch'

export const apiAllAcount = () => {
  return fetch({
    url: 'account/getAllAcount',
    method: "post"
  })
}

export const apiBankAndType = () => {
  return fetch({
    url: 'account/getBankAndType',
    method: "post"
  })
}

export const apiCreateAccount = (accountForm) => {
  return fetch({
    url: 'account/createAccount',
    method: "post",
    data: accountForm
  })
}

export const apiAccountInfo = (accountInfoForm) => {
  return fetch({
    url: 'account/getAccountInfo',
    method: "post",
    data: accountInfoForm
  })
}

export const apiUpdateTradePassWord = (changeForm) => {
  return fetch({
    url: '/account/updateTradePassWord',
    method: "post",
    data: changeForm
  })
}

export const apiGetMerchantBase = (merchantForm) => {
  return fetch({
    url: 'account/getMerchantBase',
    method: "post",
    data: merchantForm
  })
}

export const apiGetMerchantInfo = (merchantForm) => {
  return fetch({
    url: 'account/getMerchantInfo',
    method: "post",
    data: merchantForm
  })
}

export const apiActivate = (activateForm) => {
  return fetch({
    url: 'account/activate',
    method: "post",
    data: activateForm
  })
}

export const apiWithdrawAmount = (activateForm) => {
  return fetch({
    url: 'withdraw/checkBhaPassword',
    method: "post",
    data: activateForm
  })
}
