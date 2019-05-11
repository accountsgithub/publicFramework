<template>
  <el-form label-position="top" label-width="80px" :inline="true">
    <div class="card-list">
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
            <el-switch v-model="active1" active-color="#1FB6FF" inactive-color="#DCDFE6">
            </el-switch>
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
    <form-button-area>
      <el-button>取消</el-button>
      <el-button type="primary">确认</el-button>
    </form-button-area>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      active: false,
      active1: true,
      radio: 0
    }
  }
}
</script>
<style lang="scss" scoped></style>
