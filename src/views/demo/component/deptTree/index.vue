<template>
  <div>
    <el-row>
      <el-col :span="3">
        带输入框的下拉框
      </el-col>
      <el-col :span="6">
        <DeptTreeInput :data="treeList" :prop="prop" v-model="dept" ref="dept" clearable hover></DeptTreeInput>
      </el-col>
      <el-col :span="1">.</el-col>
      <el-col :span="3">
        选中的值是{{dept}}
      </el-col>
      <el-col :span="1">.</el-col>
      <el-col :span="6">
        <el-button type="primary" size="mini" @click="$refs.dept.validate()">验证</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 50px">
      <el-col :span="3">
        不带输入框的下拉框
      </el-col>
      <el-col :span="6">
        <DeptTreeNoInput :data="treeList" :prop="prop" v-model="dept2" ref="dept2" clearable filter></DeptTreeNoInput>
      </el-col>
      <el-col :span="1">.</el-col>
      <el-col :span="3">
        选中的值是{{dept2}}
      </el-col>
      <el-col :span="1">.</el-col>
      <el-col :span="6">
        <el-button type="primary" size="mini" @click="$refs.dept.validate()">验证</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import DeptTreeInput from '@/components/DeptTreeInput'
  import DeptTreeNoInput from '@/components/DeptTreeNoInput'
  const children1 = [
    { name: '营销中心', code: '10011' },
    { name: '研发中心', code: '10012' },
    { name: '营销中心', code: '10011' },
    { name: '研发中心', code: '10012' },
    { name: '营销中心', code: '10011' },
    { name: '研发中心', code: '10012' },
    { name: '营销中心', code: '10011' },
    { name: '研发中心', code: '10012' }
  ]
  const children2 = [
    { name: '营销中心', code: '10001' },
    { name: '研发中心', code: '10002' },
    { name: '营销中心', code: '10001' },
    { name: '研发中心', code: '10002' },
    { name: '营销中心', code: '10001' },
    { name: '研发中心', code: '10002' },
    { name: '营销中心', code: '10001' },
    { name: '研发中心', code: '10002' },
    { name: '营销中心', code: '10001' },
    { name: '研发中心', code: '10002' }
  ]
  const data = [
    { name: '科达', code: '10000', children: children2 },
    { name: '科技', code: '10010', children: children1 },
    // {name: '科达', code: '10000', children: children2},
    // {name: '科技', code: '10010', children: children1},
    // {name: '科达', code: '10000', children: children2},
    // {name: '科技', code: '10010', children: children1},
    // {name: '科达', code: '10000', children: children2},
    // {name: '科技', code: '10010', children: children1},
    // {name: '科达', code: '10000', children: children2},
    // {name: '科技', code: '10010', children: children1},
    // {name: '科达', code: '10000', children: children2},
    { name: '科技', code: '10010', children: children1 }
  ]
  export default {
    name: 'deptTree',
    components: {
      DeptTreeInput,
      DeptTreeNoInput
    },
    // watch: {
    //   dept (val) {
    //     console.log('选中的值是' + val)
    //   }
    // },
    data () {
      return {
        treeList: data,
        dept: '',
        dept2: '',
        prop: {
          name: 'name',
          code: 'code',
          children: 'children'
        }
      }
    },
    methods: {}
  }
</script>
