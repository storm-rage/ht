<template>
  <div>
    <zj-content-block>
      <zj-header title="贸易关系"></zj-header>
      <zj-content>
        <zj-table ref="tradeTable"  :dataList="tradeList" :pager="false">
          <zj-table-column field="buyerName" title="核心企业名称"/>
          <zj-table-column field="isHtEnterprise" title="核心企业是否海天集团" :formatter="(obj) => typeMap(dic.isHtEnterprise, obj.cellValue)"/>
          <zj-table-column
            field="bizLicence"
            title="核心企业统一社会信用代码"
          />
          <zj-table-column
            field="cactoringLogo"
            title="保理标识"
            :formatter="(obj) => typeMap(dic.cactoringLogo, obj.cellValue)"
          />
          <zj-table-column field="settlementCycle" title="结算周期" :formatter="(obj) => typeMap(dic.settlementCycle, obj.cellValue)"/>
          <zj-table-column field="totalCreditAmount" title="供应商总额度" :formatter="money"/>
          <zj-table-column field="estimatedAnnualProcurementAmount" title="预计年采购金额" :formatter="money"/>
          <zj-table-column field="state" title="贸易关系状态" :formatter="(obj) => typeMap(dic.state, obj.cellValue)"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row,rowIndex }">
               <!--     若当贸易关系状态为“正常”，则展示“维护”         -->
              <zj-button type="text" v-if="row.state==='1'" @click="toEditTrade(row,rowIndex)" :api="zjBtn.applyContractRenewal">维护</zj-button>
              <zj-button type="text" @click="viewTradeDetail(row)" :api="zjBtn.getTradeRelationDetail">详情</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <trade-edit-detail ref="tradeEditDetail"
                       :dic="dic"
                       :bizId="bizId"
                       @done="handleTradeEdit"></trade-edit-detail>
  </div>
</template>
<script>
import TradeEditDetail from './dialog/tradeEditDetail';
export default {
  props: {
    tradeList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 字典
    dic: Object,
    // 业务ID
    bizId: String
  },
  components: {TradeEditDetail},
  created() {
    this.getApi();
  },
  data () {
    return {
      zjControl: {
        getTradeRelationDetail: this.$api.businessManage.getTradeRelationDetail,
        applyContractRenewal: this.$api.businessManage.applyContractRenewal
      },
      // 当前维护的行index
      currentRowIndex: 0,
      //维护之后的列表
      editTradeList: []
    };
  },
  methods: {
    toEditTrade (row,rowIndex) {
      this.currentRowIndex = rowIndex;
      const editIndex = this.editTradeList.findIndex((item) => item.tradeId === row.tradeId);
      if (editIndex >= 0) {
        // 无需发请求
        this.$refs.tradeEditDetail.show(this.editTradeList[editIndex],true, false);
      }else {
        this.$refs.tradeEditDetail.show(row,true);
      }

    },
    viewTradeDetail (row) {
      this.$refs.tradeEditDetail.show(row,false)
    },
    /**
     * 维护之后回调
     * @param form
     */
    handleTradeEdit (form) {
      const row = this.tradeList[this.currentRowIndex];
      //同步更新列表值
      row.cactoringLogo = form.cactoringLogo;
      row.settlementCycle = form.settlementCycle;
      row.totalCreditAmount = form.totalCreditAmount;
      row.estimatedAnnualProcurementAmount = form.estimatedAnnualProcurementAmount;
      this.$set(this.tradeList, this.currentRowIndex, row);
      if (row && form) {
        const index = this.editTradeList.findIndex((item) => item.tradeId === form.tradeId);
        // 如果存在则更新不存在则添加
        if (index >= 0) {
          this.editTradeList[index] = form;
        }else {
          this.editTradeList.push(form);
        }
      }
    },
    /**
     * 获取编辑之后的数组
     * @returns {[]}
     */
    getList () {
      return this.editTradeList;
    }
  }
};
</script>
