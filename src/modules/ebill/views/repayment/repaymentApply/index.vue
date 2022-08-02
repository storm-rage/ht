<template>
  <zj-content-container>
    <!--  提前还款申请  -->
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="融资流水号：">
            <el-input v-model="searchForm.serialNo" />
          </el-form-item>
          <el-form-item label="融资开始日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.applyDatetimeStart"
              :endDate.sync="searchForm.applyDatetimeEnd"
            />
          </el-form-item>
          <el-form-item label="融资到期日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>
          <el-form-item label="融资金额：" class="col-center">
            <zj-amount-range
              :startAmt.sync="searchForm.tranAmtStart"
              :endAmt.sync="searchForm.tranAmtEnd"
            />
          </el-form-item>
          <el-form-item label="还款状态：" class="col-center">
            <el-select
              v-model="searchForm.repaymentFlag"
              placeholder="请选择"
              clearable
              :popper-append-to-body="false"
            >
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in dictionary.preRepaymentFlag"
                :key="item.code"
                :label="item.desc"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column field="ebillCode" title="融资流水号">
          <template v-slot="{ row }">
            <span class="table-elbill-code" @click="toBillDetails(row)">{{
              row.serialNo
            }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="fromEntName" title="融资企业" />
        <zj-table-column
          field="financingProductType"
          title="融资产品名称"
          :formatter="
            (obj) => typeMap(dictionary.financingProductType, obj.cellValue)
          "
        />
        <zj-table-column
          field="createDatetime"
          title="融资申请日期"
          :formatter="date"
        />
        <zj-table-column field="tranAmt" title="融资金额" :formatter="money" />
        <zj-table-column field="interestRate" title="融资月利率" />
        <zj-table-column
          field="applyDatetime"
          title="融资开始日期"
          :formatter="date"
        />
        <zj-table-column
          field="expireDate"
          title="融资到期日期"
          :formatter="date"
        />
        <zj-table-column
          field="repaymentPrincipalAmt"
          title="已还款本金"
          :formatter="money"
        />
        <zj-table-column
          field="lastRepayDate"
          title="上次还款日期"
          :formatter="date"
        />
        <zj-table-column field="repaymentFlag" title="还款状态" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="goChild('repaymentApply', row)"
              :api="zjBtn.getEnterprise"
              >提前还款申请</zj-button
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
      zjControl: this.$api.repaymentApply,
      searchForm: {},
      dictionary: {},
    };
  },
  created() {
    this.getDirectory();
  },
  methods: {
    // 获取字典
    getDirectory() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data;
      });
    },
    toBillDetails(row) {
      console.log(row);
    },
  },
};
</script>
