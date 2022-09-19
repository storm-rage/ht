<template>
  <div>
    <zj-content-container>
      <!--  电子债权凭证查询  -->
          <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
            <zj-list-layout>
              <template slot="leftBtns">
                <vxe-button class="export" icon="el-icon-download" @click="toExport" :api="zjControl.exportElectronicClaimsBill">导出</vxe-button>
              </template>
              <template slot="searchForm">
                <el-form ref="searchForm" :model="searchForm">
                  <el-form-item label="签发人：">
                    <el-input v-model="searchForm.payEntNameLike" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="原始持有人：">
                    <el-input v-model="searchForm.receiptEntNameLike" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item :label="`${productName}状态：`">
                    <el-select v-model="searchForm.state">
                      <el-option label="全部" value=""/>
                      <el-option v-for="item in dictionary.stateList"
                                 :label="item.desc"
                                 :value="item.code"
                                 :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="当前持有人：">
                    <el-input v-model="searchForm.holderNameLike" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item :label="`${productName}编号：`">
                    <el-input v-model="searchForm.ebillCode" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item :label="`原始${productName}编号：`">
                    <el-input v-model="searchForm.rootCode" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item :label="`${productName}签发日期：`">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.payableIssuanceDateStart"
                      :endDate.sync="searchForm.payableIssuanceDateEnd"
                    />
                  </el-form-item>
                  <el-form-item :label="`${productName}到期日：`">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.payableExpireDateStart"
                      :endDate.sync="searchForm.payableExpireDateEnd"
                    />
                  </el-form-item>
                  <el-form-item :label="`${productName}金额：`">
                    <zj-amount-range :startAmt.sync="searchForm.payableAmtStart" :endAmt.sync="searchForm.payableAmtEnd"></zj-amount-range>
                  </el-form-item>
                </el-form>
              </template>
              <zj-table ref="searchTable"
                        :api="zjControl.queryElectronicClaimsBillPage"
                        :params="searchForm"
              >
                <zj-table-column :title="`${productName}编号`">
                  <template v-slot="{row}">
                    <el-link type="primary" @click="toDetail(row)">{{row.ebillCode}}</el-link>
                  </template>
                </zj-table-column>
                <zj-table-column :title="`原始${productName}编号`">
                  <template v-slot="{row}">
                    <el-link type="primary" @click="toDetail(row)">{{row.rootCode}}</el-link>
                  </template>
                </zj-table-column>
                <zj-table-column field="payEntName" title="签发人"/>
                <zj-table-column field="receiptEntName" title="原始持有人" />
                <zj-table-column field="holderName" title="当前持有人" />
                <zj-table-column field="ebillAmt" :title="`${productName}金额`" :formatter="money"/>
                <zj-table-column field="payableIssuanceDate" :title="`${productName}签发日期`" :formatter="date"/>
                <zj-table-column field="payableExpireDate" :title="`${productName}到期日`" :formatter="date"/>
                <zj-table-column field="state" :title="`${productName}状态`" :formatter="obj=>typeMap(dictionary.stateList,obj.cellValue)"/>
              </zj-table>
            </zj-list-layout>
          </div>
    </zj-content-container>
  </div>
</template>
<script>
export default {
  name: 'voucherQuery',
  computed: {
    productName () {
      return this.$store.getters['user/productName']
    }
  },
  data() {
    return {
      zjControl: {
        exportElectronicClaimsBill:this.$api.voucherQuery.exportElectronicClaimsBill,//电子债权凭证查询-导出
        queryElectronicClaimsBillPage:this.$api.voucherQuery.queryElectronicClaimsBillPage,//电子债权凭证查询-列表
        getElectronicClaimsBillDirectory:this.$api.voucherQuery.getElectronicClaimsBillDirectory,//电子债权凭证查询-数据字典
      },
      searchForm: {
        payEntNameLike: '',
        receiptEntNameLike: '',
        state: '',
        holderNameLike: '',
        ebillCode: '',
        rootCode: '',
        payableIssuanceDateStart: '',
        payableIssuanceDateEnd: '',
        payableExpireDateStart: '',
        payableExpireDateEnd: '',
        payableAmtStart: '',
        payableAmtEnd: '',
      },
      dictionary: {},
    };
  },
  methods: {
    toExport() {
      this.zjControl.exportElectronicClaimsBill(this.searchForm)
    },
    toDetail(row) {
      this.goChild('voucherQueryDetail', row)
    },
    //获取数据字典
    getMyEbBillDictionary(){
      this.zjControl.getElectronicClaimsBillDirectory().then(res=>{
        this.dictionary = res.data
      })
    },
  },
  created() {
    this.getApi()
    this.getMyEbBillDictionary()
  },
};
</script>
