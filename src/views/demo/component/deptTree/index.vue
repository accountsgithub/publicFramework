<template>
  <div>
    <search-panel :searchCriteria="searchCriteria">
      <template slot="form-area">
        <el-form-item label="下拉框带输入框的">
          <DeptTreeInput :data="treeList" :prop="prop" v-model="dept" clearable></DeptTreeInput>
        </el-form-item>
        <el-form-item label="下拉框不带输入框的">
          <DeptTreeNoInput
            :data="treeList"
            :prop="prop"
            v-model="dept2"
            ref="dept2"
            node-key="code"
            clearable
            filter
            remote
            :remote-method="onOK"
          ></DeptTreeNoInput>
        </el-form-item>
      </template>
      <template slot="oper-area">
        <el-button
          type="primary"
          @click="getList()"
          class="list-btn-b icon iconfont icon-ic-search"
        >
          {{ $t('common.searchButton') }}
        </el-button>
        <el-button @click="reset" class="list-btn-w">
          {{ $t('common.resetButton') }}
        </el-button>
      </template>
    </search-panel>
    <list-panel>
      <!-- header start -->
      <template slot="header">
        <span class="header__title">{{ $t('demo.demoListTitle') }}</span>
        <el-button class="list-btn-w  iconfont icon-ic-new">{{ $t('demo.addButton') }}</el-button>
      </template>
      <!-- header end -->

      <!-- main start -->
      <template slot="main">
        <el-table :data="list" class="list" highlight-current-row style="width: 100%" stripe>
          <el-table-column prop="name" :label="$t('demo.nameLabel')"></el-table-column>
          <el-table-column prop="code" :label="$t('demo.codeLabel')"></el-table-column>
          <el-table-column prop="date" :label="$t('demo.dateLabel')"></el-table-column>
          <el-table-column :label="$t('common.operateLabel')" :width="165">
            <template slot-scope="scope">
              <a class="tableActionStyle" @click="handleGoDetail(scope.row)" href="javascript:;">{{
                $t('demo.showDetailButton')
              }}</a>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- main end -->

      <!-- pagination start -->
      <template slot="pagination">
        <el-pagination
          v-if="paging.total !== 0"
          :page-size="paging.pageSize"
          :total="paging.total"
          :current-page="paging.pageNo + 1"
          class="pagination"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        >
        </el-pagination>
      </template>
      <!-- pagination end -->
    </list-panel>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DeptTreeInput from '@/components/DeptTreeInput'
import DeptTreeNoInput from '@/components/DeptTreeNoInput'
const children1 = [
  { name: '营销中心1营销中心1营销中心1营销中心1营销中心1营销中心1', code: '100111' },
  { name: '研发中心2', code: '100122' },
  { name: '营销中心3', code: '100113' },
  { name: '研发中心4', code: '100124' },
  { name: '营销中心5', code: '100115' },
  { name: '研发中心6', code: '100126' },
  { name: '营销中心7', code: '100117' },
  { name: '研发中心8', code: '100128' }
]
const children2 = [
  { name: '营销中心a', code: '10001a' },
  { name: '研发中心s', code: '10002s' },
  { name: '营销中心d', code: '10001d' },
  { name: '研发中心f', code: '10002f' },
  { name: '营销中心g', code: '10001g' },
  { name: '研发中心h', code: '10002h' },
  { name: '营销中心j', code: '10001j' },
  { name: '研发中心k', code: '10002k' },
  { name: '营销中心l', code: '10001l' },
  { name: '研发中心z', code: '10002z' }
]
const children3 = [
  { name: '营销中心a1', code: '10001a1' },
  { name: '研发中心s2', code: '10002s2' },
  { name: '营销中心d3', code: '10001d3' },
  { name: '研发中心f4', code: '10002f4' },
  { name: '营销中心g5', code: '10001g5' },
  { name: '研发中心h6', code: '10002h6' },
  { name: '营销中心j7', code: '10001j7' },
  { name: '研发中心k8', code: '10002k8' },
  { name: '营销中心l9', code: '10001l9' },
  { name: '研发中心z0', code: '10002z0' }
]
const data = [
  { name: '科达', code: '10000', children: children2 },
  { name: '科技', code: '10010', children: children1 },
  { name: '科学', code: '10020', children: children3 }
]
export default {
  components: {
    DeptTreeInput,
    DeptTreeNoInput
  },
  data() {
    return {
      isLoading: false,
      isPageSizeChanging: false,
      treeList: data,
      dept: '10010',
      dept2: '100111',
      prop: {
        name: 'name',
        code: 'code',
        children: 'children'
      }
    }
  },
  mounted() {
    this.getList()
  },
  computed: {
    ...mapState({
      list: state => state.demo.list,
      paging: state => state.demo.paging,
      searchCriteria: state => state.demo.searchCriteria
    })
  },
  methods: {
    ...mapActions(['getDemoList', 'resetSearchCriteria']),
    getList(pageSize = 10, pageNo = 0) {
      const { searchCriteria } = this
      let params = {
        ...searchCriteria,
        pageNo,
        pageSize
      }
      this.getDemoList(params)
    },
    reset() {
      // this.resetSearchCriteria()
      // this.getDemoList()
      this.dept2 = ''
      this.$refs.dept2.resetFields()
    },
    handleSizeChange(pageSize) {
      this.isPageSizeChanging = true
      this.getList(pageSize)
    },
    handlePageChange(pageNo) {
      const { paging, isPageSizeChanging } = this
      if (!isPageSizeChanging) {
        this.getList(paging.pageSize, pageNo - 1)
      }
    },
    handleGoDetail() {
      console.log(data)
    },
    onOK(val) {
      setTimeout(() => {
        let arr = [...data]
        this.treeList = arr
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/common.scss';
</style>
