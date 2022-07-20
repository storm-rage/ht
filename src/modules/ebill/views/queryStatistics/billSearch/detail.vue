<template>
  <div>
    <zj-content-container>
      <!--  对账单详情  -->
      <zj-top-header title="对账单详情"/>
      <zj-content-block>
        <zj-header title="对账单信息"></zj-header>
        <zj-table ref="searchTable" class="zj-search-table" :params="detail.row"
                  :pager="false"
        >
          <zj-table-column field="acctBillCode" title="对账单编号" />
          <zj-table-column field="companyName" title="买方名称" />
          <zj-table-column field="supplierCode" title="供应商编码" :formatter="date"/>
          <zj-table-column field="supplierName" title="供应商名称" :formatter="money"/>
          <zj-table-column field="checkBillDate" title="对账日期" :formatter="money"/>
          <zj-table-column field="estimatedPaymentDate" title="预计付款日期" :formatter="money"/>
          <zj-table-column field="checkBillAmt" title="对账单金额" :formatter="money"/>
          <zj-table-column field="isApplyVoucher" title="是否申请开立债权凭证" :formatter="money"/>
          <zj-table-column field="billSource" title="对账人" />
          <zj-table-column field="billSource" title="对账单来源" :formatter="money"/>

        </zj-table>
      </zj-content-block>
      <zj-content-block>
        <zj-header title="对账单明细"></zj-header>
        <zj-table ref="searchTable" class="zj-search-table" :dataList="detail.billDetailList" :pager="false"
        >
          <zj-table-column field="dnNo" title="DN合并号" />
          <zj-table-column field="customerNo" title="客户编号" />
          <zj-table-column field="customerName" title="客户名称" />
          <zj-table-column field="passDate" title="放行日期" />
          <zj-table-column field="transportMode" title="运输方式" />
          <zj-table-column field="pathDesc" title="路径描述" />
          <zj-table-column field="weight" title="重量" />
          <zj-table-column field="number" title="数量" />
          <zj-table-column field="price" title="单价" />
          <zj-table-column field="baseFareAmount" title="基本运费" />
          <zj-table-column field="deductionAmount" title="扣罚金额" />
          <zj-table-column field="actualTotalFareAmount" title="实际总运费" />
        </zj-table>
      </zj-content-block>
    </zj-content-container>
    <el-row style="position: relative;margin-top: 20px;">
      <zj-content-footer>
        <zj-button class="submit-button" @click="goParent">返回</zj-button>
      </zj-content-footer>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "detail",
  components: {},
  data() {
    return {
      zjControl: {
        getDirectory:this.$api.billSearch.getDirectory,//数据字典
        querySrmAccountBillPage:this.$api.billSearch.querySrmAccountBillPage,//SRM详情
        queryTrmAccountBillPage:this.$api.billSearch.queryTrmAccountBillPage,//TMS详情
      },
      detail: {
        row: this.row,
        billDetailList: [],
      },
      billSource: this.row.billSource,
    }
  },
  methods: {
    attaDownLoad(){},
    getDetail() {
      if(this.billSource == 'SRM') {
        this.zjControl.querySrmAccountBillPage(this.row.acctBillCode).then(res => {
          this.detail.billDetailList = res.data
        })
      }else if(this.billSource == 'TMS') {
        this.zjControl.queryTrmAccountBillPage(this.row.acctBillCode).then(res => {
          this.detail.billDetailList = res.data
        })
      }
    }
  },
  created() {
    this.getApi()
    this.getRow()
    this.getDetail()
  }
}
</script>

<style scoped lang="less">
.quota-manage {
  height: 40px;
  line-height:40px;
  text-align: right;
  margin-bottom: 20px;
  color: #e6a23c;
  background-color: #fdf6ec;
}
.financingForm {
  margin-top: 20px;
}
.explain-text {
  display: flex;
  padding-bottom: 20px;
  background-color: rgba(2, 167, 240, 0);
  .explain-item {
    color: #555;
    font-size: 14px;
    margin-left: 20px;
  }
}
.hd-row {
  position: relative;
  &:after {
    position: absolute;
    top: 36px;
    left: 0;
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #cbcbcb;
  }
}

</style>
