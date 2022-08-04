<template>
  <div>
    <zj-content-container>
      <!--  转让交易查询  -->
          <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
            <zj-list-layout>
              <template slot="searchForm">
                <el-form ref="searchForm" :model="searchForm">
                  <el-form-item label="申请流水号：">
                    <el-input v-model="searchForm.serialNo" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="转让申请日期：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.applyDateStart"
                      :endDate.sync="searchForm.applyDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="申请状态：">
                    <el-select v-model="searchForm.workflowState">
                      <el-option label="全部" value=""></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </template>
              <zj-table ref="searchTable"
                        :api="zjControl.queryBillTransferRecordPage"
                        :params="searchForm"
              >
                <zj-table-column title="申请流水号">
                  <template v-slot="{row}">
                    <zj-button type="text" @click="toDetail(row)">{{row.serialNo}}</zj-button>
                  </template>
                </zj-table-column>
                <zj-table-column field="tranNumber" title="转让凭证总数"/>
                <zj-table-column field="tranAmt" title="转让总金额" :formatter="money"/>
                <zj-table-column field="applyDate" title="转让申请时间" :formatter="date"/>
                <zj-table-column field="workflowState" title="申请状态" :formatter="obj=>typeMap(dictionary,obj.cellValue)"/>
              </zj-table>
            </zj-list-layout>
          </div>
    </zj-content-container>
  </div>
</template>
<script>
import transferTransactionQuery from "../../../api/transferTransactionQueryApi";

export default {
  name: 'transferTransactionQuery',
  components: {},
  data() {
    return {
      zjControl: {
        getBillTransferDetail:this.$api.transferTransactionQuery.getBillTransferDetail,//转让交易查询-详情
        getDirectory:this.$api.transferTransactionQuery.getDirectory,//转让交易查询-数据字典
        queryBillRecordPage:this.$api.transferTransactionQuery.queryBillRecordPage,//转让交易查询-凭证查询
        queryBillTransferRecordPage:this.$api.transferTransactionQuery.queryBillTransferRecordPage,//转让交易查询-查询
      },
      searchForm: {
        serialNo: '',
        applyDateStart: '',
        applyDateEnd: '',
        workflowState: '',
      },
      tradeList: [],
      dictionary: {},
    };
  },
  methods: {
    toDetail(row) {
      this.goChild('transferTransactionSearchDetail', row)
    },
    getDic() {
      this.zjControl.getDirectory().then(res=>{
        this.dictionary = res.data
      })
    },

  }
};
</script>
