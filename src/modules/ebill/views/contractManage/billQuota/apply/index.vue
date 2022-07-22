<template>
  <div>
    <zj-content-block>
      <zj-header title="保理合同"></zj-header>
      <zj-content>
        <zj-table ref="searchContractTable"  :dataList="contractList" :pager="false">
          <zj-table-column field="contractNo" title="合同编号"/>
          <zj-table-column field="contractName" title="合同名称"/>
          <zj-table-column
            field="contractStartDate"
            title="合同生效日期"
            :formatter="date"
          />
          <zj-table-column
            field="contractEndDate"
            title="合同失效日期"
            :formatter="date"
          />
          <zj-table-column field="contractStatus"
                           title="合同状态"
                           :formatter="(obj) => typeMap(dictionary.contractStatus, obj.cellValue)"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" :api="zjBtn.getContractDetail" @click="toContractDetail(row)">详情</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>

    <zj-content-block>
      <zj-header title="额度信息"></zj-header>
      <zj-content>
        <zj-table ref="searchQuotaTable" :dataList="quotaList" :pager="false">
          <zj-table-column type="seq" title="序号" width="60"/>
          <zj-table-column field="buyerName" title="买方企业名称" />
          <zj-table-column
            field="accountTransferStartDate"
            title="应收账款转让期限"
          >
            <template v-slot="{row}">
              {{row.accountTransferStartDate}}～{{row.accountTransferEndDate}}
            </template>
          </zj-table-column>
          <zj-table-column
            field="totalCreditAmount"
            title="授信额度"
            :formatter="money"
          />
          <zj-table-column field="factoringCreditEndDate" title="额度期限">
            <template v-slot="{row}">
              {{row.accountTransferStartDate}}～{{row.factoringCreditEndDate}}
            </template>
          </zj-table-column>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button
                type="text"
                @click="toApplyPage(row)"
                :api="zjBtn.submitAdjustCreditApply">额度变更申请</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zjControl: {
        queryList: this.$api.billQuotaManage.queryAdjustCreditApplyList,
        getDataDirectory: this.$api.billQuotaManage.getDataDirectory,
        getContractDetail: this.$api.billQuotaManage.getContractDetail,
        submitAdjustCreditApply: this.$api.billQuotaManage.submitAdjustCreditApply,
      },
      // 字典
      dictionary: {},
      // 合同信息
      contractList: [],
      // 额度信息
      quotaList: []
    };
  },
  created() {
    this.getApi();
    this.zjControl.getDataDirectory().then(res => {
      this.dictionary = res.data
    });
    this.getList();
  },
  methods: {
    getList() {
      this.zjControl.queryList().then(res => {
        if (res.data && res.data.id) {
          this.contractList = [res.data];
          if (res.data.creditInfoList) {
            this.quotaList = res.data.creditInfoList;
          }
        }
      });
    },
    toContractDetail(row) {
      this.goChild('contractDetail',{contractId: row.id});
    },
    toApplyPage(row) {
      this.goChild('quotaChangeApply',{creditId: row.id});
    }
  }
};
</script>

<style scoped>
</style>
