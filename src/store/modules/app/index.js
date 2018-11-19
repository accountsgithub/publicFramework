import actions from './actions/actions'
import mutations from './mutations/mutation'
import Cookies from 'js-cookie'

const state = {
    sidebar: {
        opened: !+Cookies.get('sidebarStatus'),
        withoutAnimation: false
    },
    language: Cookies.get('language') || 'zh',
    device: 'desktop',
    dialog: false
}

export default{
    state,
    actions,
    mutations
}
