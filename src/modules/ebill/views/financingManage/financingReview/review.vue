<template>
  <div>
    <zj-content-container>
      <!--  订单融资复核  -->
      <div class="quota-manage">
        剩余可用额度：{{form.availableCreditAmount}}
        总额度：{{form.totalCreditAmount}}
      </div>
      <zj-content>
        <zj-top-header :title="`${titleInfo}复核`"/>
        <el-form :model="form" ref="form" label-width="200px" class="zj-m-t-20">
          <el-row class="hd-row">
            <el-row>
              <el-col :span="12" v-if="row.financingProductType === '0'">
                <el-form-item label="买方企业名称：" >{{form.baseFinancingInfo.buyerEntName}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="融资企业：" >{{form.baseFinancingInfo.fromEntName}}</el-form-item>
              </el-col>
            </el-row>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="融资合同编号：">{{form.baseFinancingInfo.contractNo}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="融资合同期限：">
                {{date(form.baseFinancingInfo.contractTimeStart)}}
                {{form.baseFinancingInfo.contractTimeEnd?`至 ${date(form.baseFinancingInfo.contractTimeEnd)}`:''}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" v-if="row.financingProductType === '0'">
              <el-form-item label="应收账款金额：">
                <zj-number-input :precision="2" v-model="form.baseFinancingInfo.transferAmt" disabled>
                  <template slot="append">元</template>
                </zj-number-input>
                <div>{{form.baseFinancingInfo.transferAmt?digitUp(form.baseFinancingInfo.transferAmt):''}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="row.financingProductType === '0'">
              <el-form-item label="应收账款转让比例：">
                <zj-number-input :precision="2" v-model="form.baseFinancingInfo.discountRate" disabled>
                  <template slot="append">%</template>
                </zj-number-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="row.financingProductType !== '0'">
              <el-form-item label="申请转让金额：">
                <zj-number-input :precision="2" v-model="form.baseFinancingInfo.transferAmt" disabled>
                  <template slot="append">元</template>
                </zj-number-input>
                <div>{{form.baseFinancingInfo.transferAmt?digitUp(form.baseFinancingInfo.transferAmt):''}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="row.financingProductType !== '0'">
              <el-form-item label="融资比例：">
                {{form.baseFinancingInfo.discountRate?`${form.baseFinancingInfo.discountRate}%`:''}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="融资申请金额：" >
                {{form.baseFinancingInfo.tranAmt? `${form.baseFinancingInfo.tranAmt}元`:''}}
                {{form.baseFinancingInfo.tranAmt?digitUp(form.baseFinancingInfo.tranAmt):''}}
                <div>
                  <zj-content-tip text="（融资申请金额= 应收账款金额*应收账款转让比例）"/>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="row.financingProductType === '0'">
              <el-form-item label="融资月利率：">{{form.baseFinancingInfo?`${form.baseFinancingInfo.interestRate}%`:''}}</el-form-item>
            </el-col>
            <el-col :span="12" v-if="row.financingProductType !== '0'">
              <el-form-item label="融资开始日：">
                <zj-date-picker placeholder="年/月/日" :date.sync="form.baseFinancingInfo.contractTimeStart" disabled ></zj-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="预计融资期限：">
                {{date(form.baseFinancingInfo.estimateTimeStart)}}
                {{form.baseFinancingInfo.estimateTimeEnd?`至 ${date(form.baseFinancingInfo.estimateTimeEnd)}`:''}}
                {{form.baseFinancingInfo.estimateDays?`共${form.baseFinancingInfo.estimateDays}天`:''}}
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="row.financingProductType !== '0'">
              <el-form-item label="融资月利率：">
                {{form.baseFinancingInfo.interestRate?`${form.baseFinancingInfo.interestRate}%`:''}}
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="row.financingProductType === '0'">
              <el-form-item label="预计利息：">
                {{form.baseFinancingInfo.interestAmt?money(form.baseFinancingInfo.interestAmt):''}}
                <div>
                  <zj-content-tip text="（预计利息 = 融资申请金额*融资月利率/30*预计融资天数）"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" v-if="row.financingProductType !== '0'">
              <el-form-item label="预计利息：">
                {{form.baseFinancingInfo.interestAmt?money(form.baseFinancingInfo.interestAmt):''}}
                <div>
                  <zj-content-tip text="（预计利息 = 融资申请金额*融资月利率/30*预计融资天数）"/>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收款银行账号：">{{form.baseFinancingInfo.receiptAcctNo}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <zj-content-block v-if="row.financingProductType === '0'">
          <zj-table ref="searchTable" class="zj-search-table"
                    :dataList="form.phasedAgreements"
                    :pager="false"
          >
            <zj-table-column field="agreementNo" title="阶段性协议编号" />
            <zj-table-column field="agreementName" title="阶段性协议名称" />
            <zj-table-column field="agreementStartDate" title="协议签订日期" :formatter="date"/>
            <zj-table-column field="agreementEstimateEndDate" title="协议预计到期日" :formatter="date"/>
            <zj-table-column field="agreementStatus" title="状态" :formatter="(obj)=>typeMap(dictionary.agreementStatus,obj.cellValue)"/>
            <zj-table-column field="fileName" title="附件" />
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{row}">
                <zj-button type="text" @click="attaDownLoad(row)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content-block>
        <zj-content-block v-if="row.financingProductType !== '0'">
          <zj-table ref="searchTable" class="zj-search-table"
                    :dataList="form.billInfo?form.billInfo.billInfoItems:[]"
                    :pager="false"
          >
            <zj-table-column field="rootCode" title="原始凭证编号" />
            <zj-table-column field="ebillCode" title="凭证编号" />
            <zj-table-column field="writerName" title="凭证签发人" />
            <zj-table-column field="transferName" title="转让企业" />
            <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money"/>
            <zj-table-column field="holderDate" title="凭证持有日期" :formatter="date"/>
            <zj-table-column field="expireDate" title="凭证到期日" :formatter="date"/>
          </zj-table>
          <el-row class="zj-m-t-10 zj-m-l-20" >
            {{$store.getters['user/productName']}}金额合计：{{moneyNoSynbol(form.billInfo?form.billInfo.totalEbillAmt:'')}}
          </el-row>
        </zj-content-block>
        <zj-content-block>
          <div class="explain-text zj-m-l-20">
            <div>注：</div>
            <ol class="explain-content">
              <li class="explain-item">以上额度信息、预计融资期限与预计利息仅供参考，请以实际融资为准。</li>
              <li class="explain-item">剩余可用额度=额度总额-实际已用额度-在途使用额度。</li>
            </ol>
          </div>
        </zj-content-block>
      </zj-content>
    </zj-content-container>
    <zj-content-footer>
      <el-checkbox v-model="checked">我已阅读并同意
        <el-link type="primary" @click="getAgreement('DDBLRZXY')" v-if="row.financingProductType === '0'">《订单保理融资协议》</el-link>
        <el-link type="primary" @click="getAgreement('RKRZXY')" v-if="row.financingProductType === '1'">《入库融资协议》</el-link>
        <el-link type="primary" @click="getAgreement('PZRZXY')" v-if="row.financingProductType === '2'">《凭证融资协议》</el-link>
      </el-checkbox>
      <zj-button type="primary" @click="reviewResolve">复核通过</zj-button>
      <zj-button class="reject" @click="reject">拒绝</zj-button>
    </zj-content-footer>
    <!--  复核通过  -->
    <submit-dialog ref="submitDialog" :zjControl="zjControl" :financingId="row.id"/>
    <!--  拒绝  -->
    <reject-dialog ref="rejectDialog" :zjControl="zjControl" :financingId="row.id"/>
    <!--  云证书  -->
    <zj-certuficate ref="ZjCertuficate"/>
  </div>
</template>

<script>
import submitDialog from './submitDialog'
import rejectDialog from './rejectDialog'
export default {
  name: "reviewDetail",
  components: {
    submitDialog,rejectDialog
  },
  computed: {
    titleInfo() {
      return this.typeMap(this.dictionary.financingProductType,this.row.financingProductType)
    }
  },
  data() {
    return {
      zjControl: {
        getDirectory: this.$api.financingReview.getDirectory,//数据字典
        getFinancingReviewDetail: this.$api.financingReview.getFinancingReviewDetail,//详情
        queryFinancingReviewPage: this.$api.financingReview.queryFinancingReviewPage,//查询
        submitFinancingReview: this.$api.financingReview.submitFinancingReview,//提交
        downloadTemplate:this.$api.financingReview.downloadTemplate,//下载协议模板
      },
      form: {
        baseFinancingInfo: {},
      },
      dictionary: {},
      checked: false,
    }
  },
  methods: {
    getDic() {
      this.zjControl.getDirectory().then(res=> {
        this.dictionary = res.data
      })
    },
    getDetail() {
      let params = {
        financingProductType: this.row.financingProductType,
        id : this.row.id ,
      }
      this.zjControl.getFinancingReviewDetail(params).then(res=>{
        this.form = res.data
      })
    },
    attaDownLoad(row) {
      this.$api.baseCommon.downloadFile({
        fileId: row.fileId,
        fileName: row.fileName,
      })
    },
    reject() {
      if(!this.checked) {
        return this.$message.error('请勾选我已阅读并同意')
      }
      if(this.checked) {
        this.$refs.rejectDialog.open({form: this.form}, true)
      }
    },
    reviewResolve() {
      if(!this.checked) {
        return this.$message.error('请勾选我已阅读并同意')
      }
      if(this.checked) {
        this.$refs.submitDialog.open({form: this.form}, true)
      }
    },
    getAgreement(type) {
      //下载模板类型: DDBLRZXY-订单保理融资协议，RKRZXY-入库融资协议，PZRZXY-凭证融资协议
      let params = {
        id: this.row.id,
        templateType: type,//下载模板类型: WTSQS-委托授权书,GRXXSQS-个人信息授权书
      }
      this.zjControl.downloadTemplate(params)
    }
  },
  created() {
    this.getApi()
    this.getRow()
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
  padding-bottom: 20px;
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
