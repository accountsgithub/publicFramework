import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import i18n from './lang'
import '@/components'
import initHttp from '@/utils/http'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import './icons' // icon

const isProduction = process.env.NODE_ENV === 'production'

// 国际化处理
Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
})

// 设置 baseURL
axios.setConfig = function(config) {
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
    Vue.prototype.g_Config = res.data
    axios.setConfig(Vue.prototype.g_Config)
    initHttp()
    /* eslint-disable no-new */
    new Vue({
        router,
        store,
        i18n,
        render: h => h(App)
    }).$mount('#app')
})
