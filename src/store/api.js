import $fetch from '@/request/index'

//获取当前用户签名或印章
export function apiIndex(data) {
  return $fetch({
    method: "get",
    url: "/index/index",
  })
}

export function apiUploader(data) {
  return $fetch({
    method: "post",
    url: "/index/Uploader",
    data
  })
}

export function apiUploaderImage(data) {
  return $fetch({
    method: "post",
    url: "/index/imagehistory",
    data
  })
}

export function apiNotify(data) {
  return $fetch({
    method: "post",
    url: "/index/notify",
    data
  })
}

export function apiTaskstatus(data) {
  return $fetch({
    method: "post",
    url: "/index/Taskstatus",
    data
  })
}

export function apiSteps(data) {
  return $fetch({
    method: "post",
    url: "/index/Steps",
    data
  })
}

export function apiGetCode(data) {
  return $fetch({
    method: "post",
    url: "/index/Yzm",
    data
  })
}

export function apiRegister(data) {
  return $fetch({
    method: "post",
    url: "/index/Register",
    data
  })
}

export function apiLogin(data) {
  return $fetch({
    method: "post",
    url: "/index/login",
    data
  })
}
