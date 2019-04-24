<template>
  <div>
    <SearchPanel :searchCriteria="searchCriteria">
      <template slot="form-area">
        <el-form-item label="请选择部门">
          <DeptTreeInput :data="treeList" hover :prop="prop" v-model="dept" ref="dept" clearable></DeptTreeInput>
        </el-form-item>
        <el-form-item label="请选择部门">
          <DeptTreeInput :data="treeList" :prop="prop" v-model="dept" ref="dept" clearable></DeptTreeInput>
        </el-form-item>
        <el-form-item label="请选择部门">
          <DeptTreeNoInput :data="treeList" :prop="prop" v-model="dept2" ref="dept2" clearable filter></DeptTreeNoInput>
        </el-form-item>
        <el-form-item label="请选择日期范围">
          <TimeSelect clearable v-model="searchCriteria.timeRange" :prop="timeProp" :items="options" size="medium" />
        </el-form-item>
        <el-form-item label="请选择日期范围">
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
    </SearchPanel>
    <p>
      值：{{searchCriteria.timeRange}}
    </p>
  </div>
</template>
<script>
  import DeptTreeInput from '@/components/DeptTreeInput'
  import DeptTreeNoInput from '@/components/DeptTreeNoInput'
  import TimeSelect from '@/components/TimeSelect'
  import { SearchPanel } from '@/components/layout'
  const children1 = [
    {name: '营销中心', code: '10011'},
    {name: '研发中心', code: '10012'},
    {name: '营销中心', code: '10011'},
    {name: '研发中心', code: '10012'},
    {name: '营销中心', code: '10011'},
    {name: '研发中心', code: '10012'},
    {name: '营销中心', code: '10011'},
    {name: '研发中心', code: '10012'}
  ]
  const children2 = [
    {name: '营销中心', code: '10001'},
    {name: '研发中心', code: '10002'},
    {name: '营销中心', code: '10001'},
    {name: '研发中心', code: '10002'},
    {name: '营销中心', code: '10001'},
    {name: '研发中心', code: '10002'},
    {name: '营销中心', code: '10001'},
    {name: '研发中心', code: '10002'},
    {name: '营销中心', code: '10001'},
    {name: '研发中心', code: '10002'}
  ]
  const data = [
    {name: '科达', code: '10000', children: children2},
    {name: '科技', code: '10010', children: children1},
    // {name: '科达', code: '10000', children: children2},
    // {name: '科技', code: '10010', children: children1},
    // {name: '科达', code: '10000', children: children2},
    // {name: '科技', code: '10010', children: children1},
    // {name: '科达', code: '10000', children: children2},
    // {name: '科技', code: '10010', children: children1},
    // {name: '科达', code: '10000', children: children2},
    // {name: '科技', code: '10010', children: children1},
    // {name: '科达', code: '10000', children: children2},
    {name: '科技', code: '10010', children: children1}
  ]
  export default {
    name: 'deptTree',
    components: {
      DeptTreeInput,
      DeptTreeNoInput,
      TimeSelect,
      SearchPanel
    },
    watch: {},
    data () {
      return {
        searchCriteria: {},
        treeList: data,
        dept: '',
        dept2: '',
        prop: {
          name: 'name',
          code: 'code',
          children: 'children'
        },
        timeRange: [],
        timeProp: {
          label: 'name',
          value: 'code'
        },
        options: [
          {name: '2小时前', code: '2'},
          {name: '5小时前', code: '5'},
          {name: '1天前', code: '24'}
        ],
        value: ''
      }
    },
    methods: {
      TimeSelectChange (val) {
        console.log(val)
      }
    }
  }
</script>
