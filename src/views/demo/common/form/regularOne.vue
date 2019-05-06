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
            <el-switch
              v-model="active"
              active-color="#1FB6FF"
              inactive-color="#DCDFE6"
            >
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
          <el-form-item
            style="width:60%;margin-right:50px;"
            label="重点标签"
            :required="true"
          >
            <el-radio-group v-model="radio">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="通道" :required="true">
            <el-switch
              v-model="active1"
              active-color="#1FB6FF"
              inactive-color="#DCDFE6"
            >
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
<style lang="scss" scoped>
.card-list {
  display: flex;
  margin-left: -10px;
  .cart-item {
    background-color: #fff;
    margin-left: 10px;
    margin-bottom: 10px;
    padding: 25px;
    width: 50%;
    .cart-tit {
      margin-bottom: 23px;
      font-family: PingFangSC-Regular;
      font-size: 18px;
      color: #2a2f33;
      letter-spacing: 0;
    }
    .full {
      width: 100%;
    }
    /deep/ .el-form-item {
      margin-bottom: 25px;
      .el-form-item__label {
        line-height: 1;
      }
      .el-input__inner {
        border-radius: 0;
      }
      .label-tit {
        margin-right: 10px;
        font-family: PingFangSC-Medium;
        font-size: 13px;
        color: #576271;
        letter-spacing: 0;
      }
      .label-sub-tit {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #a7abb1;
        letter-spacing: 0;
      }
    }
  }
}
</style>
