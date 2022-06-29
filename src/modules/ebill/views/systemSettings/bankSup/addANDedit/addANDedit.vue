<template>
  <div id="bankSup-add">
    <el-form :model="formModel" :rules="formRules" ref="form" label-width="240px" class="bankForm">
      <el-form-item label=" ">
        <el-row class="jc16 zj-p-l-30">银行-供应商企业参数配置</el-row>
      </el-form-item>
      <el-form-item label="平台项目名称：" prop="projectId" class="required" :rules="[{ required: true, message: '请选择平台项目名称', trigger: 'change' }]">
        <el-select style="width: auto" v-model="formModel.projectName" disabled v-if="pageType=== 'edit'">
          <el-option
            :label="formModel.projectName"
            :value="formModel.projectName"></el-option>
        </el-select>
        <el-select style="width: auto" v-model="formModel.projectId" @change="changeProject" placeholder="请选择平台项目名称" v-else>
          <el-option
            v-for="(item, index) in projects"
            :label="item.desc"
            :value="item.code"
            :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资金方名称：" prop="fundingEntId" class="no-required">
        <el-select v-model="formModel.fundingEntName" :disabled="!formModel.projectId || pageType === 'edit'" @change="fundingEntsChange">
          <el-option
            v-for="item in fundingEnts"
            :key="item.entId"
            :value="item.entId"
            :label="item.entName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商企业名称：" prop="entId" class="no-required">
        <el-select v-model="formModel.entName" filterable :popper-append-to-body="false"
                   :placeholder="formModel.fundingEntId ? '' : '请您先选择资金方'"
                   :disabled="!formModel.fundingEntId || pageType === 'edit'"
                   @change="supEntChange"
        >
          <el-option v-for="item in supEntList" :key="item.entId" :label="item.entName" :value="item.entId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="是否准入：" prop="isAllow" class="no-required">
        <el-select v-model="formModel.isAllow" filterable :popper-append-to-body="false" :disabled="!formModel.entId">
          <el-option v-for="item in dictionary.isAllow" :key="item.code" :label="item.desc" :value="item.code"/>
        </el-select>
      </el-form-item>
      <!-- 农业 -->
      <div v-if="formModel.channelNo === 'ABC'">
        <zj-button class="primary">农业银行参数配置</zj-button>
        <div class="zj-m-t-20">
          <el-form-item label="供应商银行客户号/供应商农行编码：">
            {{pageType === 'add' ? '无需人工配置，新增后系统自动从银行获取' : formModel.allowSerialNo}}
          </el-form-item>
          <el-form-item label="准入生效日期：">
            {{pageType === 'add' ? '无需人工配置，新增后系统自动从银行获取' :
            `
              ${formModel.allowDate ? date(formModel.allowDate) : ''}
              ${formModel.allowDate || formModel.allowExpireDate ? ' 至 ' : '' }
              ${formModel.allowExpireDate ? date(formModel.allowExpireDate) : ''}
            `
            }}
          </el-form-item>
          <el-form-item label="融资放款账户名称：">
            {{pageType === 'add' ? '无需人工配置，新增后系统自动从银行获取' : formModel.bankAccname}}
          </el-form-item>
          <el-form-item label="融资放款账户号码：">
            {{pageType === 'add' ? '无需人工配置，新增后系统自动从银行获取' : formModel.bankAccno}}
          </el-form-item>
          <el-form-item label="融资利率（%）：">
            {{pageType === 'add' ? '无需人工配置，新增后系统自动从银行获取' : rate(formModel.interestRate)}}
          </el-form-item>
          <el-form-item label="保理手续费率（%）：">
            {{pageType === 'add' ? '无需人工配置，新增后系统自动从银行获取' : rate(formModel.blFeeRate)}}
          </el-form-item>
  <!--        <el-form-item label="平台服务费率（%）：">-->
  <!--          {{pageType === 'add' ? '无需人工配置，新增后系统自动从银行获取' : rate(formModel.plFeeRate)}}-->
  <!--        </el-form-item>-->
          <el-form-item label="平台服务费率（%）：" prop="plFeeRate" class="no-required">
              <el-input v-model="formModel.plFeeRate" @input="plFeeRateInput" @blur="plFeeRateBlur" @focus="plFeeRateInput" class="el-input-rate">
                <el-button slot="append">%</el-button>
              </el-input>
          </el-form-item>
          <el-form-item label="收息方式：">
            {{pageType === 'add' ? '无需人工配置，新增后系统自动从银行获取' : formModel.interestType}}
          </el-form-item>
        </div>
      </div>
      <!-- 中信 -->
      <div v-if="formModel.channelNo === 'CITIC'">
        <zj-button class="primary">中信银行参数配置</zj-button>
        <div class="zj-m-t-20">
          <el-row class="expire" v-if="isShowExpire">
            如果已开通虚拟户，以下收款银行账户信息自动带出，不可修改
          </el-row>
          <el-form-item label="收款账户开户行：" prop="bankName" class="no-required">
            <el-input v-model="formModel.bankName" :disabled="isVirtualAcct === '1'"/>
          </el-form-item>
          <el-form-item label="收款账户户名/资金分簿名称：" prop="bankAccname" class="no-required">
            <el-input v-model="formModel.bankAccname" :disabled="isVirtualAcct === '1'"/>
          </el-form-item>
          <el-form-item label="供应商收款银行账号/资金分簿编号：" prop="bankAccno" class="no-required">
            <el-input v-model="formModel.bankAccno" :disabled="isVirtualAcct === '1'"/>
          </el-form-item>
          <el-form-item label="联行号：" prop="bankNo" class="no-required">
            <el-input v-model="formModel.bankNo" :disabled="isVirtualAcct === '1'"/>
          </el-form-item>
          <el-form-item label="融资利率（%）：" prop="interestRate" class="no-required">
            <el-input v-model="formModel.interestRate" @input="interestRateInput" @blur="interestRateBlur" @focus="interestRateInput" class="el-input-rate">
              <el-button slot="append">%</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="保理手续费率（%）：" prop="blFeeRate" class="no-required">
            <el-input v-model="formModel.blFeeRate" @input="blFeeRateInput" @blur="blFeeRateBlur" @focus="blFeeRateInput" class="el-input-rate">
              <el-button slot="append">%</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="平台服务费率（%）：" prop="plFeeRate" class="no-required">
            <el-input v-model="formModel.plFeeRate" @input="plFeeRateInput" @blur="plFeeRateBlur" @focus="plFeeRateInput" class="el-input-rate">
              <el-button slot="append">%</el-button>
            </el-input>
          </el-form-item>
          <el-row class="expire" v-if="isShowExpire">
            说明：如果资金方参数中，中信银行选择了“使用虚拟户”，该供应商尚未签署协议的， 系<br/>
            统将新增一条待签署的协议给供应商签署，请及时提示供应商需签署该协议
          </el-row>
        </div>
      </div>
      <el-row class="w85 zj-p-t-20 zj-p-l-265">
        <zj-button class="pass" @click="confrim">提交</zj-button>
        <zj-button class="back" @click="goParent">取消</zj-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import ZjButton from "@pubComponent/button/ZjButton";
  let channelNos = ''
  import {validateBankNo} from '@utils/rules'
  import inputMethods from "../inputMethods";
  export default {
    name: "add",
    components: {ZjButton},
    mixins:[inputMethods],
    computed: {
      projects () {
        return this.dictionary.entProjectLists;
      }
    },
    data(){
      return {
        zjControl:{
          getDictionary:this.$api.bankSup.getDictionary,//字典
          getFundingList:this.$api.bankSup.getFundingList,//获取资金端信息列表
          getReceiptList:this.$api.bankSup.getReceiptList,//获取供应商企业信息列表
          getEntBankInfo:this.$api.bankSup.getEntBankInfo,//是否开通虚拟户
          //修改时使用的详情
          updateDetail:this.$api.bankSup.updateDetail,

          saveFundingSellerParam:this.$api.bankSup.saveFundingSellerParam,//新增
          updateFundingSellerParam:this.$api.bankSup.updateFundingSellerParam,//修改
        },
        dictionary:{},
        fundings:[], //银行
        fundingEnts:[], //资金方
        supEntList:[],//供应商企业
        formModel:{
          projectId: '', // 项目ID
          projectName: '', // 项目名称
          channelNo:'',//银行类型
          fundingEntId:'',//资金方名称
          entId:'',//供应企业
          isAllow:'',//是否准入
          allowDate:'',//准入生效日期 - abc
          bankName:'',//收款账户开户行 - citic
          bankAccname:'',// 融资放款账户名称 - 收款账户户名/资金分簿名称
          bankAccno:'',// 融资放款账户号码 - 供应商收款银行账号/资金分簿编号
          bankNo:'',//联行号
          interestRate:'', //融资利率
          blFeeRate:'', //保理手续费率
          plFeeRate:'', // 平台服务费率
          interestType:'',//收息方式
        },
        formRules:{
          channelNo:[
            { required: false, message: '请选择银行类型', trigger: 'change' }
          ],
          fundingEntId:[
            { required: false, message: '请选择资金方', trigger: 'change' }
          ],
          entId:[
            { required: false, message: '请选择供应商企业', trigger: 'change' }
          ],
          isAllow:[
            { required: false, message: '请选择是否允许准入', trigger: 'change' }
          ],
          bankName:[
            { required: false, message: '请输入收款账户开户行', trigger: 'blur' }
          ],
          bankAccname:[
            { required: false,
              message: `请输入${channelNos === 'ABC' ? '融资放款账户名称' : '收款账户户名/资金分簿名称'}`,
              trigger: 'change'
            }
          ],
          bankAccno:[
            { required: false,
              message: `请输入${channelNos === 'ABC' ? '融资放款账户号码' : '供应商收款银行账号/资金分簿编号'}`,
              trigger: 'change'
            },
            { validator:(rule, value, callback)=>{
                let bankAcctReg = /^(\d{8,})$/
                if (!value && rule.required) {
                  callback(new Error(`请输入${channelNos === 'ABC' ? '融资放款账户号码' : '供应商收款银行账号/资金分簿编号'}`))
                } else if (value && !bankAcctReg.test(value)) {
                  callback(new Error(`${channelNos === 'ABC' ? '融资放款账户号码' : '供应商收款银行账号/资金分簿编号'}格式不正确`))
                } else {
                  callback()
                }
            } ,trigger: 'blur'}
          ],
          bankNo:[
            { required: false, message: '请输入联行号', trigger: 'blur' },
            { validator:validateBankNo ,trigger: 'blur'}
          ],
          interestRate:[
            { required: false, message: '请输入融资利率', trigger: 'blur' }
          ],
          blFeeRate:[
            { required: false, message: '请输入保理手续费率', trigger: 'blur' }
          ],
          plFeeRate:[
            { required: false, message: '请输入平台服务费率', trigger: 'blur' }
          ],
          interestType:[
            { required: false, message: '请选择收息方式', trigger: 'change' }
          ],
        },
        isVirtualAcct:'',//是否开通了虚拟户 0否1是
        pageType:'', //为修改还是新增
        isShowExpire:true,//是否显示提示
      }
    },
    created() {
      this.getApi()
      this.getDictionary()
      this.pageType = this.$route.meta.pageType
      if(this.pageType === 'edit'){
        //调用修改详情
        this.getRow()
        this.updateDetail()
      }
    },
    methods: {
      //获取字典
      getDictionary() {
        this.zjControl.getDictionary().then(res => {
          this.dictionary = res.data
        })
      },
      //获取资金方企业
      getFundingList() {
        this.zjControl.getFundingList({projectId: this.formModel.projectId}).then(res => {
          this.fundingEnts = res.data.fundings
        })
      },
      //获取供应商企业名称
      getReceiptList() {
        this.zjControl.getReceiptList({projectId: this.formModel.projectId}).then(res => {
          this.supEntList = res.data.ents
        })
      },
      changeProject () {
        this.initForm(null,['projectId'])
        this.formModel.channelNo = [];
        this.getFundingList()
        this.getReceiptList()
        const selectProject = this.projects.filter((item) => {
          return item.code === this.formModel.projectId;
        });
        if (selectProject.length) {
          this.formModel.projectName = selectProject[0].desc;
        }
      },
      initForm (boo,whiteList) {
        //boo 是否初始化
        if (!boo) {
          //清空 资金方选中、供应商选中
          this.formModel.fundingEntId = ''
          this.formModel.entId = ''
          this.formModel.fundingEntName=''
          //清空银行信息
          if (this.formModel.channelNo === 'CITIC') {
            this.removeAllBankInfo()
          }
          //清空其他
          for (let key in this.formRules) {
            if (!whiteList.find(item => item === key)) {
              this.formModel[key] = ''
              this.$refs.form.clearValidate(key)
            }
          }
        }
      },
      //银行类型发生改变
      /*fundingsChange(channelNo, boo) {
        //获取 资金方名称列表
        channelNos = channelNo
        this.fundings.map(item => {
          if (item.channelNo === channelNo) {
            this.fundingEnts = item.fundingEnts
          }
        })
         this.initForm(boo,['channelNo']);
      },*/
      //资金方发生改变
      fundingEntsChange(newFun, boo) {
        if (!newFun) {
          return
        }
        //对比字典
        this.fundingEnts.map(item => {
          if (item.entId === newFun) {
            this.formModel.fundingEntId = item.entId
            this.formModel.fundingEntName = item.entName
            this.formModel.channelNo = item.channelNo
          }
        })
        // boo 是否初始化
        if (!boo) {
          //清空银行信息
          if (this.formModel.channelNo === 'CITIC') {
            this.removeAllBankInfo()
          }
          //当银行类型与供应商 都存在 调用虚拟户检测
          if (this.formModel.channelNo && this.formModel.entId) {
            this.getIsOpenVirtual()
          }
        }

      },
      //供应商发生改变
      supEntChange(newEntId, boo) {
        if (!newEntId) {
          return
        }
        //对比字典
        this.supEntList.map(item => {
          if (item.entId === newEntId) {
            this.formModel.entId = item.entId
            this.formModel.entName = item.entName
          }
        })
        //boo是否初始化
        if (!boo) {
          //清空银行信息
          let arr = ['bankName', 'bankAccno', 'bankAccname', 'bankNo']
          if (this.formModel.channelNo === 'CITIC') {
            this.removeAllBankInfo()
          }
          //当银行类型与资金方 都存在 调用虚拟户检测
          if (this.formModel.channelNo && this.formModel.fundingEntId) {
            this.getIsOpenVirtual()
          }
        }

      },
      //清空银行信息
      removeAllBankInfo() {
        let arr = ['bankName', 'bankAccno', 'bankAccname', 'bankNo']
        arr.forEach(item => {
          this.formModel[item] = ''
        })
      },
      // //融资利率
      // interestRateInput(){ this.rateInput(this.formModel,'interestRate')},
      // interestRateBlur(){this.rateBlur(this.formModel,'interestRate')},
      // //保理手续费率
      // blFeeRateInput(){ this.rateInput(this.formModel,'blFeeRate')},
      // blFeeRateBlur(){this.rateBlur(this.formModel,'blFeeRate')},
      // //平台服务费率
      // plFeeRateInput(){ this.rateInput(this.formModel,'plFeeRate')},
      // plFeeRateBlur(){this.rateBlur(this.formModel,'plFeeRate')},
      //
      // //利率统一处理
      // rateInput(obj,name) {
      //   this.formModel[name] = this.formModel[name].replace(/[^\d\.]/g, '')
      //   this.formModel[name] = this.formModel[name].replace(/^\./g, '')
      //   this.formModel[name] = this.formModel[name].replace(/\.{2,}/g, '.')
      //   this.formModel[name] = this.formModel[name].replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      //
      //   let newRateList = this.formModel[name].split('.')
      //   if (Number(newRateList[0]) > 99) {
      //     newRateList[0] = newRateList[0].slice(0, 2)
      //   } else if (newRateList[0] && Number(newRateList[0]) < 10) {
      //     newRateList[0] = Number(newRateList[0]) + ''
      //   } else {
      //     if (Number(newRateList[1]) > 9999 || (newRateList[1] && newRateList[1].length > 4)) {
      //       newRateList[1] = newRateList[1].slice(0, 4)
      //     }
      //   }
      //   this.formModel[name] = newRateList.join('.')
      //   console.error(this.formModel[name])
      // },
      // rateBlur(obj,name) {
      //   let splitList = this.formModel[name].split('.')
      //   if (Number(splitList[0]) > 0 && Number(splitList[0]) < 10) {
      //     splitList[0] = Number(splitList[0]) + ''
      //   } else if (!splitList[0]) {
      //     splitList[0] = ''
      //   }
      //   // splitList[0] = Number(splitList[0])+''
      //   this.formModel[name] = splitList.join('.')
      // },
      //获取详情 -- 修改时
      updateDetail() {
        let params = {
          id: this.row.id
        }
        this.zjControl.updateDetail(params).then(res => {
          // 虚拟户判断
          this.isVirtualAcct = res.data.isVirtualAcct
          // 触发资金方改变
          channelNos = res.data.channelNo
          this.fundingEntsChange(res.data.fundingEntName, true)
          //最后赋值
          this.formModel = Object.assign(this.formModel, res.data)
          this.formModel.interestRate = res.data.interestRate
          this.formModel.blFeeRate = res.data.blFeeRate
          this.formModel.plFeeRate = res.data.plFeeRate
        })
      },
      //获取判断是否开通虚拟户
      getIsOpenVirtual() {
        if (this.formModel.channelNo !== 'CITIC') {
          return
        }
        let {channelNo, fundingEntId, entId,projectId} = this.formModel
        let params = {
          channelNo, fundingEntId, entId,projectId
        }
        this.zjControl.getEntBankInfo(params).then(res => {
          let arr = ['bankName', 'bankAccno', 'bankAccname', 'bankNo']
          arr.forEach(item => {
            this.formModel[item] = res.data[item]
          })
          this.isVirtualAcct = res.data.isVirtualAcct
        })
      },
      //提交
      confrim() {
        let whiteList = []
        if (this.formModel.channelNo === 'ABC') {
          whiteList = ['allowDate', 'bankName', 'bankAccname', 'bankAccno', 'bankNo', 'interestRate', 'blFeeRate', 'interestType']
        } else if (this.formModel.channelNo === 'CITIC') {
          whiteList = ['allowDate', 'interestType']
          //是否开通了虚拟户
          if (this.isVirtualAcct === '1') {
            whiteList = [...whiteList, ...['bankName', 'bankAccname', 'bankAccno', 'bankNo']]
          }
        }
        if (!this.notEmptyCheck('formModel', 'formRules', whiteList)) {
          return
        }
        this.$refs.form.validate(boo => {
          if (!boo) {
            return
          }
          //新增
          if (this.pageType === 'add') {
            this.$messageBox({
              type:'confirm',
              title: '新增确认',
              content: '确认后系统将为您新增一条参数记录',
              showCancelButton: true,
              messageResolve: () => {
                this.zjControl.saveFundingSellerParam(this.formModel).then(res => {
                  if (res.data.success) {
                    this.$Message.success(res.data.msg ? res.data.msg : '新增成功！')
                  } else {
                    this.$Message.error(res.data.msg ? res.data.msg : '新增失败！')
                  }
                  this.goParent()
                })
              }
            })
          }
          //修改
          else if (this.pageType === 'edit') {
            this.$messageBox({
              type:'confirm',
              title: '修改确认',
              content: '确认后系统将为您该记录参数',
              showCancelButton: true,
              messageResolve: () => {
                this.zjControl.updateFundingSellerParam(this.formModel).then(() => {
                  this.$Message.success('修改成功！')
                  this.goParent()
                })
              }
            })
          }
        })

      },
    }
  }
</script>

<style lang="less">
  #bankSup-add{
    width: 100%;
    min-height: 100%;
    background-color: white;
    padding: 20px 0;
    .bankForm{
      width: 530px;
      margin: auto;
      transform: translateX(-20%);
      .el-form-item__label{
        color: #999999;
      }
      .el-select,.el-input{
        width: 270px;
      }
      .expire{
        color: #ff6600;
        position: relative;
        width: 700px;
        text-align: center;
      }
    }
  }
</style>
