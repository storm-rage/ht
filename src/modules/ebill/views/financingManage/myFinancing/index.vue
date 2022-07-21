<template>
  <div>
    <zj-content-container>
      <!--  我的融资  -->
          <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
            <zj-list-layout>
<!--              <el-row>-->
<!--                <template name="rightBtns">-->
<!--                  <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch">重置</vxe-button>-->
<!--                  <vxe-button class="search" icon="el-icon-search" @click="search">查询</vxe-button>-->
<!--                </template>-->
<!--              </el-row>-->
              <template slot="searchForm">
                <el-form ref="searchForm" :model="searchForm">
                  <el-form-item label="融资流水号：">
                    <el-input v-model="searchForm.voucherCode" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="融资开始日：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.voucherDateStart"
                      :endDate.sync="searchForm.voucherDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="融资到期日：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.voucherDateStart"
                      :endDate.sync="searchForm.voucherDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="融资金额：">
                    <zj-amount-range :startAmt.sync="searchForm.ebillAmtStart" :endAmt.sync="searchForm.ebillAmtEnd"></zj-amount-range>
                  </el-form-item>
                  <el-form-item label="还款状态：">
                    <el-select v-model="searchForm.voucherCode">
                      <el-option label="全部"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </template>
              <zj-table ref="searchTable" :dataList="list" :radio-config="{highlight: true}">
                <zj-table-column title="融资流水号">
                  <template v-slot="{row}">
                    <zj-button type="text" @click="goChild('myFinancingDetail',row)">{{row.field1}}</zj-button>
                  </template>
                </zj-table-column>
                <zj-table-column field="field3" title="融资企业"/>
                <zj-table-column field="field3" title="融资产品名称"/>
                <zj-table-column field="field3" title="融资申请日期" :formatter="date"/>
                <zj-table-column field="field3" title="融资金额" :formatter="money"/>
                <zj-table-column field="field3" title="融资月利率" :formatter="rate"/>
                <zj-table-column field="field3" title="融资开始日" :formatter="date"/>
                <zj-table-column field="field3" title="融资到期日" :formatter="date"/>
                <zj-table-column field="field3" title="已还款本金" :formatter="money"/>
                <zj-table-column field="field3" title="已还款利息" :formatter="money"/>
                <zj-table-column field="field5" title="上次还款日期" :formatter="date"/>
                <zj-table-column field="field6" title="还款状态" :formatter="obj=>typeMap(dictionary,obj.cellValue)"/>
              </zj-table>
            </zj-list-layout>
          </div>
    </zj-content-container>
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
