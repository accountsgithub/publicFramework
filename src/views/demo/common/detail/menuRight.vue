<template>
  <div class="detail-right-wrapper">
    <div class="tit">MP6J106D73344433</div>
    <div class="con">
      <div class="left">
        <div class="info">
          <div class="info-tit"><span class="txt blue-line">基础信息</span></div>
          <div class="info-con">
            <el-form label-width="120px" :inline="true">
              <el-form-item label="所属部门：">
                公共应用技术部
              </el-form-item>
              <el-form-item label="优先级：">
                高
              </el-form-item>
              <el-form-item label="审批截止时间：">
                2018-06-08 12:23
              </el-form-item>
              <el-form-item label="申请服务：">
                数据库申请
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="info">
          <div class="info-tit"><span class="txt blue-line">服务信息</span></div>
          <div class="info-con">
            <el-form label-width="120px" :inline="true">
              <el-form-item label="创建用户：">
                朱云龙
              </el-form-item>
              <el-form-item label="实例：">
                4
              </el-form-item>
              <el-form-item label="内存：">
                369 ~ 840 GB
              </el-form-item>
              <el-form-item label="所属部门：">
                行业应用开发部
              </el-form-item>
              <el-form-item label="CPU：">
                260 ~ 480 MB
              </el-form-item>
              <el-form-item label="备注：" class="full">
                数据库名称，各环境分别命名，如开发：kogp_dev数据库名称，各环境分别命名，如开发：kogp_dev数据库名
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="right">
        <ul class="step-list">
          <li>
            <span class="txt">基础信息</span>
          </li>
          <li class="active">
            <span class="txt">服务信息</span>
          </li>
          <li>
            <span class="txt">审批信息</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped></style>
