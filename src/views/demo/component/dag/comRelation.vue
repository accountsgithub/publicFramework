
<template>
  <div style="background-color:transparent;">
    <div :class="{'tree-wrap':true, 'up':showMore,'down':!showMore}"
         id="treeWrap">
      <div class="left-tit">
        <el-tooltip popper-class="com-tip"
                    :visible-arrow="false">
          <div slot="content"
               :style="{maxWidth:'360px','wordWrap':'break-word','wordBreak':' break-all'}">
            <div>未完成-该组件仍有配置项未填写</div>
          </div>
          <div class="item">
            <img class="img"
                 src="./images/red.png" />
            <div class="txt red">未完成的</div>
          </div>
        </el-tooltip>
        <el-tooltip popper-class="com-tip"
                    :visible-arrow="false">
          <div slot="content"
               :style="{maxWidth:'360px','wordWrap':'break-word','wordBreak':' break-all'}">
            <div>外部服务-该组件使用的是外部服务</div>
          </div>
          <div class="item">
            <img class="img"
                 src="./images/yellow.png" />
            <div class="txt yellow">使用外部</div>
          </div>
        </el-tooltip>
      </div>
      <div id="tree"></div>
      <com-attr ref="moduleEdit"
                :refreshModule="refreshModule"
                v-loading="isLoading"
                v-on:update:close="handleModuleEditDialogClose"
                v-on:update:isAtrrEditing="handleAtrrEditing"
                v-on:update:loading="handleLoading"
                :module="currentModule" />
      <img class="down-tag"
           v-if="!showMoreAttr"
           @click="handleOpenAttr"
           src="./images/up.png" />

    </div>
  </div>

</template>
<script>
import { isEmpty } from '@/utils'
import echarts from 'echarts'
import ComAttr from './comAttr'
import blueImg from './images/blue.png'
import blueActiveImg from './images/blue-active.png'
import redImg from './images/red.png'
import redActiveImg from './images/red-active.png'
import yellowImg from './images/yellow.png'
import yellowActiveImg from './images/yellow-active.png'
import blueNewImg from './images/blue-new.png'
import blueNewActiveImg from './images/blue-new-active.png'
import blueUpImg from './images/blue-up.png'
import blueUpActiveImg from './images/blue-up-active.png'

export default {
  name: 'ComRelation',
  components: {
    'com-attr': ComAttr
  },
  props: {
    modules: {
      type: Array
    },
    refreshModule: {
      type: Function
    }
  },
  data () {
    return {
      showMoreAttr: false,
      currentModule: {},
      lifeStyles: [
        {
          code: 'social',
          name: '群居'
        },
        {
          code: 'solitary',
          name: '独居'
        }
      ],
      isLoading: false,
      myChart: null,
      option: {
        title: {
          text: ''
        },
        tooltip: { trigger: 'none' },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            // symbol: 'rect',
            symbolSize: 80,
            // symbol 的位置
            symbolOffset: ['0', '0'],
            roam: true,
            // focus 时没有关联的消失
            focusNodeAdjacency: true,
            label: {
              normal: {
                show: true,
                fontWeight: '600',
                fontSize: 18,
                color: '#49505C',
                position: 'right'
              }
            },
            edgeSymbol: ['none', 'arrow'],
            edgeSymbolSize: [2, 10],
            data: [],
            links: [],
            lineStyle: {
              normal: {
                color: '#A3D4FF',
                opacity: 0.9,
                width: 2,
                curveness: 0
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.myChart = echarts.init(document.getElementById('tree'))
    // 处理点击事件并且跳转到相应的百度搜索页面
    this.myChart.on('click', (params) => {
      const { modules } = this
      const index = modules.findIndex(module => {
        return params.data.id === module.id
      })
      if (index !== -1) {
        this.showAttr(index)
      }
    })
    this.$nextTick(() => {
      this.generateOption()
      this.showAttr(0)
      this.handleOpenAttr()
    })
  },
  methods: {
    showAttr (moduleIndex) {
      const { modules, myChart, option } = this
      const { series } = option
      const data = series[0].data
      moduleIndex = moduleIndex >= 0 ? moduleIndex : modules.length - 1
      const module = modules[moduleIndex]

      // 解析右侧组件属性
      this.currentModule = JSON.parse(JSON.stringify(this.modules[moduleIndex]))

      // 设置图片 Active
      data.forEach((dataItem, index) => {
        if (dataItem.id === module.id) {
          // 正在选中的节点
          dataItem.isActive = true
          if (!dataItem.isComplete) {
            dataItem.symbol = `image://${redActiveImg}`
          } else if (dataItem.isCustom) {
            dataItem.symbol = `image://${yellowActiveImg}`
          } else if (dataItem.isNew) {
            dataItem.symbol = `image://${blueNewActiveImg}`
          } else if (dataItem.isUpgrade) {
            dataItem.symbol = `image://${blueUpActiveImg}`
          } else {
            dataItem.symbol = `image://${blueActiveImg}`
          }
        } else {
          dataItem.isActive = false
          if (!dataItem.isComplete) {
            dataItem.symbol = `image://${redImg}`
          } else if (dataItem.isCustom) {
            dataItem.symbol = `image://${yellowImg}`
          } else if (dataItem.isNew) {
            dataItem.symbol = `image://${blueNewImg}`
          } else if (dataItem.isUpgrade) {
            dataItem.symbol = `image://${blueUpImg}`
          } else {
            dataItem.symbol = `image://${blueImg}`
          }
        }
      })
      option.series[0].data = data
      this.option = option
      myChart.setOption(option)
    },
    handleOpenAttr () {
      this.$refs.moduleEdit.handleOpen()
      this.showMoreAttr = !this.showMoreAttr
    },
    handleLoading (isLoaded) {
      if (isLoaded) {
        this.$refs.moduleEdit.handleOpen()
      }
      this.isLoading = !this.isLoading
    },
    handleModuleEditDialogClose (isRefreh) {
      this.showMoreAttr = false
      isRefreh && this.refreshModule()
    },
    // 根据组件集合生成 option data links
    generateOption () {
      const { modules, option, myChart } = this
      const levelObj = {}
      const yInterval = 300
      const xInterval = 400
      const data = []
      const links = []
      let levels = []
      if (isEmpty(modules)) {
        return
      }
      // 按照 level 分组
      modules.forEach(module => {
        levels = Object.keys(levelObj)
        if (!isEmpty(levels) && module.level && levels.includes(module.level.toString())) {
          levelObj[module.level].push(module)
        } else {
          levelObj[module.level] = [module]
        }
      })
      // levels 排序
      levels = Object.keys(levelObj)
      levels = levels.sort((a, b) => {
        return a - b
      })
      // 封装 data
      // 找出子元素最多的层数
      const levelModules = Object.values(levelObj)
      const maxItemNum = Math.max.apply(Math, levelModules.map((o) => { return o.length }))
      levels.forEach(level => {
        const arr = levelObj[level]
        const interval = xInterval * maxItemNum / (arr.length + 1)
        let symbol = `image://${blueImg}`
        const isChk = level % 2 === 0
        const newArr = arr.sort(item => {
          return item.lifeStyle !== 'social'
        })
        newArr.forEach((item, index) => {
          const isComplete = !(item.complete === false)
          const isCustom = item.action === 'external'
          const isNew = item.action === 'newInstall'
          const isUpgrade = item.action === 'upgrade' || item.action === 'downgrade'
          let tooltip = null
          let x = interval * (index + 1)
          // 层级
          x = level !== 1 && isChk ? interval * (index + 1) + (level * 10) + 30 : interval * (index + 1) + (level * 10) - 30
          if (!isComplete) {
            symbol = `image://${redImg}`
          } else if (isCustom) {
            symbol = `image://${yellowImg}`
          } else if (isNew) {
            symbol = `image://${blueNewImg}`
            tooltip = {
              show: true,
              trigger: 'item',
              formatter: '新增-该组件为新增组件',
              padding: 10
            }
          } else if (isUpgrade) {
            symbol = `image://${blueUpImg}`
            tooltip = {
              show: true,
              trigger: 'item',
              formatter: '升级-该组件版本会造成组件服务升级',
              padding: 10
            }
          }
          data.push({
            id: item.id,
            value: item,
            name: `${item.componentSign}`,
            x: x,
            y: yInterval * level,
            symbolSize: level === '1' ? 100 : 80,
            symbol,
            label: {
              fontSize: '18',
              color: '#49505C'
            },
            tooltip,
            // custom
            isActive: false,
            isComplete,
            isCustom,
            isNew,
            isUpgrade
          })
        })
      })
      // 封装 links
      if (!isEmpty(data)) {
        data.forEach((dataItem, index) => {
          const dependencies = dataItem.value && !isEmpty(dataItem.value.dependencies) ? dataItem.value.dependencies : []
          dependencies.forEach(dependency => {
            const dependencyIndex = data.findIndex((obj) => {
              return obj.id === dependency
            })
            if (dependencyIndex !== -1) {
              links.push({
                source: index,
                target: dependencyIndex
              })
            }
          })
        })
      }
      // 设置参数
      option.series[0].data = data
      option.series[0].links = links
      this.option = option
      myChart && myChart.setOption(option)
    },
    // 更新编辑状态
    handleAtrrEditing (flag) {
      this.$emit('update:isAtrrEditing', flag)
    }
  }
}
</script>
<style lang="scss">
#tree {
  width: 100%;
  height: 100%;
  div:first-child {
    width: 100% !important;
    height: 100% !important;
    canvas {
      width: 100% !important;
      height: 100% !important;
    }
  }
}
.com-tip {
  background-color: rgba(0, 0, 0, 0.6) !important;
  color: #fff !important;
  box-shadow: none !important;
  border: 0 !important;
}
</style>
<style lang="scss" scoped>
.tree-wrap {
  overflow-x: hidden;
  position: relative;
  #tree {
    width: 100%;
    height: 100%;
  }
  .down-tag {
    position: absolute;
    bottom: 50%;
    transform: rotate(270deg);
    width: 60px;
    height: 20px;
    z-index: 2002;
  }
  .down-tag {
    right: -20px;
  }
}
.up {
  height: calc(100vh - 331px);
}
.down {
  height: calc(100vh - 284px);
}

.up-show {
  height: calc(100vh - 252px) !important;
}
.down-show {
  height: calc(100vh - 205px) !important;
}

.left-tit {
  display: flex;
  flex-direction: column;
  flex-flow: nowrap;
  position: absolute;
  top: 10px;
  left: 20px;
  z-index: 1;
  .item {
    width: 90px;
    margin-right: -10px;
    text-align: center;
    .img {
      width: 40px;
      height: 40px;
    }
    .txt {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      margin-top: -10px;
      text-align: center;
    }
    .red {
      color: #e14248;
    }
    .yellow {
      color: #d99234;
    }
  }
}
</style>


