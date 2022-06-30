<template>
  <div>
    <h1 class="top_titel">合同签约复核</h1>
    <el-steps :active="0" align-center>
      <el-step
        title="签约申请"
        description="提交时间：2022.02.02 11:11:12"
      ></el-step>
      <el-step title="签约复核"></el-step>
      <el-step title="核心企业签署转让回执"></el-step>
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
      <el-checkbox v-model="agreementChecked"
        >已阅读并同意以上相关协议</el-checkbox
      >
      <br />
      <el-row class="button-row">
        <el-button class="reset" type="primary" @click="reviewApproved"
          >复核通过</el-button
        >
        <el-button class="search" type="primary" @click="refuse"
          >拒绝</el-button
        >
        <el-button class="search" type="primary" @click="reTrun"
          >返回</el-button
        >
      </el-row>
    </div>

    <el-dialog title="温馨提示" :visible.sync="outerVisible" width="22%">
      <el-dialog
        width="22%"
        title="云证书验证"
        :visible.sync="innerVisible"
        append-to-body
        center
      >
        <div class="innerTitle">已发送验证码至您的手机号！</div>
        <div>
          验证码：<el-input v-model="innerInput" size="small"></el-input>
          <el-button type="primary">发送验证码</el-button>
        </div>
        <el-button type="primary" @click="goFuHe" class="innerBtn"
          >提交</el-button
        >
      </el-dialog>
      <span>是否确认复核通过？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="复核拒绝"
      :visible.sync="dialogVisibleTwo"
      width="22%"
      :before-close="handleClose"
    >
      <div class="refuseInnerTop">
        拒绝后，合同签约失败，若需要再次签约合同，请联系保理公司业务人员。
      </div>
      <div>
        请输入拒绝原因：<el-input type="textarea" :rows="2" v-model="textarea">
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleTwo = false">取 消</el-button>
        <el-button type="primary" @click="refuseInnerYes">确 定</el-button>
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
      agreementChecked: false, // 阅读同意协议
      outerVisible: false,
      innerVisible: false,
      innerInput: "",
      dialogVisibleTwo: false,
      textarea: "",
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    reviewApproved() {
      this.outerVisible = true;
    },
    refuse() {
      this.dialogVisibleTwo = true;
    },
    reTrun() {
      this.$router.push("/reviewFactoringContractSigning");
    },
    goFuHe() {
      if (this.innerInput.length != 0) {
        this.$router.push("/reviewFactoringContractSigning");
        this.outerVisible = false;
        this.innerVisible = false;
      }
    },
    refuseInnerYes() {
      if (this.textarea.length != 0) {
        this.$router.push("/reviewFactoringContractSigning");
        this.dialogVisibleTwo = false;
      }
    },
    handleClose(done) {
      done();
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

.innerBtn {
  margin: 15px 0 0 160px;
}

.innerTitle {
  margin: -25px 0 10px 0;
}

.refuseInnerTop {
  margin-top: -35px;
}
</style>