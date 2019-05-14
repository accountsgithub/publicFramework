<template>
  <list-panel>
    <template slot="header">
      <span class="header__title" style="font-size:18px;">动态表单验证(一)</span>
    </template>
    <template slot="main">
      <el-form
        label-position="top"
        :model="sheetForm"
        ref="sheetForm"
        :rules="rules"
        :inline="true"
        label-width="200px"
      >
        <div class="form-center-wrapper">
          <div class="tit">动态表单验证----接口返回表单项</div>
          <div class="con">
            <el-form-item slot="label" class="full" prop="templateId">
              <template slot="label">
                <span class="label-tit">
                  工单模板
                </span>
                <span class="label-sub-tit">请输入工单模板</span>
              </template>
              <el-select
                v-model="sheetForm.templateId"
                filterable
                remote
                reserve-keyword
                placeholder="请选择工单模板"
                @change="changeFormData"
              >
                <el-option
                  v-for="item in workSheet"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                  <span style="float: left;font-size: 12px">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 10px">{{
                    item.deptName
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 先隐藏form部分 -->
            <div v-if="sheetForm.templateId" class="formBody">
              <!-- <div> -->
              <el-form-item label="主题" prop="title">
                <el-input v-model="sheetForm.title"></el-input>
              </el-form-item>
              <div v-for="(item, index) in sheetForm.formDataList">
                <el-form-item
                  :label="item.name"
                  :key="index"
                  :prop="'formDataList.' + index + '.value'"
                  :rules="{
                    required: item.required,
                    message: '请输入' + item.name,
                    trigger: 'blur'
                  }"
                  v-if="item.type != 'select'"
                >
                  <el-input
                    v-model="item.value"
                    :placeholder="item.description ? item.description : '请输入'"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  :label="item.name"
                  :key="index"
                  :prop="'formDataList.' + index + '.value'"
                  :rules="{
                    required: item.required,
                    message: '请选择' + item.name,
                    trigger: 'change'
                  }"
                  v-if="item.type === 'select'"
                >
                  <el-select
                    v-model="item.value"
                    :placeholder="item.description ? item.description : '请选择'"
                  >
                    <el-option
                      v-for="(inner, index) in item.data.split(',')"
                      :key="index"
                      :label="inner"
                      :value="inner"
                    >
                      {{ inner }}
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item label="备注" prop="summary">
                <el-input type="textarea" v-model="sheetForm.summary"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="footer">
            <el-button @click="reset('sheetForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('sheetForm')">确定</el-button>
          </div>
        </div>
      </el-form>
    </template>
  </list-panel>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  components: {},
  data() {
    return {
      workSheet: [],
      formSorce: {},
      sheetForm: {
        id: '',
        templateId: '',
        title: '',
        summary: '',
        requestFields: '',
        formDataList: []
      },
      rules: {
        templateId: [{ required: true, message: '请选择工单模板', trigger: 'change' }],
        title: [{ required: true, message: '请输入主题', trigger: 'blur' }],
        summary: [
          // { required: true, message: '请填写备注', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getFormList()
    this.getFormSource()
  },
  computed: {
    ...mapState({})
  },
  methods: {
    ...mapActions(['getformDataAPI', 'getformDetailAPI']),
    // 获取动态表单列表
    getFormList() {
      this.getformDataAPI().then(res => {
        this.workSheet = res.result.data
      })
    },
    getFormSource() {
      this.getformDetailAPI().then(res => {
        this.formSorce = res.result
      })
    },
    changeFormData(val) {
      this.sheetForm.formDataList = this.formSorce[val].requestFields
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('submit!!')
        } else {
          console.log('error!!')
          return false
        }
      })
    },
    reset(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/common.scss';
// 重写form样式
.full,
.formBody {
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-form-item {
    width: 100%;
  }
  /deep/ .el-form-item__error {
    top: -30px;
    right: 0;
    text-align: right;
  }
}
</style>
