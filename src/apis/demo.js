import { fetch } from '@/utils/http'

export default {
  getDemoList: params => fetch('get', '/demo/list', params),
  getformByAPI: params => fetch('get', '/demo/formByAPI', params),
  getformDataByAPI: params => fetch('get', '/demo/formDataByAPI', params)
}
