<template>
  <zj-content-container>
    <!--  业务管理列表  -->
    <zj-content-block>
      <zj-content>
        <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
          <el-row class="button-row">
            <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch">重置</vxe-button>
            <vxe-button class="search" icon="el-icon-search" @click="search">查询</vxe-button>
          </el-row>
          <el-form ref="searchForm" :model="searchForm">
            <el-form-item label="供应商名称：">
              <el-input
                v-model="searchForm.issueEntName"
                @keyup.enter.native="enterSearch"
              />
            </el-form-item>
            <el-form-item label="是否海天一级供应商：">
              <el-select v-model="searchForm.issueEntName">
                <el-option value="全部" />
              </el-select>
            </el-form-item>
            <el-form-item label="产品申请日期：" class="col-right">
              <zj-date-range-picker
                :startDate.sync="searchForm.expireDateStart"
                :endDate.sync="searchForm.expireDateEnd"
              />
            </el-form-item>
            <el-form-item label="供应商统一社会信用代码：">
              <el-input
                v-model="searchForm.issueEntName"
                @keyup.enter.native="enterSearch"
              />
            </el-form-item>
            <el-form-item label="是否签署保理合同：">
              <el-select v-model="searchForm.issueEntName">
                <el-option value="全部" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="zj-search-response">
          <zj-table ref="searchContractTable"  :dataList="list"  @radio-change="handleRadioChange" :radio-config="{highlight: true}">
            <zj-table-column type="radio"  width="50"/>
            <zj-table-column field="field1" title="供应商名称"/>
            <zj-table-column field="field2" title="是否海天一级供应商"/>
            <zj-table-column
              field="field3"
              title="供应商业务系统编码"
            />
            <zj-table-column
              field="field4"
              title="供应商统一社会信用代码"
            />
            <zj-table-column field="field5" title="开通产品"/>
            <zj-table-column field="field6" title="产品申请时间"/>
            <zj-table-column field="field7" title="是否签署保理合同"/>
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{ row }">
                <zj-button type="text" @click="toContractDetail(row)">详情</zj-button>
                <zj-button type="text" @click="toContractSign(row)">合同续签</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </div>
      </zj-content>
    </zj-content-block>
    <!--  贸易关系  -->
    <zj-content-block>
      <zj-header title="贸易关系"></zj-header>
      <zj-content>
        <zj-table ref="searchContractTable"  :dataList="tradeList">
          <zj-table-column field="field1" title="核心企业名称"/>
          <zj-table-column field="field2" title="核心企业是否海天集团"/>
          <zj-table-column
            field="field3"
            title="核心企业统一社会信用代码"/>
          <zj-table-column
            field="field4"
            title="保理标识"/>
          <zj-table-column field="field5" title="结算周期"/>
          <zj-table-column field="field6" title="供应商总额度" :formatter="money"/>
          <zj-table-column field="field7" title="预计年采购金额" :formatter="money"/>
          <zj-table-column field="field8" title="贸易关系状态"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="toMaintenance(row)">维护</zj-button>
              <zj-button type="text" @click="toMaintenanceQuota(row)">额度管理</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </zj-content-container>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      searchForm: {},
      list: [
        {
          field1: '佛山市a有限公司',
          field2: '是',
          field3: 'scm00001',
          field4: '756756756767',
          field5: '订单保理',
          field6: '2022.09.08 11:18:19',
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
      this.$router.push({name: 'contractReSign'});
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
    toMaintenance (row) {
      this.$router.push({name: 'tradeRelationMaintenance'})
    },
    toMaintenanceQuota (row) {
      this.$router.push({name: 'quotaMaintenance'})
    },
  }
};
</script>
