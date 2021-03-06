import Vue from 'vue'
import moment from 'moment'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/fonts/iconfont.css'
import '@/styles/index.scss'

import { getI18n } from './lang'
import '@/mixin/global'
import utils from '@/utils/common'
import '@/components'

Object.defineProperty(Vue.prototype, '$moment', { value: moment })
Object.defineProperty(Vue.prototype, '$utils', { value: utils })

const isProduction = process.env.NODE_ENV === 'production'

// 设置 baseURL
axios.setConfig = function(config) {
  axios.defaults.baseURL = config.BASE_URL
  axios.defaults.timeout = config.AJAX_TIMEOUT
}

if (process.env.NODE_ENV === 'development') {
  require('./mock/index')
}

Vue.config.productionTip = false
const glbalFilePath = isProduction ? 'static/global-config.json' : 'static/global-config-dev.json'
axios.get(glbalFilePath).then(res => {
  let i18n = getI18n(res.data['LANGUAGE'])
  Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
  })
  Vue.prototype.g_Config = res.data
  axios.setConfig(Vue.prototype.g_Config)
  /* eslint-disable no-new */
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount('#app')
})
