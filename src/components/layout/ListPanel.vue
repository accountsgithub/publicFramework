<template>
  <el-row :span="24" class="mainContainer">
    <header class="mainContainer__header">
      <slot name="header"></slot>
    </header>
    <main class="mainContainer__body">
      <slot name="main"></slot>
    </main>
    <footer class="mainContainer__pagination" v-if="showPagination">
      <slot name="pagination"></slot>
    </footer>
  </el-row>
</template>

<script>
export default {
  name: 'ListPanel',
  props: {
    showPagination: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/common';
.mainContainer {
  background: #fff;
  @include e(header) {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 10px 15px;
    align-items: center;
    border-bottom: 1px solid $border-color;
    height: 53px;
  }

  /deep/ .header__title {
    font-family: PingFangSC-Regular;
    font-size: $header-font-size;
    color: $header-font-color;
    letter-spacing: 0;
    text-align: left;
  }

  @include e(body) {
    padding: 0 15px;
    .list {
      padding: 0 30px;
      &.el-table::before {
        height: 0 !important;
      }
    }
  }

  @include e(pagination) {
    text-align: right;
    padding: 30px 40px 50px 0;
  }
}
</style>
