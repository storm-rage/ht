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
                  <el-form-item label="融资申请日期：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.applyDateStart"
                      :endDate.sync="searchForm.applyDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="融资申请金额：">
                    <zj-amount-range :startAmt.sync="searchForm.tranAmtStart" :endAmt.sync="searchForm.tranAmtEnd"></zj-amount-range>
                  </el-form-item>
                  <el-form-item label="融资业务状态：">
                    <el-select v-model="searchForm.workflowState">
                      <el-option label="全部" value=""/>
                      <el-option
                        v-for="item in dictionary.financingStateList"
                        :label="item.desc"
                        :value="item.code"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="融资流水号：">
                    <el-input v-model="searchForm.serialNoLike" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                </el-form>
              </template>
              <zj-table ref="searchTable"
                        :api="zjControl.queryFinancingTranPage"
                        :params="searchForm"
              >
                <zj-table-column title="融资流水号">
                  <template v-slot="{row}">
                    <el-link type="text" @click="toDetail(row)"><span class="blue">{{row.serialNo}}</span></el-link>
                  </template>
                </zj-table-column>
                <zj-table-column field="financingProductType" title="融资产品名称" :formatter="obj=>typeMap(dictionary.productTypeList,obj.cellValue)"/>
                <zj-table-column field="fromEntName" title="融资企业名称"/>
                <zj-table-column field="applyDatetime" title="融资申请日期" :formatter="date"/>
                <zj-table-column field="tranAmt" title="融资申请金额" :formatter="money"/>
                <zj-table-column field="workflowState" title="融资业务状态" :formatter="obj=>typeMap(dictionary.financingStateList,obj.cellValue)"/>
              </zj-table>
            </zj-list-layout>
          </div>
    </zj-content-container>
  </div>
</template>
<script>
import financingTransactionSearch from "../../../api/financingTransactionSearchApi";

export default {
  name: 'financingTransactionSearch',
  data() {
    return {
      zjControl: {
        getFinancingTranDirectory:this.$api.financingTransactionSearch.getFinancingTranDirectory,//获取数据字典
        queryFinancingTranPage:this.$api.financingTransactionSearch.queryFinancingTranPage,//融资交易查询-查询
      },
      searchForm: {
        applyDateStart: '',
        applyDateEnd: '',
        tranAmtStart: '',
        tranAmtEnd: '',
        workflowState: '',
        serialNoLike: '',
      },
      dictionary: {},
    };
  },
  methods: {
    getDic() {
      this.zjControl.getFinancingTranDirectory().then(res=>{
        this.dictionary = res.data
      })
    },
    toDetail (row) {
      this.goChild('financingTransactionSearchDetail', row)
    },
  },
  created() {
    this.getApi()
    this.getDic()
  },
};
</script>
<style scoped>
.blue{
  color: blue;
}
</style>
