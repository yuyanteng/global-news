import axios from 'axios'
// import { message } from 'antd'
// import store from '@/store'
// import { resetUser } from '@/store/actions'

const baseURL = 'http://localhost:9000'

const fetch = axios.create({
  baseURL,
  timeout: 7000,
  headers: {}
})

fetch.interceptors.request.use(config => {
  // 加token
  config.headers['Authorization'] = localStorage.getItem('token')
  return config
}, error => {
  return Promise.reject(error)
})

fetch.interceptors.response.use(response => {
  // 数据过滤，统一拦截异常和错误
  if (response.status===200) {
    // 【过滤cnode的数据】
    if (response.data && response.data.success) {
      return response.data.data
    }
    // 【过滤我们自己的node数据】
    if (response.data && response.data.err===0) {
      return response.data.data
    } else if (response.data.err === -1) {
      // 在这里，err=-1 表示token无效或者token过期
      // store.dispatch(resetUser())
      window.location.href = '#/login'
    } else {
      // message.error(response.data.msg)
    }
  } else {
    // message.error('网络异常')
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default fetch
