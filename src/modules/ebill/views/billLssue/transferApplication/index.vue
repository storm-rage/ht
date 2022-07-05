<template>
  <div>
    <div class="zj-search-condition">
      <div class="explain">
        <p>可转让电子债券凭证金额： <b>1,233,100.00元</b></p>
        <p>
          说明：可转让债权凭证金额：当前状态为“正常持有”的，折扣范围内的可用金额。
        </p>
      </div>
      <el-row class="button-row">
        <zj-button class="reset" icon="el-icon-refresh" @click="resetSearch"
          >重置</zj-button
        >
        <zj-button class="search" icon="el-icon-search" @click="search"
          >查询</zj-button
        >
      </el-row>

      <el-form ref="searchForm" :model="searchForm">
        <el-form-item label="合同编号：">
          <el-input
            v-model="searchForm.issueEntName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>

        <!-- <el-form-item label="合同签署类型：">
          <el-select v-model="contractType">
            <el-option value="1" />
            <el-option value="2" />
            <el-option value="3" />
          </el-select>
        </el-form-item> -->

        <el-form-item label="申请日期：" class="col-right">
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

        <!-- <el-form-item label="申请状态：">
          <el-select v-model="applicationStatus">
            <el-option value="全部" />
            <el-option value="待复核" />
          </el-select>
        </el-form-item> -->

        <el-form-item label="转让企业：">
          <el-input
            v-model="searchForm.issueEntName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>

        <el-form-item label="债权凭证编号：">
          <el-input
            v-model="searchForm.issueEntName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>

        <el-form-item label="凭证签收日：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
        </el-form-item>

        <!-- <el-form-item label="合同签署类型：">
          <el-select v-model="applicationStatus">
            <el-option value="全部" />
            <el-option value="待复核" />
          </el-select>
        </el-form-item> -->
      </el-form>
    </div>
    <div class="zj-search-response">
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        债权凭证编号 原始债权凭证编号 签发人 原始持有人 凭证签发日 凭证到期日
        转让企业 凭证金额 凭证签收日 凭证状态 操作
        <zj-table-column field="ebillCode" title="债权凭证编号">
          <template v-slot="{ row }">
            <span class="table-elbill-code" @click="toBillDetails(row)">{{
              row.ebillCode
            }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="issueEntName" title="原始债权凭证编号" />
        <zj-table-column
          field="ebillAmt"
          title="签发人"
          :formatter="money"
        />
        <zj-table-column
          field="transferAmt"
          title="原始持有人"
          :formatter="money"
        />
        <zj-table-column field="issueDate" title="凭证签发日" :formatter="date" />
        <zj-table-column field="issueDate" title="凭证到期日" :formatter="date" />
        <zj-table-column
          field="receiveDate"
          title="转让企业"
          :formatter="date"
        />
        <zj-table-column field="splusAmt" title="凭证金额" :formatter="money" />
        <zj-table-column
          field="expireDate"
          title="凭证签收日"
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
              >转让申请</zj-button
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
      searchForm: {
        issueEntName: "",
        expireDateStart: "",
        expireDateEnd: "",
        ebillAmtStart: "",
        ebillAmtEnd: "",
        ebillCode: "",
        issueDateStart: "",
        issueDateEnd: "",
      },
      contractType: "", // 合同签署类型
      applicationStatus: "", // 申请状态
      signingResults: "", // 签约结果
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    toBillDetails(row) {
      console.log(row);
    },
    goChild() {
      this.$router.push("/limitChangeDetails");
    },
  },
};
</script>
