import axios from 'axios'
import { Message } from "element-ui";
import store from '../store'
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
    // Message.error('系统出现意外错误，请联系管理员')
  }
  return Promise.reject(error)
})

export function fetch(options) {
  return new Promise((resolve, reject) => {
    instance(options).then(response => {
      let data = response.data;
      if (data.code != "0000") {
        Message.error(data.message);
        let originHref = "";
        switch (window.__CURRENT_ENV__) {
          case "prod":
            originHref='https://www.olading.com/main.html#/';
            break;
          case "stage":
            originHref='https://stage.olading.com/main.html#/';
            break;
          case "dev":
            originHref='http://172.19.60.38/main.html#/';
            break;
          case "local":
            originHref='http://localhost:8081/main.html#/';
            break;
        };
        //未认证跳回登陆
        if(data.code === "802"){
          window.open(originHref+'login', "_self")
        }
      }
      resolve(data)
    })
      .catch(error => {
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
      let resData = response.data;
      resolve(response);
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
