<template>
  <list-panel>
    <template slot="header">
      <span class="header__title" style="font-size:18px;">动态表单验证(二)</span>
    </template>
    <template slot="main">
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
          <draggable
            v-model="checkList"
            v-bind="dragOptions3"
            @start="drag3 = true"
            class="list-group"
            @end="drag3 = false"
          >
            <transition-group type="transition" :name="!drag3 ? 'flip-list' : null">
              <div v-for="(item, index) in checkList" :key="index">
                <formItem
                  :class="
                    index == checkList.length - 1 ? 'list-group-item noline' : 'list-group-item'
                  "
                  ref="formItem"
                  v-if="checkList.length > 0 && item.scope == '0'"
                  @deleteItem="deleteItem"
                  :deptList="deptList"
                  :itemData="item"
                  :itemScope="item.scope"
                  :itemCode="index"
                />
              </div>
            </transition-group>
          </draggable>

          <!-- <div class="noList"
              v-show="checkList.length==0">
            <img :src="nopage"
                alt="nopage">
            <p>点击下方按钮，配置模板审批流程</p>
          </div> -->
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
      drag3: false
    }
  },
  mounted() {},
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
        scope: '0', // 审核部门
        approveIndex: '',
        deptIdArr: [],
        deptId: '',
        deptName: '',
        NewuserIds: [],
        userList: [],
        // userName: '',
        // userMail: '',
        relation: '',
        duration: '',
        durationTime: '',
        timeSelect: 'm',
        sortIndex: ''
      })
    },
    addMan() {
      this.checkList.push({
        scope: '1', // 审核人
        approveIndex: '',
        deptIdArr: [],
        deptId: '',
        deptName: '',
        NewuserIds: [],
        userList: [],
        // userName: '',
        // userMail: '',
        relation: '',
        duration: '',
        durationTime: '',
        timeSelect: 'm',
        sortIndex: ''
      })
    },
    deleteItem(index) {
      this.checkList.splice(index, 1)
    },
    submitForm(formName) {},
    reset(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/common.scss';
// 重写form样式
.step {
  border-top: 1px #e3eaf1 solid;
  height: calc(60vh - 60px);
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
    height: calc(100vh - 420px);
    overflow: scroll;
  }
}
</style>
