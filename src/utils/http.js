import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router/index.js'
import { downloadFilesUrl } from '@/utils'

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charest=utf-8'

// request
axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    Message.error(err.message)
    return Promise.reject(err)
  }
)

// response
axios.interceptors.response.use(
  response => {
    // 文件下载 response
    if (
      response.headers &&
      response.headers['content-type'] === 'application/octet-stream'
    ) {
      downloadFilesUrl(response.request.responseURL)
      response.data = ''
      response.headers['content-type'] = 'application/json'
      return response
    }
    // 登录状态校验
    if (parseInt(response.data.status) === 401) {
      sessionStorage.clear()
      localStorage.clear()
      router.push({ path: '/login' })
      return
    }
    if (parseInt(response.data.status) !== 200) {
      Message.error(response.data.message)
    }
    return response
  },
  err => {
    if (err.toString().startsWith('Error: Network Error')) {
      Message.error({ message: '网络异常，请检查当前互联网状态' })
    } else if (err.toString().startsWith('Error: Request failed')) {
      Message.error({ message: '接口请求异常' })
    } else {
      Message.error(err.message)
    }
    return Promise.reject(err)
  }
)

const fetch = (method, url, data) => {
  if (method === 'get') {
    let params = { params: data }
    return axios.get(url, params)
  } else if (method === 'post') {
    return axios.post(url, data)
  } else if (method === 'put') {
    return axios.put(url, data)
  } else if (method === 'patch') {
    return axios.patch(url, data)
  } else if (method === 'delete') {
    return axios.delete(url, data)
  }
}

export { fetch }
