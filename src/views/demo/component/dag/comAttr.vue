<template>
  <div :class="{'com-attr-dialog': true, 'right-move': module.id && !dialogVisible, 'left-move': module.id && dialogVisible}">
    <div class="tit-wrapper">
      <div class="left">
        组件属性
      </div>
    </div>
    <div class="content">
      <el-form :model="module"
               size="small"
               ref="moduleForm">
        <el-form-item label="组件名称:">
          {{module.componentSign}}
        </el-form-item>
        <template v-if="isCustom">
          <el-form-item label="`访问地址:"
                        prop="remoteAddr">
            <el-input label-width="80px"
                      style="width:215px"
                      v-model="module.remoteAddr" />
          </el-form-item>
          <el-form-item label-width="60px"
                        label="端口:"
                        prop="remotePort">
            <el-input style="width:215px"
                      v-model="module.remotePort" />
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="现有版本:">
            {{module.moduleVersion}}
          </el-form-item>
          <el-form-item label="组件服务:">
            {{module.service ? module.service.name : '—'}}
          </el-form-item>
          <el-form-item label="并发用户/用户容量:">
            {{module.tps}}/{{module.capacity}}
          </el-form-item>
          <el-form-item label="顺序:">
            {{module.deploySort}}
          </el-form-item>
        </template>
      </el-form>
    </div>
    <div class="footer">
      <el-button size="mini"
                 type="primary"
                 @click="handleOk"
                 :disabled="disabled">{{$t('common.sureButton')}}</el-button>
      <el-button size="mini"
                 @click="handleCancel">{{$t('common.cancelButton')}}</el-button>
    </div>

    <img class="up-tag"
         @click="closeAttr"
         src="./images/down.png" />
  </div>
</template>
<script>
export default {
  name: 'ComAttr',
  data () {
    return {
      dialogVisible: false,
      disabled: false,
      isCustom: false
    }
  },
  props: {
    module: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 刷新组件树
    refreshModule: {
      type: Function
    }
  },
  mounted () { },
  methods: {
    closeAttr () {
      this.dialogVisible = false
      this.$emit('update:close', false)
    },
    handleCancel (isSubmit) {
      this.dialogVisible = false
      isSubmit && this.$emit('update:close')
    },
    handleOpen () {
      this.dialogVisible = true
    },
    // 属性弹出层保存
    handleOk () {
      this.handleCancel(true)
      // // 刷新组件树
      // this.refreshModule(module.id)
    }
  },
  watch: {
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/common';
.com-attr-dialog {
  position: absolute;
  right: -400px;
  top: -3;
  bottom: 0;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 56px;
  background-color: #fff;
  width: 400px;
  height: 100%;
  box-shadow: 0 4px 8px 0 #c1c9d2;
}
.env-wrapper {
  .env-tit {
    margin-bottom: 15px;
  }
}
.tit-wrapper {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  padding-left: 26px;
  width: 100%;
  height: 56px;
  border-bottom: solid 1px #eee;
  .left {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #49505c;
    width: 50%;
    font-weight: 600;
  }
  .right {
    padding-right: 26px;
    width: 50%;
    text-align: right;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: $label-font-color;
  }
}
.footer {
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  height: 45px;
  width: 100%;
  padding: 0 26px;
  background-color: #fff;
  border-top: solid 1px #eee;
}
.content {
  height: 100%;
  overflow-y: auto;
  padding-top: 10px;
  padding-left: 26px;
  padding-right: 26px;
  padding-bottom: 70px;
  /deep/.el-form-item {
    margin-bottom: 10px;
    .el-form-item__content {
      color: $header-font-color !important;
    }
  }
}
.content::-webkit-scrollbar {
  padding-top: 10px;
  display: none;
}
.left-move {
  right: 0px;
  -webkit-animation: mymoveLeft 1s; /*Safari and Chrome*/
}
.right-move {
  right: -402px;
  -webkit-animation: mymoveright 1s; /*Safari and Chrome*/
}
@-webkit-keyframes mymoveLeft {
  from {
    right: -400px;
  }
  to {
    right: 0px;
  }
}
@-webkit-keyframes mymoveright {
  from {
    right: 0px;
  }
  to {
    right: -400px;
  }
}
.up-tag {
  position: absolute;
  right: -20px;
  bottom: 50%;
  transform: rotate(270deg);
  width: 60px;
  height: 20px;
  z-index: 2002;
}
.img {
  margin-left: 20px;
}
/deep/ .el-form-item--small {
  .el-form-item {
    margin-bottom: 18px;
  }
}
</style>
