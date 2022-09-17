<template>
  <zj-content-block>
    <!-- 表单 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="200px">
      <zj-content-block>
        <zj-header title="企业基础信息" />
        <el-row>
          <h4 class="bl zj-m-l-20 mb-10">企业信息</h4>
          <el-col :span="isAdd ? 24 : 8">
            <el-form-item label="企业名称：" prop="name">
              <template>
                <el-input v-model="form.name" :disabled="isDetail || isEdit" />
                <zj-button class="zj-m-l-10" v-if="isAdd" type="primary" @click="getEnterpriseConfirm">确定</zj-button>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业简称：" prop="shortName">
              <el-input v-model="form.shortName" :disabled="isDetail || isEdit" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="曾用名：" prop="beforeName">
              <el-input v-model="form.beforeName" :disabled="isDetail" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="客户业务系统编码：" prop="customCode">
              <el-input v-model="form.customCode" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="平台客户类型：" prop="entType">
              <el-radio-group v-model="form.entType" @change="entTypeChange">
                <el-radio v-for="item in [
                    { code: 'B', desc: '核心企业' },
                    { code: 'BL', desc: '保理公司' },
                  ]" :key="item.code" :label="item.code" :disabled="isDetail || isEdit">{{ item.desc }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-show="form.entType === 'B'">
            <el-form-item label="是否海天集团：" prop="isHtEnterprise">
              <el-radio-group v-model="form.isHtEnterprise">
                <el-radio v-for="item in [
                    { code: '1', desc: '是' },
                    { code: '0', desc: '否' },
                  ]" :key="item.code" :label="item.code" :disabled="isDetail || isEdit || item.code === '0'">{{ item.desc }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="form.isHtEnterprise === '1' && form.entType === 'B'">
            <el-form-item label="是否双岗：" prop="isDoublePost">
              <el-radio-group v-model="form.isDoublePost">
                <el-radio v-for="item in [
                    { code: '1', desc: '是' },
                    { code: '0', desc: '否' },
                  ]" :key="item.code" :label="item.code" :disabled="isDetail || isEdit">{{ item.desc }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="统一社会信用代码：">
              <template>
                <el-input v-model="form.bizLicence" :maxLength="18" disabled />
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纳税人识别号：">
              <el-input v-model="form.invoiceTaxpayerId" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成立日期：">
              <zj-date-picker :date.sync="form.registerStartDate" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册资本：">
              <el-input v-model="form.registerCapital" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业工商有效期：" prop="registerEndDate">
              <zj-date-picker :date.sync="form.registerEndDate" :disabled="isDetail || isEdit" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业规模：" prop="scale">
              <el-select v-model="form.scale" :popper-append-to-body="false" :disabled="isDetail">
                <el-option v-for="(item, index) in dictionary.scaleList" :key="index" :value="item.code" :label="item.desc"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业经营类型：" prop="custType">
              <el-select v-model="form.custType" :disabled="isDetail">
                <el-option v-for="(item, index) in dictionary.custTypeList" :key="index" :value="item.code" :label="item.desc"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="营业执照注册地址：">
              <el-input v-model="form.address" disabled />
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
            <el-form-item label="法定代表人姓名：">
              <el-input v-model="form.legalPersonName" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法定代表人证件类型：" prop="controllerCertNo">
              <el-select v-model="form.legalCertType" :popper-append-to-body="false" :disabled="isDetail">
                <el-option v-for="(item, index) in dictionary.legalCertTypeList" :key="index" :value="item.code" :label="item.desc" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法定代表人身份证号：" prop="legalCertNo">
              <el-input v-model="form.legalCertNo" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法人身份证有效期：" prop="legalCertRegDate" class="col-right">
              <zj-date-range-picker :clearable="false" :startDate.sync="form.legalCertRegDate" @startChange="valueChange('legalCertRegDate')" :endDate.sync="form.legalCertExpireDate" @endChange="valueChange('legalCertExpireDate')" :disabled="isDetail" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <h4 class="bl zj-m-l-20 mb-10">银行账户信息</h4>
          <el-col :span="8">
            <el-form-item label="银行账户名称：" prop="bankAccname">
              <el-input v-model="form.bankAccname" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行账号：" prop="bankAccno">
              <el-input v-model="form.bankAccno" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行账户开户行：" prop="bankName">
              <el-input v-model="form.bankName" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行联行号：" prop="bankNo">
              <el-input v-model="form.bankNo" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="银行类型：" prop="bankType">
              <el-select v-model="form.bankType" :popper-append-to-body="false" :disabled="isDetail">
                <el-option v-for="(item, index) in dictionary.bankTypeList" :key="index" :value="item.code" :label="item.desc" />
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <h4 class="bl zj-m-l-20 mb-10">控制人信息</h4>
          <el-col :span="8">
            <el-form-item label="控制人姓名：" prop="actualController">
              <el-input v-model="form.actualController" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="控制人证件类型：" prop="controllerCertNo">
              <el-select v-model="form.controllerCertType" :popper-append-to-body="false" :disabled="isDetail">
                <el-option v-for="(item, index) in dictionary.legalCertTypeList" :key="index" :value="item.code" :label="item.desc" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="控制人身份证号：" prop="controllerCertNo">
              <el-input v-model="form.controllerCertNo" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="控制人身份证有效期：" prop="legalCertRegDate" class="el-form-item__regExpire">
              <zj-date-range-picker class="no-icon legalDates" :clearable="false" :startDate.sync="form.controllerCertRegDate" @startChange="valueChange('legalCertRegDate')" :endDate.sync="form.controllerCertExpireDate" @endChange="valueChange('legalCertExpireDate')" :disabled="isDetail" />
              <el-form-item prop="legalCertExpireDate" />
            </el-form-item>
          </el-col>
        </el-row>
      </zj-content-block>
      <!-- 企业操作员 -->
      <zj-content-block v-if="isAdd || workflowState === 'addDetail'">
        <zj-header title="企业操作员" />
        <zj-content>
          <zj-button class="append zj-m-b-10" type="primary" @click="sysUserAdd" v-if="!isDetail">新增</zj-button>
          <zj-table ref="sysUser" :dataList="sysUserList" :pager="false" keep-source auto-resize :edit-rules="validRules" :edit-config="{
              trigger: 'manual',
              mode: 'row',
              icon: '-',
              autoClear: false,
              showStatus: true,
            }" class="sysUserAdd">
            <zj-table-column field="htSysCode" title="娅米账号/业务系统账号" :edit-render="{}">
              <template #edit="{ row }">
                <vxe-input v-model="row.htSysCode" type="text" :disabled="row.isHtSysCodeDis"></vxe-input>
              </template>
            </zj-table-column>
            <zj-table-column field="userName" title="姓名" :edit-render="{}">
              <template #edit="{ row, rowIndex }">
                <vxe-input v-model="row.userName" type="text" @focus="(val)=>getEmployeeInfo(row,rowIndex)" :disabled="row.isUserNameDis"></vxe-input>
              </template>
            </zj-table-column>
            <zj-table-column field="certNo" title="身份证号码" :edit-render="{}">
              <template #edit="{ row }">
                <vxe-input v-model="row.certNo" type="text" :disabled="row.isCertNoDis"></vxe-input>
              </template>
            </zj-table-column>
            <zj-table-column field="mobileNo" title="手机号码" :edit-render="{}">
              <template #edit="{ row }">
                <vxe-input v-model="row.mobileNo" type="text" :disabled="row.isMobileNoNameDis"></vxe-input>
              </template>
            </zj-table-column>
            <zj-table-column field="email" title="邮箱" :edit-render="{}">
              <template #edit="{ row }">
                <vxe-input v-model="row.email" type="text" :disabled="row.isEmailDis"></vxe-input>
              </template>
            </zj-table-column>
            <zj-table-column field="roleIds" title="操作员角色" :edit-render="{
              name: '$select',
              props: { multiple: true },
              options: statementAccountTypeTable,
              events: {change:statementAccountTypeChange}}" />
            <zj-table-column field="statementAccountType" title="支持开凭证对账单类型" :edit-render="{
                name: '$select',
                props: { multiple: true, disabled: isDstatementAccountType },
                options: dictionary.statementAccountTypeListTable
              }" v-if="form.entType === 'B'" />
            <zj-table-column title="操作" v-if="!isDetail">
              <template v-slot="{ row, rowIndex }">
                <template v-if="!$refs.sysUser.isActiveByRow(row)">
                  <zj-button type="text" @click="sysUserEdit(row)">修改</zj-button>
                  <zj-button type="text" @click="sysUserDel(rowIndex)">删除</zj-button>
                </template>
                <template v-if="$refs.sysUser.isActiveByRow(row)">
                  <zj-button type="text" @click="sysUserSave(row, rowIndex)">保存</zj-button>
                  <zj-button type="text" @click="sysUserCancel(row, rowIndex)">取消</zj-button>
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
          <zj-table ref="pubAttach" :dataList="pubAttachList" :pager="false" keep-soursce auto-resize>
            <zj-table-column title="附件类型">
              <template v-slot="{ row }">
                {{ typeMap(dictionary.sysAttachTypeList, row.busType) }}
              </template>
            </zj-table-column>
            <zj-table-column field="fileName" title="附件名称" />
            <zj-table-column title="操作">
              <template v-slot="{ row }">
                <zj-upload :httpRequest="pubAttachUpload" :data="{ row }" class="zj-inline" v-if="!isDetail">
                  <zj-button type="text">上传</zj-button>
                </zj-upload>
                <zj-button type="text" class="zj-m-r-10" @click="pubAttachDownload(row)" v-if="row.fileId">下载</zj-button>
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
              <el-input v-model="form.invoicePhone" @input="invoiceOneAndAll" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮箱：" prop="invoiceEmail">
              <el-input v-model="form.invoiceEmail" @input="invoiceOneAndAll" :disabled="isDetail" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row__twoAddress">
          <el-col :span="16">
            <el-form-item label="地址：" prop="invoiceAddress">
              <el-input style="width: 100%" v-model="form.invoiceAddress" @input="invoiceOneAndAll" :disabled="isDetail" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="开户行：" prop="invoiceBankInfo">
              <el-input v-model="form.invoiceBankInfo" @input="invoiceOneAndAll" :disabled="isDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行账号：" prop="invoiceBankAccno">
              <el-input v-model="form.invoiceBankAccno" @input="invoiceOneAndAll" :disabled="isDetail" />
            </el-form-item>
          </el-col>
        </el-row>
      </zj-content-block>
      <!--  其他附件    -->
      <other-file-setting ref="ofileSetting" :isEdit="isAdd || isEdit"></other-file-setting>
      <!--  操作记录  -->
      <operate-log ref="operateLog" :logList="logList" v-if="!isAdd"></operate-log>
    </el-form>
  </zj-content-block>
</template>

<script>
import entManage from "./entManage";
export default entManage;
</script>

<style scoped lang="less">
/deep/ .zj-date-range-picker {
  width: 100px;
  .el-input__inner {
    padding-left: 3px;
  }
  & ~ span {
    display: inline-block;
    width: 20px;
    text-align: center;
  }
}

/deep/ .vxe-header--row .vxe-cell .vxe-cell--title {
  width: auto;
}
</style>
