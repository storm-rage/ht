<template>
  <div>
    <h1 class="top_titel">国内商业保理合同详情</h1>

    <h1 slot="title" class="orderTitle bl">合同信息</h1>

    <div
      role="tabpanel"
      aria-labelledby="el-collapse-head-2884"
      id="el-collapse-content-2884"
      class="el-collapse-item__wrap"
    >
      <div class="el-collapse-item__content">
        <div class="infoItem kdjycx">
          <div class="el-row">
            <div class="el-col el-col-8">
              <label>合同类型：</label><span>国内商业保理合同</span>
            </div>
            <div class="el-col el-col-8">
              <label>合同编号：</label><span>xxxxxxx</span>
            </div>
            <div class="el-col el-col-8">
              <label>合同有效期间：</label
              ><span> 2022.09.09 至 2023.09.08</span>
            </div>
            <div class="el-col el-col-8">
              <label>合同状态：</label><span>生效</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <zj-table :params="searchForm">
      <zj-table-column field="issueEntName" title="序号" />
      <zj-table-column
        field="ebillAmt"
        title="买方企业名称"
        :formatter="money"
      />
      <zj-table-column
        field="splusAmt"
        title="应收账款转让期限"
        :formatter="money"
      />
      <zj-table-column field="issueDate" title="授信额度" :formatter="date" />
      <zj-table-column
        field="receiveDate"
        title="额度期限（月）"
        :formatter="date"
      />
    </zj-table>

    <h1 slot="title" class="orderTitle bl">相关协议</h1>

    <zj-table :params="searchFormTwo">
      <zj-table-column field="issueEntName" title="序号" />
      <zj-table-column
        field="ebillAmt"
        title="买方企业名称"
        :formatter="money"
      />
      <zj-table-column
        field="splusAmt"
        title="应收账款转让期限"
        :formatter="money"
      />
      <zj-table-column field="issueDate" title="授信额度" :formatter="date" />
      <zj-table-column
        field="receiveDate"
        title="额度期限（月）"
        :formatter="date"
      />
    </zj-table>

    <div class="down">
      <el-row class="button-row">
        <el-button class="search" type="primary" @click="goFather"
          >返回</el-button
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { searchForm: {}, searchFormTwo: {} };
  },
  methods: {
    goFather() {
      this.$router.push("/quotaChangeApplication");
    },
  },
};
</script>

<style scoped>
.top_titel {
  width: 100%;
  height: 27px;
  font-size: 25px;
  text-align: center;
  margin: 30px 0 30px 0;
}

.down {
  margin-left: 750px;
}
</style>