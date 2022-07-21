<template>
  <div>
    <zj-content-container>
      <!--  融资交易查询  -->
          <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
            <zj-list-layout>
              <template slot="leftBtns">
                <vxe-button class="export" icon="el-icon-download" @click="toExport" :api="zjBtn.exportStatementAccountBill">导出</vxe-button>
              </template>
              <template slot="searchForm">
                <el-form ref="searchForm" :model="searchForm">
                  <el-form-item label="融资流水号：">
                    <el-input v-model.trim="searchForm.acctBillCode" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="融资企业名称：">
                    <el-input v-model.trim="searchForm.companyName" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="融资申请日期：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.checkBillDateStart"
                      :endDate.sync="searchForm.checkBillDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="融资申请金额：">
                    <zj-amount-range :startAmt.sync="searchForm.ebillAmtStart" :endAmt.sync="searchForm.ebillAmtEnd"></zj-amount-range>
                  </el-form-item>
                  <el-form-item label="融资申请状态：">
                    <el-select v-model="searchForm.checkBillStatus"
                               placeholder="请选择"
                               filterable
                               :popper-append-to-body="false"
                    >
                      <el-option label="全部" value=""></el-option>
                      <el-option
                        v-for="item in dictionary.checkBillStatus"
                        :key="item.code"
                        :label="item.desc"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </template>
              <zj-table ref="searchTable" :params="searchForm" :api="zjControl.queryStatementSrmAccountBillPage">
                <zj-table-column title="融资流水号">
                  <template v-slot="{row}">
                    <zj-button type="text" @click="goChild('queryAccountBillDetail',row.acctBillCode)">{{row.acctBillCode}}</zj-button>
                  </template>
                </zj-table-column>
                <zj-table-column field="companyName" title="融资企业名称"/>
                <zj-table-column field="supplierCode" title="融资产品名称"/>
                <zj-table-column field="supplierName" title="融资开始日"/>
                <zj-table-column field="checkBillDate" title="融资到期日" :formatter="date"/>
                <zj-table-column field="estimatedPaymentDate" title="融资申请金额" :formatter="date"/>
                <zj-table-column field="checkBillAmt" title="融资申请时间" :formatter="obj=>typeMap(dictionary.checkBillStatus, obj.cellValue)"/>
                <zj-table-column field="isApplyVoucher" title="是否申请开立债权凭证" :formatter="obj=>typeMap(dictionary.isApplyVoucher, obj.cellValue)"/>
                <zj-table-column field="billSource" title="融资申请状态" :formatter="money"/>
              </zj-table>
            </zj-list-layout>
          </div>
    </zj-content-container>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      zjControl: {
        // exportStatementAccountBill:this.$api.billSearch.exportStatementAccountBill,//对账单查询-导出
        // getDirectory:this.$api.billSearch.getDirectory,//数据字典
        // queryStatementSrmAccountBillPage:this.$api.billSearch.queryStatementSrmAccountBillPage,//查询
      },
      searchForm: {
        acctBillCode: '',
        companyName: '',
        supplierName: '',
        checkBillDateStart: '',
        checkBillDateEnd: '',
        estimatedPaymentDateStart: '',
        estimatedPaymentDateEnd: '',
        isApplyVoucher: '',
        checkBillStatus: '',
        billSource: '',
        isSettle: '',
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
      dictionary:{},
    };
  },
  methods: {
    getDictionary() {
      this.zjControl.getDirectory().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
    toExport() {
      this.zjControl.exportStatementAccountBill()
    },
  },
  created() {
    this.getApi()
    this.getDictionary()
  }
};
</script>
