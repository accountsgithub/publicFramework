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
        <div class="info-form">
          <div class="info-tit"><span class="txt blue-line">审批意见</span></div>
          <div class="info-con" style="width:640px;">
            <el-form label-width="120px">
              <el-form-item label="审批意见：" class="vetical-top full">
                <el-input type="textarea" :rows="3" placeholder="评价的相关内容" v-model="textarea">
                </el-input>
              </el-form-item>
              <el-form-item class="full" label="标签：">
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
              <el-form-item class="full">
                <el-button type="primary">通过</el-button>
                <el-button>取消</el-button>
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
export default {
  data() {
    return {
      textarea: '',
      label: '',
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
