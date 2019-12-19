//初始化 old-fetch
import { createFetch } from 'old-fetch'
import { Message } from 'element-ui'
// // 是否开启调试
// setAjaxDebugState(process.env.NODE_ENV !== 'production')

// // 创建配置文件 以下展示最常规的初始化 细节请参考后续文档
// // old-fetch将自动完成 Authorization 写入header

//格式化分页参数，将currPage等转为start,limit;
const options = {
  needStartLimit:true,
  // handleRequestData: (data, config) => {
  //   // data.url = "/api/psalary/" + data.url
  //   return data
  // },
  // handleRequestError: err => {
  //   console.log(err)
  //   Message.error(err.message);
  // },
  // handleResponseData: (data) => {
  //   //your code...
  // },
  handleResponseError: (err, config) => {
    if (err.message) {
      Message.error(err.message);
    }
    if (err.toString().includes('timeout')) {
      return Promise.reject(err);
    }
  }
  // 对请求数据的处理 （可选）
  // transformRequestMiddleware: (data, headers) => {
  //   return data
  // }
}
const fetch = createFetch({
  baseURL: '/api/',
}, options);
export default fetch



