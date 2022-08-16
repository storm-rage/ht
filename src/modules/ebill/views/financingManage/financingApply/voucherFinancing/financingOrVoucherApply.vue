<template>
    <zj-content-container>
      <!--  入库融资申请/凭证融资申请  -->
      <zj-content-block>
          <div class="quota-manage">
            剩余可用额度：<span>{{form.surplusQuota}}</span>
            总额度：<span>{{form.totalQuota}}</span>
          </div>
          <zj-top-header title="入库融资申请/凭证融资申请"/>
          <el-form :model="form" ref="form" :rules="rules" label-width="200px" class="zj-m-t-20">
            <el-row class="hd-row">
              <el-form-item label="融资企业：">{{form.sellerName}}</el-form-item>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="融资合同编号：">{{form.contractNo}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="融资合同期限：">
                  {{form.contractStartDate}}{{form.contractEndDate?`至${form.contractEndDate}`:''}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="融资申请金额：" prop="tranAmt">
                  <zj-number-input :precision="2" v-model="form.tranAmt">
                    <template slot="append">元</template>
                  </zj-number-input>
                  <div>{{form.tranAmt?digitUp(form.tranAmt):''}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="融资开始日：" prop="applyDatetime">
                  <zj-date-picker :date.sync="form.applyDatetime" :overNow="true" :format="'yyyy-MM-dd'"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="融资折扣率：">{{form.financingContractNo}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="申请转让金额：">
                  <div>{{form.tranferAmt?money(form.tranferAmt):''}}</div>
                  <zj-content-tip text="（申请转让金额=融资申请金额/折扣率 ）" v-if="form.tranferAmt"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="预计融资期限：">
                  {{form.finConStartDate}}
                  {{form.finConEndDate?`至${form.finConEndDate}`:''}}
                  {{form.estimateDays?`共${form.estimateDays}天`:''}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="融资月利率：">{{form.rdFinancingMonthRate}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="预计利息：">
                  <div>{{form.interestAmt?money(form.interestAmt):''}}</div>
                  <zj-content-tip text="（预计利息 = 融资申请金额*融资月利率/30*预计融资天数）" v-if="form.interestAmt"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="收款银行账号：">{{form.bankAccount}}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        <zj-content-block>
          <zj-table ref="searchTable" class="zj-search-table"
                    :dataList="form.ebBillModelList"
                    :pager="false"
          >
            <zj-table-column field="ebillCode" title="债权凭证编号" />
            <zj-table-column field="rootCode" title="原始债权凭证编号" />
            <zj-table-column field="writerName" title="凭证签发人" />
            <zj-table-column field="transferName" title="转让企业" />
            <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money"/>
            <zj-table-column field="voucherAcc" title="剩余可用金额" :formatter="money"/>
            <zj-table-column field="holderDate" title="凭证持有日期" :formatter="date"/>
            <zj-table-column field="expireDate" title="凭证到期日" :formatter="date"/>
          </zj-table>
          <el-row class="slotRows zj-m-l-10 zj-m-t-10" >
            凭证金额合计：{{form.totalAmt?moneyNoSynbol(form.totalAmt):''}}
          </el-row>
        </zj-content-block>
        <zj-content-block>
          <zj-header title="融资协议"/>
          <el-row class="button-row">
            <zj-button type="text" @click="downloadAgreement('RKRZXY')">《入库融资协议》</zj-button>
            <zj-button type="text" @click="downloadAgreement('PZRZXY')">《凭证融资协议》</zj-button>
          </el-row>
          <div class="explain-text zj-m-l-10 zj-m-t-10">
            <div>注：</div>
            <ol class="explain-content">
              <li class="explain-item">以上额度信息、预计融资期限与预计利息仅供参考，请以实际融资为准。</li>
              <li class="explain-item">剩余可用额度=额度总额-实际已用额度-在途使用额度。</li>
            </ol>
          </div>
        </zj-content-block>
        <zj-content-block>
          <zj-header title="贸易背景"/>
          <!--    贸易背景      -->
          <el-row class="button-row">
            <zj-button type="primary" @click="toTradeBackground">贸易背景</zj-button>
          </el-row>

        </zj-content-block>
      </zj-content-block>

      <zj-content-footer>
        <zj-button class="back" @click="goParent">上一步</zj-button>
        <zj-button type="primary" @click="submit">提交申请</zj-button>
      </zj-content-footer>
      <submit-dialog ref="submitDialog" :zjControl="zjControl" :form="form"/>
    </zj-content-container>
</template>

<script>
import submitDialog from '../dialog/submitDialog'

export default {
  name: "billFinancingDetail",
  components: {
    submitDialog
  },
  data() {
    return {
      zjControl: {
        getFinancingApplyBillDetail:this.$api.financingApply.getFinancingApplyBillDetail,//入库/凭证融资详情
        getDirectory:this.$api.financingApply.getDirectory,//数据字典
        downloadFinancAgreeTemplate:this.$api.financingApply.downloadFinancAgreeTemplate,//下载融资协议
        submitFinancingBillApply:this.$api.financingApply.submitFinancingBillApply,//入库/凭证融资提交

        downloadFile:this.$api.baseCommon.downloadFile,//文件下载
      },
      form:{},
      rules:{
        tranAmt: [
          { required: true, message: '请输入融资申请金额', trigger: 'change'},
        ],
        applyDatetime: [
          { required: true, message: '请输入融资开始日', trigger: 'change'},
        ],
      },
      dictionary:{},
    }
  },
  methods: {
    getDic() {
      this.zjControl.getDirectory().then(res=>{
        this.dictionary = res.data
      })
    },
    getDetail() {
      let params = {
        tranAmt: this.form.tranAmt,
        applyDatetime: this.form.applyDatetime,
        entId: [],
        idList: [],
      }
      this.zjControl.getFinancingApplyBillDetail(params).then(res=>{
        this.form = res.data
      })
    },
    downloadAgreement(item) {

      let params = {
        applyDatetime: this.form.applyDatetime,
        entId: this.form.buyerId,//（订单融资）买方企业id、（凭证/入库融资）选择凭证签发人ID/转让企业ID
        expireDate: this.form.expireDate,
        financingFlag: this.form.financingFlag,//（凭证/入库融资）融资类型：1-入库融资 2-凭证融资
        idList: [],//（凭证/入库融资）选中的凭证ID集合
        isHtEnterprise: this.form.isGysHtEnterprise,
        templateType: item,//DDBLRZXY-订单保理融资协议，RKRZXY-入库融资协议，PZRZXY-凭证融资协议，ZQZRTZ-债权转让通知
        tranAmt: this.form.tranAmt,
      }
      this.zjControl.downloadFinancAgreeTemplate(params)
    },
    toTradeBackground() {
      let testArr = [{a:1}, {b:2}, ]//测试数据
      this.goChild('tradeBackgroundMaintain', {ebBillModelList: [...testArr]})
      // this.goChild('tradeBackgroundMaintain', {ebBillModelList: this.form.ebBillModelList})
    },
    submit(){
      this.$refs.form.validate(boo=>{
        if(boo){
          console.log(this.zjControl)
          this.$refs.submitDialog.open({form: this.form}, true)
        }
      })
    },
  },
  created() {
    this.getApi()
    this.getDic()
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
    left: 50%;
    transform: translateX(-50%);
    content: '';
    display: block;
    width: calc(100% - 160px);
    height: 1px;
    border-bottom: 1px dashed #cbcbcb;
  }
}

</style>
