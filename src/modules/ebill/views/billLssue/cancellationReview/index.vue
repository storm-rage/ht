<template>
  <zj-content-container>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="凭证持有人：">
            <el-input v-model="searchForm.issueEntName" />
          </el-form-item>
          <el-form-item label="申请日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>
          <el-form-item label="凭证编号：" class="col-center">
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
        <zj-table-column field="ebillCode" title="凭证编号">
          <template v-slot="{ row }">
            <span class="table-elbill-code" @click="toBillDetails(row)">{{
              row.ebillCode
            }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="issueEntName" title="凭证签发人" />
        <zj-table-column field="issueEntName" title="凭证签发人" />
        <zj-table-column field="ebillAmt" title="凭证金额" :formatter="date" />
        <zj-table-column
          field="issueDate"
          title="凭证签发日期"
          :formatter="date"
        />
        <zj-table-column
          field="issueDate"
          title="凭证到期日期"
          :formatter="date"
        />
        <zj-table-column field="transferAmt" title="开立凭证说明" />
        <zj-table-column
          field="receiveDate"
          title="申请日期"
          :formatter="date"
        />
        <zj-table-column field="expireDate" title="作废原因" />
        <zj-table-column title="操作" fixed="right">
          <template>
            <zj-button
              type="text"
              @click="&quot;&quot;;"
              :api="zjBtn.getEnterprise"
              >复核</zj-button
            >
          </template>
        </zj-table-column>
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
      XYchecked: false,
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
