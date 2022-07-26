<template>
  <zj-content-container>
    <zj-top-header>基础信息维护交易详情</zj-top-header>
    <!-- 交易信息 -->
    <zj-content-block>
      <zj-header>交易信息</zj-header>
      <el-form ref="form" label-width="160px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请流水号：">
              {{ this.detailData.serialNo | value }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务类型：">
              {{ typeMap(this.dictionary.busType, this.detailData.busType) }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请时间：">
              {{ this.detailData.applyDatetime | value }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请状态：" prop="field1">
              {{
                typeMap(
                  this.dictionary.applyStatus,
                  this.detailData.applyStatus
                )
              }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拒绝原因：" prop="field1">
              {{ this.detailData.rejectReason | value }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </zj-content-block>

    <!-- 用户信息 -->
    <zj-content-block>
      <zj-header title="用户信息"></zj-header>
      <zj-content>
        <el-form ref="form" label-width="160px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="用户姓名：">
                {{ detailData.userName | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="角色：">
                {{ typeMap(this.dictionary.roleId, this.detailData.roleId) }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="海天业务系统账号：">
                {{ detailData.htSysCode | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件类型：">
                {{
                  typeMap(
                    this.dictionary.legalCertType,
                    this.detailData.certType
                  )
                }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码：">
                {{ detailData.certNo | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件有效期：">
                {{ detailData.certStartDate }}至{{ detailData.certEndDate }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码/用户名：">
                {{ detailData.mobileNo | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱：">
                {{ detailData.email | value }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zj-content>
    </zj-content-block>

    <!-- 企业附件 -->
    <ent-accessory ref="entAccessory" title="附件信息" :isEdit="false" />

    <zj-content-footer>
      <zj-button
        class="back"
        @click="$router.push('/basicInfoApplyRecord')"
        :api="zjBtn.passBillSignBatch"
        >返回</zj-button
      >
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import entAccessory from "@modules/base/views/entUserManage/entManage/components/entAccessory";

export default {
  components: {
    entAccessory,
  },
  data() {
    return {
      zjControl: {
        ...this.$api.maintainTransaction,
      },
      detailData: {},
      dictionary: {},
      attachInfo: [
        { type: "身份证影印件", fileName: "" },
        { type: "委托授权书", fileName: "" },
      ],
    };
  },
  created() {
    this.getDirectory();
    this.getDetail();
  },
  methods: {
    // 获取字典
    getDirectory() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data;
      });
    },
    // 获取详情
    getDetail() {
      let params = {
        busType: this.$route.query.busType,
        serialNo: this.$route.query.serialNo,
      };
      this.zjControl.getDetail(params).then((res) => {
        this.detailData = { ...res.data, ...res.data.userInfo };
        // //企业附件
        this.attachInfo[0].fileId = this.detailData.identitycardFileId;
        this.attachInfo[0].fileName = this.detailData.identitycardFileName;
        this.attachInfo[1].fileId = this.detailData.wtsqsFileId;
        this.attachInfo[1].fileName = this.detailData.wtsqsFileName;
        this.$refs.entAccessory.$data.fileList = this.attachInfo
      });
    },
  },
};
</script>
<style lang="less" scoped>
</style>