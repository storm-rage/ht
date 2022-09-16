<template>
    <zj-content-container>

      <!-- 底部工作流状态 -->
      <zj-workflow v-model="workflow" :list="workflowList">
        <!-- 审核时 -->
        <el-row slot="right">
          <el-row class="btn-w85 zj-center">
            <zj-button class="back" @click="goParent">返回</zj-button>
          </el-row>
        </el-row>
      </zj-workflow>
      
      <!--  电子债权凭证详情  -->
      <zj-top-header :title="titleInfo"></zj-top-header>
      <zj-content-block v-if="workflow === 'pzxx'">
        <bill-detail :dataForm="form"/>
      </zj-content-block>

      <zj-content-block v-if="workflow === 'mybj'">
        <trade-background :dataForm="form" :dictionary="dictionary"/>
      </zj-content-block>

      <zj-content-block v-if="workflow === 'lzgj'">
        <!--    流转轨迹    -->
        <locus :dataTraceTree="form"/>
      </zj-content-block>

    </zj-content-container>
</template>

<script>
import billDetail from '../../billLssue/myBill/components/billDetail'
import locus from '../../billLssue/myBill/components/locus'
import tradeBackground from '../../billLssue/myBill/components/tradeBackground'
import voucherQuery from "../../../api/voucherQueryApi";

export default {
  name: "billLssueMyBillDetail",
  components: {
    billDetail,
    locus,
    tradeBackground,
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
        getElectronicClaimsBillDetail:this.$api.voucherQuery.getElectronicClaimsBillDetail,//电子债权凭证查询-凭证详情
        getElectronicClaimsBillDetailTrace:this.$api.voucherQuery.getElectronicClaimsBillDetailTrace,//电子债权凭证查询-凭证轨迹
        getElectronicClaimsBillDetailTrade:this.$api.voucherQuery.getElectronicClaimsBillDetailTrade,//电子债权凭证查询-贸易背景
        getElectronicClaimsBillDirectory:this.$api.voucherQuery.getElectronicClaimsBillDirectory,//电子债权凭证查询-数据字典
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
        this.zjControl.getElectronicClaimsBillDetail(params).then(res => {
          this.form = res.data.billInfo
        })
      }
      if(this.workflow === 'mybj') {
        this.zjControl.getElectronicClaimsBillDetailTrade(params).then(res => {
          this.form = res.data
          this.form.billInfo = [{...res.data.billInfo}]
          this.form.accountBillInner = [{...res.data.accountBillInner}]
          this.form.accountBillDetailInner = [{...res.data.accountBillDetailInner}]
        })
      }
      if(this.workflow === 'lzgj') {
        this.zjControl.getElectronicClaimsBillDetailTrace(params).then(res => {
          this.form = res.data.traces
        })
      }
    },
    //获取数据字典
    getMyEbBillDictionary(){
      this.zjControl.getElectronicClaimsBillDirectory().then(res=>{
        this.dictionary = res.data
      })
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
