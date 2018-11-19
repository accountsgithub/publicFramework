<template>
    <div>
        <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
                <div class="title-style">
                    {{proName}}
                    <span v-if="project.stateTxt == '已停止' || project.stateTxt == 'Stopped'"
                          class="prj-status">{{project.stateTxt}}</span>
                    <span v-else-if="project.stateTxt == '运行中' || project.stateTxt == 'Operating'"
                          class="prj-status prj-status-agree">{{project.stateTxt}}</span>
                    <span v-else-if="project.stateTxt == '故障' || project.stateTxt == 'Faulty/Deployment Failed'"
                          class="prj-status prj-status-back">{{project.stateTxt}}</span>
                    <span v-else-if="project.stateTxt == '初始' || project.stateTxt == 'Deploying'"
                          class="prj-status prj-status-default">{{project.stateTxt}}</span>
                    <span v-else-if="project.stateTxt == '启动中' || project.stateTxt == 'Starting'"
                          class="prj-status prj-status-begin">{{project.stateTxt}}</span>
                    <span v-else-if="project.stateTxt == '系统崩溃' || project.stateTxt == 'System Crash'"
                          class="prj-status prj-status-error">{{project.stateTxt}}</span>

                    <el-button class="prj-btn import-btn "
                               type="primary"
                               @click="importDialog"
                               icon="el-icon-upload">{{$t('projectMgt.importPackage')}}</el-button>
                    <el-button class="prj-btn"
                               type="default"
                               @click="startUp"
                               v-if="project.state !== 1 && project.state !== 3">{{$t('projectMgt.begin')}}</el-button>
                    <el-button class="prj-btn"
                               type="default"
                               @click="stopDeploy(project)"
                               v-if="project.state === 1">{{$t('projectMgt.stop')}}</el-button>
                    <el-button class="prj-btn"
                               type="default"
                               @click="beginDeploy(project)"
                               v-if="project.deployStatus && project.deployStatus === 5">{{$t('projectMgt.beiginDeploy')}}</el-button>
                    <el-button class="prj-btn"
                               type="default"
                               @click="whiteIpConfig(project)"
                               v-if="ifprod">{{$t('projectMgt.whiteIpConfig')}}</el-button>
                    <el-button class="prj-btn"
                               type="default"
                               @click="dialogChange"
                               v-if="project.state !== 4 && project.state !== 3">{{$t('projectMgt.modify')}}</el-button>
                </div>
            </div>
            <el-row :gutter="20">
                <el-form>
                    <el-col :span="3">
                        <el-form-item :label="$t('projectMgt.instanceNumber')">
                            {{project.instanceNumber}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item :label="$t('projectMgt.memorySize')">
                            {{project.memorySize ? project.memorySize : '—'}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item :label="$t('projectMgt.currVersion')">
                            {{project.version ? project.version : '—'}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item :label="$t('projectMgt.pathHerf')">
                            <a class="pathHerf"
                               :href="getPath(project.path)"
                               target="_blank">{{getPath(project.path)}}</a>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
        </el-card>
        <div style="margin-top: 10px">
            <el-tabs type="border-card"
                     @tab-click="tabChange">
                <el-tab-pane :label="$t('projectMgt.dataList_label')">
                    <!-- <list-panel> -->
                    <!-- main start -->
                    <!-- <template slot="main"> -->
                    <el-table :data="searchList"
                              class="list"
                              highlight-current-row
                              style="width: 100%"
                              stripe>
                        <el-table-column width="300"
                                         prop="podName"
                                         label="podName" />
                        <el-table-column prop="ip"
                                         label="Ip" />
                        <el-table-column prop="port"
                                         :label="$t('projectMgt.port')" />
                        <el-table-column prop="node"
                                         label="node" />
                        <el-table-column width="130"
                                         fixed="right"
                                         :label="$t('projectMgt.operation')">
                            <template slot-scope="scope">
                                <a class="tableActionStyle"
                                   @click.prevent="openTerminal(scope.row.podName)">{{$t('projectMgt.terminal')}}</a>
                                <a class="tableActionStyle"
                                   :href="downloadHref(scope.row.podName)"
                                   target="_blank">{{$t('projectMgt.downloadButton')}}</a>
                                <a class="tableActionStyle"
                                   v-if="scope.row.monitorUrl != '<no value>'"
                                   :href="scope.row.monitorUrl"
                                   target="_blank">{{$t('projectMgt.monitor')}}</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- </template> -->
                    <!-- main end -->

                    <!-- pagination start -->
                    <!-- <template slot="pagination"> -->
                    <el-pagination class="pagination"
                                   :page-size="listPaging.pageSize"
                                   :total="listPaging.total"
                                   :current-page="listPaging.pageNo + 1"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   @size-change="handleSizeChange"
                                   @current-change="handlePageChange" />
                                   <!-- </template> -->
                                   <!-- pagination end -->
                                   <!-- </list-panel> -->
                </el-tab-pane>
                <el-tab-pane :label="$t('projectMgt.deployHistory')">
                    <!-- <list-panel> -->
                    <!-- main start -->
                    <!-- <template slot="main"> -->
                    <el-table :data="historyList"
                              class="list"
                              highlight-current-row
                              style="width: 100%"
                              stripe>
                        <el-table-column prop="version"
                                         :label="$t('projectMgt.version')" />
                        <el-table-column prop="uploadMode"
                                         :label="$t('projectMgt.uploadMode')">
                            <template slot-scope="scope">
                                {{ mappingUploadMode(+scope.row.uploadMode) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="uploadType"
                                         :label="$t('projectMgt.uploadType')">
                            <template slot-scope="scope">
                                {{ mappingUploadType(+scope.row.uploadType) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="statusLabel"
                                         :label="$t('projectMgt.statusLabel')">
                            <template slot-scope="scope">
                                <span class="status-wrap">
                                    <span v-if="depolyErrorStatusLabel.indexOf(scope.row.statusLabel) !== -1"
                                          class="el_state_dot status-error">{{scope.row.statusLabel}}</span>
                                    <span v-else
                                          class="el_state_dot status-agree">{{scope.row.statusLabel}}</span>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column :formatter="formatterUpdatedTime"
                                         prop="createTime"
                                         :label="$t('projectMgt.createTime')">
                        </el-table-column>
                        <el-table-column width="130"
                                         :label="$t('projectMgt.operation')">
                            <template slot-scope="scope">
                                <el-button class="icon iconfont icon-ic-change"
                                           :class="[{tableLastButtonStyleW: true}]"
                                           @click="changeType(scope.row.id)">{{$t('projectMgt.changeTypeButton')}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- </template> -->
                    <!-- main end -->

                    <!-- pagination start -->
                    <!-- <template slot="pagination"> -->
                    <el-pagination :page-size="historyListPaging.pageSize"
                                   :total="historyListPaging.total"
                                   :current-page="historyListPaging.pageNo + 1"
                                   class="pagination"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   @size-change="handleSizeChange"
                                   @current-change="handlePageChange" />
                                   <!-- </template> -->
                                   <!-- pagination end -->
                                   <!-- </list-panel> -->
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog class="terminal-dialog"
                   :title="$t('projectMgt.terminal')"
                   :visible.sync="dialogVisible"
                   @close="closeTerminal"
                   width="800px">
            <div id="container-terminal"></div>
        </el-dialog>
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
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import API from '@/apis/api'
import { DATE_FORMAT } from '@/constants'
import { mappingValue, trim } from '@/utils'
import { UPLOAD_MODE, UPLOAD_TYPE } from '@/constants'
import EnvModify from './part/EnvModify'
import ImportPackage from './part/ImportPackage'
import WhiteList from './part/WhiteList'
import * as fit from 'xterm/lib/addons/fit/fit'
import * as attach from 'xterm/lib/addons/attach/attach'
import * as search from 'xterm/lib/addons/search/search'
import { Terminal } from 'xterm'
require('xterm/dist/xterm.css')
Terminal.applyAddon(fit)
Terminal.applyAddon(attach)
Terminal.applyAddon(search)
let term
let cmdStr
export default {
    name: 'DetailedList',
    components: {
        'env-modify': EnvModify,
        'import-package': ImportPackage,
        'white-list': WhiteList
    },
    data() {
        return {
            project: {},
            proName: this.$route.params.proName,
            titleText: '',
            tabType: '0',
            searchExample: {
                projectId: this.$route.params.id,
                pageNo: 0,
                pageSize: 10
            },
            searchCriteria: {
                projectId: this.$route.params.id,
                creatorName: '',
                pageNo: 0,
                pageSize: 10
            },
            dialogVisible: false,
            websocket: null,
            commondStr: '',
            absPath: '',
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
            envConfigDialog: false,
            importId: '',
            dialogType: 'upload',
            dialogExpoVisible: false,
            whiteIpFrom: {
                projectId: '',
                whiteList: ''
            },
            whiteIpDialog: false,
            ifprod: false,
            currentPodName: '',
            interval: null,
            depolyErrorStatusLabel: [
                this.$t('projectMgt.depolyErrorStatusLabel1'),
                this.$t('projectMgt.depolyErrorStatusLabel2'),
                this.$t('projectMgt.depolyErrorStatusLabel3'),
                this.$t('projectMgt.depolyErrorStatusLabel4')]
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
    async mounted() {
        // project
        if (JSON.parse(localStorage.getItem('token')) === 'project') {
            const project = await this.getCurrentProject({
                name: '',
                mark: '',
                pageNo: 0,
                pageSize: 10
            })
            this.searchExample['projectId'] = project.id
            this.searchCriteria['projectId'] = project.id
            this.proName = project.name
            this.project = project
            this.$nextTick(() => {
                this.interval = setInterval(() => {
                    const params = this.searchExample
                    this.getProject()
                    this.getExampleList(params)
                }, 15000)
            })
        } else {
            this.getProject()
            this.interval = setInterval(() => {
                const params = this.searchExample
                this.getProject()
                this.getExampleList(params)
            }, 15000)
        }
        this.searchListMethod()
        window.addEventListener('resize', this.resizeScreen, false)
        window.onbeforeunload = () => {
            this.closeTerminal()
        }
    },
    resizeScreen() {
        term.fit()
    },
    /*eslint-disable*/
    methods: {
        getPath (path) {
            if (path && /\[(.*)\]?/g.test(path)) {
                return JSON.parse(path)[0]
            }
        },
        openTerminal (podName) {
            this.dialogVisible = true
            this.currentPodName = podName
            this.$nextTick(() => {
                this.operate(podName)
            })
        },
        closeTerminal () {
            this.websocket.send(JSON.stringify({ 'termId': this.uuid, 'type': 'exit' }))
            this.websocket.close()
            this.commondStr = ''
            this.currentPodName = ''
            term.destroy()
        },
        operate (podName) {
            const _this = this
            let connectCount = 1
            let wirteData = ''
            let param = podName
            this.uuid = this.guid()

            this.websocket = new WebSocket(`${this.g_Config.WEBSOCKET_URL}/webterm`)
            // this.websocket = new WebSocket(`ws://prod.ctsp.kedacom.com/dolphin-ops/webterm`)
            this.websocket.onopen = () => {
                this.websocket.send(JSON.stringify({ 'pod': param, 'termId': this.uuid, 'type': 'init' }))
            }
            this.websocket.onmessage = (res) => {
                wirteData = res.data
                let escapeData = escape(wirteData)
                let atemp = ''
                //判断处理
                if (connectCount === 1) {
                    this.initTerm()
                    connectCount = 2
                    term.write(wirteData)
                }
                else if (cmdStr === '\t') {
                    if (escapeData.indexOf('%') !== -1) {
                        if (escapeData.indexOf('%0D') !== -1) {
                            escapeData = escapeData.replace(/%0D/, '')
                        }
                        if (escapeData.indexOf('%08') !== -1 && escapeData != '%20') {
                            escapeData = escapeData.replace(/%20/, '')
                        }
                        if (escapeData.indexOf('%07') !== -1) {
                            escapeData = escapeData.replace(/%07/, '')
                        }
                        wirteData = unescape(escapeData)
                    }
                    term.write(wirteData)
                    // 只累加 tab 键 返回的不带路径（包含 @、：）的数据
                    if (this.commondStr.indexOf('sz') !== -1 && wirteData.indexOf('@') === -1 && wirteData.indexOf(':') === -1) {
                        this.commondStr = trim(this.commondStr) + trim(unescape(escapeData))
                    }
                }
                else if (cmdStr.indexOf('\r') > -1) {
                    if (escapeData.indexOf('%0D') > -1) {
                        atemp = escapeData.split('%0D')
                        if ((atemp[atemp.length - 1].substring(0, 1)) != '%') {
                            escapeData = escapeData.replace(/%0D/g, '')
                            wirteData = unescape(escapeData)
                        }
                    }
                    term.write(wirteData)
                }
                else if (cmdStr == '\u0003') {
                    term.write(wirteData)
                }
                else {
                    term.write(wirteData)
                }
                // 获取路径为后面 sz 下载使用
                if (wirteData.indexOf(_this.currentPodName) !== -1 && wirteData.indexOf('@') !== -1 && wirteData.indexOf(':') !== -1) {
                    if (trim(wirteData).split('')[wirteData.length - 1] === '#') {
                        _this.absPath = wirteData
                    }
                }
            }
            this.websocket.onclose = function (e) {
                console.log(`连接已断开...>>>${e.code}`)
            }
        },
        initTerm () {
            //new 一个terminal实例，就是数据展示的屏幕和一些见简单设置，包括屏幕的宽度，高度，光标是否闪烁等等
            term = new Terminal({
                rows: 28,
                screenKeys: true,
                useStyle: true,
                cursorBlink: true
            })

            //term实时监控输入的数据，并且websocket把实时数据发送给后台
            term.on('data', (data) => {
                if (escape(data) !== '%7F' && escape(data) !== '%1B%5BD' && escape(data) !== escape('\u001b[A') && escape(data) !== escape('\u001b[B')) {
                    this.commondStr += data
                }
                this.sendInput(data)
            })
            term.attachCustomKeyEventHandler((e) => {
                let commondStr = ''
                if (e.keyCode == 13) {
                    commondStr = trim(this.commondStr)
                    // sz 开头执行下载操作
                    if (commondStr.startsWith('sz')) {
                        let path = this.absPath.indexOf(':') === -1 ? '' : this.absPath.split(':')[1]
                        let fileName = commondStr.length > 2 ? commondStr.substring(2, commondStr.length) : ''
                        path = path.replace(/[#|\s]/g, '')
                        fileName = trim(fileName)
                        this.downloadFile(`${this.g_Config.BASE_URL}${API.WEBTERMLOG}?podName=${this.currentPodName}&filePath=${path}/${fileName}`)
                        this.commondStr = ''
                        return true
                    } else {
                        this.commondStr = ''
                        return true
                    }
                } else if (e.keyCode == 8) {
                    let str = this.commondStr
                    if (str.length > 0) {
                        this.commondStr = str.substr(0, str.length - 1)
                    }
                    this.sendInput(unescape('%7F'))
                    return false
                }
            });
            term.on('title', () => {
                document.title = 'dolphin-web-term'
            })
            //屏幕将要在哪里展示，就是屏幕展示的地方
            term.open(document.getElementById('container-terminal'))
        },
        sendInput (input) {
            cmdStr = input
            if (escape(cmdStr) != escape('\u001b[A') && escape(cmdStr) != escape('\u001b[B')) {
                this.websocket.send(JSON.stringify({ 'cmd': input, 'termId': this.uuid, 'type': 'cmd' }))
            }
        },
        guid () {
            function s4 () {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()} ${s4()}${s4()}`
        },
        ...mapActions(['getHistoryList', 'getExampleList', 'changeVersion', 'getCurrentProject', 'getProjectStart', 'getProjectStop', 'getProjectDeploy']),
        // 历史查询
        searchListMethod () {
            if (this.tabType == '0') {
                const params = this.searchExample
                params['pageNo'] = 0
                this.getExampleList(params)
            } else if (this.tabType == '1') {
                const params = this.searchCriteria
                params['pageNo'] = 0
                this.getHistoryList(params)
            }
        },
        // 历史重置
        reset () {
            this.searchCriteria = {
                projectId: this.project ? this.project.id : this.$route.params.id,
                creatorName: '',
                pageNo: 0,
                pageSize: 10
            }
            this.$nextTick(() => {
                this.searchListMethod()
            })
        },
        // 切换tab
        tabChange (val) {
            this.tabType = val.index
            this.reset()
        },

        // 切换每页数据个数
        handleSizeChange (pageSize) {
            if (this.tabType == '0') {
                const params = Object.assign({}, this.searchExample, { pageSize })
                this.$set(this.searchExample, 'pageSize', pageSize)
                this.getExampleList(params)
            } else if (this.tabType == '1') {
                const params = Object.assign({}, this.searchCriteria, { pageSize })
                this.$set(this.searchCriteria, 'pageSize', pageSize)
                this.getHistoryList(params)
            }
        },

        // 翻页
        handlePageChange (pageNo) {
            if (this.tabType == '0') {
                const params = Object.assign({}, this.searchExample, { pageNo: pageNo - 1 })
                this.getExampleList(params)
            } else if (this.tabType == '1') {
                const params = Object.assign({}, this.searchCriteria, { pageNo: pageNo - 1 })
                this.getHistoryList(params)
            }
        },
        // 切换版本
        changeType (id) {
            this.$confirm(this.$t('projectMgt.changeTypeTit'), this.$t('projectMgt.changeTypeSubTit'), {
                confirmButtonText: this.$t('projectMgt.confirmButtonText'),
                cancelButtonText: this.$t('projectMgt.cancelButtonText'),
                type: 'warning',
                center: true
            }).then(() => {
                let params = Object.assign({ deployId: id })
                this.changeVersion(params).then(res => {
                    if (res.data.result.status == '200') {
                        this.$message({
                            type: 'success',
                            message: this.$t('projectMgt.changeTypeSussess')
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: this.$t('projectMgt.changeTypeError')
                        })
                    }
                })
            }).catch(() => {
                this.$message({
                    message: this.$t('projectMgt.operationCancel')
                })
            })
        },
        // 下载日志
        downloadHref (podName) {
            return `${this.g_Config.BASE_URL}/project/downloadLog/${podName}.text`
        },

        formatterUpdatedTime (row) {
            return moment(row.createTime).format(DATE_FORMAT)
        },

        mappingUploadMode (value) {
            return mappingValue(value)(UPLOAD_MODE)
        },

        mappingUploadType (value) {
            return mappingValue(value)(UPLOAD_TYPE)
        },
        async getProject () {
            const project = await this.getCurrentProject({
                projectId: this.project.id || this.$route.params.id,
                name: '',
                mark: '',
                pageNo: 0,
                pageSize: 10
            })
            this.project = project ? project : {}
        },
        //开始部署
        beginDeploy (val) {
            this.$confirm(this.$t('projectMgt.beginDeployTit'), this.$t('projectMgt.beginDeploySubTit'), {
                confirmButtonText: this.$t('projectMgt.confirmButtonText'),
                cancelButtonText: this.$t('projectMgt.cancelButtonText'),
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: this.$t('projectMgt.deployingMes'),
                })
                let params = Object.assign({ id: val.desireDeployId })
                this.getProjectDeploy(params).then(res => {
                    if (res.status === 200) {
                        this.getProject()
                    }
                })
            }).catch((
            ) => {
                this.$message({
                    message: this.$t('projectMgt.operationCancel'),
                })
            })
        },
        // 启动
        startUp (val) {
            const _this = this
            const params = {
                projectId: this.project.id,
                instance: this.project.instanceNumber,
                memory: this.project.memorySize
            }
            this.$confirm(this.$t('projectMgt.beginStartTit'), this.$t('projectMgt.beginStartSubTit'), {
                confirmButtonText: this.$t('projectMgt.confirmButtonText'),
                cancelButtonText: this.$t('projectMgt.cancelButtonText'),
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: this.$t('projectMgt.startMes'),
                })
                this.getProjectStart(params).then(res => {
                    if (res.status === 200) {
                        this.getProject()
                    }
                })
            }).catch(() => {
                this.$message({
                    message: this.$t('projectMgt.operationCancel'),
                })
            })
        },
        // 停止
        stopDeploy (val) {
            const _this = this
            this.$confirm(this.$t('projectMgt.stopStartTit'), this.$t('projectMgt.stopStartSubTit'), {
                confirmButtonText: this.$t('projectMgt.confirmButtonText'),
                cancelButtonText: this.$t('projectMgt.cancelButtonText'),
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: this.$t('projectMgt.stopMes')
                })
                let params = Object.assign({ name: val.mark })
                this.getProjectStop(params).then(res => {
                    if (res.status === 200) {
                        this.getProject()
                    }
                })
            }).catch(() => {
                this.$message({
                    message: this.$t('projectMgt.operationCancel'),
                })
            })
        },
        //白名单设置
        whiteIpConfig (row) {
            this.whiteIpDialog = true
            this.whiteIpFrom.projectId = row.id
            this.whiteIpFrom.whiteList = row.whiteList
        },
        handleWhiteIpDialogClose () {
            this.whiteIpDialog = false
        },
        // 变更
        dialogChange (record) {
            this.dialogType = ''
            this.envConfigForm.version = ''
            this.envConfigForm.desc = ''
            this.envConfigForm.uploadType = 0

            this.envConfigDialog = true
            this.envConfigForm.projectId = this.project.id
            this.envConfigForm.instanceNumber = this.project.instanceNumber
            this.envConfigForm.memorySize = this.project.memorySize
            this.envConfigForm.envVariables = this.project.env ? JSON.parse(this.project.env) : []
            this.envConfigForm.ipAlias = this.project.ipAlias ? JSON.parse(this.project.ipAlias) : []
        },
        // 变更取消
        envDialogOnClose () {
            this.envConfigDialog = false;
            this.envConfigForm.uploadType = '0';
        },
        addNewItem (prop) {
            this.envConfigForm[prop].push({ isNew: true });
        },
        deleteItem (row, prop) {
            this.envConfigForm[prop] = this.envConfigForm[prop].filter(
                item => item != row
            );
        },
        handelUploadType (type) {
            this.envConfigForm.uploadType = type;
        },
        importDialog () {
            this.dialogExpoVisible = true;
        },
        handleImportDialogClose () {
            this.dialogExpoVisible = false;
        },
        handleEnvDialogOpen (file) {
            if (file.result) {
                this.envConfigForm.auditor = file.result.auditorName
                this.envConfigForm.instanceNumber = file.result.instanceNumber
                this.envConfigForm.memorySize = file.result.memorySize
                this.importId = file.result.id
            }
            this.dialogType = 'upload'
            this.envConfigDialog = true
        },
        downloadFile (url = '') {
            var a = document.createElement("a");
            a.target = '_blank';
            a.href = url;
            a.click();
        }
    },
    computed: {
        ...mapState({
            historyListPaging: state => state.project.historyListPaging,
            historyList: state => state.project.historyList,
            searchList: state => state.project.searchList,
            listPaging: state => state.project.listPaging
        })
    },
    destroyed () {
        clearInterval(this.interval)
    }
}
</script>

<style lang="scss" scoped>
.title-style {
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #3a3a3a;
  letter-spacing: 0;
  font-weight: 800;
}
.tableActionStyle {
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #016ad5;
  letter-spacing: 0.86px;
  text-align: left;
  margin-right: 10px;
}
/deep/ .mainContainer__header {
  padding: 0 !important;
  border-bottom: 0;
  height: 0;
}
.pathHerf {
  color: #016ad5 !important;
}
.prj-status {
  display: inline-block;
  margin-left: 9px;
  padding: 0 7px;
  border-radius: 2px;
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  height: 20px;
  line-height: 20px;
  min-width: 50px;
}
.prj-status-agree {
  background: #0dcf5f;
}
.prj-status-back {
  background: #fc5555;
}
.prj-status-default {
  background: #b5b5b5;
}
.prj-status-begin {
  background: #0000ff;
}
.prj-status-error {
  background: #fb4646;
}
.prj-btn {
  float: right;
  padding-top: 0;
  padding-bottom: 0;
  height: 32px;
  line-height: 30px;
}
.import-btn {
  margin-left: 10px;
}
.searchPanel {
  margin: 0;
  padding: 0;
  padding-top: 10px;
}

/deep/ .el-form-item {
  margin-bottom: 0;
}

/deep/ .el-card__header {
  padding: 13px 20px;
}
/deep/ .el-card {
  border-radius: 0;
}
/deep/ .el-tabs--border-card,
.el-card.is-always-shadow {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05);
}

/deep/ .el-card.is-always-shadow {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05);
}

/deep/ .el-tabs__header {
  height: 46px;
  line-height: 46px;
  .el-tabs__item {
    height: 47px;
    line-height: 47px;
  }
}
</style>
