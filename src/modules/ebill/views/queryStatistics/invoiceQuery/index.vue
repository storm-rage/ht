<template>
  <div>
    <zj-content-container>
      <!-- 发票查询 -->
      <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
        <zj-list-layout>
          <template slot="leftBtns">
            <zj-button
              class="export"
              icon="el-icon-download"
              @click="toExport"
              :api="zjBtn.exportStatementAccountBill"
              >导出</zj-button
            >
          </template>
          <template slot="searchForm">
            <el-form ref="searchForm" :model="searchForm">
              <el-form-item label="销售方：">
                <el-input
                  v-model.trim="searchForm.sellerName"
                  @keyup.enter.native="search"
                ></el-input>
              </el-form-item>
              <el-form-item label="购买方：">
                <el-input
                  v-model.trim="searchForm.companyName"
                  @keyup.enter.native="search"
                ></el-input>
              </el-form-item>
              <el-form-item label="发票日期：">
                <zj-date-range-picker
                  :startDate.sync="searchForm.invoiceDateStart"
                  :endDate.sync="searchForm.invoiceDateEnd"
                ></zj-date-range-picker>
              </el-form-item>
              <el-form-item label="发票号码：">
                <el-input
                  v-model.trim="searchForm.invoiceNo"
                  @keyup.enter.native="search"
                ></el-input>
              </el-form-item>
              <el-form-item label="发票代码：">
                <el-input
                  v-model.trim="searchForm.invoiceCode"
                  @keyup.enter.native="search"
                ></el-input>
              </el-form-item>
            </el-form>
          </template>
          <zj-table
            ref="searchTable"
            :params="searchForm"
            :api="zjControl.queryStatementSrmAccountBillPage"
          >
            <zj-table-column field="field1" title="发票号码" />
            <zj-table-column field="field1" title="发票代码" />
            <zj-table-column field="field1" title="发票发票类型" />
            <zj-table-column field="field1" title="销售方" />
            <zj-table-column field="field1" title="购买方" />
            <zj-table-column field="field1" title="发票金额(含税)" />
            <zj-table-column field="field1" title="发票金额(不含税)" />
            <zj-table-column field="field1" title="发票日期" />
            <zj-table-column field="field1" title="验证码" />
            <zj-table-column field="field1" title="验真结果" />
            <zj-table-column field="field1" title="系统审核结果" />
            <zj-table-column field="field1" title="发票来源" />
            <zj-table-column field="field1" title="已关联融资流水" />
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{ row }">
                <zj-button
                  type="text"
                  :api="zjBtn.updateEnterprise"
                  @click="down(row)"
                  >下载</zj-button
                >
              </template>
            </zj-table-column>
          </zj-table>
        </zj-list-layout>
      </div>
    </zj-content-container>
  </div>
</template>

<script>
export default {
  name: 'invoiceQuery',
  data () {
    return {
      zjControl: {}, // api集合
      searchForm: {
        sellerName: '',
        companyName: '',
        invoiceDateStart: '',
        invoiceDateEnd: '',
        invoiceNo: '',
        invoiceCode: ''
      },
      list: [],
      dictionary: {} // 字典集合
    }
  },
  methods: {
    getDictionary () {
      // this.zjControl.getDirectory().then(res => {
      //   this.dictionary = Object.assign({}, res.data)
      // })
    },
    toExport () {
      // this.zjControl.exportStatementAccountBill()
    }
  },
  created () {
    // getApi在routerMixins里，拿api权限的
    // this.getApi()
    this.getDictionary()
    // localStorage.clear()
    // window.clearVuexAlong()
  }
}
</script>

<style lang="less"></style>
