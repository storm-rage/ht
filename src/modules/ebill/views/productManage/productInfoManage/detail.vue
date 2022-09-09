<template>
  <zj-content-container>
    <!--  产品详情  -->
    <zj-content-block>
        <zj-top-header title="产品详情" direction="center"/>
        <zj-header title="产品基础信息"></zj-header>
        <zj-content>
          <zj-table ref="searchTable" :dataList="rows" :pager="false">
            <zj-table-column field="productCode" title="产品编号"/>
            <zj-table-column field="productName" title="产品名称"/>
            <zj-table-column field="busType" title="业务类型" :formatter="obj=>typeMap(dictionary.busType, obj.cellValue)"/>
            <zj-table-column field="productType" title="产品类型" :formatter="obj=>typeMap(dictionary.productType, obj.cellValue)"/>
            <zj-table-column field="productAbstract" title="产品简介"/>
            <zj-table-column field="productDetail" title="产品详细介绍"/>
            <zj-table-column field="modifyDatetime" title="配置时间" :formatter="date"/>
            <zj-table-column field="status" title="产品状态" :formatter="obj=>typeMap(dictionary.status, obj.cellValue)"/>
          </zj-table>
        </zj-content>
        <el-form :model="infoForm" ref="infoForm" label-width="220px">
          <zj-content-block>
            <zj-header :title="`产品设置-${typeMap(dictionary.productType,infoForm.productType)}`"></zj-header>
            <zj-content>
            <el-row v-if="this.row.productType === 'DDBL'">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="保理追索方式：" required>
                    <el-select v-model="infoForm.factoringRecourse" disabled>
                      <el-option
                        v-for="item in dictionary.factoringRecourse"
                        :label="item.desc"
                        :value="item.code"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="保理融资形式：" required>
                    <el-select v-model="infoForm.factoringFinancingForm" disabled>
                      <el-option
                        v-for="item in dictionary.factoringFinancingForm"
                        :label="item.desc"
                        :value="item.code"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="最低订单融资月利率：" required>
                    <zj-number-input v-model="infoForm.lowFinancingMonthRate" :precision="2" disabled>
                      <template slot="append">%</template>
                    </zj-number-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="额度到期前X天通知保理公司：" required>
                    <zj-number-input v-model.trim="infoForm.creditEndDateDays" :precision="0" disabled>
                      <template slot="append">天</template>
                    </zj-number-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <zj-collapse title="保理公司联系人" class="zj-m-t-10">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="联系人："  required>
                      <el-input v-model="infoForm.blContactName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系号码："  required>
                      <el-input v-model="infoForm.blContactMobile" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系邮箱：" required>
                      <el-input v-model="infoForm.blContactEmail" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="联系地址：" required>
                      <el-input v-model="infoForm.blContactAddress" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </zj-collapse>
              <zj-collapse title="保理专户" class="zj-m-t-10">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="银行账户名称：" >
                      <el-input v-model="infoForm.blBankAcctName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="开户银行：" >
                      <el-input v-model="infoForm.blBankName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="银行账号：" >
                      <el-input v-model="infoForm.blBankAcctNo" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <zj-content-tip text="注：业务联系人和保理专户用于后续签署保理合同。"/>
                    </el-col>
                </el-row>
              </zj-collapse>
            </el-row>
            <el-row v-if="this.row.productType === 'RD'">
              <el-row class="el-claims-voucher">
                <el-form-item label="对账单付款日前N天通知核心企业："  label-width="300px">
                  <zj-number-input v-model="infoForm.rdEndNoticeCompanyDays" disabled>
                    <template slot="append">天</template>
                  </zj-number-input>
                </el-form-item>
              </el-row>
              <el-row class="el-claims-voucher">
                <el-form-item label="对账单付款日前X天停止业务："  label-width="300px">
                  <zj-number-input v-model="infoForm.rdBeforeStopDays" disabled>
                    <template slot="append">天</template>
                  </zj-number-input>
                  <zj-content-tip class="zj-m-l-10" text="注：对账单付款日前X天至凭证到期日，凭证即不能融资，也不能转让。"/>
                </el-form-item>
              </el-row>
              <el-row class="el-claims-voucher">
                <el-form-item label="对账单付款日前Z天未结算通知保理公司：" label-width="300px">
                  <zj-number-input v-model="infoForm.rdEndNoticeBlDays" disabled>
                    <template slot="append">天</template>
                  </zj-number-input>
                  <zj-content-tip class="zj-m-l-10" text="注：对账单付款日前Z天，若对账单未发起结算，则通知保理公司。"/>
                </el-form-item>
              </el-row>
              <el-row class="el-claims-voucher">
                <el-form-item label="对账单付款日后Y天未付款通知保理公司：" label-width="300px">
                  <zj-number-input v-model="infoForm.rdAfterNopayNoticeDays" disabled>
                    <template slot="append">天</template>
                  </zj-number-input>
                </el-form-item>
              </el-row>
              <el-row class="el-claims-voucher">
                <el-form-item label="最低凭证融资月利率："  label-width="300px">
                  <zj-number-input :precision="2" v-model="infoForm.lowRdFinancingMonthRate" disabled>
                    <template slot="append">%</template>
                  </zj-number-input>
                </el-form-item>
              </el-row>
            </el-row>
            <el-row v-if="this.row.productType === 'JXD'">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="资金方名称：" >
                    <el-select v-model="infoForm.fundingName" disabled>
                      <el-option
                        v-for="item in dictionary.fundingName"
                        :label="item.desc"
                        :value="item.code"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="风险模型：" >
                    <el-select v-model="infoForm.riskModel" disabled>
                      <el-option
                        v-for="item in dictionary.riskModel"
                        :label="item.desc"
                        :value="item.code"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
            </zj-content>
          </zj-content-block>
        </el-form>
    </zj-content-block>
    <zj-content-footer>
      <zj-button class="back" @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import ZjContentTip from "@pubComponent/content/ZjContentTip";
export default {
  components: {ZjContentTip},
  data() {
    return {
      zjControl: {
        queryProductDetail: this.$api.productInfoManage.queryProductDetail,//查看产品详情
        queryProductDirectory: this.$api.productInfoManage.queryProductDirectory,//数据字典
      },
      infoForm: {},
      dictionary: {},
      rows: [],
    };
  },
  methods: {
    getDetail () {
      let params = {
        id: this.row.id,
      }
      this.zjControl.queryProductDetail(params).then(res => {
        this.infoForm = Object.assign({},res.data)
        this.row.productAbstract = res.data.productAbstract
        this.row.productDetail = res.data.productDetail
        this.rows.push(this.row)
      })
    },
    queryProductDirectory() {
      this.zjControl.queryProductDirectory().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
  },
  created() {
    this.getApi()
    this.getRow()
    this.queryProductDirectory()
    this.getDetail()
  }
};
</script>
<style lang="less" scoped>
.el-claims-voucher {
  width: 1000px;
  margin: 0 auto;
}
</style>
