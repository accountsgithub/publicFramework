<template>
    <el-dialog :title="$t('part.envEditTit')"
               top="30vh"
               width="600px"
               :close-on-click-modal="false"
               :visible.sync="dialogVisible">
        <el-form size="small"
                 label-width="100px"
                 style="margin-top: -25px;"
                 :rules="rules"
                 ref="envForm"
                 :model="envConfigForm">
            <el-tabs>
                <el-tab-pane :label="$t('part.basicTab')"
                             style="padding-top: 15px;">
                    <div style="width:450px; margin: 0 auto;">
                        <el-form-item :label="$t('part.uploadField')"
                                      v-if="dialogType == 'upload'">
                            <div class="uploadType">
                                <div class="uploadField"
                                     :class="{active: envConfigForm.uploadType === 0}"
                                     @click="handelUploadType(0)">
                                    {{$t('part.bugFix')}}
                                </div>
                                <div class="uploadField"
                                     :class="{active: envConfigForm.uploadType === 1}"
                                     @click="handelUploadType(1)">
                                    {{$t('part.versionPub')}}
                                </div>
                            </div>
                        </el-form-item>

                        <el-form-item :label="$t('projectMgt.instanceNumber_label')"
                                      prop="instanceNumber">
                            <el-select style="width:100%"
                                       v-model="envConfigForm.instanceNumber"
                                       :placeholder="$t('part.instancePlaceholder')">
                                <el-option :label="1"
                                           :value="1" />
                                <el-option :label="2"
                                           :value="2" />
                                <el-option :label="3"
                                           :value="3" />
                                <el-option :label="4"
                                           :value="4" />
                                <el-option :label="5"
                                           :value="5" />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('projectMgt.memorySize')"
                                      prop="memorySize">
                            <el-select style="width:100%"
                                       v-model="envConfigForm.memorySize"
                                       :placeholder="$t('part.selectLabel')">
                                <el-option v-for="item in options"
                                           :key="item.value"
                                           :label="item.label"
                                           :value="item.label" />
                            </el-select>
                        </el-form-item>

                        <el-form-item :label="$t('part.auditor')"
                                      v-if="dialogType == 'upload'">
                            <el-input disabled
                                      v-model="envConfigForm.auditor">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('part.versionDesc')"
                                      prop="desc"
                                      v-if="dialogType == 'upload'">
                            <el-input type="textarea"
                                      v-model="envConfigForm.desc"></el-input>
                        </el-form-item>
                    </div>
                </el-tab-pane>
                <!-- 环境变量 -->
                <el-tab-pane :label="$t('part.varTab')"
                             style="text-align: center">
                    <el-table id="envTab"
                              :data="envConfigForm.envVariables"
                              width="100%"
                              max-height="300"
                              highlight-current-row
                              stripe>
                        <el-table-column property="label"
                                         :label="$t('part.variable')">
                            <template slot-scope="scope">
                                <!-- <el-form-item prop="countName"> -->
                                <el-input size="small"
                                          v-if="scope.row.isNew"
                                          v-model="scope.row.key"
                                          :placeholder="$t('part.varPlaceholder')"
                                          class="validate-style"></el-input>
                                <!-- </el-form-item> -->
                                <span v-if="!scope.row.isNew"
                                      class="noWrap">{{scope.row.key}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column property="value"
                                         :label="$t('part.value')">
                            <template slot-scope="scope">
                                <el-input size="small"
                                          v-if="scope.row.isNew"
                                          v-model="scope.row.value"
                                          :placeholder="$t('part.valuePlaceholder')"
                                          class="validate-style"></el-input>
                                <el-tooltip placement="left-start"
                                            effect="light">
                                    <div slot="content"
                                         style="width: 300px; word-wrap:break-word; word-break: break-all;">{{scope.row.value}}</div>
                                    <span v-if="!scope.row.isNew"
                                          class="noWrap">{{scope.row.value}}</span>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column property="value"
                                         width="50"
                                         :label="$t('common.operate_label')">
                            <template slot-scope="scope">
                                <a href="javascript:;"
                                   class="del"
                                   @click="deleteItem(scope.row, 'envVariables')">{{$t('part.deleteLabel')}}</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button class="addRowBtn"
                               icon="el-icon-plus"
                               size="mini"
                               @click="addNewItem('envVariables')">{{$t('part.addEnv')}}</el-button>
                </el-tab-pane>
                <el-tab-pane :label="$t('part.ipLabal')"
                             style="text-align: center">
                    <el-table :data="envConfigForm.ipAlias"
                              width="100%"
                              max-height="300"
                              highlight-current-row
                              stripe>
                        <el-table-column property="label"
                                         :label="$t('part.ipLabal')">
                            <template slot-scope="scope">
                                <el-input size="small"
                                          v-if="scope.row.isNew"
                                          v-model="scope.row.key"
                                          :placeholder="$t('part.ipLabalPlaceholder')"
                                          class="validate-style"></el-input>
                                <span v-if="!scope.row.isNew">{{scope.row.key}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column property="value"
                                         label="IP">
                            <template slot-scope="scope">
                                <el-form-item prop="IP"
                                              class="VF-style">
                                    <el-input size="small"
                                              v-if="scope.row.isNew"
                                              v-model="scope.row.value"
                                              :placeholder="$t('part.ipPlaceholder')"
                                              class="validate-text"></el-input>
                                </el-form-item>
                                <span v-if="!scope.row.isNew">{{scope.row.value}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column property="value"
                                         :label="$t('part.ipDesc')">
                            <template slot-scope="scope">
                                <el-input size="small"
                                          v-if="scope.row.isNew"
                                          v-model="scope.row.desc"
                                          :placeholder="$t('part.ipDescPlaceholder')"
                                          class="validate-style"></el-input>
                                <el-tooltip placement="left-start"
                                            effect="light">
                                    <div slot="content"
                                         style="width: 300px; word-wrap:break-word; word-break: break-all;">{{scope.row.desc}}</div>
                                    <span v-if="!scope.row.isNew"
                                          class="noWrap">{{scope.row.desc ? scope.row.desc : '--'}}</span>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column property="value"
                                         width="50"
                                         :label="$t('common.operate_label')">
                            <template slot-scope="scope">
                                <a href="javascript:;"
                                   class="del"
                                   @click="deleteItem(scope.row, 'ipAlias')">{{$t('part.deleteLabel')}}</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button class="addRowBtn"
                               icon="el-icon-plus"
                               size="mini"
                               @click="addNewItem('ipAlias')">{{$t('part.addEnv')}}</el-button>
                </el-tab-pane>
            </el-tabs>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
            <el-button @click="closeEnvDialog">{{$t('part.cancelLabel')}}</el-button>
            <el-button type="primary"
                       @click="saveEnvConfig">{{$t('part.saveLabel')}}</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { mapActions } from 'vuex';
import { MEMORY_SIZE } from '@/constants'
export default {
    name: 'EnvModify',
    props: {
        // 是否是管理员
        isAdmin: {
            type: String
        },
        // 导入部署包importId参数
        importId: {
            type: String
        },
        dialogType: {
            type: String
        },
        // 弹层显隐标志
        envConfigDialog: {
            type: Boolean
        },
        // 表单
        envConfigForm: {
            type: Object
        }
    },
    data() {
        const NumberApply = (rule, value, callback) => {
            if (value === '' || !value) {
                callback(new Error(this.$t('part.instanceMes1')));
            } else if (!/^\d+$/.test(value)) {
                callback(new Error(this.$t('part.instanceMes2')));
            } else {
                callback();
            }
        };
        return {
            options: MEMORY_SIZE,
            rules: {
                instanceNumber: [
                    { required: true, message: this.$t('part.instanceMes1'), trigger: 'blur' },
                    { validator: NumberApply, trigger: 'blur' }
                ],
                memorySize: [
                    { required: true, message: this.$t('part.memorySizeMes'), trigger: 'blur' }
                ],
                auditor: [{ required: true, message: this.$t('part.auditorMes'), trigger: 'blur' }],
                uploadType: [
                    { required: true, message: this.$t('part.uploadFieldMes'), trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        dialogVisible: {
            get() {
                return this.envConfigDialog
            },
            set() {
                this.$emit('update:close')
            }
        }
    },
    methods: {
        ...mapActions(['saveEnv', 'saveUplaod']),
        // 变量名校验
        hasEnvValidErr(envVariables) {
            let has = false
            has = envVariables.some(item => {
                if (!item.key || (item.key !== '' && /^[A-Za-z_][A-Za-z0-9_]$/.test(item.key))) {
                    this.$message({
                        type: 'error',
                        message: this.$t('part.valueMes')
                    })
                    return true
                } else if (!item.value) {
                    this.$message({
                        type: 'error',
                        message: this.$t('part.valueMes')
                    })
                    return true
                } else {
                    return false
                }
            })
            return has
        },
        // ip校验
        hasIpValidErr(ipAlias) {
            let has = false
            has = ipAlias.some(item => {
                if (!item.value || (item.value != '' && /^((25[0-5]|2[0-4]\\d|[1]{1}\\d{1}\\d{1}|[1-9]{1}\\d{1}|\\d{1})($|(?!\\.$)\\.)){4}$/.test(item.value))) {
                    this.$message({
                        type: 'error',
                        message: this.$t('part.ipMes')
                    })
                    return true
                } else if (!item.key) {
                    this.$message({
                        type: 'error',
                        message: this.$t('part.ipLabalMes')
                    })
                    return true
                } else {
                    return false
                }
            })
            return has
        },
        addNewItem(prop) {
            const checkErrFn = prop === 'envVariables' ? this.hasEnvValidErr : this.hasIpValidErr
            const arr = prop === 'envVariables' ? this.envConfigForm.envVariables : this.envConfigForm.ipAlias
            if (!checkErrFn(arr)) {
                this.$emit('add:item', prop);
            }
        },

        deleteItem(row, prop) {
            this.$emit('delete:item', row, prop);
        },

        handelUploadType(type) {
            this.$emit('update:uploadType', type);
        },

        closeEnvDialog() {
            this.$emit('update:close')
            this.$refs['envForm'].resetFields();
        },

        saveEnvConfig() {
            this.$refs['envForm'].validate(valid => {
                if (valid) {
                    const {
                        instanceNumber,
                        memorySize,
                        envVariables,
                        ipAlias,
                        projectId,
                        auditor,
                        desc,
                        uploadType
                    } = this.envConfigForm;
                    if (envVariables.length > 0 && this.hasEnvValidErr(envVariables)) {
                        return;
                    }
                    if (ipAlias.length > 0 && this.hasIpValidErr(ipAlias)) {
                        return;
                    }
                    if (this.dialogType == 'upload') {
                        const params = {
                            importId: this.importId,
                            auditor,
                            desc,
                            uploadType,
                            instanceNumber: instanceNumber,
                            memorySize: memorySize,
                            env: JSON.stringify(envVariables),
                            ipAlias: JSON.stringify(ipAlias)
                        };
                        this.saveUplaod(params).then(() => {
                            this.$message({
                                message: this.$t('part.saveSuccessMes'),
                                type: 'success'
                            });
                            this.closeEnvDialog();
                        });
                    } else {
                        const params = {
                            isAdmin: this.isAdmin,
                            projectId,
                            instance: instanceNumber,
                            memory: memorySize,
                            env: JSON.stringify(envVariables),
                            ipAlias: JSON.stringify(ipAlias),
                            searchParams: this.searchCriteria
                        };
                        this.saveEnv(params).then(() => {
                            this.$message({
                                message: this.$t('part.saveSuccessMes'),
                                type: 'success'
                            });
                            this.closeEnvDialog();
                        });
                    }
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~@/styles/common.scss';

.addRowBtn {
  padding: 7px 15px !important;
  margin-top: 18px;
  &:hover {
    color: #016ad5;
  }
}
.noWrap {
  white-space: nowrap !important;
}

@include e(body) {
  padding: 0 30px;
  .list {
    padding: 0 30px;
    &.el-table::before {
      height: 0 !important;
    }
  }
}

// 验证样式
.validate-style {
  margin-bottom: 0;
}
.validate-text {
  margin-left: -100px;
  width: 120px;
}
.el-table__body-wrapper .VF-style {
  margin-bottom: 0;
  /deep/ .el-form-item__error {
    left: -100px !important;
  }
}

// 上传类型button
.uploadType {
  display: flex;
  height: 30px;
  line-height: 1px;
  align-items: center;
  .uploadField {
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #606266;
    letter-spacing: 0;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    width: 78px;
    height: 30px;
    line-height: 28px;
    cursor: pointer;
    margin-right: 20px;
    &:hover,
    &.active {
      border-color: #016ad5;
      color: #016ad5;
    }
  }
}

.formPanel {
  width: 100% !important;
  display: flex;
  justify-content: space-between;
}

.del {
  color: #016ad5;
}

/deep/ .el-tabs__header {
  margin-bottom: 0;
}
</style>
