<template>
  <div>
    <zj-content-block>
      <zj-header title="融资申请信息"/>
      <el-row>
        <el-col :span="8">
          <el-form-item label="融资企业：">{{form.fromEntName}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请转让金额：">{{form.tranferAmt}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="融资比例：">{{ form.discountRate?`${form.discountRate}%`:'-'}}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="融资申请金额：">
            {{form.tranAmt}}
            <div>
              <zj-content-tip text="（融资申请金额=申请转让金额*融资比例）"/>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="融资月利率：">{{form.interestRate}}</el-form-item>
        </el-col>
        <el-col :span="8" v-if="proType === '0'">
          <el-form-item label="融资开始日：">{{form.loanDate?date(form.loanDate):''}}</el-form-item>
        </el-col>
        <el-col :span="8" v-if="proType !== '0'">
          <el-form-item label="预计融资期限：">
            {{date(form.estimateTimeStart)}}
            {{`至${date(form.estimateTimeEnd)}`}}
            {{ form.estimateDays?`共${form.estimateDays}天`:''}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" v-if="proType === '0'">
          <el-form-item label="预计融资期限：">
            {{date(form.estimateTimeStart)}}
            {{`至${date(form.estimateTimeEnd)}`}}
            {{ form.estimateDays?`共${form.estimateDays}天`:''}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预计利息：">
            {{form.interestAmt}}
            <div>
              <zj-content-tip text="（预计利息 = 融资申请金额*融资月利率/30*预计融资天数）"/>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <zj-collapse title="收款账户" class="zj-m-t-10">
        <el-row>
          <el-col :span="8">
            <el-form-item label="银行账户户名：" >{{form.receiptAcctName}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款银行开户行：">{{form.receiptBankName}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款银行银行账号：">{{form.receiptAcctNo}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="收款银行联行号：">{{form.receiptBankNo}}</el-form-item>
          </el-col>
        </el-row>
      </zj-collapse>
      <zj-content-block v-if="proType === '0'">
        <zj-table ref="searchTable" class="zj-search-table"
                  :dataList="phasedAgreementList"
                  :pager="false"
        >
          <zj-table-column field="agreementNo" title="阶段性协议编号" />
          <zj-table-column field="agreementName" title="阶段性协议名称" />
          <zj-table-column field="agreementStartDate" title="协议签订日期" :formatter="date"/>
          <zj-table-column field="agreementEstimateEndDate" title="协议到期日" :formatter="date"/>
          <zj-table-column field="agreementNumber" title="数量"/>
          <zj-table-column field="price" title="单价" :formatter="money"/>
          <zj-table-column field="agreementEstimatedPrice" title="协议预估总价" :formatter="money"/>
          <zj-table-column field="agreementStatus" title="状态" :formatter="obj=>typeMap(dictionary.agreementStatus,obj.cellValue)"/>
          <zj-table-column field="fileName" title="附件" />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{row}">
              <zj-button type="text" @click="downLoad(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
        <el-row class="zj-m-l-10 zj-m-t-10" >
          订单预估总额合计：{{moneyNoSynbol(totalAccount)}}
        </el-row>
      </zj-content-block>
      <zj-content-block v-if="proType !== '0'">
        <zj-table ref="searchTable" class="zj-search-table"
                  :dataList="voucherList"
                  :pager="false"
        >
          <zj-table-column field="ebillCode" title="海e单编号" />
          <zj-table-column field="rootCode" title="原始海e单编号" />
          <zj-table-column field="writerName" title="凭证签发人" />
          <zj-table-column field="transferName" title="转让企业" />
          <zj-table-column field="ebillAmt" title="海e单金额" :formatter="money"/>
          <zj-table-column field="holderDate" title="凭证持有日期" :formatter="date"/>
          <zj-table-column field="expireDate" title="海e单到期日" :formatter="date"/>
        </zj-table>
        <el-row class="zj-m-l-10 zj-m-t-10" >
          海e单金额合计：{{moneyNoSynbol(totalAccount)}}
        </el-row>
      </zj-content-block>

    </zj-content-block>
  </div>
</template>

<script>
export default {
  name: "financingApplyInfo",
  props: {
    form: Object,
    voucherList: Array,
    phasedAgreementList: Array,
    proType: String,
    dictionary: Object,
  },
  computed: {
    totalAccount() {
      let arr = []
      if(this.voucherList) {
        for(let i of this.voucherList) {
          arr.push(i.ebillAmt)
        }
      }
      return arr.reduce((pre,cur)=>
        pre + cur , 0
      )
    }
  },
  data() {
    return {

    }
  },
  methods: {
    downLoad(row) {
      this.$api.baseCommon.downloadFile({
        fileId: row.fileId,
        fileName: row.fileName,
      })
    }

  },
}
</script>

<style scoped>

</style>
