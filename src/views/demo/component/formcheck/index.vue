<template>
  <list-panel>
    <template slot="header">
      <span class="header__title" style="font-size:18px;">动态表单验证(二)</span>
    </template>
    <template slot="main">
      <div class="btnFooter">
        <el-radio-group v-model="type">
          <el-radio-button label="2">不可拖拽</el-radio-button>
          <el-radio-button label="1">可拖拽</el-radio-button>
        </el-radio-group>
      </div>
      <div class="step">
        <div class="step-content">
          <div style="padding:15px 40px;">
            <p style="color: #313334;font-size: 14px;margin-bottom:2px;">自定义审批流</p>
            <p style="color: #606266;font-size: 12px;margin-top:0px;margin-bottom:2px;">
              点击下方按钮，配置审批流程
            </p>
          </div>
          <div class="btn">
            <a @click="addOrgan">添加组织架构</a>
          </div>
          <!-- 可拖拽的动态表单 -->
          <draggable
            v-model="checkList"
            v-if="type == '1'"
            v-bind="dragOptions3"
            @start="drag3 = true"
            class="list-group"
            @end="drag3 = false"
          >
            <transition-group type="transition" :name="!drag3 ? 'flip-list' : null">
              <div
                v-for="(item, index) in checkList"
                :key="index"
                title="可拖拽改变顺序"
                class="stepItem"
              >
                <formItem
                  :class="
                    index == checkList.length - 1 ? 'list-group-item noline' : 'list-group-item'
                  "
                  ref="formItem"
                  v-if="checkList.length > 0"
                  @deleteItem="deleteItem"
                  :deptList="deptList"
                  :itemData="item"
                  :itemScope="item.scope"
                  :itemCode="index"
                />
              </div>
            </transition-group>
          </draggable>
          <!-- 无拖拽的动态表单 -->
          <div v-if="type == '2'" v-for="(item, index) in checkList" :key="index">
            <formItem
              ref="formItem"
              :class="index == checkList.length - 1 ? 'noline' : ''"
              v-if="checkList.length > 0"
              @deleteItem="deleteItem"
              :deptList="deptList"
              :itemData="item"
              :itemScope="item.scope"
              :itemCode="index"
            />
          </div>
          <!-- 按钮 -->
          <div v-if="checkList.length > 0" class="btnFooter">
            <el-button @click="reset">取消</el-button>
            <el-button type="primary" @click="submitForm()" :loading="btnLoading">确定</el-button>
          </div>
        </div>
      </div>
    </template>
  </list-panel>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import formItem from '@/components/formItem'
export default {
  components: {
    draggable,
    formItem
  },
  data() {
    return {
      deptList: [],
      checkList: [],
      drag3: false,
      type: '2',
      btnLoading: false
    }
  },
  mounted() {
    this.checkList = [
      {
        durationTime: '10',
        relation: 'SUBMIT_LEADER',
        timeSelect: 'm'
      },
      {
        durationTime: '30',
        relation: 'SUBMIT_PARENT_LEADER',
        timeSelect: 'm'
      }
    ]
  },
  computed: {
    ...mapState({}),
    dragOptions3() {
      return {
        animation2: 200,
        group2: 'description',
        disabled2: false,
        ghostClass2: 'ghost'
      }
    }
  },
  methods: {
    ...mapActions(['getformDataAPI', 'getformDetailAPI']),
    // 获取动态表单列表
    addOrgan() {
      this.checkList.push({
        durationTime: '',
        relation: '',
        timeSelect: 'm'
      })
    },
    deleteItem(index) {
      this.checkList.splice(index, 1)
    },
    submitForm() {
      let formList = this.$refs.formItem
      let resultArr = []
      if (formList && formList.length > 0) {
        formList.forEach(item => {
          resultArr.push(item.checkForm())
        })
      }
      Promise.all(resultArr)
        .then(() => {
          console.log(this.checkList)
          // ===================接口处理=====================
          this.$message({
            type: 'success',
            message: '通过校验！'
          })
        })
        .catch(function(e) {
          console.log('审批流程校验未通过', e)
        })
    },
    reset(formName) {
      // this.$refs[formName].resetFields()
      this.checkList = []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/common.scss';
// 重写form样式
.step {
  // border-top: 1px #e3eaf1 solid;
  // height: calc(60vh - 60px);
  overflow: hidden;
  /deep/ .el-input__inner {
    // max-width: 188px;
    height: 32px;
  }
  .organStyle {
    overflow: hidden;
    padding: 15px 0px;
    max-width: 1200px;
    margin: 0 auto;
    > div {
      float: left;
      margin: 0;
      &:last-child {
        float: right;
      }
    }
  }
  .manStyle {
    overflow: hidden;
    padding: 15px 0px;
    max-width: 1200px;
    margin: 0;
    > div {
      float: left;
      margin: 0;
      &:last-child {
        float: right;
      }
    }
  }
  .time {
    float: right !important;
  }
  .btn {
    width: 400px;
    margin: 0px 40px 10px;
    text-align: center;
    border: 1px #dcdfe6 dashed;
    padding: 8px 0;
    a {
      color: #00c1de;
      padding: 1px 15px;
    }
  }
  .delete {
    // float: right;
    cursor: pointer;
    font-size: 12px;
    color: #f86463;
  }
  .step-left {
    width: 200px;
    float: left;
    border-right: 1px #e3eaf1 solid;
    height: 100%;
    .step-left-btn {
      padding: 20px 10px 10px 0;
      a {
        display: block;
        width: 158px;
        height: 40px;
        line-height: 40px;
        margin: 15px auto;
        text-align: center;
        font-size: 14px;
        border: 1px solid #dcdfe6;
      }
      .stepIcon {
        margin-right: 10px;
        color: #d8d8d8;
      }
      .active {
        background: #00c1de;
        color: #fff;
        .stepIcon {
          color: #fff;
        }
      }
    }
  }
  .step-content {
    width: 100%;
    height: calc(100vh - 150px);
    overflow: scroll;
  }

  .stepItem {
    cursor: pointer;
    &:hover {
      background: rgba(228, 251, 255, 0.4);
    }
  }
}
.btnFooter {
  padding: 20px 43px 20px;
}
.noline {
  .organStyle {
    span {
      &::before {
        width: 0px;
      }
    }
  }
}
</style>
