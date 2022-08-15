<template>
  <div>
    <zj-content-container>
      <!--  入库融资详情  -->
      <zj-top-header :title="`${productName}融资详情`"/>
      <zj-content-block>
        <el-form :model="form" ref="form" label-width="200px" class="zj-m-t-20 zj-m-l-10 zj-m-r-10">
          <zj-content-block>
            <zj-content>
<!--              <el-steps :active="stepActive" process-status="finish" align-center>-->
<!--                <el-step v-for="(step,index) in stepList" :key="`${index}stp`">-->
<!--                  <div slot="title">{{step.title}}</div>-->
<!--                  <div slot="description" style="text-align: left;width: 220px">-->
<!--                    <p v-if="step.desc">{{step.desc}}</p>-->
<!--                    <p v-if="step.time">{{step.time}}</p>-->
<!--                    <p v-if="step.reason">{{step.reason}}</p>-->
<!--                  </div>-->
<!--                </el-step>-->
<!--              </el-steps>-->
              <zj-step :list="form.progressInfo.nodeList" v-show="form.progressInfo.nodeList && form.progressInfo.nodeList.length" :boxWidth="boxWidth"/>
              <zj-steps :list="form.progressInfo.tranTxList" :isDayTime="false" :width="stepsWidth" :parent-item-size="form.progressInfo.nodeList.length" class="zj-p-t-20"/>
            </zj-content>
          </zj-content-block>
          <zj-content-block>
            <zj-header title="融资信息"/>
            <zj-content-block v-if="row.fromEntName === '0'">
              <!--     产品为订单融资时     -->
              <el-row class="hd-row">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="融资流水号：" >{{form.serialNo}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="融资企业：" >{{form.fromEntName}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="买方企业名称：">{{form.buyerEntName}}</el-form-item>
                  </el-col>
                </el-row>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="融资合同编号：">{{form.contractNo}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="融资合同期限：">
                    {{date(form.contractTimeStart)}}至{{date(form.contractTimeEnd)}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="融资金额：" >
                    <span>{{moneyNoSynbol(form.tranAmt)}}</span>
                    <span>{{digitUp(form.tranAmt)}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="融资开始日：">{{form.applyDatetime}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="融资到期日：">{{form.expireDate}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="预计融资期限：">
                    {{date(form.estimateTimeStart)}}至{{date(form.estimateTimeEnd)}}共{{form.estimateDays}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="融资月利率：">{{form.interestRate}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="预计利息：">
                    {{money(form.interestAmt)}}
                    <div>
                      <zj-content-tip text="（预计利息= 融资申请金额*融资月利率/30*预计融资天数）"/>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="收款银行账号：">{{form.receiptAcctNo}}</el-form-item>
                </el-col>
              </el-row>
            </zj-content-block>
            <zj-content-block v-if="row.fromEntName === '1'">
              <!--     产品为入库融资时     -->
              <el-row class="hd-row">
                <el-col :span="12">
                  <el-form-item label="融资流水号：" >{{form.serialNo}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="融资企业：" >{{form.fromEntName}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="融资申请金额：" >
                    <span>{{moneyNoSynbol(form.tranAmt)}}</span>
                    <span>{{digitUp(form.tranAmt)}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="融资折扣率：">{{form.discountrate}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="申请转让金额：">
                    {{money(form.tranferAmt)}}
                    <div>
                      <zj-content-tip text="（申请转让金额=融资申请金额/折扣率）"/>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="融资月利率：">{{form.interestRate}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="预计融资期限：">
                    {{date(form.estimateTimeStart)}}至{{date(form.estimateTimeEnd)}}共{{form.estimateDays}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="预计利息：">
                    <div>{{money(form.interestAmt)}}</div>
                    <div>
                      <zj-content-tip text="（预计利息 = 融资申请金额*融资月利率/30*预计融资天数）"/>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="收款银行账号：">{{form.receiptAcctNo}}</el-form-item>
                </el-col>
              </el-row>
            </zj-content-block>
          </zj-content-block>

          <zj-content-block>
            <!--     产品为订单融资时     -->
            <zj-table ref="searchTable" class="zj-search-table"
                      :dataList="form.ebBillModelList"
                      :pager="false"
                      v-if="row.fromEntName === '0'"
            >
              <zj-table-column field="agreementNo" title="阶段性协议编号" />
              <zj-table-column field="agreementName" title="阶段性协议名称" />
              <zj-table-column field="agreementStartDate" title="协议签订日期" :formatter="date"/>
              <zj-table-column field="agreementEstimateEndDate" title="协议到期日" :formatter="date"/>
              <zj-table-column field="agreementStatus" title="状态" :formatter="obj=>typeMap(dictionary.financingStateList,obj.cellValue)"/>
              <zj-table-column field="fileName" title="附件"/>
              <zj-table-column title="操作">
                <template v-slot="{row}">
                  <zj-button type="text" @click="attaDownLoad(row)">下载</zj-button>
                </template>
              </zj-table-column>
            </zj-table>
            <!--     产品为入库融资时     -->
            <zj-content-block v-if="row.fromEntName === '1'">
              <zj-table ref="searchTable" class="zj-search-table"
                        :dataList="form.ebBillModelList"
                        :pager="false"
              >
                <zj-table-column field="ebillCode" title="凭证编号" />
                <zj-table-column field="rootCode" title="原始凭证编码" />
                <zj-table-column field="writerName" title="凭证签发人" />
                <zj-table-column field="transferName" title="转让企业" />
                <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money"/>
                <zj-table-column field="holderDate" title="凭证持有日期" :formatter="date"/>
                <zj-table-column field="expireDate" title="凭证到期日" :formatter="date"/>
              </zj-table>
              <el-row class="zj-m-t-10 zj-m-l-10" >
                凭证金额合计：{{moneyNoSynbol(form.totalAmt)}}
              </el-row>
            </zj-content-block>
          </zj-content-block>
        </el-form>
      </zj-content-block>

      <zj-content-block>
        <zj-header title="融资协议"/>
        <zj-table ref="searchTable" class="zj-search-table"
                  :dataList="form.financingAgreement"
                  :pager="false"
        >
          <zj-table-column field="seq" title="序号" />
          <zj-table-column field="agreementName" title="协议附件" />
          <zj-table-column title="操作">
            <template v-slot="{row}">
              <zj-button type="text" @click="attaDownLoad(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content-block>
    </zj-content-container>

    <zj-content-footer>
      <zj-button class="submit-button" @click="goParent">返回</zj-button>
    </zj-content-footer>

  </div>
</template>

<script>

export default {
  name: "financingTransactionSearchDetail",
  computed: {
    productName() {
      return this.row.fromEntName === '0' ? '订单保理': '凭证'
    },
  },
  data() {
    return {
      zjControl: {
        getBillFinancingTranDetail:this.$api.financingTransactionSearch.getBillFinancingTranDetail,//融资交易查询-凭证/入库融资详情
        getFinancingTranDirectory:this.$api.financingTransactionSearch.getFinancingTranDirectory,//获取数据字典
        getOrderFinancingTranDetail:this.$api.financingTransactionSearch.getOrderFinancingTranDetail,//订单融资详情
      },
      form:{},
      detail:{},
      dictionary:{},
      stepsWidth: 400,
      // stepActive:'2',
      stepList:[
        {title: '融资申请',desc:'',time:'提交时间：2022.02.02 11:11:12',reason:''},
        {title: '融资复核',desc:'复核通过',time:'提交时间：2022.02.02 11:11:12',reason:'拒绝原因：12333444'},
        {title: '保理公处理核',desc:'审核通过',time:'提交时间：2022.02.02 11:11:12',reason:''},
        {title: '融资放款',desc:'完成放款',time:'放款时间：2022.02.02 11:11:12',reason:''},
      ],
    }
  },
  methods: {
    getDic() {
      this.zjControl.getFinancingTranDirectory().then(res=>{
        this.dictionary = res.data
      })
    },
    getDetail() {
      let params = {
        id: this.row.id,
      }
      this.zjControl.getBillFinancingTranDetail(params).then(res=>{
        this.form = res.data

      })
    },
    boxWidth(width) {
      this.stepsWidth = width > 500 ? 500 : width
    },
    attaDownLoad(row){
      this.zjControl.downloadFile(row.fileId)
    },
  },
  created() {
    this.getApi()
    this.getRow()
    this.getDic()
    this.getDetail()
    this.row.fromEntName = '0'
    // this.row.fromEntName = '1'
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
