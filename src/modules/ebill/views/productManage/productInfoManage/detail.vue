<template>
  <zj-content-container>
    <!--  产品详情  -->
    <zj-content-block>
      <zj-content>
        <zj-top-header title="产品详情" direction="center"/>
        <h4 class="orderTitle bl">产品基础信息</h4>
        <div class="zj-search-response">
          <zj-table ref="searchTable" :dataList="list"  @radio-change="handleRadioChange" :radio-config="{highlight: true}">
            <zj-table-column field="field1" title="产品编号"/>
            <zj-table-column field="field2" title="产品名称"/>
            <zj-table-column field="field3" title="业务类型"/>
            <zj-table-column field="field4" title="产品类型"/>
            <zj-table-column field="field4" title="产品简介"/>
            <zj-table-column field="field4" title="产品详细介绍"/>
            <zj-table-column field="field5" title="配置时间" :formatter="date"/>
            <zj-table-column field="field6" title="产品状态"/>
          </zj-table>
        </div>
        <el-form :model="infoForm" ref="infoForm" :rules="rules" label-width="220px">
          <el-row>
            <h4 class="orderTitle bl">产品设置-订单保理</h4>
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
            <h4 class="orderTitle bl">保理公司业务联系人</h4>
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
            <h4 class="orderTitle bl">保理专户</h4>
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
          <el-row>
            <h4 class="orderTitle bl">产品设置-电子债权凭证</h4>
            <el-row class="el-claims-voucher">
              <el-form-item label="对账单付款日前N天通知核心企业：" prop="noticeDate" label-width="300px">
                <zj-number-input v-model="infoForm.noticeDate">
                  <template slot="append">天</template>
                </zj-number-input>
              </el-form-item>
            </el-row>
            <el-row class="el-claims-voucher">
              <el-form-item label="对账单付款日前X天停止业务：" prop="stopBusinessDate" label-width="300px">
                <zj-number-input v-model="infoForm.stopBusinessDate">
                  <template slot="append">天</template>
                </zj-number-input>
                <span class="tips">注：对账单付款日前X天至凭证到期日，凭证即不能融资，也不能转让。</span>
              </el-form-item>
            </el-row>
            <el-row class="el-claims-voucher">
              <el-form-item label="对账单付款日前Z天未结算通知保理公司：" prop="noSettleNoticeDate" label-width="300px">
                <zj-number-input v-model="infoForm.noSettleNoticeDate">
                  <template slot="append">天</template>
                </zj-number-input>
                <span class="tips">注：对账单付款日前Z天，若对账单未发起结算，则通知保理公司。</span>
              </el-form-item>
            </el-row>
            <el-row class="el-claims-voucher">
              <el-form-item label="对账单付款日后Y天未付款通知保理公司：" prop="noPayNoticeDate" label-width="300px">
                <zj-number-input v-model="infoForm.noPayNoticeDate">
                  <template slot="append">天</template>
                </zj-number-input>
              </el-form-item>
            </el-row>
            <el-row class="el-claims-voucher">
              <el-form-item label="最低凭证融资月利率：" prop="financingMonthRate" label-width="300px">
                <zj-number-input :precision="4" v-model="infoForm.financingMonthRate">
                  <template slot="append">%</template>
                </zj-number-input>
              </el-form-item>
            </el-row>
          </el-row>
          <el-row>
            <h4 class="orderTitle bl">产品设置-经销商贷款</h4>
            <el-row>
              <el-col :span="8">
                <el-form-item label="资金方名称：" prop="fundingEntName">
                  <el-select v-model="infoForm.fundingEntName">
                    <el-option value="华润银行" />
                    <el-option value="a银行" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="风险模型：" prop="riskModel">
                  <el-select v-model="infoForm.riskModel">
                    <el-option value="资金方风险模型" />
                    <el-option value="海天风险模型" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-form>

      </zj-content>
    </zj-content-block>
    <zj-content-footer>
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
        //
        noticeDate: [
          {required: true, message: '请填写对账单付款日前N天通知核心企业', trigger: 'blur'},
        ],
        stopBusinessDate: [
          {required: true, message: '请填写对账单付款日前X天停止业务', trigger: 'blur'},
        ],
        noSettleNoticeDate: [
          {required: true, message: '请填写对账单付款日前X天停止业务', trigger: 'blur'},
        ],
        noPayNoticeDate: [
          {required: true, message: '请填写对账单付款日前X天停止业务', trigger: 'blur'},
        ],
        financingMonthRate: [
          {required: true, message: '请填写最低凭证融资月利率', trigger: 'blur'},
        ],
        fundingEntName: [
          {required: true, message: '请选择资金方名称', trigger: 'blur'},
        ],
        riskModel: [
          {required: true, message: '请选择风险模型', trigger: 'blur'},
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
<style lang="less" scoped>
.el-claims-voucher {
  width: 1000px;
  margin: 0 auto;
}
.tips {
  color: #7f7f7f;
  margin-left: 20px;
}
</style>
