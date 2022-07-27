<template>
  <div>
    <zj-content-container>
      <!--  供应商额度查询  -->
          <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
            <zj-list-layout>
              <template slot="leftBtns">
                <vxe-button class="export" icon="el-icon-download" @click="toExport" :api="zjBtn.exportFactoringCredit">导出</vxe-button>
              </template>
              <template slot="searchForm">
                <el-form ref="searchForm" :model="searchForm">
                  <el-form-item label="供应商名称：">
                    <el-input v-model.trim="searchForm.sellerName" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="核心企业名称：">
                    <el-input v-model.trim="searchForm.buyerName" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="核心企业是否海天集团：">
                    <el-select v-model="searchForm.isHtEnterprise"
                               placeholder="请选择"
                               filterable
                               :popper-append-to-body="false"
                    >
                      <el-option label="全部" value=""></el-option>
                      <el-option
                        v-for="item in dictionary.isHtEnterprise"
                        :key="item.code"
                        :label="item.desc"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="额度状态：">
                    <el-select v-model="searchForm.factoringCreditStatus"
                               placeholder="请选择"
                               filterable
                               :popper-append-to-body="false"
                    >
                      <el-option label="全部" value=""></el-option>
                      <el-option
                        v-for="item in dictionary.factoringCreditStatus"
                        :key="item.code"
                        :label="item.desc"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="额度到期日：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.factoringCreditEndDateStart"
                      :endDate.sync="searchForm.factoringCreditEndDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                </el-form>
              </template>
              <zj-table ref="searchTable" :params="searchForm" :api="zjControl.queryFactoringCreditPage">
                <zj-table-column field="companyName" title="供应商名称"/>
                <zj-table-column field="supplierCode" title="核心企业名称"/>
                <zj-table-column field="supplierName" title="核心企业是否海天集团"/>
                <zj-table-column field="checkBillDate" title="额度开始日" :formatter="date"/>
                <zj-table-column field="estimatedPaymentDate" title="额度到期日" :formatter="date"/>
                <zj-table-column field="estimatedPaymentDate" title="授信额度" :formatter="money"/>
                <zj-table-column field="estimatedPaymentDate" title="剩余可用额度" :formatter="money"/>
                <zj-table-column field="billSource" title="融资状态" :formatter="obj=>typeMap(dictionary.factoringCreditStatus,obj.cellValue)"/>
              </zj-table>
            </zj-list-layout>
          </div>
    </zj-content-container>
  </div>
</template>
<script>
import supplierQuotaQuery from "../../../api/supplierQuotaQueryApi";

export default {
  components: {},
  data() {
    return {
      zjControl: {
        exportFactoringCredit:this.$api.supplierQuotaQuery.exportFactoringCredit,
        getDirectory:this.$api.supplierQuotaQuery.getDirectory,
        queryFactoringCreditPage:this.$api.supplierQuotaQuery.queryFactoringCreditPage,
      },
      searchForm: {
        sellerName: '',
        buyerName: '',
        isHtEnterprise: '',
        factoringCreditStatus: '',
        factoringCreditEndDateStart: '',
        factoringCreditEndDateEnd: '',
      },
      dictionary:{},
    };
  },
  methods: {
    getDictionary() {
      this.zjControl.getDirectory().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
    toExport() {
      this.zjControl.exportFactoringCredit()
    },
  },
  created() {
    this.getApi()
    this.getDictionary()
  }
};
</script>
