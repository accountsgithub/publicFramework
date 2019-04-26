<template>
  <div class="deptTreeNoInput" id="deptTreeNoInput" @mouseleave="deptTreeMouseLeave" @mouseover="deptTreeMouseEnter">
    <div @click="inputClick" @mouseleave="inputMouseLeave">
      <el-input
        id="dept"
        class="dept"
        :disabled="judge(disabled)"
        :readonly="!judge(filter)"
        v-model="departmentSelected[prop.name]"
        :placeholder="placeholder"
        @keyup.native="inputEntry"
        @blur="inputBlur"
        :size='size'>
        <i slot="suffix" class="el-select__caret el-input__icon el-icon-circle-close" @click="clearInput($event)" v-if="showClose"></i>
        <i slot="suffix" class="el-icon-arrow-down" :class="{arrowup: !arrowUp,arrowdown: arrowUp}" v-if="showArrow"></i>
      </el-input>
    </div>
    <el-collapse-transition>
      <div class="options" v-if="!arrowUp" id="options">
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
   *  size 输入框大小 默认small
   *  prop 数据源绑定的值
   *  hover 下拉框打开关闭的方式
   *  filter 是否可以输入进行筛选
   *  clearable 是否可以清空
   *  rule 验证是否必填 requie true 为必填  message 必填时候没填的提示 验证的时候需调用 validate 方法 返回布尔值
   *  启用远程搜索，需要将filterable和remote设置为true，同时传入一个remote-method
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
      size: { type: String, default: 'small' },
      clearable: { type: [String, Boolean], default: false },
      hover: { default: false },
      filter: { type: [String, Boolean], default: false },
      disabled: { type: [String, Boolean], default: false },
      defaultValue: { type: [String, Number], default: '' },
      remote: { type: [String, Boolean], default: false },
      remoteMethod: { type: Function },
      rule: {
        type: Object,
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
      departmentSelected: {
        handler (val) {
          this.$nextTick(() => {
            if (this.$refs.deptTree) this.$refs.deptTree.filter(val.name)
          })
        },
        deep: true
      },
      defaultValue () {
        this.handleModel()
      }
    },
    computed: {
      // 显示×号
      showClose () {
        return this.judge(this.clearable) && this.mouseEnter && this.departmentSelected[this.prop.name]
      },
      // 显示箭头
      showArrow () {
        return (!this.judge(this.clearable) || !this.mouseEnter || !this.departmentSelected[this.prop.name]) && !this.judge(this.remote)
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
        arrowUp: true, // 箭头是否向上 true 不显示下拉框 false 显示下拉框
        mouseEnter: false, // 是否显示清空按钮
        showMsg: false, // 是否显示提示信息
        starCode: true // 是否开始输入  防止多次触发keyup事件
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
      // 判断prop传过来的值 转为布尔值
      judge (param) {
        return (param || param === '')
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
        let stark = []
        stark = stark.concat(tree)
        while (stark.length) {
          let temp = stark.shift()
          if (temp.children) {
            stark = temp.children.concat(stark)
          }
          if (id === temp[key]) {
            return temp
          }
        }
      },
      // 选择框点击事件 改变箭头方向
      inputClick () {
        if (this.judge(this.remote)) return
        if (this.judge(this.disabled)) return
        if (this.judge(this.hover)) return
        this.arrowUp = !this.arrowUp
      },
      // 选择框鼠标移入事件
      inputMouseEnter () {
        if (this.judge(this.disabled)) return
        this.mouseEnter = true
        if (this.judge(this.remote)) return
        if (this.judge(this.hover)) this.arrowUp = false
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
        if (this.judge(this.hover)) this.arrowUp = true
      },
      //  组件移入事件
      deptTreeMouseEnter (e) {
        if (e.target.id === 'dept') this.inputMouseEnter()
      },
      // 窗口增加点击事件
      addDocumentEvent () {
        if (this.judge(this.hover)) return
        document.addEventListener('click', this.documentEvent)
      },
      // 点击除组件外的地方 隐藏下拉框
      documentEvent (e) {
        if (e.target.id !== 'deptTreeNoInput' && !document.getElementById('deptTreeNoInput').contains(e.target)) {
          this.arrowUp = true
          // 如果没有选择 清空输入框 隐藏下拉框
          if (this.departmentSelected[this.prop.code] === null) this.departmentSelected[this.prop.name] = ''
        }
      },
      // 输入事件
      inputEntry () {
        if (this.judge(this.remote) && typeof this.remoteMethod === 'function') {
          this.remoteMethod(this.departmentSelected[this.prop.name])
        }
        if (!this.starCode) return
        this.arrowUp = false
        // 输入的时候把code置空
        this.departmentSelected[this.prop.code] = null
        this.triggerModel()
        this.starCode = false
      },
      // 触发 v-model 同步数据
      triggerModel () {
        this.$emit('input', this.departmentSelected[this.prop.code])
        this.$emit('change', this.departmentSelected[this.prop.code])
      },
      // 输入框失去焦点事件
      inputBlur () {
        this.starCode = true
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
  .deptTreeNoInput{
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
  .deptTreeNoInput{
    #dept {
      cursor: pointer;
    }
    .el-input__suffix{
      line-height: 250%;
    }
  }
</style>
