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
        <el-form-item label="融资流水号：">
          <el-input v-model="searchForm.issueEntName" />
        </el-form-item>
        <el-form-item label="融资开始日：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
        </el-form-item>
        <el-form-item label="融资到期日：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
        </el-form-item>
        <el-form-item label="融资金额：" class="col-center">
          <zj-amount-range
            :startAmt.sync="searchForm.ebillAmtStart"
            :endAmt.sync="searchForm.ebillAmtEnd"
            @keyupEnterNative="enterSearch"
          />
        </el-form-item>
        <el-form-item label="还款状态：" class="col-center">
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
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column field="ebillCode" title="融资流水号">
          <template v-slot="{ row }">
            <span class="table-elbill-code" @click="toBillDetails(row)">{{
              row.ebillCode
            }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="issueEntName" title="融资企业" />
        <zj-table-column field="issueEntName" title="融资产品名称" />
        <zj-table-column
          field="issueDate"
          title="融资申请日期"
          :formatter="date"
        />
        <zj-table-column field="ebillAmt" title="融资金额" :formatter="date" />
        <zj-table-column field="transferAmt" title="融资月利率" />
        <zj-table-column
          field="receiveDate"
          title="融资开始日期"
          :formatter="date"
        />
         <zj-table-column
          field="receiveDate"
          title="融资到期日期"
          :formatter="date"
        />
        <zj-table-column field="expireDate" title="已还款本金" />
          <zj-table-column
          field="receiveDate"
          title="上次还款日期"
          :formatter="date"
        />
        <zj-table-column field="transferAmt" title="还款状态" />
        <zj-table-column title="操作" fixed="right">
          <template>
            <zj-button
              type="text"
              @click="&quot;&quot;;"
              :api="zjBtn.getEnterprise"
              >提前还款申请</zj-button
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
