<template>
  <zj-content-container>
    <!--  融资交易详情  -->
    <zj-top-header title="凭证融资详情" />
    <zj-content-block v-show="workflow === 'sqxx'">
      <el-form :model="form" ref="form" label-width="200px" class="financingForm">
        <zj-content-block>
          <zj-header title="融资信息" />
          <zj-content><el-row>
            <el-col :span="12">
              <el-form-item label="融资企业：">
                {{ xqx.toEntName }}
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="融资流水号：">
                {{ xqx.serialNo }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="融资申请金额：">
                {{ xqx.tranAmt }}
                <div>{{ digitUp(xqx.tranAmt) }}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="融资期限：">
                {{ date(xqx.estimateTimeStart) }}至{{ date(xqx.estimateTimeEnd) }}共{{ xqx.total }}天
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="融资月利率：">
                {{ xqx.interestRate }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="融资状态：">
                {{ xqx.workflowState }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收款银行账号：">
                {{ xqx.receiptBankNo }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="还款状态：">
                {{ xqx.repaymentFlag }}
              </el-form-item>
            </el-col>
          </el-row>
          <zj-collapse title="还款记录" class="zj-m-t-10">
            <zj-table ref="searchTable" class="zj-search-table" :dataList="backmoney">
              <zj-table-column type="seq" title="序号" />
              <zj-table-column field="voucherNo" title="还款方式" :formatter="date" /><!-- 缺字段 -->

              <zj-table-column field="voucherSigner" title="凭证编号" /><!-- 缺字段 -->
              <zj-table-column field="repaymentDate" title="还款日期" />
              <zj-table-column field="repaymentInterestDays" title="计息天数" />
              <zj-table-column field="repaymentAmt" title="还款金额" :formatter="money" />
              <zj-table-column field="repaymentPrincipalAmt" title="还款本金" :formatter="money" />
              <zj-table-column field="repaymentInterestAmt" title="还款利息" :formatter="money" />
              <zj-table-column field="voucherAcc" title="未偿还本金" :formatter="money" /><!-- 缺字段 -->
              <zj-table-column field="yearAmt" title="年化本金" :formatter="money" />

            </zj-table>
          </zj-collapse></zj-content>
          
        </zj-content-block>
        <zj-content-block>
          
          <zj-header title="融资协议" />
          <zj-content> <zj-table ref="searchTable" class="zj-search-table" :dataList="xqx.agreementFileList">
            <zj-table-column type="seq" title="序号" />
            <zj-table-column field="fileName" title="协议附件" />
            <zj-table-column title="操作">
              <template v-slot="{ row }">
                <zj-button type="text" @click="agreementDownLoad(row.fileId)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table></zj-content>
         
        </zj-content-block>
        <zj-content-block>
          <zj-header title="其他附件" />
          <zj-content> <zj-table ref="searchTable" class="zj-search-table" :dataList="xqx.otherAttachList">
            <zj-table-column type="seq" title="序号" />
            <zj-table-column field="bizType" title="附件类型" />
            <zj-table-column field="remark" title="补充说明" />
            <zj-table-column title="操作">
              <template v-slot="{ row }">
                <zj-button type="text" @click="attaDownLoad(row.fileId)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table></zj-content>
         
        </zj-content-block>

      </el-form>
    </zj-content-block>

    <zj-content-block v-show="workflow === 'pzxx' && row.financingProductType !== '0'">
      <zj-content-block>
        <zj-header title="凭证信息" />
        <zj-content><zj-table ref="billtable" class="zj-search-table" :dataList="voucherInfoList" 
          :params="{ id: row.writerId, serialNo: row.serialNo, }" 
          @radio-change="handleRadioChange" :radio-config="{ highlight: true }" :pager="false">
          <!-- :api="zjControl.getFinancingBillInfos" -->
          <zj-table-column type="radio" width="40" />
          <zj-table-column field="ebillCode" :title="`${productName}编号`" />
          <zj-table-column field="rootCode" :title="`原始${productName}编号`" />
          <zj-table-column field="payEntName" title="凭证签发人" />
          <zj-table-column field="transferName" title="转让企业" />
          <zj-table-column field="payableIssuanceDate" title="签发日期" :formatter="date" />
          <zj-table-column field="payableAmt" :title="`${productName}金额`" :formatter="money" />
          <zj-table-column field="payableExpireDate" :title="`${productName}到期日`" :formatter="date" />
        </zj-table></zj-content>
        
      </zj-content-block>
      <div class="zz"></div>
      <zj-content-block>
        <zj-header :title="`对账单信息:（${productName}编号：${this.bjcode})`" />
        <zj-content> <zj-table ref="searchTable" :dataList="billList" :pager="false">
          <zj-table-column field="acctBillCode" title="对账单编号" />
          <zj-table-column field="companyName" title="买方名称" />
          <zj-table-column field="supplierCode" title="供应商业务系统编码" />
          <zj-table-column field="supplierName" title="供应商名称" />
          <zj-table-column field="checkBillDate" title="对账日期" :formatter="date" />
          <zj-table-column field="inputDate" title="入库日期" :formatter="date" />
          <zj-table-column field="estimatedPaymentDate" title="预计付款日期" :formatter="date" />
          <zj-table-column field="checkBillAmt" title="对账单金额" :formatter="money" />
          <zj-table-column field="isApplyVoucher" title="是否申请开立债权凭证" />
          <zj-table-column field="checkBillPerson" title="对账人" />
          <zj-table-column field="billSource" title="对账单来源" />
        </zj-table></zj-content>
       
      </zj-content-block>
      <div class="zz"></div>
      <zj-content-block>
        <zj-header :title="`贸易背景资料（资产编号：${this.bjcode})`" />
        <zj-content><el-tabs v-model="tabs" class="zj-tabs-card">
          <el-tab-pane label="贸易合同信息" name="tradeContract">
            <zj-table ref="searchTable" :dataList="BusinessContract">
              <zj-table-column field="contractNo" title="贸易合同编号：" />
              <zj-table-column field="buyerSigner" title="买方：" />
              <zj-table-column field="sellerSigner" title="卖方：" />
              <zj-table-column field="contractMonthLimit" title="合同期限（月）：" />
              <zj-table-column field="contractAmt" title="合同金额：" />
              <zj-table-column field="signDate" title="签订日期：" />
              <zj-table-column field="goodsName	" title="货物名称：" :formatter="date" />
              <zj-table-column field="fileName" title="合同附件：" />
              <zj-table-column field="agreementNo" title="阶段性协议编号：" />
              <zj-table-column field="agreementName" title="阶段性协议名称：" />
              <zj-table-column title="操作" fixed="right">
                <template v-slot="{ row }">
                  <zj-button type="text" @click="downs(row)">下载</zj-button>
                </template>
              </zj-table-column>
            </zj-table>
          </el-tab-pane>
          <el-tab-pane label="发票信息" name="invoice">
            <zj-table ref="searchTable" :dataList="fplist">
              <zj-table-column field="invoiceType" title="发票类型" />
              <zj-table-column field="invoiceNumber" title="发票号码" />
              <zj-table-column field="invoiceCode" title="发票代码" />
              <zj-table-column field="sellAmount" title="发票金额" />
              <zj-table-column field="seller" title="销售方" />
              <zj-table-column field="buyer" title="购买方" />
              <zj-table-column field="invoiceDate	" title="发票日期" :formatter="date" />
              <zj-table-column field="fileName" title="发票附件" />
              <zj-table-column title="操作" fixed="right">
                <template v-slot="{ row }">
                  <zj-button type="text" @click="downs(row)">下载</zj-button>
                </template>
              </zj-table-column>
            </zj-table>
          </el-tab-pane>
          <el-tab-pane label="其他附件" name="attaList">
            <!-- <attaList :attaList="ebillInfo.otherAttachs" /> -->
            <zj-table ref="searchTable" :dataList="businessOtherAttachList">
              <zj-table-column type="seq" title="序号" />
              <zj-table-column field="fileName" title="文件名称" />
              <zj-table-column title="操作" fixed="right">
                <template v-slot="{ row }">
                  <zj-button type="text" @click="downs(row)">下载</zj-button>
                </template>
              </zj-table-column>
            </zj-table>
          </el-tab-pane>
        </el-tabs></zj-content>
        
      </zj-content-block>

    </zj-content-block>

    <!-- 底部工作流状态 -->
    <zj-workflow v-model="workflow" :list="workflowList" v-if="row.financingProductType !== '0'">
      <!-- 审核时 -->
      <el-row slot="right">
        <el-row class="btn-w85 zj-center">
          <zj-button class="back" @click="goParent">返回</zj-button>
        </el-row>
      </el-row>
    </zj-workflow>
    <zj-content-footer v-if="row.financingProductType === '0'">
      <zj-button class="back" @click="goParent">返回</zj-button>
    </zj-content-footer>

  </zj-content-container>
</template>

<script>


export default {
  name: "toDoDetail",
  components: {
  },
  watch: {
    workflow() {
      // this.setFirstRow(this.voucherInfoList[0]);
      this.getOtherDetail()
    }
  },
  computed: {
    productName () {
      return this.$store.getters['user/productName']
    }
  },
  data() {
    return {
      form: {
        operEbTranTxListLogs: [],
      },
      ebillInfo: {
        accountBillInners: [],
      },
      ebillCode: '',//选中的凭证信息的编号
      activeEbillCodeNo: '',//选中的凭证信息的对账单编号
      dictionary: {},

      tabs: 'tradeContract',
      zjControl: {
        rdDetailrzxq: this.$api.factoringLedger.rdDetailrzxq,//融资申请信息-详情
        getFinancingTransDirectory: this.$api.factoringLedger.getDictionary,//数据字典
        rdDetailpzxx: this.$api.factoringLedger.rdDetailpzxx,//凭证信息
        getOtherInfoByBill: this.$api.factoringLedger.changeData,//凭证信息-详情
        downloadFile: this.$api.baseCommon.downloadFile,//下载
      },
      workflow: 'sqxx',
      workflowList: [
        { label: '融资申请信息', value: 'sqxx' }, { label: '凭证信息', value: 'pzxx' }
      ],
      rzxylist: [],//融资协议列表
      backmoney: [],//还款记录列表
      otherfilelist: [],//其他协议列表
      xqx: {},//申请信息详情
      voucherInfoList: {},//凭证信息列表
      BusinessContract: [],//贸易合同信息
      billList: [{//对账单信息列表
        acctBillCode: "",
        companyName: "",
        supplierCode: "",
        supplierName: "",
        checkBillDate: "",
        inputDate: "",
        estimatedPaymentDate: "",
        checkBillAmt: "",
        isIssueVoucher: "",
        billSource: ""
      }],
      bjcode: "",//贸易背景资料编号
      fplist: [],//发票信息
      businessOtherAttachList:[],//其他附件
    }
  },
  created() {
    this.getApi()
    this.getRow()
    // this.getDictionary()
    console.log("created");
    // this.$refs.billInfoTable
  },
  mounted(){
    console.log("mounted");
    this.getDetail()
  },
  methods: {
    // setFirstRow(row) {
    //   this.$refs.billTable.setRadioRow(row);
    //   this.handleRadioChange({row});
    // },
    getDictionary() {
      this.zjControl.getFinancingTransDirectory().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
    getDetail() {
      let params = {
        serialNo: this.row.serialNo,
      }
      console.log(params);
      //申请信息
      this.zjControl.rdDetailrzxq(params).then(res => {
        this.xqx = res.data
        this.rzxylist = res.data.agreementFileList
        this.backmoney = res.data.repaymentRecordList
        this.otherfilelist = res.data.otherAttachList
      })
      // //凭证信息
      this.zjControl.rdDetailpzxx(params).then(res => {
        this.voucherInfoList = res.data.voucherInfoList
        console.log("默认首选",this.$refs);
        this.$refs.billtable.setRadioRow(this.voucherInfoList[0]);
        this.handleRadioChange(this.voucherInfoList[0]);
      })
        
    },
    getOtherDetail(){
      if (this.workflow === 'sqxx') {
        console.log("申请信息时触发");
      }
      if (this.workflow === 'pzxx') {
        console.log("凭证信息时触发");
        let params = {
        ebillCode: this.voucherInfoList[0].ebillCode,
        serialNo: this.row.serialNo
      }
      this.zjControl.getOtherInfoByBill(params).then(res => {
        //对账单列表
        this.billList[0].acctBillCode = res.data.acctBillCode
        this.billList[0].companyName = res.data.companyName
        this.billList[0].supplierCode = res.data.supplierCode
        this.billList[0].supplierName = res.data.supplierName
        this.billList[0].checkBillDate = res.data.checkBillDate
        this.billList[0].inputDate = res.data.inputDate
        this.billList[0].estimatedPaymentDate = res.data.estimatedPaymentDate
        this.billList[0].checkBillAmt = res.data.checkBillAmt
        this.billList[0].isIssueVoucher = res.data.isIssueVoucher
        this.billList[0].billSource = res.data.billSource
        //贸易背景资料
        this.bjcode = res.data.ebillCode
        //发票信息
        this.fplist = res.data.businessInvoiceList
        // 贸易合同信息
        this.BusinessContract = res.data.businessContractList
        // 其他附件
        this.businessOtherAttachList=res.data.businessOtherAttachList
      })

      }
    },
    agreementDownLoad() {

    },
    downs(row) {
      console.log(row);
      let params = {
        fileId:row.fileId,
        fileName:row.fileName
      }
      this.$api.baseCommon.downloadFile(params).then((res) => {
      });
    },

    handleDataChange(rows) {
      console.log("默认勾选第一个凭证信息");
      //默认勾选第一个凭证信息
      if (rows && rows.length) {
        // this.$refs.billTable.setRadioRow(rows[0])
        // this.handleRadioChange({ row: rows[0] })
      }
    },
    handleRadioChange({ row }) {

      let params = {
        ebillCode: row.ebillCode,
        serialNo: this.row.serialNo
      }
      this.zjControl.getOtherInfoByBill(params).then(res => {
        //对账单列表
        this.billList[0].acctBillCode = res.data.acctBillCode
        this.billList[0].companyName = res.data.companyName
        this.billList[0].supplierCode = res.data.supplierCode
        this.billList[0].supplierName = res.data.supplierName
        this.billList[0].checkBillDate = res.data.checkBillDate
        this.billList[0].inputDate = res.data.inputDate
        this.billList[0].estimatedPaymentDate = res.data.estimatedPaymentDate
        this.billList[0].checkBillAmt = res.data.checkBillAmt
        this.billList[0].isIssueVoucher = res.data.isIssueVoucher
        this.billList[0].billSource = res.data.billSource
        //贸易背景资料
        this.bjcode = res.data.ebillCode
        //发票信息
        this.fplist = res.data.businessInvoiceList
        // 贸易合同信息
        this.BusinessContract = res.data.businessContractList
        // 其他附件
        this.businessOtherAttachList=res.data.businessOtherAttachList
      })
    },
  },

}
</script>

<style scoped lang="less">
.zz{
  width: 20px;
  height: 60px;
}
</style>