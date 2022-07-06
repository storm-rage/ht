<template>
  <div>
    <zj-money-block
      img-name="hold-img"
      text="已开出电子债权凭证金额"
      tipsText="统计的是所有已开出未作废的电子债权凭证金额合计"
    />
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
        <el-form-item label="凭证编号：">
          <el-input v-model="searchForm.issueEntName" />
        </el-form-item>
        <el-form-item label="原始持有人：">
          <el-input v-model="searchForm.issueEntName" />
        </el-form-item>
        <el-form-item label="是否开立凭证：" class="col-center">
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
        <el-form-item label="签发日期：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
        </el-form-item>
        <el-form-item label="签收日期：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
        </el-form-item>
        <el-form-item label="到期日期：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
        </el-form-item>
        <el-form-item label="凭证金额：" class="col-center">
          <zj-amount-range
            :startAmt.sync="searchForm.ebillAmtStart"
            :endAmt.sync="searchForm.ebillAmtEnd"
            @keyupEnterNative="enterSearch"
          />
        </el-form-item>
      </el-form>
      <el-row class="button-row">
        <vxe-button
          class="export"
          icon="iconfont icon-daochu"
          @click="exportData"
          >导出数据</vxe-button
        >
      </el-row>
    </div>
    <div class="zj-search-response">
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
        <zj-table-column field="issueEntName" title="产品名称" />
        <zj-table-column field="ebillAmt" title="签发人" />
        <zj-table-column field="ebillAmt" title="原始持有人" />
        <zj-table-column
          field="transferAmt"
          title="凭证金额"
          :formatter="money"
        />
        <zj-table-column field="issueDate" title="签发日期" :formatter="date" />
        <zj-table-column
          field="receiveDate"
          title="签收日期"
          :formatter="date"
        />
        <zj-table-column
          field="expireDate"
          title="到期日期"
          :formatter="date"
        />
        <zj-table-column
          field="state"
          title="凭证状态"
          :formatter="
            (obj) => typeMap(dictionary.enterpriseStateList, obj.cellValue)
          "
        />
        <zj-table-column field="ebillAmt" title="对账单编号" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="&quot;&quot;;"
              :api="zjBtn.getEnterprise"
              >作废申请</zj-button
            >
            <zj-button
              type="text"
              @click="&quot;&quot;;"
              :api="zjBtn.getEnterprise"
              >撤销</zj-button
            >
          </template>
        </zj-table-column>
      </zj-table>
    </div>
  </div>
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
    exportData() {},
    toBillDetails(row) {
      console.log(row);
    },
  },
};
</script>
<style scoped>
.export {
  float: right;
}

</style>
