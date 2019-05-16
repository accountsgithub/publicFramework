import * as types from './mutationTypes'
// import Cookies from 'js-cookie' // cookie

export default {
  setLanguage({ commit }, language) {
    commit(types.SETLANGUAGE, language)
  },
  ToggleSideBar: ({ commit }) => {
    commit(types.TOGGLE_SIDE_BAR)
  },
  CloseSideBar({ commit }, { withoutAnimation }) {
    commit(types.CLOSE_SIDE_BAR, withoutAnimation)
  },
  ToggleDevice({ commit }, device) {
    commit(types.TOGGLE_DEVICE, device)
  },
  breadListAdd({ commit }, params) {
    commit(types.BREADLISTADD, params)
  },
  breadListRemove({ commit }, params) {
    commit(types.BREADLISTREMOVE, params)
  },
  breadListSet({ commit }, params) {
    commit(types.BREADLISTSET, params)
  },
  setPageTip({ commit }, params) {
    commit(types.SETPAGETIP, params)
  }
}
