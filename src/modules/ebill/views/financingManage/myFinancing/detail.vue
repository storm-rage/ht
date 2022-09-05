<template>
  <zj-content-container>
    <!--  入库融资/凭证融资详情  -->
    <zj-top-header :title="titleInfo"/>
    <zj-content-block>
      <zj-header title="融资信息"/>
      <el-form ref="form" label-width="200px" class="zj-m-t-20">
        <zj-content-block>
          <el-row class="hd-row">
            <el-row>
              <el-col :span="12">
                <el-form-item label="融资企业：" >{{detail.fromEntName}}</el-form-item>
              </el-col>
              <el-col :span="12" v-if="row.financingProductType === '0'">
                <el-form-item label="买方企业名称：" >{{detail.buyerEntName}}</el-form-item>
              </el-col>
            </el-row>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="融资流水号：" >{{detail.serialNo}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="融资申请金额：">
                <span>{{detail.tranAmt ? moneyNoSynbol(detail.tranAmt) : ''}}</span>
                <span>{{detail.tranAmt ? digitUp(detail.tranAmt) : ''}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="融资期限：">
                {{date(detail.applyDatetime)}}
                {{detail.expireDate ? `至`+date(detail.expireDate) : ''}}
                {{detail.estimateDays ? `共${detail.estimateDays}` : ''}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="融资月利率：">{{detail.interestRate}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="收款银行账号：">{{detail.receiptAcctNo}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="融资状态：">{{detail.workflowState}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="还款状态：">{{detail.repaymentFlag}}</el-form-item>
            </el-col>
          </el-row>
        </zj-content-block>
        <zj-collapse title="还款记录" class="zj-m-t-10">
          <zj-table ref="searchTable" class="zj-search-table"
                    :dataList="detail.voucherList"
                    :pager="false"
          >
            <zj-table-column type="seq" title="序号" width="60"/>
            <zj-table-column field="voucherNo" title="还款方式" />
            <zj-table-column field="entName" title="凭证编号" />
            <zj-table-column field="repaymentDate" title="还款日期" :formatter="date"/>
            <zj-table-column field="repaymentAmt" title="还款金额" :formatter="money"/>
            <zj-table-column field="repaymentPrincipalAmt" title="还款本金" :formatter="money"/>
            <zj-table-column field="repaymentInterestAmt" title="还款利息" :formatter="money"/>
          </zj-table>
          <el-row class="zj-m-t-10" >
            <span class="zj-m-r-20">还款金额合计：{{moneyNoSynbol(detail.repaymentAmtTotal,' ')}}</span>
            <span class="zj-m-r-20">已还款本金合计：{{moneyNoSynbol(detail.repaymentPrincipalAmtTotal,' ')}}</span>
            <span class="zj-m-r-20">已还款利息合计：{{moneyNoSynbol(detail.repaymentInterestAmtTotal,' ')}}</span>
          </el-row>
        </zj-collapse>
      </el-form>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="融资协议"/>
      <zj-table ref="searchTable" class="zj-search-table"
                :dataList="detail.voucherList"
                :pager="false"
      >
        <zj-table-column type="seq" title="序号" />
        <zj-table-column field="agreementName" title="协议附件" />
        <zj-table-column title="操作">
          <template v-slot="{row}">
            <zj-button type="text" @click="attaDownLoad(row)">下载</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-content-block>
    <zj-content-footer>
      <zj-button class="submit-button" @click="goParent">返回</zj-button>
    </zj-content-footer>

  </zj-content-container>
</template>

<script>

export default {
  name: "myFinancingDetail",
  computed: {
    titleInfo() {
      return this.row.financingProductType === '0' ? '订单保理融资详情' : '入库融资/凭证融资详情'
    }
  },
  data() {
    return {
      zjControl: {
        getMyFinancingDetail:this.$api.myFinancing.getMyFinancingDetail,//我的融资-详情
        getMyFinancingDirectory:this.$api.myFinancing.getMyFinancingDirectory,//我的融资-获取数据字典
        downloadFile:this.$api.baseCommon.downloadFile,
      },
      detail:{},
      dictionary: {},
    }
  },
  methods: {
    getDic() {
      this.zjControl.getMyFinancingDirectory().then(res=>{
        this.dictionary = res.data
      })
    },
    getDetail() {
      let params = {
        id: this.row.id,
      }
      this.zjControl.getMyFinancingDetail(params).then(res=>{
        this.detail = res.data
      })
    },
    attaDownLoad(row) {
      this.zjControl.downloadFile({
        fileId: row.fileId,
        fileName: row.fileName,
      })
    },

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
