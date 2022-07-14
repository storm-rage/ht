<template>
  <div>
  <zj-content-container>
    <!--  融资企业与签发企业/转让企业的贸易背景  -->
    <zj-content-block>
      <zj-content>
        <div class="zj-search-response">
          <zj-top-header title="融资企业与签发企业/转让企业的贸易背景"></zj-top-header>
          <zj-header title="凭证信息"></zj-header>
          <zj-table ref="searchTable" :dataList="list"  @radio-change="handleRadioChange" :radio-config="{highlight: true}">
            <zj-table-column type="radio" width="40"/>
            <zj-table-column field="field1" title="原始凭证编号"/>
            <zj-table-column field="field2" title="凭证编号"/>
            <zj-table-column field="field3" title="凭证签发人"/>
            <zj-table-column field="field5" title="转让企业"/>
            <zj-table-column field="field5" title="凭证金额" :formatter="money"/>
            <zj-table-column field="field5" title="凭证持有日期" :formatter="date"/>
            <zj-table-column field="field5" title="凭证到期日" :formatter="date"/>
          </zj-table>
        </div>
        <el-row>
          <zj-header title="贸易背景"></zj-header>
          <!--    贸易合同    -->
          <!--    发票信息    -->
          <!--    其他附件    -->
        </el-row>

      </zj-content>
    </zj-content-block>
  </zj-content-container>
  <el-row style="position: relative;margin-top: 20px;">
    <zj-content-footer>
      <zj-button class="submit-button" @click="maintainSuccess()">维护完成</zj-button>
      <zj-button class="submit-button" @click="goParent()">返回</zj-button>
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
          field5: '2022.09.08',
          state: '生效',
          fileName: '是'
        }
      ],
      tradeList: []
    };
  },
  methods: {
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
    download(){},
    maintainSuccess(){
      this.goParent()
    },
  }
};
</script>
<style lang="less" scoped>
.explain-text {
  display: flex;
  padding-bottom: 20px;
  background-color: rgba(2, 167, 240, 0);
  .explain-item {
    color: #555;
    font-size: 14px;
    margin-left: 20px;
  }
}


</style>
