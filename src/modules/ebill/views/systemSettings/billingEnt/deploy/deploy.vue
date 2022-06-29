<template>
<div class="bg-white">
  <div id="bn-deploy">
    <el-row class="zj-p-y-15 zj-p-l-15 zj-m-b-20 border-bottom">
      开单业务方：{{formModel.entName}}
    </el-row>
    <!-- 折叠面板区 -->
    <el-form :model="formModel" :rules="formRules" label-width="210px" ref="form" :class="pageType === 'detail' ? 'bn-deploy_detail' : ''">
      <el-collapse ref="elCollapse" v-model="activeNames" class="zjcoll" style="border-bottom: none">
        <el-collapse-item name="business">
          <template slot="title">
            <h4 class="orderTitle">开单业务</h4>
          </template>
          <el-form-item label="开单模式：" prop="billModel" :class="pageType === 'deploy' ? 'required' : '' ">
            <zj-checkbox :hasCheckAll="false" :list="dictionary.billModelListCheckbox"
                         :value.sync="billModelList" @handleCheckedChange="billModelListHandleCheckedChange"
                         :disabled="pageType === 'detail'"
            />
          </el-form-item>
          <el-form-item label="核心企业开单额度模式：" prop="buyerLimitModel" v-if="isSupportOpenQuota" :class="pageType === 'deploy' ? 'required' : '' ">
            <zj-checkbox :hasCheckAll="false" :list="dictionary.buyerLimitModelListCheckbox"
                         :value.sync="buyerLimitModelList" @handleCheckedChange="buyerLimitModelListHandleCheckedChange"
                         :disabled="pageType === 'detail'"
            />
          </el-form-item>
          <el-form-item label="开单最小期限（单位：天）：" prop="minOpenDays" :class="pageType === 'deploy' ? 'required' : '' ">
            <el-input v-model="formModel.minOpenDays" @input="minOpenDaysInput" :disabled="pageType === 'detail'"/>
          </el-form-item>
          <el-form-item label="开单最长期限（单位：天）：" prop="maxOpenDays" :class="pageType === 'deploy' ? 'required' : '' ">
            <el-input v-model="formModel.maxOpenDays" @input="maxOpenDaysInput" :disabled="pageType === 'detail'"/>
          </el-form-item>
          <el-form-item label="使用折扣率默认值：" prop="openExchangeRate" :class="pageType === 'deploy' ? 'required' : '' ">
            <el-input v-model="formModel.openExchangeRate" @input="openExchangeRateInput" @blur="openExchangeRateBlur" class="el-input-rate" :disabled="pageType === 'detail' || fixedFlag">
              <el-button slot="append">%</el-button>
            </el-input>
            <el-row style="color: #cc9933;line-height: 1.2;" class="fs-12 zj-p-t-2" v-if="rateExplainFlag">
              不能为100%，固定期限不使用该参数<br/>
              开单模式固定时，该处为100%不允许修改
            </el-row>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item name="expire" v-if="isSupportExpireClear">
          <template slot="title">
            <h4 class="orderTitle">
              <i v-if="pageType === 'deploy'" style="color:#f56c6c">*</i>
              到期清算模式
            </h4>
          </template>
          <el-form-item label=" " class="zj-m-b-0" prop="clearModel">
            <el-radio-group v-model="formModel.clearModel" :disabled="pageType === 'detail'">
              <el-radio v-for="(item,index) in dictionary.clearModelList" :key="index" :label="item.code" class="zj-row zj-m-b-20">{{item.desc}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label-width="310px" label=" " class="zj-m-b-0" v-if="formModel.clearModel === '3'">
            <el-form-item label-width="130px" label="清算方企业名称：" class="zj-m-b-0" prop="clearEntName">
              <el-select v-model="formModel.clearEntName" filterable :popper-append-to-body="false" @change="clearEntChange">
                <el-option v-for="item in formModel.clearEnts" :key="item.entId" :label="item.entName" :value="item.entName"/>
              </el-select>
            </el-form-item>
            <el-form-item label-width="260px" label="说明：代理清算企业只能是平台资金方" class="zj-m-b-0 f60" v-if="entExplainFlag"/>
            <el-form-item label-width="50px" label="户名：" class="zj-m-b-0 zj-p-r-0">
              {{formModel.bankAccname}}
            </el-form-item>
            <el-form-item label-width="80px" label="银行账号：" class="zj-m-b-0 zj-p-r-0">
              {{formModel.bankAccno}}
            </el-form-item>
            <el-form-item label-width="453px" label="说明：没有银行账号信息，请先在资金方企业设置中配置代理清算银行账号" class="zj-m-b-0 f60" v-if="bankExplainFlag"/>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <el-row class="w85 zj-p-l-300">
      <zj-button class="pass" @click="save" v-if="pageType==='deploy'" :api="zjBtn.updateEbBuyerParamsByOne">保存</zj-button>
      <zj-button class="back" @click="goParent">返回</zj-button>
    </el-row>
  </div>
</div>

</template>

<script>
    export default {
        name: "deploy",
        data(){
          return {
            activeNames:['business','expire'],
            zjControl:{
              getDictionary:this.$api.billingEnt.getDictionary,//获取字典
              getDetail:this.$api.billingEnt.queryEbBuyerParamByOne,//详情
              updateEbBuyerParamsByOne:this.$api.billingEnt.updateEbBuyerParamsByOne,//修改
            },
            dictionary:{},
            formModel:{
              billModel:'',
              buyerLimitModel:'',
              minOpenDays:'',
              maxOpenDays:'',
              openExchangeRate:'',
              clearModel:'',
              clearEntName:''
            },
            fixedFlag:false,
            formRules:{
              billModel:[
                { required:false,message:'请选择开单模式',trigger: 'blur'},
              ],
              buyerLimitModel:[
                { required:false,message:'请选择开单额度模式',trigger: 'blur'},
              ],
              minOpenDays:[
                { required:false,message:'请填写开单最小期限',trigger: 'blur'},
                { validator:this.minOpenDaysValidate ,trigger: 'blur'}
              ],
              maxOpenDays:[
                { required:false,message:'请填写开单最长期限',trigger: 'blur'},
                { validator:this.maxOpenDaysValidate ,trigger: 'blur'}
              ],
              openExchangeRate:[
                { required:false,message:'请输入折扣率默认值',trigger: 'blur'},
              ],
              clearModel:[
                { required:false,message:'请选择清算模式',trigger: 'blur'},
              ],
              clearEntName:[
                { required:false,message:'请选择清算方企业',trigger: 'blur'},
              ],
            },
            billModelList:[],//开单模式
            buyerLimitModelList:[],//开单额度

            pageType:'',
            isSupportOpenQuota:true,//是否支持开单额度
            isSupportExpireClear:true,//是否支持到期清算
            //说明
            rateExplainFlag:true,
            entExplainFlag:true,
            bankExplainFlag:true,
          }
        },
        created(){
          this.getRow()
          this.getApi()
          this.getDictionary()
          this.pageType = this.$route.meta.pageType
        },
        methods:{
          //字典
          getDictionary(){
            this.zjControl.getDictionary().then(res => {
              //开单模式
              let bmlIndex = res.data.billModelList.findIndex(item => item.code === '0')
              res.data.billModelList.splice(bmlIndex,1)
              res.data.billModelListCheckbox = JSON.parse(
                JSON.stringify(res.data.billModelList).replace(/code/g,'key').replace(/desc/g,'label')
              )
              //开单额度
              res.data.buyerLimitModelListCheckbox = JSON.parse(
                JSON.stringify(res.data.buyerLimitModelList).replace(/code/g,'key').replace(/desc/g,'label')
              )
              this.dictionary = res.data
              this.getDetail()
            })

          },
          //获取详情
          getDetail(){
            let params = {
              id:this.row.id
            }
            this.zjControl.getDetail(params).then(res => {
              //---------------------------------处理开单模式---------------------------------
              //处理渲染
              if(res.data.billModelFlag !== '0'){
                let key = res.data.billModelFlag === '1' ? '2' : '1'
                let bmlIndex = this.dictionary.billModelListCheckbox.findIndex(item => item.key === key)
                this.dictionary.billModelListCheckbox.splice(bmlIndex,1)
              }
              //处理选中
              this.billModelList = res.data.billModel === '0' ? ['1','2'] : res.data.billModel ? [res.data.billModel] : []

              //---------------------------------处理开单额度模式---------------------------------
              //处理渲染
              let blmList = []
              if(res.data.buyerLimitModelFlag){
                blmList = res.data.buyerLimitModelFlag.split(',')
                //删除共用
                if(blmList[0] === '0'){
                  let gIndex = this.dictionary.buyerLimitModelListCheckbox.findIndex(item => item.key === '0')
                  this.dictionary.buyerLimitModelListCheckbox.splice(gIndex,1)
                }
                //删除自用
                if(blmList[1] === '0'){
                  let zIndex = this.dictionary.buyerLimitModelListCheckbox.findIndex(item => item.key === '1')
                  this.dictionary.buyerLimitModelListCheckbox.splice(zIndex,1)
                }
              }
              //处理选中
              let blmCheckList = []
              let blmCheck = []
              if(res.data.buyerLimitModel){
                blmCheck = res.data.buyerLimitModel.split('')
              }
              if(blmCheck && blmCheck.length){
                if(blmCheck[0] === '1'){
                  blmCheckList.push('0')
                }
                if(blmCheck[1] === '1'){
                  blmCheckList.push('1')
                }
              }
              this.buyerLimitModelList = blmCheckList
              //---------------------------------处理到期清算模式---------------------------------
              //处理渲染
              if(res.data.clearModelFlag){
                let cmList = res.data.clearModelFlag.split(',')
                let deleteList = []
                if(cmList[0] === '0'){  deleteList.push('3')  } //清算
                if(cmList[1] === '0'){  deleteList.push('1')  } //专户
                if(cmList[2] === '0'){  deleteList.push('2')  } //直接
                deleteList.map(item => {
                  let cmIndex = this.dictionary.clearModelList.findIndex(citem => citem.code === item)
                  this.dictionary.clearModelList.splice(cmIndex,1)
                })
                //
                let isHave = this.dictionary.clearModelList.findIndex(item => item.code === res.data.clearModel)
                if(isHave < 0){
                  res.data.clearModel = ''
                }
              }
              res.data.clearEntId = ''
              this.formModel = Object.assign(this.formModel,res.data)
              //代理清算-清算方企业
              this.clearEntChange(this.formModel.clearEntName)
              //初始化默认折扣
              this.billModelListHandleCheckedChange({
                array:res.data.billModel ? res.data.billModel.split('') : [],
                init:res.data.openExchangeRate
              })
            })
          },
          //开单模式
          billModelListHandleCheckedChange(data){
            let bm = data.array
            //删除 0
            let bm0 = this.billModelList.findIndex(item => item ==='0')
            if(bm0>=0){
              delete this.billModelList[bm0]
              delete bm[bm]
            }

            if(bm && bm.length){
              bm.length > 1 ? this.formModel.billModel = '0' : this.formModel.billModel = bm.join('')
            }else{
              this.formModel.billModel = ''
            }
            //固定
            if(bm.length === 1 && bm[0] === '1'){
              this.fixedFlag = true
              this.formModel.openExchangeRate = '100'
            }
            //非固定 或 固定+非固定
            else{
              this.fixedFlag = false
              this.formModel.openExchangeRate = data.init || ''
            }

          },
          //开单额度
          buyerLimitModelListHandleCheckedChange(data){
            let blm = ['0','0']
            data.array.includes('0') ?  blm[0] = '1' : blm[0] = '0'
            data.array.includes('1') ?  blm[1] = '1' : blm[1] = '0'
            blm.includes('1') ? this.formModel.buyerLimitModel = blm.join('') : this.formModel.buyerLimitModel = ''
          },
          //最短期限
          minOpenDaysInput(){
            this.formModel.minOpenDays = this.formModel.minOpenDays.replace(/[^\d]/g,'')
          },
          minOpenDaysValidate(rule, value, callback){
            if (!value && rule.required) {
              callback(new Error('请填写开单最小期限'))
            } else if (value && this.formModel.maxOpenDays && (Number(value) >= Number(this.formModel.maxOpenDays))) {
              callback(new Error('开单最小期限不可大于等于开单最长期限'))
            } else {
              callback()
            }
          },
          //最长期限
          maxOpenDaysInput(){
            this.formModel.maxOpenDays = this.formModel.maxOpenDays.replace(/[^\d]/g,'')
          },
          maxOpenDaysValidate(rule, value, callback){
            if (!value && rule.required) {
              callback(new Error('请填写开单最长期限'))
            } else if (value && this.formModel.minOpenDays && (Number(value) < Number(this.formModel.minOpenDays))) {
              callback(new Error('开单最长期限不可小于等于开单最小期限'))
            } else {
              callback()
            }
          },
          //利率
          openExchangeRateInput(){
            this.formModel.openExchangeRate = this.formModel.openExchangeRate.replace(/[^\d\.]/g,'')
            this.formModel.openExchangeRate = this.formModel.openExchangeRate.replace(/^\./g,'')
            this.formModel.openExchangeRate = this.formModel.openExchangeRate.replace(/\.{2,}/g,'.')
            this.formModel.openExchangeRate = this.formModel.openExchangeRate.replace('.','$#$').replace(/\./g,'').replace('$#$','.')

            let newopenExchangeRateList = this.formModel.openExchangeRate.split('.')
            if(Number(newopenExchangeRateList[0])>99){
              newopenExchangeRateList[0] = newopenExchangeRateList[0].slice(0,2)
            }else if(newopenExchangeRateList[0] && Number(newopenExchangeRateList[0]) < 10){
              newopenExchangeRateList[0] = Number(newopenExchangeRateList[0]) + ''
            }else{
              if(Number(newopenExchangeRateList[1])>99 || (newopenExchangeRateList[1] && newopenExchangeRateList[1].length > 2) ){
                newopenExchangeRateList[1] = newopenExchangeRateList[1].slice(0,2)
              }
            }
            this.formModel.openExchangeRate = newopenExchangeRateList.join('.')
          },
          openExchangeRateBlur(){
            if(Number(this.formModel.openExchangeRate) <= 0){
              // this.formModel.openExchangeRate = '0'
              this.formModel.openExchangeRate = ''
            }
          },
          //清算企业
          clearEntChange(name){
            if(!name){return}
            this.formModel.clearEnts.map(item => {
              if(item.entName === name){
                this.bankExplainFlag = !item.bankAccname && !item.bankAccno
                this.formModel.bankAccname = item.bankAccname
                this.formModel.bankAccno = item.bankAccno
                this.formModel.clearEntId = item.entId
              }
            })
          },
          //保存
          save(){
            let params = Object.assign({},this.formModel)
            delete params.clearEnts
            let whiteList = []
            //不支持选择开单额度模式
            // whiteList.push('buyerLimitModel')
            //不支持到期清算模式
            // whiteList.push('clearModel')

            //不是代理清算
            if(this.formModel.clearModel !== '3'){
              whiteList.push('clearEntName')
              params.clearEntName = ''
            }
            if(!this.notEmptyCheck('formModel','formRules',whiteList)){return}

            this.$refs.form.validate(boo => {
              if(!boo){return}
              // let cml = ['1','2','3']
              // params.clearModel.split('').includes('1') ?  cml[0] = '1' : cml[0] = '0'
              // params.clearModel.split('').includes('2') ?  cml[1] = '1' : cml[1] = '0'
              // params.clearModel.split('').includes('3') ?  cml[2] = '1' : cml[2] = '0'
              // params.clearModel = cml.join('')

              //检测代理清算-清算方企业是否正确
              if(this.formModel.clearModel === '3'){
                let cmFlag = this.formModel.clearEnts.find(item => item.entName === this.formModel.clearEntName)
                if(!cmFlag){
                  return this.$messageBox({
                    type:'info',
                    content:'请选择正确的清算方企业'
                  })
                }
              }

              this.$messageBox({
                title:'修改确认',
                content:'请您确认是否均已选择正确',
                showCancelButton:true,
                messageResolve:()=>{
                  this.zjControl.updateEbBuyerParamsByOne(params).then(() => {
                    this.$Message.success('保存成功！')
                    this.goParent()
                  })
                }
              })
            })
          }
        }
    }
</script>

<style lang="less">
#bn-deploy{
  background-color: white;
  padding: 20px;
  .border-bottom{
    border-bottom: 1px dashed grey;
  }
  .zj-checkbox{
    margin-left: 0!important;
  }
  .el-input-rate{
    .el-input-group__append{
      &:hover{
        border: 1px solid #DCDFE6!important;
        border-left-width:0!important;
        border-radius:0 4px 4px 0!important;
        background-color: #F5F7FA!important;
        color: #909399!important;
      }
      .el-button{
        border-color: transparent!important;
        background-color: transparent!important;
      }
    }
  }

  .f60{
    .el-form-item__label{
      font-size: 12px;
      color: #ff6600;
    }

  }
  //详情页禁用
  .bn-deploy_detail{
    .is-disabled{
      .el-checkbox__inner::after,.el-radio__input{
        border-color:#333;
      }
      .el-checkbox__label,.el-input__inner,.el-radio__label{
        color:#333;
      }
      .el-radio__inner::after{
        background-color: #333;
      }
    }
  }

}
</style>
