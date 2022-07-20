<template>
  <div>
    <zj-content-container>
      <!--  融资复核  -->
          <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
            <zj-list-layout>
              <template slot="searchForm">
                <el-form ref="searchForm" :model="searchForm">
                  <el-form-item label="融资流水号：">
                    <el-input v-model="searchForm.voucherCode" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="融资申请日期：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.voucherDateStart"
                      :endDate.sync="searchForm.voucherDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="融资到期日期：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.voucherExpiredDateStart"
                      :endDate.sync="searchForm.voucherExpiredDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="融资申请金额：">
                    <zj-amount-range :startAmt.sync="searchForm.ebillAmtStart" :endAmt.sync="searchForm.ebillAmtEnd"></zj-amount-range>
                  </el-form-item>
                </el-form>
              </template>
              <zj-table ref="searchTable" :dataList="list" :radio-config="{highlight: true}">
                <zj-table-column field="field1" title="融资流水号"/>
                <zj-table-column field="field3" title="融资产品名称"/>
                <zj-table-column field="field3" title="融资企业名称"/>
                <zj-table-column field="field4" title="融资申请金额"/>
                <zj-table-column field="field5" title="融资申请日期" :formatter="date"/>
                <zj-table-column field="field6" title="融资到期日" :formatter="date"/>
                <zj-table-column  title="操作" fixed="right">
                  <template v-slot="{row}">
                    <zj-button type="text" @click="review(row)">复核</zj-button>
                  </template>
                </zj-table-column>
              </zj-table>
            </zj-list-layout>
          </div>
    </zj-content-container>
<!--    <el-row style="position: relative;margin-top: 20px;">-->
<!--      <zj-content-footer>-->
<!--        <zj-button class="submit-button" @click="goChild('voucherFinancingDetail')">下一步</zj-button>-->
<!--      </zj-content-footer>-->
<!--    </el-row>-->

  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      searchEntForm: {
        entState: '',
      },
      searchForm: {
        supplierName: '',
        businessType: '',
        productType: '',
        productNo: '',
        productState: '',
      },
      list: [
        {
          field1: 'scm00001',
          field2: '某某产品一号',
          field3: '上游',
          field4: '订单保理',
          field5: '2022.09.08 11:18:19',
          field6: '生效',
          field7: '是'
        }
      ],
      tradeList: []
    };
  },
  methods: {
    /**
     *
     * @param row
     */
    toContractDetail(row) {
      console.error(row);
      this.$router.push({name: 'businessDetail'});
    },
    //凭证签发人/转让企业改变事件
    entChange(){

    },
    toContractSign(row) {
      console.log(row);
    },
    handleRadioChange({row}) {
      this.tradeList.push({
        field1: '佛山市a有限公司',
        field2: '是',
        field3: '756756756767',
        field4: '非保理',
        field5: '12',
        field6: '1000',
        field7: '2000',
        field8: '正常'
      })
    },
    toDetail (row) {
      this.goChild('productInfoManageDetail', row)
    },
    toEdit (row) {
      this.goChild('productInfoManageEdit', row)
    },
    review(row) {
      this.goChild('orderFinancingReview', row)
    },
  }
};
</script>
