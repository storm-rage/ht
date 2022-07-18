<template>
  <zj-content-container>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="申请日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>
          <el-form-item label="申请状态：" class="col-center">
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
          <el-form-item label="申请流水号：" class="col-center">
            <el-input
              v-model="searchForm.ebillCode"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
        </el-form>
      </template>

      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column field="issueEntName" title="申请流水号" />
        <zj-table-column field="ebillAmt" title="申请时间" :formatter="date" />
        <zj-table-column field="transferAmt" title="申请产品" />
        <zj-table-column
          field="state"
          title="申请状态"
          :formatter="
            (obj) => typeMap(dictionary.enterpriseStateList, obj.cellValue)
          "
        />
      </zj-table>
    </zj-list-layout>
  </zj-content-container>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {},
      searchForm: {},
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    toBillDetails(row) {
      console.log(row);
    },
  },
};
</script>
