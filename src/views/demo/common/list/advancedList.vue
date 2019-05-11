<template>
  <div>
    <advancedSearch :ordinarySearch="ordinarySearch" :searchCriteria="searchCriteria">
      <template slot="ordinaryForm-area">
        <el-form-item>
          <el-input :placeholder="typePlaceholder" v-model="searchinput" class="input-with-select">
            <el-select
              ref="select"
              v-model="searchType"
              slot="prepend"
              icon-class="caret-bottom"
              suffix-icon="el-icon-caret-bottom"
              @change="searchTypeChange"
              placeholder="请选择"
            >
              <el-option label="通道ID" value="ID" key="1"></el-option>
              <el-option label="单位名称" value="name" key="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-dropdown>
            <el-button> 标签<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>标签1</el-dropdown-item>
              <el-dropdown-item>标签2</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
      </template>

      <template slot="ordinaryOper-area">
        <el-button type="info" icon="el-icon-caret-top"></el-button>
        <el-button type="info" icon="el-icon-plus"></el-button>
        <el-button-group>
          <el-button type="info" icon="el-icon-edit"></el-button>
          <el-button type="info" icon="el-icon-share"></el-button>
          <el-button type="info" icon="el-icon-delete"></el-button>
        </el-button-group>
      </template>

      <template slot="form-area">
        <el-form-item :label="$t('demo.nameLabel')">
          <el-input
            v-model="searchCriteria.name"
            @keyup.enter.native="getList()"
            :placeholder="$t('demo.namePlaceholder')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('demo.nameLabel')">
          <el-input
            v-model="searchCriteria.name"
            @keyup.enter.native="getList()"
            :placeholder="$t('demo.namePlaceholder')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('demo.nameLabel')">
          <el-input
            v-model="searchCriteria.name"
            @keyup.enter.native="getList()"
            :placeholder="$t('demo.namePlaceholder')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('demo.nameLabel')">
          <el-input
            v-model="searchCriteria.name"
            @keyup.enter.native="getList()"
            :placeholder="$t('demo.namePlaceholder')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('demo.nameLabel')">
          <el-input
            v-model="searchCriteria.name"
            @keyup.enter.native="getList()"
            :placeholder="$t('demo.namePlaceholder')"
          ></el-input>
        </el-form-item>
      </template>

      <template slot="oper-area">
        <el-button type="primary" @click="getList()" class="tableLastButtonStyleB icon iconfont icon-ic-search"
          >{{ $t('common.searchButton') }}
        </el-button>
        <el-button @click="reset" class="tableLastButtonStyleW">{{ $t('common.resetButton') }}</el-button>
      </template>
    </advancedSearch>

    <list-panel>
      <!-- header start -->
      <template slot="header">
        <span class="header__title">{{ $t('demo.demoListTitle') }}</span>
        <el-button class="tableLastButtonStyleW  iconfont icon-ic-new">{{ $t('demo.addButton') }}</el-button>
      </template>
      <!-- header end -->

      <!-- main start -->
      <template slot="main">
        <el-table :data="list" class="list" highlight-current-row style="width: 100%" stripe>
          <el-table-column prop="name" :label="$t('demo.nameLabel')" />
          <el-table-column prop="code" :label="$t('demo.codeLabel')" />
          <el-table-column prop="date" :label="$t('demo.dateLabel')"></el-table-column>
          <el-table-column :label="$t('common.operateLabel')" :width="165">
            <template slot-scope="scope">
              <a class="tableActionStyle" @click="handleGoDetail(scope.row)" href="javascript:;">{{
                $t('demo.showDetailButton')
              }}</a>
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
        <el-pagination
          v-if="paging.total != 0"
          :page-size="paging.pageSize"
          :total="paging.total"
          :current-page="paging.pageNo + 1"
          class="pagination"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </template>
      <!-- pagination end -->
    </list-panel>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { SearchPanel, advancedSearch } from '@/components/layout'

export default {
  components: {
    SearchPanel,
    advancedSearch
  },
  data() {
    return {
      isLoading: false,
      isPageSizeChanging: false,
      searchType: 'ID',
      searchinput: '',
      ordinarySearch: {
        searchType: 'ID',
        ID: '',
        name: ''
      },
      typePlaceholder: '请选择通道号ID精确查找'
    }
  },

  mounted() {
    this.getList()
    console.log('select=', this.$refs.select)
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
      this.resetSearchCriteria()
      this.getDemoList()
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
    handleGoDetail() {},
    searchTypeChange(val) {
      if (val == 'ID') {
        this.typePlaceholder = '请选择通道号ID精确查找'
      } else {
        this.typePlaceholder = '请选择单位名称精确查找'
      }
      /* switch (val) {
      case 'ID':
        this.typePlaceholder = '请选择通道号ID精确查找'
        break
      case 'name':
        this.typePlaceholder = '请选择单位名称精确查找'
        break
      } */
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/common.scss';

// 操作标签样式

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
