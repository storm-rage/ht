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
              :api="zjBtn.exportInvoice"
              >导出</zj-button
            >
          </template>
          <template slot="searchForm">
            <el-form ref="searchForm" :model="searchForm">
              <el-form-item label="销售方：">
                <el-input
                  v-model.trim="searchForm.seller"
                  @keyup.enter.native="search"
                ></el-input>
              </el-form-item>
              <el-form-item label="购买方：">
                <el-input
                  v-model.trim="searchForm.buyer"
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
                  v-model.trim="searchForm.invoiceNumber"
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
            :dataList="list"
            :api="zjControl.getQueryInvoicePage"
          >
            <zj-table-column
              field="invoiceNumber"
              minW
              idth="100"
              title="发票号码"
            />
            <zj-table-column
              field="invoiceCode"
              minWidth="100"
              title="发票代码"
            />
            <zj-table-column field="invoiceType" width="120" title="发票类型" />
            <zj-table-column field="seller" width="120" title="销售方" />
            <zj-table-column field="buyer" width="120" title="购买方" />
            <zj-table-column
              field="totalAmtLowcase"
              width="120"
              :formatter="money"
              title="发票金额(含税)"
            />
            <zj-table-column
              field="sellAmount"
              width="120"
              :formatter="money"
              title="发票金额(不含税)"
            />
            <zj-table-column
              field="invoiceDate"
              width="100"
              :formatter="date"
              title="发票日期"
            />
            <zj-table-column field="verifyCode" width="80" title="验证码" />
            <zj-table-column
              field="validateFlag"
              width="120"
              title="验真结果"
              :formatter="
                obj => typeMap(dictionary.validateFlag, obj.cellValue)
              "
            >
              <template v-slot="{ row }">
                <div
                  :style="{ color: row.validateFlag == '2' ? '#D9001B' : '' }"
                >
                  {{ typeMap(dictionary.validateFlag, row.validateFlag) }}
                </div>
              </template>
            </zj-table-column>
            <zj-table-column
              field="sysAuditState"
              width="120"
              title="系统审核结果"
            />
            <zj-table-column
              field="invoiceSource"
              width="120"
              title="发票来源"
              :formatter="
                obj => typeMap(dictionary.invoiceSource, obj.cellValue)
              "
            />
            <zj-table-column
              field="financingSerialNos"
              width="140"
              title="已关联融资流水"
            />
            <zj-table-column title="操作" width="79" fixed="right">
              <template v-slot="{ row }">
                <zj-button
                  type="text"
                  :api="zjBtn.updateEnterprise"
                  @click="toDownload(row)"
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
      zjControl: {
        getDirectory: this.$api.invoiceQuery.getDirectory,
        getQueryInvoicePage: this.$api.invoiceQuery.getQueryInvoicePage,
        exportInvoice: this.$api.invoiceQuery.exportInvoice
      }, // api集合
      searchForm: {
        seller: '',
        buyer: '',
        invoiceDateStart: '',
        invoiceDateEnd: '',
        invoiceNumber: '',
        invoiceCode: ''
      },
      list: [],
      dictionary: {} // 字典集合
    }
  },
  methods: {
    getDictionary () {
      this.zjControl.getDirectory().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
    toExport () {
      this.zjControl.exportInvoice(this.searchForm)
    },
    toDownload (row) {
      // window.console.log('row', row)
      let params = {
        fileId: row.fileId,
        fileUrl: row.fileId,
        fileName: row.fileName
      }
      this.$api.baseCommon.downloadFile(params)
    }
  },
  created () {
    // getApi在routerMixins里，拿api权限的
    this.getApi()
    this.getDictionary()
  }
}
</script>

<style lang="less"></style>
