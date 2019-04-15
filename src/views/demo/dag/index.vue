<template>
  <div class="relation-wrap"
       v-loading="isLoading">
    <com-relation :modules="modules"
                  ref="relation"
                  :showFlag="showFlag"
                  v-on:update:isAtrrEditing="handleAtrrEditing"
                  :refreshModule="refresh"></com-relation>
  </div>
</template>
<script>
import ComRelation from './comRelation'

export default {
  name: 'stepThree',
  components: {
    'com-relation': ComRelation
  },
  data () {
    return {
      disabled: false,
      scheduleId: '',
      isLoading: false,
      isAttrEditing: false,
      // 仅查看
      showFlag: false
    }
  },
  mounted () {
    const showFlag = this.$route.query.showFlag
    this.showFlag = showFlag == 1
    this.refresh()
  },
  computed: {

  },
  methods: {
    // 重置组件树
    refresh () {

    },
    // 上一步
    handleCancel () {
      const { scheduleId } = this
      this.$router.replace({ name: 'stepTwo', query: { scheduleId } })
    },
    // 更新组件编辑状态
    handleAtrrEditing (flag) {
      this.isAttrEditing = flag
    }
  }
}
</script>
<style lang="scss" scoped>
.relation-wrap {
  background: transparent !important;
  position: relative;
  height: calc(100vh - 80px);
  background-color: #f9fbfd;
}
.operation-area {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  bottom: 0px;
  background-color: #fff;
  padding: 15px;
  border-top: solid 1px #edeff4;
  width: 100%;
}
</style>
