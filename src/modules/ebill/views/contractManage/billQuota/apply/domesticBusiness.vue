<template>
  <zj-content-container>
    <zj-top-header title="国内商业保理合同详情"></zj-top-header>
    <zj-content-block>
      <zj-header title="合同信息"></zj-header>
      <zj-content>
        <el-form label-width="120px" ref="form" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同类型：">
                <span>国内商业保理合同</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同编号：">
                <span>xxxxxxx</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同有效期间：">
                <span>2022.09.09 至 2023.09.08</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="合同状态：">
              <span>生效</span>
            </el-form-item>
          </el-row>
        </el-form>
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
