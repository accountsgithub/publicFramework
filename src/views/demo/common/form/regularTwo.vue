<template>
  <el-form label-position="top" label-width="80px" :inline="true">
    <div class="card-list">
      <div class="cart-item">
        <div class="cart-tit">设备配置</div>
        <div class="cart-con">
          <el-form-item label="采集站编号">
            <el-input />
          </el-form-item>
          <el-form-item label="入网ID">
            <el-input />
          </el-form-item>
          <el-form-item label="设备名称 ">
            <el-input />
          </el-form-item>
        </div>
      </div>
    </div>
  </el-form>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.card-list {
  display: flex;
  .cart-item {
    margin-left: 10px;
    padding: 10px;
    .cart-tit {
      font-family: PingFangSC-Regular;
      font-size: 18px;
      color: #2a2f33;
      letter-spacing: 0;
    }
  }
}
</style>
