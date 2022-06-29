<template>
  <div class="params-form" id="pubParamsForm">
    <div class="content-wrap zj-m-b-20" style="padding-left: 0">
      <el-collapse ref="elCollapse" class="zjcoll-noSelect" v-model="activeNames">
        <el-collapse-item name="common" class="common" :disabled="true">
          <!--  标题   -->
          <h4 slot="title" class="orderTitle">项目参数</h4>
          <div class="params-content-container">
            <common-params
              ref="commonParams"
              v-model="pubParamsFormData"
              :tyc-module="pubTycModule"
              :dics="dics"></common-params>
          </div>
        </el-collapse-item>
        <el-collapse-item name="invo" class="invo" :disabled="true">
          <!--  标题   -->
          <h4 slot="title" class="orderTitle invo">发票</h4>
          <div class="params-content-container">
            <invoice-params
              ref="invoiceParams"
              v-model="pubParamsFormData"
              :contract-mode="pubContractMode"
              :dics="dics"></invoice-params>
          </div>
        </el-collapse-item>
        <el-collapse-item name="openBill" class="openBill" :disabled="true">
          <!--  标题   -->
          <h4 slot="title" class="orderTitle invo">企业开单</h4>
          <div class="params-content-container">
            <open-bill-params
              ref="openBillParams"
              :dics="dics"
              v-model="pubParamsFormData"></open-bill-params>
          </div>
        </el-collapse-item>
        <el-collapse-item name="openBill" class="payBiz" :disabled="true">
          <!--  标题   -->
          <h4 slot="title" class="orderTitle invo" >融资业务</h4>
          <div class="params-content-container">
            <financing-params
              ref="financingParams"
              v-model="pubParamsFormData"
              :dics="dics"></financing-params>
          </div>
        </el-collapse-item>
        <el-collapse-item name="openBill" class="expirePay" :disabled="true">
          <!--  标题   -->
          <h4 slot="title" class="orderTitle invo">到期清算</h4>
          <div class="params-content-container">
            <expire-params
              ref="expireParams"
              :dics="dics"
              v-model="pubParamsFormData"></expire-params>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- 按钮栏 -->
      <el-row class="ta-c w85 zj-m-t-15 fixed-footer-btns">
        <zj-button class="btn-sucess" @click="toSubmit">提交</zj-button>
      </el-row>
    </div>
  </div>
</template>
<script>
import common from './common';
import invoice from './invoice';
import openBill from './openBill';
import financing from './financing';
import expire from './expire';
export default {
  components: {
    commonParams: common,
    invoiceParams: invoice,
    openBillParams: openBill,
    financingParams: financing,
    expireParams: expire,
  },
  data () {
    return {
      zjControl: {
        queryPubProjectParam: this.$api.pubProjectParam.queryPubProjectParam,
        updatePubProjectParam: this.$api.pubProjectParam.updatePubProjectParam,
        getFinanceApplyDirectory: this.$api.pubProjectParam.getFinanceApplyDirectory,
      },
      pubParamsFormData: {
        productName: '',
        serviceTel: '',
        fastMailName: '',
        fastMailAddress: '',
        fastMailTel: '',
        defaultFundingName: '',
        tycModule: [],
        isIdCheck: '1',
        isOpenTyc: '1',
        isFaceCheck: '0',
        baseContractRequired: [],
        attachUploadModel: [],
        transferAttachModel: '',
        isOcrSupport:'',
        ocrInvoiceMode: [],
        isInvoiceCheck: '',
        earlyStopDays: '',
        earlyNoticeDays: ''
      },
      pubTycModule: [], // 平台设置的天眼查模块
      pubContractMode: [], // 平台设置的合同模式
      dics: {},
      activeNames: ['common', 'invo', 'openBill', 'payBiz', 'expirePay']
    };
  },
  created() {
    this.getApi();
    this.getParams();
    this.getDic();
  },
  methods: {
    getDic () {
      this.zjControl.getFinanceApplyDirectory().then(ret => {
        if (ret.success && ret.data) {
          this.dics = ret.data;
        }
      });
    },
    genCheckBoxId (items) {
      let result = [];
      if (items) {
        const tmList = items.split(',');
        if (tmList.length) {
          tmList.forEach((item, index) => {
            if (item === '1') {
              result.push(String(index + 1));
            }
          });
        }
      }
      return result;
    },
    getParams () {
      this.zjControl.queryPubProjectParam().then(ret => {
        if (ret.success && ret.data) {
          if (!ret.data.productName) {
            this.$messageBox({
              type: 'info',
              content: '您未设置平台参数，请先设置平台参数',
              title: '提示',
              showConfirmButton: true,
              showCancelButton: true,
              center: true
            }).then(() => {
              this.tabDel();
              this.goChild('sysPlatform');
            }).catch(()=> {
              this.goChild('home');
            });
            return;
          }
          this.pubParamsFormData = ret.data;
          this.pubParamsFormData.tycModule = this.genCheckBoxId (ret.data.tycModule);
          this.pubTycModule = this.genCheckBoxId (ret.data.sysTycModule);
          this.pubParamsFormData.attachUploadModel = this.genCheckBoxId (ret.data.attachUploadModel);
          this.pubContractMode = this.genCheckBoxId (ret.data.sysAttachUploadModel);
          if (ret.data.ocrInvoiceMode) {
            this.pubParamsFormData.ocrInvoiceMode = ret.data.ocrInvoiceMode.split(',');
          } else {
            this.pubParamsFormData.ocrInvoiceMode = [];
          }
          if (ret.data.baseContractRequired) {
            this.pubParamsFormData.baseContractRequired = this.genCheckBoxId(ret.data.baseContractRequired);
          } else {
            this.pubParamsFormData.baseContractRequired = [];
          }
        } else {
          this.goChild('home');
        }
      });
    },
    setCheckBoxParams (items, len) {
      let result = ['0','0','0'];
      if (len==2) {
        result = ['0', '0'];
      } else if (len==4) {
        result = ['0', '0','0','0'];
      }
      items.forEach((item, index) => {
        if (item === '1') {
          result[0] = '1';
        } else if (item === '2') {
          result[1] = '1';
        } else if (item === '3') {
          result[2] = '1';
        } else if (item === '4') {
          result[3] = '1';
        }
      });
      return result.join(',');
    },
    scrollTop (top) {
      document.getElementById('pubParamsForm').parentElement.scrollTop=top;
    },
    toSubmit () {
      const commonValid = this.$refs.commonParams.validateCommonForm();
      if (!commonValid) {
        this.scrollTop(0);
      }
      const invoValid = this.$refs.invoiceParams.validateInvoiceForm();
      const financingValid = this.$refs.financingParams.validateFinancingForm();
      const expireValid = this.$refs.expireParams.validateExpireForm();
      if (commonValid && invoValid && financingValid && expireValid) {
        const params = {...this.pubParamsFormData};
        // params.baseContractRequired = params.baseContractRequired.join(',');
        params.ocrInvoiceMode = params.ocrInvoiceMode.join(',');
        params.tycModule = this.setCheckBoxParams(params.tycModule,4);
        params.attachUploadModel = this.setCheckBoxParams(params.attachUploadModel,3);
        params.baseContractRequired = this.setCheckBoxParams(params.baseContractRequired,2);
        this.zjControl.updatePubProjectParam(params).then(ret => {
          if (ret.success) {
            this.$Message.success(ret.msg);
            this.getParams();
          } else {
            this.$messageBox({
              type: 'warning',
              content: ret.msg,
              title: '提示',
              showConfirmButton: true,
              center: true
            }).then(() => {
              this.getParams();
            });
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.params-content-container {
  //display: flex;
  //justify-content: center;
}
</style>
