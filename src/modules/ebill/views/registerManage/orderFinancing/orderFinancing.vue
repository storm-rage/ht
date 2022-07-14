<template>
  <zj-content-container>
    <!--  订单融资  -->
    <zj-list-layout>
      <tempalte slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="供应商名称：">
            <el-input
              v-model="searchForm.supplierName"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="核心企业：">
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
        <zj-table-column field="field1" title="供应商名称"/>
        <zj-table-column field="field2" title="核心企业"/>
        <zj-table-column field="field3" title="保理标识"/>
        <zj-table-column field="field4" title="贸易关系状态"/>
        <zj-table-column field="field5" title="应收账款转让期限" :formatter="date"/>
        <zj-table-column field="field6" title="授信额度"/>
        <zj-table-column field="field6" title="额度期限（月）"/>
        <zj-table-column field="field7" title="登记状态"/>
        <zj-table-column title="操作" fixed="right" width="160">
          <template v-slot="{ row }">
            <zj-button type="text" @click="toEdit(row)">详情</zj-button>
            <zj-button type="text" @click="toEdit(row)">中登网登记</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>

  </zj-content-container>
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
  }
};
</script>
