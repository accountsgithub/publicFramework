<template>
  <el-form label-position="top" label-width="80px" :inline="true">
    <div class="card-list line">
      <div class="cart-item">
        <div class="cart-tit">设备配置</div>
        <div class="cart-con">
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
            <el-switch v-model="active" active-color="#1FB6FF" inactive-color="#DCDFE6"> </el-switch>
          </el-form-item>
          <el-form-item :required="true" class="full">
            <template slot="label">
              <span class="label-tit">
                日期
              </span>
              <span class="label-sub-tit">设备日期</span>
            </template>
            <el-date-picker
              v-model="date"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item :required="true" class="full">
            <template slot="label">
              <span class="label-tit">
                标签
              </span>
              <span class="label-sub-tit">标签便于识别设备</span>
            </template>
            <el-select v-model="label" style="width:100%;" multiple>
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="cart-item">
        <div class="cart-tit">网络配置</div>
        <div class="cart-con">
          <el-form-item :required="true" class="full">
            <template slot="label">
              <span class="label-tit">
                注册用户名
              </span>
              <span class="label-sub-tit">您真实姓名，用于核查信息</span>
            </template>
            <el-input />
          </el-form-item>
          <el-form-item style="width:60%;margin-right:50px;" label="重点标签" :required="true">
            <el-radio-group v-model="radio">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="通道" :required="true">
            <el-switch v-model="active1" active-color="#1FB6FF" inactive-color="#DCDFE6"> </el-switch>
          </el-form-item>
          <el-form-item :required="true" class="full">
            <template slot="label">
              <span class="label-tit">
                身份证号
              </span>
              <span class="label-sub-tit">您真实姓名，用于核查信息</span>
            </template>
            <el-input />
          </el-form-item>
        </div>
      </div>
    </div>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      active: false,
      active1: true,
      radio: 0,
      date: null,
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
