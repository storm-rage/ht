<template>
  <div class="biz-params-setting bg-white">
    <div style="width: 100%;background-color: white">
      <!-- 标题区 -->
      <h1 class="ta-c zj-m-b-20">业务参数设置</h1>
      <div class="static-detail" style="border: none;margin: auto;padding: 0">
        <el-row>
          <el-col :span="12">
            <label>平台项目编号：</label>{{form.projectId}}
          </el-col>
          <el-col :span="12">
            <label>平台项目管理企业方：</label>{{form.projectManagerEntName}}
          </el-col>
        </el-row>
      </div>
      <el-row  style="background-color: #ffffcc;border: 1px solid #ffcc00;width: 800px;margin: 0 auto;padding-left: 10px;padding-right: 10px;margin-bottom: 10px">
        <div>页面说明：该页面仅支持项目归属方访问及配置，平台方配置项目参数的，在【平台项目设置】中进行操作</div>
      </el-row>
      <el-radio-group v-model="settingType" class="zj-m-l-15 zj-m-b-15">
        <el-radio-button label="1" :disabled="!form.showRDFlag">电子债权凭证设置</el-radio-button>
        <el-radio-button label="2" :disabled="!form.showZXBLFlag">在线保理产品设置</el-radio-button>
        <el-radio-button label="3" :disabled="!form.showEPDFlag">折扣付款设置</el-radio-button>
      </el-radio-group>
      <el-form v-if="settingType==1" ref="form" class="static-form zj-p-t-10" :model="form"  label-width="250px">
        <div class="grey zj-m-l-15 zj-m-b-15" style="width: 385px;text-align: right;margin-left: 75px">如果没有设置主资金方，默认为项目管理企业且不可修改</div>
        <el-form-item label="开单额度授信企业：" prop="buyerCreditLimit">
          <el-radio-group v-model="form.buyerCreditLimit">
            <el-radio :label="item.code" :disabled="!form.isMainFunding" v-for="(item,index) in dictionary.buyerCreditLimit" :key="index">
              {{item.desc}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分配资金方企业：" prop="allotFundings">
          <el-radio-group v-model="form.allotFundings">
            <el-radio :label="item.code" :disabled="!form.isMainFunding" v-for="(item,index) in dictionary.allotFundings" :key="index">
              {{item.desc}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 折叠面板区 -->
        <el-collapse ref="elCollapse" v-model="activeNames" class="zjcoll-noSelect" style="background-color: white">
          <!-- 发票信息  -->
          <el-collapse-item name="openBill" :disabled="true">
            <template slot="title">
              <h4 class="orderTitle">企业开单</h4>
            </template>
            <el-row>
              <el-form-item label="开单模式：" prop="billModel">
                <el-radio
                  v-for="(item, index) in billModelList"
                  :key="index"
                  v-model="form.billModel"
                  :label="item.code">{{item.desc}}</el-radio>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="上传合同发票模式支持：" prop="attachUploadModel">
                <el-checkbox-group v-model="form.attachUploadModel">
                  <el-checkbox
                    :disabled="item.code === 'RZ'"
                    v-for="(item, index) in attachUploadModelList"
                    :key="index"
                    :label="item.code">{{item.desc}}</el-checkbox>
                </el-checkbox-group>
                <div v-if="form.attachUploadModel.indexOf('ZR')>=0">
                  <el-radio
                    v-for="(item, index) in dictionary.transferAttachModel"
                    :key="index"
                    v-model="form.transferAttachModel"
                    style="display: block"
                    :label="item.code">{{item.desc}}</el-radio>
                </div>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="核心企业开单额度模式支持：" prop="buyerLimitModel">
                <el-checkbox-group v-model="form.buyerLimitModel">
                  <el-checkbox
                    v-for="(item, index) in buyerLimitModelList"
                    :key="index"
                    :label="item.code">
                    {{item.desc}}&emsp;&emsp;
                    <el-popover
                      placement="bottom"
                      :title="limitModelTitle(item.code)"
                      width="200"
                      trigger="hover"
                      :content="limitModelContent(item.code)">
                      <i class="el-icon-question" slot="reference" style="color: #999999"></i>
                    </el-popover>
                  </el-checkbox>
                </el-checkbox-group>
                <!--                <el-row>
                                  <div v-for="(item,index) in buyerLimitExpire" :key="index" class="buyer-limit-expire">
                                    <b class="zj-row">{{item.title}}</b>
                                    {{item.content}}
                                  </div>
                                </el-row>-->
              </el-form-item>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="creditInfo" :disabled="true">
            <template slot="title">
              <h4 class="orderTitle">授信模式</h4>
            </template>
            <el-row>
              <el-form-item label="开单额度/授信额度授信模式：" prop="creditModel">
                <el-radio
                  v-for="(item, index) in dictionary.creditModel"
                  :key="index"
                  v-model="form.creditModel"
                  :label="item.code" :disabled="item.code !== '0'">{{item.desc}}</el-radio>
              </el-form-item>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="financing" :disabled="true">
            <template slot="title">
              <h4 class="orderTitle">融资业务</h4>
            </template>
            <el-row>
              <el-form-item label="基础贸易合同名称和编号的必填情况：" prop="baseContractRequired">
                <el-checkbox-group v-model="form.baseContractRequired">
                  <el-checkbox
                    v-for="(item, index) in dictionary.baseContractRequired"
                    :key="index"
                    :label="item.code">{{item.desc}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="支持的清算模式：" prop="clearModel">
                <el-checkbox-group v-model="form.clearModel">
                  <el-checkbox
                    style="display: block"
                    v-for="(item, index) in clearModelList"
                    :key="index"
                    :label="item.code">
                    <span>{{item.desc}}&emsp;&emsp;&emsp;</span>
                    <span v-if="form.clearModel.indexOf('1')>=0&&item.code==='1'">
                      <el-select v-model="form.clearEntName" placeholder="请选择" style="width: auto">
                        <el-option v-for="(item,index) in form.fundingEntList" :key="index" :label="item" :value="item"></el-option>
                      </el-select>
                    </span>
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="融单到期前X天停止业务：" prop="earlyStopDays">
                <zj-number-input :precision="0" v-model="form.earlyStopDays">
                  <template slot="append">天</template>
                </zj-number-input>
              </el-form-item>
              <el-form-item label="融单到期前N天通知核心企业付款：" prop="earlyNoticeDays">
                <zj-number-input :precision="0" v-model="form.earlyNoticeDays">
                  <template slot="append">天</template>
                </zj-number-input>
              </el-form-item>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="agreement" class="zj-m-b-20">
            <template slot="title">
              <h4 class="orderTitle">业务协议</h4>
            </template>
          </el-collapse-item>
          <div class="zj-m-20">
            <agreement-details :data-list="form.protocol"></agreement-details>
          </div>
        </el-collapse>
      </el-form>
      <!-- 折扣付款 -->
      <discount-setting ref="discountSetting" :id="form.projectId" v-if="settingType==3"></discount-setting>
      <!-- 按钮栏 -->
      <el-row class="ta-c fixed-footer-btns">
        <zj-button class="back" @click="goParent">返回</zj-button>
        <zj-button status="primary" @click="submit" :api="zjBtn.updatePubProjectConfiguration">保存</zj-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import agreementDetails from './agreement';
import discountSetting from './discountSetting';
export default {
  components:{
    agreementDetails,
    discountSetting
  },
  data(){
    return {
      settingType: '1',
      form: {
        allotFundings: '', // 分配资金方企业
        attachUploadModel:[], // 合同发票上传模式
        baseContractRequired: [], // 基础合同编号、名称必填情况
        billModel: '', // 开单模式
        buyerCreditLimit: '', // 开单额度授信企业
        buyerLimitModel: [], // 核心企业开单额度模式
        clearEntName: '', // 银行代理清算时，指定的清算方企业名称
        clearModel: [], // 到期清算模式
        creditDataList: '', // 授信资料清单
        creditModel: '', //授信模式
        earlyNoticeDays: '', //融单到期前X天通知核心企业付款
        earlyStopDays: '', // 融单到期前X天停止业务
        fundingEntList: [], //
        isMainFunding: '', //是否设置主资金方
        projectId: '', //项目编号
        projectManagerEntName: '', //平台项目管理企业方
        transferAttachModel: '', //若转单需要附件，转单时附件上传模式
        protocol: [],
      },
      zjControl:{
        getPubProjectDirectory: this.$api.pubProjectSetting.getPubProjectDirectory,
        queryPubProjectConfigurationDetail: this.$api.pubProjectSetting.queryPubProjectConfigurationDetail,
        updatePubProjectConfiguration: this.$api.pubProjectSetting.updatePubProjectConfiguration
      },
      dictionary:{},
      activeNames:['creditInfo','openBill','invo','financing','expire'],
      clearModelList: [],
      billModelList: [],
      attachUploadModelList: [],
      buyerLimitModelList: [],
    }
  },
  methods:{
    limitModelTitle (code) {
      if (code ==='0') {
        return '什么是共用额度？';
      }
      return '什么是自用额度？'
    },
    limitModelContent (code) {
      if (code ==='0') {
        return '共用额度仅限总公司拥有，资金方不能给子分公司分配共用额度。当资金方为总公司分配了共用额度后，其子分公司同时与总公司一同享有该额度的使用权。';
      }
      return '资金方可将该额度分配给任一企业，对总公司可配置“是否可分配”，可分配的额度，总公司可自行分配给子分公司使用。'
    },
    //字典
    getDictionary(){
      this.zjControl.getPubProjectDirectory().then(res => {
        this.dictionary = res.data;
        if (res.data.platformClearModel) {
          const platformClearModels = res.data.platformClearModel.split('');
          this.clearModelList = this.dictionary.clearModel.filter((item, index) => {
            return platformClearModels[index] ==='1';
          });
        } else {
          this.clearModelList = this.dictionary.clearModel
        }
        this.billModelList = this.dictionary.billModel;
        if (res.data.platformBillModel) {
          if (res.data.platformBillModel !== '0') {
            this.billModelList = this.dictionary.billModel.filter((item) => {
              return item.code === res.data.platformBillModel ;
            });
          }
        }
        if (res.data.platformAttachUploadModel) {
          const platformAttachUploadModels = res.data.platformAttachUploadModel.split('');
          this.attachUploadModelList = this.dictionary.attachUploadModel.filter((item, index) => {
            if (item.code === 'RZ') {
              return true;
            }  else {
              return platformAttachUploadModels[index] ==='1';
            }
          });
        } else {
          this.attachUploadModelList =  this.dictionary.attachUploadModel;
        }
        if (res.data.platformBuyerLimitModel) {
          const platformBuyerLimitModels = res.data.platformBuyerLimitModel.split('');
          this.buyerLimitModelList = this.dictionary.buyerLimitModel.filter((item, index) => {
            return platformBuyerLimitModels[index] ==='1';
          });
        } else {
          this.attachUploadModelList =  this.dictionary.buyerLimitModel;
        }
        this.getDetail();
      })
    },
    genCheckBoxId (items) {
      let result = [];
      if (items) {
        const tmList = items.split('');
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
    genCheckBoxByDic (dicItems, item) {
      const items = item.split('');
      let result = [];
      dicItems.forEach((item, index) => {
        if (item.code === 'RZ') { // 融资必选
          result.push(item.code);
        } else if (items[index] === '1') {
          result.push(item.code);
        }
      });
      return result;
    },
    getDetail () {
      const {id} = this.row;
      this.zjControl.queryPubProjectConfigurationDetail({id}).then(ret => {
        if (ret.success && ret.data) {
          this.form = Object.assign({},this.form,ret.data);
          if (ret.data.attachUploadModel) {
            this.form.attachUploadModel = this.genCheckBoxByDic (this.dictionary.attachUploadModel,ret.data.attachUploadModel);
          } else {
            this.form.attachUploadModel = ['RZ'];
          }
          // 默认展示模块
          if(this.form.showRDFlag){
            this.settingType = 1
          }else if(this.form.showEPDFlag){
            this.settingType = 3
          }else{
            this.settingType = 0
          }
          if (ret.data.buyerLimitModel) {
            this.form.buyerLimitModel = this.genCheckBoxByDic(this.dictionary.buyerLimitModel, ret.data.buyerLimitModel)
          } else {
            this.form.buyerLimitModel = [];
          }
          if (ret.data.clearModel) {
            this.form.clearModel = this.genCheckBoxByDic(this.dictionary.clearModel, ret.data.clearModel)
          } else {
            this.form.clearModel = [];
          }
          if (ret.data.baseContractRequired) {
            this.form.baseContractRequired = this.genCheckBoxByDic(this.dictionary.baseContractRequired,ret.data.baseContractRequired);
          } else {
            this.form.baseContractRequired = [];
          }
          if (!ret.data.isMainFunding) {
            this.form.buyerCreditLimit = this.dictionary.buyerCreditLimit[0].code;
            this.form.allotFundings = this.dictionary.allotFundings[0].code;
          }
        }
      });
    },
    genCheckParams (dicts, selectVals) {
      let result = new Array(dicts.length).fill('0');
      dicts.forEach((item, index) => {
        if (selectVals.includes(item.code)) {
          result[index] = '1';
        }
      });
      return result;
    },
    //提交
    submit(){
      if(this.settingType == 3){
        this.submitEpd()
        return
      }
      if (this.form.clearModel.indexOf('1') >= 0&&!this.form.clearEntName) {
        return this.$messageBox({ type: 'warning', content: '请选择代理清算（银行直连代理清算）对应的银行' });
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = Object.assign({}, this.form);
          params.baseContractRequired=this.genCheckParams(this.dictionary.baseContractRequired,params.baseContractRequired).join('');
          params.clearModel=this.genCheckParams(this.dictionary.clearModel,params.clearModel).join('');
          params.buyerLimitModel=this.genCheckParams(this.dictionary.buyerLimitModel,params.buyerLimitModel).join('');
          params.attachUploadModel=this.genCheckParams(this.dictionary.attachUploadModel,params.attachUploadModel).join('');
          this.zjControl.updatePubProjectConfiguration(params).then(ret => {
            this.$Message.success(ret.msg)
            this.goParent();
          });
        }
      });
    },
    submitEpd(){
      this.$refs.discountSetting.submit()
    }
  },
  created() {
    this.getRow()
    this.getApi()
    this.getDictionary()
  },
}
</script>
<style lang="less" scoped>
.buyer-limit-expire{
  float: left;
  width: 250px;
  padding: 5px 12px;
  height: 150px;
  font-size: 12px;
  margin-right: 15px;
  background-color: #ECF5FD;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}
</style>
<style lang="less">
.biz-params-setting{
  /*padding: 20px;*/
  /*开单信息*/
  .orderDetail{
    margin: 10px 0;
    border: 1px solid darkgray;
    .el-row{
      .el-col{
        padding: 4px 0;
      }
      label,span{
        display: inline-block;
      }
      label{
        width: 50%;
        text-align: right;
      }
      span{
        width: 50%;
        text-align: left;
      }
    }
    .bankTable{
      width: 600px;
    }
  }

  .el-collapse-item__header{
    border-bottom: none !important;
  }

  //表格
  .zj-search-table{
    //input输入框
    .vxe-input--inner{
      height: 28px;
    }
  }
  //橘黄家畜
  .widExp{
    font-weight: bold;
    font-size: 16px;
    color: rgba(215, 147, 22, 0.89);
  }
  //橘黄
  .widYellow{
    font-size: 16px;
    color: rgba(215, 147, 22, 0.89);
  }
  //发票切换行
  .invoHeader{
    .el-form-item{
      margin-bottom: 0;
    }
  }
  //发票内容区
  .invoBody{
    //打包上传说明
    .packExplain{
      .block{
        display: block;
      }
      color:#989898;
      font-size: 12px;
    }
  }
  .el-radio-button__inner {
    padding: 10px 13px!important;
  }
}
</style>
