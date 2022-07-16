<template>
  <zj-content-container>
    <zj-top-header>基础信息维护交易详情</zj-top-header>
    <!-- 交易信息 -->
    <zj-content-block>
      <zj-header>交易信息</zj-header>
      <el-form ref="form" label-width="160px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请流水号：" prop="field1">
              546565465
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务类型：" prop="field1">
              546565465
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请时间：" prop="field1">
              546565465
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请状态：" prop="field1">
              546565465
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拒绝原因：" prop="field1">
              546565465
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </zj-content-block>

    <!-- 企业基础信息 -->
    <zj-content-block>
      <zj-header title="企业基础信息" />
      <zj-content>
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
                  <span>{{ detailData.name | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="曾用名：">
                  <span>{{ detailData.name | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="平台客户类型：">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户业务系统编码：">
                  <span>{{ detailData.bizLicence | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码：">
                  <span>{{ detailData.bizLicence | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="纳税人识别码：">
                  <span>{{ detailData.bizLicence | value }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="成立日期：">
                  <span>{{ detailData.address }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册资本：">
                  <span>{{ detailData.address }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业工商有效期：">
                  <span>{{ detailData.address }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业规模：">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业经营类型：">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="营业执照注册地址：">
                  <span>{{ detailData.address }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </zj-collapse>

        <!-- 企业联系人 -->
        <ent-linkman />

        <!-- 法人信息 -->
        <legal-person />

        <!-- 银行账户 -->
        <bank-account />
      </zj-content>
    </zj-content-block>

    <!-- 企业附件 -->
    <ent-accessory />

    <zj-content-footer>
      <zj-button
        class="back"
        @click="$router.push('/transactionQuery')"
        :api="zjBtn.passBillSignBatch"
        >返回</zj-button
      >
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import legalPerson from "@modules/base/views/entUserManage/entManage/components/legalPerson";
import entLinkman from "@modules/base/views/entUserManage/entManage/components/entLinkman";
import bankAccount from "@modules/base/views/entUserManage/entManage/components/bankAccount";
import entAccessory from "@modules/base/views/entUserManage/entManage/components/entAccessory";

export default {
  components: {
    legalPerson,
    entLinkman,
    bankAccount,
    entAccessory,
  },
  data() {
    return {
      zjControl: {},
      searchForm: {},
      detailData: {},
    };
  },
  created() {},
  methods: {},
};
</script>
<style lang="less" scoped>
</style>