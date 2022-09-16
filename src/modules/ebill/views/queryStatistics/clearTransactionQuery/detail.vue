<template>
  <div>
    <zj-content-container>
      <!--  凭证尾款清算交易详情  -->
      <zj-top-header :title="detailTitle"></zj-top-header>
      <biz-apply-info :biz-info="form.tranInfo"></biz-apply-info>
      <div>
        <bill-clearing-info v-if="row.clearType==='00'" :base-info="form.basicInfo" :bill-list="form.waitClearInfoList"></bill-clearing-info>
        <bill-balance-clearing-info v-if="row.clearType==='01'" :base-info="form.basicInfo" :bill-list="form.waitClearInfoList"></bill-balance-clearing-info>
        <order-clearing-info v-if="row.clearType==='02'" :base-info="form.basicInfo" :bill-list="form.waitClearInfoList"></order-clearing-info>
        <order-balance-clearing-info v-if="row.clearType==='03'" :base-info="form.basicInfo" :bill-list="form.waitClearInfoList"></order-balance-clearing-info>
        <!-- 附件信息   -->
        <clearing-file-info :is-edit="false"
                            :attach-list="form.attachInfoList"
                            :isShowDesc="false"></clearing-file-info>
      </div>
      <!--操作记录 -->
      <operate-log :logList="form.oprateRecordList"></operate-log>
    </zj-content-container>
    <zj-content-footer>
      <zj-button class="submit-button" @click="goParent">返回</zj-button>
    </zj-content-footer>
  </div>
</template>

<script>
import operateLog from './components/operateLog';
import bizApplyInfo from "./components/bizApplyInfo";
import clearingFileInfo from "@modules/ebill/views/clearingManage/components/clearingFileInfo";
import billClearingInfo from "@modules/ebill/views/clearingManage/expireClearingManage/billClearing/billApply/bizInfo.vue";
import billBalanceClearingInfo from "@modules/ebill/views/clearingManage/expireClearingManage/billClearing/billBalanceApply/bizInfo.vue";
import orderBalanceClearingInfo from "@modules/ebill/views/clearingManage/expireClearingManage/orderClearing/orderAdvanceApply/bizInfo.vue";
import orderClearingInfo from "@modules/ebill/views/clearingManage/expireClearingManage/orderClearing/orderApply/bizInfo.vue";
export default {
  components: {
    operateLog,
    bizApplyInfo,
    clearingFileInfo,
    billClearingInfo,
    billBalanceClearingInfo,
    orderClearingInfo,
    orderBalanceClearingInfo
  },
  computed: {
    detailTitle() {
      const titleMap = {
        '00': '凭证清算交易详情',
        '01': '凭证尾款清算交易详情',
        '02': '订单清算交易详情',
        '03': '订单尾款清算交易详情'
      }
      return titleMap[this.row.clearType]
    }
  },
  data() {
    return {
      zjControl: {
        getExpireClearDetail:this.$api.clearTransactionQuery.getExpireClearDetail
      },
      form:{
        tranInfo: {},
        basicInfo: {},
        waitClearInfoList: [],
        financeInfo: {},
        attachInfoList: [],
        oprateRecordList: [],
      }
    }
  },
  methods: {
    getExpireClearDetail() {
      let params = {
        serialNo : this.row.serialNo,
      }
      this.zjControl.getExpireClearDetail(params).then(res => {
        this.form = res.data
      })
    }
  },
  created() {
    this.getApi()
    this.getRow()
    this.getExpireClearDetail()
  },
}
</script>
