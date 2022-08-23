<template>
  <zj-content-container>
    <!--  阶段性协议查询  -->
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="融资企业：">
            <el-input v-model.trim="searchForm.supplierName" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="融资到期日：">
            <zj-date-range-picker
              :startDate.sync="searchForm.lastTimeDateStart"
              :endDate.sync="searchForm.lastTimeDateEnd"
            />
          </el-form-item>
          <el-form-item label="融资申请金额：">
            <zj-amount-range :startAmt.sync="searchForm.ebillAmtStart" :endAmt.sync="searchForm.ebillAmtEnd"></zj-amount-range>
          </el-form-item>
          <el-form-item label="融资申请日期：">
            <zj-date-range-picker
              :startDate.sync="searchForm.lastTimeDateStart"
              :endDate.sync="searchForm.lastTimeDateEnd"
            />
          </el-form-item>
          <el-form-item label="融资申请流水号：">
            <el-input v-model.trim="searchForm.entName" @keyup.enter.native="enterSearch"/>
          </el-form-item>
        </el-form>
      </template>
      <zj-table ref="searchTable" :dataList="list"  @radio-change="handleRadioChange" :radio-config="{highlight: true}">
        <zj-table-column field="field1" title="融资流水号">
          <template v-slot="{row}">
            <zj-button type="text" @click="toDetail(row)">{{row.field1}}</zj-button>
          </template>
        </zj-table-column>
        <zj-table-column field="field1" title="融资企业"/>
        <zj-table-column field="field2" title="融资产品名称"/>
        <zj-table-column field="field3" title="融资申请金额" :formatter="money"/>
        <zj-table-column field="field3" title="融资申请日期" :formatter="date"/>
        <zj-table-column field="field5" title="融资到期日" :formatter="date"/>
        <zj-table-column field="field6" title="接收时间" :formatter="date"/>
        <zj-table-column title="操作" fixed="right" width="160">
          <template v-slot="{ row }">
            <zj-button type="text" @click="goChild('financingReviewToDoReview', row)">审核</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>

  </zj-content-container>
</template>
<script>
export default {
  props: {
    zjControl: Object,

  },
  data() {
    return {
      searchForm: {
        supplierName: '',
        supplierCode: '',
        lastTimeDateStart:'',
        lastTimeDateEnd:'',
        entName: '',
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
    maintain () {
      this.goChild('multistageAgreementMaintain')
    },
    toDetail (row) {
      this.goChild('financingReviewToDoDetail', row)
    },
    toEdit (row) {
      this.goChild('productInfoManageEdit', row)
    },
    toEditQuota (row) {},
  }
};
</script>
