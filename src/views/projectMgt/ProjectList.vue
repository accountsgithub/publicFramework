<template>
    <!-- search -->
    <div>
        <SearchPanel>
            <el-form :inline="true"
                     size="small"
                     :model="searchCriteria"
                     class="formPanel"
                     label-width="80px">
                <div>
                    <el-form-item :label="$t('projectMgt.name_label')">
                        <el-input v-model="searchCriteria.name"
                                  @keyup.enter.native="searchProject"
                                  :placeholder="$t('projectMgt.name_placeholder')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('projectMgt.mark_label')">
                        <el-input v-model="searchCriteria.mark"
                                  @keyup.enter.native="searchProject"
                                  :placeholder="$t('projectMgt.mark_placeholder')"></el-input>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary"
                               @click="searchProject"
                               class="tableLastButtonStyleB icon iconfont icon-ic-search">{{$t('common.search_button')}}</el-button>
                    <el-button @click="reset"
                               class="tableLastButtonStyleW icon iconfont icon-ic-refresh"
                               style="margin-right: -10px;">{{$t('common.reset_button')}}</el-button>
                </el-form-item>
            </el-form>
        </SearchPanel>

        <list-panel>
            <!-- header start -->
            <template slot="header">
                <span class="header__title">{{$t('projectMgt.project_list_title')}}</span>
                <el-button @click="importDialog"
                           class="tableLastButtonStyleW icon iconfont icon-ic-import">{{$t('projectMgt.import_button')}}</el-button>
            </template>
            <!-- header end -->

            <!-- main start -->
            <template slot="main">
                <el-table :data="list"
                          class="list"
                          highlight-current-row
                          style="width: 100%"
                          stripe>
                    <el-table-column prop="name"
                                     :label="$t('projectMgt.name_label')" />
                    <el-table-column prop="mark"
                                     :label="$t('projectMgt.mark_label')" />
                    <el-table-column prop="state"
                                     width="120"
                                     :label="$t('projectMgt.status_label')">
                        <template slot-scope="scope">
                            <tableStatus :statusType="statusArray[+scope.row.state]"></tableStatus>
                        </template>
                    </el-table-column>
                    <el-table-column prop="instanceNumber"
                                     width="120"
                                     :label="$t('projectMgt.instanceNumber_label')" />
                    <el-table-column prop="memorySize"
                                     width="120"
                                     :label="$t('projectMgt.memorySize_label')">
                    </el-table-column>
                    <el-table-column prop="version"
                                     width="130"
                                     :label="$t('projectMgt.version_label')">
                        <template slot-scope="scope">
                            <span v-if="scope.row.version">{{scope.row.version}}</span>
                            <span v-else>—</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="path"
                                     :label="$t('projectMgt.path_label')">
                        <template slot-scope="scope">
                            <a class="pathHerf"
                               v-if="getPath(scope.row.path)"
                               :href="getPath(scope.row.path)"
                               target="_blank">{{getPath(scope.row.path)}}</a>
                            <span v-else>—</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('common.operate_label')"
                                     :width="165">
                        <template slot-scope="scope">
                            <a class="tableActionStyle"
                               @click="stopDeploy(scope.row)"
                               v-if="scope.row.state === 1">{{$t('projectMgt.stop_button')}}</a>
                            <a class="tableActionStyle"
                               @click="startUp(scope.row)"
                               v-else-if="scope.row.state !== 1 && scope.row.state !== 3">{{$t('projectMgt.start_button')}}</a>
                            <a class="tableActionStyle"
                               @click="beginDeploy(scope.row)"
                               v-if="scope.row.deployStatus && scope.row.deployStatus === 5">{{$t('projectMgt.deploy_button')}}</a>
                            <a class="tableActionStyle"
                               v-if="ifprod"
                               @click="whiteIpConfig(scope.row)">{{$t('projectMgt.whitelist_set_button')}}</a>
                            <el-dropdown trigger="click">
                                <el-button size="small"
                                           type="text">
                                    更多
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown"
                                                  class="more-ops">
                                    <!--<a class="tableActionStyle" @click="whiteIpConfig(scope.row)">白名单设置</a>-->
                                    <el-dropdown-item>
                                        <a class="tableActionStyle"
                                           @click="dialogChange(scope.row)"
                                           v-if="scope.row.state !== 4 && scope.row.state !== 5">{{$t('projectMgt.change_button')}}</a>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <a class="tableActionStyle"
                                           @click="dialogInfo(scope.row)"
                                           v-if="scope.row.state !== 4 && scope.row.state !== 5">{{$t('projectMgt.showDetail_button')}}</a>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <a class="tableActionStyle"
                                           @click="addEmail(scope.row)">{{$t('projectMgt.addEmail_button')}}</a>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <!-- main end -->

            <!-- pagination start -->
            <template slot="pagination">
                <el-pagination v-if="paging.total != 0"
                               :page-size="paging.pageSize"
                               :total="paging.total"
                               :current-page="paging.pageNo + 1"
                               class="pagination"
                               layout="total, sizes, prev, pager, next, jumper"
                               @size-change="handleSizeChange"
                               @current-change="handlePageChange" />
            </template>
            <!-- pagination end -->
        </list-panel>
        <env-modify v-on:update:close="envDialogOnClose"
                    v-on:add:item="addNewItem"
                    v-on:delete:item="deleteItem"
                    v-on:update:uploadType="handelUploadType"
                    :onClose="envDialogOnClose"
                    :envConfigDialog.sync="envConfigDialog"
                    :envConfigForm.sync="envConfigForm"
                    :dialogType.sync="dialogType"
                    :importId.sync="importId"
                    isAdmin="0">
        </env-modify>
        <import-package v-on:update:close="handleImportDialogClose"
                        v-on:env:dialog:open="handleEnvDialogOpen"
                        :dialogExpoVisible.sync="dialogExpoVisible">
        </import-package>
        <white-list v-on:update:close="handleWhiteIpDialogClose"
                    :whiteIpDialog.sync="whiteIpDialog"
                    :whiteIpFrom.sync="whiteIpFrom"></white-list>
        <email-list v-on:update:close="handleEmailListDialogClose"
                    :EmailDialog.sync="EmailDialog"
                    :EmailForm.sync="EmailForm"></email-list>
    </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import tableStatus from '@/components/Status'
import { SearchPanel } from '@/components/layout'
import EnvModify from './part/EnvModify'
import ImportPackage from './part/ImportPackage'
import WhiteList from './part/WhiteList'
import EmailList from './part/EmailList'
export default {
    components: {
        SearchPanel,
        tableStatus,
        'env-modify': EnvModify,
        'import-package': ImportPackage,
        'white-list': WhiteList,
        'email-list': EmailList
    },

    data() {
        return {
            dialogType: 'upload',
            // import begin
            dialogExpoVisible: false,
            envConfigDialog: false,
            whiteIpDialog: false,
            EmailDialog: false,
            exportData: {},
            tempPS: 10,
            tempPN: 0,
            defaultUploadList: [],
            // 启动
            startForm: {
                projectId: '',
                instance: '',
                memory: ''
            },
            importId: '', //导入部署包importId参数
            envConfigForm: {
                projectId: '',
                instanceNumber: '',
                memorySize: '',
                envVariables: [],
                ipAlias: [],
                // 上传
                auditor: 'admin',
                desc: '',
                uploadType: 0,
                interval: null,
            },
            whiteIpFrom: {
                projectId: '',
                whiteList: ''
            },
            EmailForm: {
                projectId: '',
                emails: ''
            },
            statusArray: [
                this.$t('projectMgt.stop_data'),
                this.$t('projectMgt.running_data'),
                this.$t('projectMgt.deploy_data'),
                this.$t('projectMgt.start_data'),
                this.$t('projectMgt.error_data'),
                this.$t('projectMgt.init_data'),
                this.$t('projectMgt.systemError_data')],
            basePath: '',
            ifprod: false
        }
    },
    created: function() {
        var location = (`${window.location}`).split('/');
        var path = location[2];
        this.basePath = path;
        if (path.indexOf('prod') !== -1) {
            this.ifprod = true;
        }
    },
    methods: {
        ...mapActions(['getProjectList', 'getProjectStart', 'saveEnv', 'saveUplaod', 'getProjectStop', 'getProjectDeploy', 'setWhiteIp', 'setEmail', 'resetSearchCriteria']),

        getPath(path) {
            if (path && /\[(.*)\]?/g.test(path)) {
                return JSON.parse(path)[0]
            }
        },
        // 详情
        dialogInfo(row) {
            this.$router.push({ name: 'detailedList', params: { id: row.id, proName: row.name } })
        },
        submitUpload() {
            this.$refs.upload.submit()
        },
        searchProject() {
            const params = this.searchCriteria
            params['pageNo'] = 0
            this.getProjectList(params)
        },
        reset() {
            this.resetSearchCriteria();
            this.getProjectList(this.searchCriteria)
        },
        handleSizeChange(pageSize) {
            this.tempPS = pageSize
            const params = Object.assign({}, this.searchCriteria, { pageSize })
            this.getProjectList(params)
        },
        handlePageChange(pageNo) {
            const params = Object.assign({}, this.searchCriteria, { pageNo: pageNo - 1 })
            this.getProjectList(params)
        },
        // 变更
        dialogChange(record) {
            this.dialogType = ''
            this.envConfigForm.version = ''
            this.envConfigForm.desc = ''
            this.envConfigForm.uploadType = 0

            this.envConfigDialog = true
            this.envConfigForm.projectId = record.id
            this.envConfigForm.instanceNumber = record.instanceNumber
            this.envConfigForm.memorySize = record.memorySize
            this.envConfigForm.envVariables = record.env ? JSON.parse(record.env) : []
            this.envConfigForm.ipAlias = record.ipAlias ? JSON.parse(record.ipAlias) : []
        },
        // 变更取消
        envDialogOnClose() {
            this.envConfigDialog = false;
            this.envConfigForm.uploadType = '0';
        },
        addNewItem(prop) {
            this.envConfigForm[prop].push({ isNew: true })
        },

        deleteItem(row, prop) {
            this.envConfigForm[prop] = this.envConfigForm[prop].filter(item => item != row);
        },
        handelUploadType(type) {
            this.envConfigForm.uploadType = type
        },
        importDialog() {
            this.dialogExpoVisible = true;
        },
        handleImportDialogClose() {
            this.dialogExpoVisible = false;
        },
        handleEnvDialogOpen(file) {
            if (file.result) {
                this.envConfigForm.auditor = file.result.auditorName
                this.envConfigForm.instanceNumber = file.result.instanceNumber
                this.envConfigForm.memorySize = file.result.memorySize
                this.importId = file.result.id
            }
            this.dialogType = 'upload'
            this.envConfigDialog = true
        },
        //开始部署
        beginDeploy(val) {
            this.$confirm(this.$t('projectMgt.isDeploy_message'), this.$t('projectMgt.sureDeploy_message'), {
                confirmButtonText: this.$t('common.sure_button'),
                cancelButtonText: this.$t('common.cancel_button'),
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: this.$t('projectMgt.deploying_message')
                })
                let params = Object.assign({ id: val.desireDeployId })
                this.getProjectDeploy(params).then(res => {
                    if (res.status === 200) {
                        this.searchProject()
                    }
                })
            }).catch((
            ) => {
                this.$message({
                    message: this.$t('projectMgt.cancel_message')
                })
            })
        },

        // 启动
        startUp(val) {
            this.$confirm(this.$t('projectMgt.isStart_message'), this.$t('projectMgt.sureStart_message'), {
                confirmButtonText: this.$t('common.sure_button'),
                cancelButtonText: this.$t('common.cancel_button'),
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: this.$t('projectMgt.starting_message')
                })
                this.startForm.projectId = val.id
                this.startForm.instance = val.instanceNumber
                this.startForm.memory = val.memorySize
                let params = Object.assign(this.startForm)
                this.getProjectStart(params).then(res => {
                    if (res.status === 200) {
                        this.searchProject()
                    }
                })
            }).catch(() => {
                this.$message({
                    message: this.$t('projectMgt.start_message')
                })
            })
        },

        // 停止
        stopDeploy(val) {
            this.$confirm(this.$t('projectMgt.isStop_message'), this.$t('projectMgt.sureStop_message'), {
                confirmButtonText: this.$t('common.sure_button'),
                cancelButtonText: this.$t('common.cancel_button'),
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: this.$t('projectMgt.stoping_message')
                })
                let params = Object.assign({ name: val.mark })
                this.getProjectStop(params).then(res => {
                    if (res.status === 200) {
                        this.searchProject()
                    }
                })
            }).catch(() => {
                this.$message({
                    message: this.$t('projectMgt.stop_message')
                })
            })
        },
        //白名单设置
        whiteIpConfig(row) {
            this.whiteIpDialog = true
            this.whiteIpFrom.projectId = row.id
            this.whiteIpFrom.whiteList = row.whiteList
        },

        addEmail(row) {
            this.EmailDialog = true
            this.EmailForm.projectId = row.id
            this.EmailForm.emails = row.emails

        },
        handleWhiteIpDialogClose() {
            this.whiteIpDialog = false
        },
        handleEmailListDialogClose() {
            this.EmailDialog = false
        }
    },

    computed: {
        ...mapState({
            list: (state) => {
                return state.project.elements
            },
            paging: state => state.project.paging,
            auditor: 'admin',
            searchCriteria: state => state.project.searchCriteria
        })
    },


    mounted() {
        const _this = this
        let params = this.searchCriteria
        this.getProjectList(params)
        this.interval = setInterval(() => {
            params = _this.searchCriteria
            _this.getProjectList(params)
        }, 15000);
    },

    destroyed() {
        clearInterval(this.interval)
    },
    /*eslint-disable*/
    beforeRouteEnter (to, from, next) {
        try {
            if (JSON.parse(localStorage.getItem('token')) === 'project') {
                next(vm => {
                    vm.$router.replace({ name: 'projectItem' })
                })
            } else {
                next()
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/common.scss';

// 操作标签样式
.tableActionStyle {
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #016ad5;
  letter-spacing: 0.86px;
  text-align: left;
  margin-right: 10px;
}

.projectDropDown {
  font-size: 12px !important;
  border: 1px solid $dropDown-border-color !important;
  border-radius: 4px;
  padding: 4px 12px;
}
/deep/ .el-upload-dragger {
  width: 560px;
}
.pathHerf {
  color: #016ad5 !important;
}

.addRowBtn {
  padding: 7px 15px !important;
  margin-top: 18px;
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
  margin-bottom: 18px;
}
.validate-text {
  margin-left: -100px;
  width: 120px;
}
.VF-style {
  /deep/ .el-form-item__error {
    left: -100px !important;
  }
}

.formPanel {
  width: 100% !important;
  display: flex;
  justify-content: space-between;
}
.more-ops a {
  display: inline-block;
  height: 100%;
  width: 100%;
}
</style>
