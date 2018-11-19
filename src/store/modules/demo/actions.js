import axios from 'axios'
import API from '@/apis/api'
import * as TYPES from './mutationTypes'

export default {
  //项目主列表
  getDemoList({ commit }, params) {
    return axios
      .get(API.PROJECT_LIST, { params })
      .then(response => response.data)
      .then(({ result }) => {
        commit(TYPES.GET_PROJECT_LIST, { result, params })
      })
      .catch(error => Promise.reject(error))
  },

  resetSearchCriteria({ commit }) {
    commit(TYPES.RESET_SEARCH_CRITERIA)
  }
}
