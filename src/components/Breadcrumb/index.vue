<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadListState"
        :key="item.path"
        v-if="item.title"
      >
        <span
          v-if="item.redirect === 'noredirect' || index == breadListState.length - 1"
          class="no-redirect"
          >{{ generateTitle(item.title) }}</span
        >
        <router-link v-else :to="item.redirect || item.path">{{
          generateTitle(item.title)
        }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { generateTitle } from '@/utils/i18n'
import { mapState, mapActions } from 'vuex'
import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
export default {
  components: { ElButton },
  created() {
    this.getBreadcrumb(true)
  },
  data() {
    return {
      levelList: null
    }
  },
  computed: {
    ...mapState({
      index_showList: index => index.app.index_showList,
      breadListState: index => index.app.breadListState
    })
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    ...mapActions(['breadListAdd', 'breadListRemove', 'breadListSet']),
    generateTitle,
    getBreadcrumb(isReload) {
      const { $utils, $route } = this
      let breadLevel = $utils.isEmpty($route.meta.breadLevel) ? 0 : $route.meta.breadLevel
      // 如果是动态的 可指定具体面包屑名称
      const title = $route.query.breadName
        ? $route.query.breadName
        : $route.meta.title
        ? $route.meta.title
        : ''
      const breadLength = this.breadListState.length
      const curName = $route.name
      const curPath = $route.fullPath
      const newBread = { name: curName, path: curPath, title }
      const breadListStorage = sessionStorage.getItem('breadListStorage')

      // query 中存在 breadLevel 字段优先使用
      breadLevel = $route.query.breadLevel ? $route.query.breadLevel : breadLevel
      if (breadLevel === 0) {
        this.breadListRemove(0)
        if (breadLevel === 0) {
          this.breadListAdd(newBread)
        }
      } else {
        if (!isReload) {
          if (breadLength <= breadLevel) {
            this.breadListAdd(newBread)
          } else {
            this.breadListRemove(parseInt(breadLevel) + 1)
          }
        } else {
          if (!$utils.isEmpty(breadListStorage)) {
            this.breadListSet(JSON.parse(breadListStorage))
          }
        }
      }
      this.breadlist = this.breadListState
      sessionStorage.setItem('breadListStorage', JSON.stringify(this.breadlist))
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.showStyle {
  display: none;
}
.el-button {
  line-height: 0.5;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 60px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
