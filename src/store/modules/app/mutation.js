import * as types from './mutationTypes'
import Cookies from 'js-cookie'

export default {
  // 国际化
  [types.SETLANGUAGE](state, language) {
    state.language = language
    Cookies.set('language', language)
  },

  // 侧边栏
  [types.TOGGLE_SIDE_BAR](state) {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  [types.CLOSE_SIDE_BAR](state, withoutAnimation) {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },

  // device
  [types.TOGGLE_DEVICE](state, device) {
    state.device = device
  },

  // 面包屑
  [types.BREADLISTADD](state, obj) {
    state.breadListState.push(obj)
  },
  [types.BREADLISTREMOVE](state, num) {
    state.breadListState.splice(num, state.breadListState.length - num)
  },
  [types.BREADLISTSET](state, arr) {
    state.breadListState = arr
  },

  // 页面提示
  [types.SETPAGETIP](state, str) {
    state.pageTip = str
  }
}
