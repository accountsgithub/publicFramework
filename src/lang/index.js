import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

let i18n = {}

export function getI18n (locale) {
  const vueI18n = new VueI18n({
    locale: locale || Cookies.get('language') || 'zh',
    messages
  })
  /*eslint-disable*/
  i18n.__proto__ = vueI18n.__proto__
  i18n = Object.assign(i18n, vueI18n)
  return i18n
}

export default i18n
