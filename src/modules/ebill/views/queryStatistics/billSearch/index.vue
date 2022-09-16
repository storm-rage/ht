<template>
  <div>
    <zj-content-container>
      <!--  对账单查询  -->
          <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
            <zj-list-layout>
              <template slot="leftBtns">
                <vxe-button class="export" icon="el-icon-download" @click="toExport" :api="zjBtn.exportStatementAccountBill">导出</vxe-button>
              </template>
              <template slot="searchForm">
                <el-form ref="searchForm" :model="searchForm">
                  <el-form-item label="对账单编号：">
                    <el-input v-model.trim="searchForm.acctBillCode" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="买方名称：">
                    <el-input v-model.trim="searchForm.companyName" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="供应商名称：">
                    <el-input v-model.trim="searchForm.supplierName" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="对账日期：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.checkBillDateStart"
                      :endDate.sync="searchForm.checkBillDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="预计付款日期：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.estimatedPaymentDateStart"
                      :endDate.sync="searchForm.estimatedPaymentDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="是否申请开立债权凭证：">
                    <el-select v-model="searchForm.isApplyVoucher"
                               placeholder="请选择"
                               filterable
                               :popper-append-to-body="false">
                      <el-option label="全部" value=""></el-option>
                      <el-option
                        v-for="item in dictionary.isApplyVoucher"
                        :key="item.code"
                        :label="item.desc"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="对账单状态：">
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
                  <el-form-item label="对账单来源：">
                    <el-select v-model="searchForm.billSource"
                               placeholder="请选择"
                               filterable
                               :popper-append-to-body="false"
                    >
                      <el-option label="全部" value=""></el-option>
                      <el-option
                        v-for="item in dictionary.billSource"
                        :key="item.code"
                        :label="item.desc"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="对账单是否已结算：">
                    <el-select v-model="searchForm.isSettle"
                               placeholder="请选择"
                               filterable
                               :popper-append-to-body="false"
                    >
                      <el-option label="全部" value=""></el-option>
                      <el-option
                        v-for="item in dictionary.isSettle"
                        :key="item.code"
                        :label="item.desc"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </template>
              <zj-table ref="searchTable" :params="searchForm" :api="zjControl.queryStatementSrmAccountBillPage">
                <zj-table-column title="对账单编号">
                  <template v-slot="{row}">
                    <zj-button type="text" @click="goChild('queryAccountBillDetail',row)">{{row.acctBillCode}}</zj-button>
                  </template>
                </zj-table-column>
                <zj-table-column field="companyName" title="买方名称"/>
                <zj-table-column field="supplierCode" title="供应商业务系统编码"/>
                <zj-table-column field="supplierName" title="供应商名称"/>
                <zj-table-column field="checkBillDate" title="对账日期" :formatter="date"/>
                <zj-table-column title="入库日期/放行日期" width="160">
                  <template v-slot="{row}">
                    <div v-if="row.earliestInputOrPassDate || row.latestInputOrPassDate">
                      {{date(row.earliestInputOrPassDate)}}{{row.latestInputOrPassDate?`~${date(row.latestInputOrPassDate)}`:''}}
                    </div>
                    <div v-else>—</div>
                  </template>
                </zj-table-column>
                <zj-table-column field="estimatedPaymentDate" title="预计付款日期" :formatter="date"/>
                <zj-table-column field="checkBillAmt" title="对账单金额" :formatter="money"/>
                <zj-table-column field="isApplyVoucher" title="是否申请开立债权凭证">
                  <template v-slot="{row}">{{formatterCellVal(typeMap(dictionary.isApplyVoucher, row.cellValue))}}</template>
                </zj-table-column>
                <zj-table-column field="billSource" title="对账单来源" :formatter="formatterCellVal"/>
                <zj-table-column field="checkBillStatus" title="对账单状态">
                  <template v-slot="{row}">{{formatterCellVal(typeMap(dictionary.checkBillStatus, row.cellValue))}}</template>
                </zj-table-column>
                <zj-table-column field="isSettle" title="对账单是否已结算">
                  <template v-slot="{row}">{{formatterCellVal(typeMap(dictionary.isSettle, row.cellValue))}}</template>
                </zj-table-column>
                <zj-table-column field="outOrederNo" title="业务系统单号" :formatter="formatterCellVal"/>
                <zj-table-column field="isBusPush" title="开立凭证状态是否已推送业务系统">
                  <template v-slot="{row}">{{formatterCellVal(typeMap(dictionary.isBusPush, row.cellValue))}}</template>
                </zj-table-column>
                <zj-table-column field="isHbkPush" title="开立凭证状态是否已推送海天银行">
                  <template v-slot="{row}">{{formatterCellVal(typeMap(dictionary.isHbkPush, row.cellValue))}}</template>
                </zj-table-column>
                <zj-table-column field="accountBillStatus" title="业务系统对账单结算系统状态">
                  <template v-slot="{row}">{{formatterCellVal(typeMap(dictionary.accountBillStatus, row.cellValue))}}</template>
                </zj-table-column>
                <zj-table-column field="isPay" title="对账单是否已支付">
                  <template v-slot="{row}">{{formatterCellVal(typeMap(dictionary.isPay, row.cellValue))}}</template>
                </zj-table-column>
              </zj-table>
            </zj-list-layout>
          </div>
    </zj-content-container>
  </div>
</template>
<script>
export default {
  name: "queryAccountBill",
  data() {
    return {
      zjControl: {
        exportStatementAccountBill:this.$api.billSearch.exportStatementAccountBill,//对账单查询-导出
        getDirectory:this.$api.billSearch.getDirectory,//数据字典
        queryStatementSrmAccountBillPage:this.$api.billSearch.queryStatementSrmAccountBillPage,//查询
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
