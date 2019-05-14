import api from '@/apis'
import * as TYPES from './mutationTypes'

export default {
  // 列表
  getDemoList({ commit }, params) {
    return api.demo
      .getDemoList(params)
      .then(response => response.data)
      .then(({ result }) => {
        commit(TYPES.GET_DEMO_LIST, {
          result,
          params
        })
      })
      .catch(error => Promise.reject(error))
  },

  resetSearchCriteria({ commit }) {
    commit(TYPES.RESET_SEARCH_CRITERIA)
  },
  getformDataAPI({ commit }, params) {
    return api.demo
      .getformByAPI(params)
      .then(response => response.data)
      .catch(error => Promise.reject(error))
  },
  getformDetailAPI({ commit }, params) {
    return api.demo
      .getformDataByAPI(params)
      .then(response => response.data)
      .catch(error => Promise.reject(error))
  }
}
