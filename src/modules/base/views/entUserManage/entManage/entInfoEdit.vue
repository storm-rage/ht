<template>
  <zj-content-block>
    <!-- 表单 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="200px">
      <zj-content-block>
        <zj-header title="企业基础信息" />
        <el-row>
          <h4 class="bl zj-m-l-20 mb-10">企业信息</h4>
          <el-col :span="pageType === 'add' ? 24 : 8">
            <el-form-item label="企业名称：" prop="name">
              <template v-if="pageType === 'add'">
                <el-input v-model="form.name" />
                <zj-button
                  class="zj-m-l-10"
                  status="primary"
                  @click="searchEye"
                  :disabled="!form.name || (form.name && !form.name.trim())"
                  :title="
                    !form.name || (form.name && !form.name.trim())
                      ? '请您先输入企业名称'
                      : ''
                  "
                  >查询天眼查信息</zj-button
                >
              </template>
              <template v-else>
                {{ form.name }}
              </template>
            </el-form-item>
          </el-col>
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
          <el-col span="24">
            <el-form-item label="平台客户类型：" prop="entType">
              <el-radio-group v-model="form.entType" @change="entTypeChange">
                <el-radio
                  v-for="item in dictionary.entTypeList"
                  :key="item.code"
                  :label="item.code"
                  :disabled="isDetail || isEdit"
                  >{{ item.desc }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="统一社会信用代码："
              prop="bizLicence"
              class="bizLicence"
            >
              <template v-if="pageType === 'add'">
                <el-input v-model="form.bizLicence" :maxLength="18" />
              </template>
              <template v-else>
                {{ form.bizLicence }}
              </template>
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
          <el-col :span="16">
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
        <el-row>
          <h4 class="bl zj-m-l-20 mb-10">法人信息</h4>
          <el-col :span="8">
            <el-form-item label="法定代表人姓名：" prop="legalPersonName">
              <el-input v-model="form.legalPersonName" :disabled="isDetail" />
            </el-form-item>
          </el-col>

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
          <h4 class="bl zj-m-l-20 mb-10">银行账户信息（选填）</h4>
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
        <el-row>
          <h4 class="bl zj-m-l-20 mb-10">控制人信息</h4>
          <el-col :span="8">
            <el-form-item label="控制人姓名：" prop="legalPersonName">
              <el-input v-model="form.legalPersonName" :disabled="isDetail" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="控制人身份证号：" prop="legalCertNo">
              <el-input v-model="form.legalCertNo" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="控制人身份证有效期："
              prop="legalCertRegDate"
              class="el-form-item__regExpire"
            >
              <zj-date-range-picker
                class="no-icon legalDates"
                :clearable="false"
                :startDate.sync="form.legalCertRegDate"
                @startChange="valueChange('legalCertRegDate')"
                :endDate.sync="form.legalCertExpireDate"
                @endChange="valueChange('legalCertExpireDate')"
                :disabled="isDetail"
              />
              <el-form-item prop="legalCertExpireDate" />
            </el-form-item>
          </el-col>
        </el-row>
      </zj-content-block>
      <!-- 企业操作员 -->
      <zj-content-block v-if="pageType === 'add'">
        <zj-header title="企业操作员" />
        <zj-content>
          <zj-button
            class="append mb-10"
            icon="el-icon-circle-plus-outline"
            @click="sysUserAdd"
            >新增</zj-button
          >
          <zj-table
            ref="sysUser"
            :dataList="form.sysUserList"
            :pager="false"
            keep-source
            auto-resize
            :edit-config="{
              trigger: 'manual',
              mode: 'row',
              icon: '-',
              autoClear: false,
              showStatus: true,
            }"
            class="sysUserAdd"
          >
            <zj-table-column
              field="userName"
              title="姓名"
              :edit-render="{ name: '$input' }"
            />
            <zj-table-column
              field="certNo"
              title="身份证号码"
              :edit-render="{ name: '$input' }"
            />
            <zj-table-column
              field="mobileNo"
              title="手机号码"
              :edit-render="{ name: '$input' }"
            />
            <zj-table-column
              field="email"
              title="邮箱"
              :edit-render="{ name: '$input' }"
            />
            <zj-table-column
              field="email"
              title="内部系统账号"
              :edit-render="{ name: '$input' }"
            />
            <zj-table-column
              field="roleId"
              title="操作员角色"
              :edit-render="{
                name: '$select',
                options: dictionary.sysRoleTableList,
              }"
            />
            <zj-table-column title="操作">
              <template v-slot="{ row, rowIndex }">
                <template v-if="!$refs.sysUser.isActiveByRow(row)">
                  <zj-button type="text" @click="sysUserEdit(row)"
                    >修改</zj-button
                  >
                  <zj-button type="text" @click="sysUserDel(rowIndex)"
                    >删除</zj-button
                  >
                </template>
                <template v-if="$refs.sysUser.isActiveByRow(row)">
                  <zj-button type="text" @click="sysUserSave(row, rowIndex)"
                    >保存</zj-button
                  >
                  <zj-button type="text" @click="sysUserCancel(row, rowIndex)"
                    >取消</zj-button
                  >
                </template>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
      <!-- 企业附件 -->
      <zj-content-block>
        <zj-header title="企业附件" />
        <el-row class="zj-p-x-20">
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
        </el-row>
      </zj-content-block>
      <!-- 企业开票信息 -->
      <zj-content-block>
        <zj-header title="企业开票信息" />
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称：">
              {{ form.name }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话：" prop="invoicePhone">
              <el-input
                v-model="form.invoicePhone"
                @input="invoiceOneAndAll"
                :disabled="isDetail"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮箱：" prop="invoiceEmail">
              <el-input
                v-model="form.invoiceEmail"
                @input="invoiceOneAndAll"
                :disabled="isDetail"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row__twoAddress">
          <el-col :span="16">
            <el-form-item label="地址：" prop="invoiceAddress">
              <el-input
                v-model="form.invoiceAddress"
                @input="invoiceOneAndAll"
                :disabled="isDetail"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="开户行：" prop="invoicePhone">
              <el-input
                v-model="form.invoicePhone"
                @input="invoiceOneAndAll"
                :disabled="isDetail"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行账号：" prop="invoiceBankAccno">
              <el-input
                v-model="form.invoiceBankAccno"
                @input="invoiceOneAndAll"
                :disabled="isDetail"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </zj-content-block>
      <!--  其他附件    -->
      <other-file-setting
        ref="ofileSetting"
        is-edit="isEdit"
      ></other-file-setting>
      <!--  操作记录  -->
      <operate-log></operate-log>
    </el-form>
    <zj-content-footer>
      <zj-button type="primary" @click="submit" v-if="pageType !== 'detail'"
        >提交申请</zj-button
      >
      <zj-button class="back" @click="back">返回</zj-button>
    </zj-content-footer>

    <!-- 天眼查 -->
    <eyeDialog ref="eyeDialog" :entName="form.name" @eyeReturn="eyeReturn" />
    <orderDialog ref="orderDialog" />
  </zj-content-block>
</template>

<script>
import entManage from "./entManage";
export default entManage;
</script>

<style scoped lang="less">
</style>
