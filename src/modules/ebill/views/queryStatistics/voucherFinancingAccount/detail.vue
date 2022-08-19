<template>
    <zj-content-container>
      <!--  凭证交易详情  -->
      <zj-top-header title="凭证交易详情"></zj-top-header>
      <zj-content-block v-if="workflow === 'sqxx'">
          <el-form :model="form" ref="form" label-width="200px" class="financingForm">
            <zj-content-block>
              <zj-header title="融资信息"/>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="融资企业：">
                    {{rzsq.toEntName}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="融资流水号：">
                    {{rzsq.serialNo}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="融资申请金额：">
                    {{rzsq.tranAmt}} &nbsp;
                    <span>{{digitUp(rzsq.tranAmt)}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="融资期限：">
                    {{date(rzsq.estimateTimeStart)}}至{{date(rzsq.estimateTimeEnd)}}共{{}}天
                    <!-- 缺多少天的字段 -->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="融资月利率：">
                    {{rzsq.interestRate}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="收款银行账号：">
                    {{rzsq.receiptBankNo}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="融资状态：">
                    {{rzsq.workflowState}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="还款状态：">
                    {{rzsq.repaymentFlag}}
                  </el-form-item>
                </el-col>
              </el-row>
              <zj-collapse title="还款记录" class="zj-m-t-10">
                <zj-table ref="searchTable" class="zj-search-table" :dataList="rzsq.repaymentRecordList"
                >
                  <zj-table-column type="seq" title="序号" />
                  <zj-table-column field="repaymentDate" title="还款日期" :formatter="date"/>
                  <zj-table-column field="repaymentInterestDays" title="计息天数" />
                  <zj-table-column field="repaymentAmt" title="还款金额" :formatter="money"/>
                  <zj-table-column field="repaymentPrincipalAmt" title="还款本金" :formatter="money"/>
                  <zj-table-column field="repaymentInterestAmt" title="还款利息" :formatter="money"/>
                  <zj-table-column field="balanceAmt" title="尾款金额" :formatter="money"/>
                  <zj-table-column field="yearAmt" title="年化本金" :formatter="money"/>
                </zj-table>
              </zj-collapse>

            </zj-content-block>
            <zj-content-block>
              <zj-header title="融资协议"/>
              <zj-table ref="searchTable" class="zj-search-table" :dataList="rzsq.agreementFileList"
              >
                <zj-table-column type="seq" title="序号" />
                <zj-table-column field="fileName" title="协议附件" />
                <zj-table-column title="操作" >
                  <template v-slot="{row}">
                    <zj-button type="text" @click="agreementDownLoad(row.fileId)">下载</zj-button>
                  </template>
                </zj-table-column>
              </zj-table>
            </zj-content-block>
            <zj-content-block>
              <zj-header title="其他附件"/>
              <zj-table ref="searchTable" class="zj-search-table" :dataList="rzsq.otherAttachList"
              >
                <zj-table-column type="seq" title="序号" />
                <zj-table-column field="bizType" title="附件类型" />
                <zj-table-column field="remark" title="补充说明" />
                <zj-table-column title="操作" >
                  <template v-slot="{row}">
                    <zj-button type="text" @click="attaDownLoad(row.fileId)">下载</zj-button>
                  </template>
                </zj-table-column>
              </zj-table>
            </zj-content-block>

          </el-form>
      </zj-content-block>

      <zj-content-block v-if="workflow === 'pzxx'">
        <el-content-block>
          <zj-header title="凭证信息"/>
          <zj-table ref="searchTable" class="zj-search-table" :dataList="list" :radio-config="{highlight: true}"
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
          <zj-table ref="searchTable" :dataList="list"  :radio-config="{highlight: true}">
            <!-- <zj-table-column type="radio" width="40"/> -->
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
          <zj-header title="贸易背景资料（资产编号：12345）"/>
          <el-tabs v-model="tabs" class="zj-tabs-card">
            <el-tab-pane label="贸易合同信息" name="tradeContract" >
              <trade-contract :zjControl="zjControl" :uDictionary="uDictionary" :uBtn="zjBtn" />
            </el-tab-pane>
            <el-tab-pane label="发票信息" name="invoice" >
              <invoice />
            </el-tab-pane>
            <el-tab-pane label="其他附件" name="attaList" >
              <attaList />
            </el-tab-pane>
          </el-tabs>
        </el-content-block>
      </zj-content-block>

      <!-- 底部工作流状态 -->
      <zj-workflow v-model="workflow" :list="workflowList">
        <!-- 审核时 -->
        <el-row slot="right">
          <el-row class="btn-w85 zj-center">
            <zj-button class="back" @click="goParent">返回</zj-button>
          </el-row>
        </el-row>
      </zj-workflow>

    </zj-content-container>
</template>

<script>
// import operateLog from "@modules/workflow/views/components/operateLog";
import tradeContract from '../financingTransactionQuery/tradeBackgroundInfo/tradeContract'
import invoice from '../financingTransactionQuery/tradeBackgroundInfo/invoice'
import attaList from '../financingTransactionQuery/tradeBackgroundInfo/attaList'


export default {
  name: "toDoDetail",
  components: {
    tradeContract,
    invoice,
    attaList,
  },
  created() {
    this.getApi()
    // this.getDictionary()
    this.getRow()
    console.log(this.row);
  },
  data() {
    return {
      zjControl: {
        rdDetailrzxq: this.$api.factoringLedger.rdDetailrzxq,//融资申请详情
        rdDetailpzxx: this.$api.factoringLedger.rdDetailpzxx,//凭证信息详情
      },
      form:{},
      detail:{},
      tabs:'tradeContract',
      uDictionary:{},
      mDictionary:{},
      pzxx:{},//凭证信息详情
      rzsq:{},//融资申请信息详情
      workflow: 'sqxx',
      workflowList: [
        { label: '融资申请信息', value: 'sqxx' }, { label: '凭证信息', value: 'pzxx' }
      ],
      list: [
        {
          field1: 'scm00001',
          field2: '某某产品一号',
          field3: '上游',
          field4: '订单保理',
          field5: '2022.09.08 11:18:19',
          field6: '生效',
          field7: '是'
        }
      ],

    }
  },
  created() {
    this.getApi()
    this.getRow()
    this.getDetails()
  },
  methods: {
    
    getDetails() {
      console.log(this.row);
      let parms={serialNo:this.row.serialNo}
      //凭证信息详情
      this.zjControl.rdDetailpzxx(parms).then(res => {
        this.pzxx=res.data
        console.log(res.data,"凭证信息详情");
      })
      //融资申请详情
      this.zjControl.rdDetailrzxq(parms).then(res => {
        this.rzsq=res.data
        console.log(res.data,"融资申请详情");
      })
    },
    agreementDownLoad() {

    },
    attaDownLoad() {},
    submit(){
      this.$refs.submitDialog.open({form: this.form}, true)
    },
  }
}
</script>

<style scoped lang="less">
/deep/.workflow-bottom {
  .right {
    float: none !important;
    width: calc(100% - 400px) !important;
    display: flex;
    justify-content: center;
  }
}
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
