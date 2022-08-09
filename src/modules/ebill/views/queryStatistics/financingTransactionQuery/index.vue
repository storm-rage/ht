<template>
  <div>
    <zj-content-container>
      <!--  融资交易查询  -->
          <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
            <zj-list-layout>
              <template slot="rightBtns">
                <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch()">重置</vxe-button>
                <vxe-button class="search" icon="el-icon-search" @click="search(true,'searchTable')">查询</vxe-button>
              </template>
              <template slot="searchForm">
                <el-form ref="searchForm" :model="searchForm">
                  <el-form-item label="融资流水号：">
                    <el-input v-model.trim="searchForm.serialNo" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="融资企业名称：">
                    <el-input v-model.trim="searchForm.fromEntNameLike" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="融资申请日期：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.applyDateStart"
                      :endDate.sync="searchForm.applyDateEnd"
                    />
                  </el-form-item>
                  <el-form-item label="融资申请金额：">
                    <zj-amount-range :startAmt.sync="searchForm.tranAmtStart" :endAmt.sync="searchForm.tranAmtEnd"></zj-amount-range>
                  </el-form-item>
                  <el-form-item label="融资申请状态：">
                    <el-select v-model="searchForm.workflowState"
                               placeholder="请选择"
                               filterable
                               :popper-append-to-body="false"
                    >
                      <el-option label="全部" value=""></el-option>
                      <el-option
                        v-for="item in dictionary.financingStateList"
                        :key="item.code"
                        :label="item.desc"
                        :value="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-form>
              </template>
              <zj-table ref="searchTable" :params="searchForm" :api="zjControl.queryFinancingTransPage">
                <zj-table-column title="融资流水号">
                  <template v-slot="{row}">
                    <zj-button type="text" @click="toDetail(row)">{{row.serialNo}}</zj-button>
                  </template>
                </zj-table-column>
                <zj-table-column field="fromEntName" title="融资企业名称"/>
                <zj-table-column field="financingProductType" title="融资产品名称" :formatter="obj=>typeMap(dictionary.productTypeList, obj.cellValue)"/>
                <zj-table-column field="loanDate" title="融资开始日" :formatter="date"/>
                <zj-table-column field="expireDate" title="融资到期日" :formatter="date"/>
                <zj-table-column field="tranAmt" title="融资申请金额" :formatter="money"/>
                <zj-table-column field="applyDatetime" title="融资申请时间" :formatter="date"/>
                <zj-table-column field="workflowState" title="融资申请状态" :formatter="obj=>typeMap(dictionary.financingStateList, obj.cellValue)"/>
              </zj-table>
            </zj-list-layout>
          </div>
    </zj-content-container>
  </div>
</template>
<script>
import financingTransactionQuery from "../../../api/financingTransactionQueryApi";

export default {
  name: 'financingTransactionQuery',
  data() {
    return {
      zjControl: {
        getFinancingTransDirectory:this.$api.financingTransactionQuery.getFinancingTransDirectory,//数据字典
        queryFinancingTransPage:this.$api.financingTransactionQuery.queryFinancingTransPage,//查询
      },
      searchForm: {
        serialNo: '',
        fromEntNameLike: '',
        applyDateStart: '',
        applyDateEnd: '',
        tranAmtStart: '',
        workflowState: '',
      },
      dictionary:{},
    };
  },
  methods: {
    getDictionary() {
      this.zjControl.getFinancingTransDirectory().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
    toDetail(row) {
      this.goChild('financingTransactionQueryDetail', row)
    },
  },
  created() {
    this.getApi()
    this.getDictionary()
  }
};
</script>
