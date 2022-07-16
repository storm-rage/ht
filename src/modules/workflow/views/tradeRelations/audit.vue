<template>
  <zj-content-container>
    <zj-top-header title="贸易关系审核"></zj-top-header>
    <zj-content-block>
    <!--  交易信息  -->
      <zj-header title="交易信息"></zj-header>
      <zj-content>
        <el-form ref="form" label-width="160px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请流水号：" prop="field1">
                546565465
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请类型：" prop="field1"> 11 </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请状态：" prop="field1"> 11 </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请时间：" prop="field1"> 11 </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zj-content>
    </zj-content-block>
    <relations-info />
    <!--  操作记录  -->
    <operate-log></operate-log>
    <!--  审批意见  -->
    <audit-remark></audit-remark>
    <zj-content-footer>
      <zj-button type="primary" @click="back">审核通过</zj-button>
      <zj-button type="primary" @click="back">拒绝</zj-button>
      <zj-button @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import relationsInfo from "@modules/ebill/views/tradeBackground/busiessTradeRelations/detilt/info";
import OperateLog from "../components/operateLog";
import AuditRemark from "../components/auditRemark";

export default {
  components: {
    relationsInfo,
    OperateLog,
    AuditRemark,
  },
  data() {
    return {};
  },
  methods: {
    back() {},
  },
};
</script>
