<template>
  <zj-content-container>
    <!--  阶段性协议查询  -->
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="供应商名称：">
            <el-input v-model="searchForm.sellerNameLike" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="供应商编码：">
            <el-input v-model="searchForm.supplierCode" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="上次维护日期：">
            <zj-date-range-picker
              :startDate.sync="searchForm.stateChangeDatetimeBegin"
              :endDate.sync="searchForm.stateChangeDatetimeEnd"
            />
          </el-form-item>
          <el-form-item label="核心企业名称：">
            <el-input v-model="searchForm.buyerNameLike" @keyup.enter.native="enterSearch"/>
          </el-form-item>
        </el-form>
      </template>
      <zj-table ref="searchTable" :dataList="list" :params="searchForm" :api="zjControl.queryBackPhasedAgreePage"
      >
        <zj-table-column field="supplierCode" title="供应商编码"/>
        <zj-table-column field="sellerName" title="供应商名称"/>
        <zj-table-column field="buyerName" title="核心企业名称"/>
        <zj-table-column field="isHtEnterprise" title="核心企业是否海天集团"/>
        <zj-table-column field="cactoringLogo" title="订单保理标识"/>
        <zj-table-column field="tradeState" title="贸易关系状态"/>
        <zj-table-column field="stateChangedatetime" title="上次维护日期" :formatter="date"/>
        <zj-table-column title="操作" fixed="right" width="160">
          <template v-slot="{ row }">
            <zj-button type="text" @click="maintain(row)">维护</zj-button>
            <zj-button type="text" @click="toDetail(row)">详情</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>

  </zj-content-container>
</template>
<script>
export default {
  name:'multistageAgreementSearch',
  components: {

  },
  data() {
    return {
      zjControl :{
        queryBackPhasedAgreePage:this.$api.multistageAgreementManageWorkflow.queryBackPhasedAgreePage,//运营端-阶段性协议-列表查询
      },
      searchForm: {
        sellerNameLike: '',
        supplierCode: '',
        stateChangeDatetimeBegin:'',
        stateChangeDatetimeEnd:'',
        buyerNameLike: '',
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
    toContractDetail(row) {
      console.error(row);
      this.$router.push({name: 'businessDetail'});
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
    maintain(row) {
      this.goChild('multistageAgreementMaintain', row)
    },
    toDetail(row) {
      this.goChild('multistageAgreementDetail', row)
    },
  }
};
</script>
