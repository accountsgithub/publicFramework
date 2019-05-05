import Vue from 'vue'
import apis from '@/apis'
import { textFlow } from '@/utils/common'

Vue.mixin({
  data () {
    return {
      requests: apis
    }
  },
  filters: {
    textFlow
  },
  methods: {}
})
