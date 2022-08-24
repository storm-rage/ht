<template>
  <div>
    <zj-list-layout noBottomBorder>
<!--      <template slot="searchForm">-->
<!--        <el-form ref="searchForm" :model="searchForm">-->
<!--          <el-form-item label="供应商名称：">-->
<!--            <el-input v-model.trim="searchForm.sellerEntName" @keyup.enter.native="enterSearch"/>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="核心企业：">-->
<!--            <el-input v-model.trim="searchForm.buyerEntName" @keyup.enter.native="enterSearch"/>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </template>-->
      <zj-table ref="searchTable"
                :params="searchForm"
                :pager="false"
                :api="zjControl.tableApi">
        <zj-table-column field="sellerEntCode" title="供应商编码"/>
        <zj-table-column field="sellerEntName" title="供应商名称" />
        <zj-table-column field="buyerEntCode" title="核心企业编码"/>
        <zj-table-column field="buyerEntName" title="核心企业名称"/>
        <zj-table-column field="buyerIsHtEnterprise" title="核心企业是否海天集团" :formatter="(obj) => typeMap(dictionary.buyerIsHtEnterprise, obj.cellValue)"/>
        <zj-table-column field="cactoringLogo" title="保理标识" :formatter="(obj) => typeMap(dictionary.cactoringLogo, obj.cellValue)"/>
        <zj-table-column field="state" title="贸易关系状态" :formatter="(obj) => typeMap(dictionary.state, obj.cellValue)"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="toSubmitPayment(row)" :api="zjBtn.noBillConfirmReceiptApply">确认收款</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
  </div>
</template>
<script>
/**
 * 非凭证收款
 */
export default {
  props: {
    // 业务ID
    bizId: {
      type: String,
      required: true
    }
  },
  watch: {
    bizId () {
      this.searchForm.id = this.bizId;
      this.search();
    }
  },
  data () {
    return {
      zjControl: {
        tableApi: this.$api.confirmPaymentManage.queryNoBillPage,
        getDirectory: this.$api.confirmPaymentManage.getDirectory,
        noBillConfirmReceiptApply: this.$api.confirmPaymentManage.noBillConfirmReceiptApply,
      },
      searchForm: {
        bizId: '',
        sellerEntName: '',
        buyerEntName: ''
      },
      // 字典
      dictionary: {}
    }
  },
  created() {
    this.getApi({
      noBillConfirmReceiptApply: this.zjControl.noBillConfirmReceiptApply
    })
    this.getDic();
  },
  methods: {
    getDic() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data
        this.$nextTick(() => {
          if (this.$refs.searchTable) {
            this.$refs.searchTable.refreshColumn();
          }
        })
      });
    },
    toSubmitPayment (row) {
      this.goChild('otherConfirmPaymentApply',{bizId: this.bizId,busTradeId:row.busTradeId})
    }
  }
}
</script>
