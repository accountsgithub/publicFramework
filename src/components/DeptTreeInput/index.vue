<template>
  <div class="deptTreeInput" :id="deptTreeInput" @mouseleave="deptTreeMouseLeave" @mouseover="deptTreeMouseEnter">
    <div @click="inputClick" @mouseleave="inputMouseLeave">
      <el-input
        id="dept"
        class="dept"
        readonly
        :disabled="disabled || disabled === ''"
        v-model="departmentSelected[prop.name]"
        :placeholder="placeholder"
        :size='size'>
        <i slot="suffix" class="el-select__caret el-input__icon el-icon-circle-close" @click="clearInput($event)" v-if="(clearable || clearable === '') && mouseEnter && departmentSelected[prop.name]"></i>
        <i slot="suffix" class="el-icon-arrow-down" :class="{arrowup: !arrowUp,arrowdown: arrowUp}" v-else></i>
      </el-input>
    </div>
    <el-collapse-transition>
      <div class="options" v-if="!arrowUp">
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
   *  hover 下拉框打开关闭的方式
   *  clearable 是否可以清空
   *  rule 验证是否必填 requie true 为必填  message 必填时候没填的提示 验证的时候需调用 validate 方法 返回布尔值
   * */
  export default {
    name: 'DeptTreeInput',
    model: {
      prop: 'defaultValue',
      event: 'input'
    },
    props: {
      data: { type: Array, default: () => [] },
      placeholder: { type: String, default: '请选择' },
      innerPlaceHolder: { type: String, default: '请输入' },
      size: { type: String, default: 'small' },
      innerSize: { type: String, default: 'small' },
      clearable: { default: false },
      hover: { default: false },
      disabled: { type: [String, Boolean], default: false },
      defaultValue: { type: [String, Number], default: '' },
      rule: { type: Object,
        default: () => {
          return {
            require: false,
            message: ''
          }
        }
      },
      prop: { type: Object,
        default: () => {
          return {
            name: 'name',
            code: 'code',
            children: 'children'
          }
        }
      }
    },
    watch: {
      department (val) {
        this.$refs.deptTree.filter(val)
      },
      defaultValue () {
        this.handleModel()
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
        arrowUp: true, // 箭头是否向上 true 不显示下拉框 false 显示下拉框
        mouseEnter: false, // 是否显示清空按钮
        showMsg: false, // 是否显示提示信息
        deptTreeInput: 'deptTreeInput' + (Math.random() + Math.random())// 随机生成组件ID
      }
    },
    mounted () {
      this.init()
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
        this.handleModel()
      },
      // 选择框点击事件 改变箭头方向
      inputClick () {
        if (this.disabled || this.disabled === '') return
        this.arrowUp = !this.arrowUp
      },
      // 处理v-model回绑
      handleModel () {
        let name = this.prop.name
        let code = this.prop.code
        this.departmentSelected[code] = this.defaultValue
        // let obj = this.data.find(v => v[this.prop.code] === this.defaultValue)
        let obj = this.deepQuery(this.data, code, this.defaultValue)
        if (obj) this.departmentSelected[name] = obj[name]
      },
      // 树形图 查找某一项
      deepQuery (tree, key, id) {
        let obj = {}
        let stark = []
        stark = stark.concat(tree)
        while (stark.length) {
          let temp = stark.shift()
          if (temp.children) {
            stark = temp.children.concat(stark)
          }
          if (id === temp[key]) {
            obj = temp
          }
        }
        return obj
      },
      // 选择框鼠标移入事件
      inputMouseEnter () {
        if (this.disabled || this.disabled === '') return
        this.mouseEnter = true
        if (this.hover || this.hover === '') this.arrowUp = false
      },
      // 选择框鼠标移出事件
      inputMouseLeave () {
        this.mouseEnter = false
      },
      // 选择框清空事件
      clearInput (e) {
        e.stopPropagation()
        this.departmentSelected = {
          [this.prop.name]: '',
          [this.prop.code]: ''
        }
        this.arrowUp = true
        this.triggerModel()
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
        this.triggerModel()
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
        if (e.target.id !== this.deptTreeInput && !document.getElementById(this.deptTreeInput).contains(e.target)) {
          this.arrowUp = true
        }
      },
      // 触发 v-model 同步数据
      triggerModel () {
        this.$emit('input', this.departmentSelected[this.prop.code])
        this.$emit('change', this.departmentSelected[this.prop.code])
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
    position: relative;
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
      .close{
        background: rgb(192,196,204);
        color: white;
        display: inline-block;
        height: 14px;
        width: 14px;
        padding: 1px;
        /*font-size: 5px;*/
        border-radius: 7px;
      }
    }
    .options{
      position: absolute;
      /*max-height:300px;*/
      min-width: 200px;
      width: 100%;
      /*overflow-y: scroll;*/
      overflow-y: hidden;
      /*margin-top: 5px;*/
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
      position: absolute;
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
    .dept {
      input{
        cursor: pointer;
      }
    }
    .el-input__suffix{
      line-height: 250%;
    }
  }
</style>
