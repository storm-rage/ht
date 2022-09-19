<template>
  <zj-content-block>
    <zj-top-header :title="`${productName}签收`"/>
    <zj-content>
      <!--凭证详情-->
      <div>
        <span>{{productName}}编号：{{ detailData.ebillCode }}</span>
<!--        <span>业务方：{{ detailData.payEntName }}</span>-->
      </div>
      <table
        class="detail-table"
        border="0"
        cellspacing="0"
        cellpadding="0"
        width="100%"
      >
        <tr>
          <td colspan="3" class="right">{{productName}}开立方</td>
          <td colspan="3">{{ detailData.payEntName }}</td>
          <td colspan="3" class="right">统一社会信用代码</td>
          <td colspan="3">{{ detailData.payEntName }}</td>
        </tr>
        <tr>
          <td rowspan="4" colspan="3">{{productName}}接收方</td>
          <td rowspan="4" colspan="3">{{ detailData.receiptEntName }}</td>
          <td colspan="3">统一社会信用代码</td>
          <td colspan="3"></td>
        </tr>
        <tr>
          <td colspan="3">开户行</td>
          <td colspan="3">{{ detailData.receiptBankName }}</td>
        </tr>
        <tr>
          <td colspan="3">银行账号</td>
          <td colspan="3">{{ detailData.receiptBankAccno }}</td>
        </tr>
        <tr>
          <td colspan="3">联行号</td>
          <td colspan="3">{{ detailData.receiptBankNo }}</td>
        </tr>
        <tr>
          <td rowspan="2">{{productName}}</td>
          <td colspan="2">金额（大写）</td>
          <td colspan="9">
          <span style="float: left">{{ detailData.ebillAmtUpper }}</span>
          <span style="float: right">（小写）{{ detailData.ebillAmt }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="2">开立日期</td>
          <td colspan="3">{{ detailData.openDate?date(detailData.openDate):'' }}</td>
          <td colspan="3">到期日期</td>
          <td colspan="3">{{ detailData.expireDate?date(detailData.expireDate):'' }}</td>
        </tr>
        <tr>
          <td colspan="12">我司同意按照
            <zj-button type="text" @click="attaDownload()">《{{ detailData.kdProtocolName }}》</zj-button>
            的约定，到期无条件向融单最终持有人兑付融单项下全部应付款项。</td>
        </tr>
        <tr>
          <td colspan="12" align="left">
            <div>备注：</div>
            <div>{{ detailData.remark }}</div>
          </td>
        </tr>
<!--        <tr>-->
<!--          <td colspan="12" align="left">-->
<!--            <div class="">企业签章：</div>-->
<!--            <div>-->
<!--              <span v-for="item in detailData.entSignatures" :key="item">-->
<!--                    <img :src="'data:image/png;base64,'+item" alt="签章图片" width="150" height="150">-->
<!--              </span>-->
<!--            </div>-->
<!--          </td>-->
<!--        </tr>-->
      </table>
      <el-row class="zj-center">
        <el-checkbox v-model="agreeCheck">已阅读并同意</el-checkbox>
        <zj-button type="text"
                   @click="getOneBillSignAgreement(item)"
                   v-for="(item, index) in protocols"
                   :key="index"
        >《{{ item.protocolName }}》</zj-button>
      </el-row>

    </zj-content>

    <zj-content-footer>
      <vxe-button type="primary" @click="confirmSignFor">确认签收</vxe-button>
      <vxe-button type="back" @click="goParent">取消</vxe-button>
    </zj-content-footer>

    <el-dialog
      :visible.sync="dialogShow" width="800px"
      :close-on-click-modal="false"
    >
      <div v-html="dialogHtml"></div>
    </el-dialog>

    <!-- 查看器 -->
<!--    <zj-preview :visible.sync="viewShow" :fileUrl="viewUrl" :showFooter="false" :fileType="viewType" @close="viewShow=false"/>-->
    <!-- 协议查看器 -->
<!--    <zj-multi-agree ref="zjMultiAgree"/>-->
    <!-- 云证书 -->
    <zj-certuficate ref="zjCertuficte" @confirm="passConfirm"/>

  </zj-content-block>
</template>

<script>
import view from "@pubComponent/preview/view";

export default {
  name:'billSignForDetail',
  mixins:[view],
  computed: {
    productName() {
      return this.$store.getters['user/productName']
    }
  },
  data() {
    return {
      zjControl: {
        getBillSignBillInfoDetail:this.$api.billLssueBillSignFor.getBillSignBillInfoDetail,//凭证签收-详情
        passBillSign:this.$api.billLssueBillSignFor.passBillSign,//融单签收-审核通过
        getOneBillSignAgreement:this.$api.billLssueBillSignFor.getOneBillSignAgreement,//融单签收-查询融单签收协议信息-单个协议查看

      },
      detailData: {},
      protocols: [],//协议列表
      agreeCheck: false,//是否勾选阅读并同意
      dialogShow: false,
      dialogHtml: '',
      idChecked: false,//是否验证云证书
    };
  },
  watch: {
    idChecked() {
      if(this.idChecked) {
        let params = {
          id: this.row.id,
          protocols: this.protocols,
          state: this.row.state,
        }
        this.zjControl.passBillSign(params).then(res => {
          this.$message.success(res.msg)
          this.goParent()
        })
      }
    }
  },
  methods: {
    //收单通知书查看
    getOneBillSignAgreement(item) {
      let params = {
        bizId : item.bizId,
        protocolType : item.protocolType,
      }
      this.zjControl.getOneBillSignAgreement(params).then(res=>{
        this.dialogHtml = res.data.agreement.html
        this.dialogShow = true
      })
    },
    attaDownload() {
      this.$api.baseCommon.downloadFile({
        fileId: this.detailData.kdProtocolFileId,
        fileName: this.detailData.kdProtocolTypeName,
      })
    },
    confirmSignFor() {
      if(!this.agreeCheck) {
        return this.$message.error('必须勾选已阅读并同意协议')
      }
      // 调用云证书验证
      this.$refs.zjCertuficte.open()

    },
    getBillSignBillInfoDetail() {
      let params = {
        id: this.row.id
      }
      this.zjControl.getBillSignBillInfoDetail(params).then(res => {
        this.detailData = res.data.billInfo
        this.protocols = res.data.protocols
      })
    },
    passConfirm() {
      this.idChecked = true
    },
  },
  created() {
    this.getApi()
    this.getRow()
    this.getBillSignBillInfoDetail()
  },
};
</script>

<style scoped lang="less">
.detail-table {
  border-collapse: collapse;
  text-align: center;
  th,td {
    border: 1px solid #DCDFE6;
    padding: 10px;
  }
}

</style>
