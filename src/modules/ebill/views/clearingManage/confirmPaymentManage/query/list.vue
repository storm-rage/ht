<template>
  <div>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="资金流水号：">
            <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="收款日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>
          <el-form-item label="收款金额：">
            <zj-amount-range :startAmt.sync="searchForm.ebillAmtStart" :endAmt.sync="searchForm.ebillAmtEnd"></zj-amount-range>
          </el-form-item>
          <el-form-item label="付款方名称：">
            <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="业务系统单号：">
            <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="供应商简称：">
            <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
          </el-form-item>
        </el-form>
      </template>
      <zj-table ref="searchTable" :dataList="list" :params="searchForm" :api="zjControl.tableApi" @radio-change="handleRadioChange" :radio-config="{highlight: true}">
        <zj-table-column type="radio" width="40px" fixed="left"></zj-table-column>
        <zj-table-column field="field1" title="资金流水号" />
        <zj-table-column field="field2" title="付款方名称" />
        <zj-table-column field="field3" title="收款金额" :formatter="money"/>
        <zj-table-column field="field4" title="收款时间"/>
        <zj-table-column field="field5" title="收款方名称"/>
        <zj-table-column field="field6" title="收款账号"/>
        <zj-table-column field="field7" title="业务系统单号"/>
        <zj-table-column field="field8" title="已关联金额" :formatter="money"/>
        <zj-table-column field="field9" title="供应商简称"/>
      </zj-table>
    </zj-list-layout>
    <zj-content-block>
      <zj-header title="确认收款"></zj-header>
      <zj-content-tip style="display: block;width: 100%;">
        <div class="zj-m-l-20">
          <p>凭证收款：确认核心企业对开了凭证的对账单的付款，支持修改凭证金额和凭证到期日。</p>
          <p>非凭证收款：订单保理供应商确认收款，收款资金用于归还供应商融资或代理清算给供应商。</p>
        </div>
      </zj-content-tip>
      <zj-content>
        <zj-tabs v-model="activeComp">
          <el-tab-pane :label="item.label" v-for="(item,index) in tabsList" :key="`${index}b`" :name="item.name" >
            <component :is="activeComp" v-if="item.name === activeComp"></component>
          </el-tab-pane>
        </zj-tabs>
      </zj-content>
    </zj-content-block>
  </div>
</template>
<script>
import BillPaymentList from './tabs/billPaymentList';
import OtherPaymentList from './tabs/otherPaymentList';
export default {
  components: {
    billPayment: BillPaymentList,
    otherPayment: OtherPaymentList
  },

  data() {
    return {
      zjControl: {},
      searchForm:{
        issueEntName: '',
        expireDateStart: '',
        expireDateEnd: '',
        ebillAmtStart: '',
        ebillAmtEnd: '',
        ebillCode:'',
        issueDateStart: '',
        issueDateEnd: '',
      },
      list: [
        {
          field1: '555544565',
          field2: '发顺丰到付',
          field3: '10000',
          field4: '2022-09-10',
          field5: '国内商业保理合同',
          field6: '62343434324',
          field7: 'X4565464565',
          field8: '20000',
          field9: '生效'
        }
      ],
      tabsList: [
        {
          label: '凭证收款',
          name: 'billPayment'
        },
        {
          label: '非凭证收款',
          name: 'otherPayment'
        }
      ],
      activeComp: 'billPayment'
    }
  },
  created() {
    // this.getApi()
  },
  methods: {
    handleRadioChange({ row }) {

    },
    batchSubmitApply () {},
    toViewDetail() {
      this.$router.push({name: 'factoringContractDetail'});
    }
  }
}
</script>
