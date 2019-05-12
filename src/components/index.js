import Vue from 'vue'

import { ListPanel, SearchPanel, FormButtonArea, AdvancedSearch } from './Layout'

console.log(ListPanel)
console.log(SearchPanel)
console.log(FormButtonArea)

Vue.component('search-panel', SearchPanel)
Vue.component('advanced-search-panel', AdvancedSearch)
Vue.component('list-panel', ListPanel)
Vue.component('form-button-area', FormButtonArea)
