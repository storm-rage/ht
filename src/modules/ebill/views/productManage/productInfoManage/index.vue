<template>
  <zj-content-container>
    <!--  产品信息管理  -->
    <zj-list-layout>
      <template slot="rightBtns">
        <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch()">重置</vxe-button>
        <vxe-button class="search" icon="el-icon-search" @click="search(true,'searchTable')">查询</vxe-button>
      </template>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="产品名称：">
            <el-input v-model="searchForm.productName" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="业务类型：">
            <el-select v-model="searchForm.busType"
                       :popper-append-to-body="false"
            >
              <el-option label="全部" value=""/>
              <el-option v-for="item in dictionary.busType"
                         :key="item.code"
                         :label="item.desc"
                         :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="产品类型：">
            <el-select v-model="searchForm.productType"
                       :popper-append-to-body="false"
            >
              <el-option label="全部" value=""/>
              <el-option v-for="item in dictionary.productType"
                         :key="item.code"
                         :label="item.desc"
                         :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="产品编号：">
            <el-input v-model="searchForm.productCode" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="产品状态：">
            <el-select v-model="searchForm.status"
                       :popper-append-to-body="false"
            >
              <el-option label="全部" value=""/>
              <el-option v-for="item in dictionary.status"
                         :key="item.code"
                         :label="item.desc"
                         :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template slot="btnGroups">
        <vxe-button type="primary" icon="el-icon-circle-plus-outline" @click="add()">新增产品</vxe-button>
      </template>
      <zj-table ref="searchTable" :api="zjControl.queryProductPage" :params="searchForm">
        <zj-table-column title="产品编号">
          <template v-slot="{ row }">
            <zj-button type="text" @click="toDetail(row)">{{row.productCode}}</zj-button>
          </template>
        </zj-table-column>
        <zj-table-column field="productName" title="产品名称"/>
        <zj-table-column field="busType" title="业务类型" :formatter="obj=>typeMap(dictionary.busType, obj.cellValue)"/>
        <zj-table-column field="productType" title="产品类型" :formatter="obj=>typeMap(dictionary.productType, obj.cellValue)"/>
        <zj-table-column field="modifyDatetime" title="上次维护时间" :formatter="date"/>
        <zj-table-column field="status" title="产品状态" :formatter="obj=>typeMap(dictionary.status, obj.cellValue)"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button type="text" @click="toEdit(row, )">修改</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
  </zj-content-container>
</template>
<script>
import productInfoManage from "../../../api/productInfoManageApi";

export default {
  components: {},
  data() {
    return {
      zjControl: {
        addProductSetting: this.$api.productInfoManage.addProductSetting,//新增产品配置
        queryProductDirectory: this.$api.productInfoManage.queryProductDirectory,//数据字典
        queryProductPage: this.$api.productInfoManage.queryProductPage,//产品列表
      },
      searchForm: {
        productName: '',
        busType: '',
        productType: '',
        productCode: '',
        status: '',
      },
      dictionary: {},
    };
  },
  methods: {
    queryProductDirectory() {
      this.zjControl.queryProductDirectory().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
    add() {
      this.goChild('productInfoManageEdit')
    },
    toDetail(row) {
      this.goChild('productInfoManageDetail', row)
    },
    toEdit(row) {
      this.goChild('productInfoManageEdit', row)
    },
  },
  created() {
    this.getApi()
    this.queryProductDirectory()
  }
};
</script>
