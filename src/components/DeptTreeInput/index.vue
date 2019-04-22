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
        <i slot="suffix" class="el-icon-close" @click="clearInput($event)" v-if="(clearable || clearable === '') && mouseEnter && departmentSelected[prop.name]"></i>
        <i slot="suffix" class="el-icon-arrow-down" :class="{arrowup: !arrowUp,arrowdown: arrowUp}" v-else></i>
      </el-input>
    </div>
    <el-collapse-transition>
      <div class="options" v-if="!arrowUp" id="options">
        <el-input id="dept_search" v-model="department" :placeholder="innerPlaceHolder" class="dept-search" :size="innerSize"></el-input>
        <el-tree class="deptTree" :data="data" :props="defaultProps" @node-click="handleHideTree" :filter-node-method="handleFilterNode" ref="deptTree"></el-tree>
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
        default: false
      },
      hover: {
        default: false
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
        this.$refs.deptTree.filter(val)
      }
    },
    data () {
      return {
        // 选择框绑定的值
        departmentSelected: {
          [this.prop.name]: '',
          [this.prop.code]: ''
        },
        // 树形图配置
        defaultProps: {
          label: this.prop.name,
          children: this.prop.children
        },
        department: '', // 下拉框中搜索框绑定的值
        arrowUp: true, // 箭头是否向上
        mouseEnter: false, // 是否显示清空按钮
        showMsg: false // 是否显示提示信息
      }
    },
    mounted () {
      this.init()
      console.log(this.clearable)
    },
    beforeDestroy () {
      document.removeEventListener('click', this.documentEvent)
    },
    methods: {
      // 初始化函数
      init () {
        this.arrowUp = true
        this.mouseEnter = false
        this.showMsg = false
        this.addDocumentEvent()
      },
      // 选择框点击事件 改变箭头方向
      inputClick () {
        this.arrowUp = !this.arrowUp
      },
      // 选择框鼠标移入事件
      inputMouseEnter () {
        this.mouseEnter = true
        if (this.hover || this.hover === '') this.arrowUp = false
      },
      // 选择框鼠标移出事件
      inputMouseLeave () {
        this.mouseEnter = false
      },
      // 选择框情况事件
      clearInput (e) {
        e.stopPropagation()
        this.departmentSelected = {
          [this.prop.name]: '',
          [this.prop.code]: ''
        }
        this.arrowUp = true
      },
      // 树形图选择某一选项事件
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
      // 下拉框输入框搜索事件
      handleFilterNode (value, data) {
        if (!value) return true
        return data[this.defaultProps.label].indexOf(value) !== -1
      },
      // 组件的鼠标移出事件 隐藏下拉选项
      deptTreeMouseLeave () {
        if (this.hover || this.hover === '') this.arrowUp = true
      },
      //  组件移入事件
      deptTreeMouseEnter (e) {
        if (e.target.id === 'dept') this.inputMouseEnter()
      },
      // 窗口增加点击事件
      addDocumentEvent () {
        if (this.hover || this.hover === '') return
        document.addEventListener('click', this.documentEvent)
      },
      // 点击除组件外的地方 隐藏下拉框
      documentEvent (e) {
        console.log(123)
        if (e.target.id !== 'deptTreeInput' && !document.getElementById('deptTreeInput').contains(e.target)) {
          this.arrowUp = true
        }
      },
      // 下拉框验证
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
      /*max-height:300px;*/
      min-width: 200px;
      width: 100%;
      /*overflow-y: scroll;*/
      overflow-y: hidden;
      margin-top: 5px;
      padding-top:10px;
      padding-bottom:10px;
      border: solid 1px #eee;
      background-color:#fff;
      z-index: 20;
      .dept-search{
        padding: 0 20px;
        margin-bottom: 5px;
        box-sizing: border-box;
      }
      .deptTree {
        overflow-y: scroll;
        max-height:300px;
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
