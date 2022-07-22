<template>
    <zj-content-container>
      <!--  电子债权凭证资详情  -->
      <zj-top-header :title="titleInfo"></zj-top-header>
      <h3 class="zj-center" v-if="workflow === 'pzxx'">融单编号：{{}}</h3>
      <zj-content-block v-if="workflow === 'pzxx'">
        <bill-detail/>
      </zj-content-block>

      <zj-content-block v-if="workflow === 'mybj'">
        <el-content-block>
          <zj-header title="凭证信息"/>
          <zj-table ref="searchTable" class="zj-search-table" :dataList="list" :radio-config="{highlight: true}"
          >
            <zj-table-column field="voucherNo" title="凭证编号" />
            <zj-table-column field="voucherNo" title="原始凭证编号" />
            <zj-table-column field="voucherSigner" title="凭证签发人" />
            <zj-table-column field="entName" title="转让企业" />
            <zj-table-column field="voucherAcc" title="签发日期" :formatter="date"/>
            <zj-table-column field="voucherAcc" title="凭证金额" :formatter="money"/>
            <zj-table-column field="voucherAcc" title="凭证到期日" :formatter="date"/>
          </zj-table>
        </el-content-block>
        <el-content-block>
          <zj-header title="对账单信息-${}"/>
          <zj-table ref="searchTable" :dataList="list"  :radio-config="{highlight: true}">
            <zj-table-column field="field2" title="对账单名称"/>
            <zj-table-column field="field3" title="买方名称"/>
            <zj-table-column field="field5" title="供应商业务系统编码"/>
            <zj-table-column field="field5" title="供应商名称"/>
            <zj-table-column field="field5" title="对账日期" :formatter="date"/>
            <zj-table-column field="field5" title="入库日期" :formatter="date"/>
            <zj-table-column field="field5" title="预计付款日期" :formatter="date"/>
            <zj-table-column field="field5" title="对账单金额" :formatter="money"/>
            <zj-table-column field="field5" title="是否申请开立债权凭证" :formatter="(obj)=>typeMap(dictionary,obj.cellValue)"/>
            <zj-table-column field="field5" title="对账人" />
            <zj-table-column field="field5" title="对账单来源" />
          </zj-table>
        </el-content-block>
        <el-content-block>
          <zj-header title="对账单明细-${}"/>
          <zj-table ref="searchTable" :dataList="list"  :radio-config="{highlight: true}">
            <zj-table-column field="field2" title="对账单名称"/>
            <zj-table-column field="field3" title="买方名称"/>
            <zj-table-column field="field5" title="供应商业务系统编码"/>
            <zj-table-column field="field5" title="供应商名称"/>
            <zj-table-column field="field5" title="对账日期" :formatter="date"/>
            <zj-table-column field="field5" title="入库日期" :formatter="date"/>
            <zj-table-column field="field5" title="预计付款日期" :formatter="date"/>
            <zj-table-column field="field5" title="对账单金额" :formatter="money"/>
            <zj-table-column field="field5" title="是否申请开立债权凭证" :formatter="(obj)=>typeMap(dictionary,obj.cellValue)"/>
            <zj-table-column field="field5" title="对账人" />
            <zj-table-column field="field5" title="对账单来源" />
          </zj-table>
        </el-content-block>
        <el-content-block>
          <zj-header title="贸易背景资料（资产编号：12345）"/>
          <el-tabs v-model="tabs" type="card" class="zj-tabs-card">
            <el-tab-pane label="贸易合同信息" name="tradeContract" >
              <trade-contract :zjControl="zjControl" :uDictionary="uDictionary" :uBtn="zjBtn" />
            </el-tab-pane>
            <el-tab-pane label="发票信息" name="invoice" >
              <invoice />
            </el-tab-pane>
            <el-tab-pane label="其他附件" name="attaList" >
              <attaList />
            </el-tab-pane>
          </el-tabs>
        </el-content-block>
      </zj-content-block>

      <zj-content-block v-if="workflow === 'lzgj'">
        <!--    流转轨迹    -->
        <locus/>
      </zj-content-block>

      <!-- 底部工作流状态 -->
      <zj-workflow v-model="workflow" :list="workflowList">
        <!-- 审核时 -->
        <el-row slot="right">
          <el-row class="btn-w85 zj-center">
            <zj-button class="back" @click="goParent">返回</zj-button>
          </el-row>
        </el-row>
      </zj-workflow>

    </zj-content-container>
</template>

<script>
import billDetail from './components/billDetail'
import locus from './components/locus'

import tradeContract from '../../queryStatistics/financingTransactionQuery/tradeBackgroundInfo/tradeContract'
import invoice from '../../queryStatistics/financingTransactionQuery/tradeBackgroundInfo/invoice'
import attaList from '../../queryStatistics/financingTransactionQuery/tradeBackgroundInfo/attaList'
export default {
  name: "billLssueMyBillDetail",
  components: {
    billDetail,
    locus,
    tradeContract,
    invoice,
    attaList,
  },
  computed: {
    titleInfo() {
      return this.workflow === 'lzgj'?'电子凭证流转轨迹':this.workflow === 'pzxx'||'mybj'?'电子债权凭证详情':''
    }
  },
  data() {
    return {
      form:{},
      detail:{},
      tabs:'tradeContract',
      zjControl: {},
      uDictionary:{},
      mDictionary:{},
      workflow: 'pzxx',
      workflowList: [
        { label: '凭证详情', value: 'pzxx' }, { label: '贸易背景', value: 'mybj' }, { label: '流转轨迹', value: 'lzgj' },
      ],
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

    }
  },
  methods: {
    agreementDownLoad() {

    },
    attaDownLoad() {},
    submit(){
      this.$refs.submitDialog.open({form: this.form}, true)
    },
  }
}
</script>

<style scoped lang="less">
.quota-manage {
  height: 40px;
  line-height:40px;
  text-align: right;
  margin-bottom: 20px;
  color: #e6a23c;
  background-color: #fdf6ec;
}
.financingForm {
  margin-top: 20px;
}
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
.hd-row {
  position: relative;
  &:after {
    position: absolute;
    top: 36px;
    left: 0;
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #cbcbcb;
  }
}

</style>
