<template>
  <div>
    <advanced-search-panel :ordinarySearch="ordinarySearch" :searchCriteria="searchCriteria">
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
            <el-button @click="getList()" slot="append" icon="el-icon-search"></el-button>
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
        <el-button type="primary" @click="getList()" class="list-btn-b icon iconfont icon-ic-search"
          >{{ $t('common.searchButton') }}
        </el-button>
        <el-button @click="reset" class="list-btn-w">{{ $t('common.resetButton') }}</el-button>
      </template>
    </advanced-search-panel>

    <list-panel>
      <!-- header start -->
      <template slot="header">
        <span class="header__title">{{ $t('demo.demoListTitle') }}</span>
        <el-button @click="addStore" class="list-btn-w  iconfont icon-ic-new">{{
          $t('demo.addButton')
        }}</el-button>
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
    <el-dialog
      title="添加存储"
      :visible.sync="addStoreVisible"
      width="40%"
      :before-close="closeAddStore"
    >
      <el-form
        label-position="top"
        :model="storeForm"
        label-width="80px"
        :inline="true"
        :rules="storeRules"
        ref="storeRules"
      >
        <el-form-item class="full" prop="num">
          <template slot="label">
            <span class="label-tit">
              采集站编号
            </span>
            <span class="label-sub-tit">您真实姓名，用于核查信息</span>
          </template>
          <el-input v-model="storeForm.num" />
        </el-form-item>
        <el-form-item style="width:60%;margin-right:50px;" prop="id">
          <template slot="label">
            <span class="label-tit">
              入网ID
            </span>
            <span class="label-sub-tit">请核查你的ID</span>
          </template>
          <el-input v-model="storeForm.id" />
        </el-form-item>
        <el-form-item :required="true">
          <template slot="label">
            <span class="label-tit">
              通道
            </span>
          </template>
          <el-switch v-model="storeForm.active" active-color="#1FB6FF" inactive-color="#DCDFE6">
          </el-switch>
        </el-form-item>
        <el-form-item class="full" prop="name">
          <template slot="label">
            <span class="label-tit">
              设备名称
            </span>
            <span class="label-sub-tit">设备名称自定义采用数字或者字母</span>
          </template>
          <el-input v-model="storeForm.name" />
        </el-form-item>
        <el-form-item prop="label" class="full">
          <template slot="label">
            <span class="label-tit">
              标签
            </span>
            <span class="label-sub-tit">标签便于识别设备</span>
          </template>
          <el-select v-model="storeForm.label" style="width:100%;" multiple>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :required="true" class="full">
          <template slot="label">
            <span class="label-tit">
              关键字
            </span>
            <span class="label-sub-tit">可输入多个关键字</span>
          </template>
          <el-select v-model="storeForm.label2" multiple collapse-tags style="width:100%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddStore">取 消</el-button>
        <el-button type="primary" @click="sbumitStore">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import { SearchPanel, advancedSearch } from '@/components/layout'

export default {
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
      typePlaceholder: '请选择通道号ID精确查找',
      addStoreVisible: false,
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
      ],
      storeForm: {
        label: '',
        label2: '',
        active: true,
        num: '',
        id: '',
        name: ''
      },
      storeRules: {
        num: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
        label: [{ required: true, message: '请输入标签', trigger: 'blur' }],
        id: [{ required: true, message: '请输入ID', trigger: 'blur' }]
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
      if (this.searchType === 'ID') {
      } else {
      }
      const { searchCriteria } = this.searchCriteria
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
    },
    addStore() {
      this.addStoreVisible = true
    },
    closeAddStore() {
      this.$refs.storeRules.resetFields()
      this.addStoreVisible = false
    },
    sbumitStore() {
      this.closeAddStore()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/common.scss';
</style>
