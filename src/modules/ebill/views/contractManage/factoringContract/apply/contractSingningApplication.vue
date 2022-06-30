<template>
  <div>
    <h1 class="top_titel">合同签约申请</h1>
    <el-steps :active="0" align-center>
      <el-step title="签约申请"></el-step>
      <el-step title="签约复核"></el-step>
      <el-step title="买方签署转让回执"></el-step>
      <el-step title="保理公司签约"></el-step>
      <el-step title="保理合同签约完成"></el-step>
    </el-steps>

    <h1 slot="title" class="orderTitle bl">合同信息</h1>

    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <div class="formItem">
        <el-form-item class="formItem" label="合同签署类型：">
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

    <h1 slot="title" class="orderTitle bl">本次签署合同/协议</h1>

    <zj-table ref="searchTable" :params="searchFormTwo">
      <zj-table-column field="issueEntName" title="序号" />
      <zj-table-column
        field="ebillAmt"
        title="合同/协议编号"
        :formatter="money"
      />
      <zj-table-column
        field="splusAmt"
        title="买方企业名称"
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
        <el-button class="reset" type="primary" @click="dialogVisible = true"
          >提交申请</el-button
        >
        <el-button class="search" type="primary" @click="reApplicationSigning"
          >返回</el-button
        >
      </el-row>
    </div>

    <el-dialog
      title="温馨提示"
      width="30%"
      :before-close="handleClose"
      :visible.sync="dialogVisible"
    >
      <span>是否确认提交申请？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="goFloor">确 定</el-button>
      </span>
    </el-dialog>
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
      dialogVisible: false,
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    reApplicationSigning() {
      this.$router.push("/applicationSigningFactoringContract");
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
          alert(done);
        })
        .catch(() => {});
    },
    goFloor() {
      this.dialogVisible = false;
      this.$router.push("/applicationSigningFactoringContract");
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