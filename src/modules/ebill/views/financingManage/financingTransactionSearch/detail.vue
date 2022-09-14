<template>
  <div>
    <zj-content-container>
      <!--  入库融资详情  -->
      <zj-top-header :title="`${proName}融资详情`"/>
      <zj-content-block>
        <el-form :model="form" ref="form" label-width="200px">
          <zj-content-block>
            <zj-content>
              <zj-step :list="stepList"
                       v-show="stepList && stepList.length"
                       :boxWidth="boxWidth"/>
              <zj-steps :list="stepsList"
                        :isDayTime="false"
                        :width="stepsWidth"
                        :parent-item-size="stepList.length"
                        class="zj-p-y-20"/>
            </zj-content>
          </zj-content-block>
          <zj-content-block>
            <zj-header title="融资信息"/>
            <zj-content>
            <zj-content-block v-if="row.financingProductType === '0'">
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
                    {{form.contractTimeStart?date(form.contractTimeStart):''}}
                    {{form.contractTimeEnd?`至 ${date(form.contractTimeEnd)}`:''}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="融资金额：" >
                    <span>{{form.tranAmt?moneyNoSynbol(form.tranAmt):''}}</span>
                    <span class="zj-m-l-10" v-if="form.tranAmt">{{digitUp(form.tranAmt)}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="融资开始日：">{{form.applyDatetime?date(form.applyDatetime):''}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="融资到期日：">{{form.expireDate?date(form.expireDate):''}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="预计融资期限：">
                    {{form.estimateTimeStart?date(form.estimateTimeStart):''}}
                    {{form.estimateTimeEnd?`至 ${date(form.estimateTimeEnd)}`:''}}
                    {{form.estimateDays?`共${form.estimateDays}天`:''}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="融资月利率：">{{form.interestRate? `${form.interestRate}%`:''}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="预计利息：">
                    {{form.interestAmt?moneyNoSynbol(form.interestAmt):''}}
                    <div v-if="form.interestAmt">
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
            <zj-content-block v-if="row.financingProductType !== '0'">
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
                    <span>{{form.tranAmt?moneyNoSynbol(form.tranAmt):''}}</span>
                    <span class="zj-m-l-10" v-if="form.tranAmt">{{digitUp(form.tranAmt)}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="融资折扣率：">{{form.discountRate?`${form.discountRate}%`:''}}</el-form-item>
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
                  <el-form-item label="融资月利率：">{{form.interestRate?`${form.interestRate}%`:''}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="预计融资期限：">
                    {{date(form.estimateTimeStart)}}
                    {{`至 ${date(form.estimateTimeEnd)}`}}
                    {{`共${form.estimateDays}天`}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="预计利息：">
                    <div>{{moneyNoSynbol(form.interestAmt)}}</div>
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
            </zj-content>
          </zj-content-block>

          <zj-content-block>
            <zj-content>
            <!--     产品为订单融资时     -->
            <zj-table ref="searchTable" class="zj-search-table"
                      :dataList="form.phasedAgreements"
                      :pager="false"
                      v-if="row.financingProductType === '0'"
            >
              <zj-table-column field="agreementNo" title="阶段性协议编号" />
              <zj-table-column field="agreementName" title="阶段性协议名称" />
              <zj-table-column field="agreementStartDate" title="协议签订日期" :formatter="date"/>
              <zj-table-column field="agreementEstimateEndDate" title="协议到期日" :formatter="date"/>
              <zj-table-column field="agreementStatus" title="状态" :formatter="obj=>typeMap(dictionary.agreementStatus,obj.cellValue)"/>
              <zj-table-column field="fileName" title="附件"/>
              <zj-table-column title="操作">
                <template v-slot="{row}">
                  <zj-button type="text" @click="attaDownLoad(row)">下载</zj-button>
                </template>
              </zj-table-column>
            </zj-table>
            <!--     产品为入库融资时     -->
            <zj-content-block v-if="row.financingProductType !== '0'">
              <zj-table ref="searchTable" class="zj-search-table"
                        :dataList="form.ebBillModelList"
                        :pager="false"
              >
                <zj-table-column field="ebillCode" :title="`${productName}编号`" />
                <zj-table-column field="rootCode" :title="`原始${productName}编码`" />
                <zj-table-column field="writerName" :title="`${productName}签发人`" />
                <zj-table-column field="transferName" title="转让企业" />
                <zj-table-column field="ebillAmt" :title="`${productName}金额`" :formatter="money"/>
                <zj-table-column field="holderDate" :title="`${productName}持有日期`" :formatter="date"/>
                <zj-table-column field="expireDate" :title="`${productName}到期日`" :formatter="date"/>
              </zj-table>
              <el-row class="zj-m-t-10 zj-m-l-10" >
                {{ productName }}金额合计：{{moneyNoSynbol(form.totalAmt)}}
              </el-row>
            </zj-content-block>
            </zj-content>
          </zj-content-block>
        </el-form>
      </zj-content-block>

      <zj-content-block>
        <zj-header title="融资协议"/>
        <zj-content>
        <zj-table ref="searchTable" class="zj-search-table"
                  :dataList="form.financingAgreement"
                  :pager="false"
        >
          <zj-table-column type="seq" title="序号" />
          <zj-table-column field="agreementTypeName" title="协议附件" />
          <zj-table-column title="操作">
            <template v-slot="{row}">
              <zj-button type="text" @click="attaDownLoad(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
        </zj-content>
      </zj-content-block>
    </zj-content-container>

    <zj-content-footer>
      <zj-button class="submit-button" @click="goParent">返回</zj-button>
    </zj-content-footer>

  </div>
</template>

<script>
import zjStep from "@pubComponent/step/ZjStep";
import zjSteps from "@pubComponent/step/ZjSteps";
export default {
  name: "financingTransactionSearchDetail",
  components: {
    zjStep,zjSteps
  },
  computed: {
    proName() {
      return this.row.financingProductType === '0' ? '订单保理' :
        this.row.financingProductType === '1' ? '入库' : '凭证'
    },
    productName () {
      return this.$store.getters['user/productName']
    }
  },
  data() {
    return {
      zjControl: {
        getBillFinancingTranDetail:this.$api.financingTransactionSearch.getBillFinancingTranDetail,//融资交易查询-凭证/入库融资详情
        getFinancingTranDirectory:this.$api.financingTransactionSearch.getFinancingTranDirectory,//获取数据字典
        getOrderFinancingTranDetail:this.$api.financingTransactionSearch.getOrderFinancingTranDetail,//订单融资详情
      },
      form:{
        progressInfo: {
          nodeList: [],
          tranTxList: [],
        },
      },
      detail:{},
      dictionary:{},
      stepsWidth: 400,
      stepList:[],
      stepsList:[],
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
      if(this.row.financingProductType === '0') {
        this.zjControl.getOrderFinancingTranDetail(params).then(res=>{
          this.form = res.data
          //步骤
          let newStepList = []
          if(res.data.progressInfo.nodeList && res.data.progressInfo.nodeList.length) {
            res.data.progressInfo.nodeList.forEach((item,index)=>{
              newStepList.push({
                label:item.desc,
                state:item.flag ? item.flag === '1' ? 'success' : 'error' : 'info',
                after:index + 1 !== res.data.progressInfo.nodeList.length
                  ? res.data.progressInfo.nodeList[index + 1].flag
                    ? res.data.progressInfo.nodeList[index + 1].flag === '1' ? 'success' : 'error' : 'info'
                  : 'info'
              })
            })
          }
          this.stepList = newStepList
          //步骤说明
          let newAlist = []
          if(res.data.progressInfo.tranTxList && res.data.progressInfo.tranTxList.length) {
            res.data.progressInfo.tranTxList.forEach((item,index)=>{
              newAlist.push({
                state:index+1 === res.data.progressInfo.tranTxList && item.flag ? item.flag === '1' ? 'success' : 'error' : '',
                date:item.createDatetime,
                label:item.notes,
              })
            })
          }
          this.stepsList = newAlist
        })
      } else {
        this.zjControl.getBillFinancingTranDetail(params).then(res=>{
          this.form = res.data
          //步骤
          let newStepList = []
          if(res.data.progressInfo.nodeList && res.data.progressInfo.nodeList.length) {
            res.data.progressInfo.nodeList.forEach((item,index)=>{
              newStepList.push({
                label:item.desc,
                state:item.flag ? item.flag === '1' ? 'success' : 'error' : 'info',
                after:index + 1 !== res.data.progressInfo.nodeList.length
                  ? res.data.progressInfo.nodeList[index + 1].flag
                    ? res.data.progressInfo.nodeList[index + 1].flag === '1' ? 'success' : 'error' : 'info'
                  : 'info'
              })
            })
          }
          this.stepList = newStepList
          //步骤说明
          let newAlist = []
          if(res.data.progressInfo.tranTxList && res.data.progressInfo.tranTxList.length) {
            res.data.progressInfo.tranTxList.forEach((item,index)=>{
              newAlist.push({
                state:index+1 === res.data.progressInfo.tranTxList && item.flag ? item.flag === '1' ? 'success' : 'error' : '',
                date:item.createDatetime,
                label:item.notes,
              })
            })
          }
          this.stepsList = newAlist
        })
      }
    },
    boxWidth(width) {
      // this.stepsWidth = width
      this.stepsWidth = width > 500 ? 500 : width
    },
    attaDownLoad(row){
      this.$api.baseCommon.downloadFile({
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
    console.log(this.row)
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
