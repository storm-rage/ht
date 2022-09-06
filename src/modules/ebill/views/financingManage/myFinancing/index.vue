<template>
  <div>
    <zj-content-container>
      <!--  我的融资  -->
          <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
            <zj-list-layout>
              <template slot="rightBtns">
                <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch">重置</vxe-button>
                <vxe-button class="search" icon="el-icon-search" @click="search">查询</vxe-button>
              </template>
              <template slot="leftBtns">
                <vxe-button class="export" icon="el-icon-download" @click="toExport" :api="zjBtn.exportMyFinancingList">导出</vxe-button>
              </template>
              <template slot="searchForm">
                <el-form ref="searchForm" :model="searchForm">
                  <el-form-item label="融资流水号：">
                    <el-input v-model="searchForm.tranSerialNoLike" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="融资开始日：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.applyDatetimeStart"
                      :endDate.sync="searchForm.applyDatetimeEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="融资到期日：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.expireDateStart"
                      :endDate.sync="searchForm.expireDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="融资金额：">
                    <zj-amount-range :startAmt.sync="searchForm.applyAmtStart" :endAmt.sync="searchForm.applyAmtEnd"></zj-amount-range>
                  </el-form-item>
                  <el-form-item label="还款状态：">
                    <el-select v-model="searchForm.repaymentFlag">
                      <el-option label="全部" value=""/>
                      <el-option
                        v-for="item in dictionary.workflowState"
                        :label="item.desc"
                        :value="item.code"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-form>
              </template>
              <zj-table ref="searchTable"
                        :api="zjControl.queryMyFinancingPage"
                        :params="searchForm"
              >
                <zj-table-column title="融资流水号">
                  <template v-slot="{row}">
                    <zj-button type="text" @click="toDetail(row)">{{row.serialNo}}</zj-button>
                  </template>
                </zj-table-column>
                <zj-table-column field="fromEntName" title="融资企业"/>
                <zj-table-column field="financingProductType" title="融资产品名称" :formatter="obj=>typeMap(dictionary.financingProductType,obj.cellValue)"/>
                <zj-table-column field="createDatetime" title="融资申请日期" :formatter="date"/>
                <zj-table-column field="tranAmt" title="融资金额" :formatter="money"/>
                <zj-table-column field="interestRate" title="融资月利率" :formatter="rate"/>
                <zj-table-column field="applyDatetime" title="融资开始日" :formatter="date"/>
                <zj-table-column field="expireDate" title="融资到期日" :formatter="date"/>
                <zj-table-column field="repaymentPrincipalAmt" title="已还款本金" :formatter="money"/>
                <zj-table-column field="repaymentInterestAmt" title="已还款利息" :formatter="money"/>
                <zj-table-column field="lastRepayDate" title="上次还款日期" :formatter="date"/>
                <zj-table-column field="repaymentflag" title="还款状态" :formatter="obj=>typeMap(dictionary.workflowState,obj.cellValue)"/>
              </zj-table>
            </zj-list-layout>
          </div>
    </zj-content-container>
  </div>
</template>
<script>

export default {
  name: 'myFinancing',
  data() {
    return {
      zjControl: {
        exportMyFinancingList:this.$api.myFinancing.exportMyFinancingList,//我的融资-导出
        getMyFinancingDetail:this.$api.myFinancing.getMyFinancingDetail,//我的融资-详情
        getMyFinancingDirectory:this.$api.myFinancing.getMyFinancingDirectory,//我的融资-获取数据字典
        queryMyFinancingPage:this.$api.myFinancing.queryMyFinancingPage,//我的融资-查询
      },
      searchForm: {
        tranSerialNoLike: '',
        applyDatetimeStart: '',
        applyDatetimeEnd: '',
        expireDateStart: '',
        expireDateEnd: '',
        applyAmtStart: '',
        applyAmtEnd: '',
        repaymentFlag: '',
      },
      dictionary: {},
    };
  },
  methods: {
    getDic() {
      this.zjControl.getMyFinancingDirectory().then(res=>{
        this.dictionary = res.data
      })
    },
    toDetail (row) {
      this.goChild('productInfoManageDetail', row)
    },
    toExport() {
      this.zjControl.exportMyFinancingList(this.searchForm)
    },
  },
  created() {
    this.getApi()
    this.getDic()
  }
};
</script>
