<template>
  <div>
    <zj-content-container>
      <!--  对账单详情  -->
      <zj-top-header title="对账单详情"/>
      <zj-content-block>
        <zj-header title="对账单信息"></zj-header>
        <zj-table ref="searchTable" class="zj-search-table" :dataList="detail.row"

        >
          <zj-table-column field="acctBillCode" title="对账单编号" />
          <zj-table-column field="companyName" title="买方名称" />
          <zj-table-column field="supplierCode" title="供应商编码"/>
          <zj-table-column field="supplierName" title="供应商名称" />
          <zj-table-column field="checkBillDate" title="对账日期" :formatter="date"/>
          <zj-table-column field="estimatedPaymentDate" title="预计付款日期" :formatter="date"/>
          <zj-table-column field="checkBillAmt" title="对账单金额" :formatter="money"/>
          <zj-table-column field="isApplyVoucher" title="是否申请开立债权凭证">
            <template v-slot="{row}">{{formatterCellVal(typeMap(dictionary.isApplyVoucher, row.cellValue))}}</template>
          </zj-table-column>
          <zj-table-column field="checkBillPerson" title="对账人" v-if="this.billSource === 'SRM'"/>
          <zj-table-column field="billSource" title="对账单来源" :formatter="formatterCellVal"/>

        </zj-table>
      </zj-content-block>
      <zj-content-block v-if="this.billSource">
        <zj-header title="对账单明细"></zj-header>
        <!--    SRM    -->
        <zj-table ref="searchTable" class="zj-search-table" :dataList="detail.billDetailList" v-if="this.billSource === 'SRM'"
        >
          <zj-table-column field="poNo" title="po单号" />
          <zj-table-column field="dnNo" title="dn单号" />
          <zj-table-column field="matterCode" title="物料编码" />
          <zj-table-column field="matterName" title="物料名称" />
          <zj-table-column field="unit" title="单位" />
          <zj-table-column field="inputDate" title="入库日期" :formatter="date"/>
          <zj-table-column field="storeHouse" title="仓库" />
          <zj-table-column field="inputNumber" title="入库数量" />
          <zj-table-column field="returnDate" title="退货数量" />
          <zj-table-column field="level" title="等级" />
          <zj-table-column field="orderPrice" title="订单单价" :formatter="money"/>
          <zj-table-column field="convertPrice" title="折价" :formatter="money"/>
          <zj-table-column field="settleAccountPrice" title="结算单价" :formatter="money"/>
          <zj-table-column field="taxRate" title="税率%" :formatter="rate"/>
          <zj-table-column field="netAmount" title="净额" :formatter="money"/>
          <zj-table-column field="taxAmount" title="税额" :formatter="money"/>
          <zj-table-column field="totalAmount" title="总计金额" :formatter="money"/>
        </zj-table>
        <!--    TMS    -->
        <zj-table ref="searchTable" class="zj-search-table" :dataList="detail.billDetailList" v-if="this.billSource === 'TMS'"
        >
          <zj-table-column field="dnNo" title="DN合并号" />
          <zj-table-column field="customerNo" title="客户编号" />
          <zj-table-column field="customerName" title="客户名称" />
          <zj-table-column field="passDate" title="放行日期" :formatter="date" />
          <zj-table-column field="transportMode" title="运输方式" />
          <zj-table-column field="pathDesc" title="路径描述" />
          <zj-table-column field="weight" title="重量" />
          <zj-table-column field="number" title="数量" />
          <zj-table-column field="price" title="单价" :formatter="money" />
          <zj-table-column field="baseFareAmount" title="基本运费" :formatter="money" />
          <zj-table-column field="deductionAmount" title="扣罚金额" :formatter="money" />
          <zj-table-column field="actualTotalFareAmount" title="实际总运费" :formatter="money" />
        </zj-table>
      </zj-content-block>
    </zj-content-container>
    <!-- <el-row style="position: relative;margin-top: 20px;">
    </el-row> -->
    <zj-content-footer>
      <zj-button class="submit-button" @click="goParent">返回</zj-button>
    </zj-content-footer>

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
        row: [],
        billDetailList: [],
      },
      billSource: '',
      dictionary: {}
    }
  },
  methods: {
    getDictionary() {
      this.zjControl.getDirectory().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
    getDetail() {
      this.billSource = this.row.billSource || ''
      console.log(this.billSource)
      this.detail.row.push(this.row)
      let params = {
        acctBillCode: this.row.acctBillCode,
        page: 1,
        rows: 10,
      }
      if(this.billSource == 'SRM') {
        this.zjControl.querySrmAccountBillPage(params).then(res => {
          this.detail.billDetailList = res.data.rows
        })
      }else if(this.billSource == 'TMS') {
        this.zjControl.queryTrmAccountBillPage(params).then(res => {
          this.detail.billDetailList = res.data.rows
        })
      }
    }
  },
  created() {
    this.getApi()
    this.getRow()
    this.getDictionary()
    this.getDetail()
    console.log(this.row)
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
