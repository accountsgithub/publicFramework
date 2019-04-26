import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import { getI18n } from './lang'
import '@/components'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

const isProduction = process.env.NODE_ENV === 'production'

// 设置 baseURL
axios.setConfig = function (config) {
  axios.defaults.baseURL = config.BASE_URL
  axios.defaults.timeout = config.AJAX_TIMEOUT
}

if (process.env.NODE_ENV === 'development') {
  require('./mock/index')
}

Vue.config.productionTip = false
const glbalFilePath = isProduction
  ? 'static/global-config.json'
  : 'static/global-config-dev.json'
axios.get(glbalFilePath).then(res => {
  let i18n = getI18n(res.data['LANGUAGE'])
  console.log(i18n.t)
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
