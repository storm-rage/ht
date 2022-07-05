<template>
  <div class="info">
    <ZjTopHeader>贸易关系详情</ZjTopHeader>

    <div class="infoBox">
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
            <label>签发人：</label>
            <span>1</span>
          </el-col>
          <el-col :span="8">
            <label>供应商：</label>
            <span>2</span>
          </el-col>
          <el-col :span="8">
            <label>凭证到期日：</label>
            <span>3</span>
          </el-col>
          <el-col :span="8">
            <label>凭证金额：</label>
            <span>5</span>
          </el-col>
        </el-row>
      </div>

      <div class="infoBoxItem">
        <ZjHeader>卖方银行信息</ZjHeader>

        <el-row class="infoItem">
          <el-col :span="8">
            <label>凭证金额：</label>
            <span>1</span>
          </el-col>
          <el-col :span="8">
            <label>凭证金额：</label>
            <span>2</span>
          </el-col>
          <el-col :span="8">
            <label>凭证金额：</label>
            <span>3</span>
          </el-col>
          <el-col :span="8">
            <label>凭证金额：</label>
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
}
</style>