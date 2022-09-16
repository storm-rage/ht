<template>
  <zj-content-container>
    <!--  转让交易详情  -->
    <zj-top-header title="转让交易详情" />
    <zj-content-block>
      <zj-header title="交易信息" />
      <el-form ref="form" label-width="200px" class="zj-m-t-20">
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请流水号：">{{detail.serialNo}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请状态：">{{detail.workflowState}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拒绝原因：">{{detail.rejectReason}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="转让凭证总数：">{{detail.tranNumber}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="转让总金额：">{{detail.tranAmt ? `${detail.tranAmt}元` : ''}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </zj-content-block>
    <el-row>
      <zj-header title="电子债权凭证信息" />
      <zj-table ref="searchTable" class="zj-search-table" :api="zjControl.queryBillRecordPage">
        <zj-table-column field="rootCode" :title="`原始${productName}编号`" />
        <zj-table-column field="ebillCode" :title="`${productName}编号`" />
        <zj-table-column field="payEntName" title="签发人" />
        <zj-table-column field="receiptEntName" title="原始持有人" />
        <zj-table-column field="payableIssuanceDate" :title="`${productName}签发日`" :formatter="date" />
        <zj-table-column field="payableExpireDate" :title="`${productName}到期日`" :formatter="date" />
        <zj-table-column field="transferName" title="转让企业" />
        <zj-table-column field="ebillAmt" :title="`${productName}金额`" :formatter="money" />
        <zj-table-column field="holderDate" title="凭证签收日" :formatter="date" />
      </zj-table>
    </el-row>
    <el-row>
      <zj-header title="转让信息" />
      <zj-table ref="searchTable" class="zj-search-table" :dataList="detail.transferInfos" :pager="false">
        <zj-table-column field="ebillCode" :title="`${productName}编号`" />
        <zj-table-column field="receiptEntName" title="被转让人名称" />
        <zj-table-column field="tranAmt" title="转让金额" />
        <zj-table-column field="receiptAcctNo" title="收款账号" />
        <zj-table-column field="receiptAcctName" title="收款账户户名" />
        <zj-table-column field="receiptBankNo" title="收款银行联行号" />
        <zj-table-column field="receiptBankName" title="收款账户开户行" />
        <zj-table-column field="remark" title="备注" />
        <zj-table-column field="checkResult" title="处理结果" />
        <zj-table-column field="rejectReson" title="失败原因" />
      </zj-table>
    </el-row>
    <el-row style="position: relative;margin-top: 20px;">
      <zj-content-footer>
        <zj-button class="submit-button" @click="goParent">返回</zj-button>
      </zj-content-footer>
    </el-row>
  </zj-content-container>
</template>

<script>

export default {
  name: "detail",
  data() {
    return {
       zjControl: this.$api.billAssignReview,
      detail: {},
    }
  },
  computed: {
    productName() {
      return this.$store.getters['user/productName']
    },
  },
  methods: {
    getDetail() {
      let params = {
        id: this.row.id,
      }
      this.zjControl.getBillTransferDetail(params).then(res => {
        this.detail = res.data
      })
    },
  },
  created() {
    this.getApi()
    this.getRow()
    this.getDetail()
  },
}
</script>

<style scoped lang="less">
</style>
