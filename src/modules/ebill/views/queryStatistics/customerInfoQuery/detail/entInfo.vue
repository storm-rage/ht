<template>
  <zj-content-container>
    <!--  企业信息明细  -->
    <zj-form :model="form">
        <zj-content-block>
          <zj-header title="客户基本信息"/>
          <el-row>
            <el-col :span="8">
              <el-form-item label="平台企业编码：">{{form.entCode}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业名称：">{{form.entCode}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业简称：">{{form.entCode}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="统一社会信用代码：">{{form.entCode}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="平台客户类型：">{{form.entCode}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否海天集团：">{{form.entCode}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户业务系统编码：">{{form.entCode}}</el-form-item>
            </el-col>
          </el-row>
          <zj-collapse title="企业联系人" class="zj-m-t-10">
            <el-row>
              <el-col :span="8">
                <el-form-item label="企业联系人姓名：" >
                  {{form.bankAccname}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业联系人手机号：">
                  {{form.bankAccno}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业联系地址：">
                  {{form.bankAccno}}
                </el-form-item>
              </el-col>
            </el-row>
          </zj-collapse>
          <zj-collapse title="法人信息" class="zj-m-t-10">
            <el-row>
              <el-col :span="8">
                <el-form-item label="法定代表人姓名：" >
                  {{form.bankAccname}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法定代表人身份证号：">
                  {{form.bankName}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人身份证有效期：">
                  {{form.bankAccno}}
                </el-form-item>
              </el-col>
            </el-row>
          </zj-collapse>
          <zj-collapse title="开票信息" class="zj-m-t-10">
            <el-row>
              <el-col :span="8">
                <el-form-item label="企业名称：" >
                  {{form.bankAccname}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="纳税人识别号：">
                  {{form.bankName}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话：">
                  {{form.bankAccno}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="开户行：" >
                  {{form.bankAccname}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行账号：">
                  {{form.bankName}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="地址：">
                  {{form.bankAccno}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="邮箱：" >
                  {{form.bankAccname}}
                </el-form-item>
              </el-col>
            </el-row>
          </zj-collapse>
        </zj-content-block>
        <zj-content-block>
          <zj-header title="业务信息"/>
          <el-row>
            <el-col :span="8">
              <el-form-item label="是否已开通产品：">
                {{form.bankAccname}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开通产品：">
                {{form.bankAccname}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="是否已有融资：">
                {{form.bankAccname}}
              </el-form-item>
            </el-col>
          </el-row>
        </zj-content-block>
      </zj-form>
  </zj-content-container>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      form: {},
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
    toDetail (row) {
      this.goChild('productInfoManageDetail', row)
    },
    toEdit (row) {
      this.goChild('productInfoManageEdit', row)
    },
    toEditQuota (row) {},
  }
};
</script>
