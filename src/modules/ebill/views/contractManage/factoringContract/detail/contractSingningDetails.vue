<template>
  <div id="productsOpenedApply">
    <h1 class="top_titel">合同签约详情</h1>
    <p></p>
    <el-steps :active="0" align-center>
      <el-step
        title="签约申请"
        description="提交时间：2022.02.02 11:11:12"
      ></el-step>
      <el-step
        title="签约复核"
        description="复核时间：2022.02.02 11:11:11"
      ></el-step>
      <el-step
        title="核心企业债权转让确认"
        description="回执时间：2022.02.02 11:11:11"
      ></el-step>
      <el-step
        title="保理合同签约完成"
        description="签约时间：2022.02.02 11:11:12"
      ></el-step>
    </el-steps>

    <h1 slot="title" class="orderTitle bl">合同信息</h1>

    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <div class="formItem">
        <el-form-item class="formItem" label="待签署合同类型：">
          国内商业保理合同
        </el-form-item>

        <el-form-item class="formItem" label="合同编号：">
          xxxxxxx
        </el-form-item>

        <el-form-item class="formItem" label="合同生成时间：">
          2021.01.01 11:11:22
        </el-form-item>
      </div>
    </el-form>

    <zj-table ref="searchTable" :params="searchForm">
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

    <h1 slot="title" class="orderTitle bl">本次签署合同\协议</h1>

    <zj-table ref="searchTable" :params="searchFormTwo">
      <zj-table-column field="issueEntName" title="序号" />
      <zj-table-column
        field="ebillAmt"
        title="合同/协议编号"
        :formatter="money"
      />
      <zj-table-column
        field="splusAmt"
        title="合同/协议名称"
        :formatter="money"
      />
      <zj-table-column field="issueDate" title="签署类型" :formatter="date" />
      <zj-table-column
        field="receiveDate"
        title="协议相关方"
        :formatter="date"
      />
      <zj-table-column title="操作" fixed="right">
        <template v-slot="{ row }">
          <zj-button
            type="text"
            @click="goChild('entManageDetail', row)"
            :api="zjBtn.getEnterprise"
            >下载</zj-button
          >
        </template>
      </zj-table-column>
    </zj-table>

    <div class="down">
      <el-row class="button-row">
        <el-button class="search" type="primary" @click="reMyFactoring"
          >返回</el-button
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        issueEntName: "",
        expireDateStart: "",
        expireDateEnd: "",
        ebillAmtStart: "",
        ebillAmtEnd: "",
        ebillCode: "",
      },
      searchFormTwo: {
        issueEntName: "",
        expireDateStart: "",
        expireDateEnd: "",
        ebillAmtStart: "",
        ebillAmtEnd: "",
        ebillCode: "",
      },
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    reMyFactoring() {
      this.$router.push("/myFactoringContractSigned");
    },
  },
};
</script>

<style lang="less" scoped>
.top_titel {
  width: 100%;
  height: 27px;
  font-size: 27px;
  text-align: center;
  margin: 30px 0 30px 0;
}

.mid_titel {
  width: 100%;
  height: 27px;
  margin: 30px 0 30px 30px;
  font-size: 24px;
}

.formItem {
  display: flex;
  width: 100%;
  justify-content: space-around;
  font-size: 20px;
}

.el-form-item__label {
  padding-right: -20px;
}

.down {
  margin-left: 750px;
}
</style>