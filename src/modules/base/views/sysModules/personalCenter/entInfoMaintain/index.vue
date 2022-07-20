<template>
  <zj-content-container>
    <zj-top-header title="企业信息维护" />
    <!-- 企业基础信息 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="200px">
      <zj-content-block>
        <zj-header title="企业基础信息" />
        <h4 class="bl zj-m-l-20 mb-10">企业信息</h4>
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称：" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="平台客户类型：" prop="entType">
              <span>供应商</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业简称：" prop="shortName">
              <el-input v-model="form.shortName" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="曾用名：" prop="beforeName">
              <el-input v-model="form.beforeName" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户业务系统编码：" prop="customCode">
              <el-input v-model="form.customCode" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="统一社会信用代码："
              prop="bizLicence"
              class="bizLicence"
            >
              <el-input v-model="form.bizLicence" :maxLength="18" />
              {{ form.bizLicence }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纳税人识别号：" prop="invoiceTaxpayerId">
              <el-input v-model="form.invoiceTaxpayerId" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成立日期：" prop="invoiceTaxpayerId">
              <zj-date-picker v-model="form.expireDateStart" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册资本：" prop="invoiceTaxpayerId">
              <el-input v-model="form.invoiceTaxpayerId" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业工商有效期：" prop="invoiceTaxpayerId">
              <el-input v-model="form.invoiceTaxpayerId" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业规模：" prop="invoiceTaxpayerId">
              <el-input v-model="form.invoiceTaxpayerId" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业经营类型：" prop="invoiceTaxpayerId">
              <el-input v-model="form.invoiceTaxpayerId" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照注册地址：" prop="invoiceTaxpayerId">
              <el-input v-model="form.invoiceTaxpayerId" :disabled="isDetail" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <h4 class="bl zj-m-l-20 mb-10">企业联系人</h4>
          <el-col :span="8">
            <el-form-item label="企业联系人姓名：" prop="fastMailName">
              <el-input v-model="form.fastMailName" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业联系人手机号：" prop="fastMailPhone">
              <el-input v-model="form.fastMailPhone" :disabled="isDetail" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="企业联系地址：" prop="fastMailAddress">
            <el-input v-model="form.fastMailAddress" :disabled="isDetail" />
          </el-form-item>
        </el-row>
        <h4 class="bl zj-m-l-20 mb-10">法人信息</h4>
        <el-row>
          <el-col :span="8">
            <el-form-item label="法定代表人姓名：" prop="legalPersonName">
              <el-input v-model="form.legalPersonName" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法定代表人手机号码：" prop="legalPersonName">
              <el-input v-model="form.legalPersonName" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法定代表人手机号码：" prop="legalPersonName">
              <span>身份证</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="法定代表人身份证号：" prop="legalCertNo">
              <el-input v-model="form.legalCertNo" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="法人身份证有效期："
              prop="legalCertRegDate"
              class="col-right"
            >
              <zj-date-range-picker
                :clearable="false"
                :startDate.sync="form.legalCertRegDate"
                @startChange="valueChange('legalCertRegDate')"
                :endDate.sync="form.legalCertExpireDate"
                @endChange="valueChange('legalCertExpireDate')"
                :disabled="isDetail"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <h4 class="bl zj-m-l-20 mb-10">银行账户信息</h4>
          <el-col :span="8">
            <el-form-item label="银行账户名称：" prop="legalPersonName">
              <el-input v-model="form.legalPersonName" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行账号：" prop="legalCertNo">
              <el-input v-model="form.legalCertNo" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行账户开户行：" prop="legalCertNo">
              <el-input v-model="form.legalCertNo" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行联行号：" prop="legalCertNo">
              <el-input v-model="form.legalCertNo" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行类型：" prop="companyType">
              <el-select
                v-model="form.companyType"
                :popper-append-to-body="false"
                :disabled="isDetail"
              >
                <el-option
                  v-for="(item, index) in dictionary.companyTypeList"
                  :key="index"
                  :value="item.code"
                  :label="item.desc"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </zj-content-block>
      <!-- 企业附件 -->
      <zj-content-block>
        <zj-header title="企业附件" />
        <zj-content>
          <zj-table
            ref="pubAttach"
            :dataList="form.pubAttachList"
            :pager="false"
            keep-source
            auto-resize
          >
            <zj-table-column title="附件类型">
              <template v-slot="{ row }">
                <span
                  v-if="
                    (form.entType === 'B' || form.entType === 'S') &&
                    row.busType !== 'QYZZ' &&
                    row.busType !== 'QYKZRZ'
                  "
                  class="error"
                  >*</span
                >
                {{ typeMap(dictionary.busTypeList, row.busType) }}
              </template>
            </zj-table-column>
            <zj-table-column field="fileName" title="附件名称" />
            <zj-table-column title="操作">
              <template v-slot="{ row }">
                <zj-button
                  type="text"
                  class="zj-m-r-10"
                  @click="pubAttachDownload(row)"
                  v-if="row.fileId"
                  >下载</zj-button
                >
                <zj-upload
                  :httpRequest="pubAttachUpload"
                  :data="{ row }"
                  class="zj-inline"
                  v-if="!isDetail"
                >
                  <zj-button type="text">上传</zj-button>
                </zj-upload>
              </template>
            </zj-table-column>
          </zj-table>
          <zj-content>
            <zj-content-tip
              text="注：1.以上上传的影像件请全部加盖公司公章。"
            ></zj-content-tip>
            <br />
            <zj-content-tip text="2.支持上传的文档格式：PDF。"></zj-content-tip>
            <br />
            <zj-content-tip
              text="3.若上传身份证，请将身份证正、反面完整放在同一页上。请确保身份证在有效期内。 "
            ></zj-content-tip>
            <br />
            <zj-content-tip
              text=" 4.若上传营业执照，请确保营业执照为最新版本。 "
            ></zj-content-tip>
          </zj-content>
        </zj-content>
      </zj-content-block>
    </el-form>

    <zj-content-footer>
      <zj-button type="primary" @click="submit">确认提交</zj-button>
      <zj-button class="back" @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isDetail: this.$route.meta.pageType,
      form: {},
      rules: {},
      dictionary: {},
    };
  },
};
</script>

<style scoped lang="less">
</style>
