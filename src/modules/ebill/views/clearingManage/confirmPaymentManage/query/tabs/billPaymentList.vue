<template>
  <div ref="billPaymentRef">
    <div class="zj-search-condition" style="border-bottom: 0;margin-bottom: 10px">
      <el-row class="button-row">
        <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch">重置</vxe-button>
        <vxe-button class="search" icon="el-icon-search" @click="search">查询</vxe-button>
      </el-row>
      <el-form ref="searchForm" :model="searchForm">
        <el-form-item label="凭证编号：">
          <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
        <el-form-item label="签发日期：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
        </el-form-item>
        <el-form-item label="凭证到期日：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
        </el-form-item>
        <el-form-item label="原始持有人：">
          <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
        <el-form-item label="签发人：">
          <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
        <el-form-item label="业务系统单号：">
          <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
      </el-form>
    </div>
    <div class="zj-search-response">
      <zj-table ref="searchTable"
                :dataList="list"
                :params="searchForm"
                :api="zjControl.tableApi"
                @checkbox-change="tableCheckChange"
                @checkbox-all="tableCheckChange">
        <zj-table-column type="checkbox" width="40px" fixed="left"></zj-table-column>
        <zj-table-column field="field1" title="凭证编号">
          <template v-slot="{ row }">
            <el-link @click="toViewDetail(row)" type="primary" :underline="false">{{row.field1}}</el-link>
          </template>
        </zj-table-column>
        <zj-table-column field="field2" title="签发人" />
        <zj-table-column field="field3" title="原始持有人"/>
        <zj-table-column field="field4" title="签发日期" :formatter="date"/>
        <zj-table-column field="field5" title="凭证金额" :formatter="money"/>
        <zj-table-column field="field6" title="凭证到期日" :formatter="date"/>
        <zj-table-column field="field7" title="备注"/>
        <zj-table-column field="field8" title="业务系统单号"/>
        <zj-table-column field="field9" title="确认凭证金额" :formatter="money"/>
        <zj-table-column field="field10" title="凭证实际到期日"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="toSubmitPayment(row)" :api="zjBtn.getEnterprise">确认收款</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </div>
    <confirm-payment-maintenance ref="confirmPaymentMaintenance"></confirm-payment-maintenance>
    <zj-content-footer v-if="showBottomBtn" style="position: fixed" :style="{'left': bottomBtnLeft+'px'}">
      <zj-button type="primary" @click="batchSubmitApply" :api="zjBtn.passBillSignBatch">提交申请</zj-button>
    </zj-content-footer>
  </div>
</template>
<script>
import ConfirmPaymentMaintenance from '../dialog/confirmPaymentMaintenance';
export default {
  components: {
    ConfirmPaymentMaintenance
  },
  data () {
    return {
      zjControl: {},
      searchForm: {},
      list:[
        {
          field1: '656546',
          field2: '额热体人体',
          field3: '回复恢复呵呵',
          field4: '2022-10-10',
          field5: '10000',
          field6: '2023-10-10',
          field7: '备注',
          field8: 'S656546546',
          field9: '2000',
          field10: '2022-11-11'
        }
      ],
      //是否显示底部按钮
      showBottomBtn: false,
      // 底部按钮的偏移量
      bottomBtnLeft: 100
    }
  },
  watch: {
    '$store.state.menu.collapseFlag': {
      // 实现深度监听
      deep: true,
      handler() {
        this.setBottomBtnLeft();
      }
    }
  },
  mounted() {
    this.setBottomBtnLeft();
  },
  methods: {
    setBottomBtnLeft () {
      this.bottomBtnLeft = this.$refs.billPaymentRef.getBoundingClientRect().left - 10;
    },
    toViewDetail (row) {},
    toSubmitPayment (row) {
      this.$refs.confirmPaymentMaintenance.show(row);
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
      this.$router.push({name: 'billConfirmPaymentApply'})
    }
  }
};
</script>
