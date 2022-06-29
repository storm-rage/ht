<template>
  <div class="zj-p-t-20 zj-p-b-20">
    <el-row class="ta-c">
      <label class="jc20">编辑平台项目</label>
    </el-row>
    <el-row class="w500px zj_20px-auto-0" style="background-color: #ffffcc;border: 1px solid #ffcc00">
      <div style="padding-left: 120px">提示:每个企业最多只能拥有一个平台项目</div>
    </el-row>
    <el-form ref="form" class="w500px zj_20px-auto-0" :model="form" label-width="140px">
      <el-form-item label="平台项目编号：" prop="id">
        {{form.id}}
      </el-form-item>
      <el-form-item label="项目名称：" prop="projectName" class="required" :rules="[{ required: true, message: '请输入项目名称', trigger: 'change' }]">
        <el-input v-model="form.projectName" maxlength="200" :disabled="!isPlatform"/>
      </el-form-item>
      <el-form-item label="项目管理企业：" prop="projectManagerEntName" class="required" :rules="[{ required: true, message: '请输入项目管理企业', trigger: 'change' }]">
        <el-input v-model="form.projectManagerEntName" :disabled="!isPlatform" maxlength="200"/>
        <div><small style="color: #999;font-size: 12px">企业不能是未注册的企业</small></div>
      </el-form-item>
      <el-form-item prop="isSpecialWebsite">
        <div slot="label">
          <el-checkbox :disabled="!isPlatform" v-model="form.isSpecialWebsite" false-label="0" true-label="1"><span style="color: #F56C6C;">*</span>独立门户网址</el-checkbox>
        </div>
        <el-input :disabled="!isPlatform" v-model="form.specialWebsite" v-if="form.isSpecialWebsite=='1'"/>
        <!--  没有独立门户的可不用设置，当前默认为xxxx.izejin.com      -->
      </el-form-item>
      <el-form-item label="项目：">
        <el-input
          type="textarea"
          maxlength="200"
          style="width: 220px;"
          v-model="form.remark"
          :rows="2"/>
      </el-form-item>
      <el-form-item label="开通产品：" prop="productTypes" class="required" :rules="[{ required: true, message: '请选择开通产品', trigger: 'change' }]">
        <el-checkbox-group v-model="form.productTypes" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(item, index) in dictionarys.productType" :key="index" :label="item.code">{{item.desc}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="电子债权凭证名称：" v-if="isFinancingProd" class="required">
        <el-input v-model="form.productName" :disabled="dictionarys.isProduct === '0'" maxlength="10" :rules="[{ required: true, message: '请输入电子债权凭证名称', trigger: 'change' }]"/>
      </el-form-item>
      <!--折扣付款勾选显示-->
      <el-form-item label="折扣付款名称：" prop="epdProductName" v-if="isDiscountSetting" class="required">
        <el-input :disabled="dictionarys.isDefEpdProductName === '0'" v-model="form.epdProductName" maxlength="10" :rules="[{ required: true, message: '请输入折扣付款名称', trigger: 'change' }]"/>
      </el-form-item>
      <!--若仅勾选“折扣付款”产品，则主资金方和其他资金方均可以为空。-->
      <el-form-item label="主资金方企业名称：" :class="{'required': !isFinancingProd && !isDiscountSetting}">
        <el-input v-model="form.entName"/>
         <div><small style="color: #999;font-size: 12px">电子债权凭证、折扣付款，非必填;其他产品必填</small></div>
      </el-form-item>
      <el-form-item :label="`${index===0?'其他资金方企业名称：':''}`" v-for="(item, index) in form.fundingEnts" :key="index">
        <el-input v-model="form.fundingEnts[index].entName" maxlength="200"/>&nbsp;<el-radio v-if="!form.entName" v-model="form.defaultFundingIndex" :label="index">默认资金方</el-radio><i v-if="index>0" @click="toDeleteOtherEnts(index)" style="cursor: pointer" class="el-icon-delete"></i>
        <div v-if="index===0"><small style="color: #999;font-size: 12px">电子债权凭证，无主资金方时，至少输入一个;其他产品可空;</small></div>
      </el-form-item>
      <el-form-item>
        <div style="width: 220px;margin: 0 auto">
          <i class="el-icon-circle-plus-outline icon-btn fs-24" @click="toAddOtherEnts"></i>
        </div>
      </el-form-item>
      <el-form-item label="客服电话：" :class="{'required': true}">
        <el-input v-model="form.serviceTel"/>
      </el-form-item>
      <el-form-item>
        <zj-button  status="primary" @click="submitForm" :api="zjBtn.updatePubProject">保存</zj-button>
        <zj-button class="back" @click="goParent">返回</zj-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "addEditProjectSetting",
  computed: {
    isFinancingProd () {
      return this.form.productTypes.includes('RD');
    },
    isDiscountSetting () {
      return this.form.productTypes.includes('EPD');
    }
  },
  data(){
    return{
      loading: false,
      form:{
        id:'',
        projectName: '',
        productName: '融单',
        isSpecialWebsite: '0',
        specialWebsite: '',
        productTypes: [],
        productType: '',
        defaultFundingIndex: '',
        entName: '',
        isDefaultFunding: '0',
        isMainFunding: '1',
        sysEntProjectId: '',
        fundingEnts: [
          {
            entName: '',
            isDefaultFunding: '0',
            isMainFunding: '0',
            sysEntProjectId: ''
          }
        ],
        remark: '',
        serviceTel: ''
      },
      zjControl: {
        getPubProjectDirectory: this.$api.pubProjectSetting.getPubProjectDirectory,
        updatePubProject: this.$api.pubProjectSetting.updatePubProject,
        addPubProject: this.$api.pubProjectSetting.addPubProject,
        queryPubProjectDetail: this.$api.pubProjectSetting.queryPubProjectDetail
      },
      dictionarys: {},
      isPlatform: true
    }
  },
  created() {
    this.getApi();
    this.getRow();
    this.getDic();
    if (this.row.id) {
      // 编辑
      const {id} = this.row;
      this.zjControl.queryPubProjectDetail({id}).then(ret => {
        if (ret.success && ret.data) {
         this.form = Object.assign({},this.form,ret.data);
          this.form.fundingEnts = ret.data.fundingEnts.filter((item,index) => {
            return item.isMainFunding!=='1';
          });
          const mainFundingEnt = ret.data.fundingEnts.filter((item) => {
            return item.isMainFunding==='1';
          });
          if (mainFundingEnt.length) {
            this.form.entName = mainFundingEnt[0].entName;
            this.form.isDefaultFunding = mainFundingEnt[0].isDefaultFunding;
            this.form.isMainFunding = mainFundingEnt[0].isMainFunding;
            this.form.sysEntProjectId = mainFundingEnt[0].sysEntProjectId;
          }
          if (this.form.fundingEnts.length) {
            this.form.fundingEnts.map((item, index) => {
              if (item.isDefaultFunding==='1') {
                this.form.defaultFundingIndex = index;
              }
            });
          } else {
            this.form.fundingEnts = [
              {
                entName: '',
                isDefaultFunding: '0',
                isMainFunding: '0',
                sysEntProjectId: ''
              }
            ]
          }

          if (this.form.productType) {
            this.form.productTypes = this.form.productType.split(',');
          }
        }
      });
    }
  },
  methods:{
    getDic () {
      this.zjControl.getPubProjectDirectory().then(ret => {
        this.dictionarys = ret.data;
        this.isPlatform = ret.data.isPlatform;
        const productType = ret.data.sysProductType;
        const productTypes = productType.split('');
        this.dictionarys.productType = this.dictionarys.productType.filter((item, index) => {
          return productTypes[index] === '1';
        });
      });
    },
    toAddOtherEnts () {
      this.form.fundingEnts.push({
        entName: '',
        isDefaultFunding: '0',
        isMainFunding: '0',
        sysEntProjectId: ''
      });
    },
    handleCheckedCitiesChange(value) {
      console.log(value)
    },
    toDeleteOtherEnts (index) {
      this.form.fundingEnts.splice(index, 1);
    },
    submitForm () {
      //有主资金方时，默认资金方为主资金方
      if (this.form.entName) {
        this.form.defaultFundingIndex = '';
        this.form.isDefaultFunding = '1';
      }
      const AllFundingEnt = this.form.fundingEnts.map(item => {
        item.isDefaultFunding = '0';
        return item;
      });
      //设置其他默认主资金方
      if (this.form.defaultFundingIndex!=='') {
        AllFundingEnt[Number(this.form.defaultFundingIndex)].isDefaultFunding='1';
      }
      const fundingEnts = AllFundingEnt.filter((item,index) => {
        return item.entName
      });
      if(!this.isDiscountSetting){
        if (!this.form.entName && fundingEnts.length == 0) {
          return this.$messageBox({ type: 'warning', content: '主资金方与其他资金方不能同时为空' });
        }
        if (this.form.defaultFundingIndex!==''&&!AllFundingEnt[Number(this.form.defaultFundingIndex)].entName) {
          return this.$messageBox({ type: 'warning', content: '默认资金方不能为空' });
        }
        if (!this.form.entName&&fundingEnts.length == 1) { //3、	如果只有一个其他资金方（主资金方为空），选择该资金方一定为默认资金方
          fundingEnts[0].isDefaultFunding = '1';
        }else if (!this.form.entName&&this.form.defaultFundingIndex==='') {
          return this.$messageBox({ type: 'warning', content: '必须选择一个默认资金方' });
        }
      }
      if (!this.form.serviceTel) {
        return this.$messageBox({type: 'warning', content: '客服电话不能为空'})
      }
      if (this.form.entName) {
        fundingEnts.push({
          entName: this.form.entName,
          isDefaultFunding: this.form.isDefaultFunding,
          isMainFunding: this.form.isMainFunding,
          sysEntProjectId: this.form.sysEntProjectId
        })
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          const params = Object.assign({}, this.form,{fundingEnts: fundingEnts});
          params.productType = params.productTypes.join(',');
          this.zjControl.updatePubProject(params).then(ret => {
            this.$Message.success(ret.msg)
            this.goParent();
          });
        }
      });
    },
    //提交复核
    appendORedit(){
      let editWhiteList = ['entId']
      let key = true
      if(this.row.isAp){
        key = this.notEmptyCheck('form','rules')
      }else{
        key = this.notEmptyCheck('form','rules',editWhiteList)
      }
      if(!key){return}
      //判断表单校验是否通过
      this.$refs.form.validate(boo => {
        if(!boo){return} //不通过直接return
        let params = Object.assign({},this.form)
        //新增
        if(this.row.isAp){
          this.$messageBox({
            type:'confirm',
            title:`新增确认`,
            content:`确认后将提交至系统进行审核`,
            showCancelButton:true,
            messageResolve:()=>{
              this.zjControl.addEbBuyerCreditApplyForBl(params).then(() =>{
                this.$Message.success('新增额度信息成功！')
                this.close(true)
              })
            }
          })
        }
        //修改
        else{
          this.$messageBox({
            type:'confirm',
            title:`修改确认`,
            content:`确认后将提交至系统进行审核，通过之后额度将会更新`,
            showCancelButton:true,
            messageResolve:()=>{
              this.zjControl.updateEbBuyerCreditApplyForBl(params).then(() =>{
                this.$Message.success('额度信息修改成功！')
                this.close(false)
              })
            }
          })
        }

      })
    }
  }
}
</script>

<style lang="less" scoped>
.static-form {
  width: 800px;
  margin: 0 auto;
}
</style>
