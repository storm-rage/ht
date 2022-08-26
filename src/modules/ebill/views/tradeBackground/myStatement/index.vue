<template>
  <zj-content-container>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="对账单编号：">
            <el-input v-model="searchForm.acctBillCode" />
          </el-form-item>
          <el-form-item label="买方名称：" class="col-right">
            <el-input v-model="searchForm.companyName" />
          </el-form-item>

          <el-form-item label="对账单状态：" class="col-center">
            <el-select v-model="searchForm.checkBillStatus">
              <el-option v-for="item in dictionary.checkBillStatus" :key="item.code" :label="item.desc" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="对账单日期：">
            <zj-date-range-picker :startDate.sync="searchForm.earliestInputOrPassDate" :endDate.sync="searchForm.latestInputOrPassDate" />
          </el-form-item>

          <el-form-item label="是否申请开立债权凭证：">
            <el-select v-model="searchForm.isApplyVoucher">
              <el-option v-for="item in dictionary.isApplyVoucher" :key="item.code" :label="item.desc" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <zj-table ref="searchTable" :params="searchForm" :api="zjControl.tableApi" @checkbox-change="tableCheckChange" @checkbox-all="tableCheckChange" :checkbox-config="{
          checkMethod: canBeSelect,
        }">
        <zj-table-column type="checkbox" width="40px" fixed="left"></zj-table-column>
        <zj-table-column field="ebillCode" title="对账单编号">
          <template v-slot="{ row }">
            <span class="table-elbill-code" @click="goChild('queryAccountBillDetail', row)">{{ row.acctBillCode }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="companyName" title="买方名称" />
        <zj-table-column field="supplierName" title="供应商名称" />
        <zj-table-column field="checkBillDate" title="对账日期" :formatter="date" />
        <zj-table-column title="入库日期/放行日期">
          <template v-slot="{row}">
            {{date(row.earliestInputOrPassDate)}}{{row.latestInputOrPassDate?`~${date(row.latestInputOrPassDate)}`:''}}
          </template>
        </zj-table-column>
        <zj-table-column field="checkBillAmt" title="对账单金额" :formatter="money" />
        <zj-table-column field="isApplyVoucher" title="是否申请开立债权凭证" :formatter="
            (obj) => typeMap(dictionary.isApplyVoucher, obj.cellValue)
          " />
        <zj-table-column field="checkBillStatus" title="对账单状态" :formatter="
            (obj) => typeMap(dictionary.checkBillStatus, obj.cellValue)
          " />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button type="text" @click="applyOpenVoucherBatch([row.id])" :api="zjBtn.getEnterprise" v-if="row.isApplyVoucher === '0'">申请开立凭证</zj-button>
            <span v-else>--</span>
          </template>
        </zj-table-column>
      </zj-table>

      <!-- 工作流 -->
      <zj-content-footer>
        <zj-button type="primary" @click="applyOpenVoucherBatch(ids)" :api="zjBtn.passBillSignBatch">申请开立凭证</zj-button>
      </zj-content-footer>
    </zj-list-layout>
  </zj-content-container>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {
        ...this.$api.myAccountBill,
      },
      searchForm: {},
      dictionary: {},
      ids: [],
    };
  },
  created() {
    this.getApi();
    this.getDirectory();
  },
  methods: {
    // 获取字典
    getDirectory() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data;
      });
    },
    //开立凭证
    applyOpenVoucherBatch(ids) {
      this.$confirm("选择对账单是否申请开立债权凭证？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = { ids: ids };
        this.zjControl.applyOpenVoucherBatch(params).then((res) => {
          this.$message.success("申请成功!");
          this.search();
        });
      });
    },
    // 获取选中账单id
    tableCheckChange({ records }) {
      console.log(records);
      this.ids = [];
      records.forEach((item) => {
        this.ids.push(item.id);
      });
      console.log(this.ids);
    },
    canBeSelect({ row }) {
      return row.isApplyVoucher === '0';
    },
  },
};
</script>

<style lang="less" scoped>
</style>
