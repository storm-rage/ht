<template>
  <zj-content-container>
    <!--  提前还款复核  -->
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="融资流水号：">
            <el-input v-model="searchForm.serialNo" />
          </el-form-item>
          <el-form-item label="申请日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.applyAmtStart"
              :endDate.sync="searchForm.applyDatetimeEnd"
            />
          </el-form-item>
          <el-form-item label="融资到期日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>
          <el-form-item label="申请提前还款金额：" class="col-center">
            <zj-amount-range
              :startAmt.sync="searchForm.applyAmtStart"
              :endAmt.sync="searchForm.applyAmtEnd"
              @keyupEnterNative="enterSearch"
            />
          </el-form-item>
          <el-form-item label="申请流水号：">
            <el-input v-model="searchForm.serialNoLike" />
          </el-form-item>
        </el-form>
      </template>
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column
          field="tranSerialNo"
          title="申请流水号"
        ></zj-table-column>
        <zj-table-column field="serialNo" title="融资流水号"></zj-table-column>
        <zj-table-column
          field="financingProductType"
          title="融资产品名称"
          :formatter="
            (obj) => typeMap(dictionary.financingProductType, obj.cellValue)
          "
        />
        <zj-table-column
          field="fromEntName"
          title="融资企业名称"
        ></zj-table-column>
        <zj-table-column field="tranAmt" title="融资金额" :formatter="money" />
        <zj-table-column
          field="applyDatetimeR"
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
          field="applyAmt"
          title="申请提前还款金额"
          :formatter="money"
        />
        <zj-table-column
          field="applyDatetime"
          title="申请时间"
          :formatter="date"
        />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="goChild('repaymentReview', row)"
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
      zjControl: this.$api.repaymentReview,
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
