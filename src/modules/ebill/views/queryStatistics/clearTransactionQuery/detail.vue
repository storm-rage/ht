<template>
  <div>
    <zj-content-container>
      <!--  凭证尾款清算交易详情  -->
      <zj-top-header title="凭证尾款清算交易详情"></zj-top-header>
      <zj-content-block>
        <el-form :model="form" ref="form" label-width="200px" class="financingForm">
          <zj-content-block>
            <zj-header title="交易信息"></zj-header>
            <zj-content>
            <el-row>
              <el-col :span="8">
                <el-form-item label="申请流水号：" >{{form.tranInfo.serialNo}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请时间：" >{{form.tranInfo.applyDatetime}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请状态：" >{{form.tranInfo.applyStatus?typeMap(dictionary.applyStatus,form.tranInfo.applyStatus):'-'}}</el-form-item>
              </el-col>
            </el-row>
            </zj-content>
          </zj-content-block>
          <zj-content-block>
            <zj-header title="基础信息"></zj-header>
            <zj-content>
            <el-row>
              <el-col :span="8">
                <el-form-item label="收款人名称：" >{{form.basicInfo.bankAccname}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="签发人：" >{{form.basicInfo.payEntName}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="待清算尾款金额总计：" >{{money(form.basicInfo.totaloddAmt)}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="业务描述：" >{{form.basicInfo.bizDesc}}</el-form-item>
              </el-col>
            </el-row>
              <zj-collapse title="供应商收款银行账号" class="zj-m-t-10">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="收款账户名称：" >{{form.basicInfo.bankAccname}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="收款账号：" >{{form.basicInfo.bankAccno}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="收款账户开户行：" >{{form.basicInfo.bankName}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="银行联行号：" >{{form.basicInfo.bankNo}}</el-form-item>
                  </el-col>
                </el-row>
              </zj-collapse>

            </zj-content>
          </zj-content-block>
          <zj-content-block>
            <zj-header :title="`待清算${clearType}`"></zj-header>
            <zj-content>
              <zj-table ref="waitClearInfoTable" class="zj-search-table" :pager="false"
                        :dataList="form.waitClearInfoList"
                        @radio-change="handleRadioChange"
                        :radio-config="{highlight: true}"
                        v-if="row.clearType === '00' || row.clearType === '01'"
              >
                <zj-table-column type="radio" width="40" v-if="row.clearType === '01'"/>
                <zj-table-column field="rootCode" :title="`原始${productName}编号`" />
                <zj-table-column field="repaymentOrderNo" title="收款单号" />
                <zj-table-column field="capitalSerialno" title="资金流水号" />
                <zj-table-column field="ebillCode" :title="`${productName}编号`" />
                <zj-table-column field="holderName" title="开单人" />
                <zj-table-column field="openDate" title="签发日期" :formatter="date"/>
                <zj-table-column field="holderName" title="原始持有人" v-if="row.clearType === '00'"/>
                <zj-table-column field="holderName" title="当前持有人" v-if="row.clearType === '00'"/>
                <zj-table-column field="ebillAmt" :title="`${productName}金额`" :formatter="money"/>
                <zj-table-column field="oddAmt" title="尾款金额" :formatter="money" v-if="row.clearType === '01'"/>
                <zj-table-column field="expireDate" :title="`${productName}到期日`" :formatter="date"/>
                <zj-table-column field="actualExpireDate" :title="`${productName}实际到期日`" :formatter="date"/>
                <zj-table-column field="repaymentEntName" title="收款人" v-if="row.clearType === '01'"/>
                <zj-table-column field="payAmt" title="最终付款金额" v-if="row.clearType === '00'"/>
              </zj-table>
              <zj-table ref="waitClearInfoTable" class="zj-search-table" :pager="false"
                        :dataList="form.waitClearInfoList"
                        @radio-change="handleRadioChange"
                        :radio-config="{highlight: true}"
              >
<!--                v-if="row.clearType === '02' || row.clearType === '03'"-->

<!--                <zj-table-column type="radio" width="40" v-if="row.clearType === '03'"/>-->
                <zj-table-column type="radio" width="40" />
                <zj-table-column field="payEntCode" title="核心企业代码" />
                <zj-table-column field="payEntName" title="核心企业名称" />
                <zj-table-column field="holderCode" title="供应商编码" />
                <zj-table-column field="holderName" title="供应商名称" />
                <zj-table-column field="capitalSerialno" title="资金流水号" />
                <zj-table-column field="repaymentOrderNo" title="收款单号" />
                <zj-table-column field="confirmRepaymentDate" title="确认收款日期" :formatter="date" v-if="row.clearType === '02'"/>
                <zj-table-column field="repayDate" title="还款日期" :formatter="date" v-if="row.clearType === '03'"/>
                <zj-table-column field="confirmRepaymentAmt" title="确认收款金额" :formatter="money" v-if="row.clearType === '02'"/>
                <zj-table-column field="actualPaymentAmt" title="实际付款金额" :formatter="money" v-if="row.clearType === '02'"/>
                <zj-table-column field="oddAmt" title="尾款金额" :formatter="money" v-if="row.clearType === '03'"/>
              </zj-table>
            </zj-content>
          </zj-content-block>
          <!--     清算类型：00凭证清算，01凭证尾款清算，02订单清算，03订单尾款清算，04提前还款清算     -->
<!--          <zj-content-block v-if="row.clearType === '01' || row.clearType === '03'">-->
          <zj-content-block >
            <zj-header :title=" `融资详情${ row.clearType === '01' ? '-' + billNo : '' }`"></zj-header>
            <zj-content>
            <el-row>
              <el-col :span="8">
                <el-form-item label="融资流水号：" >{{form.financeInfo?form.financeInfo.financingSerialno:''}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="放款单号：" >{{form.financeInfo?form.financeInfo.paymentOrderNo:''}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="融资金额：" >{{form.financeInfo?money(form.financeInfo.ebillAmt):''}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="融资类型：" >{{form.financeInfo?form.financeInfo.financingProductType:''}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="融资开始日：" >{{form.financeInfo?date(form.financeInfo.applyDatetime):''}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="融资到期日：" >{{form.financeInfo?date(form.financeInfo.expireDate):''}}</el-form-item>
              </el-col>
            </el-row>
            <div v-if="row.clearType === '01'">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="实际融资到期日：" >{{form.financeInfo?date(form.financeInfo.actualExpireDate):''}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="融资月利率：" >{{form.financeInfo?form.financeInfo.interestRate:''}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际计息天数：" >{{form.financeInfo?form.financeInfo.estimateDays:''}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="实际利息：" >{{form.financeInfo?form.financeInfo.interestAmt:''}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际尾款金额：" >{{form.financeInfo?form.financeInfo.oddAmt:''}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="还款状态：" >{{form.financeInfo?typeMap(dictionary.applyType,form.financeInfo.repaymentFlag):''}}</el-form-item>
                </el-col>
              </el-row>
            </div>
            <div v-if="row.clearType === '03'">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="融资月利率：" >{{form.financeInfo?`${form.financeInfo.interestRate}%`:''}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="已还款本金：" >{{form.financeInfo?money(form.financeInfo.interestRate):''}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="往期未偿还利息：" >{{form.financeInfo?money(form.financeInfo.unrepaymentInterestAmt):''}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="利息起算日：" >{{form.financeInfo?date(form.financeInfo.estimateTimeStart):''}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="本次还款日期：" >{{form.financeInfo?date(form.financeInfo.estimateTimeEnd):''}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际计息天数：" >{{form.financeInfo?form.financeInfo.estimateDays:''}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="本次还款金额：" >{{form.financeInfo?date(form.financeInfo.repaymentAmt):''}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="本次还款本金：" >{{form.financeInfo?date(form.financeInfo.repaymentPrincipalAmt):''}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="本次还款利息：" >{{form.financeInfo?form.financeInfo.repaymentInterestAmt:''}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="还款状态：" >{{form.financeInfo?typeMap(dictionary.applyType,form.financeInfo.repaymentFlag):''}}</el-form-item>
                </el-col>
              </el-row>
            </div>
            </zj-content>
          </zj-content-block>
          <zj-content-block>
            <zj-header title="附件信息"></zj-header>
            <zj-content>
            <zj-table
              :pager="false"
              ref="searchTable"
              :dataList="form.attachInfoList"
            >
              <zj-table-column field="index" title="序号" />
              <zj-table-column field="fileName" title="附件名称" />
              <zj-table-column field="remark" title="附件说明" />
              <zj-table-column title="操作" >
                <template v-slot="{row}">
                  <zj-button type="text" @click="attaDownload(row.fileId)">下载</zj-button>
                </template>
              </zj-table-column>
            </zj-table>
            </zj-content>
          </zj-content-block>
          <!--操作记录 -->
          <operate-log :logList="form.oprateRecordList"></operate-log>

        </el-form>
      </zj-content-block>
    </zj-content-container>
    <zj-content-footer>
      <zj-button class="submit-button" @click="goParent">返回</zj-button>
    </zj-content-footer>
  </div>
</template>

<script>
import operateLog from "../../../../workflow/views/components/operateLog";
export default {
  name: "detail",
  components: {
    operateLog
  },
  computed: {
    clearType() {
      let typeInfo = this.typeMap(this.dictionary.applyType,this.row.clearType)
      let res = typeInfo.slice(0,typeInfo.length-2)
      return res
    },
    productName() {
      return this.$store.getters['user/productName']
    },
  },
  data() {
    return {
      zjControl: {
        getDirectory:this.$api.clearTransactionQuery.getDirectory,
        getExpireClearDetail:this.$api.clearTransactionQuery.getExpireClearDetail,
        getFinanceDetails:this.$api.clearTransactionQuery.getFinanceDetails,
        downApi: this.$api.baseCommon.downloadFile,
      },
      form:{
        tranInfo: {},
        basicInfo: {},
        waitClearInfoList: [],
        financeInfo: {},
        attachInfoList: [],
        oprateRecordList: [],
      },
      dictionary:{},
      billNo: '',

    }
  },
  methods: {
    getDictionary() {
      this.zjControl.getDirectory().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
    attaDownLoad(row) {
      this.zjControl.downApi(row);
    },
    getExpireClearDetail() {
      let params = {
        serialNo : this.row.serialNo,
      }
      this.zjControl.getExpireClearDetail(params).then(res => {
        this.form = res.data
      })
    },
    handleRadioChange({ row }) {
      this.billNo = row.billNo
      //获取融资详情
      this.zjControl.getFinanceDetails({
        clearId: row.id,
      }).then(res => {
        this.form.financeInfo = res.data
      })
    }

  },
  created() {
    this.getApi()
    this.getRow()
    this.getDictionary()
    console.log(this.row)
    this.getExpireClearDetail()
  },
  mounted() {
    this.$refs.waitClearInfoTable.setRadioRow(this.form.waitClearInfoList[0]).then(()=>{
      this.handleRadioChange(this.form.waitClearInfoList[0])
    })
  },
}
</script>

<style scoped lang="less">
.financingForm {
  margin-top: 20px;
}
</style>
