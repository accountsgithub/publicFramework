import Vue from 'vue'
import apis from '@/apis'
import { textFlow } from '@/utils/common'
import store from '@/store'

Vue.mixin({
  data() {
    return {
      requests: apis
    }
  },
  filters: {
    textFlow
  },
  methods: {
    setPageTip(str) {
      store.dispatch('setPageTip', str)
    }
  }
})
