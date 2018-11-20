<template>
    <!-- search -->
    <div>
        <SearchPanel>
            <el-form :inline="true"
                     size="small"
                     :model="searchCriteria"
                     class="formPanel"
                     label-width="80px">
                <div>
                    <el-form-item :label="$t('demo.nameLabel')">
                        <el-input v-model="searchCriteria.name"
                                  @keyup.enter.native="searchDemo"
                                  :placeholder="$t('demo.namePlaceholder')"></el-input>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary"
                               @click="searchDemo"
                               class="tableLastButtonStyleB icon iconfont icon-ic-search">{{$t('common.search_button')}}</el-button>
                    <el-button @click="reset"
                               class="tableLastButtonStyleW"
                               style="margin-right: -10px;">{{$t('common.reset_button')}}</el-button>
                </el-form-item>
            </el-form>
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
        SearchPanel,
    },

    data() {
        return {

        }
    },
    created: function() {

    },
    methods: {
        ...mapActions(['getDemoList', 'resetSearchCriteria']),
        searchDemo() {
            const params = this.searchCriteria
            params['pageNo'] = 0
            this.getDemoList(params)
        },
        reset() {
            this.resetSearchCriteria();
            this.getDemoList(this.searchCriteria)
        },
        handleSizeChange(pageSize) {
            this.tempPS = pageSize
            const params = Object.assign({}, this.searchCriteria, { pageSize })
            this.getDemoList(params)
        },
        handlePageChange(pageNo) {
            const params = Object.assign({}, this.searchCriteria, { pageNo: pageNo - 1 })
            this.getDemoList(params)
        },
        handleGoDetail() {

        }
    },

    computed: {
        ...mapState({
            list: (state) => {
                return state.demo.list
            },
            paging: state => state.demo.paging,
            searchCriteria: state => state.demo.searchCriteria
        })
    },


    mounted() {
        let params = this.searchCriteria
        this.getDemoList(params)
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

@include e(body) {
  padding: 0 30px;
  .list {
    padding: 0 30px;
    &.el-table::before {
      height: 0 !important;
    }
  }
}

.formPanel {
  width: 100% !important;
  display: flex;
  justify-content: space-between;
}
.more-ops a {
  display: inline-block;
  height: 100%;
  width: 100%;
}
</style>
