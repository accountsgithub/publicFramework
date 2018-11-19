<template>
    <div :class="classObj"
         class="app-wrapper">
        <div :class="{hideSidebar:!sidebar.opened}"
             class="side-logo" />
        <sidebar class="sidebar-container" />
        <div class="main-container">
            <navbar />
            <app-main />
        </div>
    </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Layout',
    components: {
        Navbar,
        Sidebar,
        AppMain
    },
    mixins: [ResizeMixin],
    computed: {
        ...mapGetters([
            'sidebar',
            'device'
        ]),
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
            }
        }
    },
    methods: {
        ...mapActions([
            'CloseSideBar'
        ]),

        handleClickOutside() {
            this.CloseSideBar({ withoutAnimation: false })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {
  position: relative;
  //   height: 100%;
  min-height: 100%;
  width: 100%;
  background-color: #eceef3;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.side-logo {
  transition: width 0.28s;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 60px;
  width: 200px !important;
  overflow: hidden;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('../../assets/images/polphin_logo.png') #016ad5 center
    no-repeat;
}
.side-logo.hideSidebar {
  transition: width 0.28s;
  width: 60px !important;
  height: 60px;
  background-position: 4px;
}
</style>
