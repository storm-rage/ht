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
        <el-form-item label="供应商：">
          <el-input v-model="searchForm.issueEntName" />
        </el-form-item>
        <el-form-item label="对账单编号：">
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
    </div>
    <div class="zj-search-response">
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column fixed="left" type="checkbox" />
        <zj-table-column field="ebillCode" title="凭证编号">
          <template v-slot="{ row }">
            <span class="table-elbill-code" @click="toBillDetails(row)">{{
              row.ebillCode
            }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="issueEntName" title="凭证签发人" />
        <zj-table-column field="transferAmt" title="供应商" />
        <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money" />
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
        <zj-table-column field="expireDate" title="对账单编号" />
        <zj-table-column title="操作" fixed="right">
          <template>
            <zj-button
              type="text"
              @click="&quot;&quot;;"
              :api="zjBtn.getEnterprise"
              >开单确认书</zj-button
            >
          </template>
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
    </div>
    <el-row class="ta-c w85 fixed-footer-btns">
      <el-row class="ta-c w85 zj-m-b-5">
        <el-checkbox v-model="XYchecked" class="check-text"
          >已阅读并同意协议</el-checkbox
        >
      </el-row>
      <div>
        <zj-button @click="&quot;&quot;;" :api="zjBtn.passRecheck"
          >复核通过</zj-button
        >
        <zj-button
          class="btn-warning"
          @click="&quot;&quot;;"
          :api="zjBtn.rejectRecheck"
          >拒绝</zj-button
        >
      </div>
    </el-row>
  </div>
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
