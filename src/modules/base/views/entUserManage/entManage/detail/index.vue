<template>
  <zj-content-container>
    <zj-top-header>企业详情</zj-top-header>
    <zj-content-block>
      <zj-header title="企业基础信息" />
      <zj-content>
        <!-- 企业信息 -->
        <zj-collapse title="企业信息">
          <el-form ref="form" label-width="160px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="企业名称：">
                  <span>{{ detailData.name | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业简称：">
                  <span>{{ detailData.shortName | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="曾用名：">
                  <span>{{ detailData.beforeName | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="平台客户类型：">
                  <span>{{
                    typeMap(dictionary.entTypeList, detailData.entType)
                  }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否海天集团：">
                  <span>{{
                    typeMap(
                      dictionary.isHtEnterpriseList,
                      detailData.isHtEnterprise
                    )
                  }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户业务系统编码：">
                  <span>{{ detailData.customCode | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码：">
                  <span>{{ detailData.bizLicence | value }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="成立日期：">
                  <span>{{ detailData.registerStartDate | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册资本：">
                  <span>{{ detailData.registerCapital | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业注册地址：">
                  <span>{{ detailData.address | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业规模：">
                  <span>{{
                    typeMap(dictionary.scaleList, detailData.scale)
                  }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业经营类型：">
                  <span>{{
                        typeMap(dictionary.custTypeList, detailData.custType)
                      }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </zj-collapse>
        <!-- 法人信息 -->
        <legal-person ref="legalPerson" :detailData="detailData" />

        <!-- 企业联系人 -->
        <ent-linkman ref="entLinkman" :detailData="detailData" />

        <!-- 银行账户 -->
        <bank-account ref="bankAccount" :dataList="detailData.entBanksList" :dictionary="dictionary" />

        <!-- 控制人信息 -->
        <controller ref="controller" :detailData="detailData" />
      </zj-content>
    </zj-content-block>
    <!-- 操作用户信息 -->
    <zj-content-block>
      <zj-header title="操作用户信息" />
      <zj-content>
        <zj-table :pager="false" :dataList="detailData.entUserList">
          <zj-table-column field="roleName" title="操作员类型" />
          <zj-table-column field="userName" title="姓名" />
          <zj-table-column field="certType" title="证件类型" :formatter="(obj) => typeMap(dictionary.userCertTypeList, obj.cellValue)" />
          <zj-table-column field="certNo" title="证件号码" />
          <zj-table-column title="证件有效期">
            <template v-slot="{ row }">
              {{ date(row.certStartDate)
                }}{{ row.certStartDate && row.certEndDate ? "~" : "" }}
              {{ date(row.certEndDate) }}
            </template>
          </zj-table-column>
          <zj-table-column field="mobileNo" title="手机号码" />
          <zj-table-column field="email" title="邮箱" />
          <zj-table-column field="bankAcctNo" title="银行卡号" />
          <zj-table-column field="htSysCode" title="海天业务系统账号" />
          <zj-table-column field="checkType" title="核查方式" :formatter="(obj) => typeMap(dictionary.checkType, obj.cellValue)" />
          <zj-table-column title="附件" width="260px">
            <template v-slot="{ row }">
              <zj-button type="text" @click="toDownload({fileId: row.identitycardFileId,fileName: row.identitycardFileName})" v-if="row.identitycardFileId">
                身份证影印件
              </zj-button>
              <span v-if="row.sqsFileId">,</span>
              <zj-button type="text" @click="toDownload({fileId: row.sqsFileId,fileName: row.sqsFileName})" v-if="row.sqsFileId">
                个人信息授权书影像件
              </zj-button>
              <span v-if="!row.identitycardFileId && !row.sqsFileId">—</span>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <!-- 相关资料附件 -->
    <related-attach :infoBar="attachInfo.infoBar" :infoList="attachInfo.infoList" :infoViewList="attachInfo.infoViewList" />

    <!-- 其他信息 -->
    <ent-else-info :detailData="detailData" />
    <!--  其他附件    -->
    <other-file-setting ref="ofileSetting" :isEdit="false" v-show="this.detailData.pubOtherAttachList"></other-file-setting>
    <zj-content-footer>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
import legalPerson from "../components/legalPerson";
import entLinkman from "../components/entLinkman";
import bankAccount from "../components/bankAccount";
import controller from "../components/controller";
import entElseInfo from "../components/entElseInfo";
import relatedAttach from "../components/relatedAttach";
import OtherFileSetting from './../components/otherFileSetting';

export default {
  components: {
    legalPerson,
    entLinkman,
    bankAccount,
    controller,
    entElseInfo,
    relatedAttach,
    OtherFileSetting
  },
  data() {
    return {
      zjControl: {
        queryEntDictionary: this.$api.entInfoManage.queryEntDictionary,
        getEnterprise: this.$api.entInfoManage.getEnterprise,
        getEbBusinessParamLog: this.$api.entInfoManage.getEbBusinessParamLog,
        downloadFile: this.$api.registerAudit.downloadFile,
        downloadFlow: this.$api.registerAudit.downloadFlow
      },
      detailData: {},
      dictionary: {},
      //相关资料附件
      attachInfo: {}
    };
  },
  created() {
    this.getRow();
    this.queryEntDictionary();
  },
  methods: {
    // 获取字典
    queryEntDictionary() {
      this.zjControl.queryEntDictionary().then((res) => {
        this.dictionary = res.data;
        this.getEnterprise();
      });
    },
    // 获取详情
    getEnterprise() {
      this.zjControl.getEnterprise({ id: this.row.id }).then((res) => {
        // 银行账户
        if (!res.data.entBanksList) {
          res.data.entBanksList = [{
            entBanksList: res.data.entBanksList,
            bankAccno: res.data.bankAccno,
            bankName: res.data.bankName,
            bankNo: res.data.bankNo,
            bankType: res.data.bankType,
          }]
        }
        this.detailData = res.data;
        // 其他附件
        this.$nextTick(() => {
          this.$refs.ofileSetting.$data.fileList = this.detailData.pubOtherAttachList || []
        })
        this.handleAttach(res.data)
      });
    },
    // 处理附件信息
    handleAttach() {
      this.attachInfo.infoBar = ['营业执照', '法定代表人身份证', '委托授权书'] //导航栏
      this.attachInfo.infoList = [
        [
          { label: '统一社会信用代码：', value: this.detailData.bizLicence },
          { label: '工商有效期：', value: this.date(this.detailData.registerStartDate) + ' 至 ' + this.date(this.detailData.registerEndDate) },
          { label: '注册资本：', value: this.detailData.registerCapital }
        ],
        [
          { label: '法定代表人姓名：', value: this.detailData.legalPersonName },
          { label: '证件类型：', value: this.typeMap(this.dictionary.userCertTypeList, this.detailData.legalCertType) },
          { label: '证件号码：', value: this.detailData.legalCertNo },
          { label: '证件有效期：', value: this.date(this.detailData.legalCertRegDate) + ' 至 ' + this.date(this.detailData.legalCertExpireDate) }
        ],
        [{}]
      ]
      this.attachInfo.infoViewList = [
        { fileId: this.detailData.qyyzFileId, fileName: this.detailData.qyyzAttachName },
        { fileId: this.detailData.qyfrzjFileId, fileName: this.detailData.qyfrzjAttachName },
        { fileId: this.detailData.qywtsqsFileId, fileName: this.detailData.qywtsqsAttachName },
      ]
    },
    // 下载
    toDownload(row) {
      this.zjControl.downloadFile(row);
    },
  }
};
</script>

<style lang="less" scoped>
</style>
