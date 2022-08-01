<template>
  <zj-content-container>
    <zj-top-header>提前还款复核</zj-top-header>
    <!-- 融资信息 -->
    <zj-content-block>
      <zj-content>
        <zj-header>融资信息</zj-header>
        <el-form ref="form" label-width="160px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="融资流水号：">
                {{ detailData.serialNo | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资合同编号：">
                {{ detailData.serialNo | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资月利率：">
                {{ detailData.interestRate | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资金额：">
                {{ detailData.tranAmt | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资开始日：">
                {{ detailData.applyDatetime | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资到期日：">
                {{ detailData.expireDate | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="已还款本金：">
                {{ detailData.repaymentPrincipalAmt | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="上次还款日期：">
                {{ detailData.lastRepayDate | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资业务状态：">
                {{
                  typeMap(dictionary.preRepaymentFlag, detailData.repaymentFlag)
                }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <h4 class="mt-20 mb-10">还款记录</h4>
          </el-row>
        </el-form>

        <zj-table
          ref="searchTable"
          :dataList="detailData.financingRepaymentInfoList"
        >
          <zj-table-column type="seq" title="序号" />
          <zj-table-column
            field="repaymentDate"
            title="还款日期"
            :formatter="date"
          />
          <zj-table-column
            field="repaymentAmt"
            title="还款金额"
            :formatter="money"
          />
          <zj-table-column
            field="preRepaymentPrincipalAmt"
            title="还款本金"
            :formatter="money"
          />
          <zj-table-column
            field="repaymentInterestAmt"
            title="还款利息"
            :formatter="money"
          />
          <template slot="pager-left">
            <el-row>
              <el-col :span="8">
                <el-form-item label="还款金额合计：">
                  {{ detailData.repaymentAmtTotal | value }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="已还款本金合计：">
                  {{ detailData.repaymentPrincipalAmtTotal | value }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="已还款利息合计：">
                  {{ detailData.repaymentInterestAmtTotal | value }}
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </zj-table>
      </zj-content>
    </zj-content-block>

    <!-- 提前还款 -->
    <zj-content-block>
      <zj-header>提前还款</zj-header>
      <zj-content>
        <el-form ref="form" :model="form" label-width="160px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="本次还款本金：">
                {{ detailData.preRepaymentPrincipalAmt | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <zj-date-picker
                :date.sync="detailData.repaymentDate"
                :lessNow="true"
                :format="'yyyy年MM月dd日'"
                disabled
              />
            </el-col>
            <el-col :span="8">
              <el-form-item label="提前还款金额：">
                {{ detailData.applyAmt | value }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="本次计息天数：">
                {{ detailData.repaymentInterestDays | value }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="本次还款利息：">
                {{ detailData.repaymentInterestAmt | value }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <zj-content>
          <zj-content-tip
            text="1.提前还款须一次性还清未还本息，提前还款金额=未还本金+未还本金*融资月利率/30*融资天数。"
          ></zj-content-tip>
          <br />
          <zj-content-tip
            text=" 2.提前还款申请前，请先和保理公司业务人员沟通。"
          ></zj-content-tip>
        </zj-content>
      </zj-content>
    </zj-content-block>

    <zj-content-footer>
      <span style="display: inline-block; margin-right: 10px">
        <el-checkbox v-model="agreeCheck">我已阅读并同意</el-checkbox>&nbsp;
        <el-link :underline="false" type="primary"
          >《应收账款提前回购申请书及回执》</el-link
        >
      </span>
      <zj-button type="primary" @click="toReview" v-if="pageType === 'apply'"
        >提交申请</zj-button
      >
      <template>
        <zj-button type="primary" @click="toReview">复核通过</zj-button>
        <zj-button @click="toReject">拒绝</zj-button>
      </template>
      <zj-button @click="back">返回</zj-button>
    </zj-content-footer>
    <!--  拒绝弹框  -->
    <zj-reject-dialog
      ref="rejectDialog"
      @reject="reviewReject"
      title="提前还款复核拒绝"
      label="拒绝原因"
      message="请输入拒绝原因"
      :max="100"
    ></zj-reject-dialog>
    <!-- 云证书签章 -->
    <zj-certuficate ref="certuficate" @confirm="confirm" />
  </zj-content-container>
</template>
<script>
export default {
  data() {
    return {
      zjControl: this.$api.repaymentReview,
      form: {},
      agreeCheck: false,
      detailData: {},
      dictionary: {},
    };
  },
  created() {
    this.getRow();
    this.getDirectory();
    this.getRepaymentDetail();
  },
  methods: {
    // 获取字典
    getDirectory() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data;
      });
    },
    // 获取详情
    getRepaymentDetail() {
      this.zjControl.getRepaymentDetail({ id: this.row.id }).then((res) => {
        this.detailData = res.data;
      });
    },
    toReview() {
      if (this.agreeCheck) {
        this.$confirm(
          `您本次提前还款金额：<b style="font-size: 18px;">${this.detailData.applyAmt}</b>元，请确认。`,
          "提前还款复核确认",
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          }
        ).then(() => {
          this.$refs.certuficate.open(); //打开云证书
        });
      } else {
        this.$alert("请阅读并同意《应收账款提前回购申请书及回执》", "提示", {
          type: "warning",
        });
      }
    },
    //云证书确认事件
    confirm() {
      let params = {
        id: this.row.id,
        submitFlag: "1",
      };
      this.zjControl.repaymentSubmit(params).then(() => {
        this.$message.success("复核通过！");
        this.goParent();
      });
    },
    toReject() {
      this.$refs.rejectDialog.open();
    },
    reviewReject(text) {
      let params = {
        id: this.row.id,
        submitFlag: "0",
      };
      this.zjControl.repaymentSubmit(params).then(() => {
        this.$message.success("复核通过！");
        this.goParent();
      });
      this.$refs.rejectDialog.close();
    },
    // 下载协议
    toDownload() {
      let params = {
        id: this.row.id,
        repaymentDate: this.row.repaymentDate,
        templateType: this.row.templateType,
      };
      this.zjControl.downloadRepaymentApply(params);
    },
    back() {
      this.$router.push("/preRepaymentReview");
    },
  },
};
</script>
<style lang="less" scoped>
/deep/#ZjWorkflow {
  .workflow-top {
    .el-row {
      padding: 5px 0 0;
      text-align: center;
    }
  }
  .workflow-bottom {
    .right {
      width: 100%;
      text-align: center;
    }
  }
}
</style>