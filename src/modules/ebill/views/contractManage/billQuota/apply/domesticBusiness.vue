<template>
  <zj-content-container>
    <zj-top-header title="国内商业保理合同详情"></zj-top-header>
    <zj-content-block>
      <zj-header title="合同信息"></zj-header>
      <zj-content>
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

        <zj-table>
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
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="相关协议"></zj-header>
      <zj-content>
        <zj-table>
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
      </zj-content>
    </zj-content-block>
    <zj-content-footer>
      <zj-button class="back" @click="$router.push('/productsOpened')">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
  },
};
</script>
