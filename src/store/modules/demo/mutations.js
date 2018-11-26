import * as TYPES from './mutationTypes'

export default {
  // 列表
  [TYPES.GET_DEMO_LIST] (state, payload) {
    const { pageNo, pageSize, total } = payload.result
    Object.assign(state, {
      list: payload.result.data,
      paging: { pageNo, pageSize, total },
      searchCriteria: {
        name: payload.params.name,
        pageNo: payload.params.pageNo,
        pageSize: payload.params.pageSize
      }
    })
  },
  // 重置搜索项
  [TYPES.RESET_SEARCH_CRITERIA] (state) {
    Object.assign(state, {
      searchCriteria: {
        name: '',
        pageNo: 0,
        pageSize: 10
      }
    })
  }
}
