<template>
  <div>
    <zj-content-container>
      <!--  业务情况报表  -->
      <zj-list-layout>
        <template slot="leftBtns">
          <vxe-button class="export" icon="el-icon-download" @click="toExport">导出</vxe-button>
        </template>
        <tempalte slot="searchForm">
          <el-form ref="searchForm" :model="searchForm">
            <el-form-item label="统计月份：">
              <zj-date-picker v-model="searchForm.statisticsMonth" @keyup.enter.native="enterSearch"/>
            </el-form-item>
          </el-form>
        </tempalte>
          <zj-table ref="searchTable" :dataList="list">
            <zj-table-column type="seq" title="序号" width="60"/>
            <zj-table-column field="field1" title="供应商名称"/>
            <zj-table-column field="field2" title="是否一级供应商"/>
            <zj-table-column field="field3" title="核心企业名称"/>
            <zj-table-column field="field4" title="本月融资金额" :formatter="money"/>
            <zj-table-column field="field5" title="上月融资金额" :formatter="money"/>
            <zj-table-column field="field6" title="融资余额环比"/>
            <zj-table-column field="field7" title="本月签收凭证金额" :formatter="money"/>
            <zj-table-column field="field7" title="上月签收凭证金额" :formatter="money"/>
            <zj-table-column field="field7" title="签收凭证金额环比"/>
            <zj-table-column field="field7" title="本月转让凭证金额" :formatter="money"/>
            <zj-table-column field="field7" title="上月转让凭证金额" :formatter="money"/>
            <zj-table-column field="field7" title="转让凭证金额环比"/>
            <zj-table-column field="field7" title="本月利息费用" :formatter="money"/>
            <zj-table-column field="field7" title="上月利息费用" :formatter="money"/>
            <zj-table-column field="field7" title="利息费用环比"/>
            <zj-table-column field="field7" title="融资余额" :formatter="money"/>
            <zj-table-column field="field7" title="截至本月全年融资金额" :formatter="money"/>
            <zj-table-column field="field7" title="截至本月全年凭证签收金额" :formatter="money"/>
            <zj-table-column field="field7" title="截至本月全年利息费用" :formatter="money"/>
          </zj-table>
      </zj-list-layout>
    </zj-content-container>

  </div>
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
      tradeList: []
    };
  },
  methods: {
    toExport() {},
  }
};
</script>
