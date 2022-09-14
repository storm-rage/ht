<template>
  <zj-content-container>
    <zj-top-header title="企业注册审核"></zj-top-header>
    <el-form label-width="160px">
      <zj-content-block v-show="workflow === 'sqxx'">
        <!-- 业务申请信息 -->
        <zj-content-block>
          <zj-header title="业务申请信息" />
          <zj-content>
            <el-row>
              <el-col :span="8">
                <el-form-item label="申请流水号：">
                  <span>{{ detailData.serialNo | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请类型：">
                  <span>
                    {{
                      typeMap(dictionary.applyTypeList, detailData.applyType)
                    }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请状态：">
                  <span>
                    {{
                      typeMap(
                        dictionary.applyStatusList,
                        detailData.applyStatus
                      )
                    }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请时间：">
                  <span> {{ detailData.applyDatetime }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </zj-content>
        </zj-content-block>
        <!-- 企业基础信息 -->
        <zj-content-block>
          <zj-header title="企业基础信息" />
          <zj-content>
            <!-- 企业信息 -->
            <zj-collapse title="企业信息">
              <el-form label-width="160px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="企业名称：">
                      <span>{{ detailData.name | value }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="统一社会信用代码：">
                      <span>{{ detailData.bizLicence | value }}</span>
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

            <!-- 天眼查信息 -->
            <zj-collapse title="天眼查信息">
              <zj-button type="text" @click="activeEyeSky = !activeEyeSky" ref="EyeSkyBtn">{{ activeEyeSky ? "收起" : "展开" }}</zj-button>
              <zj-button @click="getEyeSky">一键获取天眼查信息</zj-button>

              <zj-eye-sky :mountKey="true" ref="eyesky" :show="activeEyeSky" :entId="row.id" @eyeSkyChange="eyeSkyChange" />
            </zj-collapse>
          </zj-content>
        </zj-content-block>
        <!-- 操作用户信息 -->
        <zj-content-block>
          <zj-header title="操作用户信息" />
          <zj-content>
            <zj-table :pager="false" :dataList="detailData.entUserList">
              <zj-table-column field="roleName" title="操作员类型" />
              <zj-table-column field="userName" title="姓名" />
              <zj-table-column field="certNo" title="身份证号" />
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
            </zj-table>
          </zj-content>
        </zj-content-block>
        <!-- 相关资料附件 -->
        <related-attach :infoBar="attachInfo.infoBar" :infoList="attachInfo.infoList" :infoViewList="attachInfo.infoViewList" />

        <!-- 其他信息 -->
        <ent-else-info :detailData="detailData" />
      </zj-content-block>

      <!-- 审批信息 -->
      <zj-content-block v-show="workflow === 'spxx'">
        <!--操作记录 -->
        <zj-content-block>
          <zj-header title="操作记录"></zj-header>
          <zj-content>
            <zj-table ref="logTable" :dataList="detailData.entRegLogList || []" :pager="false">
              <zj-table-column type="seq" width="60" title="序号" />
              <zj-table-column field="operType" title="业务节点" />
              <zj-table-column field="creator" title="处理人" />
              <zj-table-column field="createDatetime" title="处理时间" formatter="formatDateTime" />
              <zj-table-column field="operFlag" title="审核结果" />
              <zj-table-column field="notes" title="审核意见" />
            </zj-table>
          </zj-content>
        </zj-content-block>
        <!--审核信息 -->
        <el-form label-width="170px" :model="form" :rules="rules" ref="auditForm" :disabled="detailData.applyStatus === 'E002' || pageType === 'detail'">
          <zj-content>
            <zj-collapse title="审核信息">
              <el-form-item label="平台客户类型：" prop="entType">
                <el-radio-group v-model="form.entType">
                  <el-radio v-for="item in dictionary.platFormAuditEntTypeList" :key="item.code" :label="item.code" :disabled="form.isHtEnterprise === '1'">{{ item.desc }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否海天集团：" prop="isHtEnterprise">
                <el-radio-group v-model="form.isHtEnterprise">
                  <el-radio v-for="item in [
                      { code: '1', desc: '是' },
                      { code: '0', desc: '否' },
                    ]" :key="item.code" :label="item.code" disabled>{{ item.desc }}</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="供应商类型：" prop="supplierType" v-if="form.entType === 'S'">
                <el-radio-group v-model="form.supplierType">
                  <el-radio v-for="item in dictionary.supplierTypeList" :key="item.code" :label="item.code" :disabled="form.isHtEnterprise === '1'">{{ item.desc }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="注册企业名称：" prop="name">
                {{ detailData.name }}
              </el-form-item>

              <el-form-item label="注册企业简称：" prop="shortName">
                <el-input v-model.trim="form.shortName" :maxlength="101" placeholder="请填写企业简称" :disabled="form.isHtEnterprise === '1'" />
              </el-form-item>
              <el-form-item label="注册企业曾用名：" prop="beforeName">
                <el-input v-model.trim="form.beforeName" placeholder="如有多个，使用逗号分隔" :maxlength="200" />
              </el-form-item>
              <el-form-item label="买方企业名称：" prop="myBuyers">
                {{ detailData.myBuyers }}
              </el-form-item>
              <el-form-item label="客户业务系统编码：" prop="customCode">
                <el-input v-model.trim="form.customCode" :maxlength="21" placeholder="请填写客户编码" />
                <zj-content-tip class="zj-m-l-10" text="注：供应商在核心企业业务系统的编码，选填。"></zj-content-tip>
              </el-form-item>
            </zj-collapse>
          </zj-content>
        </el-form>
        <!--  审核意见  -->
        <audit-remark ref="auditRemark" v-if="pageType !== 'detail'"></audit-remark>
      </zj-content-block>
    </el-form>

    <!-- 底部工作流状态 -->
    <zj-workflow v-model="workflow" :list="workflowList">
      <!-- 审核时 -->
      <el-row slot="right">
        <span v-show="workflow === 'spxx'" v-if="pageType !== 'detail'">
          <zj-button type="primary" @click="submitAudit('1')" v-if="detailData.applyStatus === 'E001'">暂存</zj-button>
          <zj-button type="primary" @click="submitAudit('2')">审核通过</zj-button>
          <zj-button @click="submitAudit('3')" v-if="detailData.applyStatus === 'E002'">审核驳回</zj-button>
          <zj-button @click="submitAudit('4')" v-if="detailData.applyStatus === 'E001'">注册拒绝</zj-button>
        </span>
        <zj-button class="back zj-m-l-15" @click="goParent">返回</zj-button>
      </el-row>
    </zj-workflow>

    <!--   查看器 -->
    <zj-preview :visible.sync="viewShow" :fileUrl="viewUrl" :showFooter="false" :fileType="viewType" @close="viewShow = false" />
  </zj-content-container>
</template>

<script>
import protocolAudit from "./commom/protocolAudit.js";
import view from "@pubComponent/preview/view.js";
import AuditRemark from "@modules/workflow/views/components/auditRemark";
import legalPerson from "@modules/base/views/entUserManage/entManage/components/legalPerson";
import entLinkman from "@modules/base/views/entUserManage/entManage/components/entLinkman";
import bankAccount from "@modules/base/views/entUserManage/entManage/components/bankAccount";
import entElseInfo from "@modules/base/views/entUserManage/entManage/components/entElseInfo";
import relatedAttach from "@modules/base/views/entUserManage/entManage/components/relatedAttach";
import { windowSSStorage } from "@utils/storageUtils";
export default {
  components: {
    AuditRemark,
    legalPerson,
    entLinkman,
    bankAccount,
    entElseInfo,
    relatedAttach
  },
  mixins: [
    protocolAudit,
    view,
  ],
  data() {
    return {
      pageType: this.$route.meta.pageType,
      detailData: {}, //详情数据
      dictionary: {}, //字典
      zjControl: {
        ...this.$api.registerAudit,
      }, //api

      workflow: "sqxx",
      workflowList: [
        { label: "申请信息", value: "sqxx" },
        { label: "审批信息", value: "spxx" },
      ],
      form: {},
      rules: {
        shortName: [
          { required: true, message: "请填写企业简称", trigger: "blur" },
          { max: 100, message: "企业简称不可超过100字符", trigger: "blur" },
        ],
        entType: [
          { required: true, message: "请选择平台客户类型", trigger: "blur" },
        ],
        supplierType: [
          {
            required: true,
            message: "请选择供应商类型",
            trigger: "blur",
          },
        ],
      },
      //相关附件资料
      attachInfo: {},

      //天眼查
      nameSuccess: true,//企业名称
      bizLicenceSuccess: true,//信用代码
      legalPersonNameSuccess: true,//法定代表人姓名
      pcaSuccess: true,//企业注册地址
      activeEyeSky: false,//天眼查打开控制
      eyeSkyId: '',//天眼查企业id
      usedViewer: true, // 采用图片查看器
    };
  },
  created() {
    this.getApi();
    this.getRow();
    this.getDirectory();
    this.getAuditDetail();
  },
  methods: {
    //返回查询页
    beforeGoParent() {
      windowSSStorage.setItem("registerAuditAudit", "1");
    },
    //获取字典
    getDirectory() {
      this.zjControl.queryEntDataDirectory().then((res) => {
        res.data.enterpriseStateCheList = JSON.parse(
          JSON.stringify(res.data.enterpriseStateList)
            .replace(/code/g, "value")
            .replace(/desc/g, "label")
        );
        this.dictionary = res.data;
      });
    },
    //获取详情
    getAuditDetail() {
      this.zjControl.getAuditDetail({ id: this.row.id }).then((res) => {
        this.detailData = res.data;
        //审核信息
        this.form = this.detailData;
        this.form.id = this.row.id;
        this.handleAttach()
      });
    },
    // 处理附件信息
    handleAttach() {
      let jb = this.detailData.entUserList.find(item => item.roleId == '2' || item.roleId == '5') || {}
      let fh = this.detailData.entUserList.find(item => item.roleId == '3' || item.roleId == '6') || {}
      let fx = this.detailData.entUserList.find(item => item.roleId == '4' || item.roleId == '7') || {}
      this.attachInfo.infoBar = ['营业执照', '法定代表人身份证', '操作用户经办员', '操作用户复核员', '风险信息接收人', '委托授权书'] //导航栏
      this.attachInfo.infoList = [
        [
          { label: '统一社会信用代码：', value: this.detailData.bizLicence },
          { label: '工商有效期：', value: this.date(this.detailData.registerStartDate) + ' 至 ' + this.date(this.detailData.registerEndDate) },
          { label: '注册资本：', value: this.detailData.registerCapital }
        ],
        [
          { label: '法定代表人姓名：', value: this.detailData.legalPersonName },
          { label: '证件号码：', value: this.detailData.legalCertNo },
          { label: '证件有效期：', value: this.date(this.detailData.legalCertRegDate) + ' 至 ' + this.date(this.detailData.legalCertExpireDate) }
        ],
        [
          { label: '经办员姓名:', value: jb.userName },
          { label: '经办员身份证号码：', value: jb.certNo },
          { label: '证件有效期：', value: this.date(jb.certStartDate) + ' 至 ' + this.date(jb.certEndDate) }
        ],
        [
          { label: '操作用户复核员：', value: fh.userName },
          { label: '证件号码：', value: fh.certNo },
          { label: '证件有效期：', value: this.date(fh.certStartDate) + ' 至 ' + this.date(fh.certEndDate) }
        ],
        [
          { label: '风险信息接收人：', value: fx.userName },
          { label: '证件号码：', value: fx.certNo },
          { label: '证件有效期：', value: this.date(fx.certStartDate) + ' 至 ' + this.date(fx.certEndDate) }
        ],
        [{}]
      ]
      this.attachInfo.infoViewList = [
        { fileId: this.detailData.qyyzFileId, fileName: this.detailData.qyyzAttachName },
        { fileId: this.detailData.qyfrzjFileId, fileName: this.detailData.qyfrzjAttachName },
        { fileId: jb.identitycardFileId, fileName: jb.identitycardFileName },
        { fileId: fh.identitycardFileId, fileName: fh.identitycardFileName },
        { fileId: fx.identitycardFileId, fileName: fx.identitycardFileName },
        { fileId: this.detailData.qywtsqsFileId, fileName: this.detailData.qywtsqsAttachName },
      ]
    },
    // 提交表单 1-暂存 2-审核通过 3-审核驳回 4-审核拒绝
    submitAudit(type) {
      this.$refs.auditForm.validate((valid) => {
        if (valid) {
          // if (
          //   !this.form.notes ||
          //   (this.form.notes && this.form.notes.trim().length < 1)
          // ) {
          //   return this.$Message.warning("驳回时审核意见必须填写!");
          // }
          if (type === "3" || type === "4") {
            let flag = false;
            this.$refs.auditRemark.getForm().validate((valid) => {
              console.log(this.$refs.auditRemark);
              flag = valid;
            });
            if (!flag) return;
          }
          let message = "";
          if (type === "1") {
            message = "暂存成功";
          }
          if (type === "2") {
            message = "审核通过成功";
          }
          if (type === "3") {
            message = "审核驳回成功";
          }
          if (type === "4") {
            message = "审核拒绝成功";
          }

          let autoApi = "";
          this.$refs.auditRemark.getForm().clearValidate();
          const { notes } = this.$refs.auditRemark.getData();

          let params = {
            ...this.form,
            submitAuditFlag: type,
            notes,
          };

          if (this.detailData.applyStatus === "E001" || this.detailData.applyStatus === "E005") {
            autoApi = this.zjControl.submitPlatformAudit; // 初审
          } else {
            autoApi = this.zjControl.submitAuditConfirm; // 复审
          }

          autoApi(params).then(() => {
            this.$message.success(message);
            this.goParent();
          });
        }
      });
    },
    //一键获取天眼查信息
    getEyeSky() {
      this.activeEyeSky = true
      this.$refs.eyesky.resetIsOne()
      this.$refs.eyesky.getTycList()
    },
    //重新获取天眼查信息
    eyeSkyChange(res) {
      if (res && res.modelName === 'basicInfo') {
        //报红检测
        if (res.data) {
          this.nameSuccess = true
          this.bizLicenceSuccess = this.detailData.bizLicence === res.data.creditCode
          this.legalPersonNameSuccess = this.detailData.legalPersonName === res.data.legalPersonName
          // let newPac = this.detailData.provinceZh+'  '+this.detailData.cityZh+'  '+this.detailData.address
          let newPac = this.detailData.address
          let tycPac = res.data.legalPersonName + ''
          this.pcaSuccess = newPac.trim() === tycPac.trim()
        } else {
          this.nameSuccess = false
          this.bizLicenceSuccess = true
          this.legalPersonNameSuccess = true
          this.pcaSuccess = true
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
// 工作流
/deep/.workflow-bottom {
  .right {
    float: none !important;
    width: calc(100% - 400px) !important;
    display: flex;
    justify-content: center;
  }
}
</style>
