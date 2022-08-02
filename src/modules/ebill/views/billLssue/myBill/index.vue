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
                <zj-table-column field="state" title="凭证状态" :formatter="obj=>typeMap(dictionary,obj.cellValue)"/>
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
        getHoldBillDetail:this.$api.billLssueMyBill.getHoldBillDetail,//我的凭证-详情
        getHoldBillDetailTrace:this.$api.billLssueMyBill.getHoldBillDetailTrace,//凭证详情-凭证轨迹
        getHoldBillDetailTrade:this.$api.billLssueMyBill.getHoldBillDetailTrade,//凭证详情-贸易背景
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
      list: [
        {
          field1: 'scm00001',
          field2: '某某产品一号',
          field3: '上游',
          field4: '订单保理',
          field5: '2022.09.08 11:18:19',
          field6: '生效',
          field7: '是'
        }
      ],
    };
  },
  methods: {
    //凭证签发人/转让企业改变事件
    entChange(){

    },
    toDetail(row) {
      this.goChild('billLssueMyBillDetail',row)
    },
    toExport() {
      this.zjControl.exportHoldBillList(this.searchForm)
    },

  }
};
</script>
