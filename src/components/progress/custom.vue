<template>
  <div class="progress-wrapper">
    <div class="progress-item" v-for="(step, index) in steps" :key="index">
      <span class="item-split" v-if="index > 0">—</span>
      <span
        :class="{
          'item-mark': true,
          finished: currentIndex > index,
          'un-finished': currentIndex < index,
          current: currentIndex === index
        }"
      >
        <template v-if="currentIndex > index">
          <i class="el-icon-check"></i>
        </template>
        <template v-else>
          {{ index + 1 }}
        </template>
      </span>
      <span
        :class="{
          'item-name': true,
          'item-name-high': currentIndex >= index,
          'item-name-finished': currentIndex < index
        }"
      >
        {{ step.label }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    steps: {
      type: Array
    },
    currentStep: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  computed: {
    currentIndex() {
      const { steps, currentStep } = this
      return this.$utils.isEmpty(steps)
        ? -1
        : steps.findIndex(step => {
            return step.value === currentStep
          })
    }
  }
}
</script>
<style lang="scss" scoped>
.progress-wrapper {
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
  font-family: PingFangSC-Medium;
  .item-mark {
    display: inline-block;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
  }
  .item-name {
    color: #49505c;
  }
  .item-name-finished {
    color: #bdc2cb;
  }
  .item-name-high {
    color: #49505c;
  }
  .item-split {
    margin: 0 10px;
    color: #edeff4;
  }
  .finished {
    border: solid 1px #67c23a;
    color: #67c23a;
  }
  .current {
    background-color: #1fb6ff;
    color: #fff;
  }
  .un-finished {
    border: solid 1px #bdc2cb;
    color: #bdc2cb;
  }
}
</style>
