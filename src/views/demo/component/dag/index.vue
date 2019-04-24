<template>
  <div class="relation-wrap"
       v-loading="isLoading">
    <com-relation :modules="modules"
                  ref="relation"
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
      modules: [{ 'action': 'newInstall', 'capacity': 3, 'componentId': '000000006899e077016899ecb0860034', 'componentSign': 'mysql', 'dependencies': [], 'deploySort': 1, 'id': '2c9180856a23ec6b016a23f3db700003', 'labels': '', 'level': 3, 'lifeStyle': 'social', 'lifeStyleName': 'mysql', 'limitCpu': 1000, 'limitMemory': 1024, 'moduleId': '000000006899e077016899ee43070038', 'moduleVersion': '5.7.25', 'nodePorts': '', 'requestCpu': 100, 'requestInstance': 1, 'requestMemory': 512, 'requestStorage': 5900, 'scheduleId': '2c9180856a23ec6b016a23f3ce350000', 'tps': 3 }, { 'action': 'newInstall', 'capacity': 1, 'componentId': '000000006899e077016899eecb8e003a', 'componentSign': 'rbac-front', 'dependencies': [], 'deploySort': 2, 'id': '2c9180856a23ec6b016a23f3dc6d0006', 'labels': '', 'level': 3, 'lifeStyle': 'social', 'lifeStyleName': 'rbac-front', 'limitCpu': 1000, 'limitMemory': 512, 'moduleId': '5017745731314bc98d0ef01c4dfe8250', 'moduleVersion': 'v1.0.6.5', 'nodePorts': '', 'requestCpu': 100, 'requestInstance': 1, 'requestMemory': 256, 'requestStorage': 10240, 'scheduleId': '2c9180856a23ec6b016a23f3ce350000', 'tps': 1 }, { 'action': 'newInstall', 'capacity': 3, 'componentId': '000000006899e077016899e6c32d002d', 'componentSign': 'redis', 'dependencies': [], 'deploySort': 3, 'id': '2c9180856a23ec6b016a23f3dc950009', 'labels': '', 'level': 3, 'lifeStyle': 'social', 'lifeStyleName': 'redis', 'limitCpu': 1000, 'limitMemory': 1024, 'moduleId': '0000000069333f1c0169335ea3800031', 'moduleVersion': '4.0.1', 'nodePorts': '', 'requestCpu': 100, 'requestInstance': 1, 'requestMemory': 256, 'requestStorage': 0, 'scheduleId': '2c9180856a23ec6b016a23f3ce350000', 'tps': 3 }, { 'action': 'newInstall', 'capacity': 1, 'componentId': '000000006899e077016899f0d4040040', 'componentSign': 'cloud-rbac', 'dependencies': ['2c9180856a23ec6b016a23f3db700003', '2c9180856a23ec6b016a23f3dc6d0006', '2c9180856a23ec6b016a23f3dc950009'], 'deploySort': 4, 'id': '2c9180856a23ec6b016a23f3d95c0002', 'labels': '', 'level': 2, 'lifeStyle': 'social', 'lifeStyleName': 'cloud-rbac', 'limitCpu': 2000, 'limitMemory': 4096, 'moduleId': '0e71c30511194853897abbdab4ff5e0f', 'moduleVersion': 'v1.0.6.5', 'nodePorts': '', 'requestCpu': 100, 'requestInstance': 1, 'requestMemory': 512, 'requestStorage': 10240, 'scheduleId': '2c9180856a23ec6b016a23f3ce350000', 'tps': 1 }, { 'action': 'exist', 'capacity': 1, 'componentId': '0000000069333f1c0169335289300001', 'componentSign': 'elasticsearch', 'dependencies': [], 'deploySort': 5, 'id': '2c9180856a23ec6b016a23f3dd440012', 'labels': '', 'level': 2, 'lifeStyle': 'social', 'lifeStyleName': 'elasticsearch', 'limitCpu': 2000, 'limitMemory': 4096, 'moduleId': '0000000069333f1c01693354a2710007', 'moduleVersion': '5.6.6', 'nodePorts': 'x=9200', 'requestCpu': 100, 'requestInstance': 1, 'requestMemory': 512, 'requestStorage': 40960, 'scheduleId': '2c9180856a23ec6b016a23f3ce350000', 'serviceId': '2c9180856a23d291016a23d4d9bd0004', 'tps': 1 }, { 'action': 'newInstall', 'capacity': 1, 'componentId': '00000000692432500169249e4c80003e', 'componentSign': 'kafka', 'dependencies': [], 'deploySort': 6, 'id': '2c9180856a23ec6b016a23f3dda30017', 'labels': '', 'level': 2, 'lifeStyle': 'social', 'lifeStyleName': 'kafka', 'limitCpu': 1000, 'limitMemory': 1024, 'moduleId': '0000000069333f1c016933597c3c0015', 'moduleVersion': '2019.0122', 'nodePorts': 'x=9092', 'requestCpu': 100, 'requestInstance': 2, 'requestMemory': 512, 'requestStorage': 0, 'scheduleId': '2c9180856a23ec6b016a23f3ce350000', 'tps': 10000 }, { 'action': 'newInstall', 'capacity': 1, 'componentId': 'f40502685a774070a344d1c5ce651cb3', 'componentSign': 'iomp-demo', 'dependencies': ['2c9180856a23ec6b016a23f3d95c0002', '2c9180856a23ec6b016a23f3db700003', '2c9180856a23ec6b016a23f3dc950009', '2c9180856a23ec6b016a23f3dd440012', '2c9180856a23ec6b016a23f3dda30017'], 'deploySort': 7, 'id': '2c9180856a23ec6b016a23f3cf180001', 'labels': '', 'level': 1, 'lifeStyle': 'social', 'lifeStyleName': 'iomp-demo', 'limitCpu': 1000, 'limitMemory': 2048, 'moduleId': 'a15bab3b242c44ca80db26cb601fddc5', 'moduleVersion': 'v1.0.5', 'nodePorts': '', 'requestCpu': 100, 'requestInstance': 1, 'requestMemory': 1024, 'requestStorage': 2, 'scheduleId': '2c9180856a23ec6b016a23f3ce350000', 'tps': 1 }]
    }
  },
  mounted () {
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
</style>
