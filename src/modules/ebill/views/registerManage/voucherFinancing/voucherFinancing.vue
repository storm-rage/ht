<template>
  <div>
    <zj-content-container>
      <!--  凭证融资  -->

      <zj-list-layout>
        <tempalte slot="searchForm">
          <el-form ref="searchForm" :model="searchForm">
            <el-form-item label="融资企业：">
              <el-input
                v-model="searchForm.supplierName"
                @keyup.enter.native="enterSearch"
              />
            </el-form-item>
            <el-form-item label="融资流水号：">
              <el-input
                v-model="searchForm.productName"
                @keyup.enter.native="enterSearch"
              />
            </el-form-item>
            <el-form-item label="登记状态：">
              <el-select v-model="searchForm.productState">
                <el-option value="未登记" />
                <el-option value="已登记" />
              </el-select>
            </el-form-item>
          </el-form>
        </tempalte>
          <zj-table ref="searchTable" :dataList="list"  @radio-change="handleRadioChange" :radio-config="{highlight: true}">
            <zj-table-column type="checkbox" width="40"/>
            <zj-table-column field="field1" title="融资流水号"/>
            <zj-table-column field="field2" title="融资企业"/>
            <zj-table-column field="field3" title="融资产品名称"/>
            <zj-table-column field="field4" title="融资申请金额"/>
            <zj-table-column field="field5" title="融资申请日期" :formatter="date"/>
            <zj-table-column field="field6" title="融资到期日"/>
            <zj-table-column field="field7" title="登记状态"/>
          </zj-table>
      </zj-list-layout>


    </zj-content-container>
    <el-row>
      <zj-content-footer>
        <zj-button class="submit-button" @click="zdRegister">中登登记</zj-button>
        <zj-button class="back" @click="applyLoan">申请放款</zj-button>
      </zj-content-footer>
    </el-row>

  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
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
    /**
     *
     * @param row
     */
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
    zdRegister () {},
    applyLoan () {},
  }
};
</script>
