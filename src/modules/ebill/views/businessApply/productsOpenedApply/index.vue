<template>
  <div id="productsOpenedApply">
    <!-- 折叠面板 -->
    <el-collapse ref="elCollapse" v-model="collActive" class="zjcoll-noSelect">
      <!-- 产品开通申请 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle">产品开通申请</h4>
        </template>
        <div class="card-select">
          <div class="card" v-for="(item, index) in 3" :key="index">
            <el-checkbox
              class="card-check zj-p-r-5"
              v-model="checked"
            ></el-checkbox>
            <div class="card-title zj-p-l-10">订单保理</div>
            <div class="card-content zj-p-l-10">订单保理简单介绍</div>
            <div class="card-link zj-p-l-10">了解更多></div>
          </div>
        </div>
      </el-collapse-item>
      <!-- 融单信息 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle">业务联系人</h4>
        </template>
        <el-row>
          <el-form ref="form" :model="form" label-position="top">
            <el-form-item label="联系人：">
              <el-input v-model="form.issueEntName" />
            </el-form-item>
            <el-form-item label="联系号码：">
              <el-input v-model="form.issueEntName" />
            </el-form-item>
            <el-form-item label="联系邮箱：">
              <el-input v-model="form.issueEntName" />
            </el-form-item>
            <el-form-item label="联系地址：">
              <el-input v-model="form.issueEntName" />
            </el-form-item>
          </el-form>
        </el-row>
        <span style="line-height: 50px"
          >注：该联系人为签署商业保理合同业务联系人。
        </span>
      </el-collapse-item>
    </el-collapse>
    <!-- 工作流 -->
    <zj-workflow>
      <el-row slot="right">
        <zj-button @click="&quot;&quot;;" :api="zjBtn.passBillSignBatch"
          >确认申请</zj-button
        >
        <zj-button
          class="back"
          @click="$router.push('/productsOpened')"
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
      form: {},
      collActive: ["orderInfo"],
      checked: false,
    };
  },
  created() {},
  methods: {},
};
</script>
<style lang="less" scoped>
#productsOpenedApply {
  padding: 20px 0;
}

.card-select {
  padding: 30px 10px;
  display: flex;
  justify-content: space-between;
  .card {
    width: 300px;
    height: 140px;
    border: 1px solid #ccc;
    .card-check {
      float: right;
    }
    .card-title {
      font-size: 20px;
      clear: both;
    }
    .card-content {
      line-height: 30px;
    }
    .card-link {
      color: #409eff;
    }
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

.el-form {
  padding-top: 10px;
  .el-form-item {
    width: 33.333333%;
    display: inline-block;
    margin-bottom: 20px;
  }
}
</style>