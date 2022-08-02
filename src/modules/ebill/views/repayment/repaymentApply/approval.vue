<template>
  <zj-content-container>
    <zj-top-header>提前还款申请</zj-top-header>
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
              <el-form-item label="还款状态：">
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

        <zj-table ref="searchTable" :dataList="detailData.financingRepaymentInfoList">
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
          <template slot="pager-left" style="position: absolute; left: 0">
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
              <el-form-item label="还款日期：">
                <zj-date-picker
                  :date.sync="detailData.repaymentDate"
                  :lessNow="true"
                  :format="'yyyy年MM月dd日'"
                />
              </el-form-item>
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
          <el-row class="mb-10">
            <el-link :underline="false" type="primary" @click="toDownload"
              >《应收账款提前回购申请书及回执》</el-link
            >
          </el-row>
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
      <zj-button type="primary" @click="toReview">提交申请</zj-button>
      <zj-button @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
export default {
  data() {
    return {
      zjControl: this.$api.repaymentApply,
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
      let params = {
        id: this.row.id,
        repaymentDate: this.row.repaymentDate,
      };
      this.zjControl.getRepaymentDetail(params).then((res) => {
        this.detailData = res.data;
      });
    },
    toReview() {
      this.$confirm(
        `您本次提前还款申请金额：<b style="font-size: 18px;">${this.detailData.applyAmt}</b>元，请确认。`,
        "提前还款申请确认",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }
      ).then(() => {
        let params = {
          id: this.detailData.id,
          repaymentDate: this.detailData.repaymentDate,
        };
        this.zjControl.repaymentSubmit(params).then((res) => {
          this.$message.success("申请成功！");
          this.$router.push("/preRepaymentApply");
        });
      });
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
    back() {},
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