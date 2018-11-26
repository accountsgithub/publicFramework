import axios from 'axios'
import { Message } from 'element-ui'
import NProgress from 'nprogress'

export default function initHttp () {
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
  axios.defaults.withCredentials = true
  axios.interceptors.request.use(
    config => {
      NProgress.start()
      return config
    },
    err => {
      Message.error('服务器错误，请重试')
      return Promise.reject(err)
    }
  )
  axios.interceptors.response.use(
    response => {
      NProgress.done()
      const { data, config } = response
      if (data.status === 401 || config.url.indexOf('/authorize?') !== -1) {
        setTimeout(() => {
          window.location.href = `${axios.defaults.baseURL}/oauth2/authorize`
        }, 100)
        return
      }

      if (data.status !== 200) {
        Message.error(data.message || '')
        return Promise.reject(data)
      }
      return response
    },
    err => {
      NProgress.done()
      Message.error('服务器错误，请重试')
      return Promise.reject(err)
    }
  )
}
