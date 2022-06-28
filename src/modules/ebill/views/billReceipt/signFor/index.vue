<template>
  <div class="bg-white">
    <div class="FdOpenAndReceipt-OrderReview_signFor bg-w bg-white">
      <!-- 标题区 -->
      <h1 class="ta-c zj-m-b-20">
        电子债权凭证签收
      </h1>
      <!-- 内容  -->
      <div class="orderBody">
        <el-row class="ta-l">
          {{ $t("lang.financingName") }}编号：{{
            detailData.billInfo.ebillCode || ""
          }}
          <i style="margin: 0 10px" />
          业务方：{{ detailData.billInfo.createEntName || "" }}
        </el-row>
        <table
          border="1"
          cellspacing="0"
          cellpadding="0"
          class="ta-c"
          style="width: 100%"
        >
          <tr>
            <td colspan="8">{{ $t("lang.financingName") }}开立方</td>
            <td colspan="8">{{ detailData.billInfo.payEntName || "" }}</td>
            <td colspan="8">统一社会信用代码</td>
            <td colspan="8">{{ detailData.billInfo.payBizLicence || "" }}</td>
          </tr>
          <tr>
            <td rowspan="4" colspan="8">
              {{ $t("lang.financingName") }}接收方
            </td>
            <td rowspan="4" colspan="8">
              {{ detailData.billInfo.receiptEntName || "" }}
            </td>
            <td colspan="8">统一社会信用代码</td>
            <td colspan="8">
              {{ detailData.billInfo.receiptBizLicence || "" }}
            </td>
          </tr>
          <tr>
            <td colspan="8">开户行</td>
            <td colspan="8">{{ detailData.billInfo.receiptBankName || "" }}</td>
          </tr>
          <tr>
            <td colspan="8">银行账号</td>
            <td colspan="8">
              {{ detailData.billInfo.receiptBankAccno || "" }}
            </td>
          </tr>
          <tr>
            <td colspan="8">联行号</td>
            <td colspan="8">{{ detailData.billInfo.receiptBankNo || "" }}</td>
          </tr>
          <tr>
            <td rowspan="2" colspan="3">{{ $t("lang.financingName") }}</td>
            <td colspan="5">金额（大写）</td>
            <td colspan="24">
              <div class="money">
                <label class="ta-l">{{
                  detailData.billInfo.ebillAmtUpper || ""
                }}</label>
                <span class="ta-r"
                  >(小写) {{ money(detailData.billInfo.ebillAmt) || "" }}</span
                >
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="5">开立日期</td>
            <td colspan="8">{{ date(detailData.billInfo.openDate) || "" }}</td>
            <td colspan="8">到期日期</td>
            <td colspan="8">
              {{ date(detailData.billInfo.expireDate) || "" }}
            </td>
          </tr>
          <tr>
            <td colspan="32">
              我司同意按照
              <span v-if="detailData.billInfo.state === 'B008'"
                >《{{ detailData.billInfo.kdProtocolName || "" }}》</span
              >
              <zj-button
                type="text"
                v-if="detailData.billInfo.state === 'B002'"
                @click="dowmApply(detailData.billInfo, 'table')"
              >
                《{{ detailData.billInfo.kdProtocolName || "" }}》
              </zj-button>
              的约定，到期无条件向{{
                $i18n.messages[$i18n.locale].lang.financingName
              }}最终持有人兑付{{
                $i18n.messages[$i18n.locale].lang.financingName
              }}项下全部应付款项。
            </td>
          </tr>
          <tr>
            <td
              colspan="32"
              class="ta-l"
              style="word-wrap: break-word; word-break: break-all"
            >
              备注：{{ detailData.billInfo.remark || "" }}
            </td>
          </tr>
          <td colspan="32" class="ta-l h80px" style="vertical-align: top">
            企业签章：
            <img
              v-for="(item, index) in detailData.billInfo.entSignatures"
              :key="index"
              :src="'data:image/png;base64,' + item"
              class="w150px h150px"
            />
          </td>
        </table>
      </div>
      <!-- 底部按钮 -->
      <el-row class="ta-c">
        <el-row class="zj-p-t-20 w85" v-if="detailData.isShowDetail === '1'">
          <zj-button
            status="primary"
            class="w270px"
            @click="goChild('orderReceiptSignForDetail', row)"
            :api="zjBtn.getBillSignDetail"
            >详情</zj-button
          >
        </el-row>
        <!-- <el-row class="zj-p-t-20">
          <el-checkbox v-model="protocolCheck" />
          <span class="zj-m-l-5" style="color: #409eff">已阅读并同意</span>
          <span
            class="protocol_item"
            v-for="(item, index) in detailData.protocols"
            :key="index"
          >
            <label
              @click="
                item.protocolFileId
                  ? dowmApply(item, 'agree')
                  : viewProtocol(item)
              "
              style="color: #409eff; cursor: pointer"
            >
              《{{ item.protocolName }}》
            </label>
            <i
              style="font-style: normal"
              v-if="index !== detailData.protocols.length - 1"
              >或</i
            >
          </span>
        </el-row> -->
      </el-row>
      <el-row class="ta-c w85 fixed-footer-btns">
        <el-row class="ta-c w85 zj-m-b-5">
          <el-checkbox v-model="protocolCheck" class="check-text"
            >已阅读并同意协议</el-checkbox
          >
        </el-row>
        <div>
          <zj-button @click="confirmSignFor" :api="zjBtn.passRecheck"
            >确认签收</zj-button
          >
          <zj-button
            class="btn-warning"
            @click="goParent"
            :api="zjBtn.rejectRecheck"
            >取消</zj-button
          >
        </div>
      </el-row>
      <!-- 协议预览 -->
      <el-dialog class="view-pdf" :visible.sync="htmlVisible" width="1100px">
        <div slot="title"></div>
        <div v-html="htmlStr"></div>
        <div slot="footer" class="text-center">
          <el-button size="medium" @click="htmlVisible = false"
            >关 闭</el-button
          >
        </div>
      </el-dialog>

      <!-- 云证书签章 -->
      <zj-certuficate ref="certuficate" @confirm="confirm" />
    </div>
  </div>
</template>

<script>
export default {
  name: "signFor",
  data() {
    return {
      zjControl: {},
      dictionary: {},
      detailData: {
        billInfo: {},
        protocols: [],

        billTraces: [],
        openBill: {},
        openBillContracts: [],
        openBillInvoices: [],
        openBillOtherAttaches: [],
      },

      //html
      htmlVisible: false, //打开协议
      htmlStr: "", //协议内容

      protocolCheck: false,
      newProtocols: [], //创建合同的返回
    };
  },
  methods: {
    //获取字典
    getDictionary() {
      this.zjControl.getDictionary().then((res) => {
        this.dictionary = res.data;
      });
    },
    //获取信息
    getBillSignInfoDetail() {
      let params = {
        id: this.row.id,
      };
      this.zjControl.getBillSignInfoDetail(params).then((res) => {
        this.detailData = res.data;
      });
    },
    //单份协议查看
    viewProtocol(item) {
      let params = {
        bizId: item.bizId,
        protocolType: item.protocolType,
      };
      this.zjControl.getOneAgreement(params).then((res) => {
        this.htmlStr = res.data.agreement.html;
        this.htmlVisible = true;
      });
    },
    //协议下载
    dowmApply(item, flag = "table") {
      let newFileName = "";
      let newFileId = "";
      if (flag === "table") {
        newFileName =
          item.kdProtocolName.indexOf(".pdf") >= 0
            ? item.kdProtocolName
            : item.kdProtocolName + ".pdf";
        newFileId = item.kdProtocolFileId;
      } else {
        newFileName =
          item.protocolName.indexOf(".pdf") >= 0
            ? item.protocolName
            : item.protocolName + ".pdf";
        newFileId = item.protocolFileId;
      }
      let params = {
        fileId: newFileId,
        fileName: newFileName,
      };
      this.zjControl.downloadFile(params);
    },
    //签收确认--创建合同
    confirmSignFor() {
      if (!this.protocolCheck) {
        return this.$Message.warning("请阅读并同意协议");
      }

      this.$refs.certuficate.open(); //打开云证书

      // let params = {
      //   ids:[this.row.id],
      //   protocols:this.detailData.agreements
      // }
      // this.zjControl.createContract(params).then(res=>{
      //   this.newProtocols = res.data
      //   this.againConfirmSignFor()
      // })
    },
    //云证书确认事件
    confirm() {
      let params = {
        id: this.row.id,
        state: this.row.state,
        protocols: this.detailData.protocols,
      };
      this.zjControl.passBillSign(params).then(() => {
        this.$Message.success(
          `${
            this.$i18n.messages[this.$i18n.locale].lang.financingName
          }签收成功！`
        );
        this.goParent();
      });
    },

    // //签收确认end
    // againConfirmSignFor(){
    //     let params = {
    //       id:this.row.id,
    //       protocols:this.newProtocols
    //     }
    //     this.zjControl.passBillSign(params).then(()=>{
    //       this.goParent()
    //       this.$Message.success('融单签收成功！')
    //     })
    // }
  },
  created() {
    this.getApi();
  },
};
</script>

<style scoped lang="less">
.pass.vxe-button.type--button:not(.is--circle) {
  padding: 0;
}
.FdOpenAndReceipt-OrderReview_signFor {
  .orderBody {
    width: 800px;
    margin: auto;
    table {
      border-color: rgba(221, 221, 221, 0.52);
      td {
        padding: 4px;
      }
    }
    .money {
      label {
        float: left;
        width: 360px;
      }
      span {
        float: right;
        width: 155px;
      }
      &:after {
        content: "";
        display: block;
        clear: both;
      }
    }
  }
}
</style>
