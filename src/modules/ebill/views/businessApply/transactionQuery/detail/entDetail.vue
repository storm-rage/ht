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
              {{  typeMap(this.dictionary.busType, this.detailData.busType) }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请时间：">
              {{ this.detailData.applyDatetime | value }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请状态：" prop="field1">
              {{  typeMap(this.dictionary.applyStatus, this.detailData.applyStatus) }}
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
                  <span>{{ detailData.entType | value }}</span>
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
                <el-form-item label="纳税人识别码：">
                  <span>{{ detailData.invoiceTaxpayerId | value }}</span>
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
                <el-form-item label="企业工商有效期：">
                  <span>{{ detailData.registerEndDate | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业规模：">
                  <span>{{ detailData.scale | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业经营类型：">
                  <span>{{ detailData.custType | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="营业执照注册地址：">
                  <span>{{ detailData.address | value }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </zj-collapse>

        <!-- 企业联系人 -->
        <ent-linkman ref="entLinkman" />

        <!-- 法人信息 -->
        <zj-content-block>
          <zj-collapse title="法人信息">
            <el-form ref="form" label-width="160px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="企业法人姓名：">
                    <span>{{ detailData.legalPersonName | value }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="法人身份证号码：">
                    <span>{{ detailData.legalCertNo | value }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="法人手机手机号：">
                    <span>{{ detailData.registerPhone | value }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="法人身份证有效期：">
                    <span
                      >{{ detailData.registerState | value }} 至
                      {{ detailData.registerEndDate | value }}</span
                    >
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </zj-collapse>
        </zj-content-block>

        <!-- 银行账户 -->
        <bank-account ref="bankAccount" :isShowInspect="false" />
      </zj-content>
    </zj-content-block>

    <!-- 企业附件 -->
    <zj-content-block>
      <zj-header title="企业附件" />
      <zj-content>
        <zj-table
          ref="attach"
          :dataList="attachInfo"
          :pager="false"
          auto-resize
        >
          <zj-table-column type="seq" title="序号" width="50" />
          <zj-table-column field="type" title="附件类型" />
          <zj-table-column field="fileName" title="附件名称" />
        </zj-table>
      </zj-content>
    </zj-content-block>

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
import entLinkman from "@modules/base/views/entUserManage/entManage/components/entLinkman";
import bankAccount from "@modules/base/views/entUserManage/entManage/components/bankAccount";

export default {
  components: {
    entLinkman,
    bankAccount,
  },
  data() {
    return {
      zjControl: {
        ...this.$api.maintainTransaction,
      },
      detailData: {},
      dictionary: {},
      attachInfo: [
        { type: "营业执照", fileName: "" },
        { type: "法定代表人身份证", fileName: "" },
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
        this.detailData = { ...res.data, ...res.data.entInfo };
        //企业联系人
        this.$refs.entLinkman.$data.detailData = this.detailData;
        //银行账户
        this.$refs.bankAccount.$data.dataList = [this.detailData];
        //企业附件
        this.attachInfo[0].fileId = this.detailData.qyyzFileId;
        this.attachInfo[0].fileName = this.detailData.qyyzAttachName;
        // 法定代表人证件
        this.attachInfo[1].fileId = this.detailData.qyfrzjFileId;
        this.attachInfo[1].fileName = this.detailData.qyfrzjAttachName;
      });
    },
  },
};
</script>
<style lang="less" scoped>
</style>