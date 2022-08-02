<template>
    <zj-content-container>
      <!--  电子债权凭证资详情  -->
      <zj-top-header :title="titleInfo"></zj-top-header>
<!--      <h3 class="zj-center" v-if="workflow === 'pzxx'">融单编号：{{}}</h3>-->
      <zj-content-block v-if="workflow === 'pzxx'">
        <bill-detail :dataForm="form"/>
      </zj-content-block>

      <zj-content-block v-if="workflow === 'mybj'">
        <zj-content-block>
          <zj-header title="凭证信息"/>
          <zj-table ref="searchTable" class="zj-search-table" :dataList="form.billInfo"
          >
            <zj-table-column field="ebillCode" title="凭证编号" />
            <zj-table-column field="voucherNo" title="原始凭证编号" />
            <zj-table-column field="voucherSigner" title="凭证签发人" />
            <zj-table-column field="entName" title="转让企业" />
            <zj-table-column field="openDate" title="签发日期" :formatter="date"/>
            <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money"/>
            <zj-table-column field="expireDate" title="凭证到期日" :formatter="date"/>
          </zj-table>
        </zj-content-block>
        <zj-content-block>
          <zj-header :title="`对账单信息-${row.ebillCode}`"/>
          <zj-table ref="searchTable" :dataList="form.accountBillInner" >
            <zj-table-column field="acctBillCode" title="对账单编号"/>
            <zj-table-column field="companyName" title="买方名称"/>
            <zj-table-column field="supplierCode" title="供应商编码"/>
            <zj-table-column field="supplierName" title="供应商名称"/>
            <zj-table-column field="isApplyVoucher" title="是否申请开立债权凭证" :formatter="(obj)=>typeMap(dictionary,obj.cellValue)"/>
            <zj-table-column field="checkBillDate" title="对账日期" :formatter="date"/>
            <zj-table-column field="inputDate" title="入库日期/放行日期" :formatter="date"/>
            <zj-table-column field="estimatedPaymentDate" title="预计付款日期" :formatter="date"/>
            <zj-table-column field="checkBillAmt" title="对账单金额" :formatter="money"/>
            <zj-table-column field="billSource" title="对账单来源" />
          </zj-table>
        </zj-content-block>
        <zj-content-block>
          <zj-header :title="`对账单明细-${form}`"/>
          <zj-table ref="searchTable" :dataList="form.accountBillDetailInner">
            <zj-table-column field="field2" title="对账单名称"/>
            <zj-table-column field="field3" title="买方名称"/>
            <zj-table-column field="field5" title="供应商业务系统编码"/>
            <zj-table-column field="field5" title="供应商名称"/>
            <zj-table-column field="field5" title="对账日期" :formatter="date"/>
            <zj-table-column field="field5" title="入库日期" :formatter="date"/>
            <zj-table-column field="field5" title="预计付款日期" :formatter="date"/>
            <zj-table-column field="field5" title="对账单金额" :formatter="money"/>
            <zj-table-column field="field5" title="是否申请开立债权凭证" :formatter="(obj)=>typeMap(dictionary,obj.cellValue)"/>
            <zj-table-column field="field5" title="对账人" />
            <zj-table-column field="field5" title="对账单来源" />
          </zj-table>
        </zj-content-block>
        <zj-content-block>
          <zj-header :title="`贸易背景资料（对账单编号：${form}）`"/>
          <el-tabs v-model="tabs" type="card" class="zj-tabs-card">
            <el-tab-pane label="贸易合同信息" name="tradeContract" >
              <trade-contract :zjControl="zjControl" :uDictionary="uDictionary" :uBtn="zjBtn" />
            </el-tab-pane>
            <el-tab-pane label="发票信息" name="invoice" >
              <invoice />
            </el-tab-pane>
            <el-tab-pane label="其他附件" name="attaList" >
              <attaList />
            </el-tab-pane>
          </el-tabs>
        </zj-content-block>
      </zj-content-block>

      <zj-content-block v-if="workflow === 'lzgj'">
        <!--    流转轨迹    -->
        <locus/>
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
  data() {
    return {
      form:{},
      tabs:'tradeContract',
      zjControl: {
        getHoldBillDetail:this.$api.billLssueMyBill.getHoldBillDetail,//我的凭证-详情
        getHoldBillDetailTrace:this.$api.billLssueMyBill.getHoldBillDetailTrace,//凭证详情-凭证轨迹
        getHoldBillDetailTrade:this.$api.billLssueMyBill.getHoldBillDetailTrade,//凭证详情-贸易背景
      },
      uDictionary:{},
      mDictionary:{},
      workflow: 'pzxx',
      workflowList: [
        { label: '凭证详情', value: 'pzxx' }, { label: '贸易背景', value: 'mybj' }, { label: '流转轨迹', value: 'lzgj' },
      ],
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
        })
      }
      if(this.workflow === 'lzgj') {
        this.zjControl.getHoldBillDetailTrace(params).then(res => {
          this.form = res.data
        })
      }


    },
    attaDownLoad() {},
    submit(){
      this.$refs.submitDialog.open({form: this.form}, true)
    },
  },
  created() {
    this.getApi()
    this.getRow()
    this.getHoldBillDetail()
  }
}
</script>

<style scoped lang="less">

</style>
