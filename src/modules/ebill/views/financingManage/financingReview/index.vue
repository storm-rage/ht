<template>
    <zj-content-container>
      <!--  融资复核  -->
          <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
            <zj-list-layout>
              <template slot="rightBtns">
                <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch()">重置</vxe-button>
                <vxe-button class="search" icon="el-icon-search" @click="search(true,'searchTable')">查询</vxe-button>
              </template>
              <template slot="searchForm">
                <el-form ref="searchForm" :model="searchForm">
                  <el-form-item label="融资流水号：">
                    <el-input v-model="searchForm.serialNo" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="融资申请日期：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.applyDatetimeStart"
                      :endDate.sync="searchForm.applyDatetimeEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="融资到期日期：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.expireDateStart"
                      :endDate.sync="searchForm.expireDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="融资申请金额：">
                    <zj-amount-range :startAmt.sync="searchForm.tranAmtStart" :endAmt.sync="searchForm.tranAmtEnd"></zj-amount-range>
                  </el-form-item>
                </el-form>
              </template>
              <zj-table ref="searchTable"
                        :api="zjControl.queryFinancingReviewPage"
                        :params="searchForm"
              >
                <zj-table-column field="serialNo" title="融资流水号"/>
                <zj-table-column field="financingProductType" title="融资产品名称" :formatter="obj=>typeMap(dictionary.financingProductType,obj.cellValue)"/>
                <zj-table-column field="fromEntName" title="融资企业名称"/>
                <zj-table-column field="tranAmt" title="融资申请金额" :formatter="money"/>
                <zj-table-column field="applyDatetime" title="融资申请日期" :formatter="date"/>
                <zj-table-column field="expireDate" title="融资到期日" :formatter="date"/>
                <zj-table-column  title="操作" fixed="right">
                  <template v-slot="{row}">
                    <zj-button type="text" @click="toReview(row)">复核</zj-button>
                  </template>
                </zj-table-column>
              </zj-table>
            </zj-list-layout>
          </div>
    </zj-content-container>
</template>
<script>
export default {
  name: 'financingReview',
  data() {
    return {
      zjControl: {
        getDirectory: this.$api.financingReview.getDirectory,//数据字典
        getFinancingReviewDetail: this.$api.financingReview.getFinancingReviewDetail,//详情
        queryFinancingReviewPage: this.$api.financingReview.queryFinancingReviewPage,//查询
        submitFinancingReview: this.$api.financingReview.submitFinancingReview,//提交
      },
      searchForm: {
        serialNo: '',
        applyDatetimeStart: '',
        applyDatetimeEnd: '',
        expireDateStart: '',
        expireDateEnd: '',
        tranAmtStart: '',
        tranAmtEnd: '',
      },
      dictionary: {},
    };
  },
  methods: {
    getDic() {
      this.zjControl.getDirectory().then(res=> {
        this.dictionary = res.data
      })
    },
    toReview (row) {
      this.goChild('orderFinancingReview', row)
    },
  },
  created() {
    this.getApi()
    this.getDic()
  }
};
</script>
