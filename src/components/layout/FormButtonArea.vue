<template>
  <div :class="{ 'oper-area-wrap': true, 'oper-area-wrap-collapse': isCollapse }">
    <div class="oper-area">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FormButtonArea',
  computed: {
    ...mapGetters(['sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>
.oper-area-wrap {
  position: fixed;
  bottom: 0;
  right: 10;
  z-index: 30;
  width: calc(100% - 220px);
  background-color: #eceef3;
}
.oper-area {
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
  padding: 12px;
  border-top: solid 1px #edeff4;
  z-index: 10;
  margin-bottom: 10px;
  .el-button--primary {
    background-color: #1fb6ff;
    border: none;
  }
  .el-button--default {
    padding-top: 11px;
    padding-bottom: 11px;
  }
}
.oper-area-wrap-collapse {
  width: calc(100% - 60px);
}
</style>
