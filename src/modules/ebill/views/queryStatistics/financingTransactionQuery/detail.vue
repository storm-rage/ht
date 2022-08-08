<template>
    <zj-content-container>
      <!--  融资交易详情  -->
      <zj-top-header title="融资交易详情"/>
      <zj-content-block v-if="workflow === 'sqxx'">
          <el-form :model="form" ref="form" label-width="200px" class="zj-m-t-20">
            <zj-content-block>
              <zj-header title="交易信息"/>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="融资流水号：">{{form.serialNo}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="融资产品：">{{form.financingProductType}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请时间：">{{form.applyDatetime}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="业务状态：">{{form.workflowState}}</el-form-item>
              </el-row>
            </zj-content-block>
            <zj-content-block>
              <zj-header title="融资申请信息"/>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="融资企业：">{{form.fromEntName}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.financingProductType !== '0'">
                  <el-form-item label="融资金额：">{{form.buyerEntName}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.financingProductType !== '0'">
                  <el-form-item label="融资折扣率：">{{form.interestRate}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.financingProductType === '0'">
                  <el-form-item label="买方企业名称：">{{form.buyerEntName}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.financingProductType === '0'">
                  <el-form-item label="融资月利率：">{{form.interestRate}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8" v-if="form.financingProductType === '0'">
                  <el-form-item label="融资申请金额：">
                    {{form.tranAmt}}
                    <div>{{digitUp(form.tranAmt)}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.financingProductType !== '0'">
                  <el-form-item label="申请转让金额：">
                    {{form.tranAmt}}
                    <zj-text-tip text="（申请转让金额 = 融资申请金额/折扣率）"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.financingProductType === '0'">
                  <el-form-item label="融资开始日：">{{form.loanDate}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.financingProductType === '0'">
                  <el-form-item label="融资到期日：">{{form.expireDate}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.financingProductType !== '0'">
                  <el-form-item label="融资月利率：">{{form.interestRate}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.financingProductType !== '0'">
                  <el-form-item label="融资开始日：">{{form.loanDate}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="预计融资期限：">
                    {{date(form.estimateTimeStart)}}至{{date(form.estimateTimeEnd)}}共{{form.totalDay}}天
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="预计利息：">
                    {{form.interestAmt}}
                    <zj-text-tip text="（预计利息 = 融资申请金额*融资月利率/30*预计融资天数）"/>
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
              <zj-table ref="searchTable" class="zj-search-table"
                        :dataList="form.phasedAgreements"
                        v-if="form.financingProductType === '0'"
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
                        v-if="form.financingProductType !== '0'"
              >
                <zj-table-column field="agreementNo" title="凭证编号" />
                <zj-table-column field="agreementName" title="原始凭证编号" />
                <zj-table-column field="agreementStartDate" title="凭证签发人" />
                <zj-table-column field="agreementEstimateEndDate" title="转让企业" />
                <zj-table-column field="agreementNumber" title="凭证金额" :formatter="money"/>
                <zj-table-column field="price" title="凭证持有日期" :formatter="date"/>
                <zj-table-column field="agreementEstimatedPrice" title="凭证到期日" :formatter="date"/>
                <el-row slot="pager-left" class="slotRows" >
                  凭证金额合计：{{moneyNoSynbol(form.totalAmt)}}
                </el-row>
              </zj-table>
            </zj-content-block>
            <zj-content-block>
              <zj-header title="协议信息"/>
              <zj-table ref="searchTable" class="zj-search-table"
                        :dataList="form.financingAgreement"
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
            </zj-content-block>
            <zj-content-block>
              <zj-header title="保理合同信息"/>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="保理合同编号：">{{form.contractNo}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.financingProductType !== '0'">
                  <el-form-item label="保理类型：">{{form.contractType}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.financingProductType === '0'">
                  <el-form-item label="总金额：">{{form.factoringCreditAmount}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.financingProductType !== '0'">
                  <el-form-item label="合同金额：">{{form.contractAmount}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.financingProductType === '0'">
                  <el-form-item label="剩余可用金额：">{{form.availableCreditAmount}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8" v-if="form.financingProductType !== '0'">
                  <el-form-item label="剩余可用金额：">{{form.availableCreditAmount}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.financingProductType === '0'">
                  <el-form-item label="额度有效期：">{{date(form.factoringCreditStartDate)}}
                    {{form.factoringCreditStartDate?`至${date(form.factoringCreditStartDate)}`:''}}
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.financingProductType !== '0'">
                  <el-form-item label="保理合同到期日：">{{form.availableCreditAmount}}</el-form-item>
                </el-col>
              </el-row>
            </zj-content-block>
            <zj-content-block v-if="form.financingProductType !== '0'">
              <zj-header title="总控额度信息"/>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="供应商总控额度：">{{form.contractNo}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="剩余可用额度：">{{form.contractNo}}</el-form-item>
                </el-col>
              </el-row>
            </zj-content-block>
            <zj-content-block>
              <zj-header title="其他附件"/>
              <zj-table ref="searchTable" class="zj-search-table"
                        :dataList="form.otherAttachs"
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
            </zj-content-block>
            <!--  操作记录  -->
            <operate-log :logList="form.operEbTranTxListLogs"/>
          </el-form>
      </zj-content-block>

      <zj-content-block v-if="workflow === 'pzxx' && form.financingProductType === '0'">
        <el-content-block>
          <zj-header title="凭证信息"/>
          <zj-table ref="billInfoTable" class="zj-search-table"
                    :dataList="form.list"
                    @after-load="handleDataChange"
                    @radio-change="handleRadioChange"
                    :radio-config="{highlight: true}"
          >
            <zj-table-column type="radio" width="40"/>
            <zj-table-column field="voucherNo" title="凭证编号" />
            <zj-table-column field="voucherNo" title="原始凭证编号" />
            <zj-table-column field="voucherSigner" title="凭证签发人" />
            <zj-table-column field="entName" title="转让企业" />
            <zj-table-column field="voucherAcc" title="签发日期" :formatter="date"/>
            <zj-table-column field="voucherAcc" title="凭证金额" :formatter="money"/>
            <zj-table-column field="voucherAcc" title="凭证到期日" :formatter="date"/>
          </zj-table>
        </el-content-block>
        <el-content-block>
          <zj-header title="对账单信息-${}"/>
          <zj-table ref="searchTable"
                    :dataList="form.list"
          >
            <zj-table-column type="radio" width="40"/>
            <zj-table-column field="field2" title="对账单名称"/>
            <zj-table-column field="field3" title="买方名称"/>
            <zj-table-column field="field5" title="供应商业务系统编码"/>
            <zj-table-column field="field5" title="供应商名称"/>
            <zj-table-column field="field5" title="对账日期" :formatter="date"/>
            <zj-table-column field="field5" title="入库日期" :formatter="date"/>
            <zj-table-column field="field5" title="预计付款日期" :formatter="date"/>
            <zj-table-column field="field5" title="对账单金额" :formatter="money"/>
            <zj-table-column field="field5" title="是否申请开立债权凭证" :formatter="(obj)=>typeMap(dictionary,obj.cellValue)"/>
            <zj-table-column field="field5" title="对账人" />
            <zj-table-column field="field5" title="对账单来源" />
          </zj-table>
        </el-content-block>
        <el-content-block>
          <zj-header :title="`贸易背景资料（资产编号：）`"/>
          <el-tabs v-model="tabs" type="card" class="zj-tabs-card">
            <el-tab-pane label="贸易合同信息" name="tradeContract" >
              <trade-contract :zjControl="zjControl" :form="form.contractInfo"/>
            </el-tab-pane>
            <el-tab-pane label="发票信息" name="invoice" >
              <invoice :invoiceList="form.invoices"/>
            </el-tab-pane>
            <el-tab-pane label="其他附件" name="attaList" >
              <attaList :attaList="form.otherAttachs"/>
            </el-tab-pane>
          </el-tabs>
        </el-content-block>
      </zj-content-block>

      <!-- 底部工作流状态 -->
      <zj-workflow v-model="workflow" :list="workflowList" v-if="form.financingProductType !== '0'">
        <!-- 审核时 -->
        <el-row slot="right">
          <el-row class="btn-w85 zj-center">
            <zj-button class="back" @click="goParent">返回</zj-button>
          </el-row>
        </el-row>
      </zj-workflow>
      <zj-content-footer  v-if="form.financingProductType == '0'">
        <zj-button class="back" @click="goParent">返回</zj-button>
      </zj-content-footer>

    </zj-content-container>
</template>

<script>
import operateLog from "@modules/workflow/views/components/operateLog";
import tradeContract from './tradeBackgroundInfo/tradeContract'
import invoice from './tradeBackgroundInfo/invoice'
import attaList from './tradeBackgroundInfo/attaList'


export default {
  name: "toDoDetail",
  components: {
    tradeContract,
    invoice,
    attaList,
    operateLog,
  },
  watch: {
    workflow() {
      this.getDetail()
    }
  },
  data() {
    return {
      form:{},
      detail:{},
      dictionary:{},
      tabs:'tradeContract',
      zjControl: {
        getFinancingTransDetail:this.$api.financingTransactionQuery.getFinancingTransDetail,//融资交易查询-详情
        getFinancingTransDirectory:this.$api.financingTransactionQuery.getFinancingTransDirectory,//数据字典
        getFinancingBillInfos:this.$api.financingTransactionQuery.getFinancingBillInfos,//凭证信息
        getOtherInfoByBill:this.$api.financingTransactionQuery.getOtherInfoByBill,//凭证信息

      },
      workflow: 'sqxx',
      workflowList: [
        { label: '融资申请信息', value: 'sqxx' }, { label: '凭证信息', value: 'pzxx' }
      ],
    }
  },
  methods: {
    getDictionary() {
      this.zjControl.getFinancingTransDirectory().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
    getDetail() {
      let params = {
        id : this.row.id,
        serialNo: this.row.serialNo,
      }
      if(this.workflow === 'sqxx') {
        this.zjControl.getFinancingTransDetail(params).then(res=>{
          this.form = res.data
        })
      }
      if(this.workflow === 'pzxx') {
        this.zjControl.getFinancingBillInfos(params).then(res=>{
          this.form = res.data
        })
      }
    },
    agreementDownLoad() {

    },
    attaDownLoad() {},

    handleDataChange(rows) {
      //默认勾选第一个贸易关系
      if(rows&& rows.length) {
        this.$refs.billInfoTable.setRadioRow(rows[0])
        this.handleRadioChange({row: rows[0]})
      }
    },
    handleRadioChange({row}) {
      let params = {
        // busTradeId : row.busTradeId,
        // coreCompanyName : row.buyerName,
        // tradeId : row.tradeId,
      }
      //获取对账单列表
      this.zjControl.queryPhasedAgreePage(params).then(res=>{
        this.form.billList = res.data.phasedAgreeInfoList
        //背景资料信息列表******
      })
    },
  },
  created() {
    this.getApi()
    this.getRow()
    this.getDictionary()
    this.getDetail()
  }
}
</script>

<style scoped lang="less">

</style>
