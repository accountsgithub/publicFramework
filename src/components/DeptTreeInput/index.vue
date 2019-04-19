<template>
  <div class="deptTreeInput" id="deptTreeInput" @mouseleave="deptTreeMouseLeave" @mouseover="deptTreeMouseEnter">
    <div @click="inputClick" @mouseleave="inputMouseLeave">
      <el-input
        id="dept"
        class="dept"
        readonly
        v-model="departmentSelected[prop.name]"
        :placeholder="placeholder"
        :size='size'>
        <i slot="suffix" class="el-icon-close" @click="clearInput($event)" v-if="clearable && mouseEnter && departmentSelected[prop.name]"></i>
        <i slot="suffix" class="el-icon-arrow-down" :class="{arrowup: !arrowUp,arrowdown: arrowUp}" v-else></i>
      </el-input>
    </div>
    <el-collapse-transition>
      <div class="options" v-if="!arrowUp" id="options">
        <el-input id="dept_search" v-model="department" :placeholder="innerPlaceHolder" class="dept-search" :size="innerSize"></el-input>
        <el-tree :data="data" :props="defaultProps" @node-click="handleHideTree" :filter-node-method="handleFilterNode" ref="deptTree"></el-tree>
      </div>
    </el-collapse-transition>
    <div class="showMsg" v-if="showMsg">{{rule.message}}</div>
  </div>
</template>
<script>
  /**
   *  data 数据源
   *  placeholder 输入框提示
   *  innerPlaceHolder 下拉框中输入提示
   *  size 输入框大小 默认small
   *  innerSize 下拉框输入框大小 默认small
   *  prop 数据源绑定的值
   *  hover 鼠标悬浮弹出对话框
   *  hideOnClick 隐藏下拉框的方式  点击除下拉框以外的区域 或 者鼠标移出
   *  rule 验证是否必填 requie true 为必填  message 必填时候没填的提示 验证的时候需调用 validate 方法 返回布尔值
   * */
  export default {
    name: 'DeptTreeInput',
    props: {
      data: {
        type: Array,
        default: () => []
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      innerPlaceHolder: {
        type: String,
        default: '请输入'
      },
      size: {
        type: String,
        default: 'small'
      },
      innerSize: {
        type: String,
        default: 'small'
      },
      prop: {
        type: Object,
        default: () => {
          return {
            name: 'name',
            code: 'code',
            children: 'children'
          }
        }
      },
      clearable: {
        type: Boolean,
        default: false
      },
      hover: {
        type: Boolean,
        default: false
      },
      hideOnClick: {
        type: Boolean,
        default: true
      },
      rule: {
        type: Object,
        default: () => {
          return {
            require: false,
            message: ''
          }
        }
      }
    },
    watch: {
      department (val) {
        console.log(val)
        this.$refs.deptTree.filter(val)
      }
    },
    data () {
      return {
        departmentSelected: {
          [this.prop.name]: '',
          [this.prop.code]: ''
        },
        defaultProps: {
          label: this.prop.name,
          children: this.prop.children
        },
        department: '',
        arrowUp: true, // 箭头是否向上
        mouseEnter: false, // 是否显示清空按钮
        showMsg: false // 是否显示提示信息
      }
    },
    mounted () {
      this.init()
    },
    beforeDestroy () {
      document.removeEventListener('click', this.documentEvent)
    },
    methods: {
      init () {
        this.arrowUp = true
        this.mouseEnter = false
        this.showMsg = false
        this.addDocumentEvent()
      },
      inputClick () {
        this.arrowUp = !this.arrowUp
      },
      inputMouseEnter () {
        this.mouseEnter = true
        if (this.hover) this.arrowUp = false
      },
      inputMouseLeave () {
        this.mouseEnter = false
      },
      clearInput (e) {
        e.stopPropagation()
        this.departmentSelected = {
          [this.prop.name]: '',
          [this.prop.code]: ''
        }
        this.arrowUp = true
      },
      handleHideTree (data) {
        let name = this.prop.name
        let code = this.prop.code
        this.departmentSelected = {
          [name]: data[name],
          [code]: data[code]
        }
        this.arrowUp = true
        this.$emit('input', this.departmentSelected[code])
        this.validate()
      },
      handleFilterNode (value, data) {
        if (!value) return true
        return data[this.defaultProps.label].indexOf(value) !== -1
      },
      deptTreeMouseLeave () {
        if (!this.hideOnClick) this.arrowUp = true
      },
      deptTreeMouseEnter (e) {
        if (e.target.id === 'dept') this.inputMouseEnter()
      },
      addDocumentEvent () {
        if (!this.hideOnClick) return
        document.addEventListener('click', this.documentEvent)
      },
      documentEvent (e) {
        if (e.target.id !== 'deptTreeInput' && !document.getElementById('deptTreeInput').contains(e.target)) {
          this.arrowUp = true
        }
      },
      validate () {
        let bool = false
        let dept = document.getElementById('dept')
        let suc = '1px solid #dcdfe6'
        let fail = '1px solid red'
        if (this.rule.require && !this.departmentSelected[this.prop.name]) {
          this.showMsg = true
          bool = false
          dept.style.border = fail
        } else {
          this.showMsg = false
          bool = true
          dept.style.border = suc
        }
        return bool
      }
    }
  }
</script>

<style scoped lang="scss">
  .deptTreeInput{
    .dept{
      cursor: pointer;
      .arrowup{
        transform:rotate(180deg);
        transition: transform 0.3s linear;
      }
      .arrowdown{
        transform:rotate(0deg);
        transition: transform 0.3s linear;
      }
    }
    .options{
      /*position: absolute;*/
      max-height:300px;
      min-width: 200px;
      width: 100%;
      overflow-y: scroll;
      margin-top: 5px;
      padding-top:10px;
      padding-bottom:10px;
      border: solid 1px #eee;
      background-color:#fff;
      z-index: 20;
      .dept-search{
        padding: 0 20px;
        box-sizing: border-box;
      }
    }
    .showMsg{
      color:#f56c6c;
      line-height: 1;
      font-size: 12px;
      padding-top: 4px;
      top:100%;
      left:0;
    }
  }
</style>

<style lang="scss">
  .deptTreeInput{
    #dept {
      cursor: pointer;
    }
    .el-input__suffix{
      line-height: 250%;
    }
  }
</style>
