import { fetch } from '@/utils/http'

export default {
  getDemoList: params => fetch('get', '/demo/list', params)
}
