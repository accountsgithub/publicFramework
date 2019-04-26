<template>
  <div class="TimeSelect" :class="{'TimeDarkSelect': dark || dark===''}">
    <el-select :popper-class="(dark || dark === '') ? 'TimeSelect-Select': ''" :disabled="judge(disabled)" v-model="value" :placeholder="placeholder" :clearable="judge(clearable)" @change="handleSelectChange" :size="size" @visible-change="handleVisibleChange">
      <el-option
        v-for="(item,index) in options"
        :key="index"
        :label="item[prop.label]"
        :value="item[prop.value]">
      </el-option>
    </el-select>
    <el-date-picker
      :popper-class="(dark || dark === '') ? 'TimeSelect-Picker': ''"
      :style="'height: ' + height"
      ref="dateRange"
      v-model="dateRange"
      :value-format="valueFormat"
      @change="handleDatePickerChange"
      type="datetimerange"
      :default-time="defaultTime"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    name: 'TimeSelect',
    data () {
      return {
        value: '', // 下拉框绑定的默认值
        lastValue: '', // 下拉框绑定的上一个值
        options: [],
        dateRange: [],
        height: '30px',
        minOfMs: 60000, // 一个小时毫秒数
        defined: {
          [this.prop.label]: '自定义',
          [this.prop.value]: 'defined'
        }
      }
    },
    watch: {
      value (val, old) {
        this.lastValue = old
      },
      defaultValue (val) {
        console.log(val)
        this.value = val
        this.handleSelectChange(val)
      }
    },
    /**
     *  items 选项中 label配置项为选项说明 value为字符串类型的数字 单位：分钟 , 比如 一天前 {label:'一天前'，value:'1440'} 30分钟前 {label:'30分钟前'，value:'30'}
     *  placeholder 无输入时默认显示值
     *  disabled 是否禁用
     *  size 输入框尺寸
     *  valueFormat 返回的时间格式 timestamp 为返回时间戳
     *  format 显示在输入框中的格式
     *  rangeSeparator 选择自定义时间时的分隔符
     *  defaultTime 选中日期后的默认具体时刻
     *  prop 选项的键配置
     *  dark 组件风格 true 为黑 false 为白
     *  defaultValue 组件默认值
     * */
    /**
     *  methods: change 参数：当前选中的值
     * */
    props: {
      placeholder: { type: String, default: '请选择' },
      clearable: { type: [String, Boolean], default: false },
      disabled: { type: [String, Boolean], default: false },
      size: { type: String, default: 'small' },
      valueFormat: { type: String, default: 'yyyy-MM-dd HH:mm:ss' },
      format: { type: String, default: 'yyyy-MM-dd HH:mm:ss' },
      defaultTime: { type: Array, default: () => ['00:00:00', '00:00:00'] },
      rangeSeparator: { type: String, default: ' - ' },
      items: { type: Array, default: () => [] },
      dark: { type: [String, Boolean], default: false },
      defaultValue: { type: [String, Number], default: '' },
      prop: {
        type: Object,
        default: () => {
          return {
            label: 'label',
            value: 'value'
          }
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.options = [...this.items]
        if (!this.options.some(v => v[this.prop.value] === this.defined[this.prop.value])) {
          // this.options.push(this.defined)
          this.options.unshift(this.defined)
        }
        this.initHeight(this.size)
        this.handleDefaultValue()
      },
      handleDefaultValue () {
        this.value = this.defaultValue
        this.handleSelectChange(this.value)
      },
      // 日期框箭头高度
      initHeight (size) {
        switch (size) {
        case 'medium':
          this.height = '34px'
          break
        case 'small':
          this.height = '30px'
          break
        case 'mini':
          this.height = '26px'
          break
        default:
          break
        }
      },
      // 判断prop传过来的值 转为布尔值
      judge (param) {
        return (param || param === '')
      },
      // 选择框变化触发事件
      handleSelectChange (val) {
        if (!val) {
          this.emitEvent([])
          return
        }
        if (val === 'defined') {
          this.$refs.dateRange.showPicker()
        } else {
          let param
          if (val.indexOf(this.rangeSeparator) > -1) {
            param = val.split(this.rangeSeparator)
          } else {
            param = this.handleTime(val)
          }
          this.emitEvent(param)
        }
      },
      // 把几个小时前转换为时间范围
      handleTime (num) {
        num = parseFloat(num)
        let start, end
        let nowStamp = new Date().getTime()
        let pastStamp = nowStamp - num * this.minOfMs
        if (this.valueFormat === 'timestamp') {
          end = nowStamp
          start = pastStamp
        } else {
          end = this.formatTime(this.valueFormat, nowStamp)
          start = this.formatTime(this.valueFormat, pastStamp)
        }
        return [start, end]
      },
      // 时间框选择变化
      handleDatePickerChange (val) {
        if (!val) {
          this.value = ''
          this.emitEvent([])
          return
        }
        let label = val.map(v => this.formatTime(this.format, v)).join(this.rangeSeparator)
        let value = val.join(this.rangeSeparator)
        let obj = {
          type: 'defined',
          [this.prop.label]: label,
          [this.prop.value]: value
        }
        let index = this.options.findIndex(v => v.type === 'defined')
        if (index > -1) {
          this.options[index] = obj
        } else {
          this.options.push(obj)
        }
        this.value = value
        this.emitEvent(val)
      },
      // 触发change 跟 model
      emitEvent (param) {
        this.$emit('change', param)
        this.$emit('input', param)
      },
      // 下拉框出现隐藏触发事件 status 值为true 打开  false 关闭
      handleVisibleChange (status) {
        // if (this.value === 'defined') this.value = ''
        if (status) {
          this.options = this.options.filter(v => v.type !== 'defined')
        } else {
          if (this.value === 'defined' && this.lastValue !== 'defined') {
            this.value = this.lastValue
          }
        }
      },
      // 格式化时间戳
      formatTime (fmt, time) {
        time = time ? new Date(time) : new Date()
        var o = {
          'M+': time.getMonth() + 1, // 月份
          'd+': time.getDate(), // 日
          'H+': time.getHours(), // 小时
          'm+': time.getMinutes(), // 分
          's+': time.getSeconds(), // 秒
          'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
          'S': time.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return fmt
      }
    }
  }
</script>

<style scoped lang="scss">
  .TimeSelect{
    width: 100%;
    min-width: 300px;
    position: relative;
    .el-range-editor.el-input__inner{
      position: absolute;
      top: 0px;
      left: 0px;
      width: 10px;
      height: 30px;
      visibility: hidden;
    }
    /*.el-select {*/
    /*  width: 100%;*/
    /*  input {*/
    /*    background: red !important;*/
    /*  }*/
    /*}*/
  }
  /*.el-select-dropdown__list{*/
  /*  background: #0C354A !important;*/
  /*}*/
</style>

<style lang="scss">
  $color1: rgba(0,245,255,1);
  $color2: rgba(1,30,52,1);
  $color3: rgba(240,253,255,0.8);
  $color4: rgba(12,53,74,1);
  $color5: rgba(240,253,255,0.5);
  $color6: rgba(255,255,255,1);
  $color7: rgba(0,139,153,1);
  $color8: rgba(129,186,196,1);
  $color9: rgba(119,157,168,1);
  $color10: rgba(2,203,205,1);
  $color11: rgba(11,48,68,1);
  $color12: rgba(16,73,92,1);
  $color13: rgba(168,210,223,1);
  .TimeDarkSelect{
    .el-select {
      width: 100%;
      .el-input.is-focus .el-input__inner{
        border-color: $color1 !important;
      }
      input {
        background: $color2 !important;
        color: $color3;
        /*font-size: 12px;*/
      }
      ::-webkit-input-placeholder{
        color: $color3;
      }
    }
  }
  .TimeSelect-Select{
    background: $color4;
    color: $color5;
    .el-select-dropdown__item.selected{
      color: $color6;
      background: $color4;
    }
    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
      background: $color7;
    }
  }
  .TimeSelect-Picker{
    background: $color4;
    .el-picker-panel__body-wrapper{
      .el-picker-panel__body{
        .el-picker-panel__icon-btn{
          color: $color8;
        }
        .el-date-range-picker__content .el-date-range-picker__header div{
          color: $color6;
        }
        .el-date-range-picker__content.is-left,.el-date-range-picker__content.is-right{
          border-right:0px;
          .el-date-table th{
            border-bottom: 0px;
          }
          .el-date-table td{
            color: $color9;
            &:hover{
              color: $color10;
            }
          }
          .el-date-table td.today span{
            color: $color10;
          }
          .el-date-table td.start-date span, .el-date-table td.end-date span{
            background: $color10;
            color: $color6;
          }
          .el-date-table td.in-range div{
            background: $color11;
            color: $color10;
          }
        }
        .el-date-range-picker__time-header{
          border-bottom: 1px solid $color11;
          .el-time-panel{
            background: $color4;
            border-color: $color12;
            .el-time-spinner__item.active:not(.disabled){
              color: $color13;
            }
            .el-time-panel__footer{
              border-top: 1px solid $color11;
              .cancel{
                color: $color10;
              }
              .confirm{
                color: $color6;
              }
            }
            .el-time-panel__content::after, .el-time-panel__content::before{
              border-top: 1px solid $color11;
              border-bottom: 1px solid $color11;
            }
          }
          .el-input__inner{
            background: $color4;
            border-color: $color12;
            color: $color13;
          }
        }
      }
    }
    .el-picker-panel__footer{
      border-top: 1px solid $color11;
      background: $color4;
      >:nth-child(1){
        color: $color10;
      }
      >:nth-child(2){
        background: $color10;
        color: $color6;
      }
    }
  }
</style>
