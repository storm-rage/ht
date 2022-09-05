<template>
    <zj-content-container>
      <!--  订单保理融资详情  -->
      <zj-content>
        <zj-top-header title="订单保理融资详情"/>
        <zj-content-block v-if="workflow === 'sqxx'">
          <el-form :model="form" ref="form" label-width="200px" class="zj-m-t-20">
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
                    {{xqx.workflowState?typeMap(dictionary.workflowState,xqx.workflowState):''}}
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
                    {{xqx.repaymentFlag?typeMap(dictionary.repaymentFlag,xqx.repaymentFlag):''}}
                  </el-form-item>
                </el-col>
              </el-row>
              <zj-collapse title="还款记录" class="zj-m-t-10">
                <zj-table ref="searchTable" class="zj-search-table" :dataList="xqx.repaymentRecordList" :pager="false"
                >
                  <zj-table-column type="seq" title="序号" width="60"/>
                  <zj-table-column field="repaymentType" title="还款方式" :formatter="obj=>typeMap(dictionary.repaymentType,obj.cellValue)"/>
                  <zj-table-column field="tranCode" title="凭证编号" /><!-- 缺字段 -->
                  <zj-table-column field="repaymentDate" title="还款日期" :formatter="date"/>
                  <zj-table-column field="repaymentInterestDays" title="计息天数" />
                  <zj-table-column field="repaymentAmt" title="还款金额" :formatter="money"/>
                  <zj-table-column field="repaymentPrincipalAmt" title="还款本金" :formatter="money"/>
                  <zj-table-column field="repaymentInterestAmt" title="还款利息" :formatter="money"/>
                  <zj-table-column field="unrepaymentPrincipalAmt" title="未偿还本金" :formatter="money"/><!-- 缺字段 -->
                  <zj-table-column field="yearAmt" title="年化本金" :formatter="money"/>
                </zj-table>
                <el-row class="zj-m-t-20" >
                  <span class="zj-m-r-20">还款金额合计：{{moneyNoSynbol(xqx.totalRepaymentAmt)}}</span><!-- 缺字段 -->
                  <span class="zj-m-r-20">已还款本金合计：{{moneyNoSynbol(xqx.totalRepaymentPrincipalAmt)}}</span><!-- 缺字段 -->
                  <span class="zj-m-r-20">已还款利息合计：{{moneyNoSynbol(xqx.totalRepaymentInterestAmt)}}</span><!-- 缺字段 -->
                </el-row>
              </zj-collapse>
            </zj-content-block>
            <zj-content-block>
              <zj-header title="融资协议"/>
              <zj-table ref="searchTable" class="zj-search-table" :dataList="xqx.agreementFileList" :pager="false"
              >
                <zj-table-column type="seq" title="序号" width="60"/>
                <zj-table-column field="fileName" title="协议附件" />
                <zj-table-column title="操作" >
                  <template v-slot="{row}">
                    <zj-button type="text" @click="downLoadFile(row)">下载</zj-button>
                  </template>
                </zj-table-column>
              </zj-table>
            </zj-content-block>
            <zj-content-block>
              <zj-header title="其他附件"/>
              <zj-table ref="searchTable" class="zj-search-table"
                        :dataList="xqx.otherAttachList" :pager="false"
              >
                <zj-table-column type="seq" title="序号" width="60"/>
                <zj-table-column field="bizType" title="附件类型" :formatter="obj=>typeMap(dictionary.bizType,obj.cellValue)"/>
                <zj-table-column field="remark" title="补充说明" />
                <zj-table-column title="操作" >
                  <template v-slot="{row}">
                    <zj-button type="text" @click="downLoadFile(row)">下载</zj-button>
                  </template>
                </zj-table-column>
              </zj-table>
            </zj-content-block>

          </el-form>
        </zj-content-block>

        <zj-content-block v-if="workflow === 'pzxx'">
          <zj-content-block>
            <zj-header title="阶段性协议信息"/>
            <zj-table ref="searchTable" class="zj-search-table"
                      :dataList="xqa"
                      :pager="false"
            >
              <zj-table-column field="agreementNo" title="阶段性协议编号" />
              <zj-table-column field="agreementName" title="阶段性协议名称" />
              <zj-table-column field="agreementStartDate" title="协议签订日期" :formatter="date"/>
              <zj-table-column field="agreementEstimateEndDate" title="协议到期日" :formatter="date"/>
              <zj-table-column field="agreementNumber" title="数量" />
              <zj-table-column field="price" title="单价" :formatter="money"/>
              <zj-table-column field="agreementEstimatedPrice" title="协议预估总价" :formatter="money"/>
              <zj-table-column field="fileName" title="附件" />
              <zj-table-column title="操作" fixed="right">
                <template v-slot="{row}">
                  <zj-button type="text" @click="downLoadFile(row)">下载</zj-button>
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
      </zj-content>
    </zj-content-container>
</template>

<script>

export default {
  name: "billFinancingAccountDetail",
  watch: {},
  data() {
    return {
      form:{},
      zjControl: {
        ddblAgreementDetail: this.$api.factoringLedger.ddblAgreementDetail,//协议
        ddblFinancingDetail: this.$api.factoringLedger.ddblFinancingDetail,//详情
        ddblDirectory: this.$api.factoringLedger.ddblDirectory,//字典
      },
      workflow: 'sqxx',
      xqa: [],
      xqx:{},
      dictionary:{},
      workflowList: [
        { label: '融资申请信息', value: 'sqxx' }, { label: '阶段性协议信息', value: 'pzxx' }
      ],
    }
  },
  created() {
    this.getApi()
    this.getRow()
    this.getDic()
    this.getDetails()
  },
  methods: {
    getDic() {
      this.zjControl.ddblDirectory().then(res=>{
        this.dictionary = res.data
      })
    },
    downLoadFile(row) {
      this.$api.baseCommon.downloadFile({
        fileId: row.fileId,
        fileName: row.fileName,
      })
    },
    getDetails() {
      let params = {
        serialNo: this.row.serialNo,
      }
      if(this.workflow === 'sqxx') {
        //详情
        this.zjControl.ddblFinancingDetail(params).then(res => {
          this.xqx = res.data
        })
      }
        //协议
        this.zjControl.ddblAgreementDetail(params).then(res => {
          this.xqa = res.data.agreementFileInfoList
        })
    },
  }
}
</script>

<style scoped lang="less">

</style>
