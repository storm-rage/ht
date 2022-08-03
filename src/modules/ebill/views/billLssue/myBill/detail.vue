<template>
    <zj-content-container>
      <!--  电子债权凭证资详情  -->
      <zj-top-header :title="titleInfo"></zj-top-header>
      <zj-content-block v-if="workflow === 'pzxx'">
        <bill-detail :dataForm="form" :ebillCode="row.ebillCode"/>
      </zj-content-block>

      <zj-content-block v-if="workflow === 'mybj'">
        <zj-content-block>
          <zj-header title="凭证信息"/>
          <zj-table ref="searchTable" class="zj-search-table" :dataList="form.billInfo" :pager="false"
          >
            <zj-table-column field="ebillCode" title="凭证编号" />
            <zj-table-column field="writerName" title="凭证签发人" />
            <zj-table-column field="holderName" title="原始持有人" />
            <zj-table-column field="holderDate" title="签发日期" :formatter="date"/>
            <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money"/>
            <zj-table-column field="availableAmt" title="剩余可用金额" :formatter="money"/>
            <zj-table-column field="expireDate" title="到期日期" :formatter="date"/>
            <zj-table-column field="state" title="凭证状态" :formatter="obj=>typeMap(dictionary.state,obj.cellValue)"/>
          </zj-table>
        </zj-content-block>
        <zj-content-block>
          <zj-header :title="`对账单信息-${row.ebillCode}`"/>
          <zj-table ref="searchTable" :dataList="form.accountBillInner" :pager="false"
          >
            <zj-table-column field="acctBillCode" title="对账单编号"/>
            <zj-table-column field="companyName" title="买方名称"/>
            <zj-table-column field="supplierCode" title="供应商编码"/>
            <zj-table-column field="supplierName" title="供应商名称"/>
            <zj-table-column field="isApplyVoucher" title="是否申请开立债权凭证" :formatter="date"/>
            <zj-table-column field="checkBillDate" title="对账日期" :formatter="date"/>
            <zj-table-column field="inputDate" title="入库日期/放行日期" :formatter="date"/>
            <zj-table-column field="estimatedPaymentDate" title="预计付款日期" :formatter="date"/>
            <zj-table-column field="checkBillAmt" title="对账单金额" :formatter="money"/>
            <zj-table-column field="billSource" title="对账单来源" />
          </zj-table>
        </zj-content-block>
        <zj-content-block>
          <zj-header :title="`对账单明细-${form.accountBillDetailInner[0].acctBillCode}`"/>
          <zj-table ref="searchTable" :dataList="form.accountBillDetailInner">
            <zj-table-column field="poNo" title="po单号"/>
            <zj-table-column field="dnNo" title="dn单号"/>
            <zj-table-column field="matterCode" title="物料编码"/>
            <zj-table-column field="matterName" title="物料名称"/>
            <zj-table-column field="unit" title="单位"/>
            <zj-table-column field="inputDate" title="入库日期" :formatter="date"/>
            <zj-table-column field="storeHouse" title="仓库"/>
            <zj-table-column field="inputNumber" title="入库数量"/>
            <zj-table-column field="returnDate" title="退货数量"/>
            <zj-table-column field="level" title="等级"/>
            <zj-table-column field="orderPrice" title="订单单价" :formatter="money"/>
            <zj-table-column field="convertPrice" title="折价" :formatter="money"/>
            <zj-table-column field="settleAccountPrice" title="结算单价" :formatter="money"/>
            <zj-table-column field="taxRate" title="税率%" :formatter="rate"/>
            <zj-table-column field="netAmount" title="净额" :formatter="money"/>
            <zj-table-column field="taxAmount" title="税额" :formatter="money"/>
            <zj-table-column field="totalAmount" title="总计金额" :formatter="money"/>
          </zj-table>
        </zj-content-block>
        <zj-content-block>
          <zj-header :title="`贸易背景资料（对账单编号：${form.accountBillDetailInner[0].acctBillCode}）`"/>
          <el-tabs v-model="tabs" type="card" class="zj-tabs-card">
            <el-tab-pane label="贸易合同信息" name="tradeContract" >
              <trade-contract :zjControl="zjControl" :form="form.contractInfo"/>
            </el-tab-pane>
            <el-tab-pane label="发票信息" name="invoice" >
              <invoice :invoiceList="form.invoices"/>
            </el-tab-pane>
            <el-tab-pane label="其他附件" name="attaList" >
              <attaList :attaList="form.otherAttachs"/>
            </el-tab-pane>
          </el-tabs>
        </zj-content-block>
      </zj-content-block>

      <zj-content-block v-if="workflow === 'lzgj'">
        <!--    流转轨迹    -->
        <locus :dataTraceTree="form"/>
      </zj-content-block>

      <!-- 底部工作流状态 -->
      <zj-workflow v-model="workflow" :list="workflowList">
        <!-- 审核时 -->
        <el-row slot="right">
          <el-row class="btn-w85 zj-center">
            <zj-button class="back" @click="goParent">返回</zj-button>
          </el-row>
        </el-row>
      </zj-workflow>

    </zj-content-container>
</template>

<script>
import billDetail from './components/billDetail'
import locus from './components/locus'

import tradeContract from '../../queryStatistics/financingTransactionQuery/tradeBackgroundInfo/tradeContract'
import invoice from '../../queryStatistics/financingTransactionQuery/tradeBackgroundInfo/invoice'
import attaList from '../../queryStatistics/financingTransactionQuery/tradeBackgroundInfo/attaList'
export default {
  name: "billLssueMyBillDetail",
  components: {
    billDetail,
    locus,
    tradeContract,
    invoice,
    attaList,
  },
  computed: {
    titleInfo() {
      return this.workflow === 'lzgj'?'电子凭证流转轨迹':this.workflow === 'pzxx'||'mybj'?'电子债权凭证详情':''
    }
  },
  watch: {
    workflow() {
      this.getHoldBillDetail()
    }
  },
  data() {
    return {
      form:{},
      tabs:'tradeContract',
      zjControl: {
        getHoldBillDetail:this.$api.billLssueMyBill.getHoldBillDetail,//我的凭证-详情
        getHoldBillDetailTrace:this.$api.billLssueMyBill.getHoldBillDetailTrace,//凭证详情-凭证轨迹
        getHoldBillDetailTrade:this.$api.billLssueMyBill.getHoldBillDetailTrade,//凭证详情-贸易背景
        getMyEbBillDictionary:this.$api.billLssueMyBill.getMyEbBillDictionary,//获取数据字典
      },
      workflow: 'pzxx',
      workflowList: [
        { label: '凭证详情', value: 'pzxx' }, { label: '贸易背景', value: 'mybj' }, { label: '流转轨迹', value: 'lzgj' },
      ],
      dictionary: {},
    }
  },
  methods: {
    //获取凭证详情
    getHoldBillDetail() {
      let params = {
        ebillCode : this.row.ebillCode || '',
      }
      if(this.workflow === 'pzxx') {
        this.zjControl.getHoldBillDetail(params).then(res => {
          this.form = res.data.billInfo
        })
      }
      if(this.workflow === 'mybj') {
        this.zjControl.getHoldBillDetailTrade(params).then(res => {
          this.form = res.data
          this.form.billInfo = [{...res.data.billInfo}]
          this.form.accountBillInner = [{...res.data.accountBillInner}]
          this.form.accountBillDetailInner = [{...res.data.accountBillDetailInner}]
        })
      }
      if(this.workflow === 'lzgj') {
        this.zjControl.getHoldBillDetailTrace(params).then(res => {
          this.form = res.data.traces
        })
      }
    },
    //获取数据字典
    getMyEbBillDictionary(){
      this.zjControl.getMyEbBillDictionary().then(res=>{
        this.dictionary = res.data
      })
    },
    submit(){
      this.$refs.submitDialog.open({form: this.form}, true)
    },
  },
  created() {
    this.getApi()
    this.getRow()
    this.getMyEbBillDictionary()
    this.getHoldBillDetail()
  }
}
</script>

<style scoped lang="less">

</style>
