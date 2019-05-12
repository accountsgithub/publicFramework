<template>
  <list-panel>
    <template slot="header">
      <span class="header__title" style="font-size:18px;">创建工单</span>
      <div>
        <custom-progress :steps="steps" :currentStep="currentStep" />
      </div>
    </template>
    <template slot="main">
      <el-form label-position="top" label-width="80px" :inline="true">
        <div class="form-center-wrapper">
          <div class="tit">创建工单模板</div>
          <div class="con">
            <el-form-item :required="true" class="full">
              <template slot="label">
                <span class="label-tit">
                  采集站编号
                </span>
                <span class="label-sub-tit">您真实姓名，用于核查信息</span>
              </template>
              <el-input />
            </el-form-item>
            <el-form-item style="width:60%;margin-right:50px;" :required="true">
              <template slot="label">
                <span class="label-tit">
                  入网ID
                </span>
                <span class="label-sub-tit">请核查你的ID</span>
              </template>
              <el-input />
            </el-form-item>
            <el-form-item label="通道" :required="true">
              <el-switch v-model="active" active-color="#1FB6FF" inactive-color="#DCDFE6">
              </el-switch>
            </el-form-item>
            <el-form-item :required="true" class="full">
              <template slot="label">
                <span class="label-tit">
                  设备名称
                </span>
                <span class="label-sub-tit">设备名称自定义采用数字或者字母</span>
              </template>
              <el-input />
            </el-form-item>
            <el-form-item :required="true" class="full">
              <template slot="label">
                <span class="label-tit">
                  标签
                </span>
                <span class="label-sub-tit">标签便于识别设备</span>
              </template>
              <el-select v-model="label" style="width:100%;" multiple>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :required="true" class="full">
              <template slot="label">
                <span class="label-tit">
                  关键字
                </span>
                <span class="label-sub-tit">可输入多个关键字</span>
              </template>
              <el-select v-model="label2" multiple collapse-tags style="width:100%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="footer">
            <el-button>取消</el-button>
            <el-button type="primary">下一步</el-button>
          </div>
        </div>
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
      currentStep: '1',
      active: false,
      active1: true,
      radio: 0,
      label: '',
      label2: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped></style>
