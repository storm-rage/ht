<template>
<div ref="clearingListRef">
  <zj-list-layout>
    <template slot="leftBtns">
      <vxe-button class="export" icon="el-icon-download" @click="toExport">导出</vxe-button>
    </template>
    <template slot="searchForm">
      <el-form ref="searchForm" :model="searchForm">
        <el-form-item label="当前持有人：">
          <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
        <el-form-item label="签发人：">
          <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
        <el-form-item label="原始凭证编号：">
          <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
        <el-form-item label="凭证实际到期日：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
        </el-form-item>
        <el-form-item label="收款单号：">
          <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
        <el-form-item label="凭证编号：">
          <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
      </el-form>
    </template>
    <!--    table-->
    <zj-table ref="searchTable"
              :dataList="list"
              :params="searchForm"
              :api="zjControl.tableApi"
              @checkbox-change="tableCheckChange"
              @checkbox-all="tableCheckChange">
      <zj-table-column type="checkbox" width="40px" fixed="left"></zj-table-column>
      <zj-table-column field="field1" title="原始凭证编号">
        <template v-slot="{ row }">
          <el-link @click="toViewDetail(row)" type="primary" :underline="false">{{row.field1}}</el-link>
        </template>
      </zj-table-column>
      <zj-table-column field="field2" title="收款单号" />
      <zj-table-column field="field3" title="资金流水号"/>
      <zj-table-column field="field4" title="凭证编号">
        <template v-slot="{row}">
          <el-link @click="toViewDetail(row)" type="primary" :underline="false">{{row.field4}}</el-link>
        </template>
      </zj-table-column>
      <zj-table-column field="field5" title="签发人"/>
      <zj-table-column field="field6" title="签发日期" :formatter="date"/>
      <zj-table-column field="field7" title="凭证金额" :formatter="money"/>
      <zj-table-column field="field8" title="到期日期" :formatter="date"/>
      <zj-table-column field="field9" title="凭证实际到期日" :formatter="date"/>
      <zj-table-column field="field10" title="原始持有人"/>
      <zj-table-column field="field11" title="当前持有人"/>
      <zj-table-column field="field12" title="最终付款金额" :formatter="money"/>
      <zj-table-column field="field13" title="收款账户户名"/>
      <zj-table-column field="field14" title="收款账号"/>
      <zj-table-column field="field15" title="收款账户开户行"/>
      <zj-table-column field="field16" title="银行联行号"/>
      <zj-table-column title="操作" fixed="right">
        <template v-slot="{row}">
          <zj-button type="text" @click="singleClearingApply(row)" :api="zjBtn.getEnterprise">清算申请</zj-button>
        </template>
      </zj-table-column>
      <div slot="pager-left" style="position: absolute;left: 10px;top: 0">
        <span>实际付款金额汇总：</span>{{money('100000000')}}
      </div>
    </zj-table>
  </zj-list-layout>
  <zj-content-footer v-if="showBottomBtn"  style="position: fixed" :style="{'left': bottomBtnLeft+'px'}">
    <zj-button type="primary" @click="batchClearingApply" :api="zjBtn.passBillSignBatch">清算申请</zj-button>
  </zj-content-footer>
</div>
</template>

<script>
import footerBtnMixin from '../mixins/footerBtnMixin';
export default {
  mixins: [footerBtnMixin],
  data () {
    return {
      showBottomBtn: false,
      zjControl: {},
      searchForm: {},
      list: [
        {
          field1: 'S4564565465465464343',
          field2: 'Y6546456546656565545',
          field3: 'Z7657567567567657674',
          field4: 'S6756775675675676767',
          field5: '方法士大夫士大夫发士大夫',
          field6: '2022-10-10',
          field7: '10000',
          field8: '2023-10-10',
          field9: '2023-10-10',
          field10: '太热特人天天退热退热退热',
          field11: '发士大夫士大夫发士大夫',
          field12: '20000',
          field13: '通融通融通融',
          field14: '62343434343434343434343',
          field15: '中国银行',
          field16: '12232323',
        }
      ]
    }
  },
  methods: {
    tableCheckChange ({records}) {
      this.showBottomBtn = records.length > 0;
    },
    toViewDetail (row) {
    },
    /**
     * 批量清算申请
     */
    batchClearingApply () {
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
      this.$router.push({name: 'billClearingApply'})
    },
    /**
     * 单笔清算申请
     * @param row
     */
    singleClearingApply (row) {
      this.$router.push({name: 'billClearingApply'})
    },
    toExport () {}
  }
}
</script>
