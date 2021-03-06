<template>
  <div
    class="deptTreeNoInput"
    :id="deptTreeNoInput"
    @mouseleave="deptTreeMouseLeave"
    @mouseover="deptTreeMouseEnter"
  >
    <div @click="inputClick" @mouseleave="inputMouseLeave">
      <el-input
        :id="dept"
        class="dept"
        :disabled="judge(disabled)"
        :readonly="!judge(filter)"
        v-model="departmentSelected[prop.name]"
        :placeholder="placeholder"
        @keyup.native="inputEntry"
        @blur="inputBlur"
        @focus="inputFocus"
        :size="size"
      >
        <i
          slot="suffix"
          class="el-select__caret el-input__icon el-icon-circle-close"
          @click="clearInput($event)"
          v-if="showClose"
        ></i>
        <i
          slot="suffix"
          class="el-icon-arrow-down"
          :class="{ arrowup: !arrowUp, arrowdown: arrowUp }"
          v-if="showArrow"
        ></i>
      </el-input>
    </div>
    <el-collapse-transition>
      <div
        class="options"
        v-if="!arrowUp"
        id="options"
        v-loading="loading"
        element-loading-spinner="el-icon-loading"
      >
        <el-tree
          :key="expandAll"
          class="deptTree"
          :data="data"
          :node-key="nodeKey"
          :default-expand-all="expandAll"
          :props="defaultProps"
          :highlight-current="true"
          :auto-expand-parent="true"
          :current-node-key="departmentSelected[prop.code]"
          @node-click="handleHideTree"
          :filter-node-method="handleFilterNode"
          ref="deptTree"
        >
        </el-tree>
      </div>
    </el-collapse-transition>
    <div class="showMsg" v-if="showMsg">{{ rule.message }}</div>
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
 *  rule 验证是否必填 requie true 为必填  message 必填时候没填的提示 验证的时候需调用 validate 方法 返回布尔值 resetFields 为重置下拉框样式
 *  启用远程搜索，需要将filterable和remote设置为true，同时传入一个remote-method
 *  nodeKey 数据的 标识  默认 id
 * */
/**
 *  事件 change  focus  blur
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
    nodeKey: { default: 'id' },
    rule: {
      type: Object,
      default: () => {
        return {
          require: false,
          message: ''
        }
      }
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
    }
  },
  watch: {
    departmentSelected: {
      handler(val) {
        this.filterData(val)
      },
      deep: true
    },
    defaultValue() {
      this.handleModel()
    },
    data() {
      this.loading = false
    }
  },
  computed: {
    // 显示×号
    showClose() {
      return (
        this.judge(this.clearable) && this.mouseEnter && this.departmentSelected[this.prop.name]
      )
    },
    // 显示箭头
    showArrow() {
      return (
        (!this.judge(this.clearable) ||
          !this.mouseEnter ||
          !this.departmentSelected[this.prop.name]) &&
        !this.judge(this.remote)
      )
    }
  },
  data() {
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
      starCode: true, // 是否开始输入  防止多次触发keyup事件
      deptTreeNoInput: 'deptTreeInput' + (Math.random() + Math.random()), // 随机生成组件id
      dept: 'dept' + (Math.random() + Math.random()), // 随机生成组件id
      loading: false, // 远程加载loading动画
      timer: null, // 输入防抖定时器
      timerNum: 100, // 防抖时间
      expandAll: false // 是否展开
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    document.removeEventListener('click', this.documentEvent)
  },
  methods: {
    // 初始化函数
    init() {
      this.arrowUp = true
      this.mouseEnter = false
      this.showMsg = false
      this.loading = false
      this.starCode = true
      this.addDocumentEvent()
      this.handleModel()
    },
    // 搜索的时候过滤数据
    filterData(val) {
      this.$nextTick(() => {
        // 远程搜索就不做本地数据过滤
        if (this.$refs.deptTree && !this.judge(this.remote)) this.$refs.deptTree.filter(val.name)
      })
    },
    // 判断prop传过来的值 转为布尔值
    judge(param) {
      return param || param === ''
    },
    // 处理v-model回绑
    handleModel() {
      let name = this.prop.name
      let code = this.prop.code
      this.departmentSelected[code] = this.defaultValue
      let obj = this.deepQuery(this.data, code, this.defaultValue)
      if (obj) {
        this.departmentSelected[name] = obj[name]
      } else {
        // this.departmentSelected[name] = ''
      }
    },
    // 树形图 查找某一项
    deepQuery(tree, key, id) {
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
    inputClick() {
      if (this.judge(this.remote)) return
      if (this.judge(this.disabled)) return
      if (this.judge(this.hover)) return
      console.log(123)
      if (this.arrowUp) {
        this.showOption()
      } else {
        if (!this.arrowUp) this.hideOption()
      }
    },
    // 选择框鼠标移入事件
    inputMouseEnter() {
      if (this.judge(this.disabled)) return
      this.mouseEnter = true
      if (this.judge(this.remote)) return
      if (this.judge(this.hover)) this.showOption()
    },
    // 选择框鼠标移出事件
    inputMouseLeave() {
      this.mouseEnter = false
    },
    // 选择框清空事件
    clearInput(e) {
      e.stopPropagation()
      this.departmentSelected = {
        [this.prop.name]: '',
        [this.prop.code]: ''
      }
      this.hideOption()
      this.triggerModel()
      this.validate()
    },
    // 树形图选择某一选项事件
    handleHideTree(data) {
      let name = this.prop.name
      let code = this.prop.code
      this.departmentSelected = {
        [name]: data[name],
        [code]: data[code]
      }
      this.hideOption()
      this.triggerModel()
      this.validate()
    },
    // 下拉框输入框搜索事件
    handleFilterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    // 组件的鼠标移出事件 隐藏下拉选项
    deptTreeMouseLeave() {
      if (this.judge(this.hover)) this.hideOption()
    },
    //  组件移入事件
    deptTreeMouseEnter(e) {
      if (e.target.id === this.dept) this.inputMouseEnter()
    },
    // 窗口增加点击事件
    addDocumentEvent() {
      if (this.judge(this.hover)) return
      document.addEventListener('click', this.documentEvent)
    },
    // 点击除组件外的地方 隐藏下拉框
    documentEvent(e) {
      if (
        e.target.id !== this.deptTreeNoInput &&
        !document.getElementById(this.deptTreeNoInput).contains(e.target)
      ) {
        this.hideOption()
        // 如果没有选择 清空输入框 隐藏下拉框  远程搜索的时候不清空
        // if (this.departmentSelected[this.prop.code] === null && !this.judge(this.remote)) this.departmentSelected[this.prop.name] = ''
      }
    },
    // 输入事件
    inputEntry() {
      this.remoteSearch()
      if (!this.starCode) return
      if (this.judge(this.filter)) this.showOption()
      // 输入的时候把code置空
      this.departmentSelected[this.prop.code] = null
      this.starCode = false
    },
    // 远程搜索
    remoteSearch() {
      if (this.judge(this.remote) && typeof this.remoteMethod === 'function') {
        this.$nextTick(() => {
          this.expandAll = true
        })
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.loading = true
          this.remoteMethod(this.departmentSelected[this.prop.name])
        }, this.timerNum)
      }
    },
    // 触发 v-model 同步数据
    triggerModel() {
      this.$emit('input', this.departmentSelected[this.prop.code])
      this.$emit('change', this.departmentSelected[this.prop.code])
    },
    // 输入框失去焦点事件
    inputBlur() {
      this.starCode = true
      if (this.timer) clearTimeout(this.timer)
      this.validate()
      this.$emit('blur')
    },
    // 输入框获得焦点事件
    inputFocus() {
      this.$emit('focus')
      if (!this.judge(this.remote)) return
      this.showOption()
      if (this.departmentSelected[this.prop.name]) {
        this.expandAll = true
        if (typeof this.remoteMethod === 'function') {
          // 一打开就搜索
          // this.remoteSearch()
        } else {
          this.filterData(this.departmentSelected[this.prop.name])
        }
      }
    },
    // 打开下拉框
    showOption() {
      this.arrowUp = false
      this.expandAll = false // 默认不展开树形图
      this.$nextTick(() => {
        this.scrollToSelect()
      })
    },
    // 计算选中项的高度 并把滚动条滚到此处
    scrollToSelect() {
      let el = document.getElementById(this.deptTreeNoInput)
      let current = el.getElementsByClassName('is-current')[0]
      let deptTree = el.getElementsByClassName('deptTree')[0]
      if (current) deptTree.scrollTop = current.offsetTop - 100
    },
    // 关闭下拉框
    hideOption() {
      this.arrowUp = true
      this.triggerModel()
    },
    // 下拉框验证
    validate() {
      let bool = false
      let dept = document.getElementById(this.dept)
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
    },
    // 验证样式恢复
    resetFields() {
      let dept = document.getElementById(this.dept)
      let suc = '1px solid #dcdfe6'
      this.showMsg = false
      dept.style.border = suc
    }
  }
}
</script>

<style scoped lang="scss">
.deptTreeNoInput {
  position: relative;
  .dept {
    cursor: pointer;
    .arrowup {
      transform: rotate(180deg);
      transition: transform 0.3s linear;
    }
    .arrowdown {
      transform: rotate(0deg);
      transition: transform 0.3s linear;
    }
  }
  .options {
    position: absolute;
    /*max-height:300px;*/
    /*min-width: 200px;*/
    min-width: 100%;
    /*overflow-y: scroll;*/
    overflow-y: hidden;
    overflow-x: hidden;
    /*margin-top: 5px;*/
    padding-top: 10px;
    padding-bottom: 10px;
    border: solid 1px #eee;
    background-color: #fff;
    z-index: 20;
    .dept-search {
      padding: 0 20px;
      margin-bottom: 5px;
      box-sizing: border-box;
    }
    .deptTree {
      overflow-y: scroll;
      overflow-x: scroll;
      max-height: 300px;
      margin-right: -9px;
      padding-right: 8px;
    }
  }
  .showMsg {
    position: absolute;
    color: #f56c6c;
    line-height: 1;
    font-size: 12px;
    padding-top: 4px;
    top: 100%;
    left: 0;
  }
}
</style>

<style lang="scss">
.deptTreeNoInput {
  .el-loading-spinner i {
    color: #ccc;
  }
  .dept {
    input {
      cursor: pointer;
    }
  }
  .el-input__suffix {
    line-height: 250%;
  }
  .options {
    .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
      background: white;
      color: #00c1de;
      &:hover {
        background: rgb(245, 247, 250);
      }
    }
  }
}
</style>
