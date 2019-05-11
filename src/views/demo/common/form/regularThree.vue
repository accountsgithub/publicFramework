<template>
  <list-panel>
    <template slot="header">
      <span class="header__title" style="font-size:18px;">创建工单</span>
      <div>
        <custom-progress :steps="steps" :currentStep="currentStep" />
      </div>
    </template>
    <template slot="main">
      <el-form
        label-position="top"
        label-position1="top"
        label-position2="top"
        label-position3="top"
        label-width="80px"
        :inline="true"
      >
      </el-form>
    </template>
  </list-panel>
</template>
<script>
import CustomProgress from '@/components/Progress/custom'
export default {
  components: {
    'custom-progress': CustomProgress
  },
  data() {
    return {
      steps: [
        {
          label: '选择工单模板',
          value: '0'
        },
        {
          label: '创建工单模板',
          value: '1'
        },
        {
          label: '创建成功',
          value: '2'
        }
      ],
      currentStep: '1'
    }
  }
}
</script>
<style lang="scss" scoped></style>
