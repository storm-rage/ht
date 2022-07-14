<template>
  <div>
    <zj-content-container>
      <!--  凭证融资  -->
          <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
            <zj-header title="请选择凭证签发人/转让企业"></zj-header>
            <el-form ref="searchEntForm" :model="searchEntForm">
              <el-form-item label="凭证签发人/转让企业：">
                <el-select v-model="searchEntForm.entState" @change="entChange">
                  <el-option value="未登记" />
                  <el-option value="已登记" />
                </el-select>
              </el-form-item>
            </el-form>

            <zj-header title="凭证信息"></zj-header>
            <zj-list-layout>
              <template slot="searchForm">
                <el-form ref="searchForm" :model="searchForm">
                  <el-form-item label="凭证持有日期：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.voucherDateStart"
                      :endDate.sync="searchForm.voucherDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="凭证到期日：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.voucherExpiredDateStart"
                      :endDate.sync="searchForm.voucherExpiredDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="凭证金额：">
                    <zj-number-input :precision="2" v-model="searchForm.voucherAccout"/>
<!--                    <div class="zj-inline zj-center zj-w-20">至</div>-->
<!--                    <zj-number-input :precision="2" v-model="searchForm.voucherAccout"/>-->
                  </el-form-item>
                  <el-form-item label="凭证编号：">
                    <el-input v-model="searchForm.voucherCode" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                </el-form>

              </template>
              <zj-table ref="searchTable" :dataList="list"  @radio-change="handleRadioChange" :radio-config="{highlight: true}">
                <zj-table-column type="checkbox" width="40"/>
                <zj-table-column field="field1" title="融资流水号"/>
                <zj-table-column field="field2" title="融资企业"/>
                <zj-table-column field="field3" title="融资产品名称"/>
                <zj-table-column field="field4" title="融资申请金额"/>
                <zj-table-column field="field5" title="融资申请日期" :formatter="date"/>
                <zj-table-column field="field6" title="融资到期日"/>
                <zj-table-column field="field7" title="登记状态"/>
                <el-row slot="pager-left" class="slotRows" >
                  凭证金额合计：{{moneyNoSynbol(' ')}}
                  <span class="zj-m-l-10">已勾选凭证金额合计：{{moneyNoSynbol(' ')}}</span>
                </el-row>
              </zj-table>
            </zj-list-layout>
          </div>
    </zj-content-container>
    <el-row style="position: relative;margin-top: 20px;">
      <zj-content-footer>
        <zj-button class="submit-button" @click="goChild('voucherFinancingDetail')">下一步</zj-button>
      </zj-content-footer>
    </el-row>

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
    toEditQuota (row) {},
    applyLoan () {},
  }
};
</script>
