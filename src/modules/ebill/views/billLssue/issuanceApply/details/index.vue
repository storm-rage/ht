<template>
  <div id="transactionQueryDetails">
    <!-- <el-row class="ta-c mb-20">
      <label class="jc20">产品开通申请</label>
    </el-row> -->
    <ZjTopHeader>产品开通申请</ZjTopHeader>
    <!-- 折叠面板 -->
    <el-collapse
      ref="elCollapse"
      v-model="collActive"
      class="zjcoll-noSelect"
      v-loading="loading"
    >
      <!-- 对账单信息 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <!-- <template slot="title">
          <h4 class="orderTitle">对账单信息</h4>
        </template> -->
        <ZjHeader>对账单信息 </ZjHeader>
        <zj-table ref="searchTable" :dataList="rowList">
          <zj-table-column field="acctBillCode" title="对账单编号" />
          <zj-table-column field="companyName" title="买方名称" />
          <zj-table-column field="supplierCode" title="供应商编码" />
          <zj-table-column field="supplierName" title="供应商名称" />
          <zj-table-column
            field="checkBillDate"
            title="对账日期"
            :formatter="date"
          />
          <zj-table-column
            field="estimatedPaymentDate"
            title="预计付款日期"
            :formatter="date"
          />
          <zj-table-column
            field="checkBillAmt"
            title="对账单金额"
            :formatter="money"
          />
          <zj-table-column
            field="isIssueVoucher"
            title="是否申请开立债权凭证"
            width="100"
            :formatter="obj => ifOrNot(obj.cellValue)"
          />
          <zj-table-column field="billSource" title="对账单来源" />
        </zj-table>
      </el-collapse-item>

      <!-- 对账单明细 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <!-- <template slot="title">
          <h4 class="orderTitle">对账单明细</h4>
        </template> -->
        <ZjHeader>对账单明细</ZjHeader>
        <zj-table
          ref="searchTable"
          :params="searchForm"
          :dataList="accountDetailInfo"
        >
          <zj-table-column field="poNo" title="po合并号" />
          <zj-table-column field="dnNo" title="dn单号" />
          <zj-table-column field="matterCode" title="物料编码" />
          <zj-table-column field="matterName" title="物料名称" />
          <zj-table-column field="unit" title="单位" />
          <zj-table-column
            field="inputDate"
            title="入库日期"
            :formatter="date"
          />
          <zj-table-column field="storeHouse" title="仓库" />
          <zj-table-column field="inputNumber" title="入库数量" />
          <zj-table-column field="returnDate" title="退货数量" />
          <zj-table-column field="level" title="等级" />
          <zj-table-column field="orderPrice" title="订单单价" />
          <zj-table-column field="convertPrice" title="折价" />
          <zj-table-column field="settleAccountPrice" title="结算单价" />
          <zj-table-column field="taxRate" title="税率%" />
          <zj-table-column field="netAmount" title="净额" />
          <zj-table-column field="taxAmount" title="税额" />
          <zj-table-column field="totalAmount" title="总计金额" />
        </zj-table>
      </el-collapse-item>
    </el-collapse>
    <!-- 工作流 -->
    <!-- <zj-workflow>
      <el-row slot="right">
        <zj-button
          class="back"
          @click="$router.push('/openBillApply')"
          :api="zjBtn.passBillSignBatch"
          >返回</zj-button
        >
      </el-row>
    </zj-workflow> -->
    <ZjContentFooter
      ><zj-button class="back" @click="go">返回</zj-button></ZjContentFooter
    >
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      detailId: '', // 当前详情id
      zjControl: {
        onlineDetail: this.$api.openBillApply.onlineDetail //线上对账单-详情
      },
      searchForm: {},
      collActive: ['orderInfo'],
      checked: false,
      rowList: [],
      accountDetailInfo: []
    }
  },
  created () {
    this.getApi()
    this.getRow()
    this.getDetail()
  },
  activated () {
    this.detailId != this.$route.query.rowId && this.getDetail()
  },
  methods: {
    //返回
    go () {
      this.$nextTick(() => {
        this.$router.push('openBillApply')
      })
    },
    getDetail () {
      this.loading = true
      this.detailId = this.$route.query.rowId
      this.zjControl
        .onlineDetail({ id: this.detailId })
        .then(res => {
          if (res.code === 200) {
            this.rowList = [res.data] || []
            this.accountDetailInfo = this.rowList[0].accountDetailInfo || []
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="less" scoped>
#transactionQueryDetails {
  padding: 20px 0;
}
.vxe-header--row .vxe-cell {
  padding: 0 5px !important;
}

/deep/#ZjWorkflow {
  .workflow-top {
    .el-row {
      padding: 5px 0 0;
      text-align: center;
    }
  }
  .workflow-bottom {
    .right {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
