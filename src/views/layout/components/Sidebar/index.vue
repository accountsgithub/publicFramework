<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
            :show-timeout="200"
            :default-active="$route.path"
            :collapse="isCollapse"
            mode="vertical"
            background-color="#0b1f3f"
            text-color="#8494b5"
            active-text-color="#ffffff">
            <sidebar-item :routes="routes"/>
        </el-menu>
    </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
    components: { SidebarItem },
    data() {
        return {
            permissionRoutes: []
        }
    },
    computed: {
        ...mapGetters([
            'sidebar'
        ]),

        routes() {
            return this.$router.options.routes
        },

        isCollapse() {
            return !this.sidebar.opened
        }
    }
}
</script>
