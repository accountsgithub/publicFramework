import actions from './actions'
import mutations from './mutation'
import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: !+Cookies.get('sidebarStatus'),
    withoutAnimation: false
  },
  language: Cookies.get('language') || 'zh',
  device: 'desktop',
  breadListState: [],
  pageTip: ''
}

export default {
  state,
  actions,
  mutations
}
