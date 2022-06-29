<template>
  <div class="zj-p-t-20 zj-p-b-20">
    <el-row class="ta-c">
      <label class="jc20" v-if="isEdit">银行对接设置</label>
    </el-row>
    <el-form ref="form" class="w500px zj_20px-auto-0" :model="form" label-width="140px">
      <el-form-item label="所属项目：" prop="projectId" class="required" :rules="[{required: true, message: '请选择所属项目',trigger: 'change' }]">
        <el-select v-model="form.projectId" placeholder="请选择" style="width: auto">
          <el-option
            v-for="item in dictionarys.projectList"
            :key="item.projectId"
            :label="item.projectName"
            :value="item.projectId">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="银行类型：" prop="bankType" class="required" :rules="[{required: true, message: '请选择银行类型',trigger: 'change' }]">
        <el-select v-model="form.bankType" placeholder="请选择" style="width: auto">
          <el-option
            v-for="item in dictionarys.bankType"
            :key="item.code"
            :label="item.desc"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="银行名称：" prop="bankName" class="required" :rules="[{required: true, message: '请输入银行名称',trigger: 'change' }]">
        <el-input v-model="form.bankName" maxlength="200" :disabled="!isPlatform"/>
      </el-form-item>
      <el-form-item label="说明：" prop="remark" class="" :rules="[{required: false, message: '请输入项目说明',trigger: 'change' }]">
        <el-input v-model="form.remark" maxlength="200" :disabled="!isPlatform"/>
      </el-form-item>
      <div style="box-shadow: 0 0 5px rgba(172,172,172,.4);padding: 5px 0 5px 10px;margin: 10px 0" v-if="form.bankType === 'ABC' || form.bankType === 'CITIC'">接口参数</div>
      <template v-if="form.bankType === 'ABC'">
        <el-form-item label="产品编码：" prop="productId" class="required" :rules="[{required: true, message: '请输入产品编码',trigger: 'change' }]">
          <el-input v-model="form.productId" maxlength="200" :disabled="!isPlatform"/>
        </el-form-item>
        <el-form-item label="平台编码：" prop="sysCode" class="required" :rules="[{required: true, message: '请输入平台编码',trigger: 'change' }]">
          <el-input v-model="form.sysCode" maxlength="200" :disabled="!isPlatform"/>
        </el-form-item>
        <el-form-item label="商圈编码：" prop="busiGroupCode" class="required" :rules="[{required: true, message: '请输入商圈编码',trigger: 'change' }]">
          <el-input v-model="form.busiGroupCode" maxlength="200" :disabled="!isPlatform"/>
        </el-form-item>
      </template>
      <template v-if="form.bankType === 'CITIC'">
        <el-form-item label="所属机构：" prop="branch" class="required" :rules="[{ required: true, message: '请输入所属机构', trigger: 'change' }]">
          <el-input v-model="form.branch" maxlength="200" :disabled="!isPlatform"/>
          <p class="explainText">说明：用于赋值接口字段branch</p>
        </el-form-item>
        <el-form-item label="发送方标识：" prop="sysCode" class="required" :rules="[{ required: true, message: '请输入发送方标识', trigger: 'change' }]">
          <el-input v-model="form.sysCode" maxlength="200" :disabled="!isPlatform"/>
          <p class="explainText">说明：4位英文字母大写，用于融资申请接口中的文件名称规则</p>
        </el-form-item>
        <el-form-item label="会员确认中心：" prop="mngNode" class="required" :rules="[{ required: true, message: '请输入会员确认中心', trigger: 'change' }]">
          <el-input v-model="form.mngNode" maxlength="200" :disabled="!isPlatform"/>
          <p class="explainText">说明：用于赋值接口字段-mngNode</p>
        </el-form-item>
      </template>
<!--      提交-->
      <el-form-item>
        <zj-button  status="primary" @click="submitForm" v-if="isEdit" :api="zjBtn.bankDockSetUpdate">保存</zj-button>
        <zj-button  status="primary" @click="submitForm" v-else :api="zjBtn.bankDockSetAdd" >保存</zj-button>
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
    }
  },
  data(){
    return{
      loading: false,
      form:{
        id:'',
        clearProjectName: '',
        clearBankType: '',
        projectName: '',
        productName: '融单',
        isSpecialWebsite: '0',
        specialWebsite: '',
        productTypes: [],
        productType: '',
        defaultFundingIndex: '',
        entName: '',
        bankType: '',
        branch: '',
        bankName: '',
        busiGroupCode: '',
        sysCode: '',
        mngNode: '',
        productId: '',
        projectId: '',
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
        remark: ''
      },
      zjControl: {
        getPubProjectDirectory: this.$api.pubProjectSetting.getPubProjectDirectory,
        updatePubProject: this.$api.pubProjectSetting.updatePubProject,
        addPubProject: this.$api.pubProjectSetting.addPubProject,
        queryPubProjectDetail: this.$api.pubProjectSetting.queryPubProjectDetail,
        bankDockSetGetDict: this.$api.pubProjectSetting.bankDockSetGetDict,//获取字典
        bankDockSetAdd: this.$api.pubProjectSetting.bankDockSetAdd,//添加
        bankDockSetGetDetail: this.$api.pubProjectSetting.bankDockSetGetDetail,//查询详情
        bankDockSetGetPage: this.$api.pubProjectSetting.bankDockSetGetPage,//查询列表
        bankDockSetUpdate: this.$api.pubProjectSetting.bankDockSetUpdate,//修改
      },
      dictionarys: {},
      isEdit: false,
      isPlatform: true,
    }
  },
  created() {
    this.getApi();
    this.getRow();
    this.getDic();
    if (this.row.id) {
      // 编辑
      this.isEdit = true;
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
    } else {
      // 新增
      this.isEdit = false;
    }
  },
  watch: {
  },
  methods:{
    getDic () {
      this.zjControl.bankDockSetGetDict().then(ret => {
        this.dictionarys = ret.data;
        // this.isPlatform = ret.data.isPlatform;
        // this.dictionarys.productType = ret.projectList;
        // this.dictionarys.bankType = ret.bankType;
        // const productType = ret.data.sysProductType;
        // const productTypes = productType.split('');
        // this.dictionarys.productType = this.dictionarys.productType.filter((item, index) => {
        //   return productTypes[index] === '1';
        // });
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
    toDeleteOtherEnts (index) {
      this.form.fundingEnts.splice(index, 1);
    },
    submitForm () {
      //有主资金方时，默认资金方为主资金方
      // if (this.form.entName) {
      //   this.form.defaultFundingIndex = '';
      //   this.form.isDefaultFunding = '1';
      // }
      // const AllFundingEnt = this.form.fundingEnts.map(item => {
      //   item.isDefaultFunding = '0';
      //   return item;
      // });
      // //设置其他默认主资金方
      // if (this.form.defaultFundingIndex!=='') {
      //   AllFundingEnt[Number(this.form.defaultFundingIndex)].isDefaultFunding='1';
      // }
      // const fundingEnts = AllFundingEnt.filter((item,index) => {
      //   return item.entName
      // });
      // if (!this.form.entName && fundingEnts.length == 0) {
      //   return this.$messageBox({ type: 'warning', content: '主资金方与其他资金方不能同时为空' });
      // }
      // if (this.form.defaultFundingIndex!==''&&!AllFundingEnt[Number(this.form.defaultFundingIndex)].entName) {
      //   return this.$messageBox({ type: 'warning', content: '默认资金方不能为空' });
      // }
      // if (!this.form.entName&&fundingEnts.length == 1) { //3、	如果只有一个其他资金方（主资金方为空），选择该资金方一定为默认资金方
      //   fundingEnts[0].isDefaultFunding = '1';
      // }else if (!this.form.entName&&this.form.defaultFundingIndex==='') {
      //   return this.$messageBox({ type: 'warning', content: '必须选择一个默认资金方' });
      // }
      // if (this.form.entName) {
      //   fundingEnts.push({
      //     entName: this.form.entName,
      //     isDefaultFunding: this.form.isDefaultFunding,
      //     isMainFunding: this.form.isMainFunding,
      //     sysEntProjectId: this.form.sysEntProjectId
      //   })
      // }
      // this.$refs.form.validate((valid) => {
      //   if (valid) {
      //     this.loading = true;
      //     const params = Object.assign({}, this.form,{fundingEnts: fundingEnts});
      //     params.productType = params.productTypes.join(',');
      //     if (this.isEdit) {
      //       this.zjControl.updatePubProject(params).then(ret => {
      //         this.$Message.success(ret.msg)
      //         this.goParent();
      //       });
      //     } else {
      //       this.zjControl.addPubProject(params).then(ret => {
      //         this.$Message.success(ret.msg)
      //         this.goParent();
      //       });
      //     }
      //   }
      // });
      //增加信息

      this.zjControl.bankDockSetAdd(
        {
          "bankType": this.form.bankType,
          "bankName": this.form.bankName,
          "branch": this.form.branch,
          "busiGroupCode": this.form.busiGroupCode,
          "mngNode": this.form.mngNode,
          "productId": this.form.productId,
          "projectId": this.form.projectId,
          "remark": this.form.remark,
          "sysCode": this.form.sysCode
        }
      ).then(ret => {
        //this.dictionarys = ret.data;
        this.$message.success(ret.msg)
      });
      this.appendORedit();
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
        if(!boo){return}
        else if(boo){
          this.goParent();
        }//不通过直接return
        let params = Object.assign({},this.form)
        //新增
        if(this.row.isAp){
          // this.$messageBox({
          //   type:'confirm',
          //   title:`新增确认`,
          //   content:`确认后将提交至系统进行审核`,
          //   showCancelButton:true,
          //   messageResolve:()=>{
          //     this.zjControl.addEbBuyerCreditApplyForBl(params).then(() =>{
          //       this.$Message.success('新增额度信息成功！')
          //       this.close(true)
          //     })
          //   }
          // })
          this.goParent();
        }
        //修改
        else{
          // this.$messageBox({
          //   type:'confirm',
          //   title:`修改确认`,
          //   content:`确认后将提交至系统进行审核，通过之后额度将会更新`,
          //   showCancelButton:true,
          //   messageResolve:()=>{
          //     this.zjControl.updateEbBuyerCreditApplyForBl(params).then(() =>{
          //       this.$Message.success('额度信息修改成功！')
          //       this.close(false)
          //     })
          //   }
          // })
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
.explainText {
  color: #7f7f7f;
}
</style>
