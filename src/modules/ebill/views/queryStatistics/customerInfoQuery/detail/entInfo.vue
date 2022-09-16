<template>
  <zj-content-container>
    <!--  企业信息明细  -->
    <el-form :model="form" ref="form">
      <zj-content-block>
        <zj-header title="客户基本信息" />
        <zj-content>
          <div style="padding: 0 35px;">
            <el-row>
              <el-col :span="8">
                <el-form-item label="平台企业编码：">{{
                    valueFormatter(form.code)
                  }}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业名称：">{{ valueFormatter(form.name) }}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业简称：">{{
                    valueFormatter(form.shortName)
                  }}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码：">{{
                    valueFormatter(form.bizLicence)
                  }}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="平台客户类型：">{{
                    typeMap(dictionary.entType, form.entType)
                  }}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否海天集团：">{{
                    ifOrNot(form.isHtEnterprise)
                  }}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="客户业务系统编码：">{{
                    valueFormatter(form.customCode)
                  }}</el-form-item>
              </el-col>
            </el-row>
          </div>
          <zj-collapse title="企业联系人" class="zj-m-t-10">
            <el-row>
              <el-col :span="8">
                <el-form-item label="企业联系人姓名：">
                  {{ valueFormatter(form.fastMailName) }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业联系人手机号：">
                  {{ valueFormatter(form.fastMailPhone) }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业联系地址：">
                  {{ valueFormatter(form.fastMailAddress) }}
                </el-form-item>
              </el-col>
            </el-row>
          </zj-collapse>
          <zj-collapse title="法人信息" class="zj-m-t-10">
            <el-row>
              <el-col :span="8">
                <el-form-item label="法定代表人姓名：">
                  {{ valueFormatter(form.legalPersonName) }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法定代表人身份证号：">
                  {{ valueFormatter(form.legalCertNo) }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人身份证有效期：">
                  {{ date(valueFormatter(form.legalCertExpireDate)) }}
                </el-form-item>
              </el-col>
            </el-row>
          </zj-collapse>
          <zj-collapse title="开票信息" class="zj-m-t-10">
            <el-row>
              <el-col :span="8">
                <el-form-item label="企业名称：">
                  {{ valueFormatter(form.name) }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="纳税人识别号：">
                  {{ valueFormatter(form.invoiceTaxpayerId) }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话：">
                  {{ valueFormatter(form.invoicePhone) }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="开户行：">
                  {{ valueFormatter(form.invoiceBankInfo) }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行账号：">
                  {{ valueFormatter(form.invoiceBankAccno) }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="地址：">
                  {{ valueFormatter(form.invoiceAddress) }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="邮箱：">
                  {{ valueFormatter(form.invoiceEmail) }}
                </el-form-item>
              </el-col>
            </el-row>
          </zj-collapse>
        </zj-content>
      </zj-content-block>
      <zj-content-block>
        <zj-header title="业务信息" />
        <zj-content>
          <div style="padding: 0 35px;">
            <el-row>
              <el-col :span="8">
                <el-form-item label="是否已开通产品：">
                  {{ ifOrNot(form.isOpenProduct) }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开通产品：">
                  {{ typeMap(dictionary.productType,form.productType) }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="是否已有融资：">
                  {{ ifOrNot(form.isFinancing) }}
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </zj-content>

      </zj-content-block>
    </el-form>
  </zj-content-container>
</template>
<script>
export default {
  components: {},
  props: {
    detailData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dictionary: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      form: {}
    }
  },
  watch: {
    detailData: {
      handler (val) {
        if (val) {
          this.form = JSON.parse(JSON.stringify(val))
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    valueFormatter(val) {
      return val ?? '-'
    }
  }
}
</script>
