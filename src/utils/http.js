import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router/index.js'

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
    if (response.data.status == '401') {
      router.push({ path: '/login' })
      return
    }
    if (response.data.status != '200') {
      Message.error(response.data.message)
    }
    return response
  },
  err => {
    if (err.message == '') {
      Message.error('Error!')
    } else {
      Message.error(err.message)
    }
    return Promise.reject(err)
  }
)

const fetch = (method, url, data) => {
  return new Promise(function (resolve, reject) {
    if (method === 'get') {
      let params = { params: data }
      resolve(axios.get(url, params))
    } else if (method === 'post') {
      resolve(axios.post(url, data))
    } else if (method === 'put') {
      resolve(axios.put(url, data))
    } else if (method === 'patch') {
      resolve(axios.patch(url, data))
    } else if (method === 'delete') {
      resolve(axios.delete(url, data))
    }
  })
}

export { fetch }
