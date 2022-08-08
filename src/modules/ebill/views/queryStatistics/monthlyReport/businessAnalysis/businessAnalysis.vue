<template>
  <zj-content-container>
    <!--  业绩集中度分析  -->
    <zj-list-layout>
      <template slot="leftBtns">
        <vxe-button class="export" icon="el-icon-download" @click="toExport">导出</vxe-button>
      </template>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="统计月份：">
            <zj-date-picker v-model="searchForm.statisticsMonth" @keyup.enter.native="enterSearch"/>
          </el-form-item>
        </el-form>
      </template>
      <zj-table ref="searchTable" :dataList="list">
        <zj-table-column type="seq" title="序号" width="60"/>
        <zj-table-column v-for="(item,index) in tableProps" :key="index" :field="item.field" :title="item.title" :formatter="item.formatter"/>
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
        statisticsMonth: '',
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
      tableProps: [
        {title: "核心企业名称", field: "field1"},
        {title: "本期末对其债权金额", field: "field2"},
        {title: "上期末对其债权金额", field: "field3"},
        {title: "本期末债权占比", field: "field4"},  
        {title: "供应商名称", field: "field5"},
        {title: "本期末融资余额", field: "field6"},
        {title: "上期末融资余额", field: "field7"},
        {title: "本期末融资余额占比", field: "field8"},
        {title: "供应商授信额度", field: "field9"},
      ],
      tradeList: []
    };
  },
  methods: {
    toExport() {

    },
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
