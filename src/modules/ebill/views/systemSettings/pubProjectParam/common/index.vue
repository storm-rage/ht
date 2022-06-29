<template>
  <div>
    <el-form :model="form" ref="addFormData" label-width="260px">
      <el-form-item label="产品名称：" prop="productName">
        {{form.productName}}
      </el-form-item>
      <el-form-item label="客服电话：" prop="serviceTel" class="required"
                    :rules="[
                      { required: true, message: '请输入客服电话', trigger: 'change' }
                      ]">
<!--        <span v-if="serviceTelEditFlag"><span>{{form.serviceTel}}&nbsp;&nbsp;</span> <zj-button type="text" @click="toEditServiceTel()">修改</zj-button></span>-->
        <el-input v-model="form.serviceTel" type="text"></el-input>
      </el-form-item>
      <el-form-item label="邮寄地址信息：" prop="userName" class="required">
<!--        <span>收件人：{{form.fastMailName}}&nbsp;&nbsp;</span> <zj-button type="text">修改</zj-button>-->
        <div>
          <el-form-item prop="fastMailName">
            <span>收件人：
            <el-input v-model="form.fastMailName" type="text" class="zj-m-l-25"/>
           </span>
          </el-form-item>
        </div>

        <div class="zj-m-t-3 zj-m-b-3">
          <el-form-item prop="fastMailAddress">
            <span>收件地址：
            <el-input v-model="form.fastMailAddress" type="text" class="zj-m-l-12"/>
           </span>
          </el-form-item>
        </div>
        <div class="common-fast-mail-tel">
          <el-form-item prop="fastMailTel">
            <span>收件人电话：
            <el-input v-model="form.fastMailTel" type="text"/>
           </span>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="默认资金方企业名称：" prop="defaultFundingName" class="required" :rules="[ { required: true, message: '请输入默认资金方企业名称', trigger: 'change' },]">
<!--        <span>{{form.defaultFundingName}}&nbsp;&nbsp;</span> <zj-button type="text">修改</zj-button>-->
        <el-input v-model="form.defaultFundingName" type="text"/>
      </el-form-item>
      <el-form-item label="平台运营企业名称：" prop="platEntName">
        {{form.platEntName}}
      </el-form-item>
      <el-form-item label="启用天眼查：" prop="isOpenTyc"  v-if="form.sysTycFlag =='1'">
        <el-switch
          @change="changeOpenTyc"
          class="zj-switch-text"
          :active-text="form.isOpenTyc=='1'?'已启用':'已关闭'"
          active-value="1"
          inactive-value="0"
          v-model="form.isOpenTyc"></el-switch>
        <div v-if="form.isOpenTyc=='1'">
          <el-checkbox-group v-model="form.tycModule">
            <el-checkbox
              v-for="(item, index) in tycModuleList"
              :key="index"
              :label="item.id">{{item.desc}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <!--          <el-radio label="已启用"></el-radio>&nbsp;&nbsp;<zj-button type="text">关闭</zj-button>-->
      </el-form-item>
      <el-form-item label="启用联网核查：" prop="isIdCheck" v-if="form.sysNetWork =='1'">
        <el-switch
          class="zj-switch-text"
          :active-text="form.isIdCheck=='1'?'已启用':'已关闭'"
          active-value="1"
          inactive-value="0"
          v-model="form.isIdCheck"></el-switch>
      </el-form-item>
      <el-form-item label="启用人脸识别：" prop="isFaceCheck" v-if="form.sysFaceCheck =='1'">
        <el-switch
          class="zj-switch-text"
          :active-text="form.isFaceCheck=='1'?'已启用':'已关闭'"
          active-value="1"
          inactive-value="0"
          v-model="form.isFaceCheck"></el-switch>
      </el-form-item>
      <el-form-item label="一级用户服务协议签署方：" prop="userProtocolPart">
       {{transfeUserProtocolPart(form.userProtocolPart)}}
      </el-form-item>
      <el-form-item label="证书：" prop="certType">
        {{transferCertType(form.certType)}}
      </el-form-item>
      <el-form-item label="是否支持多资金方：" prop="isMutiFunding">
        {{transfeMutFunding(form.isMutiFunding)}}
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 电话
const phoneReg = /^((\(\d{3}\))|(\d{3}\u002d))?(1[3456789]\d{9})$/i
export default {
  props: {
    value: Object,
    dics: Object,
    tycModule: Array
  },
  watch: {
    value: {
      deep: true,
      handler: function () {
        this.form = this.value;
      }
    }
  },
  computed: {
    tycModuleList () {
      const  tycModuleList =  [
        {id: '1',code: '1', desc: '基本信息'},
        {id: '2',code: '1', desc: '经营风险'},
        {id: '3',code: '1', desc: '司法风险'},
        {id: '4',code: '1', desc: '知识产权'}
      ]
      return tycModuleList.filter(item => {
        return this.tycModule.indexOf(item.id) >= 0;
      });
    }
  },
  data () {
    return {
      form: this.value,
    };
  },
  methods: {
    validateCommonForm () {
      let result = false;
      this.$refs.addFormData.validate((valid) => {
        result = valid;
      });
      return result;
    },
    validatePhone (rule, value, callback) {
      if (!value && rule.required) {
        callback(new Error('请输入电话'))
      } else if (value && !phoneReg.test(value)) {
        callback(new Error('电话号码格式不正确'))
      } else {
        callback()
      }
    },
    transfeMutFunding (isMutiFunding) {
      if (isMutiFunding && this.dics.isMutiFundingList) {
        const vals = this.dics.isMutiFundingList.filter(item => {
          return item.code == isMutiFunding;
        });
        return vals[0].desc;
      }
    },
    transferCertType (certType) {
      if (certType && this.dics.certTypeList) {
        const vals = this.dics.certTypeList.filter(item => {
          return item.code == certType;
        });
        return vals[0].desc;
      }
    },
    transfeUserProtocolPart (userProtocolPart) {
      if (userProtocolPart && this.dics.userProtocolPartList) {
        const vals = this.dics.userProtocolPartList.filter(item => {
          return item.code == userProtocolPart;
        });
        return vals[0].desc;
      }
    },
    changeOpenTyc (state) {
      if (state === '0') {
        this.form.tycModule = [];
      }
    }
  }
};
</script>
<style lang="less">
.common-fast-mail-tel {
  .el-form-item__error {
  }
}
</style>
