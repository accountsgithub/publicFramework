<template>
  <div :class="{'com-attr-dialog': true, 'right-move': info.id && !dialogVisible, 'left-move': info.id && dialogVisible}">
    <div class="tit-wrapper">
      <div class="left">
        组件属性
      </div>
      <div class="right">
        <el-checkbox v-model="isCustom"
                     :disabled="showFlag"
                     v-if="module.level !== 1"
                     label="使用外部:" />
      </div>
    </div>
    <div class="content">
      <el-form :model="info"
               size="small"
               :rules="rules"
               ref="moduleForm">
        <el-form-item label="组件名称">
          {{info.componentName}}
        </el-form-item>
        <template v-if="isCustom">
          <el-form-item label="`访问地址:"
                        prop="remoteAddr">
            <el-input label-width="80px"
                      :disabled="showFlag"
                      @change="handleComAtrrChange"
                      style="width:215px"
                      v-model="info.remoteAddr" />
          </el-form-item>
          <el-form-item label-width="60px"
                        label="端口:"
                        prop="remotePort">
            <el-input style="width:215px"
                      :disabled="showFlag"
                      @change="handleComAtrrChange"
                      v-model="info.remotePort" />
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="现有版本:">
            {{info.moduleVersion}}
          </el-form-item>
          <el-form-item label="部署版本:">
            <el-select v-model="info.moduleId"
                       @change="handleComAtrrChange"
                       :disabled="module.level === 1 || showFlag"
                       placeholder="请选择">
              <el-option v-for="(item,index) in versions"
                         :key="index"
                         :label="item.version"
                         :value="item.id">
              </el-option>
            </el-select>
            <el-tooltip popper-class="com-tip"
                        :visible-arrow="false">
              <div slot="content"
                   :style="{maxWidth:'360px','wordWrap':'break-word','wordBreak':' break-all'}">
                <div v-if="info.action === 'newInstall'">新增-该组件为新增组件</div>
                <div v-else-if="info.action === 'downgrade' || info.action === 'upgrade'">升级-该组件版本会造成组件服务升级</div>
              </div>
              <span style="display:inline-block;">
                <img class="img"
                     v-if="info.action === 'newInstall'"
                     src="./images/level-new.png" />
                <img class="img"
                     v-else-if="info.action === 'downgrade' || info.action === 'upgrade'"
                     src="./images/level-up.png" />
              </span>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="组件服务:">
            {{info.service ? info.service.name : '—'}}
          </el-form-item>
          <el-form-item label="并发用户/用户容量:">
            {{info.tps}}/{{info.capacity}}
          </el-form-item>
          <el-form-item label="顺序:">
            {{info.deploySort}}
          </el-form-item>
          <el-form-item label="生活方式:">
            {{getLifeStyleName(info)}}
            <el-button style="margin-left:10px;"
                       v-if="module.level !== 1 && !showFlag"
                       @click="handleChangeLifeStyle"
                       size="mini">{{$t('scheme.change')}}</el-button>
          </el-form-item>
          <div v-if="info && info.storageSpace && info.storageSpace.length > 0"
               class="env-wrapper">
            <h4 class="env-tit">{{$t('scheme.moduleStorage')}}</h4>
            <template v-for="space in info.storageSpace">
              <el-form-item :label="`${getSpaceLabel(space)}:`"
                            :prop="space.id">
                <el-select v-model="space.storageClassName"
                           @change="handleComAtrrChange"
                           style="width:100%"
                           :disabled="showFlag"
                           :placeholder="$t('common.selectPlaceholder')">
                  <el-option v-for="(item,index) in storages"
                             :key="index"
                             :label="item"
                             :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </div>
          <div v-if="info && info.envs && info.envs.length > 0"
               class="env-wrapper">
            <h4 class="env-tit">{{$t('scheme.env')}}</h4>
            <template v-for="env in info.envs">
              <el-form-item :label="env.key"
                            :prop="env.key">
                <el-input v-model="env.value"
                          :disabled="showFlag"
                          @change="handleComAtrrChange" />
              </el-form-item>
            </template>
          </div>
        </template>
      </el-form>
    </div>
    <div class="footer"
         v-if="!showFlag">
      <el-button size="mini"
                 type="primary"
                 @click="handleOk"
                 :disabled="disabled">{{$t('common.create_now')}}</el-button>
      <el-button size="mini"
                 @click="handleCancel">{{$t('common.cancel')}}</el-button>
    </div>

    <img class="up-tag"
         @click="closeAttr"
         src="./images/down.png" />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { isEmpty } from '@/utils'
export default {
  name: 'ComAttr',
  data () {
    return {
      dialogVisible: false,
      disabled: false,
      versions: [],
      lifeStyles: [
        {
          code: 'social',
          name: '群居'
        },
        {
          code: 'solitary',
          name: '独居'
        }
      ],
      rules: {},
      info: {},
      isCustom: false,
      isLoading: false,
      storages: []
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
    },
    // 是否显示详情
    showFlag: {
      type: Boolean
    }
  },
  mounted () {
    this.getCloudStorageList().then((res) => {
      if (res.data && res.data.code === '0') {
        const result = res.data.result
        const externalStorageInfoList = result && !isEmpty(result.externalStorageInfoList) ? result.externalStorageInfoList.map(item => {
          return item.name
        }) : []
        this.storages = externalStorageInfoList
      } else {
        this.$message({
          type: 'error',
          message: res.data.message
        })
      }
    })
  },
  methods: {
    ...mapActions(['getComponentListNoPage', 'getModule', 'editModule', 'getCloudStorageList']),
    closeAttr () {
      this.dialogVisible = false
      this.$emit('update:isAtrrEditing', false)
      this.$emit('update:close', false)
    },
    handleCancel (isSubmit) {
      this.dialogVisible = false
      this.$emit('update:isAtrrEditing', false)
      isSubmit && this.$emit('update:close')
    },
    handleOpen () {
      this.dialogVisible = true
    },
    // 属性弹出层保存
    handleOk (isEditLifeStyle = false) {
      const { module, info, isCustom } = this
      if (isEditLifeStyle === true) {
        // 编辑生活方式弹层
        const params = info.lifeStyle === 'social'
          ? {
            scheduleModuleId: module.id,
            lifeStyle: info.lifeStyle,
            lifeStyleName: info.lifeStyleName
          }
          : {
            scheduleModuleId: module.id,
            lifeStyle: info.lifeStyle,
            parentScheduleModuleId: info.parentScheduleModuleId
          }
        this.editModule(params).then(res => {
          if (res.data && res.data.code === '0') {
            this.handleCancel(true)
            this.$refs['comLifeStyle'].handleCancel()
            // 刷新组件树
            this.refreshModule(module.id)
          }
        })
      } else if (isCustom) {
        // 自定义属性
        this.editModule({
          scheduleModuleId: module.id,
          moduleId: info.moduleId,
          remoteAddr: info.remoteAddr,
          remotePort: info.remotePort,
          action: isCustom ? 'external' : 'newInstall'
        }).then(res => {
          if (res.data && res.data.code === '0') {
            this.handleCancel(true)
            this.refreshModule(module.id)
          }
        })
      } else {
        // 编辑组件弹层
        const { storageSpace, envs } = this
        this.editModule({
          scheduleModuleId: module.id,
          moduleId: info.moduleId,
          storageSpace,
          envs,
          action: isCustom ? 'external' : 'newInstall'
        }).then(res => {
          if (res.data && res.data.code === '0') {
            this.handleCancel(true)
            // 刷新组件树
            this.refreshModule(module.id)
          }
        })
      }
    },
    // 获取版本集合
    getVersions (value) {
      this.versions = []
      this.getComponentListNoPage({
        f_eq_componentId: value
      }).then((res) => {
        if (res.data && res.data.code === '0') {
          if (!isEmpty(res.data.result.data)) {
            this.versions = res.data.result.data.map(item => {
              return {
                id: item.id,
                version: item.version
              }
            })
          }
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    // 获取组件详情
    getModuleDetail (scheduleModuleId) {
      this.$emit('update:loading')
      this.getModule({
        scheduleModuleId
      }).then(res => {
        if (res.data && res.data.code === '0') {
          const val = res.data.result
          let rules = {}
          this.info = val
          this.getVersions(val.componentId)
          this.isCustom = val.action === 'external'
          if (!isEmpty(val) && !isEmpty(val.envs)) {
            val.envs.forEach(env => {
              if (env.required === '1') {
                rules[env.key] = [{ required: true, message: this.$t('scheme.namePlaceholder'), trigger: 'blur' }]
              }
            })
          }
          this.rules = rules
          this.$nextTick(() => {
            // 切换时暂时清除错误提示
            this.$refs['moduleForm'] && this.$refs['moduleForm'].clearValidate()
          })
        }
        this.$emit('update:loading', true)
      })
    },
    // 切换生活方式
    handleChangeLifeStyle () {
      this.$refs['comLifeStyle'].handleOpen()
    },
    // 获取生活方式
    getLifeStyleName (row) {
      const { lifeStyles } = this
      const lifeStyle = lifeStyles.find(item => {
        return item.code === row.lifeStyle
      })
      return row.lifeStyle && row.lifeStyle !== '' && lifeStyle ? lifeStyle.name : '—'
    },
    // 生活方式弹窗更新
    handleUpdateInfo (key, value) {
      if (key) {
        this.info[key] = value
      }
      this.$emit('update:isAtrrEditing', true)
    },
    // 表单元素值发生变化
    handleComAtrrChange () {
      this.$emit('update:isAtrrEditing', true)
    },
    // 获取存储标签
    getSpaceLabel (space) {
      const typeMap = {
        'privately': this.$t('component.privatelySpace'),
        'share': this.$t('component.shareSpace'),
        'local': this.$t('component.localSpace'),
        'temp': this.$t('component.tempSpace'),
        'userlog': this.$t('component.logUserSpace'),
        'systemlog': this.$t('component.logSystemSpace')
      }
      let str = `${typeMap[space.type]}`
      if (space.type === 'share') {
        str += `-${space.claimName}`
      }
      return str
    }
  },
  watch: {
    module: function (val, oldval) {
      val.id && this.getModuleDetail(val.id)
    }
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
