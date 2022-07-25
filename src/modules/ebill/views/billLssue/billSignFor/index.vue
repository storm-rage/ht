<template>
  <div>
    <zj-content-container>
      <!--  凭证签收  -->
          <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
            <zj-list-layout>
              <template slot="searchForm">
                <el-form ref="searchForm" :model="searchForm">
                  <el-form-item label="凭证开立/转让日期：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.voucherDateStart"
                      :endDate.sync="searchForm.voucherDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="签发人/转让方：">
                    <el-input v-model="searchForm.voucherCode" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="凭证金额：">
                    <zj-amount-range :startAmt.sync="searchForm.ebillAmtStart" :endAmt.sync="searchForm.ebillAmtEnd"></zj-amount-range>
                  </el-form-item>
                  <el-form-item label="签收类型：">
                    <el-select v-model="searchForm.signType">
                      <el-option label="全部"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </template>
              <zj-table ref="searchTable" :dataList="list" >
                <zj-table-column field="field1" title="凭证编号"/>
                <zj-table-column field="field3" title="签发人/转让方"/>
                <zj-table-column field="field3" title="签收类型" />
                <zj-table-column field="field4" title="凭证金额" :formatter="money"/>
                <zj-table-column field="field5" title="凭证到期日" :formatter="date"/>
                <zj-table-column field="field5" title="凭证开立/转让日期" :formatter="date"/>
                <zj-table-column field="field5" title="操作">
                  <template v-slot="{row}">
                    <zj-button type="text" @click="signFor(row)">签收</zj-button>
                    <zj-button type="text" @click="refuseSignFor(row)">拒签</zj-button>
                  </template>
                </zj-table-column>
              </zj-table>
            </zj-list-layout>
          </div>
    </zj-content-container>
    <reject-dialog ref="rejectDialog"/>
  </div>
</template>
<script>
import rejectDialog from './components/rejectDialog'

export default {
  components: {
    rejectDialog,
  },
  data() {
    return {
      searchEntForm: {
        entState: '',
      },
      searchForm: {
        supplierName: '',
        businessType: '',
        productType: '',
        productNo: '',
        productState: '',
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
      tradeList: []
    };
  },
  methods: {
    //凭证签发人/转让企业改变事件
    entChange(){

    },
    toContractSign(row) {
      console.log(row);
    },
    handleRadioChange({row}) {
      this.tradeList.push({
        field1: '佛山市a有限公司',
        field2: '是',
        field3: '756756756767',
        field4: '非保理',
        field5: '12',
        field6: '1000',
        field7: '2000',
        field8: '正常'
      })
    },
    toDetail (row) {
      this.goChild('productInfoManageDetail', row)
    },
    signFor (row) {
      this.goChild('voucherSignForDetail', row)
    },
    refuseSignFor(row) {
      this.$refs.rejectDialog.open({form: this.form}, true)
    },
  }
};
</script>
