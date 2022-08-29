<template>
  <zj-content-container>
    <!--  融资交易详情  -->
    <zj-top-header title="凭证融资详情" />
    <zj-content-block v-if="workflow === 'sqxx'">
      <el-form :model="form" ref="form" label-width="200px" class="financingForm">
        <zj-content-block>
          <zj-header title="融资信息" />
          <el-row>
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
          </zj-collapse>
        </zj-content-block>
        <zj-content-block>
          <zj-header title="融资协议" />
          <zj-table ref="searchTable" class="zj-search-table" :dataList="xqx.agreementFileList">
            <zj-table-column type="seq" title="序号" />
            <zj-table-column field="fileName" title="协议附件" />
            <zj-table-column title="操作">
              <template v-slot="{ row }">
                <zj-button type="text" @click="agreementDownLoad(row.fileId)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content-block>
        <zj-content-block>
          <zj-header title="其他附件" />
          <zj-table ref="searchTable" class="zj-search-table" :dataList="xqx.otherAttachList">
            <zj-table-column type="seq" title="序号" />
            <zj-table-column field="bizType" title="附件类型" />
            <zj-table-column field="remark" title="补充说明" />
            <zj-table-column title="操作">
              <template v-slot="{ row }">
                <zj-button type="text" @click="attaDownLoad(row.fileId)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content-block>

      </el-form>
    </zj-content-block>

    <zj-content-block v-if="workflow === 'pzxx' && row.financingProductType !== '0'">
      <zj-content-block>
        <zj-header title="凭证信息" />
        <zj-table ref="billInfoTable" class="zj-search-table" :dataList="voucherInfoList"
          :params="{ id: row.writerId, serialNo: row.serialNo, }" @after-load="handleDataChange"
          @radio-change="handleRadioChange" :radio-config="{ highlight: true }" :pager="false">
          <!-- :api="zjControl.getFinancingBillInfos" -->
          <zj-table-column type="radio" width="40" />
          <zj-table-column field="ebillCode" title="凭证编号" />
          <zj-table-column field="rootCode" title="原始凭证编号" />
          <zj-table-column field="payEntName" title="凭证签发人" />
          <zj-table-column field="transferName" title="转让企业" />
          <zj-table-column field="payableIssuanceDate" title="签发日期" :formatter="date" />
          <zj-table-column field="payableAmt" title="凭证金额" :formatter="money" />
          <zj-table-column field="payableExpireDate" title="凭证到期日" :formatter="date" />
        </zj-table>
      </zj-content-block>
      <zj-content-block>
        <zj-header :title="`对账单信息${ebillCode ? `-${ebillCode}` : ''}`" />
        <zj-table ref="searchTable" :dataList="ebillInfo.accountBillInners" :pager="false">
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
        </zj-table>
      </zj-content-block>
      <zj-content-block>
        <zj-header :title="`贸易背景资料（资产编号：${this.activeEbillCodeNo}`" />
        <el-tabs v-model="tabs" class="zj-tabs-card">
          <el-tab-pane label="贸易合同信息" name="tradeContract">
            <!-- <trade-contract :zjControl="zjControl" :form="ebillInfo.contractInfo" /> -->
            <el-form :model="form" label-width="200px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="贸易合同编号：">{{ BusinessContract.contractNo }}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="买方：">{{ BusinessContract.buyerSigner }}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="卖方：">{{ BusinessContract.sellerSigner }}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="合同期限（月）：">{{ BusinessContract.contractMonthLimit }}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同金额：">{{ BusinessContract.contractAmt }}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="签订日期：">{{ BusinessContract.signDate }}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="货物名称：">
                    {{ BusinessContract.goodsName }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同附件：">
                    <div class="atta-name-box">
                      <span class="atta-name">
                        {{ BusinessContract.fileName }}
                      </span>
                      <zj-button type="text" @click="attaDownload">下载</zj-button>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="阶段性协议编号：">{{ BusinessContract.agreementNo }}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="阶段性协议名称：">{{ BusinessContract.agreementName }}</el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="发票信息" name="invoice">
            <!-- <invoice :invoiceList="ebillInfo.invoices" /> -->
            <zj-table ref="searchTable" :dataList="invoiceList">
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
            <zj-table ref="searchTable" :dataList="attaList">
              <zj-table-column type="seq" title="序号" />
              <zj-table-column field="fileName" title="文件名称" />
              <zj-table-column title="操作" fixed="right">
                <template v-slot="{ row }">
                  <zj-button type="text" @click="downs(row)">下载</zj-button>
                </template>
              </zj-table-column>
            </zj-table>
          </el-tab-pane>
        </el-tabs>
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
import operateLog from "@modules/workflow/views/components/operateLog";
// import tradeContract from '../components/tradeContract'
// import invoice from '../components/invoice'
// import attaList from '../components/attaList'


export default {
  name: "toDoDetail",
  components: {
    // tradeContract,
    // invoice,
    // attaList,
    // operateLog,
  },
  watch: {
    // workflow() {
    //   this.getDetail()
    // }
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

      },
      workflow: 'sqxx',
      workflowList: [
        { label: '融资申请信息', value: 'sqxx' }, { label: '凭证信息', value: 'pzxx' }
      ],
      rzxylist: [],//融资协议列表
      backmoney: [],//还款记录列表
      otherfilelist: [],//其他协议列表
      xqx:{},//申请信息详情
      voucherInfoList:{},//凭证信息列表
      BusinessContract:{},//贸易合同信息（接口返回的外层是数组，记得拆）
    }
  },
  created() {
    this.getApi()
    this.getRow()
    // this.getDictionary()
    this.getDetail()
  },
  methods: {
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
        this.voucherInfoList=res.data.voucherInfoList
      })
      if (this.workflow === 'sqxx') {
        console.log("申请信息时触发");
      }
      if (this.workflow === 'pzxx') {
        console.log("凭证信息时触发");
      }
    },
    agreementDownLoad() {

    },
    attaDownLoad() { 
      console.log("下载还没做");
    },

    handleDataChange(rows) {
      //默认勾选第一个凭证信息
      if (rows && rows.length) {
        this.$refs.billInfoTable.setRadioRow(rows[0])
        this.handleRadioChange({ row: rows[0] })
      }
    },
    handleRadioChange({ row }) {
      
      let params = {
        ebillCode:row.ebillCode,
        serialNo:this.row.serialNo
      }
      this.zjControl.getOtherInfoByBill(params).then(res => {
        //对账单列表
        this.ebillInfo.accountBillInners = res.data.accountBillInners
        //对账单编号
        this.activeEbillCodeNo = res.data.acctBillCode
        //背景资料信息列表
        this.ebillInfo.contractInfo = res.data.contractInfos[0]
        this.ebillInfo.invoices = res.data.invoices
        this.ebillInfo.otherAttachs = res.data.otherAttachs
        // 贸易合同信息
        this.BusinessContract=res.data.businessContractList[0]
      })
    },
  },
  
}
</script>

<style scoped lang="less">
</style>