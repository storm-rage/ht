<template>
  <zj-content-container>
    <zj-top-header>凭证转让申请</zj-top-header>
    <zj-content-block>
      <zj-header>电子债权凭证信息</zj-header>
      <el-form ref="form" label-width="160px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="原始凭证编号：">
              <span>{{ detailData.aaaaaaaaa | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证编号：">
              <span>{{ detailData.aaaaaaaaa | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签发人：">
              <span>{{ detailData.aaaaaaaaa | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="原始持有人：">
              <span>{{ detailData.aaaaaaaaa | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证签发日期：">
              <span>{{ detailData.aaaaaaaaa | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证到期日：">
              <span>{{ detailData.aaaaaaaaa | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签收日期：">
              <span>{{ detailData.aaaaaaaaa | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证金额：">
              <span>{{ detailData.aaaaaaaaa | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label=" 备注：">
              <span>{{ detailData.aaaaaaaaa | value }}</span>
            </el-form-item>
          </el-col>
          <el-button class="zj-f-r zj-m-r-20" type="primary"
            >贸易背景</el-button
          >
        </el-row>
      </el-form>
    </zj-content-block>

    <zj-content-block>
      <zj-header>转让信息</zj-header>
      <zj-button type="primary" class="zj-m-l-20 zj-m-b-10"
        >新增被转让人</zj-button
      >
      <zj-table :dataList="dataList">
        <zj-table-column field="ebillCode" title="被转让人名称" />
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
    </zj-content-block>

    <zj-content-footer>
      <zj-button type="primary" @click="dialogVisible = true"
        >提交申请</zj-button
      >
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>

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
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </zj-content-container>
</template>

<script>
import ZjContentFooter from "@common/components/content/ZjContentFooter.vue";
export default {
  components: { ZjContentFooter },
  data() {
    return {
      searchForm: {},
      detailData: {},
      dataList: [],
      dialogVisible: false
    };
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
</style>