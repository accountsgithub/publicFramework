import actions from './actions'
import mutations from './mutations'

const state = {
  searchCriteria: {
    name: '',
    pageNo: 0,
    pageSize: 10
  },
  list: [],
  paging: {
    pageNo: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0
  }
}

export default {
  state,
  actions,
  mutations
}
