<template>
  <div class="voucherTransferApplication">
    <ZjTopHeader>凭证转让申请</ZjTopHeader>
    <ZjHeader>电子债权凭证信息</ZjHeader>

    <zj-table v-if="type == 'add'" :params="searchForm">
      <zj-table-column field="ebillCode" title="原始凭证编号">
      </zj-table-column>
      <zj-table-column field="issueEntName" title="凭证编号" />
      <zj-table-column field="ebillAmt" title="签发人" :formatter="money" />
      <zj-table-column
        field="transferAmt"
        title="原始持有人"
        :formatter="money"
      />
      <zj-table-column field="splusAmt" title="凭证签发日" :formatter="money" />
      <zj-table-column field="issueDate" title="凭证到期日" :formatter="date" />
      <zj-table-column field="receiveDate" title="转让企业" :formatter="date" />
      <zj-table-column field="expireDate" title="凭证金额" :formatter="date" />
      <zj-table-column
        field="expireDate"
        title="凭证签收日"
        :formatter="date"
      />
      <zj-table-column
        field="state"
        title="凭证状态"
        :formatter="
          (obj) => typeMap(dictionary.enterpriseStateList, obj.cellValue)
        "
      />
      <zj-table-column title="操作" fixed="right">
        <template v-slot="{ row }">
          <zj-button
            type="text"
            @click="goChild('entManageDetail', row)"
            :api="zjBtn.getEnterprise"
            >贸易背景</zj-button
          >
        </template>
      </zj-table-column>
    </zj-table>

    <!-- 单独一条时 -->
    <div class="aloneInfo" v-else>
      <el-row class="infoItem">
        <el-col :span="8">
          <label>原始凭证编号： </label>
          <span>1</span>
        </el-col>
        <el-col :span="8">
          <label>凭证编号： </label>
          <span>2</span>
        </el-col>
        <el-col :span="8">
          <label>签发人：</label>
          <span>3</span>
        </el-col>
        <el-col :span="8">
          <label>原始持有人： </label>
          <span>1</span>
        </el-col>
        <el-col :span="8">
          <label>凭证签发日期： </label>
          <span>2</span>
        </el-col>
        <el-col :span="8">
          <label>凭证到期日：</label>
          <span>3</span>
        </el-col>
        <el-col :span="8">
          <label>签收日期：</label>
          <span>3</span>
        </el-col>
        <el-col :span="8">
          <label>凭证金额：</label>
          <span>￥1,223,111.00</span>
        </el-col>
        <el-col :span="8">
          <label>备注：</label>
          <span>3</span>
        </el-col>
      </el-row>

      <div class="btns flexRight">
        <el-button type="primary">贸易背景</el-button>
      </div>
    </div>

    <ZjHeader>转让信息</ZjHeader>

    <el-form v-if="type == 'add'" ref="searchForm" :model="searchForm" label-width="150px">
      <el-form-item label="被转让人名称：">
        <el-select v-model="contractType">
          <el-option value="1" />
          <el-option value="2" />
          <el-option value="3" />
        </el-select>
      </el-form-item>

      <el-form-item label="转让金额：">
        <el-input
          v-model="searchForm.issueEntName"
          @keyup.enter.native="enterSearch"
        />
      </el-form-item>

      <el-form-item label="收款账号：">
        <el-input
          v-model="searchForm.issueEntName"
          @keyup.enter.native="enterSearch"
        />
      </el-form-item>

      <el-form-item label="收款账户户名：">
        <el-input
          v-model="searchForm.issueEntName"
          @keyup.enter.native="enterSearch"
        />
      </el-form-item>

      <el-form-item label="收款银行联行号：">
        <el-input
          v-model="searchForm.issueEntName"
          @keyup.enter.native="enterSearch"
        />
      </el-form-item>

      <el-form-item label="收款账户开户行：">
        <el-input
          v-model="searchForm.issueEntName"
          @keyup.enter.native="enterSearch"
        />
      </el-form-item>

      <el-form-item label="备注：">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="textarea"
        >
        </el-input>
      </el-form-item>
    </el-form>

    <p v-if="type == 'add'"><a href="#">《xxx协议》</a></p>

    <!-- 单独一条时 -->
    <div class="aloneAssign" v-if="type == 'update'">
      <div class="btns">
        <el-button type="primary">新增被转让人</el-button>
      </div>

      <zj-table :params="searchForm">
        <zj-table-column field="ebillCode" title="被转让人名称">
        </zj-table-column>
        <zj-table-column field="ebillAmt" title="转让金额" :formatter="money" />
        <zj-table-column field="issueEntName" title="收款账号" />
        <zj-table-column field="issueEntName" title="收款银行账户名称" />
        <zj-table-column field="issueEntName" title="收款银行联行号" />
        <zj-table-column field="issueEntName" title="收款账户开户行" />
        <zj-table-column field="issueEntName" title="备注" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="goChild('entManageDetail', row)"
              :api="zjBtn.getEnterprise"
              >贸易背景</zj-button
            >
            <zj-button
              type="text"
              @click="goChild('entManageDetail', row)"
              :api="zjBtn.getEnterprise"
              >修改</zj-button
            >
            <zj-button
              type="text"
              @click="goChild('entManageDetail', row)"
              :api="zjBtn.getEnterprise"
              >删除</zj-button
            >
          </template>
        </zj-table-column>
      </zj-table>
    </div>

    <!-- <div class="down">
      <el-row class="button-row">
        <el-button class="reset" type="primary" @click="dialogVisible = true"
          >转让申请</el-button
        >
        <el-button class="search" type="primary" @click="reTrun"
          >返回</el-button
        >
      </el-row>
    </div> -->
    <ZjContentFooter>
      <zj-button type="primary" @click="dialogVisible = true"
        >转让申请</zj-button
      >
      <zj-button @click="reTrun">返回</zj-button>
    </ZjContentFooter>

    <el-dialog
      title="额度调整申请确认"
      width="30%"
      :visible.sync="dialogVisible"
    >
      <div class="money-block">
        <p class="text">您本次申请转让40笔电子债权凭证，共计：</p>
        <p class="money">1,232,231.00元，</p>
        <p class="tips-text">请确认。</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="binGo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {},
      formInline: {
        user: "",
        region: "",
      },
      dialogVisible: false,
      textarea: "",
      applicationStatus: "待复核",
      contractType: "1",
      type: 'add'
    };
  },
  methods: {
    reTrun() {
      this.$router.push("/tansferApp");
    },
    reviewApproved() {
      this.dialogVisible == true;
    },
    binGo() {
      this.dialogVisible == false;
      this.$router.push("/tansferApp");
    },
  },
};
</script>

<style lang="less" scoped>
.voucherTransferApplication {
  padding: 5px 10px 0;
}
.top_titel {
  width: 100%;
  height: 27px;
  font-size: 25px;
  text-align: center;
  margin: 30px 0 30px 0;
}

.demo-form-inline {
  margin: 0 0 0 40px;
}

.down_tip {
  margin: 10px 0 0 -125px;
}

a:active {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
}

.down {
  margin-left: 750px;
}

.el-textarea {
  width: 220px;
}

.el-form-item.el-form-item--small {
  width: 33.3%;
  display: inline-block;
}

.aloneInfo {
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 10px;
  .infoItem {
  }
  .flexRight {
    display: flex;
    justify-content: flex-end;
  }
}
.aloneAssign {
}
</style>