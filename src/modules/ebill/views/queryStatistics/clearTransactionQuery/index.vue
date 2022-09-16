<template>
  <div>
    <zj-content-container>
      <!--  清算交易查询  -->
          <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
            <zj-list-layout>
<!--              <template slot="leftBtns">-->
<!--                <vxe-button class="export" icon="el-icon-download" @click="toExport" :api="zjBtn.exportFactoringCredit">导出</vxe-button>-->
<!--              </template>-->
              <template slot="searchForm">
                <el-form ref="searchForm" :model="searchForm">
                  <el-form-item label="核心企业名称：">
                    <el-input v-model.trim="searchForm.payEntName" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="收款人名称：">
                    <el-input v-model.trim="searchForm.repaymentEntName" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="申请类型：">
                    <el-select v-model="searchForm.clearType"
                               placeholder="请选择"
                               filterable
                               :popper-append-to-body="false"
                    >
                      <el-option label="全部" value=""></el-option>
                      <el-option
                        v-for="item in dictionary.applyType"
                        :key="item.code"
                        :label="item.desc"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="申请日期：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.applyDatetimeStart"
                      :endDate.sync="searchForm.applyDatetimeEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="申请流水号：">
                    <el-input v-model.trim="searchForm.serialNo" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="申请状态：">
                    <el-select v-model="searchForm.applyStatus"
                               placeholder="请选择"
                               filterable
                               :popper-append-to-body="false"
                    >
                      <el-option label="全部" value=""></el-option>
                      <el-option
                        v-for="item in dictionary.applyStatus"
                        :key="item.code"
                        :label="item.desc"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </template>
              <zj-table ref="searchTable" :params="searchForm" :api="zjControl.queryExpireClearPage">
                <zj-table-column title="申请流水号">
                  <template v-slot="{row}">
                    <zj-button type="text" @click="toDetail(row)" :api="zjBtn.getExpireClearDetail">{{row.serialNo}}</zj-button>
                  </template>
                </zj-table-column>
                <zj-table-column field="clearType" title="申请类型" :formatter="obj=>typeMap(dictionary.applyType,obj.cellValue)"/>
                <zj-table-column field="payEntName" title="核心企业名称"/>
                <zj-table-column field="repaymentEntName" title="收款人名称"/>
                <zj-table-column field="clearTotalCount" title="清算总笔数" />
                <zj-table-column field="clearTotalAmt" title="清算总金额" :formatter="money"/>
                <zj-table-column field="applyDatetime" title="申请时间" :formatter="date"/>
                <zj-table-column field="applyStatus" title="申请状态" :formatter="obj=>typeMap(dictionary.applyStatus,obj.cellValue)"/>
              </zj-table>
            </zj-list-layout>
          </div>
    </zj-content-container>
  </div>
</template>
<script>
import clearTransactionQuery from "../../../api/clearTransactionQueryApi";

export default {
  components: {},
  data() {
    return {
      zjControl: {
        getExpireClearDetail:this.$api.clearTransactionQuery.getExpireClearDetail,
        getDirectory:this.$api.clearTransactionQuery.getDirectory,
        queryExpireClearPage:this.$api.clearTransactionQuery.queryExpireClearPage,
      },
      searchForm: {
        payEntName: '',
        repaymentEntName: '',
        clearType: '',
        applyDatetimeStart: '',
        applyDatetimeEnd: '',
        serialNo: '',
        applyStatus: '',
      },
      dictionary:{},
    };
  },
  methods: {
    getDictionary() {
      this.zjControl.getDirectory().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
    toDetail(row) {
      this.goChild('queryExpireClearDetail',row)
    },
    toExport() {
      this.zjControl.exportFactoringCredit()
    },
  },
  created() {
    this.getApi()
    this.getDictionary()
  }
};
</script>
