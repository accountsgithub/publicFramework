import { fetch } from '@/utils/http'
import api from '@/apis/api'
import * as TYPES from './mutationTypes'

export default {
  // 项目主列表
  getDemoList ({ commit }, params) {
    return fetch('get', api.demo.list, { params })
      .then(response => response.data)
      .then(({ result }) => {
        commit(TYPES.GET_DEMO_LIST, { result, params })
      })
      .catch(error => Promise.reject(error))
  },

  resetSearchCriteria ({ commit }) {
    commit(TYPES.RESET_SEARCH_CRITERIA)
  }
}
