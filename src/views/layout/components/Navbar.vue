<template>
    <div class="navbar"
         mode="horizontal">
        <div class="breadcrumb">
            <hamburger :toggle-click="toggleSideBar"
                       :is-active="sidebar.opened"
                       class="hamburger-container" />
            <breadcrumb />
        </div>
        <div style="display: flex;">
            <div class="langSelectStyle">
                <lang-select :lang="lang"
                             class="international right-menu-item"></lang-select>
            </div>
            <el-dropdown @command="handleCommand"
                         class="avatar-container"
                         trigger="click">
                <div class="avatar-wrapper">
                    <img :src="avatar"
                         class="avatar" />
                    <div class="userName"><span>{{userName}}</span></div>
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown"
                                  class="user-dropdown">
                    <el-dropdown-item command="logout">
                        <span>{{$t('common.logout')}}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LangSelect from '@/components/langSelect'
import local from '@/lang'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import avatar from '@/assets/images/pic-head.png'
const viewName = 'i18nView'

export default {
    components: {
        LangSelect,
        Breadcrumb,
        Hamburger
    },
    created() {
        if (!this.$i18n.getLocaleMessage('en')[viewName]) {
            this.$i18n.mergeLocaleMessage('zh', local.zh)
            this.$i18n.mergeLocaleMessage('en', local.en)
        }
    },
    computed: {
        ...mapGetters(['sidebar']),

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

    data() {
        return {
            avatar
        }
    },

    methods: {
        ...mapActions([
            'ToggleSideBar', 'logout'
        ]),
        toggleSideBar() {
            this.ToggleSideBar()
        },
        handleCommand(command) {
            if (command === 'logout') {
                this.logout().then(() => {
                    this.$router.push('/login')
                })
            }
            // this.LogOut().then(() => {
            //   location.reload() // 为了重新实例化vue-router对象
            // })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.langSelectStyle {
  top: 8px;
  position: relative;
  display: inline-table;
  width: 83px;
  /*right: 35px;*/
  /deep/.el-input {
    background: #ffffff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    height: 30px !important;
    width: 83px;
    font-size: 12px;
  }
  /deep/.el-input__inner {
    background: #ffffff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    height: 30px !important;
    width: 83px;
    font-size: 12px;
  }
  /deep/.el-input--suffix .el-input__inner {
    height: 30px !important;
  }
}

.international {
  vertical-align: top;
}
.right-menu-item {
  display: inline-block;
  margin: 0;
}

.navbar {
  position: absolute;
  top: 0;
  width: calc(100% + 10px);
  left: -10px;
  padding: 5px 30px 5px 0px;
  border-radius: 0 !important;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  .avatar-container {
    .avatar-wrapper {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .avatar {
      height: 32px;
      width: 32px;
    }
    .userName {
      margin: 0 10px;
    }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    margin-left: 15px;
  }
}
</style>

