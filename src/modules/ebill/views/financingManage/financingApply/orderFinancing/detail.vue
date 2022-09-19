<template>
  <div>
    <zj-content-container>
      <!--  订单融资申请  -->
      <div class="quota-manage">
        剩余可用额度：<span>{{form.availableCreditAmount}}</span>
        总额度：<span>{{form.totalCreditAmount}}</span>
      </div>
      <zj-top-header title="订单融资申请"/>
      <zj-content>
      <el-form :model="form" ref="form" :rules="rules" label-width="200px" class="zj-m-t-20">
        <el-row class="hd-row">
          <el-col :span="12">
            <el-form-item label="买方企业名称：" >{{form.buyerName}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="融资企业：" >{{form.sellerName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="融资合同编号：">{{form.contractNo}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="融资合同期限：">
              {{form.contractStartDate?date(form.contractStartDate):''}}
              {{form.contractEndDate?`至 ${date(form.contractEndDate)}`:''}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="应收账款金额：" prop="tranAmt">
              <zj-number-input :precision="2" v-model="form.tranferAmt" @change="handleChange" :min="0.01">
                <template slot="append">元</template>
              </zj-number-input>
              <div>{{form.tranferAmt?digitUp(form.tranferAmt):''}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应收账款转让比例：" prop="tranAmt">
              <zj-number-input v-model="form.discountRate" :max="100" :min="0" @change="handleChange">
                <template slot="append">%</template>
              </zj-number-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="融资申请金额：">
              {{form.tranAmt?`${form.tranAmt}元`:''}}
              {{form.tranAmt?digitUp(form.tranAmt):''}}
              <div>
                <zj-content-tip text="（融资申请金额= 应收账款金额*应收账款转让比例）"/>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="融资月利率：">{{form.factoringFinancingMonthRate?`${form.factoringFinancingMonthRate}%`:''}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="融资开始日：" prop="applyDatetime">
              <zj-date-picker :date.sync="form.applyDatetime" :overNow="true" :format="'yyyy-MM-dd'" @change="handleChange"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="融资到期日：" prop="expireDate">
              <zj-date-picker :date.sync="form.expireDate" :format="'yyyy-MM-dd'" @change="handleChange"
                              :pickerOptions="{ disabledDate:expireDateDisabledDate }"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="预计融资期限：">
              {{date(form.applyDatetime)}}
              {{form.expireDate?`至 ${date(form.expireDate)}`:''}}
              {{form.estimateDays?` 共${date(form.estimateDays)}天`:''}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计利息：">
              {{form.interestAmt?moneyNoSynbol(form.interestAmt):''}}
              <div>
                <zj-content-tip text="（预计利息 = 融资申请金额*融资月利率/30*预计融资天数）" v-if="form.interestAmt"/>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收款银行账号：">{{form.bankAccount}}</el-form-item>
          </el-col>
        </el-row>
        <zj-content-block>
          <zj-content>
          <zj-table ref="searchTable" class="zj-search-table"
                    :dataList="form.phasedAgreementList"
                    :pager="false"
          >
            <zj-table-column field="agreementNo" title="阶段性协议编号" />
            <zj-table-column field="agreementName" title="阶段性协议名称" />
            <zj-table-column field="agreementType" title="协议类型" :formatter="(obj)=>typeMap(dictionary.agreementType,obj.cellValue)"/>
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
          </zj-content>
        </zj-content-block>
      </el-form>
      </zj-content>
      <zj-content-block>
        <zj-header title="融资协议"/>
        <zj-content>
        <el-row class="button-row">
          <zj-button type="text" @click="downloadAgreement">《订单保理融资协议》</zj-button>
        </el-row>
        <div class="explain-text zj-m-l-10 zj-m-t-10">
          <div>注：</div>
          <ol class="explain-content">
            <li class="explain-item">以上额度信息、预计融资期限与预计利息仅供参考，请以实际融资为准。</li>
            <li class="explain-item">剩余可用额度=额度总额-实际已用额度-在途使用额度。</li>
            <li class="explain-item">融资开始日以复核为准。</li>
          </ol>
        </div>
        </zj-content>
      </zj-content-block>

    </zj-content-container>
    <zj-content-footer>
      <zj-button class="submit-button" @click="goParent">上一步</zj-button>
      <zj-button type="primary" @click="submit">提交申请</zj-button>
    </zj-content-footer>
    <submit-dialog ref="submitDialog" :zjControl="zjControl" :form="form"/>
  </div>
</template>

<script>
import submitDialog from '../dialog/submitDialog'
export default {
  name: "orderFinancingDetail",
  components: {
    submitDialog
  },
  data() {
    return {
      zjControl: {
        getFinancingApplyOrderDetail:this.$api.financingApply.getFinancingApplyOrderDetail,//订单融资详情
        getDirectory:this.$api.financingApply.getDirectory,//数据字典
        downloadFinancAgreeTemplate:this.$api.financingApply.downloadFinancAgreeTemplate,//下载融资协议
        submitFinancingOrderApply:this.$api.financingApply.submitFinancingOrderApply,//订单融资提交
        downloadFile:this.$api.baseCommon.downloadFile,//文件下载
      },
      form: {},
      rules: {
        tranAmt: [
          { required: true, message: '请输入融资申请金额', trigger: 'change'},
        ],
        applyDatetime: [
          { required: true, message: '请输入融资开始日', trigger: 'change'},
        ],
        expireDate: [
          { required: true, message: '请输入融资到期日', trigger: 'change'},
        ],
      },
      dictionary:{},
      pickerOptions: {
        disabledDate(time) {
          return time.getDay === 0 || time.getDay === 6
        }
      },
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
        buyerId: this.$route.params.rowData.buyerId,
        discountRate: this.form.discountRate || '',
        tranferAmt: this.form.tranferAmt || '',
        applyDatetime: this.form.applyDatetime || '',
        expireDate: this.form.expireDate || '',
      }
      this.zjControl.getFinancingApplyOrderDetail(params).then(res=>{
        this.form = res.data
      })
    },
    handleChange() {
      this.getDetail()
    },
    downloadAgreement() {
      let params = {
        applyDatetime: this.form.applyDatetime,
        entId: this.form.buyerId,//（订单融资）买方企业id、（凭证/入库融资）选择凭证签发人ID/转让企业ID
        expireDate: this.form.expireDate,
        financingFlag: '',//（凭证/入库融资）融资类型：1-入库融资 2-凭证融资
        idList: [],//（凭证/入库融资）选中的凭证ID集合
        isHtEnterprise: '',
        templateType: 'DDBLRZXY',//DDBLRZXY-订单保理融资协议，RKRZXY-入库融资协议，PZRZXY-凭证融资协议，ZQZRTZ-债权转让通知
        tranferAmt: this.form.tranferAmt,
        discountRate: this.form.discountRate,
      }
      this.zjControl.downloadFinancAgreeTemplate(params)
    },
    attaDownLoad(row) {
      this.zjControl.downloadFile(row.fileId)
    },
    expireDateDisabledDate(date) {
      if (this.form.expireDate) {
        return date.getTime() < this.$moment(this.form.applyDatetime)
      }
    },
    submit(){
      this.$refs.form.validate(boo=>{
        if(boo) {
          this.$refs.submitDialog.open({form: this.form}, true)

        }
      })
    },
  },
  created() {
    this.getApi()
    this.getDic()
    this.getDetail()
    console.log(this.$route.params.rowData.buyerId)
  }
}
</script>

<style scoped lang="less">
.quota-manage {
  height: 40px;
  line-height:40px;
  text-align: right;
  margin-bottom: 20px;
  padding-right: 20px;
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
