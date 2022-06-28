<template>
  <div>
    <el-row class="ta-c mb-20 mt-20">
      <label class="jc20">提前还款申请</label>
    </el-row>
    <!-- 折叠面板 -->
    <el-collapse ref="elCollapse" v-model="collActive" class="zjcoll-noSelect">
      <!-- 融资信息 -->
      <el-collapse-item class="mb-20" name="orderInfo" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle">融资信息</h4>
        </template>
        <el-row class="infoItem zj-p-l-30">
          <el-col :span="8">
            <label>融资流水号：</label>
            <span>1</span>
          </el-col>
          <el-col :span="8">
            <label>融资合同编号：</label>
            <span>2</span>
          </el-col>
          <el-col :span="8">
            <label>融资月利率：</label>
            <span>3</span>
          </el-col>
          <el-col :span="8">
            <label>融资金额：</label>
            <span>5</span>
          </el-col>
          <el-col :span="8">
            <label>融资开始日：</label>
            <span>5</span>
          </el-col>
          <el-col :span="8">
            <label>融资到期日：</label>
            <span>5</span>
          </el-col>
          <el-col :span="8">
            <label>已还款本金：</label>
            <span>5</span>
          </el-col>
          <el-col :span="8">
            <label>上次还款日期：</label>
            <span>5</span>
          </el-col>
          <el-col :span="8">
            <label>还款状态：</label>
            <span>5</span>
          </el-col>
        </el-row>
        <el-row>
          <h4 class="mt-20 mb-10">还款记录</h4>
          <el-row class="infoItem">
            <el-col :span="8">
              <label>还款金额合计：</label>
              <span>1</span>
            </el-col>
            <el-col :span="8">
              <label>已还款本金合计：</label>
              <span>2</span>
            </el-col>
            <el-col :span="8">
              <label>已还款利息合计：</label>
              <span>3</span>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <zj-table ref="searchTable" :api="zjControl.tableApi">
            <zj-table-column prop="id" title="序号" />
            <zj-table-column field="" title="还款日期" :formatter="date" />
            <zj-table-column field="" title="还款金额" />
            <zj-table-column field="" title="还款本金" />
            <zj-table-column field="" title="还款利息" />
          </zj-table>
        </el-row>
      </el-collapse-item>

      <!-- 提前还款 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle">提前还款</h4>
        </template>
        <el-row class="zj-p-l-30">
          <el-form ref="form" :model="form">
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
        <el-row>
          <p>
            <span>注：</span
            >1.提前还款须一次性还清未还本息，提前还款金额=未还本金+未还本金*融资月利率/30*融资天数。
          </p>
          <p class="zj-m-l-25">
            2.提前还款申请前，请先和保理公司业务人员沟通。
          </p>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <!-- 工作流 -->
    <el-row class="ta-c w85 fixed-footer-btns">
      <el-row class="ta-c w85 zj-m-b-5">
        <el-checkbox v-model="protocolCheck" class="check-text"
          >已阅读并同意协议</el-checkbox
        >
      </el-row>
      <div>
        <zj-button @click="&quot;&quot;;" :api="zjBtn.passRecheck"
          >提交申请</zj-button
        >
        <zj-button
          class="back"
          @click="$router.push('/issuanceReview')"
          :api="zjBtn.passBillSignBatch"
          >返回</zj-button
        >
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {},
      form: {},
      collActive: ["orderInfo"],
      protocolCheck: false,
    };
  },
  created() {},
  methods: {},
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