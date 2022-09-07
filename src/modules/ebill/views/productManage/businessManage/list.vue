<template>
  <zj-content-container>
    <!--  业务管理列表  -->
    <zj-content-block>
      <zj-content>
        <zj-list-layout noBottomBorder>
          <template slot="rightBtns">
            <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch()">重置</vxe-button>
            <vxe-button class="search" icon="el-icon-search" @click="search(true,'searchContractTable')">查询</vxe-button>
          </template>
          <template slot="searchForm">
            <el-form ref="searchForm" :model="searchForm">
              <el-form-item label="供应商名称：">
                <el-input
                  v-model.trim="searchForm.sellerNameLike"
                  @keyup.enter.native="enterSearch"
                />
              </el-form-item>
              <el-form-item label="是否海天一级供应商：">
                <el-select v-model="searchForm.isHtEnterprise">
                  <el-option value="" label="全部"></el-option>
                  <el-option
                    v-for="item in dictionary.isHtEnterprise"
                    :key="`${item.code}isHtEnterprise`"
                    :label="item.desc"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="产品申请日期：" class="col-right">
                <zj-date-range-picker
                  :startDate.sync="searchForm.productApplyDateStart"
                  :endDate.sync="searchForm.productApplyDateEnd"
                />
              </el-form-item>
              <el-form-item label="供应商统一社会信用代码：">
                <el-input
                  v-model.trim="searchForm.bizLicence"
                  @keyup.enter.native="enterSearch"
                />
              </el-form-item>
              <el-form-item label="是否签署保理合同：">
                <el-select v-model="searchForm.isFactoringContract">
                  <el-option value="" label="全部"></el-option>
                  <el-option
                    v-for="item in dictionary.isFactoringContract"
                    :key="`${item.code}isFactoringContract`"
                    :label="item.desc"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>
          <zj-table ref="searchContractTable"
                    :api="zjControl.contractTableApi"
                    row-id="id"
                    :params="searchForm"
                    @after-load="handleDataChange"
                    @radio-change="handleRadioChange"
                    :radio-config="{highlight: true}">
            <zj-table-column type="radio" width="50"/>
            <zj-table-column field="sellerName" title="供应商名称"/>
            <zj-table-column field="isHtEnterprise" title="是否海天一级供应商" :formatter="(obj) => typeMap(dictionary.isHtEnterprise, obj.cellValue)"/>
            <zj-table-column
              field="sellerCode"
              title="供应商业务系统编码"
            />
            <zj-table-column
              field="bizLicence"
              title="供应商统一社会信用代码"
            />
            <zj-table-column field="productType" title="开通产品" width="160px">
              <template v-slot="{row,rowIndex}">
                <div v-if="row.productType">
                  <el-tag v-for="(item,index) in row.productType.split(',')" size="mini" :key="`${rowIndex}${index}productType`">
                    {{typeMap(dictionary.productType,item)}}
                  </el-tag>
                </div>
              </template>
            </zj-table-column>
            <zj-table-column field="productApplyDatetime" title="产品申请时间"/>
            <zj-table-column field="isFactoringContract" title="是否签署保理合同" :formatter="(obj) => typeMap(dictionary.isFactoringContract, obj.cellValue)"/>
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{ row }">
                <zj-button type="text" :api="zjBtn.getBusinessParamDetail" @click="toContractDetail(row)">详情</zj-button>
                <zj-button type="text" v-if="row.isFactoringContract==='1'" :api="zjBtn.applyContractRenewal" @click="toContractSign(row)">合同续签</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-list-layout>
      </zj-content>
    </zj-content-block>
    <!--  贸易关系  -->
    <zj-content-block v-if="currentContractRow.id">
      <zj-header title="贸易关系"></zj-header>
      <zj-content>
        <zj-table ref="searchTradeTable" :pager="false" :dataList="tradeList">
          <zj-table-column field="buyerName" title="核心企业名称"/>
          <zj-table-column field="isHtEnterprise" title="核心企业是否海天集团" :formatter="(obj) => typeMap(dictionary.isHtEnterprise, obj.cellValue)"/>
          <zj-table-column
            field="bizLicence"
            title="核心企业统一社会信用代码"/>
          <zj-table-column
            field="cactoringLogo"
            title="保理标识" :formatter="(obj) => typeMap(dictionary.cactoringLogo, obj.cellValue)"/>
          <zj-table-column field="settlementCycle" title="结算周期" :formatter="(obj) => typeMap(dictionary.settlementCycle, obj.cellValue)"/>
          <zj-table-column field="totalCreditAmount" title="供应商总额度" :formatter="money"/>
          <zj-table-column field="estimatedAnnualProcurementAmount" title="预计年采购金额" :formatter="money"/>
          <zj-table-column field="state" title="贸易关系状态" :formatter="(obj) => typeMap(dictionary.state, obj.cellValue)"/>
          <zj-table-column width="230" title="操作" fixed="right">
            <template v-slot="{ row }">
              <!--贸易关系状态为“正常”时，才展示维护和额度管理-->
              <template v-if="row.state === '1'">
                <zj-button type="text" :api="zjBtn.maintainTradeRelation" @click="toMaintenance(row)">维护</zj-button>
                <zj-button type="text" v-if="isDDBL" :api="zjBtn.applyLimit" @click="toMaintenanceQuota(row, 'EDBG')">额度维护</zj-button>
                <zj-button type="text" v-if="isDDBL" :api="zjBtn.applyLimit" @click="toMaintenanceQuota(row, 'EDXQ')">额度续签</zj-button>
              </template>
              <template v-else>
                ——
              </template>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </zj-content-container>
</template>
<script>
import {ProductType} from '@modules/constant.js';

export default {
  data() {
    return {
      zjControl: {
        contractTableApi: this.$api.businessManage.queryBusinessParamPage,
        tradeTableApi: this.$api.businessManage.getTradeRelationList,
        getDataDirectory: this.$api.businessManage.getDataDirectory,
        getBusinessParamDetail: this.$api.businessManage.getBusinessParamDetail,
        applyContractRenewal: this.$api.businessManage.applyContractRenewal,
        applyLimit: this.$api.businessManage.applyLimit,
        maintainTradeRelation: this.$api.businessManage.maintainTradeRelation
      },
      searchForm: {
        sellerNameLike: '',
        isHtEnterprise: '',
        productApplyDateStart: '',
        productApplyDateEnd: '',
        bizLicence: '',
        isFactoringContract: ''
      },
      // 默认勾选第一个供应商
      defaultSelectRowId: '',
      // 选中当前行
      currentContractRow: {},
      // 贸易关系查询的参数
      tradeParams: {},
      // 字典
      dictionary: {},
      // 贸易关系列表
      tradeList: []
    };
  },
  computed: {
    // 订单保理
    isDDBL () {
      return this.currentContractRow.productType&&this.currentContractRow.productType.indexOf(ProductType.DDBL)>=0;
    }
  },
  created() {
    this.getApi();
    this.zjControl.getDataDirectory().then(res => {
      this.dictionary = res.data
      this.$nextTick(() => {
        if (this.$refs.searchContractTable) {
          console.log('hhhh')
          this.$refs.searchContractTable.refreshColumn();
        }
      })
    })
  },
  methods: {
    beforeSearch() {
      this.defaultSelectRowId = '';
      this.currentContractRow = {};
    },
    /**
     * 列表查询响应回调
     * @param rows
     */
    handleDataChange(rows) {
      //默认勾选第一个供应商
      if (rows&& rows.length) {
        this.$refs.searchContractTable.setRadioRow(rows[0])
        this.handleRadioChange({row: rows[0]})
        // if (this.defaultSelectRowId) {
        //
        // }else {
        //   this.defaultSelectRowId = rows[0].id
        //   this.handleRadioChange({row: rows[0]})
        // }
      }
    },
    /**
     *合同详情
     * @param row
     */
    toContractDetail(row) {
      this.goChild('businessDetail',{id: row.id});
    },
    /**
     *合同续签
     * @param row
     */
    toContractSign(row) {
      this.goChild('contractReSign',{id: row.id});
    },
    handleRadioChange({row}) {
      this.currentContractRow = row;
      this.tradeParams.id = row.id;
      this.getTradeList();
    },
    /**
     * 出现贸易关系列表
     */
    getTradeList () {
      this.zjControl.tradeTableApi(this.tradeParams).then(res => {
        if (res.success) {
          this.tradeList = res.data.tradeRelationModelList;
        }
      });
    },
    /**
     * 单个贸易关系维护
     * @param row
     */
    toMaintenance (row) {
      this.goChild('tradeRelationMaintenance',{id: this.currentContractRow.id,busTradeId:row.busTradeId,tradeId:row.tradeId});
    },
    /**
     * 额度管理
     * @param row
     */
    toMaintenanceQuota (row,applyType) {
      this.goChild('quotaMaintenance',{id: this.currentContractRow.id,busTradeId:row.busTradeId,tradeId:row.tradeId, applyType});
    },
  }
};
</script>
