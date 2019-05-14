<template>
  <!--<el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div style="margin-top: 5px;">
      <img v-if="lang == 'zh'" src="@/assets/images/pic-CN.png" />
      <img v-else-if="lang == 'en'" src="@/assets/images/pic-EN.png" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="lang === 'zh'">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="lang === 'en'">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>-->
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <img v-if="lang == 'zh'" src="@/assets/images/cn.png" />
      <img v-else-if="lang == 'en'" src="@/assets/images/us.png" />
      <i class="icon el-icon-caret-bottom" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="lang === 'zh'">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="lang === 'en'">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: ['lang'],
  data() {
    return {
      langList: [{ command: 'zh', src: '' }]
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-popper {
  // margin-top: -12px;
  /deep/.el-dropdown-menu {
    padding: 0;
  }
}
.international {
  height: 60px;
  line-height: 60px;
  width: 140px;
  padding-left: 57px;
  position: relative;
  &:after {
    position: absolute;
    right: 22px;
    top: 22px;
    content: '';
    display: inline-block;
    height: 15px;
    width: 1px;
    background: #e1e1e1;
  }
  .icon {
    margin-left: 8px;
  }
}
</style>
