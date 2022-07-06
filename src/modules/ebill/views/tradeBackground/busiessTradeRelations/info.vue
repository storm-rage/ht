<template>
  <div class="info">
    <ZjTopHeader>贸易关系交易详情</ZjTopHeader>

    <div class="infoBox">
      <div class="infoBoxItem">
        <ZjHeader>交易信息</ZjHeader>
        <el-row class="infoItem">
          <el-col :span="8">
            <label>申请流水号：</label>
            <span>1</span>
          </el-col>
          <el-col :span="8">
            <label>申请类型：</label>
            <span>新建贸易关系/修改贸易关系</span>
          </el-col>
          <el-col :span="8">
            <label>申请状态：</label>
            <span>待复核</span>
          </el-col>
        </el-row>
      </div>
      <div class="infoBoxItem">
        <ZjHeader>买方企业信息</ZjHeader>
        <el-row class="infoItem">
          <el-col :span="8">
            <label>买方企业名称：</label>
            <span>1</span>
          </el-col>
          <el-col :span="8">
            <label>是否海天集团：</label>
            <span>2</span>
          </el-col>
          <el-col :span="8">
            <label>客户业务系统编码：</label>
            <span>3</span>
          </el-col>
        </el-row>
      </div>

      <div class="infoBoxItem">
        <ZjHeader>卖方企业信息</ZjHeader>

        <el-row class="infoItem">
          <el-col :span="8">
            <label>卖方企业名称：</label>
            <span>1</span>
          </el-col>
          <el-col :span="8">
            <label>客户业务系统编码：</label>
            <span>2</span>
          </el-col>
          <el-col :span="8">
            <label>客户业务系统编码：</label>
            <span>3</span>
          </el-col>
        </el-row>
      </div>

      <div class="infoBoxItem">
        <ZjHeader>卖方银行信息</ZjHeader>

        <el-row class="infoItem">
          <el-col :span="8">
            <label>银行账号：</label>
            <span>1</span>
          </el-col>
          <el-col :span="8">
            <label>银行账户户名：</label>
            <span>2</span>
          </el-col>
          <el-col :span="8">
            <label>银行账号开户行：</label>
            <span>3</span>
          </el-col>
          <el-col :span="8">
            <label>开户行联行号：</label>
            <span>5</span>
          </el-col>
          <el-col :span="8">
            <label>银行类型：</label>
            <span>5</span>
          </el-col>
        </el-row>
      </div>

      <div class="infoBoxItem">
        <ZjHeader>附件信息</ZjHeader>
        <zj-table
          ref="searchTable"
          :params="searchForm"
          :api="zjControl.tableApi"
        >
          <zj-table-column prop="id" title="序号" />
          <zj-table-column field="" title="附件名称" />
          <zj-table-column field="" title="操作" />
        </zj-table>
      </div>

      <div class="infoBoxItem">
        <ZjHeader>审核意见</ZjHeader>
        <div class="textareaBox">
          <span>{{
            type == "disable" ? "请录入冻结原因：" : "请录入解冻原因："
          }}</span>
          <el-input type="textarea" v-model="cause"></el-input>
        </div>
      </div>

      <div class="infoBoxItem">
        <ZjHeader>操作记录</ZjHeader>
        <zj-table
          ref="searchTable"
          :params="searchForm"
          :api="zjControl.tableApi"
        >
          <zj-table-column prop="id" title="序号" />
          <zj-table-column field="" title="业务节点" />
          <zj-table-column field="" title="处理人" />
          <zj-table-column field="" title="处理时间" />
          <zj-table-column field="" title="审核结果" />
          <zj-table-column field="" title="审核意见" />
        </zj-table>
      </div>
    </div>

    <ZjContentFooter>
      <div class="footerBtnBox">
        <zj-button type="primary">审核通过</zj-button>
        <zj-button>拒绝</zj-button>
        <zj-button>返回</zj-button>
      </div>
    </ZjContentFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {},
      zjControl: {},
      cause: "",
    };
  },
};
</script>

<style lang="less" scoped>
.info {
  .infoBox {
    .infoBoxItem {
      padding: 5px 10px 0;
    }
  }

  /deep/ .fixed-footer-btns button {
    line-height: 1 !important;
  }

  .textareaBox {
    display: flex;
    margin-bottom: 20px;
    /deep/ .el-textarea__inner {
    display: inline-block;
  }
  }

  
}
</style>