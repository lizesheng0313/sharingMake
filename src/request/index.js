import axios from 'axios'
import { Toast } from "vant";

import store from '../store'

const defaultHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

const instance = axios.create({
  timeout: 60000,
  headers: defaultHeader,
  withCredentials: true,
})
// axios.defaults.baseURL = 'http://172.19.60.38:18290';
//请求拦截
instance.interceptors.request.use(function (config) {
  //每次发送请求之前检测vuex存有token,那么都要放在请求头发送给服务器
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
//响应拦截
instance.interceptors.response.use(function (config) {
  return config
}, function (error) {
  if (error && error.response) {
  }
  return Promise.reject(error)
})

export function fetch(options) {
  return new Promise((resolve, reject) => {
    instance(options).then(response => {
      let data = response.data;
      if (data.code != "0000") {
        Toast(data.message);
      }
      resolve(data)
    })
      .catch(error => {
        // console.log('请求异常信息：' + error)
        reject(error)
      })
  })
}

export default fetch
