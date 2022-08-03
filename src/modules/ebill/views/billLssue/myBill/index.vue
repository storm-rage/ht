<template>
  <div>
    <zj-content-container>
      <!--  我的凭证  -->
          <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
            <zj-money-block
              img-name="hold-img"
              text="正常持有的电子债权凭证金额"
              tipsText="统计的是所有正常持有的电子债权凭证金额合计"
            />
            <zj-list-layout>
              <template slot="leftBtns">
                <vxe-button class="export" icon="el-icon-download" @click="toExport" :api="zjControl.exportHoldBillList">导出</vxe-button>
              </template>
              <template slot="rightBtns">
                <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch()">重置</vxe-button>
                <vxe-button class="search" icon="el-icon-search" @click="search(true,'searchTable')">查询</vxe-button>
              </template>
              <template slot="searchForm">
                <el-form ref="searchForm" :model="searchForm">
                  <el-form-item label="签发人：">
                    <el-input v-model="searchForm.writerNameLike" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="到期日期：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.expireDateStart"
                      :endDate.sync="searchForm.expireDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="凭证金额：">
                    <zj-amount-range :startAmt.sync="searchForm.ebillAmtStart" :endAmt.sync="searchForm.ebillAmtEnd"></zj-amount-range>
                  </el-form-item>
                  <el-form-item label="凭证编号：">
                    <el-input v-model="searchForm.ebillCode" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="签收日期：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.holderDateStart"
                      :endDate.sync="searchForm.holderDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                </el-form>
              </template>
              <zj-table ref="searchTable" :api="zjControl.queryHoldBillList" :params="searchForm">
                <zj-table-column title="债权凭证编号">
                  <template v-slot="{row}">
                    <zj-button type="text" @click="toDetail(row)">{{row.ebillCode}}</zj-button>
                  </template>
                </zj-table-column>
                <zj-table-column field="sourceCode" title="原始债权凭证编号"/>
                <zj-table-column field="writerName" title="签发人" />
                <zj-table-column field="holderName" title="当前持有人" />
                <zj-table-column field="ebillAmt" title="债权凭证金额" :formatter="money"/>
                <zj-table-column field="availableAmt" title="剩余可用金额" :formatter="money"/>
                <zj-table-column field="payableIssuanceDate" title="签发日期" :formatter="date"/>
                <zj-table-column field="holderDate" title="签收日期" :formatter="date"/>
                <zj-table-column field="expireDate" title="债权凭证到期日" :formatter="date"/>
                <zj-table-column field="state" title="凭证状态" :formatter="obj=>typeMap(dictionary.state,obj.cellValue)"/>
              </zj-table>
            </zj-list-layout>
          </div>
    </zj-content-container>
  </div>
</template>
<script>
import billLssueMyBill from "../../../api/billLssueMyBillApi";

export default {
  name:'billLssueMyBill',
  components: {},
  data() {
    return {
      zjControl: {
        queryHoldBillList:this.$api.billLssueMyBill.queryHoldBillList,//我的凭证-查询
        exportHoldBillList:this.$api.billLssueMyBill.exportHoldBillList,//我的凭证-导出
        getMyEbBillDictionary:this.$api.billLssueMyBill.getMyEbBillDictionary,//获取数据字典
      },
      searchForm: {
        writerNameLike: '',
        expireDateStart: '',
        expireDateEnd: '',
        ebillAmtStart: '',
        ebillAmtEnd: '',
        ebillCode: '',
        holderDateStart: '',
        holderDateEnd: '',
      },
    };
  },
  methods: {
    //获取数据字典
    getMyEbBillDictionary(){
      this.zjControl.getMyEbBillDictionary().then(res=>{
        this.dictionary = res.data
      })
    },
    toDetail(row) {
      this.goChild('billLssueMyBillDetail',row)
    },
    toExport() {
      this.zjControl.exportHoldBillList(this.searchForm)
    },

  },
  created() {
    this.getApi()
    this.getMyEbBillDictionary()
  }
};
</script>
