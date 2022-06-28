<template>
  <div class="register haveUL swRegister">
    <RegisterHeader/>
    <div class="register-inline">
      <register-progress-bar :active="1"></register-progress-bar>
    </div>
    <div class="register-inline">
      <el-row class="register-title">操作用户</el-row>
      <!-----------------------------         经办员         ---------------------------------------->
      <div class="register-user">
        <div class="register-user-title approvedBy">
          <i class="register-user-icon"></i>
          <span class="register-user-text">经办员</span>
        </div>
        <el-form ref="applyUser" :model="form.applyUser" :rules="applyUserRules" :hide-required-asterisk="true">
          <!-- 影印件、登录用户名  -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="身份证复印件" prop="fileId">
                <template v-slot:label>
                  身份证复印件
                  <el-popover placement="right" trigger="click" ref="popover1">
                    <div>
                      <!--                          <div style="width:50px;height: 50px;position: absolute;right: 10px;top: 10px;cursor: pointer" @click="hidePopper('popover1')"/>-->
                      <img src="@assets/img/register/sample-id-card.png">
                    </div>
                    <zj-button
                      slot="reference"
                      type="text" status="primary" class="ulText"
                      @mouseenter.native="showPopper('popover1')"
                      @mouseleave.native="hidePopper('popover1')"
                    >
                      上传身份证复印件要求说明
                      <!--                          @mouseleave.native="hidePopper('popover1')"-->
                    </zj-button>
                  </el-popover>
                </template>
                <div class="zj-f-l"> <!--  style="width: 460px;" -->
                  <el-popover
                    placement="right"
                    trigger="hover">
                    <div>
                      <img :src="viewUrl.applyUser.url" width="200" height="200">
                    </div>
                    <!--                    @click="downloadFile(form.controlUser.fileId,form.controlUser.attachName)"-->
                    <el-button slot="reference" type="text" @click="downs(form.applyUser)">{{ form.applyUser.attachName }}</el-button>
                    <!--                    <zj-button slot="reference" type="text" >{{ form.controlUser.attachName }}</zj-button>-->
                  </el-popover>
                  <!--                        <zj-button type="text" @click="downloadFile(form.applyUser.fileId,form.applyUser.attachName)">{{ form.applyUser.attachName }}</zj-button>-->
                  <zj-upload :httpRequest="upload" :data="{ type: 'applyUser' }" class="zj-inline">
                    <zj-button size="mini" :class="[form.applyUser.fileId ? 'ulbtn' : '',
                                                               applyUserFlag ? 'bt-red' : '']">
                      {{form.applyUser.attachName ? '重新上传' : '上传'}}
                      <!--                            上传-->
                    </zj-button>
                  </zj-upload>
                  <!--                        <zj-button size="mini" v-show="form.applyUser.fileId" @click="previewFile(form.applyUser)">查看</zj-button>-->
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登录用户名" prop="loginName">
                <el-input v-model="form.applyUser.loginName" placeholder="6-20位字母、数字、下划线,区分大小写" maxLength="20"/>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 姓名、证件有效期  -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="userName">
                <el-input v-model="form.applyUser.userName" placeholder="经办员姓名" maxLength="50" @input="quickChange" :disabled="!applyUserUpload"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件有效期">
                <div class="zj-f-l certnoIndate" >
                  <el-form-item prop="certStartDate" class="zj-inline"> <!-- :clearable="false" -->
                    <zj-date-picker :date.sync="form.applyUser.certStartDate" :placeholder="'起始日期'"
                                    :pickerOptions="{ disabledDate: applyUserCertStartDateDisabledDate }"
                                    :disabled="!applyUserUpload"
                    />
                  </el-form-item>
                  <div class="zj-inline zj-center zj-w-20">至</div>
                  <el-form-item prop="certEndDate" class="zj-inline"> <!-- :clearable="false" -->
                    <zj-date-picker :date.sync="form.applyUser.certEndDate" :placeholder="'截止日期'"
                                    :pickerOptions="{ disabledDate: applyUserCertEndDateDisabledDate }"
                                    :disabled="!applyUserUpload"
                    />
                  </el-form-item>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 证件类型、证件号码  -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="证件类型" prop="certType">
                <el-select v-model="form.applyUser.certType"
                           @change="applyCerTypeChange"
                           :popper-append-to-body="false"
                           :disabled="!applyUserUpload"
                >
                  <template v-if="dictionary && dictionary.legalCertTypeList">
                    <el-option
                      v-for="item in dictionary.legalCertTypeList"
                      :key="item.code"
                      :value="item.code"
                      :label="item.desc">
                    </el-option>
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件号码" prop="certNo">
                <el-input v-model="form.applyUser.certNo" placeholder="经办员证件号码" maxLength="50" :disabled="!applyUserUpload"/>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 手机号码、邮箱  -->
          <el-row>
            <el-col :span="12">
                  <el-form-item label="手机号码" prop="mobileNo">
                    <el-input v-model="form.applyUser.mobileNo" placeholder="经办员手机号码" maxLength="11"
                              @input="quickChange" @change="quickChange"
                              name="applyUser"/> <!-- @input.native="fastMailPhoneChange($event)" -->
                  </el-form-item>
            </el-col>
            <el-col :span="12">
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.applyUser.email" placeholder="经办员邮箱账号"/>
                  </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-----------------------------         复核员         ---------------------------------------->
      <div class="register-user">
        <div class="register-user-title checker">
          <i class="register-user-icon"></i>
          <span class="register-user-text">复核员</span>
        </div>
        <el-form ref="reviewUser" :model="form.reviewUser" :rules="reviewUserRules" :hide-required-asterisk="true">
          <!-- 影印件、登录用户名  -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="身份证复印件" prop="fileId">
                <template v-slot:label>
                  身份证复印件
                  <el-popover placement="right" trigger="click" ref="popover2">
                    <div>
                      <!--                            <div style="width:50px;height: 50px;position: absolute;right: 10px;top: 10px;cursor: pointer" @click="hidePopper('popover2')"/>-->
                      <img src="@assets/img/register/sample-id-card.png">
                    </div>
                    <zj-button
                      slot="reference"
                      type="text" status="primary" class="ulText"
                      @mouseenter.native="showPopper('popover2')"
                      @mouseleave.native="hidePopper('popover2')"
                    >
                      上传身份证复印件要求说明
                      <!--                            @mouseleave.native="hidePopper('popover2')"-->
                    </zj-button>
                  </el-popover>
                </template>
                <div class="zj-f-l"> <!--  style="width: 460px;" -->
                  <el-popover
                    placement="right"
                    trigger="hover">
                    <div>
                      <img :src="viewUrl.reviewUser.url" width="200" height="200">
                    </div>
                    <!--                    @click="downloadFile(form.controlUser.fileId,form.controlUser.attachName)"-->
                    <el-button slot="reference" type="text" @click="downs(form.reviewUser)">{{ form.reviewUser.attachName }}</el-button>
                    <!--                    <zj-button slot="reference" type="text" >{{ form.controlUser.attachName }}</zj-button>-->
                  </el-popover>
                  <!--                        <zj-button type="text" @click="downloadFile(form.reviewUser.fileId,form.reviewUser.attachName)">{{ form.reviewUser.attachName }}</zj-button>-->
                  <zj-upload :httpRequest="upload" :data="{ type: 'reviewUser' }" class="zj-inline">
                    <zj-button size="mini" :class="[form.reviewUser.fileId ? 'ulbtn' : '',
                                                          reviewUserFlag ? 'bt-red' : '']">
                      {{ form.reviewUser.attachName ? '重新上传' : '上传' }}
                      <!--                            上传-->
                    </zj-button>
                  </zj-upload>
                  <!--                        <zj-button size="mini" v-show="form.reviewUser.fileId" @click="previewFile(form.reviewUser)">查看</zj-button>-->
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登录用户名" prop="loginName">
                <el-input v-model="form.reviewUser.loginName" placeholder="6-20位字母、数字、下划线,区分大小写" maxLength="20"/>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 姓名、证件有效期  -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="userName">
                <el-input v-model="form.reviewUser.userName" placeholder="复核员姓名" maxLength="50" @input="quickChange" :disabled="!reviewUserUpload"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件有效期">
                <div class="zj-f-l certnoIndate">
                  <el-form-item prop="certStartDate" class="zj-inline"> <!-- :clearable="false" -->
                    <zj-date-picker :date.sync="form.reviewUser.certStartDate" :placeholder="'起始日期'"
                                    :pickerOptions="{ disabledDate: reviewUserCertStartDateDisabledDate }"
                                    :disabled="!reviewUserUpload"
                    />
                  </el-form-item>
                  <div class="zj-inline zj-center zj-w-20">至</div>
                  <el-form-item prop="certEndDate" class="zj-inline"> <!-- :clearable="false" -->
                    <zj-date-picker :date.sync="form.reviewUser.certEndDate" :placeholder="'截止日期'"
                                    :pickerOptions="{ disabledDate: reviewUserCertEndDateDisabledDate }"
                                    :disabled="!reviewUserUpload"
                    />
                  </el-form-item>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 证件类型、证件号码  -->
          <el-row>
            <el-col :span="12">
                  <el-form-item label="证件类型" prop="certType">
                    <el-select v-model="form.reviewUser.certType"
                               @change="reviewCerTypeChange"
                               :popper-append-to-body="false"
                               :disabled="!reviewUserUpload"
                    >
                      <template v-if="dictionary && dictionary.legalCertTypeList">
                        <el-option
                                v-for="item in dictionary.legalCertTypeList"
                                :key="item.code"
                                :value="item.code"
                                :label="item.desc">
                        </el-option>
                      </template>
                    </el-select>
                  </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件号码" prop="certNo">
                <el-input v-model="form.reviewUser.certNo" placeholder="复核员证件号码" :disabled="!reviewUserUpload"/>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 手机号码、邮箱  -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机号码" prop="mobileNo">
                <el-input v-model="form.reviewUser.mobileNo" placeholder="复核员手机号码" maxLength="11"
                          @input="quickChange"
                          name="reviewUser"
                /> <!-- @input.native="fastMailPhoneChange($event)" -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.reviewUser.email" placeholder="复核员邮箱账号"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-----------------------------         风险信息接收人         ---------------------------------------->
      <div class="register-user">
        <div class="register-user-title receivedBy">
          <i class="register-user-icon"></i>
          <span class="register-user-text">风险信息接收人</span>
        </div>
        <el-form ref="controlUser" :model="form.controlUser" :rules="controlUserRules" :hide-required-asterisk="true">
          <!-- 影印件  -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="身份证复印件" prop="fileId">
                <template v-slot:label>
                  身份证复印件
                  <el-popover placement="right" trigger="click" ref="popover3">
                    <div>
                      <!--                      <div style="width:50px;height: 50px;position: absolute;right: 10px;top: 10px;cursor: pointer" @click="hidePopper('popover3')"/>-->
                      <img src="@assets/img/register/sample-id-card.png">
                    </div>
                    <zj-button
                      slot="reference"
                      type="text" status="primary" class="ulText"
                      @mouseenter.native="showPopper('popover3')"
                      @mouseleave.native="hidePopper('popover3')"
                    >
                      上传身份证复印件要求说明
                      <!--                      @mouseleave.native="hidePopper('popover3')"-->
                    </zj-button>
                  </el-popover>
                </template>
                <div class="zj-f-l">
                  <el-popover
                    placement="right"
                    trigger="hover">
                    <div>
                      <img :src="viewUrl.controlUser.url" width="200" height="200">
                    </div>
                    <!--                    @click="downloadFile(form.controlUser.fileId,form.controlUser.attachName)"-->
                    <el-button slot="reference" type="text" @click="downs(form.controlUser)">{{ form.controlUser.attachName }}</el-button>
                    <!--                    <zj-button slot="reference" type="text" >{{ form.controlUser.attachName }}</zj-button>-->
                  </el-popover>
                  <zj-upload :httpRequest="upload" :data="{ type: 'controlUser' }" class="zj-inline">
                    <zj-button size="mini" :class="[form.controlUser.fileId ? 'ulbtn' : '',
                                                    controlUserFlag ? 'bt-red' : '']">
                      {{form.controlUser.attachName ? '重新上传' : '上传'}}
                      <!--                      上传-->
                    </zj-button>
                  </zj-upload>
                  <!--                  <zj-button size="mini" v-show="form.controlUser.fileId" @click="previewFile(form.controlUser)">查看</zj-button>-->
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 姓名、有效期  -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="userName">
                <el-input v-model="form.controlUser.userName" placeholder="风险接收人姓名" maxLength="50" @input="quickChange" :disabled="!controlUserUpload"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件有效期">
                <div class="zj-f-l certnoIndate">
                  <el-form-item prop="certStartDate" class="zj-inline"> <!-- :clearable="false" -->
                    <zj-date-picker :date.sync="form.controlUser.certStartDate" :placeholder="'起始日期'"
                                    :pickerOptions="{ disabledDate: controlUserCertStartDateDisabledDate }"
                                    :disabled="!controlUserUpload"
                    />
                  </el-form-item>
                  <div class="zj-inline zj-center zj-w-20">至</div>
                  <el-form-item prop="certEndDate" class="zj-inline"> <!-- :clearable="false" -->
                    <zj-date-picker :date.sync="form.controlUser.certEndDate" :placeholder="'截止日期'"
                                    :pickerOptions="{ disabledDate: controlUserCertEndDateDisabledDate }"
                                    :disabled="!controlUserUpload"
                    />
                  </el-form-item>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 证件类型、证件号码  -->
          <el-row>
            <el-col :span="12">
                  <el-form-item label="证件类型" prop="certType">
                    <el-select v-model="form.controlUser.certType"
                               @change="controlCerTypeChange"
                               placeholder="请选择证件类型"
                               :popper-append-to-body="false"
                               :disabled="!controlUserUpload"
                    >
                      <template v-if="dictionary && dictionary.legalCertTypeList">
                        <el-option
                                v-for="item in dictionary.legalCertTypeList"
                                :key="item.code"
                                :value="item.code"
                                :label="item.desc">
                        </el-option>
                      </template>
                    </el-select>
                  </el-form-item>
            </el-col>
            <el-col :span="12">
                  <el-form-item label="证件号码" prop="certNo">
                    <el-input v-model="form.controlUser.certNo" placeholder="风险接收人证件号码" :disabled="!controlUserUpload"></el-input>
                  </el-form-item>
            </el-col>
          </el-row>
          <!-- 手机号码、邮箱  -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机号码" prop="mobileNo">
                <el-input v-model="form.controlUser.mobileNo" placeholder="风险接收人手机号码" @input="quickChange" maxLength="11"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.controlUser.email" placeholder="风险接收人邮箱账号"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-----------------------------         切割线         ---------------------------------------->
<!--      <div class="register-cuttingLine"></div>-->
      <!-----------------------------         资料接收地址         ---------------------------------------->
      <div class="register-title">资料接收地址</div>
      <el-form
        ref="mailForm" class="mailForm"
        :model="form" :rules="rules"
        :inline="true" :hide-required-asterisk="true"
        label-width="100px"
      >
        <!-- 收件人姓名、联系电话 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="收件人姓名：" prop="fastMailName">
<!--                <el-input-->
<!--                  class="inline-input"-->
<!--                  v-model="form.fastMailName"-->
<!--                  placeholder="收件人姓名"-->
<!--                />-->
                <el-select
                  v-model="form.fastMailName" :maxlength="50" filterable placeholder="选择快递收件人信息"
                  class="w250px"
                  allow-create
                  @change="fastMailNameChange"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in fastList"
                    :key="item.userName"
                    :value="item.type"
                    :label="item.userName"
                  />
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="12" class="mainPhone">
              <el-form-item label="联系电话：" prop="fastMailPhone">
                <el-input v-model="form.fastMailPhone" placeholder="联系电话" /> <!-- @input="fastMailPhoneInput" -->
              </el-form-item>
          </el-col>
        </el-row>
        <!-- 收货地址 -->
        <el-row>
          <el-form-item label="收件地址：" prop="fastMailAddress" class="one-row-max" style="width: 100%">
            <el-input v-model="form.fastMailAddress" placeholder="收件地址"/>
          </el-form-item>
        </el-row>
      </el-form>
      <!-----------------------------         底部按钮栏         ---------------------------------------->
      <el-row class="btn-row">
        <zj-button status="primary" @click="next">完成</zj-button>
      </el-row>
    </div>
    <zj-preview :visible.sync="viewShow" :fileUrl="viewUrl" :showFooter="false" :fileType="viewType" @close="viewShow=false"/>
    <RegisterFooter/>
  </div>
</template>

<script>
import RegisterProgressBar from './RegisterProgressBar';
import RegisterHeader from "./RegisterHeader.vue";
import RegisterFooter from "./RegisterFooter.vue";
import view from "@pubComponent/preview/view.js";
import download from "@utils/download";
import {
  validateLoginNameSW,//登录用户名
  // validateIdCard, //证件号码
  validateEmail, //电子邮箱
  validatePhone,//电话
} from '@utils/rules'
export default {
  name: 'RegisterStep103',
  mixins:[view],
  components: {
    RegisterProgressBar,RegisterHeader,RegisterFooter
  },
  props: {
    zjControl:Object,//api
    entInfoObj:Object,
    dictionary:Object,//字典
    regFlag:Boolean,//是否是注册过的
  },
  data () {
    return {
      viewApi:this.zjControl.dowmFlowFile,//替换查看器Api
      //快捷选择
      fastList:[],
      //初始化旧表单
      oldForm:{},
      //绑定表单
      form:{
        applyUser:{ //经办员
          id:'',//用户主键id：新增时为空
          userName:'',//姓名
          loginName:'',//登录用户名
          certType:'',//证件类型
          certNo:'',//证件号码
          certStartDate:'',//证件有效期起始日
          certEndDate:'',//证件有效期截止日
          attachId:'',//附件主键id：新增时为空
          fileId:'',
          attachName:'',//上传证件名称
          fileSize:'',//上传证件文件大小
          fileType:'',//上传证件文件类型
          fileUrl:'',//上传证件文件路径
          mobileNo:'',//手机号码
          email:'',//电子邮箱
        },
        reviewUser:{ //复核员
          id:'',//用户主键id：新增时为空
          userName:'',//姓名
          loginName:'',//登录用户名
          certType:'',//证件类型
          certNo:'',//证件号码
          certStartDate:'',//证件有效期起始日
          certEndDate:'',//证件有效期截止日
          fileId:'',
          attachId:'',//附件主键id：新增时为空
          attachName:'',//上传证件名称
          fileSize:'',//上传证件文件大小
          fileType:'',//上传证件文件类型
          fileUrl:'',//上传证件文件路径
          mobileNo:'',//手机号码
          email:'',//电子邮箱
        },
        controlUser:{ //风险接收人
          id:'',//用户主键id：新增时为空
          userName:'',//姓名
          loginName:'',//登录用户名
          certType:'',//证件类型
          certNo:'',//证件号码
          certStartDate:'',//证件有效期起始日
          certEndDate:'',//证件有效期截止日
          fileId:'',
          attachId:'',//附件主键id：新增时为空
          attachName:'',//上传证件名称
          fileSize:'',//上传证件文件大小
          fileType:'',//上传证件文件类型
          fileUrl:'',//上传证件文件路径
          mobileNo:'',//手机号码
          email:'',//电子邮箱
        },
        fastMailName:'',//收件人姓名
        fastMailPhone:'',//联系电话
        fastMailAddress:'',//收件地址
      },
      //校验规则
      rules: {
          fastMailName: [
            { required: false,  message:  '请输入收件人姓名', trigger: 'blur' },
            { max:50, message: '收件人姓名不可超过50字符',trigger:'blur'}
          ],
          fastMailPhone: [
            { required: false,  message:  '请输入收件人联系电话', trigger: 'blur' },
            { max:20,validator:(rule, value, callback) => {
                let phoneReg = /^((\(\d{3}\))|(\d{3}\u002d))?(1[3456789]\d{9})$/i
                let fixedReg = /^(\d{3,4}-)?\d{7,8}$/i
                if (!value && rule.required) {
                  callback(new Error('请输入收件人联系电话'))
                }else if(value && rule.max && value.length > rule.max){
                  callback(new Error(`收件人联系电话不可超过${rule.max}字符`))
                }else if(value && (!phoneReg.test(value) && !fixedReg.test(value))){
                  callback(new Error('收件人联系电话格式不正确'))
                }else {
                  callback()
                }
              },trigger: 'blur' }
          ],
          fastMailAddress: [
            { required: false,  message:  '请输入收件人详细地址', trigger: 'blur' },
            { max: 400, message: '收件人详细地址不可超过400个字符', trigger: 'blur'}
          ],
      },
      //经办
      applyUserRules:{
        fileId: [
          { required: false,  message:  '请上传经办员身份证复印件', trigger: 'blur' }
        ],
        loginName: [
          { required: false,  message:  '请输入经办员登录用户名', trigger: 'blur' },
          { validator:validateLoginNameSW, trigger: 'blur' }
        ],
        userName: [
          { required: false,  message:  '请输入经办员姓名', trigger: 'blur' }
        ],
        certStartDate: [
          { required: false,  message:  '请选择经办员证件有效期', trigger: 'blur' }
        ],
        certEndDate: [
          { required: false,  message:  '请选择经办员证件有效期', trigger: 'blur' }
        ],
        certType: [
          { required: false,  message:  '请选择经办员证件类型', trigger: 'blur' }
        ],
        certNo: [
          { required: false,  message:  '请输入经办员证件号码', trigger: 'blur' },
          { validator:(rule, value, callback) => {
              let idReg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
              // let idReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
              if (!value && rule.required) {
                callback(new Error('请输入经办员身份证号'))
              }else if(value && value === this.form.reviewUser.certNo && (this.form.applyUser.certType === this.form.reviewUser.certType)){
                callback(new Error('经办员与复核员不可为同一人！'))
              }else if (value && this.form.applyUser.certType === '01' && !idReg.test(value)) {
                callback(new Error('请输入正确的经办员身份证号码'))
              } else {
                callback()
              }
            }, trigger: 'blur'
          }
        ],
        mobileNo: [
          { required: false,  message:  '请输入经办员手机号码', trigger: 'blur' },
          { validator:(rule, value, callback) => {
            let phoneReg = /^((\(\d{3}\))|(\d{3}\u002d))?(1[3456789]\d{9})$/i
            if (!value && rule.required) {
              callback(new Error('请输入经办员手机号码'))
            } else if (value && !phoneReg.test(value)) {
              callback(new Error('经办员手机号码格式不正确'))
            } else {
              callback()
            }
          },trigger: 'blur' }
        ],
        email: [
          { required: false,  message:  '请输入经办员邮箱', trigger: 'blur' },
          { validator:(rule, value, callback) => {
              let emailReg = /^[0-9A-Za-z_-]+[@][0-9A-Za-z]+([.][0-9A-Za-z]+){1,2}$/
              if (!value && rule.required) {
                callback(new Error('请输入经办员邮箱地址'))
              } else if (value && !emailReg.test(value)) {
                callback(new Error('经办员邮箱格式不正确'))
              } else {
                callback()
              }
            }, trigger: 'blur' }
        ],
      },
      //复核
      reviewUserRules:{
        fileId: [
          { required: false,  message:  '请上传复核员身份证复印件', trigger: 'blur' }
        ],
        loginName: [
          { required: false,  message:  '请输入复核员登录用户名', trigger: 'blur' },
          { validator:validateLoginNameSW,trigger: 'blur' }
        ],
        userName: [
          { required: false,  message:  '请输入复核员姓名', trigger: 'blur' }
        ],
        certStartDate: [
          { required: false,  message:  '请选择复核员证件有效期', trigger: 'blur' }
        ],
        certEndDate: [
          { required: false,  message:  '请选择复核员证件有效期', trigger: 'blur' }
        ],
        certType: [
          { required: false,  message:  '请选择复核员证件类型', trigger: 'blur' }
        ],
        certNo: [
          { required: false,  message:  '请输入复核员证件号码', trigger: 'blur' },
          { validator:(rule, value, callback) => {
              let idReg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
              // let idReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
              if (!value && rule.required) {
                callback(new Error('请输入复核员身份证号'))
              }else if(value && value === this.form.applyUser.certNo  && (this.form.reviewUser.certType === this.form.applyUser.certType)){
                callback(new Error('复核员与经办员不可为同一人！'))
              }else if (value && this.form.reviewUser.certType === '01' && !idReg.test(value)) {
                callback(new Error('请输入正确的复核员身份证号码'))
              } else {
                callback()
              }
            }, trigger: 'blur'
          }
        ],
        mobileNo: [
          { required: false,  message:  '请输入复核员手机号码', trigger: 'blur' },
          { validator:(rule, value, callback) => {
              let phoneReg = /^((\(\d{3}\))|(\d{3}\u002d))?(1[3456789]\d{9})$/i
              if (!value && rule.required) {
                callback(new Error('请输入复核员手机号码'))
              } else if (value && !phoneReg.test(value)) {
                callback(new Error('复核员手机号码格式不正确'))
              } else {
                callback()
              }
            },trigger: 'blur' }
        ],
        email: [
          { required: false,  message:  '请输入复核员邮箱', trigger: 'blur' },
          { validator:(rule, value, callback) => {
              let emailReg = /^[0-9A-Za-z_-]+[@][0-9A-Za-z]+([.][0-9A-Za-z]+){1,2}$/
              if (!value && rule.required) {
                callback(new Error('请输入复核员邮箱地址'))
              } else if (value && !emailReg.test(value)) {
                callback(new Error('复核员邮箱格式不正确'))
              } else {
                callback()
              }
            }, trigger: 'blur' }
        ],
      },
      //风险
      controlUserRules:{
        fileId: [
          { required: false,  message:  '请上传风险接收人身份证复印件', trigger: 'blur' }
        ],
        userName: [
          { required: false,  message:  '请输入风险接收人姓名', trigger: 'blur' }
        ],
        certStartDate: [
          { required: false,  message:  '请选择风险接收人证件有效期', trigger: 'blur' }
        ],
        certEndDate: [
          { required: false,  message:  '请选择风险接收人证件有效期', trigger: 'blur' }
        ],
        certType: [
          { required: false,  message:  '请选择风险接收人证件类型', trigger: 'blur' }
        ],
        certNo: [
          { required: false,  message:  '请输入风险接收人证件号码', trigger: 'blur' },
          { validator:(rule, value, callback) => {
              let idReg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
              // let idReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
              if (!value && rule.required) {
                callback(new Error('请输入风险接收人身份证号'))
              }else if (value && this.form.controlUser.certType === '01' && !idReg.test(value)) {
                callback(new Error('请输入正确的风险接收人身份证号码'))
              } else {
                callback()
              }
            }, trigger: 'blur'
          }
        ],
        mobileNo: [
          { required: false,  message:  '请输入风险接收人手机号码', trigger: 'blur' },
          { validator:(rule, value, callback) => {
              let phoneReg = /^((\(\d{3}\))|(\d{3}\u002d))?(1[3456789]\d{9})$/i
              if (!value && rule.required) {
                callback(new Error('请输入风险接收人手机号码'))
              } else if (value && !phoneReg.test(value)) {
                callback(new Error('风险接收人手机号码格式不正确'))
              } else {
                callback()
              }
            },trigger: 'blur' }
        ],
        email: [
          { required: false,  message:  '请输入风险接收人邮箱', trigger: 'blur' },
          { validator:(rule, value, callback) => {
              let emailReg = /^[0-9A-Za-z_-]+[@][0-9A-Za-z]+([.][0-9A-Za-z]+){1,2}$/
            if (!value && rule.required) {
              callback(new Error('请输入风险接收人邮箱地址'))
            } else if (value && !emailReg.test(value)) {
              callback(new Error('风险接收人邮箱格式不正确'))
            } else {
              callback()
            }
          }, trigger: 'blur' }
        ],
      },
      //图片路径
      viewUrl:{
        applyUser:{url:''},
        reviewUser:{url:''},
        controlUser:{url:''}
      },
      //按钮颜色
      applyUserFlag:false,
      applyUserUpload:false,
      reviewUserFlag:false,
      reviewUserUpload:false,
      controlUserFlag:false,
      controlUserUpload:false,
    }
  },
  methods: {
    //证件类型发生改变
    applyCerTypeChange(){
      this.$refs.applyUser.validateField('certType')
      this.form.applyUser.certNo ? this.$refs.applyUser.validateField('certNo')
                                  : this.$refs.applyUser.clearValidate('certNo')
    },
    reviewCerTypeChange(){
      this.$refs.reviewUser.validateField('certType')
      this.form.reviewUser.certNo ? this.$refs.reviewUser.validateField('certNo')
                                  : this.$refs.reviewUser.clearValidate('certNo')
    },
    controlCerTypeChange(){
      this.$refs.controlUser.validateField('certType')
      this.form.controlUser.certNo ? this.$refs.controlUser.validateField('certNo')
                                   : this.$refs.controlUser.clearValidate('certNo')
    },
    //清除校验
    clearVator(){
      this.$nextTick(()=>{
        let arr = ['applyUser','reviewUser','controlUser','mailForm']
        arr.forEach(item => {
          this.$refs[item].clearValidate()
        })
      })
    },
    //获取企业用户信息
    getUserInfo(){
      this.oldForm = Object.assign({},this.form)
      if(!this.entInfoObj.id){
        this.form.fastMailAddress = this.entInfoObj.form.address
        return
      }
      this.zjControl.getUserInfo().then(res => {
        if(!res.data.applyUser){
          res.data.applyUser = Object.assign({},this.oldForm.applyUser)
        }
        if(!res.data.controlUser){
          res.data.controlUser = Object.assign({},this.oldForm.controlUser)
        }
        if(!res.data.reviewUser){
          res.data.reviewUser = Object.assign({},this.oldForm.reviewUser)
        }
        this.form = res.data

        let arr = ['applyUser','reviewUser','controlUser']
        arr.map(item => {
          for(let key in this.form[item]){
            if(this.form[item][key] && key !== 'mobileNo' && key !== 'email'){
              this[item+'Upload'] = true
            }
          }
        })

        //生成收件人快捷查询
        this.quickChange(true)
        //获取图片URL
        if(res.data.applyUser.fileId){
          this.getViewUrl(res.data.applyUser,'applyUser')
        }
        if(res.data.controlUser.fileId){
          this.getViewUrl(res.data.controlUser,'controlUser')
        }
        if(res.data.reviewUser.fileId){
          this.getViewUrl(res.data.applyUser,'reviewUser')
        }
        //调用清除校验
        this.$nextTick(()=>{
          this.clearVator()
        })
      })
    },
    //日期处理
    applyUserCertStartDateDisabledDate (date) {
      return this.certStartDateDisabledDate(this.form.applyUser, date)
    },
    applyUserCertEndDateDisabledDate (date) {
      return this.certEndDateDisabledDate(this.form.applyUser, date)
    },
    reviewUserCertStartDateDisabledDate (date) {
      return this.certStartDateDisabledDate(this.form.reviewUser, date)
    },
    reviewUserCertEndDateDisabledDate (date) {
      return this.certEndDateDisabledDate(this.form.reviewUser, date)
    },
    controlUserCertStartDateDisabledDate (date) {
      return this.certStartDateDisabledDate(this.form.controlUser, date)
    },
    controlUserCertEndDateDisabledDate (date) {
      return this.certEndDateDisabledDate(this.form.controlUser, date)
    },
    certStartDateDisabledDate (form, date) {
      if (form.certEndDate) {
        return date.getTime() > this.$moment(form.certEndDate)
      }
    },
    certEndDateDisabledDate (form, date) {
      if (form.certStartDate) {
        return date.getTime() < this.$moment(form.certStartDate)
      }
    },
    //文件上传
    upload ({ file, data }) {
      let formData = new FormData()
      formData.append('file',file)
      this.zjControl.uploadAttach(formData).then(res => {
        this[data.type +'Upload'] = true
        let uploadData = JSON.parse(JSON.stringify(res.data))

        this.form[data.type].fileId = uploadData.fileId
        this.form[data.type].fileName = uploadData.fileName
        this.form[data.type].attachName = uploadData.fileName
        this.form[data.type].fileSize = uploadData.fileSize
        this.form[data.type].fileType = uploadData.fileType
        //清除对应校验
        this.$refs[data.type].validateField('fileId')
        //恢复原始按钮
        this[data.type + 'Flag'] = false
        //获取缩略图
        this.getViewUrl(this.form[data.type],data.type)


        let ocrParams = {
          fileName:uploadData.fileName,
          fileId:uploadData.fileId
        }
        this.zjControl.sendOcrCert(ocrParams).then(ocrRes => {
          if(!ocrRes.data){return}
          let ocrList = ['userName','certType','certNo','certStartDate','certEndDate']
          ocrList.map(item => {
            this.form[data.type][item] = ocrRes.data[item]
            if(item === 'certType' || item === 'certNo'){
              this.form[data.type]['certType'] = ocrRes.data['certType']
            }
          })
        })

      })
    },
    //获取url
    getViewUrl(row,type){
      let params = {
        fileUrl:row.fileId,
        fileId: row.fileId,
        fileName: row.fileName || row.attachName
      }
      this.$api.baseCommon.downloadPdf(params).then(res => {
        let that = this
        let dataInfo = res.data
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(dataInfo)
        reader.onload = function (e) {
          let result = e.target.result
          let contentType = dataInfo.type
          let blob = new Blob([result], { type: contentType })
          let url = window.URL.createObjectURL(blob)
          that.viewUrl[type].url = url
        }
      })
    },
    //附件下载
    downloadFile(fileId,fileName){
      this.zjControl.downloadFile({fileId,fileName})
    },
    //上传文字说明显示与隐藏
    showPopper(Ref){
      this.$refs[Ref].showPopper = true
    },
    hidePopper(Ref){
      this.$refs[Ref].showPopper = false
    },
    //快捷收件人选择发生改变
    fastMailNameChange(type){
      let addrArr = ['applyUser','reviewUser','controlUser']
      let objIndex = addrArr.findIndex(item => item === type)
      //当不存在时--新增（意味着return）
      if(objIndex < 0){
        let typeIndex = this.fastList.findIndex(item => item.type === type)
        typeIndex < 0 ? this.fastList.push({userName:type,type:type}) : this.fastList.splice(typeIndex,1,{userName:type,type:type})
        return
      }
      let item = this.form[ addrArr[objIndex] ]
      this.form.fastMailPhone = item.mobileNo
      this.form.fastMailAddress = this.entInfoObj.form.address
    },
    //快捷收件人对应的手机号发生改变
    // fastMailPhoneChange(ev){
    //   //ev.target.name
    //   console.error(this.form.fastMailName,this.form[ev.target.name].userName)
    //   if(this.form.fastMailName && this.form.fastMailName === this.form[ev.target.name].userName){
    //     this.form.fastMailPhone = this.form[ev.target.name].mobileNo
    //   }
    // },
    //快捷收件人电话发送改变
    // fastMailPhoneInput(value){
    //   console.error(value)
    // },
    //下一步
    next () {
      // 执行校验
      let key = true
      key = this.notEmptyCheck('form.applyUser','applyUserRules')
      if(!key){
        if(!this.form.applyUser.fileId){
          this.applyUserFlag = true
        }
        return
      }
      this.$refs.applyUser.validate(boo=>{
          if (!boo){return this.$message.error('经办员信息存在填写错误，请修改！')}

          key = this.notEmptyCheck('form.reviewUser','reviewUserRules')
          if(!key){
            if(!this.form.reviewUser.fileId){
              this.reviewUserFlag = true
            }
            return
          }
          this.$refs.reviewUser.validate(boo=>{
            if (!boo){return this.$message.error('复核员信息存在错误，请修改！')}

            key = this.notEmptyCheck('form.controlUser','controlUserRules')
            if(!key){
              if(!this.form.controlUser.fileId){
                this.controlUserFlag = true
              }
              return
            }
            this.$refs.controlUser.validate(boo=>{
              if (!boo){return this.$message.error('风险接收人信息存在错误，请修改！')}

              key = this.notEmptyCheck('form','rules')
              if(!key){return}
              this.$refs.mailForm.validate(boo=>{
                if (!boo){return this.$message.error('收件人信息存在错误，请修改！')}
                this.$messageBox({
                  type:'confirm',
                  title:`温馨提示`,
                  content:`确认资料填写无误？`,
                  showCancelButton:true,
                  messageResolve:()=>{
                    let params = Object.assign({},this.form)
                    params.fastMailName = this.fastList.find(item => item.type === params.fastMailName || item.userName === params.fastMailName).userName
                    this.zjControl.saveUserInfo(params).then(() => {
                      this.$message.success('提交企业用户资料成功！')
                      this.$emit('update:step','104')
                      let removeArr = ['step','regFlag','regEntName']
                      removeArr.forEach(item => sessionStorage.removeItem(item))
                    })
                  }
                })
              })

            })
          })
      })
    },
    //快捷选择
    quickChange(boo = false){
      let applyUser = this.form.applyUser.userName
      let reviewUser = this.form.reviewUser.userName
      // let controlUser = this.form.controlUser.userName

      //寻找下表
      let applyIndex = this.fastList.findIndex(item => item.type === 'applyUser')
      let revieIndex = this.fastList.findIndex(item => item.type === 'reviewUser')
      //当下标不存在则创建--存在则修改
      if(applyUser){
        if(applyIndex < 0){
          this.fastList.push({userName:applyUser,type:'applyUser'})
        }else{
          this.fastList.splice(applyIndex,1,{userName:applyUser,type:'applyUser'})
        }
      }
      if(reviewUser){
        if(revieIndex < 0){
          this.fastList.push({userName:reviewUser,type:'reviewUser'})
        }else{
          this.fastList.splice(revieIndex,1,{userName:reviewUser,type:'reviewUser'})
        }
      }

      //检测是否已选中
      if(this.form.fastMailName){
        let selectedForm = this.fastList.find(item => item.userName === this.form.fastMailName || item.type === this.form.fastMailName)
        if(selectedForm){
          let type = selectedForm.type
          this.fastMailNameChange(type)
        }else{
          this.form.fastMailName = ''
          this.form.fastMailPhone = ''
          this.form.fastMailAddress = ''
        }
      }
    }
  },
  created(){
    this.getUserInfo()
  }
}
</script>


<style lang="less">
.swRegister {
    //每部分容器
    .register-inline {
      position: relative;
      z-index: 1;
      background-color: #FFFFFF;
      width: 800px;
      margin: 20px auto;
      box-shadow: 0 1px 5px 0 rgba(133,133,133,0.50);
      padding: 30px 0;
        //正标题
        .register-title{
          margin:0 0 20px ;
          border-left:5px solid #1482f0;
          padding-left: 10px;
          color: #434343;
          font-weight: bold;
        }
        //角色容器
        .register-user{
          width: 680px;
          margin: 0 auto 30px;
          //头部信息
          .register-user-title{
              color: #FFFBEB;
              font-size:16px;
              font-weight: bold;
              padding: 6px 20px;
              border-radius:13.33px 13.33px 0 0 ;
              //图标
              .register-user-icon{
                  display: inline-block;
                  vertical-align: top;
                  width: 15px;
                  height: 20px;
                  background: url("~@assets/img/register/icon-user.png") no-repeat center;
              }
              //文字
              .register-user-text{
                margin-left: 5px;
              }
              //经办员
              &.approvedBy{
                background-color: rgb(54,149,249);
              }
              //复核员
              &.checker{
                background-color: rgb(0,153,102);
              }
              //风险信息接收人
              &.receivedBy{
                background-color: rgb(50,101,157);
              }
          }
        }
    }
    //每个表单
    .el-form {
      padding: 15px 20px 5px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 0 0 13.33px 13.33px;
      .el-form-item__label{
        /*display: block;*/
        width: 100%!important;
        text-align: left;
      }
      .el-input{
        width: 300px;
      }
      .el-input__inner{
        padding: 0 0 0 10px;
      }
      //上传文字的说明
      .ulText{
        font-size: 12px;
        padding: 0 30px 0 10px;
        position: relative;
        cursor: pointer!important;
        z-index: 9;
        color: #999999 !important;
      }
      .ulText:hover{
        text-decoration: underline;
      }
      //上传按钮
      .ulbtn{
        margin:0 10px;
      }
    }
    //资料接收地址
    .mailForm {
      padding: 20px 105px;
      border: none;
      .mainPhone{
        padding-left: 50px;
      }
    }
    //按钮栏
    .btn-row{
      text-align: center;
      .el-button,.zj-button,.vxe-button{
        min-width: 70px!important;
      }
    }
    //切割线
    .register-cuttingLine{
      height: 10px;
      width: 100%;
      background: #EEEEEE;
      border-left: 1px solid #EEEEEE;
      border-right: 1px solid #EEEEEE;
      border-top:1px solid rgba(133, 133, 133, 0.09);
      border-bottom:1px solid rgba(133, 133, 133, 0.09);
    }
}
</style>
<style lang="less">
  //证件有效期
  .certnoIndate{
      width: 100%;
      div{
        float: left;
      }
      .el-form-item{
        /*width: 45%;*/
        width: 140px!important;
        float: left;
        margin-bottom: 0!important;
        .el-form-item__content,.el-date-editor{
          width: 100% !important;
        }
        .el-form-item__label{
          display: block!important;

        }
        .el-form-item__error{
          width: 110%!important;
        }
        //input
        .el-input__inner{
          padding-left:5px;
          padding-right:15px;
        }
        // icon
        /*.el-input__prefix,.el-input__suffix{*/
        /*  width: 24px;*/
        /*  left: unset;*/
        /*  right: 3px;*/
        /*}*/
        /*.el-input__suffix{*/
        /*  right: 1px;*/
        /*}*/
      }
      /*span{*/
      /*  width: 10%;*/
      /*  float: left;*/
      /*}*/
  }
</style>
<style lang="less">
  .one-row-max{
    .el-form-item__content{
      width: 640px;
      .el-input{
        width: 100%;
      }
    }
  }
</style>
