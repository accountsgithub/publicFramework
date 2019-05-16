<template>
  <!---->
  <div @mouseenter="slidebarHover" @mouseleave="slidebarLeave">
    <div :class="{ hideSidebar: !sidebar.opened }" class="side-logo">
      <hamburger
        :toggle-click="toggleSideBar"
        :is-active="sidebar.opened"
        class="hamburger-container"
      />
    </div>
    <el-scrollbar class="sidebar-wrapper" wrap-class="scrollbar-wrapper">
      <el-menu
        :show-timeout="200"
        :default-active="activeIndex"
        mode="vertical"
        text-color="#8494b5"
        active-text-color="#ffffff"
      >
        <sidebar-item :routes="routes" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SidebarItem from './SidebarItem'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    SidebarItem,
    Hamburger
  },
  data() {
    return {
      permissionRoutes: []
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    activeIndex() {
      if (this.$route.meta.menuIndex) {
        return this.$route.meta.menuIndex
      } else {
        return this.$route.path
      }
    },
    routes() {
      return this.$router.options.routes
    },

    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    ...mapActions(['ToggleSideBar']),
    toggleSideBar() {
      this.ToggleSideBar()
    },
    slidebarHover(e) {
      if (this.sidebar.opened) {
        return
      }
      let el = e.target
      el.classList.add('hideSidebarContainer')
      console.log('el=', el)
      console.log('sidebar.opened=', this.sidebar.opened)
    },
    slidebarLeave(e) {
      // if(this.sidebar.opened) { return }
      let el = e.target
      el.classList.remove('hideSidebarContainer')
    }
  }
}
</script>
