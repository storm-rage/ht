<template>
  <zj-content-container>
    <!--  凭证融资  -->
      <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
        <zj-header title="请选择凭证签发人/转让企业"/>
        <el-form ref="searchEntForm" :model="searchEntForm">
          <el-form-item label="凭证签发人/转让企业：">
            <el-select v-model="searchEntForm.entState" @change="entChange">
              <el-option value="未登记" />
              <el-option value="已登记" />
            </el-select>
          </el-form-item>
        </el-form>
        <zj-header title="凭证信息"/>
        <zj-list-layout>
          <template slot="rightBtns">
            <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch()">重置</vxe-button>
            <vxe-button class="search" icon="el-icon-search" @click="search()">查询</vxe-button>
          </template>
          <template slot="searchForm">
            <el-form ref="searchForm" :model="searchForm">
              <el-form-item label="凭证持有日期：">
                <zj-date-range-picker
                  :startDate.sync="searchForm.holderDateStart"
                  :endDate.sync="searchForm.holderDateEnd"
                />
              </el-form-item>
              <el-form-item label="凭证到期日：">
                <zj-date-range-picker
                  :startDate.sync="searchForm.expireDateStart"
                  :endDate.sync="searchForm.expireDateEnd"
                />
              </el-form-item>
              <el-form-item label="凭证金额：">
                <zj-amount-range
                  :startAmt.sync="searchForm.ebillAmtStart"
                  :endAmt.sync="searchForm.ebillAmtEnd"
                  @keyupEnterNative="enterSearch"
                />
              </el-form-item>
              <el-form-item label="凭证编号：">
                <el-input v-model="searchForm.ebillCodeLike" @keyup.enter.native="search"/>
              </el-form-item>
            </el-form>
          </template>
          <zj-table ref="searchTable"
                    :api="zjControl.queryFinancingApplyBillPage"
                    :params="searchForm"
                    @radio-change="handleRadioChange"
                    :radio-config="{highlight: true}"
          >
            <zj-table-column type="checkbox" width="40"/>
            <zj-table-column field="ebillCode" title="债权凭证编号"/>
            <zj-table-column field="rootCode" title="原始债权凭证编号"/>
            <zj-table-column field="writerName" title="凭证签发人"/>
            <zj-table-column field="transferName" title="转让企业"/>
            <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money"/>
            <zj-table-column field="field5" title="剩余可用金额" :formatter="money"/>
            <zj-table-column field="holderDate" title="凭证持有日期" :formatter="date"/>
            <zj-table-column field="field7" title="凭证到期日" :formatter="date"/>
            <el-row slot="pager-left" class="slotRows" >
              凭证金额合计：{{moneyNoSynbol(detail.totalAmount)}}
              <span class="zj-m-l-10">已勾选凭证金额合计：{{moneyNoSynbol(' ')}}</span>
            </el-row>
          </zj-table>
        </zj-list-layout>
      </div>
  </zj-content-container>
</template>
<script>
export default {
  name: 'voucherFinancing',
  props: {
    zjControl: Object,
  },
  data() {
    return {
      searchEntForm: {
        entState: '',
      },
      searchForm: {
        holderDateStart: '',
        holderDateEnd: '',
        expireDateStart: '',
        expireDateEnd: '',
        ebillAmtStart: '',
        ebillAmtEnd: '',
        ebillCodeLike: '',
      },
      detail: {},
    };
  },
  methods: {
    toContractDetail(row) {
      console.error(row);
      this.$router.push({name: 'businessDetail'});
    },
    getDetail(){
      let params = {

      }
    },
    entChange() {
      console.log();
    },
    handleRadioChange({row}) {

    },
    toEditQuota (row) {},
    applyLoan () {},
  },
  created() {
    this.getApi()
  }
};
</script>
