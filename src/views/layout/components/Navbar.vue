<template>
  <div class="navbar" mode="horizontal">
    <div class="breadcrumb">
      <!--<hamburger
        :toggle-click="toggleSideBar"
        :is-active="sidebar.opened"
        class="hamburger-container"
      />-->
      <breadcrumb />
      <template v-if="pageTip">
        <el-tooltip v-if="pageTip && pageTip.length > 30" placement="bottom" effect="light">
          <div
            slot="content"
            :style="{ maxWidth: '360px', wordWrap: 'break-word', wordBreak: ' break-all' }"
          >
            {{ pageTip }}
          </div>
          <div class="page-tip">{{ $utils.textFlow(pageTip, 30) }}</div>
        </el-tooltip>
        <div v-else>
          <div class="page-tip">{{ pageTip }}</div>
        </div>
      </template>
    </div>
    <div style="display: flex;">
      <div class="langSelectStyle">
        <lang-select :lang="lang" class="international right-menu-item"></lang-select>
      </div>
      <el-dropdown @command="handleCommand" class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="avatar" />
          <div class="userName">
            <span>{{ userName || 'userName' }}</span>
          </div>
          <i class="icon el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item command="logout">
            <span>{{ $t('common.logout') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LangSelect from '@/components/LangSelect'
import local from '@/lang'
import Breadcrumb from '@/components/Breadcrumb/breadcrumb'
import Hamburger from '@/components/Hamburger'
import avatar from '@/assets/images/pic-head.png'
const viewName = 'i18nView'

export default {
  components: {
    LangSelect,
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      avatar
      // pageTip: '专有宿主机DDH是一台虚拟化托管的物理服务器，物理服务器上的资源由您独享，与其他租户在物理级别上隔离。您可以在DDH上创建ECS实例。'
    }
  },
  created() {
    if (!this.$i18n.getLocaleMessage('en')[viewName]) {
      this.$i18n.mergeLocaleMessage('zh', local.zh)
      this.$i18n.mergeLocaleMessage('en', local.en)
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'pageTip']),

    userName: function() {
      return ''
    },
    lang: {
      get() {
        return this.$store.state.app.language
      },
      set(lang) {
        this.$i18n.locale = lang
        this.$store.dispatch('setLanguage', lang)
      }
    }
  },
  methods: {
    ...mapActions(['ToggleSideBar', 'logout']),
    toggleSideBar() {
      this.ToggleSideBar()
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.logout().then(() => {
          this.$router.push('/login')
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.langSelectStyle {
  position: relative;
  display: inline-table;
  width: 83px;
}

.navbar {
  position: absolute;
  top: 0;
  width: calc(100% + 10px);
  left: -10px;
  padding-right: 30px;
  border-radius: 0 !important;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  .avatar-container {
    .avatar-wrapper {
      margin-top: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .avatar {
      height: 32px;
      width: 32px;
    }
    .userName {
      margin: 0 10px 0 15px;
    }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    margin-left: 15px;
  }
}
.page-tip {
  margin-left: 15px;
  padding: 0 15px;
  border-radius: 2px;
  background-color: #f0f2f5;
}
</style>
