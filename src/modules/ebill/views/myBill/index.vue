<template>
  <div>
    <zj-money-block
      img-name="hold-img"
      text="正常持有的电子债权凭证金额"
      tipsText="统计的是所有正常持有的电子债权凭证金额合计"
    />
    <div class="zj-search-condition">
      <el-row class="button-row">
        <zj-button class="reset" icon="el-icon-refresh" @click="resetSearch"
          >重置</zj-button
        >
        <zj-button class="search" icon="el-icon-search" @click="search"
          >查询</zj-button
        >
      </el-row>
      <el-form ref="searchForm" :model="searchForm">
        <el-form-item label="签发人：">
          <el-input
            v-model="searchForm.issueEntName"
            @keyup.enter.native="enterSearch"
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
        <el-form-item label="凭证编号：" class="col-center">
          <el-input
            v-model="searchForm.ebillCode"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>
        <el-form-item label="签收日期：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.issueDateStart"
            :endDate.sync="searchForm.issueDateEnd"
          />
        </el-form-item>
      </el-form>
      <el-row class="button-row">
        <zj-button
          class="export"
          icon="iconfont icon-daochu"
          @click="exportData"
          >导出数据</zj-button
        >
      </el-row>
    </div>
    <div class="zj-search-response">
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.queryReceivedBillList"
      >
        <zj-table-column field="id" title="凭证编号">
          <template v-slot="{ row }">
            <span class="table-elbill-code" @click="toBillDetails(row)">{{
              row.ebillCode
            }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="issueEntName" title="签发人" />
        <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money" />
        <zj-table-column
          field="transferAmt"
          title="已转入金额"
          :formatter="money"
        />
        <zj-table-column
          field="splusAmt"
          title="已转入金额"
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
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="goChild('entManageDetail', row)"
              :api="zjBtn.getEnterprise"
              >凭证打印</zj-button
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
      zjControl: {
        //  queryReceivedBillList: this.$api.myBill.queryReceivedBillList,
      },
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
