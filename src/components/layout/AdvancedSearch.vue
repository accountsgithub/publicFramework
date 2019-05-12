<template>
  <div>
    <div class="advancedSearch clearfix">
      <el-form :inline="true" :model="ordinarySearch" size="small">
        <slot name="ordinaryForm-area"></slot>
        <el-form-item>
          <span @click="switchAdvanced">
            <a v-if="!advancedIsShow">高级搜索</a>
            <a v-if="advancedIsShow">普通搜索</a>
          </span>
        </el-form-item>
        <el-form-item class="operation">
          <slot name="ordinaryOper-area"></slot>
        </el-form-item>
      </el-form>
    </div>
    <el-collapse-transition>
      <div v-show="advancedIsShow">
        <SearchPanel :searchCriteria="advancedSearch">
          <template slot="form-area">
            <slot name="form-area"></slot>
          </template>
          <template slot="oper-area">
            <slot name="oper-area"></slot>
          </template>
        </SearchPanel>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import { SearchPanel } from './'

export default {
  components: {
    SearchPanel
  },
  name: 'AdvancedSearch',
  props: {
    ordinarySearch: {}, // 普通搜索
    advancedSearch: {} // 高级搜索
  },
  data() {
    return {
      advancedIsShow: false
    }
  },
  methods: {
    switchAdvanced() {
      this.advancedIsShow = !this.advancedIsShow
    }
  }
}
</script>

<style scoped lang="scss">
.advancedSearch {
  background: #fff;
  padding: 20px 20px 0 20px;

  .operation {
    float: right;

    /deep/ {
      .el-button {
        margin-right: 8px;
      }
    }

    .el-button-group {
      .el-button {
        margin-right: 0;
      }
    }
  }
}
</style>
