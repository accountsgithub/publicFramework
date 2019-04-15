<template>
  <div>
    <SearchPanel :searchCriteria="searchCriteria">
      <template slot="form-area">
        <el-form-item :label="$t('demo.nameLabel')">
          <el-input v-model="searchCriteria.name"
                    @keyup.enter.native="getList()"
                    :placeholder="$t('demo.namePlaceholder')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('demo.nameLabel')">
          <el-input v-model="searchCriteria.name"
                    @keyup.enter.native="getList()"
                    :placeholder="$t('demo.namePlaceholder')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('demo.nameLabel')">
          <el-input v-model="searchCriteria.name"
                    @keyup.enter.native="getList()"
                    :placeholder="$t('demo.namePlaceholder')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('demo.nameLabel')">
          <el-input v-model="searchCriteria.name"
                    @keyup.enter.native="getList()"
                    :placeholder="$t('demo.namePlaceholder')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('demo.nameLabel')">
          <el-input v-model="searchCriteria.name"
                    @keyup.enter.native="getList()"
                    :placeholder="$t('demo.namePlaceholder')"></el-input>
        </el-form-item>
      </template>
      <template slot="oper-area">
        <el-button type="primary"
                   @click="getList()"
                   class="tableLastButtonStyleB icon iconfont icon-ic-search">{{$t('common.searchButton')}}</el-button>
        <el-button @click="reset"
                   class="tableLastButtonStyleW">{{$t('common.resetButton')}}</el-button>
      </template>
    </SearchPanel>
    <list-panel>
      <!-- header start -->
      <template slot="header">
        <span class="header__title">{{$t('demo.demoListTitle')}}</span>
        <el-button class="tableLastButtonStyleW  iconfont icon-ic-new">{{$t('demo.addButton')}}</el-button>
      </template>
      <!-- header end -->

      <!-- main start -->
      <template slot="main">
        <el-table :data="list"
                  class="list"
                  highlight-current-row
                  style="width: 100%"
                  stripe>
          <el-table-column prop="name"
                           :label="$t('demo.nameLabel')" />
          <el-table-column prop="code"
                           :label="$t('demo.codeLabel')" />
          <el-table-column prop="date"
                           :label="$t('demo.dateLabel')">
          </el-table-column>
          <el-table-column :label="$t('common.operateLabel')"
                           :width="165">
            <template slot-scope="scope">
              <a class="tableActionStyle"
                 @click="handleGoDetail(scope.row)"
                 href="javascript:;">{{$t('demo.showDetailButton')}}</a>
              <!-- <el-dropdown trigger="click">
                                <el-button size="small"
                                           type="text">
                                    更多
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown"
                                                  class="more-ops">
                                    <el-dropdown-item>
                                        <a class="tableActionStyle"
                                           @click="dialogChange(scope.row)"
                                           v-if="scope.row.state !== 4 && scope.row.state !== 5">{{$t('projectMgt.change_button')}}</a>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <a class="tableActionStyle"
                                           @click="dialogInfo(scope.row)"
                                           v-if="scope.row.state !== 4 && scope.row.state !== 5">{{$t('projectMgt.showDetail_button')}}</a>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <a class="tableActionStyle"
                                           @click="addEmail(scope.row)">{{$t('projectMgt.addEmail_button')}}</a>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown> -->
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- main end -->

      <!-- pagination start -->
      <template slot="pagination">
        <el-pagination v-if="paging.total != 0"
                       :page-size="paging.pageSize"
                       :total="paging.total"
                       :current-page="paging.pageNo + 1"
                       class="pagination"
                       layout="total, sizes, prev, pager, next, jumper"
                       @size-change="handleSizeChange"
                       @current-change="handlePageChange" />
      </template>
      <!-- pagination end -->
    </list-panel>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { SearchPanel } from '@/components/layout'
export default {
  components: {
    SearchPanel
  },
  data () {
    return {
      isLoading: false,
      isPageSizeChanging: false
    }
  },
  mounted () {
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
    getList (pageSize = 10, pageNo = 0) {
      const { searchCriteria } = this
      let params = {
        ...searchCriteria,
        pageNo,
        pageSize
      }
      this.getDemoList(params)
    },
    reset () {
      this.resetSearchCriteria()
      this.getDemoList()
    },
    handleSizeChange (pageSize) {
      this.isPageSizeChanging = true
      this.getList(pageSize)
    },
    handlePageChange (pageNo) {
      const { paging, isPageSizeChanging } = this
      if (!isPageSizeChanging) {
        this.getList(paging.pageSize, pageNo - 1)
      }
    },
    handleGoDetail () {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/common.scss';

// 操作标签样式
.tableActionStyle {
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #016ad5;
  letter-spacing: 0.86px;
  text-align: left;
  margin-right: 10px;
}

// .projectDropDown {
//   font-size: 12px !important;
//   border: 1px solid $dropDown-border-color !important;
//   border-radius: 4px;
//   padding: 4px 12px;
// }

// @include e(body) {
//   padding: 0 30px;
//   .list {
//     padding: 0 30px;
//     &.el-table::before {
//       height: 0 !important;
//     }
//   }
// }

.more-ops a {
  display: inline-block;
  height: 100%;
  width: 100%;
}
</style>
