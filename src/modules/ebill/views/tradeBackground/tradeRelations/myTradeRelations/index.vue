<template>
  <div>
    <div class="zj-search-condition">
      <el-row class="button-row">
        <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch"
          >重置</vxe-button
        >
        <vxe-button class="search" icon="el-icon-search" @click="search"
          >查询</vxe-button
        >
      </el-row>
      <el-form ref="searchForm" :model="searchForm">
        <el-form-item label="买方企业名称：" class="col-center">
          <el-input v-model="searchForm.ebillCode" />
        </el-form-item>
        <el-form-item label="卖方企业名称：" class="col-center">
          <el-input v-model="searchForm.ebillCode" />
        </el-form-item>
        <el-form-item label="贸易关系状态：" class="col-center">
          <el-select
            v-model="searchForm.isGenerateVoucher"
            placeholder="请选择"
            clearable
            :popper-append-to-body="false"
          >
            <el-option value="" label="全部"></el-option>
            <!-- <el-option
              v-for="item in dictionary.isGenerateVouchers"
              :key="item.code"
              :label="item.desc"
              :value="item.code"
            >
            </el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="zj-search-response">
      <zj-button
        class="zj-m-l-10 mb-10 mt-10"
        type="primary"
        @click="openDialog"
        >新增</zj-button
      >
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.queryList"
      >
        <zj-table-column prop="id" title="买方企业名称" />
        <zj-table-column field="" title="卖方企业名称" />
        <zj-table-column field="" title="卖方银行账号" />
        <zj-table-column field="" title="卖方企业银行账户户名" />
        <zj-table-column field="" title="银行联行号" />
        <zj-table-column field="" title="银行类型" />
        <zj-table-column field="" title="贸易关系状态" />
        <zj-table-column field="" title="协议" />
        <zj-table-column field="" title="证明材料" />
        <zj-table-column field="" title="上次更新时间" :formatter="date" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button type="text" @click="edit(row)">修改</zj-button>
            <zj-button
              type="text"
              @click="&quot;&quot;;"
              :api="zjBtn.getEnterprise"
              >上次材料证明</zj-button
            >
          </template>
        </zj-table-column>
      </zj-table>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      center
      width="50%"
      title="新增贸易关系"
      custom-class="mbi-editDialog"
      @close="cancel"
      top="6vh"
    >
      <el-form
        ref="form"
        class="mbi-form"
        :model="formModel"
        :rules="formRules"
        :class="editFlag ? '' : 'nmb0'"
        label-width="140px"
      >
        <el-form-item
          label="买方企业名称："
          prop="entName"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <span class="static-text">{{ formModel.entName }}</span>
        </el-form-item>
        <el-form-item
          label="卖方企业名称："
          :class="{ 'zj-m-b-5': !editFlag }"
          prop="invoiceTaxpayerId"
        >
          <el-input v-model="formModel.invoiceTaxpayerId" />
        </el-form-item>
        <el-form-item
          label="卖方银行账号："
          prop="invoiceAddress"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <el-input v-model="formModel.invoiceAddress" />
        </el-form-item>
        <el-form-item
          label="卖方银行账号户名："
          prop="invoicePhone"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <el-input v-model="formModel.invoicePhone" />
        </el-form-item>
        <el-form-item
          label="卖方企业开户行："
          prop="invoiceBankInfo"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <el-input v-model="formModel.invoiceBankInfo" />
        </el-form-item>
        <el-form-item
          label="银行联行号："
          prop="invoiceBankAccno"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <el-input v-model="formModel.invoiceBankAccno" />
        </el-form-item>
        <el-form-item
          label="银行类型："
          prop="invoiceEmail"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <!--        <span class="static-text" v-show="!editFlag">{{formModel.invoiceEmail}}</span>-->
          <el-input v-model="formModel.invoiceEmail" />
        </el-form-item>
      </el-form>

      <el-row slot="footer" class="dialog-footer">
        <zj-button status="primary" @click="save">保存</zj-button>
        <zj-button class="back" @click="cancel">取消</zj-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      workflow: "",
      zjControl: {
        queryList: this.$api.billLssue.queryList,
      },
      searchForm: {},
      tableData: [{ id: 1 }],
      formModel: {},
      dialogVisible: false
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    //修改
    edit(row) {},
    openDialog() {
      this.dialogVisible = true
    }
  },
};
</script>
<style lang="less" scoped>
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










</style>
