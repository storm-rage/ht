<template>
<!-- 业务参数验证 -->
<div>
  <h3 class="zj-center">业务参数配置验证</h3>

  <div>
    <h4 class="sec-title">项目信息</h4>

    <div class="sec-main-box">
    <div class="condition-box">
      <div class="">
        <label class="required-label">项目名称：</label>
        <br>
        <el-input v-model="projectName" class="el-input-style" ></el-input>
      </div>

      <div class="">
        <label class="required-label" >开通产品：</label>
        <br>
        <el-select v-model="product" class="el-select-style">
          <el-option
            v-for="item in productList"
            :key="item.code"
            :label="item.desc"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </div>

      <div>
        <el-button type="primary" icon="el-icon-search" size="medium" class="search-btn"
                   @click="validateProjectInfo">验证</el-button>
      </div>
    </div>

      <el-table
        :data="projectConfInfo"
        style="width:84%; margin-bottom: 28px;"
        :header-row-style="{height:28 + 'px'}"
        :header-cell-style="{padding: 0 + 'px'}"
        :row-style="{height:20 + 'px'}"
        :cell-style="{padding: 0 + 'px'}"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="project"
          label="项目"
          width="240"
          align="center"
        >
        </el-table-column>

        <el-table-column
          label="配置位置"
          min-width="300"
          align="center"
        >
          <template slot-scope="scope">
            <a @click="goUrl(scope.row.url)" class="go-url" >{{scope.row.menu}}</a>
          </template>
        </el-table-column>

        <el-table-column
          prop="state"
          label="验证结果"
          align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-error icon-style icon-style-error" v-if="scope.row.state === false"> 未配置</i>
            <i class="el-icon-success icon-style icon-style-success" v-else-if="scope.row.state === true"> 已配置</i>
            <i v-else></i>
          </template>
        </el-table-column>

      </el-table>

    </div>

  </div>


  <div>
    <h4 class="sec-title">电子债权凭证开立</h4>

    <div class="sec-main-box">
      <div class="condition-box">
        <div class="">
          <label class="required-label">开单企业名称：</label>
          <br>
          <el-input v-model="credentialsOpenWriterEntName" class="el-input-style" ></el-input>
        </div>

        <div class="">
          <label class="required-label" >收单企业名称：</label>
          <br>
          <el-input v-model="credentialsOpenHolderEntName" class="el-input-style" ></el-input>
        </div>

        <div>
          <el-button type="primary" icon="el-icon-search" size="medium" class="search-btn"
                     @click="validateCredentialsOpenConfInfo">验证</el-button>
        </div>
      </div>

      <el-table
        :data="credentialsOpenConfInfo"
        style="width:84%;margin-bottom: 28px;"
        :header-row-style="{height:28 + 'px'}"
        :header-cell-style="{padding: 0 + 'px'}"
        :row-style="{height:20 + 'px'}"
        :cell-style="{padding: 0 + 'px'}"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="project"
          label="项目"
          width="240"
          align="center"
        >
        </el-table-column>

        <el-table-column
          label="配置位置"
          min-width="300"
          align="center"
        >
          <template slot-scope="scope">
            <a @click="goUrl(scope.row.url)" class="go-url" >{{scope.row.menu}}</a>
          </template>
        </el-table-column>

        <el-table-column
          prop="state"
          label="验证结果"
          align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-error icon-style icon-style-error" v-if="scope.row.state === false"> 未配置</i>
            <i class="el-icon-success icon-style icon-style-success" v-else-if="scope.row.state === true"> 已配置</i>
            <i v-else></i>
          </template>
        </el-table-column>

      </el-table>

    </div>

  </div>


  <div>
    <h4 class="sec-title">电子债权凭证转让</h4>

    <div class="sec-main-box">
      <div class="condition-box">
        <div class="">
          <label class="required-label">转出企业名称：</label>
          <br>
          <el-input v-model="credentialsTransferTransferEntName" class="el-input-style" ></el-input>
        </div>

        <div class="">
          <label class="required-label" >收单企业名称：</label>
          <br>
          <el-input v-model="credentialsTransferHolderEntName" class="el-input-style" ></el-input>
        </div>

        <div>
          <el-button type="primary" icon="el-icon-search" size="medium" class="search-btn"
                     @click="validateQueryCredentialsTransferValidate">验证</el-button>
        </div>
      </div>

      <el-table
        :data="credentialsTransferConfInfo"
        style="width:84%;margin-bottom: 28px;"
        :header-row-style="{height:28 + 'px'}"
        :header-cell-style="{padding: 0 + 'px'}"
        :row-style="{height:20 + 'px'}"
        :cell-style="{padding: 0 + 'px'}"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="project"
          label="项目"
          width="240"
          align="center"
        >
        </el-table-column>

        <el-table-column
          label="配置位置"
          min-width="300"
          align="center"
        >
          <template slot-scope="scope">
            <a @click="goUrl(scope.row.url)" class="go-url" >{{scope.row.menu}}</a>
          </template>
        </el-table-column>

        <el-table-column
          prop="state"
          label="验证结果"
          align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-error icon-style icon-style-error" v-if="scope.row.state === false"> 未配置</i>
            <i class="el-icon-success icon-style icon-style-success" v-else-if="scope.row.state === true"> 已配置</i>
            <i v-else></i>
          </template>
        </el-table-column>

      </el-table>

    </div>

  </div>


  <div>
    <h4 class="sec-title">电子债权凭证融资</h4>

    <div class="sec-main-box">
      <div class="condition-box">
        <div class="">
          <label class="required-label">资金方企业名称：</label>
          <br>
          <el-input v-model="credentialsFinancingFundingEntName" class="el-input-style" ></el-input>
        </div>

        <div class="">
          <label class="required-label" >开单企业名称：</label>
          <br>
          <el-input v-model="credentialsFinancingWriterEntName" class="el-input-style" ></el-input>
        </div>

        <div class="">
          <label class="required-label" >融资企业名称：</label>
          <br>
          <el-input v-model="credentialsFinancingFinancingEntName" class="el-input-style" ></el-input>
        </div>

        <div>
          <el-button type="primary" icon="el-icon-search" size="medium" class="search-btn"
                     @click="validateQueryCredentialsFinancingValidate">验证</el-button>
        </div>
      </div>

      <el-table
        :data="getListByTag(credentialsFinancingInfo,1)"
        style="width:84%;margin-bottom: 28px;"
        :header-row-style="{height:28 + 'px'}"
        :header-cell-style="{padding: 0 + 'px'}"
        :row-style="{height:20 + 'px'}"
        :cell-style="{padding: 0 + 'px'}"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="project"
          label="项目"
          width="240"
          align="center"
        >
        </el-table-column>

        <el-table-column
          label="配置位置"
          min-width="300"
          align="center"
        >
          <template slot-scope="scope">
            <a @click="goUrl(scope.row.url)" class="go-url" >{{scope.row.menu}}</a>
          </template>
        </el-table-column>

        <el-table-column
          prop="state"
          label="验证结果"
          align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-error icon-style icon-style-error" v-if="scope.row.state === false"> 未配置</i>
            <i class="el-icon-success icon-style icon-style-success" v-else-if="scope.row.state === true"> 已配置</i>
            <i v-else></i>
          </template>
        </el-table-column>

      </el-table>

      <H4 >保理公司类：</H4>
      <el-table
        :data="getListByTag(credentialsFinancingInfo,2)"
        style="width:84%;margin-bottom: 28px;"
        :header-row-style="{height:28 + 'px'}"
        :header-cell-style="{padding: 0 + 'px'}"
        :row-style="{height:20 + 'px'}"
        :cell-style="{padding: 0 + 'px'}"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="project"
          label="项目"
          width="240"
          align="center"
        >
        </el-table-column>

        <el-table-column
          label="配置位置"
          min-width="300"
          align="center"
        >
          <template slot-scope="scope">
            <a @click="goUrl(scope.row.url)" class="go-url" >{{scope.row.menu}}</a>
          </template>
        </el-table-column>

        <el-table-column
          prop="state"
          label="验证结果"
          align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-error icon-style icon-style-error" v-if="scope.row.state === false"> 未配置</i>
            <i class="el-icon-success icon-style icon-style-success" v-else-if="scope.row.state === true"> 已配置</i>
            <i v-else></i>
          </template>
        </el-table-column>

      </el-table>

      <h4>银行类：</h4>
      <el-table
        :data="getListByTag(credentialsFinancingInfo,3)"
        style="width:84%;margin-bottom: 28px;"
        :header-row-style="{height:28 + 'px'}"
        :header-cell-style="{padding: 0 + 'px'}"
        :row-style="{height:20 + 'px'}"
        :cell-style="{padding: 0 + 'px'}"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="project"
          label="项目"
          width="240"
          align="center"
        >
        </el-table-column>

        <el-table-column
          label="配置位置"
          min-width="300"
          align="center"
        >
          <template slot-scope="scope">
            <a @click="goUrl(scope.row.url)" class="go-url" >{{scope.row.menu}}</a>
          </template>
        </el-table-column>

        <el-table-column
          prop="state"
          label="验证结果"
          align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-error icon-style icon-style-error" v-if="scope.row.state === false"> 未配置</i>
            <i class="el-icon-success icon-style icon-style-success" v-else-if="scope.row.state === true"> 已配置</i>
            <i v-else></i>
          </template>
        </el-table-column>

      </el-table>

    </div>

  </div>


  <!--
  <zj-workflow v-model="workflow" class="bw85 r-100 ta-c">
    <el-row slot="right">
      <zj-button class="back" @click="goParent">返回</zj-button>
    </el-row>
  </zj-workflow>
  -->

</div>
</template>

<script>
import { isEmpty } from "@common/utils/index"

export default {
  name: "bizParamValidate",
  data(){
    return {
      zjControl:{
        //配置位置
        queryConfLink:this.$api.bizParamValidate.queryConfLink,
        //电子凭据融资
        queryCredentialsFinancingValidate:this.$api.bizParamValidate.queryCredentialsFinancingValidate,
        //电子凭据开立
        queryCredentialsOpenValidate:this.$api.bizParamValidate.queryCredentialsOpenValidate,
        //电子凭据转让
        queryCredentialsTransferValidate:this.$api.bizParamValidate.queryCredentialsTransferValidate,
        //字典
        getDictionary:this.$api.bizParamValidate.getDirectory,
        //项目
        queryProjectValidate:this.$api.bizParamValidate.queryProjectValidate,
      },

      //项目名称
      projectName: '',
      //选择的开通产品
      product: '',
      //开通产品列表
      productList: [],
      //项目信息验证列表
      projectConfInfo: [],

      //电子债权凭证开立
      credentialsOpenWriterEntName: '',
      credentialsOpenHolderEntName: '',
      credentialsOpenConfInfo: [],

      //电子债权凭证转让
      credentialsTransferTransferEntName: '',
      credentialsTransferHolderEntName: '',
      credentialsTransferConfInfo: [],

      //电子债权凭证融资
      credentialsFinancingFundingEntName: '',
      credentialsFinancingWriterEntName: '',
      credentialsFinancingFinancingEntName: '',
      credentialsFinancingInfo: [],

      //配置位置
      confListObj: {},
      //数据字典
      dictionary: {},
      //查询给后台的参数对象
      paramObj: {
        //项目名称
        projectName: '',
        //选择的开通产品
        product: '',

        //电子债权凭证开立
        credentialsOpen: {
          writerEntName: '',
          holderEntName: '',
        },

        //电子债权凭证转让
        credentialsTransfer: {
          transferEntName: '',
          holderEntName: '',
        },

        //电子债权凭证融资
        credentialsFinancing: {
          fundingEntName: '',
          writerEntName: '',
          financingEntName: '',
        }
      }

    }
  },
  created() {
    //tag主要用来区分填充的数据表
    //项目信息
    this.projectConfInfo = [
      {project: "项目管理企业注册",name: "managerEntState",menuName: "projectManageEntRegister", menu: "", url: "",state: -1, tag: 1},
      {project: "主资金方企业注册",name: "fundingEntState",menuName: "mainFundingEntRegister", menu: "",url: "",state: -1, tag: 1},
      {project: "项目基础信息维护",name: "baseInfoState",menuName: "projectBaseInfo", menu: "",url: "",state: -1, tag: 1},
      {project: "项目协议模板配置",name: "agreementTemplateState",menuName: "projectAgreementTemplateConf", menu: "",url: "",state: -1, tag: 1},
      {project: "项目产品参数配置",name: "productConfState",menuName: "projectProductParamConf", menu: "",url: "",state: -1, tag: 1},
    ];

    //电子债权凭证开立
    this.credentialsOpenConfInfo = [
      {project: "开单企业注册",name: "writerEntState",menuName: "writerEntRegister", menu: "", url: "",state: -1, tag: 1},
      {project: "收单企业注册",name: "holderEntState",menuName: "holderEntRegister", menu: "",url: "",state: -1, tag: 1},
      {project: "开单企业开单额度",name: "writerEntCreditState",menuName: "writerEntCredit", menu: "",url: "",state: -1, tag: 1},
      {project: "买卖方贸易关系建立",name: "tradeRelationsState",menuName: "transferRelation", menu: "",url: "",state: -1, tag: 1},
      {project: "开单企业参数设置",name: "writerEntConfState",menuName: "writerEntParamConf", menu: "",url: "",state: -1, tag: 1},
      {project: "收单企业参数设置",name: "holderEntConfState",menuName: "holderEntParamConf", menu: "",url: "",state: -1, tag: 1},
    ];

    //电子债权凭证转让
    this.credentialsTransferConfInfo = [
      {project: "转出企业注册",name: "transferEntState",menuName: "transferEntRegister", menu: "", url: "",state: -1, tag: 1},
      {project: "收单企业注册",name: "holderEntState",menuName: "holderEntRegister", menu: "",url: "",state: -1, tag: 1},
      {project: "买卖方贸易关系建立",name: "tradeRelationsState",menuName: "transferRelation", menu: "",url: "",state: -1, tag: 1},
    ];

    //电子债权凭证融资
    this.credentialsFinancingInfo = [
      {project: "开单企业注册",name: "writerEntState",menuName: "writerEntRegister", menu: "", url: "",state: -1, tag: 1},
      {project: "融资企业注册",name: "financingEntState",menuName: "financingEntRegister", menu: "",url: "",state: -1, tag: 1},
      {project: "资金方企业注册",name: "fundingEntState",menuName: "fundingEntRegister", menu: "",url: "",state: -1, tag: 1},
      {project: "资金方参数设置",name: "fundingConfState",menuName: "fundingEntParamConf", menu: "",url: "",state: -1, tag: 1},

      {project: "定价设置",name: "priceConfState",menuName: "blGlobalPriceConf", menu: "",url: "",state: -1, tag: 2},

      {project: "银行对接设置",name: "bankDockingConfState",menuName: "bankConf", menu: "",url: "",state: -1, tag: 3},
      {project: "银行授信",name: "bankCreditConfState",menuName: "bankCreditEnt", menu: "",url: "",state: -1, tag: 3},
      {project: "银行融资准入",name: "bankFinancingOpenState",menuName: "bankFinancingCredit", menu: "",url: "",state: -1, tag: 3},
    ];

  },
  mounted() {
    this.queryConfLink();
    this.getDictionary();
  },
  methods: {
    getDictionary(){
      this.zjControl.getDictionary().then(res => {
        this.dictionary = JSON.parse(JSON.stringify(res.data));
        this.productList = this.dictionary.projectProductEnum;

        //console.log("dictionary:",this.dictionary)
        //console.log("productList",this.productList)
      })
    },
    queryConfLink(){
      this.zjControl.queryConfLink().then(res => {
        this.confListObj = JSON.parse(JSON.stringify(res.data));

        //console.log("confList: " , this.confListObj)

        this.initConfigInfo(this.projectConfInfo);
        this.initConfigInfo(this.credentialsOpenConfInfo);
        this.initConfigInfo(this.credentialsTransferConfInfo);
        this.initConfigInfo(this.credentialsFinancingInfo);
      })

    },
    initConfigInfo(configInfoInData){
      let menuName = '';
      let confListObjTemp = {};
      let _this = this;

      configInfoInData.forEach(function (item){
        menuName = item.menuName;
        confListObjTemp = _this.confListObj[menuName];
        //console.log(menuName, confListObjTemp);
        if(confListObjTemp != null){
          confListObjTemp = JSON.parse(JSON.stringify(confListObjTemp));
          item.menu = confListObjTemp.name;
          item.url = confListObjTemp.link;
        }
      });
    },
    setConfigInfo(configInfo,configInfoInData){
      //configInfo: 接收的state数组
      //configInfoInData: 属性data中的含有state的数组
      let name = '';
      let objTemp = {};

      configInfoInData.forEach(function (item){
        name = item.name;
        objTemp = configInfo[name];
        console.log(name, objTemp);
        if(objTemp != null){
          item.state = objTemp;
        }
        else {
          item.state = -1;
        }
      });
    },
    isFillProjectNameAndProduct(){
      //验证项目名称和开通产品是否均已填
      let blnRet = false;

      if(isEmpty(this.projectName)){
        this.$messageBox({ type: 'warning', content: '项目名称不能为空' });
        return blnRet;
      }

      if(isEmpty(this.product)){
        this.$messageBox({ type: 'warning', content: '开通产品不能为空' });
        return blnRet;
      }
      else {
        this.paramObj.projectName = this.projectName;
        this.paramObj.product = this.product;

        blnRet = true;
      }

      return blnRet;
    },
    validateProjectInfo(){
      //获取项目信息接口数据
      if(!this.isFillProjectNameAndProduct())
        return;

      this.zjControl.queryProjectValidate(this.paramObj).then(res => {
        let result = JSON.parse(JSON.stringify(res.data));
        result = result.projectConfInfo;

        this.setConfigInfo(result,this.projectConfInfo);

        //console.log("projectConfInfo",result);
        //console.log("projectConfInfo",this.projectConfInfo);
      });
    },
    validateCredentialsOpenConfInfo(){
      //获取电子债权凭证开立接口数据
      if(!this.isFillProjectNameAndProduct())
        return;

      if(isEmpty(this.credentialsOpenWriterEntName)){
        this.$messageBox({ type: 'warning', content: '开单企业名称不能为空' });
        return ;
      }

      if(isEmpty(this.credentialsOpenHolderEntName)){
        this.$messageBox({ type: 'warning', content: '收单企业名称不能为空' });
        return ;
      }

      this.paramObj.credentialsOpen.writerEntName = this.credentialsOpenWriterEntName;
      this.paramObj.credentialsOpen.holderEntName = this.credentialsOpenHolderEntName;

      this.zjControl.queryCredentialsOpenValidate(this.paramObj).then(res => {
        let result = JSON.parse(JSON.stringify(res.data));
        result = result.credentialsOpenConfInfo;

        this.setConfigInfo(result,this.credentialsOpenConfInfo);

        // console.log("credentialsOpenConfInfo",result);
        // console.log("credentialsOpenConfInfo",this.credentialsOpenConfInfo);
      });

    },
    validateQueryCredentialsTransferValidate(){
      //获取电子债权凭证转让接口数据
      if(!this.isFillProjectNameAndProduct())
        return;

      if(isEmpty(this.credentialsTransferTransferEntName)){
        this.$messageBox({ type: 'warning', content: '转出企业名称不能为空' });
        return ;
      }

      if(isEmpty(this.credentialsTransferHolderEntName)){
        this.$messageBox({ type: 'warning', content: '收单企业名称不能为空' });
        return ;
      }

      this.paramObj.credentialsTransfer.transferEntName = this.credentialsTransferTransferEntName;
      this.paramObj.credentialsTransfer.holderEntName = this.credentialsTransferHolderEntName;

      this.zjControl.queryCredentialsTransferValidate(this.paramObj).then(res => {
        let result = JSON.parse(JSON.stringify(res.data));
        result = result.credentialsTransferConfInfo;

        this.setConfigInfo(result,this.credentialsTransferConfInfo);

        // console.log("credentialsTransferConfInfo",result);
        // console.log("credentialsTransferConfInfo",this.credentialsTransferConfInfo);
      });

    },
    validateQueryCredentialsFinancingValidate(){
      //获取电子债权凭证融资接口数据
      if(!this.isFillProjectNameAndProduct())
        return;

      if(isEmpty(this.credentialsFinancingFundingEntName)){
        this.$messageBox({ type: 'warning', content: '资金方企业名称不能为空' });
        return ;
      }

      if(isEmpty(this.credentialsFinancingWriterEntName)){
        this.$messageBox({ type: 'warning', content: '开单企业名称不能为空' });
        return ;
      }

      if(isEmpty(this.credentialsFinancingFinancingEntName)){
        this.$messageBox({ type: 'warning', content: '融资企业名称不能为空' });
        return ;
      }

      this.paramObj.credentialsFinancing.fundingEntName = this.credentialsFinancingFundingEntName;
      this.paramObj.credentialsFinancing.writerEntName = this.credentialsFinancingWriterEntName;
      this.paramObj.credentialsFinancing.financingEntName = this.credentialsFinancingFinancingEntName;

      this.zjControl.queryCredentialsFinancingValidate(this.paramObj).then(res => {
        let result = JSON.parse(JSON.stringify(res.data));
        result = result.credentialsFinancingInfo;

        this.setConfigInfo(result,this.credentialsFinancingInfo);

        // console.log("credentialsFinancingInfo",result);
        // console.log("credentialsFinancingInfo",this.credentialsFinancingInfo);
      });

    },
    getListByTag(list,tagValue){
      //根据list中的tag获取list
      return list.filter(item => item.tag == tagValue);
    },
    goUrl(url){
      this.$router.push({path: "/" + url});
    },

  },
}
</script>

<style lang="less" scoped>
.sec-main-box {
  padding-left: 28px;
}

.condition-box {
  display: flex;
  margin-bottom: 16px;
  & > div{
    margin-right: 24px;
  }
}

.el-input-style {
  margin-top: 4px;
  //width: 280px;
}

.search-btn {
  margin-top: 20px;
}

.el-select-style{
  margin-top: 4px;
}

.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0;
}

.go-url {
  cursor: pointer;
}

.go-url:hover{
  color: #0a6999;
}

.icon-style {
  font-size: 14px;
}

.icon-style-success {
  color: #67C23A;
}

.icon-style-error {
  color: #f56c6c;
}


</style>
