<template>
  <div id="ss-platform">
    <el-form :model="formModel" :rules="formRules" label-width="210px" ref="form">
      <el-tabs v-model="myTabActive" type="card" class="zj-tabs-card">
        <el-tab-pane label="平台基本信息" name="platformSetting">

          <div>
            <h4 class="sec-title">平台信息</h4>

            <el-form-item label="平台名称：" prop="platFormName">
              <el-input v-model="formModel.platFormName"/>
            </el-form-item>

            <el-form-item label="平台运营企业名称：" prop="entName">
              <el-input v-model="formModel.entName" :disabled="true"/>
            </el-form-item>

            <el-form-item label="平台项目模式：" prop="entName">
              <el-radio-group v-model="formModel.projectType">
                <el-radio v-for="(item,index) in this.dictionary.platformProjectType" :key="index" :label="item.code">
                  {{item.desc}}
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="是否支持多资金方：" prop="isMutiFunding">
              <el-radio-group v-model="formModel.isMutiFunding">
                <el-radio v-for="(item,index) in dictionary.isMutiFundingList" :key="index" :label="item.code">
                  {{item.desc}}
                </el-radio>
              </el-radio-group>
            </el-form-item>

          </div>

          <div>
            <h4 class="sec-title">产品开通</h4>

            <el-form-item label="基础产品：" prop="products">
              <zj-checkbox :hasCheckAll="false"
                           :checkAll="false"
                           :list="baseProductDict"
                           :value.sync="baseProducts"
              />

            </el-form-item>
            <!--付款折扣勾选显示-->
            <el-form-item label="(付款折扣)名称：" prop="epdProductName" v-if="baseProducts.includes('EPD')">
              <el-input v-model="formModel.epdProductName"/>
              <el-checkbox v-model="isProductEpd" class="zj-m-l-10">支持自定义</el-checkbox>
            </el-form-item>
            <!--电子债权凭证勾选显示-->
            <el-form-item label="(电子债权凭证)名称：" prop="productName" v-if="baseProducts.includes('RD')">
              <el-input v-model="formModel.productName"/>
              <el-checkbox v-model="isProduct" class="zj-m-l-10">支持自定义</el-checkbox>
            </el-form-item>

            <el-form-item label="银行直连支持：" prop="isMutiFunding">
              <zj-checkbox :hasCheckAll="false"
                           :checkAll="false"
                           :list="bankSuppotDict"
                           :value.sync="bankSuppots"
              />
            </el-form-item>

          </div>

          <div>
            <h4 class="sec-title">功能开通</h4>
            <el-form-item label="开通天眼查：" class="zj-checkbox-ml0 zj-m-b-5" prop="isOpentTyc">
              <el-radio-group v-model="formModel.isOpentTyc" @change="openTycChange">
                <el-radio v-for="(item,index) in dictionary.isOpenTycList" :key="index" :label="item.code">
                  {{item.desc}}
                </el-radio>
              </el-radio-group>
              <el-form-item prop="tycModule" class="zj-m-b-0">
                <zj-checkbox :hasCheckAll="false" :disabled="formModel.isOpentTyc !== '1'"
                             :list="dictionary.tycModuleListCheckbox"
                             :value.sync="tycModule"
                             @handleCheckedChange="tycModuleHandleCheckedChange"
                />
              </el-form-item>
            </el-form-item>

            <el-form-item label="开通联网核查：" prop="netWorkFlag">
              <el-radio-group v-model="formModel.netWorkFlag">
                <el-radio v-for="(item,index) in dictionary.networkFlagList" :key="index" :label="item.code">
                  {{item.desc}}
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="开通OCR发票识别：" prop="ocrFlag">
              <el-radio-group v-model="formModel.ocrFlag">
                <el-radio v-for="(item,index) in dictionary.ocrFlagList" :key="index" :label="item.code">
                  {{item.desc}}
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="开通发票验真：" prop="sysValidateFlag">
              <el-radio-group v-model="formModel.sysValidateFlag">
                <el-radio v-for="(item,index) in dictionary.isInvoiceCheckList" :key="index" :label="item.code">
                  {{item.desc}}
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="开通人脸识别：" prop="isFaceCheck">
              <el-radio-group v-model="formModel.isFaceCheck">
                <el-radio v-for="(item,index) in dictionary.isFaceCheckList" :key="index" :label="item.code">
                  {{item.desc}}
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="证书类型：" prop="certType">
              <el-radio-group v-model="formModel.certType">
                <el-radio v-for="(item,index) in dictionary.certTypeList" :key="index" :label="item.code">
                  {{item.desc}}
                </el-radio>
              </el-radio-group>
            </el-form-item>

          </div>


          <div>
            <h4 class="sec-title">运营信息</h4>

            <el-form-item label="邮寄地址信息：" prop="userName">
              <br>
              <div>
                <el-form-item prop="fastMailName">
                 <span>收件人：
                    <el-input v-model="formModel.fastMailName" type="text" class="zj-m-l-25"/>
                 </span>
                </el-form-item>
              </div>
              <div class="zj-m-t-3 zj-m-b-3">
                <el-form-item prop="fastMailAddres">
            <span>收件地址：
            <el-input v-model="formModel.fastMailAddres" type="text" class="zj-m-l-12"/>
           </span>
                </el-form-item>
              </div>
              <div class="common-fast-mail-tel">
                <el-form-item prop="fastMailTel">
            <span>收件人电话：
            <el-input v-model="formModel.fastMailTel" type="text"/>
           </span>
                </el-form-item>
              </div>
            </el-form-item>

            <el-form-item label="客服电话：" prop="servicePhone">
              <el-input v-model="formModel.servicePhone" type="phone"/>
            </el-form-item>

          </div>


          <div>
            <h4 class="sec-title">平台协议</h4>

            <el-form-item label="一级用户服务协议签署方：" prop="userProtocolPart">
              <el-radio-group v-model="formModel.userProtocolPart">
                <el-radio v-for="(item,index) in dictionary.userProtocolPartList" :key="index" :label="item.code" class="zj-row zj-p-t-8"
                  :disabled="disabledByProjectType(item)">
                  {{item.desc}}
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-table
              :data="formModel.protocol"
              style="width:75%; margin-bottom: 28px;"
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
                prop="name"
                label="协议名称"
                width="540"
                align="center"
              >
              </el-table-column>

              <el-table-column
                prop="agreementVersion"
                label="版本号"
                min-width="120"
                align="center"
              >

              </el-table-column>

              <el-table-column
                prop="templateNo"
                label="操作"
                align="center"
              >
                <template slot-scope="scope">
                  <zj-button :api="zjBtn.downProtocol" @click="downloadAgreement(scope.row.name,scope.row.templateNo)" class="link-style" >下载</zj-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$store.getters['project/productName']+'产品信息'" name="platformFinancingSetting">
          <el-collapse ref="elCollapse" v-model="activeNames" class="zjcoll-noSelect" style="border-bottom: none">
            <el-collapse-item name="qykd" :disabled="true">
              <template slot="title">
                <h4 class="orderTitle">企业开单</h4>
              </template>
              <el-row>
                <el-form-item label="开单模式：" prop="billModel">
                  <el-radio-group v-model="formModel.billModel" @change="billModelChange">
                    <el-radio v-for="(item,index) in dictionary.billModelList" :key="index" :label="item.code">
                      {{item.desc}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="上传合同发票模式：" class="zj-checkbox-ml0" prop="attachUploadModel">
                  <zj-checkbox :hasCheckAll="false"
                               :list="dictionary.contractListCheckbox"
                               :value.sync="contract"
                               @handleCheckedChange="contractHandleCheckedChange"
                  />
                </el-form-item>
                <el-form-item label="开单额度模式：" class="zj-checkbox-ml0" prop="buyerLimitModel">
                  <zj-checkbox style="overflow: auto" :hasCheckAll="false"
                               :list="dictionary.buyerLimitModelListCheckbox"
                               :value.sync="buyerLimitModel"
                               @handleCheckedChange="buyerLimitModelHandleCheckedChange"
                  />
                  <el-row>
                    <div v-for="(item,index) in dictionary.buyerLimitExpire" :key="index" class="buyerLimitExpire">
                      <b class="zj-row">{{item.title}}</b>
                      {{item.content}}
                    </div>
                  </el-row>
                </el-form-item>
              </el-row>
            </el-collapse-item>
            <el-collapse-item name="dqqs" :disabled="true">
              <template slot="title">
                <h4 class="orderTitle">到期清算</h4>
              </template>
              <el-row>
                <el-form-item label="清算模式：" class="zj-checkbox-ml0 zj-checkbox-item-block" prop="clearModel">
                  <zj-checkbox :hasCheckAll="false"
                               :list="dictionary.clearModelListCheckbox"
                               :value.sync="clearModel"
                               @handleCheckedChange="clearModelHandleCheckedChange"
                  />
                </el-form-item>
              </el-row>
            </el-collapse-item>
            <el-collapse-item name="pztpyz" :disabled="true">
              <template slot="title">
                <h4 class="orderTitle">凭证图片印章</h4>
              </template>
              <el-row>
                <el-form-item>
                  <zj-button class="confirm" @click="allCheckBox(true)">全部勾选</zj-button>
                  <zj-button class="back" @click="allCheckBox(false)">全部取消</zj-button>
                </el-form-item>
                <el-form-item v-for="(item,index) in dictionary.voucherTypeList" :key="index" :label="item.desc+'：'" class="zj-checkbox-ml0">
                  <zj-checkbox :hasCheckAll="false"
                               :list="item.children"
                               :value.sync="item.checkList"
                  />
                </el-form-item>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <el-row class="w85 ta-c zj-m-b-15">
      <zj-button :api="zjBtn.updatePlatform" class="save-btn" @click="save">保存</zj-button>
    </el-row>

  </div>
</template>

<script>
import ZjButton from "@pubComponent/button/ZjButton";
export default {
  name: "index",
  components: {ZjButton},
  data(){
    return {
      myTabActive: 'platformSetting',
      zjControl:{
        getDictionary:this.$api.platform.getDictionary,//字典
        queryPlatform:this.$api.platform.queryPlatform,//查询
        updatePlatform:this.$api.platform.updatePlatform,//修改
        billModelChange:this.$api.platform.billModelChange,//开单模式变更
        clearModelChange:this.$api.platform.clearModelChange,//清算模式变更
        downProtocol: this.$api.platform.downProtocol,  //协议下载
      },
      dictionary:{},
      formModel:{},
      formRules:{
        epdProductName: [ {required: false, message: '请输入产品名称', trigger: 'blur'} ],
        productName: [ {required: false, message: '请输入产品名称', trigger: 'blur'} ],
        platFormName: [ {required: false, message: '请输入平台名称', trigger: 'blur'} ],
        entName: [ {required: false, message: '请输入平台运营企业名称', trigger: 'blur'} ],
        isOpentTyc: [ {required: false, message: '请选择是否需要开通天眼查', trigger: 'change'} ],
        tycModule: [ {required: false, message: '请选择天眼查所需展示的板块', trigger: 'change'} ],
        netWorkFlag: [ {required: false, message: '请选择是否需要开通联网检查', trigger: 'change'} ],
        ocrFlag: [ {required: false, message: '请选择是否需要开通OCR发票识别', trigger: 'change'} ],
        sysValidateFlag: [ {required: false, message: '请选择是否需要开通发票验真', trigger: 'change'} ],
        isFaceCheck: [ {required: false, message: '请选择是否需要开通人脸识别', trigger: 'change'} ],
        userProtocolPart: [ {required: false, message: '请选择用户服务协议签署方', trigger: 'change'} ],
        certType: [ {required: false, message: '请选择证书类型', trigger: 'change'} ],
        isMutiFunding: [ {required: false, message: '请选择是否需要支持多资金方', trigger: 'change'} ],
        billModel: [ {required: false, message: '请选择是否开单模式', trigger: 'change'} ],
        attachUploadModel: [ {required: false, message: '请选择上传合同发票模式', trigger: 'change'} ],
        buyerLimitModel: [ {required: false, message: '请选择开单额度模式', trigger: 'change'} ],
        clearModel: [ {required: false, message: '请选择清算模式', trigger: 'change'} ],
        projectType: [ {required: true, message: '请选择平台项目模式', trigger: 'change'} ],
        fastMailName: [ {required: true, message: '请输入收件人', trigger: 'blur'} ],
        fastMailAddres: [ {required: true, message: '请输入收件地址', trigger: 'blur'} ],
        fastMailTel: [ {required: true, message: '请输入收件人电话', trigger: 'blur'} ],
        servicePhone: [ {required: true, message: '请输入客服电话', trigger: 'blur'} ],
      },
      activeNames:['cpxx','qykd','dqqs','pztpyz','pzyz'],
      tycModule:[],//天眼查模块过渡
      contract:[],//合同发票模式过渡
      buyerLimitModel:[],//开单额度模式过渡
      clearModel:[],//清算模式过渡
      // 融单、在线保理、池保理、票据业务
      baseProductDict: [], //存{lable(字典的desc),key(字典的code),disable}
      baseProducts: [], // 基础平台,仅含有字典的code
      bankSuppotDict: [], // 银行直连支持字典
      bankSuppots: [], // 银行直连支持
      isProduct: false, //产品名称支持自定义
      isProductEpd: false, //产品名称支持自定义
    }
  },
  created() {
    this.getDictionary()
    this.getApi()
  },
  watch: {
    isProduct(val,oldVal){
      if(this.formModel != null){
        this.formModel.isProduct = val?"1":"0";
      }
    },
    isProductEpd(val,oldVal){
      if(this.formModel != null){
        this.formModel.isProductEpd = val?"1":"0";
      }
    },
  },
  methods:{
    getDictionary(){
      this.zjControl.getDictionary().then(res => {
        this.bankSuppotDict = res.data.bankSuppot.map(item => {
          return {key: item.code, label: item.desc};
        });
        this.baseProductDict = res.data.productType.map(item => {
          return {key: item.code, label: item.desc,disabled: item.code!='RD' && item.code!='EPD'};
        });
        console.log("baseProductDict: ", this.baseProductDict);

        //天眼查模块
        res.data.tycModuleListCheckbox = [
          {key:'t1',label:'企业基础信息'},{key:'t2',label:'经营风险'},{key:'t3',label:'司法风险'},{key:'t4',label:'知识产权'}
        ]
        //合同发票
        res.data.contractListCheckbox = [
          {key:'c1',label:'开单'},{key:'c2',label:'融资',disabled:true},{key:'c3',label:'转让'}
        ]
        //开单额度模式
        res.data.buyerLimitModelListCheckbox = JSON.parse(
          JSON.stringify(res.data.buyerLimitModelList).replace(/code/g,'key').replace(/desc/g,'label')
        )
        res.data.buyerLimitExpire = [
          {title:'什么是共用额度？',
            content:'共用额度仅限总公司拥有，资金方不能给子分公司分配共用额度。当资金方为总公司分配了共用额度后，其子分公司同时与总公司一同享有该额度的使用权。'},
          {title:'什么是自用额度？',
            content:'资金方可将该额度分配给任一企业，对总公司可配置“是否可分配”，可分配的额度，总公司可自行分配给子分公司使用。'}
        ]
        //清算模式
        res.data.clearModelListCheckbox = JSON.parse(
          JSON.stringify(res.data.clearModelList).replace(/code/g,'key').replace(/desc/g,'label')
        )
        //凭证图片印章
        let ksp = [{key:'kd',label:'开单企业印章'},{key:'sd',label:'收单企业印章'},{key:'pt',label:'平台企业印章'}]
        let zqp = [{key:'zc',label:'转出企业印章'},{key:'qs',label:'签收企业印章'},{key:'pt',label:'平台企业印章'}]
        let rzp = [{key:'rz',label:'融资企业印章'},{key:'zjf',label:'资金方企业印章'},{key:'pt',label:'平台企业印章'}]
        let kp = [{key:'kd',label:'开单企业印章'},{key:'pt',label:'平台企业印章'}]
        res.data.voucherTypeList.forEach(item => {
          item.children = []
          item.checkList = []
          //融单开立凭证 + 融单持有凭证
          if(item.code === 'KD01' || item.code === 'KD02'){
            item.children = [...[],...ksp]
          }
          //融单转让凭证
          else if(item.code === 'ZR01'){
            item.children = [...[],...zqp]
          }
          //融资放款凭证 + 融单融资凭证 + 融资息费凭证
          else if(item.code === 'FK01' || item.code === 'RZ01' || item.code === 'XF01'){
            item.children = [...[],...rzp]
          }
          //余额变更凭证 + 融单到期凭证 + 融单作废凭证
          else if(item.code === 'DQ06' || item.code === 'DQ01' || item.code === 'ZF01'){
            item.children = [...[],...kp]
          }
        })
        this.dictionary = res.data
        this.getDetail()
      })
    },
    getDetail(){
      this.zjControl.queryPlatform().then(res => {
        //天眼查模块
        let tm = []
        let tmList = res.data.tycModule.split(',')
        tmList[0] === '1' ? tm.push('t1') :''
        tmList[1] === '1' ? tm.push('t2') :''
        tmList[2] === '1' ? tm.push('t3') :''
        tmList[3] === '1' ? tm.push('t4') :''
        this.tycModule = tm

        //产品名称支持自定义
        this.isProduct = (res.data.isProduct == "1")? true:false;
        this.isProductEpd = (res.data.isProductEpd == "1")? true:false;

        //开单模式
        if(res.data.billModelFlag && res.data.billModelFlag !== '0'){
          let key = res.data.billModelFlag === '1' ? '2' : '1'
          let bmlIndex = this.dictionary.billModelList.findIndex(item => item.code === key)
          this.dictionary.billModelList.splice(bmlIndex,1)
          res.data.billModel = key === '1' ? '2' : '1'
        }
        //合同发票
        let c = []
        let cList = res.data.attachUploadModel.split('')
        cList[0] === '1' ? c.push('c1') :''
        // cList[1] === '1' ? c.push('c2') :''
        c.push('c2')
        cList[2] === '1' ? c.push('c3') :''
        let editC = res.data.attachUploadModel.split('')
        editC[1] = '1'
        res.data.attachUploadModel = editC.join('')
        this.contract = c
        //开单额度
        let blm = []
        let blmList = res.data.buyerLimitModel.split('')
        blmList[0] === '1' ? blm.push('0') :''
        blmList[1] === '1' ? blm.push('1') :''
        this.buyerLimitModel = blm
        //清算模式
        let cm = []
        let cmList = res.data.clearModel.split('')
        cmList[0] === '1' ? cm.push('1') :''
        cmList[1] === '1' ? cm.push('2') :''
        cmList[2] === '1' ? cm.push('3') :''
        cmList[3] === '1' ? cm.push('4') :''
        this.clearModel = cm
        //设置凭证图片选中
        for(let key in res.data.sealParams){
          let kitem = res.data.sealParams[key]
          //循环字典
          this.dictionary.voucherTypeList.map(item => {
            //设置对应项
            if(item.code === kitem.templateNo){
              //平台
              if(kitem.isPlSeal === '1'){
                item.checkList.push('pt')
              }
              //转+开
              if(kitem.isOutEntSeal === '1'){
                //转出
                let zcArr = item.children.filter(item => item.key === 'zc')
                if(zcArr && zcArr.length){
                  item.checkList.push('zc')
                }
                //开单
                let kdArr = item.children.filter(item => item.key === 'kd')
                if(kdArr && kdArr.length){
                  item.checkList.push('kd')
                }
      
              }
              //收 + 融 + 签
              if(kitem.isInEntSeal === '1'){
                //收单
                let sdArr = item.children.filter(item => item.key === 'sd')
                if(sdArr && sdArr.length){
                  item.checkList.push('sd')
                }
                //签收
                let qsArr = item.children.filter(item => item.key === 'qs')
                if(qsArr && qsArr.length){
                  item.checkList.push('qs')
                }

                //融资
                let rzArr = item.children.filter(item => item.key === 'rz')
                if(rzArr && rzArr.length){
                  item.checkList.push('rz')
                }
              }

              // 资金方企业印章 --》is_bl_seal（保理公司签章）
              if(kitem.isBlSeal === '1'){
                //融资
                let zjfArr = item.children.filter(item => item.key === 'zjf')
                if(zjfArr && zjfArr.length){
                  item.checkList.push('zjf')
                }
              }
            }
          })
        }
        this.baseProducts = this.setCheckParams(this.baseProductDict, res.data.products);
        this.bankSuppots = this.setCheckParams(this.bankSuppotDict, res.data.bankSuppot);
        this.formModel = Object.assign({},res.data)
        //console.log("baseProducts:",this.baseProducts)
        //console.log("formModel:",this.formModel);
      })
    },
    //天眼查模块
    openTycChange(){
      if(this.formModel.isOpentTyc !== '1'){
        this.tycModule = []
        this.formModel.tycModule = ''
      }
    },
    tycModuleHandleCheckedChange(data){
      let tm = ['0','0','0','0']
      data.array.includes('t1') ? tm[0] = '1' : tm[0] = '0'
      data.array.includes('t2') ? tm[1] = '1' : tm[1] = '0'
      data.array.includes('t3') ? tm[2] = '1' : tm[2] = '0'
      data.array.includes('t4') ? tm[3] = '1' : tm[3] = '0'
      tm.includes('1') ? this.formModel.tycModule = tm.join(',') : this.formModel.tycModule = ''
    },
    //合同发票
    contractHandleCheckedChange(data){
      let c = ['0','0','0']
      data.array.includes('c1') ? c[0] = '1' : c[0] = '0'
      data.array.includes('c2') ? c[1] = '1' : c[1] = '0'
      data.array.includes('c3') ? c[2] = '1' : c[2] = '0'
      c.includes('1') ? this.formModel.attachUploadModel = c.join('') : this.formModel.attachUploadModel = ''
    },
    //开单额度
    buyerLimitModelHandleCheckedChange(data){
      console.info(data);
      let blm = ['0','0']
      data.array.includes('0') ?  blm[0] = '1' : blm[0] = '0'
      data.array.includes('1') ?  blm[1] = '1' : blm[1] = '0'
      blm.includes('1') ? this.formModel.buyerLimitModel = blm.join('') : this.formModel.buyerLimitModel = ''
    },
    //清算模式
    clearModelHandleCheckedChange(data){
      let cm = ['0','0','0','0']
      data.array.includes('1') ? cm[0] = '1' : cm[0] = '0'
      data.array.includes('2') ? cm[1] = '1' : cm[1] = '0'
      data.array.includes('3') ? cm[2] = '1' : cm[2] = '0'
      data.array.includes('4') ? cm[3] = '1' : cm[3] = '0'
      cm.includes('1') ? this.formModel.clearModel = cm.join('') : this.formModel.clearModel = ''
      let params = {
        clearModel:cm.join('')
      }
      this.zjControl.clearModelChange(params)
    },
    //全部勾选/全部取消
    allCheckBox(flag){
      this.dictionary.voucherTypeList.map(item => {
        if(flag){
          let keyList = []
          item.children.map(citem => {
            keyList.push(citem.key)
          })
          item.checkList = [...[],...keyList]
        }else{
          item.checkList = []
        }
      })
    },
    setCheckParams (dicts, val) {
      let result = [];
      if (val && val.length) {
        const vals = val.split(',');
        vals.forEach((item, index) => {
          if (item=='1') {
            result.push(dicts[index].key);
          }
        });
      }

      return result;
    },
    genCheckParams (dicts, selectVals) {
      let result = new Array(dicts.length).fill('0');
      dicts.forEach((item, index) => {
        if (selectVals.includes(item.key)) {
          result[index] = '1';
        }
      });
      return result;
    },
    //保存
    save(){
      this.formModel.products = this.genCheckParams(this.baseProductDict, this.baseProducts).join(',');
      if(this.formModel.products.indexOf("1") < 0){
        this.$messageBox({
          type:'warning',
          content:'请您选择需要开通的【基础产品】',
        });
        return;
      }
      this.formModel.bankSuppot = this.genCheckParams(this.bankSuppotDict, this.bankSuppots).join(',');
      if(this.formModel.bankSuppot.indexOf("1") < 0){
        this.$messageBox({
          type:'warning',
          content:'请您选择【银行直连支持】',
        });
        return;
      }

      let whiteList = []
      if(this.formModel.isOpentTyc === '0'){
        whiteList.push('tycModule')
      }
      if(!this.notEmptyCheck('formModel','formRules',whiteList)){return }
      //凭证图片印章数据组装
      let sealParams = []
      this.dictionary.voucherTypeList.map((item,index) => {
        let templateNo = item.code
        let isPlSeal = item.checkList.includes('pt') ? '1' : '0'
        let isOutEntSeal = item.checkList.includes('zc') || item.checkList.includes('kd') ? '1' : '0'
        let isInEntSeal = item.checkList.includes('sd') || item.checkList.includes('qs') || item.checkList.includes('rz')? '1' : '0'
        //let isBlSeal = '0'
        let isBlSeal = item.checkList.includes('zjf') ? '1' : '0'
        sealParams[index] = {
          templateNo,isBlSeal,isInEntSeal,isOutEntSeal,isPlSeal
        }
      })
      console.log("sealParams: ", sealParams);
      let params = Object.assign({},this.formModel)
      params.sealParams = sealParams
      //
      this.$messageBox({
        type:'confirm',
        content:'请您确认是否均已选择正确',
        showCancelButton:true,
        messageResolve:()=>{
          this.zjControl.updatePlatform(params).then(() => {
            this.$messageBox({
              type:'success',
              content:'保存成功！',
              messageResolve:() => {
                this.allCheckBox(false)
                this.getDetail()
              }
            })
          })
        }
      })
    },

    //z1 - 开单模式变更
    billModelChange(billModel){
      let params = {
        billModel
      }
      this.zjControl.billModelChange(params)
    },
    //z2 - 清算模式变更 -- clearModelHandleCheckedChange

    disabledByProjectType(item){
      //根据平台项目模式判断单选按钮是否可用
      if(item.code == "3" && this.formModel.projectType == "1"){
        return true;
      }

      return false;
    },
    downloadAgreement(name,templateNo){
      //下载协议
      let params = {
        protocolName: name,
        templateNo: templateNo
      }

      this.zjControl.downProtocol(params)
    },

  }
}
</script>

<style lang="less" scoped>
#ss-platform{
  padding-top: 10px;
  .zj-checkbox-ml0{
    .zj-checkbox{
      margin-left: 0!important;
    }
    .buyerLimitExpire{
      float: left;
      width: 250px;
      padding: 5px 12px;
      height: 150px;
      font-size: 12px;
      margin-right: 15px;
      background-color: #ECF5FD;
      box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
  }
  .zj-checkbox-item-block{
    .el-checkbox{
      display: block;
    }
  }
}

.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0;
}
</style>
