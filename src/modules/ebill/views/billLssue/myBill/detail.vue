<template>
    <zj-content-container>
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
        <locus :billTraceTree="form.billTraceTree"/>
      </zj-content-block>

      <!-- 底部工作流状态 -->
      <zj-workflow v-model="workflow" :list="workflowList">
        <!-- 审核时 -->
        <el-row slot="right">
          <el-row class="btn-w85 zj-center">
            <zj-button @click="back">返回</zj-button>
          </el-row>
        </el-row>
      </zj-workflow>

    </zj-content-container>
</template>

<script>
import billDetail from './components/billDetail'
import locus from './components/locus'
import tradeBackground from './components/tradeBackground'

/**
 * 公共凭证详情
 */
export default {
  name: "billLssueMyBillDetail",
  components: {
    billDetail,
    locus,
    tradeBackground,
  },
  computed: {
    productName() {
      return this.$store.getters['user/productName']
    },
    titleInfo() {
      return this.workflow === 'lzgj'?`${this.productName}流转轨迹`:this.workflow === 'pzxx'||'mybj'?`${this.productName}详情`:''
    },
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
    back() {
      if (this.row.parentRouteName) {
        this.goParent(this.row.parentRouteName)
      }else {
        this.goParent();
      }
    },
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
