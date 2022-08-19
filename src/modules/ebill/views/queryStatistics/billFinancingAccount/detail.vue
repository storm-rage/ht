<template>
    <zj-content-container>
      <!--  订单保理融资详情  -->
      <zj-top-header title="订单保理融资详情"></zj-top-header>
      <zj-content-block v-if="workflow === 'sqxx'">
          <el-form :model="form" ref="form" label-width="200px" class="financingForm">
            <zj-content-block>
              <zj-header title="融资信息"/>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="融资企业：">
                    {{xqx.toEntName}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="买方企业名称：">
                    {{xqx.buyerEntName}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="融资流水号：">
                    {{xqx.serialNo}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="融资金额：">
                    {{xqx.tranAmt}}
                    <div>{{digitUp(xqx.tranAmt)}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="融资期限：">
                    {{date(xqx.estimateTimeStart)}}至{{date(xqx.estimateTimeEnd)}}共{{form.total}}天
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="融资月利率：">
                    {{xqx.interestRate}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="融资状态：">
                    {{xqx.workflowState}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="收款银行账号：">
                    {{xqx.receiptBankNo}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="还款状态：">
                    {{xqx.repaymentFlag}}
                  </el-form-item>
                </el-col>
              </el-row>
              <zj-collapse title="还款记录" class="zj-m-t-10">
                <zj-table ref="searchTable" class="zj-search-table" :dataList="xqx.repaymentRecordList"
                >
                  <zj-table-column type="seq" title="序号" />
                  <zj-table-column field="voucherNo" title="还款方式" :formatter="date"/><!-- 缺字段 -->
                  
                  <zj-table-column field="voucherSigner" title="凭证编号" /><!-- 缺字段 -->
                  <zj-table-column field="repaymentDate" title="还款日期" />
                  <zj-table-column field="repaymentInterestDays" title="计息天数" />
                  <zj-table-column field="repaymentAmt" title="还款金额" :formatter="money"/>
                  <zj-table-column field="repaymentPrincipalAmt" title="还款本金" :formatter="money"/>
                  <zj-table-column field="repaymentInterestAmt" title="还款利息" :formatter="money"/>
                  <zj-table-column field="voucherAcc" title="未偿还本金" :formatter="money"/><!-- 缺字段 -->
                  <zj-table-column field="yearAmt" title="年化本金" :formatter="money"/>
                  <el-row slot="pager-left" class="slotRows" >
                    <span class="table-tips">还款金额合计：{{moneyNoSynbol(detail.total,' ')}}</span><!-- 缺字段 -->
                    <span class="table-tips">已还款本金合计：{{moneyNoSynbol(detail.total,' ')}}</span><!-- 缺字段 -->
                    <span class="table-tips">已还款利息合计：{{moneyNoSynbol(detail.total,' ')}}</span><!-- 缺字段 -->
                  </el-row>
                </zj-table>
              </zj-collapse>
            </zj-content-block>
            <zj-content-block>
              <zj-header title="融资协议"/>
              <zj-table ref="searchTable" class="zj-search-table" :dataList="xqx.agreementFileList"
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
              <zj-table ref="searchTable" class="zj-search-table" :dataList="xqx.otherAttachList"
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
        <zj-content-block>
          <zj-header title="阶段性协议信息"/>
          <zj-table ref="searchTable" class="zj-search-table" :dataList="xqa" :radio-config="{highlight: true}"
          >
            <zj-table-column field="agreementNo" title="阶段性协议编号" />
            <zj-table-column field="agreementName" title="阶段性协议名称" />
            <zj-table-column field="agreementStartDate" title="协议签订日期" />
            <zj-table-column field="agreementEstimateEndDate" title="协议到期日" />
            <zj-table-column field="agreementNumber" title="数量" />
            <zj-table-column field="price" title="单价" :formatter="date"/>
            <zj-table-column field="agreementEstimatedPrice" title="协议预估总价" :formatter="money"/>
            <zj-table-column field="fileName" title="附件" />
            <zj-table-column title="操作">
              <template v-slot="{row}">
                <zj-button type="text" @click="download(row.fileId)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content-block>
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

export default {
  name: "toDoDetail",
  components: {

  },
  data() {
    return {
      form:{},
      detail:{},
      zjControl: {
        ddblAgreementDetail: this.$api.factoringLedger.ddblAgreementDetail,//协议
        ddblFinancingDetail: this.$api.factoringLedger.ddblFinancingDetail,//详情
      },
      uDictionary:{},
      mDictionary:{},
      workflow: 'sqxx',
      xqa:{},
      xqx:{},
      workflowList: [
        { label: '融资申请信息', value: 'sqxx' }, { label: '阶段性协议信息', value: 'pzxx' }
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
    agreementDownLoad() {

    },
    getDetails() {
      console.log(this.row);
      let parms={serialNo:this.row.serialNo}
      //详情
      this.zjControl.ddblAgreementDetail(parms).then(res => {
        this.xqx=res.data
        console.log(res.data,"详情");
      })
      //协议
      this.zjControl.ddblFinancingDetail(parms).then(res => {
        this.xqa=res.data
        console.log(res.data,"协议");
      })
    },
    attaDownLoad() {},
    submit(){
      this.$refs.submitDialog.open({form: this.form}, true)
    },
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
