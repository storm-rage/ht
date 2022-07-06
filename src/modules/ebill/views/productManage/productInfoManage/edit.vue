<template>
  <zj-content-container>
    <!--  产品详情  -->
    <zj-content-block>
      <zj-content>
        <zj-top-header title="修改产品信息" direction="center"/>
        <el-form :model="infoForm" ref="infoForm" :rules="rules" label-width="220px">
            <el-row>
              <zj-header title="产品基础信息"></zj-header>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="产品名称：" prop="productName">
                    <el-input v-model="infoForm.productName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="业务类型：" prop="businessType">
                    <el-select v-model="infoForm.businessType">
                      <el-option value="上游" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="产品类型：" prop="productType">
                    <el-select v-model="infoForm.productType">
                      <el-option value="订单保理" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="产品简介：" prop="productIntro">
                    <el-input v-model="infoForm.productIntro"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="产品详细介绍：" prop="productDetail">
                    <el-input type="textarea" v-model="infoForm.productDetail"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="产品是否失效：" prop="productState">
                  <el-select v-model="infoForm.productState">
                    <el-option value="生效" />
                    <el-option value="失效" />
                  </el-select>
                </el-form-item>
              </el-row>
            </el-row>
            <el-row>
              <zj-header title="产品设置-订单保理"></zj-header>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="保理追索方式：" prop="blResourceType">
                    <el-select v-model="infoForm.blResourceType">
                      <el-option value="有追索权" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="保理融资形式：" prop="blFinancingType">
                    <el-select v-model="infoForm.blFinancingType">
                      <el-option value="明保理形式" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="最低订单融资月利率：" prop="proMonthRate">
                    <el-input v-model="infoForm.proMonthRate"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="额度到期前X天通知保理公司：" prop="expireDate">
                    <el-input v-model="infoForm.expireDate"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <zj-header title="保理公司业务联系人"></zj-header>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="联系人：" prop="contact">
                    <el-input v-model="infoForm.contact"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系号码：" prop="phone">
                    <el-input v-model="infoForm.phone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系邮箱：" prop="email">
                    <el-input v-model="infoForm.email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="联系地址：" prop="address">
                    <el-input v-model="infoForm.address"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <zj-header title="保理专户"></zj-header>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="银行账户名称：" prop="bankAccountName">
                    <el-input v-model="infoForm.bankAccountName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开户银行：" prop="bankName">
                    <el-input v-model="infoForm.bankName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="银行账号：" prop="bankAccountNo">
                    <el-input v-model="infoForm.bankAccountNo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">注：业务联系人和保理专户用于后续签署保理合同。</el-col>
              </el-row>
            </el-row>


          </el-form>

      </zj-content>
    </zj-content-block>
    <zj-content-footer>
      <zj-button class="submit-button" @click="submit">提交</zj-button>
      <zj-button class="back" @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      infoForm: {
        productName: '',
        businessType: '',
        productType: '',
        productNo: '',
        productState: '',
      },
      rules: {
        productName: [
          {required: true, message: '请填写产品名称', trigger: 'blur'},
        ],
        businessType: [
          {required: true, message: '请选择业务类型', trigger: 'blur'},
        ],
        productType: [
          {required: true, message: '请填写产品类型', trigger: 'blur'},
        ],
        productIntro: [
          {required: true, message: '请填写产品简介', trigger: 'blur'},
        ],
        productDetail: [
          {required: true, message: '请填写产品详细介绍', trigger: 'blur'},
        ],
        productState: [
          {required: true, message: '请选择产品状态', trigger: 'blur'},
        ],
        blResourceType: [
          {required: true, message: '请选择保理索取方式', trigger: 'blur'},
        ],
        blFinancingType: [
          {required: true, message: '请选择保理融资形式', trigger: 'blur'},
        ],
        proMonthRate: [
          {required: true, message: '请填写最低订单融资月利率', trigger: 'blur'},
        ],
        expireDate: [
          {required: true, message: '请填写额度到期日', trigger: 'blur'},
        ],
        contact: [
          {required: true, message: '请填写联系号码', trigger: 'blur'},
        ],
        phone: [
          {required: true, message: '请填写联系邮箱', trigger: 'blur'},
        ],
        email: [
          {required: true, message: '请填写额度到期日', trigger: 'blur'},
        ],
        address: [
          {required: true, message: '请填写联系地址', trigger: 'blur'},
        ],
        bankAccountName: [
          {required: false, message: '请填写银行账户名称', trigger: 'blur'},
        ],
        bankName: [
          {required: false, message: '请填写开户银行', trigger: 'blur'},
        ],
        bankAccountNo: [
          {required: false, message: '请填写银行账号', trigger: 'blur'},
        ],
        //产品设置-电子债权凭证
        noticeDate: [
          {required: true, message: '请填写对账单付款日前N天通知核心企业', trigger: 'blur'},
        ],
        stopBusinessDate: [
          {required: true, message: '请填写对账单付款日前X天停止业务', trigger: 'blur'},
        ],
      },
      list: [
        {
          field1: 'scm00001',
          field2: '某某产品一号',
          field3: '上游',
          field4: '订单保理',
          field5: '2022.09.08 11:18:19',
          field6: '生效',
          field7: '是'
        }
      ],
      tradeList: []
    };
  },
  methods: {
    /**
     *
     * @param row
     */
    toContractDetail(row) {
      console.error(row);
      this.$router.push({name: 'businessDetail'});
    },
    /**
     *
     * @param row
     */
    toContractSign(row) {
      console.log(row);
    },
    handleRadioChange({row}) {
      this.tradeList.push({
        field1: '佛山市a有限公司',
        field2: '是',
        field3: '756756756767',
        field4: '非保理',
        field5: '12',
        field6: '1000',
        field7: '2000',
        field8: '正常'
      })
    },
    toDetail (row) {},
    toEdit (row) {},
    toEditQuota (row) {},
  }
};
</script>
