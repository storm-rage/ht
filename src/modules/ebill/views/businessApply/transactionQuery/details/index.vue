<template>
  <div>
    <el-row class="ta-c mt-20 mb-20">
      <label class="jc20">产品开通申请</label>
    </el-row>
    <!-- 折叠面板 -->
    <el-collapse ref="elCollapse" v-model="collActive" class="zjcoll-noSelect">
      <!-- 交易信息 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle">交易信息</h4>
        </template>
        <el-row class="infoItem rzjycx zj-p-l-30">
          <el-col :span="8">
            <label>申请流水号：</label>
            <span>1</span>
          </el-col>
          <el-col :span="8">
            <label>业务类型：</label>
            <span>2</span>
          </el-col>
          <el-col :span="8">
            <label>申请时间：</label>
            <span>3</span>
          </el-col>
          <el-col :span="8">
            <label>申请状态：</label>
            <span>4</span>
          </el-col>
          <el-col :span="8">
            <label>拒绝原因：</label>
            <span>5</span>
          </el-col>
        </el-row>
      </el-collapse-item>
      <!-- 企业基础信息 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle">企业基础信息</h4>
        </template>
        <div>
          <h4 class="orderTitle">企业信息</h4>
          <el-row class="infoItem rzjycx zj-p-l-30">
            <el-col :span="8">
              <label>企业名称：</label>
              <span>1</span>
            </el-col>
            <el-col :span="8">
              <label>平台客户类型：</label>
              <span>2</span>
            </el-col>
            <el-col :span="8">
              <label>企业简称：</label>
              <span>3</span>
            </el-col>
            <el-col :span="8">
              <label>曾用名：</label>
              <span>4</span>
            </el-col>
            <el-col :span="8">
              <label>客户业务系统编码：</label>
              <span>5</span>
            </el-col>
            <el-col :span="8">
              <label>统一社会信用代码：</label>
              <span>5</span>
            </el-col>
            <el-col :span="8">
              <label>纳税人识别码：</label>
              <span>5</span>
            </el-col>
            <el-col :span="8">
              <label>成立日期：</label>
              <span>5</span>
            </el-col>
            <el-col :span="8">
              <label>注册资本：</label>
              <span>5</span>
            </el-col>
            <el-col :span="8">
              <label>企业工商有效码：</label>
              <span>5</span>
            </el-col>
            <el-col :span="8">
              <label>成立日期：</label>
              <span>5</span>
            </el-col>
            <el-col :span="8">
              <label>注册资本：</label>
              <span>5</span>
            </el-col>
            <el-col :span="8">
              <label>企业工商有效期：</label>
              <span>5</span>
            </el-col>
            <el-col :span="8">
              <label>企业规模：</label>
              <span>5</span>
            </el-col>
            <el-col :span="8">
              <label>企业经营类型：</label>
              <span>5</span>
            </el-col>
            <el-col :span="8">
              <label>营业执照注册地址：</label>
              <span>5</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <h4 class="orderTitle">企业联系人</h4>
          <el-row class="infoItem rzjycx zj-p-l-30">
            <el-col :span="8">
              <label>企业联系人姓名：</label>
              <span>1</span>
            </el-col>
            <el-col :span="8">
              <label>企业联系人手机号：</label>
              <span>2</span>
            </el-col>
            <el-col :span="8">
              <label>企业联系人地址：</label>
              <span>3</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <h4 class="orderTitle">法人信息</h4>
          <el-row class="infoItem rzjycx zj-p-l-30">
            <el-col :span="8">
              <label>法定代表人姓名：</label>
              <span>1</span>
            </el-col>
            <el-col :span="8">
              <label>法定代表手机号：</label>
              <span>2</span>
            </el-col>
            <el-col :span="8">
              <label>法定代表人身份证号：</label>
              <span>3</span>
            </el-col>
            <el-col :span="8">
              <label>法人身份证有效期：</label>
              <span>3</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <h4 class="orderTitle">银行账户信息</h4>
          <zj-table
            ref="searchTable"
            :params="searchForm"
            :api="zjControl.tableApi"
          >
            <zj-table-column field="issueEntName" title="银行账户名称" />
            <zj-table-column field="issueEntName" title="银行账号" />
            <zj-table-column field="issueEntName" title="银行账户开户行" />
            <zj-table-column
              field="transferAmt"
              title="银行联行号"
              :formatter="money"
            />
            <zj-table-column field="issueEntName" title="银行类型" />
          </zj-table>
        </div>
      </el-collapse-item>

      <!-- 企业附件 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle mb-10">企业附件</h4>
        </template>
        <zj-table
          ref="searchTable"
          :params="searchForm"
          :api="zjControl.tableApi"
        >
          <zj-table-column field="issueEntName" title="序号" />
          <zj-table-column field="issueEntName" title="附件类型" />
          <zj-table-column
            field="transferAmt"
            title="附件名称"
            :formatter="money"
          />
        </zj-table>
      </el-collapse-item>
    </el-collapse>
    <!-- 工作流 -->
    <zj-workflow>
      <el-row slot="right">
        <zj-button
          class="back"
          @click="$router.push('/transactionQuery')"
          :api="zjBtn.passBillSignBatch"
          >返回</zj-button
        >
      </el-row>
    </zj-workflow>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {},
      searchForm: {},
      collActive: ["orderInfo"],
      checked: false,
    };
  },
  created() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.infoItem {
  label {
    width: 120px;
    text-align: right;
    color: #999999;
  }
  span {
    width: calc(100% - 120px);
    color: #333333;
  }
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