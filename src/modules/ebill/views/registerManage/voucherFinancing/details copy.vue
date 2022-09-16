<template>
  <zj-content-container>
    <!-- 底部工作流状态 -->
    <zj-workflow v-model="workflow" :list="workflowList" v-if="row.financingProductType !== '0'">
      <!-- 审核时 -->
      <el-row slot="right">
        <el-row class="btn-w85 zj-center">
          <zj-button class="back" @click="back()">返回</zj-button>
        </el-row>
      </el-row>
    </zj-workflow>

    <!--  融资交易详情  -->
    <zj-top-header title="融资交易详情" />
       <zj-content-block v-if="workflow === 'sqxx'">
          <el-form :model="form" ref="form" label-width="200px" class="zj-m-t-20">
            <zj-content-block>
              <zj-header title="交易信息"/>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="融资流水号：">{{form.serialNo}}</el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="融资产品：">{{ typeMap(dictionary.financingProductType, form.financingProductType) }}
              </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请时间：">{{form.applyDatetime?date(form.applyDatetime):''}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="业务状态："><span>
                {{ typeMap(dictionary.financingState, form.workflowState) }}
              </span></el-form-item>
              </el-row>
            </zj-content-block>
            <zj-content-block>
              <zj-header title="融资申请信息"/>
              <zj-content>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="融资企业：">{{form.fromEntName}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="row.financingProductType !== '0'">
                  <el-form-item label="融资金额：">{{form.buyerEntName}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="row.financingProductType !== '0'">
                  <el-form-item label="融资折扣率：">{{form.interestRate?`${form.interestRate}%`:''}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="row.financingProductType === '0'">
                  <el-form-item label="买方企业名称：">{{form.buyerEntName}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="row.financingProductType === '0'">
                  <el-form-item label="融资月利率：">{{form.interestRate?`${form.interestRate}%`:''}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8" v-if="row.financingProductType === '0'">
                  <el-form-item label="融资申请金额：">
                    {{form.tranAmt}}
                    <div>{{digitUp(form.tranAmt)}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="row.financingProductType !== '0'">
                  <el-form-item label="申请转让金额：">
                    {{form.tranAmt}}
                    <el-tooltip content="(申请转让金额 = 融资申请金额/折扣率)" v-if="form.tranAmt" effect="dark" placement="top">
                      <i class="el-icon-info" style="color:#909399"></i>
                    </el-tooltip>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="row.financingProductType === '0'">
                  <el-form-item label="融资开始日：">{{form.loanDate?date(form.loanDate):''}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="row.financingProductType === '0'">
                  <el-form-item label="融资到期日：">{{form.expireDate?date(form.expireDate):''}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="row.financingProductType !== '0'">
                  <el-form-item label="融资月利率：">{{form.interestRate?`${form.interestRate}%`:''}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="row.financingProductType !== '0'">
                  <el-form-item label="融资开始日：">{{form.loanDate?date(form.loanDate):''}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="预计融资期限：">
                    {{ date(form.estimateTimeStart) }}
                    {{ form.estimateTimeEnd ? `至 ` + date(form.estimateTimeEnd) : '' }}
                    {{ form.totalDay ? `共${form.totalDay}天` : ''}}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="预计利息：">
                    {{form.interestAmt}}
                    <el-tooltip content="(预计利息 = 融资申请金额*融资月利率/30*预计融资天数)" v-if="form.interestAmt" effect="dark" placement="top">
                      <i class="el-icon-info" style="color:#909399"></i>
                    </el-tooltip>
                  </el-form-item>
                </el-col>
              </el-row>
              <zj-collapse title="收款账户" class="zj-m-t-10">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="收款账户户名：" >{{form.receiptAcctName}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="收款银行开户行：">{{form.receiptBankName}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="收款银行银行账号：">{{form.receiptAcctNo}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="收款银行联行号：">{{form.receiptBankNo}}</el-form-item>
                  </el-col>
                </el-row>
              </zj-collapse>
              <zj-content-block>
              <zj-table ref="searchTable" class="zj-search-table"
                        :dataList="form.phasedAgreements"
                        :pager="false"
                        v-if="row.financingProductType === '0'"
              >
                <zj-table-column field="agreementNo" title="阶段性协议编号" />
                <zj-table-column field="agreementName" title="阶段性协议名称" />
                <zj-table-column field="agreementStartDate" title="协议签订日期" :formatter="date"/>
                <zj-table-column field="agreementEstimateEndDate" title="协议到期日" :formatter="date"/>
                <zj-table-column field="agreementNumber" title="数量" />
                <zj-table-column field="price" title="单价" :formatter="money"/>
                <zj-table-column field="agreementEstimatedPrice" title="协议预估总价" :formatter="money"/>
                <zj-table-column field="agreementStatus" title="状态" />
                <zj-table-column field="fileName" title="附件"/>
                <zj-table-column title="操作">
                  <template v-slot="{row}">
                    <zj-button type="text" @click="attaDownLoad(row)">下载</zj-button>
                  </template>
                </zj-table-column>
                <el-row slot="pager-left" class="slotRows" >
                  订单预估总额：{{moneyNoSynbol(form.totalAmt)}}
                </el-row>
              </zj-table>
              <zj-table ref="searchTable" class="zj-search-table"
                        :dataList="form.phasedAgreements"
                        :pager="false"
                        v-if="row.financingProductType !== '0'"
              >
                <zj-table-column field="agreementNo" :title="`${productName}编号`" />
                <zj-table-column field="agreementName" :title="`原始${productName}编号`" />
                <zj-table-column field="agreementStartDate" :title="`${productName}签发人`" />
                <zj-table-column field="agreementEstimateEndDate" title="转让企业" />
                <zj-table-column field="agreementNumber" :title="`${productName}金额`" :formatter="money"/>
                <zj-table-column field="price" :title="`${productName}持有日期`" :formatter="date"/>
                <zj-table-column field="agreementEstimatedPrice" :title="`${productName}到期日`" :formatter="date"/>
                <el-row slot="pager-left" class="slotRows" >
                  {{productName}}金额合计：{{moneyNoSynbol(form.totalAmt)}}
                </el-row>
              </zj-table>
              </zj-content-block>
              </zj-content>
            </zj-content-block>
            <zj-content-block>
              <zj-header title="协议信息"/>
              <zj-content>
              <zj-table ref="searchTable" class="zj-search-table"
                        :dataList="form.financingAgreement"
                        :pager="false"
              >
                <zj-table-column field="seq" title="序号" />
                <zj-table-column field="agreementNo" title="协议编号" />
                <zj-table-column field="fileName" title="协议名称" />
                <zj-table-column title="操作" >
                  <template v-slot="{row}">
                    <zj-button type="text" @click="agreementDownLoad(row.fileId)">下载</zj-button>
                  </template>
                </zj-table-column>
              </zj-table>
              </zj-content>
            </zj-content-block>
            <zj-content-block v-if="row.financingProductType !== '0'">
              <zj-header title="总控额度信息"/>
              <zj-content>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="供应商总控额度：">{{form.totalCreditAmount}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="剩余可用额度：">{{form.availableCreditAmount}}</el-form-item>
                </el-col>
              </el-row>
              </zj-content>
            </zj-content-block>
            <zj-content-block>
              <zj-header title="其他附件"/>
              <zj-content>
              <zj-table ref="searchTable" class="zj-search-table"
                        :dataList="form.otherAttachs"
                        :pager="false"
              >
                <zj-table-column field="seq" title="序号" />
                <zj-table-column field="bizType" title="附件类型" />
                <zj-table-column field="addNote" title="补充说明" />
                <zj-table-column title="操作" >
                  <template v-slot="{row}">
                    <zj-button type="text" @click="attaDownLoad(row.fileId)">下载</zj-button>
                  </template>
                </zj-table-column>
              </zj-table>
              </zj-content>
            </zj-content-block>
            <!--  操作记录  -->
            <zj-content-block>
              <zj-header title="操作记录"></zj-header>
              <zj-content>
                <zj-table ref="logTable"
                          :dataList="form.operEbTranTxListLogs"
                          :pager="false">
                  <zj-table-column type="seq" width="60" title="序号"/>
                  <zj-table-column field="tranType" title="业务节点"/>
                  <zj-table-column
                    field="creator"
                    title="处理人"
                  />
                  <zj-table-column
                    field="createDatetime"
                    title="处理时间"
                    formatter="formatDateTime"
                  />
                  <zj-table-column field="operFlag" title="审核结果"/>
                  <zj-table-column field="notes" title="审核意见"/>
                </zj-table>
              </zj-content>
            </zj-content-block>
          </el-form>
      </zj-content-block>

      <zj-content-block v-if="workflow === 'pzxx' && row.financingProductType !== '0'">
          <zj-content-block>
            <zj-header title="凭证信息"/>
            <zj-content>
            <zj-table ref="billInfoTable" class="zj-search-table"
                      :api="zjControl.getFinancingBillInfos"
                      :params="{id : row.id, serialNo: row.serialNo,}"
                      @after-load="handleDataChange"
                      @radio-change="handleRadioChange"
                      :radio-config="{highlight: true}"
                      :pager="false"
            >
              <zj-table-column type="radio" width="40"/>
              <zj-table-column field="ebillCode" :title="`${productName}编号`" />
              <zj-table-column field="sourceCode" :title="`原始${productName}编号`" />
              <zj-table-column field="writerName" :title="`${productName}签发人`" />
              <zj-table-column field="transferName" title="转让企业" />
              <zj-table-column field="openDate" title="签发日期" :formatter="date"/>
              <zj-table-column field="ebillAmt" :title="`${productName}金额`" :formatter="money"/>
              <zj-table-column field="expireDate" :title="`${productName}到期日`" :formatter="date"/>
            </zj-table>
            </zj-content>
          </zj-content-block>
          <zj-content-block>
            <zj-header :title="`对账单信息${ebillCode?`-${ebillCode}`:''}`"/>
            <zj-content>
            <zj-table ref="searchTable"
                      :dataList="ebillInfo.accountBillInners"
                      :pager="false"
            >
              <zj-table-column field="acctBillCode" title="对账单编号"/>
              <zj-table-column field="companyName" title="买方名称"/>
              <zj-table-column field="supplierCode" title="供应商业务系统编码"/>
              <zj-table-column field="supplierName" title="供应商名称"/>
              <zj-table-column field="checkBillDate" title="对账日期" :formatter="date"/>
              <zj-table-column field="inputDate" title="入库日期" :formatter="date"/>
              <zj-table-column field="estimatedPaymentDate" title="预计付款日期" :formatter="date"/>
              <zj-table-column field="checkBillAmt" title="对账单金额" :formatter="money"/>
              <zj-table-column field="isApplyVoucher" title="是否申请开立债权凭证"/>
              <zj-table-column field="checkBillPerson" title="对账人" />
              <zj-table-column field="billSource" title="对账单来源" />
            </zj-table>
            </zj-content>
          </zj-content-block>
          <zj-content-block>
            <zj-header :title="`贸易背景资料（资产编号：${activeEbillCodeNo}）`"/>
            <zj-content>
            <el-tabs v-model="tabs" class="zj-tabs-card">
              <el-tab-pane label="贸易合同信息" name="tradeContract" >
                <trade-contract :zjControl="zjControl" :form="ebillInfo.contractInfos"/>
              </el-tab-pane>
              <el-tab-pane label="发票信息" name="invoice" >
                <invoice :invoiceList="ebillInfo.invoices"/>
              </el-tab-pane>
              <el-tab-pane label="其他附件" name="attaList" >
                <attaList :attaList="ebillInfo.otherAttachs"/>
              </el-tab-pane>
            </el-tabs>
            </zj-content>
          </zj-content-block>

      </zj-content-block>

    <zj-content-footer v-if="row.financingProductType === '0'">
      <zj-button class="back" @click="back()">返回</zj-button>
    </zj-content-footer>

  </zj-content-container>
</template>

<script>
// import operateLog from "../components/operateLog";
// import tradeContract from '../components/tradeContract'
// import invoice from '../components/invoice'
// import attaList from '../components/attaList'

import tradeContract from './tradeBackgroundInfo/tradeContract'
import invoice from './tradeBackgroundInfo/invoice'
import attaList from './tradeBackgroundInfo/attaList'
export default {
  name: "toDoDetail",
  components: {
    tradeContract,
    invoice,
    attaList,

  },
  watch: {
    workflow() {
      this.getDetail()
    }
  },
  computed: {
    productName() {
      return this.$store.getters['user/productName']
    },
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
        getFinancingTransDetail: this.$api.zhongdengManage.detailssq,//融资申请信息-详情
        getFinancingTransDirectory: this.$api.zhongdengManage.getDictionary,//数据字典
        getFinancingBillInfos: this.$api.zhongdengManage.detailspz,//凭证信息
        getOtherInfoByBill: this.$api.zhongdengManage.changedata,//凭证信息-详情

      },
      workflow: 'sqxx',
      workflowList: [
        { label: '融资申请信息', value: 'sqxx' }, { label: '凭证信息', value: 'pzxx' }
      ],
    }
  },
  methods: {
    back() {
      console.log("返回");
      this.goParent("zhongdengManage", false)
    },
    getDictionary() {
      this.zjControl.getFinancingTransDirectory().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
    getDetail() {
      let params = {
        id: this.row.id,
        serialNo: this.row.serialNo,
      }
      //申请信息
      if (this.workflow === 'sqxx') {
        this.zjControl.getFinancingTransDetail(params).then(res => {
          this.form = res.data
        })
      }
      //凭证信息
      if (this.workflow === 'pzxx') {

      }
    },
    agreementDownLoad() {

    },
    attaDownLoad() { },

    handleDataChange(rows) {
      //默认勾选第一个凭证信息
      if (rows && rows.length) {
        this.$refs.billInfoTable.setRadioRow(rows[0])
        this.handleRadioChange({ row: rows[0] })
      }
    },
    handleRadioChange({ row }) {
      this.ebillCode = row.ebillCode
      let params = {
        ebBillCode: row.ebillCode,
      }
      this.zjControl.getOtherInfoByBill(params).then(res => {
        //对账单列表
        this.ebillInfo.accountBillInners = res.data.accountBillInners
        //对账单编号
        this.activeEbillCodeNo = this.ebillInfo.accountBillInners[0].acctBillCode
        //背景资料信息列表
        this.ebillInfo.contractInfo = res.data.contractInfos[0]
        this.ebillInfo.invoices = res.data.invoices
        this.ebillInfo.otherAttachs = res.data.otherAttachs
      })
    },
  },
  created() {
    const currentActiveTab = this.getCurrentActiveTab();
    if (currentActiveTab) {
      this.activeComp = currentActiveTab;
      this.removeCurrentTab();
    }
    this.getApi()
    this.getRow()
    this.getDictionary()
    this.getDetail()
    console.log(this.row);
  }
}
</script>

<style scoped lang="less">
</style>