<template>
  <zj-content-container>
    <zj-top-header>{{
      pageType === "apply" ? "提前还款申请" : "提前还款复核"
    }}</zj-top-header>
    <!-- 融资信息 -->
    <zj-content-block>
      <zj-content>
        <zj-header>融资信息</zj-header>
        <el-form ref="form" label-width="160px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="融资流水号："> 546565465 </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资合同编号："> 546565465 </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资月利率："> 546565465 </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资金额："> 546565465 </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资开始日："> 546565465 </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资到期日："> 546565465 </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="已还款本金："> 546565465 </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="上次还款日期："> 546565465 </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="还款状态：" v-if="pageType === 'apply'">
                546565465
              </el-form-item>
              <el-form-item label="融资业务状态：" v-else>
                546565465
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <h4 class="mt-20 mb-10">还款记录</h4>
            <el-row>
              <el-col :span="8">
                <el-form-item label="还款金额合计："> 546565465 </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="已还款本金合计：">
                  546565465
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="已还款利息合计：">
                  546565465
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-form>

        <zj-table ref="searchTable" :api="zjControl.tableApi">
          <zj-table-column prop="id" title="序号" />
          <zj-table-column field="" title="还款日期" :formatter="date" />
          <zj-table-column field="" title="还款金额" />
          <zj-table-column field="" title="还款本金" />
          <zj-table-column field="" title="还款利息" />
        </zj-table>
      </zj-content>
    </zj-content-block>

    <!-- 提前还款 -->
    <zj-content-block>
      <zj-header>提前还款</zj-header>
      <zj-content>
        <el-row>
          <el-form ref="form" :model="form" label-width="160px">
            <el-col :span="8">
              <el-form-item label="本次还款本金：">
                <span>1</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="还款日期：">
                <el-date-picker
                  v-model="form"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提前还款金额：">
                <el-input v-model="form.issueEntName" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="本次计息天数：">
                <span>5</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="本次还款利息：">
                <span>5</span>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <zj-content>
          <el-row class="mb-10">
            <el-link :underline="false" type="primary">《回购协议》</el-link>
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
      <span style="display: inline-block; margin-right: 10px" v-if="pageType==='review'">
        <el-checkbox v-model="agreeCheck">我已阅读并同意</el-checkbox>&nbsp;
        <el-link :underline="false" type="primary">《回购协议》</el-link>
      </span>
      <zj-button type="primary" @click="toReview" v-if="pageType === 'apply'"
        >提交申请</zj-button
      >
      <template v-if="pageType==='review'">
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
  </zj-content-container>
</template>
<script>
export default {
  data() {
    return {
      pageType: this.$route.meta.pageType,
      zjControl: {},
      form: {},
      agreeCheck: false,
    };
  },
  created() {},
  methods: {
     toReview() {
      if (this.agreeCheck) {
        let title = this.pageType === 'apply'?'提前还款申请确认':'提前还款复核确认'
        this.$confirm(`您本次提前还款${this.pageType === 'apply'?'申请':''}金额：<b style="font-size: 18px;">21424</b>元，请确认。`, title,{
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          // todo:请求
        })
      }else {
        this.$alert('请阅读并同意《额度调整申请书》','提示', {
          type: 'warning'
        })
      }
    },
    toReject() {
      this.$refs.rejectDialog.open();
    },
    reviewReject(text) {
      this.$refs.rejectDialog.close();
    },
    back() {},
  },
};
</script>
<style lang="less" scoped>
.infoItem .el-col {
  margin-bottom: 12px;
}
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