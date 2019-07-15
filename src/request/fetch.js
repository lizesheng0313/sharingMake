import axios from 'axios'
import { Message } from "element-ui";
// import {Message} from 'element-ui'

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
  return config
}, function (error) {
  return Promise.reject(error)
})

//响应拦截
instance.interceptors.response.use(function (config) {
  return config
}, function (error) {
  if (error && error.response) {
    // Message.error('系统出现意外错误，请联系管理员')
  }
  return Promise.reject(error)
})

export function fetch(options) {
  return new Promise((resolve, reject) => {
    instance(options).then(response => {
      let data = response.data;
      if (data.code != "0000") {
        Message.error(data.message)
      }
      resolve(data)
    })
      .catch(error => {
        console.log(error)
        // console.log('请求异常信息：' + error)
        reject(error)
      })
  })
}
//导出excel
export function fetchFile(options) {
  return new Promise((resolve, reject) => {
    options.responseType = "blob";
    instance(options).then(response => {
      resolve(response)
      let data = response.data;
      let url = window.URL.createObjectURL(data);
      let a = document.createElement('a');
      a.href = url;
      a.download = decodeURI(response['headers']['content-disposition'].split(';')[1].split('=')[1]);
      a.click();
    })
      .catch(error => {
        reject(error)
      })
  })
}
