<template>
  <div class="search-panel">
    <div class="form-panel clearfix">
      <el-form :inline="true"
               :model="searchCriteria"
               size="small">
        <slot name="form-area"></slot>
        <el-form-item class="operation">
          <div class="operation-item">
            <slot name="oper-area"></slot>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchPanel',
  props: {
    searchCriteria: {}
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/common";
.search-panel {
  // display: flex;
  // flex-flow: row wrap;
  // align-items: center;
  .form-panel /deep/ {
    background-color: $white-bg;
    font-size: $search-font-size;
    margin-bottom: 10px;
    padding: 20px 20px 5px 20px;
    background-color: #ffffff;
    .el-form-item {
      margin-right: 0 !important;
      vertical-align: top;
      margin-bottom: 15px;
      display: inline-flex;
      flex-direction: row;
      .el-form-item__label {
        width: 120px;
        white-space: nowrap;
        height: 32px;
        line-height: 32px;
      }
      .el-form-item__content {
        flex: 3;
        .el-select {
          width: 100%;
        }
      }
      .el-input__inner {
        height: 32px;
        line-height: 32px;
        width: 100%;
      }
    }
    .operation {
      float: right;
      .operation-item {
        float: right;
      }
    }
    @media screen and (max-width: 1440px) {
      .el-form-item {
        width: 33.333%;
      }
    }
    @media screen and (min-width: 1440px) {
      .el-form-item {
        width: 25%;
      }
    }
    @media screen and (min-width: 1920px) {
      .el-form-item {
        width: 20%;
      }
    }
  }
}
</style>
