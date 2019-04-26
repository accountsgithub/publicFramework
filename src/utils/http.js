import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router/index.js'
import { downloadFilesUrl } from '@/utils'
import i18n from '@/lang'

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
    // 错误消息
    if (parseInt(response.data.status) !== 200) {
      Message.error(response.data.message)
    }
    return response
  },
  err => {
    if (err.message.indexOf('timeout') !== -1) {
      Message.error(i18n.t('common.network_timeout'))
    } else if (!err.response) {
      Message.error(i18n.t('common.network_disconnect'))
    } else {
      Message.error(
        i18n.t('common.networkError_message') + '，错误码：' + err.code
      )
    }
    return Promise.reject(err)
  }
)

const fetch = (method, url, data, singleDeal = false) => {
  const params = method === 'get' ? { params: data } : data
  return axios[method](url, params).then(res => {
    if (singleDeal) {
      return res
    } else {
      if (res.data && res.data.code === '0') {
        return res
      } else {
        if (res.data && res.data.message) {
          Message.error({ message: res.data.message })
          return res
        }
      }
    }
  })
}

export { fetch }
