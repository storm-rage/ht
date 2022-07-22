<template>
  <div>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="买方企业名称：">
            <el-input
              v-model.trim="searchForm.buyerNameLike"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>

          <el-form-item label="申请日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.receiveDatetimeStart"
              :endDate.sync="searchForm.receiveDatetimeEnd"
            />
          </el-form-item>

          <el-form-item label="申请增加额度：">
            <zj-amount-range :startAmt.sync="searchForm.applyAddCreditAmountStart"
                             :endAmt.sync="searchForm.applyAddCreditAmountEnd"></zj-amount-range>
          </el-form-item>
          <el-form-item label="申请流水号：">
            <el-input
              v-model.trim="searchForm.serialNoLike"
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
        <zj-table-column field="serialNo" title="申请流水号"></zj-table-column>
        <zj-table-column field="coreName" title="买方企业名称" />
        <zj-table-column
          field="applyAddCreditAmount"
          title="申请增加额度"
          :formatter="money"
        />
        <zj-table-column
          field="factoringCreditAmountOld"
          title="调整前额度"
          :formatter="money"
        />
        <zj-table-column
          field="factoringCreditAmountNew"
          title="调整后额度"
          :formatter="money"
        />
        <zj-table-column field="creditExpireDate" title="额度到期日" :formatter="date" />
        <zj-table-column field="receiveDatetime" title="申请时间" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="toReviewDetail(row)"
              :api="zjBtn.submitAdjustCreditReview">复核</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {
        tableApi: this.$api.billQuotaManage.queryAdjustCreditReviewPage,
        submitAdjustCreditReview: this.$api.billQuotaManage.submitAdjustCreditReview
      },
      searchForm: {
        buyerNameLike: "",
        receiveDatetimeStart: "",
        receiveDatetimeEnd: "",
        applyAddCreditAmountStart: "",
        applyAddCreditAmountEnd: "",
        serialNoLike: ""
      }
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    toReviewDetail(row) {
      this.goChild('quotaChangeReview',{id: row.id})
    },
  },
};
</script>
