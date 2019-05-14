<template>
  <div>
    <el-form
      label-width="20px"
      class="organStyle"
      ref="item"
      :inline="true"
      :rules="rules"
      :model="formItem"
    >
      <span class="indexStyle">{{ itemCode + 1 }}</span>
      <el-form-item label=" 虚拟架构信息" label-width="100px" class="setwidth" prop="relation">
        <el-select v-model="formItem.relation" size="small" placeholder="请选择">
          <el-option label="申请人部门主管" value="SUBMIT_LEADER"></el-option>
          <el-option label="申请人上级部门主管" value="SUBMIT_PARENT_LEADER"></el-option>
          <el-option label="受理人部门主管" value="OWNER_LEADER"></el-option>
          <el-option label="受理人上级部门主管" value="OWNER_PARENT_LEADER"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="durationTime" class="time">
        <el-input v-model="formItem.durationTime" type="number" size="small" :min="0">
          <el-select v-model="formItem.timeSelect" slot="append" placeholder="请选择">
            <el-option label="min" value="m"></el-option>
            <el-option label="h" value="h"></el-option>
            <el-option label="d" value="d"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item class="time marginData" style="margin-left: 20px;">
        <span class="delete" @click="deleteItem()">删除</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'dealUserComp',
  props: ['itemCode', 'itemScope', 'itemData', 'deptList'],
  data() {
    var validateNumber = (rule, value, callback) => {
      if (value <= 0) {
        callback(new Error('输入的数字必须大于0'))
      } else {
        callback()
      }
    }
    return {
      optionProps: {
        value: 'id',
        label: 'name'
      },

      rules: {
        relation: [{ required: true, message: '请输入虚拟架构信息', trigger: 'change' }],
        durationTime: [
          { required: true, message: '请输入时间', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // this.getDeptList().then(res => {
    //   if (res) {
    //     this.options = res
    //   }
    // })
  },
  watch: {},
  computed: {
    ...mapState({}),

    formItem: {
      get() {
        return this.itemData
      }
    },
    companentId: {
      get() {
        return this.itemCode
      }
    }
  },
  methods: {
    ...mapActions(['getDeptList', 'getUserListByDeptId']),
    // 校验表单
    checkForm() {
      let that = this
      var result = new Promise(function(resolve, reject) {
        that.$refs['item'].validate(valid => {
          if (valid) {
            resolve(valid)
          } else {
            reject(new Error(valid))
          }
        })
      })
      return result
    },

    deleteItem() {
      this.$emit('deleteItem', this.itemCode)
    }
  }
}
</script>
<style lang="scss" scoped>
.step {
  border-top: 1px #e3eaf1 solid;
  height: calc(60vh - 100px);
  overflow: scroll;
  /deep/ .el-input__inner {
    width: 400px;
    height: 32px;
  }
  .organStyle {
    overflow: hidden;
    padding: 20px 38px 20px;
    max-width: 1200px;
    margin: 0;
    position: relative;

    > div {
      // float: left;

      margin: 0;
      &:last-child {
        // float: right;
      }
    }
    > span {
      padding: 0;
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 1px #c0c4cc solid;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      color: #c0c4cc;
      margin-top: 5px;
      position: relative;
      &::before {
        content: '';
        display: block;
        height: 45px;
        width: 2px;
        background: #e4e7ed;
        position: absolute;
        top: 20px;
        left: 8px;
      }
    }
    /deep/ .el-input__inner {
      width: 175px;
      height: 32px;
    }
    .setwidth {
      /deep/ .el-input__inner {
        width: 460px;
        height: 32px;
      }
    }
  }
  .manStyle {
    overflow: hidden;
    padding: 15px 0px;
    max-width: 1200px;
    margin: 0;
    > div {
      // float: left;
      margin: 0;
      &:last-child {
        // float: right;
      }
    }
  }
  .time {
    // float: right !important;
    margin-left: 40px !important;
    /deep/ .el-input__inner {
      width: 80px;
      height: 32px;
    }
  }
  .marginData {
    margin-left: 20px !important;
  }
  .btn {
    width: 400px;
    margin: 20px auto 10px;
    text-align: center;
    border: 1px #dcdfe6 dashed;
    padding: 8px 0;
    a {
      color: #00c1de;
      padding: 1px 15px;
      &:first-child {
        border-right: 1px #e3eaf1 solid;
      }
    }
  }
  .delete {
    // float: right;
    cursor: pointer;
    font-size: 12px;
    color: #f86463;
  }
}
</style>
