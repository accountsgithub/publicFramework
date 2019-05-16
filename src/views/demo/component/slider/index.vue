/** * @author * @date 2019/5/15 */
<template>
  <div class="main-div-style">
    <div class="title-div-style">
      <span>slider滑块</span>
    </div>
    <div class="slider-div-style">
      <div class="slider-style">
        <el-slider v-model="CPUValue" range ref="cpuSlider" :step="100" :min="100" :max="8000">
        </el-slider>
        <div
          :class="{ 'scale-line-style0': true, 'last-div-style': index == CPUList.length - 1 }"
          v-for="(item, index) in CPUList"
          :key="item"
          :style="getStyleMethod(item, 'CPUList')"
        ></div>
        <div class="scale-label-div-style">
          <div
            :class="{ 'scale-label-style': true }"
            v-for="item in CPUList"
            :key="item"
            :style="getLabelStyleMethod(item, 'CPUList')"
          >
            {{ item }}
          </div>
        </div>
        <div class="number-div-style1">
          <el-input-number
            size="small"
            v-model="CPUValue[0]"
            :min="200"
            @change="cpuChange($event, 'min')"
            :max="CPUValue[1]"
            :step="100"
          >
          </el-input-number>
          <span class="number-span-style">Mi</span>
          <div class="number-line-style"></div>
          <el-input-number
            size="small"
            v-model="CPUValue[1]"
            :min="CPUValue[0]"
            @change="cpuChange($event, 'max')"
            :max="20000"
            :step="100"
          >
          </el-input-number>
          <span class="number-span-style">Mi</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      memoryList: [64, 1024, 2048, 4096, 8192, 16384],
      CPUList: [100, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
      memoryValue: [256, 1256],
      CPUValue: [200, 1200]
    }
  },
  methods: {
    getStyleMethod(item, name) {
      let val1 = item - this[name][0]
      let val2 = this[name][this[name].length - 1] - this[name][0]
      let val3 = (val1 * 100) / val2
      return `left: ${val3}%`
    },
    cpuChange(val, type) {
      if (!val) {
        if (type === 'min') {
          this.CPUValue[0] = 0
        } else {
          this.CPUValue[1] = 0
        }
      }
      this.$nextTick(() => {
        this.$refs['cpuSlider'].setValues()
      })
    },
    getLabelStyleMethod(item, name) {
      let val1 = item - this[name][0]
      let val2 = this[name][this[name].length - 1] - this[name][0]
      let val3 = (val1 * 100) / val2
      if (item == this[name][0]) {
        return `left: ${val3}%`
      } else if (item == this[name][this[name].length - 1]) {
        return `right: 0`
      } else {
        return `left: ${val3}%; margin-left: -10px;`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/common';
.main-div-style {
  background: white;
  display: flex;
  flex-direction: column;
  .title-div-style {
    height: 50px;
    width: 100%;
    line-height: 50px;
    font-size: 18px;
    padding-left: 15px;
    border-bottom: solid 1px $border-color;
  }
}
.slider-div-style {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
}
.slider-style {
  width: 90%;
  height: 100%;
  margin-top: 100px;
  background: #ffffff;
  /*padding: 20px 10%;*/
  display: flex;
  flex-direction: column;
  position: relative;
}
.last-div-style {
  margin-left: -3px;
}
.scale-label-style {
  font-size: 12px;
  color: #9c9fa5;
  letter-spacing: 0;
  width: auto;
  position: absolute;
}
.scale-line-style0 {
  height: 8px;
  width: 2px;
  background: #edeff4;
  z-index: 0;
  position: absolute;
  margin-top: 22px;
}
.number-div-style1 {
  height: 30px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  padding-top: 50px;
  font-size: 16px;
}
.number-span-style {
  line-height: 32px;
  /*margin-left: 10px;*/
  font-size: 14px;
  color: #9c9fa5;
  letter-spacing: 0;
  & > span {
    font-size: 16px;
  }
}
.number-line-style {
  height: 2px;
  width: 250px;
  background: #edeff4;
  margin: 15px 25px;
}
/*刻度值样式*/
.scale-label-div-style {
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
  width: 100%;
}
</style>
