<template>
  <zj-content-container>
    <zj-top-header>凭证转让申请</zj-top-header>
    <zj-content-block>
      <zj-header>电子债权凭证信息</zj-header>
      <zj-table>
        <zj-table-column field="ebillCode" title="原始凭证编号">
        </zj-table-column>
        <zj-table-column field="issueEntName" title="凭证编号" />
        <zj-table-column field="ebillAmt" title="签发人" :formatter="money" />
        <zj-table-column
          field="transferAmt"
          title="原始持有人"
          :formatter="money"
        />
        <zj-table-column
          field="splusAmt"
          title="凭证签发日"
          :formatter="money"
        />
        <zj-table-column
          field="issueDate"
          title="凭证到期日"
          :formatter="date"
        />
        <zj-table-column
          field="receiveDate"
          title="转让企业"
          :formatter="date"
        />
        <zj-table-column
          field="expireDate"
          title="凭证金额"
          :formatter="date"
        />
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
    </zj-content-block>

    <zj-content-block>
      <zj-header>转让信息</zj-header>
      <el-form :model="searchForm" label-width="150px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="被转让人名称：">
              <el-select v-model="form.contractType">
                <el-option
                  v-for="item in dictionary.roleId"
                  :key="item.code"
                  :label="item.desc"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="转让金额：">
              <el-input
                v-model="form.issueEntName"
                @keyup.enter.native="enterSearch"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款账号：">
              <el-input
                v-model="form.issueEntName"
                @keyup.enter.native="enterSearch"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款账户户名：">
              <el-input
                v-model="form.issueEntName"
                @keyup.enter.native="enterSearch"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款银行联行号：">
              <el-input
                v-model="form.issueEntName"
                @keyup.enter.native="enterSearch"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款账户开户行：">
              <el-input
                v-model="form.issueEntName"
                @keyup.enter.native="enterSearch"
              />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="备注：">
              <el-input
                type="textarea"
                rows="3"
                placeholder="请输入内容"
                v-model="form.textarea"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </zj-content-block>

    <p><a href="#">《xxx协议》</a></p>

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
        <el-button type="primary" @click="binGo">确 定</el-button>
      </span>
    </el-dialog>
  </zj-content-container>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      detailData: {},
      dataList: [],
      dialogVisible: false,
      dictionary: {},
    };
  },
  methods: {
    // 获取字典
    queryEntDictionary() {
      this.zjControl.queryEntDictionary().then((res) => {
        this.dictionary = res.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>