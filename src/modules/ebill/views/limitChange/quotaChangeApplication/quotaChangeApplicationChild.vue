<template>
  <div>
    <h1 class="top_titel">额度变更申请</h1>

    <h1 slot="title" class="orderTitle bl">合同信息</h1>

    <zj-table :params="searchForm">
      <zj-table-column field="issueEntName" title="合同编号" />
      <zj-table-column field="ebillAmt" title="合同名称" :formatter="money" />
      <zj-table-column
        field="splusAmt"
        title="合同生效日期"
        :formatter="money"
      />
      <zj-table-column
        field="issueDate"
        title="合同失效日期"
        :formatter="date"
      />
      <zj-table-column field="receiveDate" title="合同状态" :formatter="date" />
    </zj-table>

    <h1 slot="title" class="orderTitle bl">额度信息</h1>

    <zj-table :params="searchForm">
      <zj-table-column field="issueEntName" title="买方企业名称" />
      <zj-table-column
        field="ebillAmt"
        title="应收账款转让期限"
        :formatter="money"
      />
      <zj-table-column field="splusAmt" title="授信额度" :formatter="money" />
      <zj-table-column
        field="issueDate"
        title="额度期限（月）"
        :formatter="date"
      />
    </zj-table>

    <h1 slot="title" class="orderTitle bl">协议信息</h1>

    <zj-table :params="searchForm">
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
      <zj-table-column title="操作" fixed="right">
        <template v-slot="{ row }">
          <zj-button
            type="text"
            @click="goChild('entManageDetail', row)"
            :api="zjBtn.getEnterprise"
            >操作</zj-button
          >
        </template>
      </zj-table-column>
    </zj-table>

    <div data-v-611f6be4="" class="down_wrapper"></div>
    <div
      data-v-611f6be4=""
      class="el-form-item required is-validating el-form-item--small"
    >
      <label for="payableAmt" class="el-form-item__label" style="width: 150px"
        >申请增加额度：</label
      >
      <div class="el-form-item__content" style="margin-left: 150px">
        <div data-v-611f6be4="" class="el-input el-input--small">
          <input
            autocomplete="off"
            spellcheck="false"
            placeholder="请输入开单金额"
            class="el-tooltip el-input__inner item"
            aria-describedby="el-tooltip-5860"
            tabindex="0"
          />
          玖仟玖佰玖拾玖元整
        </div>
      </div>
    </div>
    <div
      data-v-611f6be4=""
      class="el-form-item required expireDate el-form-item--small"
    >
      <label for="expireDate" class="el-form-item__label" style="width: 150px"
        >融单到期日：</label
      >
      <div class="el-form-item__content" style="margin-left: 150px">
        <div
          data-v-611f6be4=""
          class="
            el-date-editor
            zj-date-picker
            el-input el-input--small el-input--prefix el-input--suffix
            el-date-editor--date
          "
        >
          <input
            type="text"
            readonly="readonly"
            autocomplete="off"
            name=""
            placeholder="融单到期日"
            class="el-input__inner"
          /><span class="el-input__prefix"
            ><i class="el-input__icon el-icon-date"></i></span
          ><span class="el-input__suffix"
            ><span class="el-input__suffix-inner"
              ><i class="el-input__icon"></i></span
          ></span>
        </div>
        <div>调整后额度：19900.99元</div>

        <div><a>《额度调整申请书》</a></div>

        <div class="down_tip">
          <label data-v-611f6be4="" style="color: gray; margin-left: 16px"
            ><i
              data-v-611f6be4=""
              class="el-icon-info"
              style="color: rgb(233, 153, 45)"
            ></i>
            注：1.调整后额度=原额度+本次申请增加额度。</label
          >
        </div>
      </div>
    </div>

    <div class="down">
      <el-row class="button-row">
        <el-button class="reset" type="primary" @click="dialogVisible = true"
          >提交申请</el-button
        >
        <el-button class="search" type="primary" @click="reTrun"
          >返回</el-button
        >
      </el-row>
    </div>

    <el-dialog
      title="额度调整申请确认"
      width="30%"
      :visible.sync="dialogVisible"
    >
      <div data-v-2cce9ee5="" class="money-block">
        <span data-v-2cce9ee5="" class="text">您本次申请调整额度：</span
        ><span data-v-2cce9ee5="" class="money">411,909,755.60</span
        ><span data-v-2cce9ee5="" class="tips-text">元，请确认。</span>
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
    };
  },
  methods: {
    reTrun() {
      this.$router.push("/quotaChangeApplication");
    },
    reviewApproved() {
      this.dialogVisible == true;
    },
    binGo() {
      this.dialogVisible == false;
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
</style>