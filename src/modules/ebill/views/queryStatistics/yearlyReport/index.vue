<template>
  <div>
    <zj-content-container>
      <!--  年度报表  -->
      <zj-list-layout>
        <template slot="leftBtns">
          <vxe-button class="export" icon="el-icon-download" @click="toExport">导出</vxe-button>
        </template>
        <template slot="searchForm">
          <el-form ref="searchForm" :model="searchForm">
            <el-form-item label="统计年份：">
              <el-select v-model="searchForm.statisticsYear" filterable @change="enterSearch" placeholder="请选择" class="sw-year-select"
                         :popper-append-to-body="false"
              >
                <el-option
                  v-for="item in yearsList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </template>
          <zj-table ref="searchTable" :dataList="list">
            <zj-table-column type="seq" title="序号" width="60"/>
            <zj-table-column field="field1" title="供应商名称"/>
            <zj-table-column field="field2" title="供应商名称"/>
            <zj-table-column field="field3" title="核心企业名称"/>
            <zj-table-column field="field4" title="融资金额" :formatter="money">
              <zj-table-column field="field4" title="本年" :formatter="money"/>
              <zj-table-column field="field5" title="上年" :formatter="money"/>
              <zj-table-column field="field6" title="同比"/>
            </zj-table-column>
            <zj-table-column field="field7" title="签收凭证金额" :formatter="money">
              <zj-table-column field="field7" title="本年" :formatter="money"/>
              <zj-table-column field="field7" title="上年" :formatter="money"/>
              <zj-table-column field="field7" title="同比"/>
            </zj-table-column>
            <zj-table-column field="field7" title="转让凭证金额" :formatter="money">
              <zj-table-column field="field7" title="本年" :formatter="money"/>
              <zj-table-column field="field7" title="上年" :formatter="money"/>
              <zj-table-column field="field7" title="同比"/>
            </zj-table-column>
            <zj-table-column field="field7" title="利息费用" :formatter="money">
              <zj-table-column field="field7" title="本年" :formatter="money"/>
              <zj-table-column field="field7" title="上年" :formatter="money"/>
              <zj-table-column field="field7" title="同比"/>
            </zj-table-column>
            <zj-table-column field="field7" title="本年融资金额"/>
            <zj-table-column field="field7" title="本年凭证签收金额"/>
            <zj-table-column field="field7" title="本年利息费用"/>
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
        statisticsYear: '',
      },
      yearsList: [],
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
