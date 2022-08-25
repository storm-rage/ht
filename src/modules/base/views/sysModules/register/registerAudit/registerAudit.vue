<template>
  <zj-content-container>
    <zj-top-header title="企业注册审核"></zj-top-header>
    <el-form label-width="160px">
      <!-- 业务申请信息 -->
      <zj-content-block v-show="workflow === 'sqxx'">
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
        <ent-info ref="entInfo">
          <template slot="entInfo">
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
          </template>
        </ent-info>
      </zj-content-block>

      <!-- 审批信息 -->
      <zj-content-block v-show="workflow === 'spxx'">
        <!--操作记录 -->
        <operate-log :logList="detailData.entRegLogList || []"></operate-log>
        <!--审核信息 -->
        <el-form label-width="170px" :model="form" :rules="rules" ref="auditForm" :disabled="detailData.applyStatus === 'E002'">
          <zj-content>
            <zj-collapse title="审核信息">
              <el-form-item label="平台客户类型：" prop="entType">
                <el-radio-group v-model="form.entType">
                  <el-radio v-for="item in dictionary.platFormAuditEntTypeList" :key="item.code" :label="item.code">{{ item.desc }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否海天集团：" prop="isHtEnterprise">
                <el-radio-group v-model="form.isHtEnterprise">
                  <el-radio v-for="item in [
                      { code: '1', desc: '是' },
                      { code: '0', desc: '否' },
                    ]" :key="item.code" :label="item.code">{{ item.desc }}</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="供应商类型：" prop="supplierType" v-if="form.entType === 'S'">
                <el-radio-group v-model="form.supplierType">
                  <el-radio v-for="item in dictionary.supplierTypeList" :key="item.code" :label="item.code">{{ item.desc }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="注册企业名称：" prop="name">
                {{ detailData.name }}
              </el-form-item>

              <el-form-item label="注册企业简称：" prop="shortName">
                <el-input v-model.trim="form.shortName" :maxlength="101" placeholder="请填写企业简称" />
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
        <audit-remark ref="auditRemark"></audit-remark>
      </zj-content-block>
    </el-form>

    <!-- 底部工作流状态 -->
    <zj-workflow v-model="workflow" :list="workflowList">
      <!-- 审核时 -->
      <el-row slot="right" v-if="$route.name === 'registerAuditApplyAudit'">
        <span v-show="workflow === 'spxx'">
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
import OperateLog from "@modules/workflow/views/components/operateLog";
import AuditRemark from "@modules/workflow/views/components/auditRemark";
import entInfo from "@modules/base/views/entUserManage/entManage/detail/entInfo.vue";
import { windowSSStorage } from "@utils/storageUtils";
export default {
  components: {
    OperateLog,
    AuditRemark,
    entInfo,
  },
  mixins: [
    // applyAudit,
    protocolAudit,
    // registerAuditAttach,
    // project,
    view,
  ],
  data() {
    return {
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
          { required: true, message: "请填写企业简称", trigger: "change" },
          { max: 100, message: "企业简称不可超过100字符", trigger: "change" },
        ],
        entType: [
          { required: true, message: "请选择平台客户类型", trigger: "change" },
        ],
        supplierType: [
          {
            required: true,
            message: "请选择供应商类型",
            trigger: "change",
          },
        ],
      },
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
        //企业基础信息
        let entInfoDom = this.$refs.entInfo;
        entInfoDom.detailData = res.data;
        // 银行账户
        entInfoDom.$refs.bankAccount.dataList = res.data.entBanksList;

        //审核信息
        this.form = this.detailData;
        this.form.id = this.row.id;
      });
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
