<template>
  <div>
    <zj-list-layout>
      <template slot="searchForm">
      <el-form ref="searchForm" :model="searchForm">
        <el-form-item label="买方企业名称：" class="col-center">
          <el-input v-model="searchForm.ebillCode" />
        </el-form-item>
        <el-form-item label="卖方企业名称：" class="col-center">
          <el-input v-model="searchForm.ebillCode" />
        </el-form-item>
        <el-form-item label="申请日期：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
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
        
        <el-form-item label="买方是否海天集团：" class="col-center">
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
      </template>
    <!-- <div class="zj-search-response"> -->
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.queryList"
      >
        <zj-table-column prop="id" title="买方企业名称" />
        <zj-table-column field="" title="买方是否海天集团" />
        <zj-table-column field="" title="卖方企业名称" />
        <zj-table-column field="" title="卖方银行账号" />
        <zj-table-column field="" title="卖方企业开户行" />
        <zj-table-column field="" title="卖方企业银行账户户名" />
        <zj-table-column field="" title="银行联行号" />
        <zj-table-column field="" title="银行类型" />
        <zj-table-column field="" title="贸易关系状态" />
        <zj-table-column field="" title="协议" />
        <zj-table-column field="" title="证明材料" />
        <zj-table-column field="" title="上次更新时间" :formatter="date" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button type="text" @click="toInfo(row)">详情</zj-button>
            <zj-button type="text" @click="openDialog(row)">冻结</zj-button>
            <zj-button type="text" @click="edit(row)">解冻</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    <!-- </div> -->
    </zj-list-layout>
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      center
      width="550px"
      :title="type == 'disable' ? '冻结确定' : '解冻确定'"
      custom-class="mbi-editDialog"
      @close="cancel"
    >
      <el-form
        ref="form"
        class="mbi-form"
        :model="formModel"
        :rules="formRules"
        label="top"
      >
        <el-form-item
          :label="type == 'disable' ? '请录入冻结原因：':'请录入解冻原因：'"
          prop="cause"
        >
          <el-input type="textarea" v-model="cause"></el-input>
        </el-form-item>
      </el-form>

      <el-row slot="footer" class="dialog-footer">
        <zj-button status="primary" @click="save">确定</zj-button>
        <zj-button class="back" @click="dialogVisible = false">取消</zj-button>
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
      searchForm: {
        expireDateStart: "",
        expireDateEnd: "",
      },
      tableData: [{ id: 1 }],
      formModel: {},
      dialogVisible: false,
      type: "disable",
      // 原因
      cause: "",
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    //解冻
    edit(row) {
      this.type = "relieve";
      this.dialogVisible = true;
    },
    openDialog() {
      this.type = "disable";
      this.dialogVisible = true;
    },
    toInfo(id) {
      this.$router.push("/busiessTradeRelationsInfo");
    },
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
