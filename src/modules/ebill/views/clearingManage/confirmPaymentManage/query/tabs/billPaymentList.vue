<template>
  <div ref="billPaymentRef">
    <zj-list-layout noBottomBorder>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item :label="`${productName}编号：`">
            <el-input v-model.trim="searchForm.ebillCode" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="签发日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.payableIssuanceDateStart"
              :endDate.sync="searchForm.payableIssuanceDateEnd"
            />
          </el-form-item>
          <el-form-item :label="`${productName}到期日：`" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.payableExpireDateStart"
              :endDate.sync="searchForm.payableExpireDateEnd"
            />
          </el-form-item>
          <el-form-item label="原始持有人：">
            <el-input v-model.trim="searchForm.receiptEntNameLike" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="签发人：">
            <el-input v-model.trim="searchForm.payEntNameLike" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="业务系统单号：">
            <el-input v-model.trim="searchForm.capitalSerialno" @keyup.enter.native="enterSearch"/>
          </el-form-item>
        </el-form>
      </template>
      <zj-table ref="searchTable"
                :params="searchForm"
                :api="zjControl.tableApi"
                @checkbox-change="tableCheckChange"
                @checkbox-all="tableCheckChange">
        <zj-table-column type="checkbox" width="40px" fixed="left"></zj-table-column>
        <zj-table-column field="ebillCode" :title="`${productName}编号`">
          <template v-slot="{ row }">
            <el-link @click="toViewDetail(row)" type="primary" :underline="false">{{row.ebillCode}}</el-link>
          </template>
        </zj-table-column>
        <zj-table-column field="payEntName" title="签发人" />
        <zj-table-column field="receiptEntName" title="原始持有人"/>
        <zj-table-column field="payableIssuanceDate" title="签发日期" :formatter="date"/>
        <zj-table-column field="payableAmt" :title="`${productName}金额`" :formatter="money"/>
        <zj-table-column field="payableExpireDate" :title="`${productName}到期日`" :formatter="date"/>
        <zj-table-column field="remark" title="备注"/>
        <zj-table-column field="capitalSerialno" title="业务系统单号"/>
        <zj-table-column field="billConfirmAmt" :title="`确认${productName}金额`" :formatter="money"/>
        <zj-table-column field="actualExpireDate" title="凭证实际到期日" :formatter="date"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="toSubmitPayment(row)" :api="zjBtn.billConfirmReceipt">确认收款</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
    <confirm-payment-maintenance :actualExpireDate="actualExpireDate" ref="confirmPaymentMaintenance" :biz-id="bizId" @done="handleDone"></confirm-payment-maintenance>
    <zj-content-footer v-if="zjBtn.billConfirmReceiptApply" style="position: fixed" :style="{'left': bottomBtnLeft+'px'}">
      <zj-button type="primary" :disabled="!showBottomBtn" @click="batchSubmitApply" :api="zjBtn.billConfirmReceiptApply">提交申请</zj-button>
    </zj-content-footer>
  </div>
</template>
<script>
import ConfirmPaymentMaintenance from '../dialog/confirmPaymentMaintenance';
export default {
  props: {
    // 业务ID
    bizId: {
      type: String,
      required: true
    },
    // 凭证实际到期日，确认收款维护需要
    actualExpireDate: {
      type:String,
      required: true,
      default: ''
    }
  },
  components: {
    ConfirmPaymentMaintenance
  },
  data () {
    return {
      zjControl: {
        tableApi: this.$api.confirmPaymentManage.queryBillPage,
        billConfirmReceipt: this.$api.confirmPaymentManage.billConfirmReceipt,
        billConfirmReceiptApply: this.$api.confirmPaymentManage.billConfirmReceiptApply
      },
      searchForm: {
        id: this.bizId,
        ebillCode: '',
        payableIssuanceDateStart: '',
        payableIssuanceDateEnd: '',
        payableExpireDateStart: '',
        payableExpireDateEnd: '',
        receiptEntNameLike: '',
        payEntNameLike: '',
        capitalSerialno: ''
      },
      //是否显示底部按钮
      showBottomBtn: false,
      // 底部按钮的偏移量
      bottomBtnLeft: 100
    }
  },
  computed: {
    productName () {
      return this.$store.getters['user/productName']
    }
  },
  watch: {
    '$store.state.menu.collapseFlag': {
      // 实现深度监听
      deep: true,
      handler() {
        this.setBottomBtnLeft();
      }
    },
    bizId () {
      this.searchForm.id = this.bizId;
      this.search();
    }
  },
  created() {
    this.getApi({
      billConfirmReceipt: this.zjControl.billConfirmReceipt,
      billConfirmReceiptApply: this.zjControl.billConfirmReceiptApply
    })
  },
  mounted() {
    this.setBottomBtnLeft();
  },
  methods: {
    setBottomBtnLeft () {
      this.bottomBtnLeft = this.$refs.billPaymentRef.getBoundingClientRect().left - 10;
    },
    toViewDetail (row) {
      this.goChild('billLssueMyBillDetail',{
        ebillCode: row.ebillCode,
        parentRouteName: 'confirmReceipt'
      })
    },
    /**
     * 弹框修改确认收款
     * @param row
     */
    toSubmitPayment (row) {
      this.$refs.confirmPaymentMaintenance.show(row);
    },
    /**
     * 处理修改确认收款
     */
    handleDone() {
      this.search();
    },
    tableCheckChange( {records}) {
      this.showBottomBtn = records.length > 0;
    },
    batchSubmitApply () {
      const records = this.$refs.searchTable.getCheckboxRecords();
      if(!records.length){
        return this.$messageBox({
          type: 'warning',
          content: '请选择申请数据！',
          title: '提示',
          showConfirmButton: true,
          center: true
        });
      }
      const validBillConfirmAmtRecords = records.filter((item) => {
        return !item.billConfirmAmt
      })
      if (validBillConfirmAmtRecords.length) {
        return this.$messageBox({
          type: 'warning',
          content: `勾选记录存在尚未维护确认${this.productName}金额，请选维护再提交`,
          title: '提示',
          showConfirmButton: true,
          center: true
        });
      }
      //若Σ勾选凭证确认金额<=资金流水收款金额-已关联金额。
      // 若大于则报错“已勾选的凭证确认金额合计：xxxx元大于资金流水金额：yyyy元，不允许提交！”
      const record = records[0];
      const filterRecords = records.filter((item) => {
        return item.payEntName === record.payEntName && item.actualExpireDate === record.actualExpireDate;
      });
      // 勾选的多笔凭证，签发人相同，供应商相同且凭证实际到期日相同
      if (filterRecords.length!==records.length) {
        return this.$messageBox({
          type: 'warning',
          content: '请选择凭证实际到期日相同的凭证！',
          title: '提示',
          showConfirmButton: true,
          center: true
        });
      }
      // 凭证id集合
      const ids = records.map(record => record.id)
      this.goChild('billConfirmPaymentApply',{bizId: this.bizId, ids});
    }
  }
};
</script>
