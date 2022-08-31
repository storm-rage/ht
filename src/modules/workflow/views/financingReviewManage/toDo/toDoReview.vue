<template>
    <zj-content-container>
      <!--  融资审核  -->
      <zj-top-header title="融资审核"/>
      <zj-content-block v-if="workflow === 'sqxx'">
          <el-form :model="form" ref="form" :rules="rules" label-width="200px" class="zj-m-t-20">
            <trans-info :form="form.transInfo" :dictionary="dictionary"/>
            <financing-apply-info :form="form.financingApplyInfo" :voucherList="form.voucherList"
                                  :proType="form.transInfo.financingProductType" :phased-agreement-list="form.phasedAgreementList"
            />
            <agreement-info-list :dataList="form.agreementInfoList"/>

            <zj-content-block v-if="form.transInfo.financingProductType !== '2'">
              <zj-header title="保理合同信息"/>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="保理合同编号：">{{form.blContractInfo.contractNo}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.transInfo.financingProductType !== '0'">
                  <el-form-item label="保理类型：">{{form.blContractInfo.factorType}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="总额度：">{{form.blContractInfo.adjustCreditAmount}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.transInfo.financingProductType === '0'">
                  <el-form-item label="剩余可用金额：">{{form.blContractInfo.availableCreditAmount}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8" v-if="form.transInfo.financingProductType === '0'">
                  <el-form-item label="额度有效期：">
                    {{date(form.blContractInfo.factoringCreditStartDate)}}
                    {{form.blContractInfo.factoringCreditEndDate?`至${date(form.blContractInfo.factoringCreditEndDate)}`:''}}
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.transInfo.financingProductType !== '0'">
                  <el-form-item label="剩余可用金额：">{{form.blContractInfo.availableCreditAmount}}</el-form-item>
                </el-col>
                <el-col :span="8" v-if="form.transInfo.financingProductType !== '0'">
                  <el-form-item label="保理合同到期日：">
                    {{date(form.blContractInfo.contractEndDateDays)}}
                  </el-form-item>
                </el-col>
              </el-row>
            </zj-content-block>
            <zj-content-block v-if="form.transInfo.financingProductType !== '0'">
              <zj-header title="总控额度信息"/>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="供应商总控额度：">{{form.voucherCreditInfo.totalCreditAmount}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="剩余可用额度：">{{form.voucherCreditInfo.availableCreditAmount}}</el-form-item>
                </el-col>
              </el-row>
            </zj-content-block>
            <!--  操作记录  -->
            <operate-record-list :log-list="form.operateRecordList?form.operateRecordList:[]"/>
            <!--  附件  -->
            <other-attach-list :dataList="form.otherAttachList"
                               :pro-type="form.transInfo.financingProductType"
                               :dictionary="dictionary"
                               :zjControl="zjControl"
                               :ope-type="true"
                               :biz-id="row.bizId"
            />
            <!--  审核意见  -->
            <zj-content-block>
              <zj-header title="审核意见"/>
              <el-form-item label="是否提交风控处理：" prop="opinion">
                <el-radio-group v-model="form.opinion">
                  <el-radio label="是"></el-radio>
                  <el-radio label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="审核意见：">
                <el-input type="textarea" placeholder="审批拒绝时，审批意见必填" v-model="form.remark"></el-input>
              </el-form-item>
            </zj-content-block>
          </el-form>
      </zj-content-block>

      <zj-content-block v-if="workflow === 'pzxx'">
        <zj-content-block>
          <zj-header title="凭证信息"/>
          <zj-table ref="searchTable" class="zj-search-table"
                    :dataList="form.voucherList"
                    @radio-change="handleRadioChange"
                    :radio-config="{highlight: true}"
                    :pager="false"
          >
            <zj-table-column type="radio" width="40"/>
            <zj-table-column field="ebillCode" title="海e单编号" />
            <zj-table-column field="rootCode" title="原始海e单编号" />
            <zj-table-column field="writerName" title="凭证开单人" />
            <zj-table-column field="transferName" title="转让企业" />
            <zj-table-column field="holderDate" title="签发日期" :formatter="date"/>
            <zj-table-column field="ebillAmt" title="海e单金额" :formatter="money"/>
            <zj-table-column field="expireDate" title="海e单到期日" :formatter="date"/>
          </zj-table>
        </zj-content-block>
        <zj-content-block>
          <zj-header :title="`对账单信息-${ebillParams.ebillCode?ebillParams.ebillCode:''}`"/>
          <zj-table ref="searchTable" :dataList="[{...form.accountBillInner}]"
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
            <zj-table-column field="isApplyVoucher" title="是否申请开立债权凭证" :formatter="(obj)=>typeMap(dictionary,obj.cellValue)"/>
            <zj-table-column field="checkBillPerson" title="对账人" />
            <zj-table-column field="billSource" title="对账单来源" />
          </zj-table>
        </zj-content-block>
        <zj-content-block>
          <zj-header :title="`贸易背景资料（资产编号：${form.accountBillInner?form.accountBillInner.acctBillCode:''}）`"/>
          <el-tabs v-model="tabs" class="zj-tabs-card">
            <el-tab-pane label="贸易合同信息" name="tradeContract" >
              <trade-contract :dataList="form.contracts"/>
            </el-tab-pane>
            <el-tab-pane label="发票信息" name="invoice" >
              <invoice :dataList="form.invoices"/>
            </el-tab-pane>
            <el-tab-pane label="其他附件" name="attaList" >
              <attaList :dataList="form.otherAttachs"/>
            </el-tab-pane>
          </el-tabs>
        </zj-content-block>
      </zj-content-block>

      <!-- 底部工作流状态 -->
      <zj-workflow v-model="workflow" :list="workflowList" v-if="form.transInfo.financingProductType !== '0'">
        <!-- 审核时 -->
        <el-row slot="right">
          <el-row class="btn-w85 zj-center">
            <zj-button type="primary" @click="recheck('复核通过')">审核通过</zj-button>
            <zj-button class="btn-warning" @click="recheck('复核拒绝')" v-if="form.transInfo.workflowState === 'F003'">审核拒绝</zj-button>
            <zj-button class="btn-warning" @click="recheck('复核拒绝')" v-if="form.transInfo.workflowState === 'F004'">驳回上一级</zj-button>
            <zj-button class="btn-warning" @click="recheck('复核拒绝')">审核拒绝</zj-button>
            <zj-button class="back" @click="goParent">返回</zj-button>
          </el-row>
        </el-row>
      </zj-workflow>
      <!--   融资产品类型：0-订单融资 1-入库融资 2-凭证融资   -->
      <zj-content-footer v-if="form.transInfo.financingProductType === '0'">
        <zj-button type="primary" @click="recheck('复核通过')">审核通过</zj-button>
        <zj-button class="btn-warning" @click="recheck('复核拒绝')" v-if="form.transInfo.workflowState === 'F003'">审核拒绝</zj-button>
        <zj-button class="btn-warning" @click="recheck('复核拒绝')" v-if="form.transInfo.workflowState === 'F004'">驳回上一级</zj-button>
        <zj-button class="back" @click="goParent">返回</zj-button>
      </zj-content-footer>

      <pass-recheck-dialog ref="passRecheckDialog" :zj-control="zjControl" :zj-btn="zjBtn"/>
    </zj-content-container>
</template>

<script>
import passRecheckDialog from "./dialog/passRecheckDialog";
import transInfo from "../components/transInfo";
import financingApplyInfo from "../components/financingApplyInfo";
import agreementInfoList from "../components/agreementInfoList";
import otherAttachList from "../components/otherAttachList";
import operateRecordList from "../components/operateRecordList";

export default {
  name: "toDoReview",
  components: {
    passRecheckDialog,
    transInfo,
    financingApplyInfo,
    agreementInfoList,
    otherAttachList,
    operateRecordList,
  },
  data() {
    return {
      zjControl: {
        getAuditDirectory:this.$api.financingAuditManageWorkflow.getAuditDirectory,//数据字典
        getWaitAccountBillDetail:this.$api.financingAuditManageWorkflow.getWaitAccountBillDetail,//融资审核-根据凭证信息获取对账单信息
        getWaitFinancingDetail:this.$api.financingAuditManageWorkflow.getWaitFinancingDetail,//融资审核-申请信息
        getWaitVoucherDetail:this.$api.financingAuditManageWorkflow.getWaitVoucherDetail,//融资审核-融资凭证信息
        submitFirstAudit:this.$api.financingAuditManageWorkflow.submitFirstAudit,//融资审核-保理公司初审提交
        submitReviewAudit:this.$api.financingAuditManageWorkflow.submitReviewAudit,//融资审核-保理公司复审提交
        maintainAttach:this.$api.financingAuditManageWorkflow.maintainAttach,//融资审核-保理公司初审-附件维护
        againPush:this.$api.financingAuditManageWorkflow.againPush,//融资审核-保理公司重新推送
        auditAbort:this.$api.financingAuditManageWorkflow.auditAbort,//融资审核-保理公司直接作废
      },
      form:{
        transInfo: {},
        financingApplyInfo: {},
        voucherList: [],
        agreementInfoList: [],
        opinion:'',
        remark:'',
      },
      rules: {
        opinion: [
          { required:true,message:'请选择是否提交风控处理！',trigger:'blur'},
        ]
      },
      detail:{},
      tabs:'tradeContract',
      dictionary:{},
      ebillParams: {},//凭证信息
      workflow: 'sqxx',
      workflowList: [
        { label: '融资申请信息', value: 'sqxx' }, { label: '凭证信息', value: 'pzxx' }
      ],
    }
  },
  methods: {
    getDic() {
      this.zjControl.getAuditDirectory().then(res=>{
        let dic = {
          attachTypesTable:JSON.parse(
            JSON.stringify(res.data.attachTypes)
              .replace(/code/g,'status')
              .replace(/desc/g,'label')
          )
        }
        this.dictionary = Object.assign(dic,res.data)
      })
    },
    getPageDetail() {
      let params = {
        bizId: this.row.bizId,
        serialNo: this.row.serialNo,
      }
      if(this.workflow === 'sqxx') {
        //待办详情-申请信息
        this.zjControl.getWaitFinancingDetail(params).then(res=>{
          this.form = res.data
        })
      }
      if(this.workflow === 'pzxx') {
        //待办详情-融资凭证信息
        this.zjControl.getWaitVoucherDetail(params).then(res=>{
          this.form = res.data
        })
      }
    },
    handleRadioChange({ row }){
      //待办详情-根据凭证信息获取对账单信息,贸易背景资料
      this.ebillParams = row
      let params = {
        serialNo: this.row.serialNo,
        bizId: this.row.bizId,
        ebillCode : row.ebillCode,
      }
      this.zjControl.getWaitAccountBillDetail(params).then(res=>{
        this.form = {
          ...this.form,
          ...res.data,
        }
      })
    },
    recheck(flag) {
      this.$refs.form.validate(boo=>{
        if(boo) {
          if(flag === '复核拒绝' && !this.form.remark) {
            return this.$message.error('审批拒绝时，审批意见必填！')
          }
          this.$refs.passRecheckDialog.open(flag,this.form,this.row.bizId)
        }
      })
    },
  },
  created() {
    this.getApi()
    this.getRow()
    this.getDic()
    this.getPageDetail()
  }
}
</script>

<style scoped lang="less">

</style>
