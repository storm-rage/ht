<template>
  <div>
    <zj-content-container>
      <!--  入库融资申请/凭证融资申请  -->
      <zj-top-header title="入库融资申请/凭证融资申请"></zj-top-header>
      <el-row>
        <zj-header title="凭证信息"/>
        <zj-table ref="searchTable" class="zj-search-table" :dataList="list" :radio-config="{highlight: true}"
        >
          <zj-table-column type="radio" width="40"/>
          <zj-table-column field="voucherNo" title="凭证编号" />
          <zj-table-column field="voucherSigner" title="凭证签发人" />
          <zj-table-column field="entName" title="转让企业" />
          <zj-table-column field="voucherAcc" title="签发日期" :formatter="date"/>
          <zj-table-column field="voucherAcc" title="凭证金额" :formatter="money"/>
          <zj-table-column field="voucherAcc" title="凭证到期日" :formatter="date"/>
          <el-row slot="pager-left" class="slotRows" >
            凭证金额合计：{{moneyNoSynbol(' ')}}
          </el-row>
        </zj-table>
      </el-row>
      <el-row>
        <zj-header title="对账单信息-${}"></zj-header>
        <zj-table ref="searchTable" :dataList="list"  :radio-config="{highlight: true}">
          <zj-table-column type="radio" width="40"/>
          <zj-table-column field="field2" title="对账单"/>
          <zj-table-column field="field3" title="买方名称"/>
          <zj-table-column field="field5" title="供应商编码"/>
          <zj-table-column field="field5" title="供应商名称"/>
          <zj-table-column field="field5" title="对账日期" :formatter="date"/>
          <zj-table-column field="field5" title="入库日期/放行日期" :formatter="date"/>
          <zj-table-column field="field5" title="预计付款日期" :formatter="date"/>
          <zj-table-column field="field5" title="对账单金额" :formatter="money"/>
          <zj-table-column field="field5" title="是否申请开立债权凭证" :formatter="(obj)=>typeMap(dictionary,obj.cellValue)"/>
          <zj-table-column field="field5" title="对账单来源" />
        </zj-table>
      </el-row>
      <el-row>
        <zj-header title="贸易背景资料（对账单编号：12345）"/>
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
      </el-row>

    </zj-content-container>
    <el-row style="position: relative;margin-top: 20px;">
      <zj-content-footer>
        <zj-button class="submit-button" @click="goParent">上一步</zj-button>
        <zj-button class="submit-button" @click="submit">提交申请</zj-button>
      </zj-content-footer>
    </el-row>
    <submit-dialog ref="submitDialog"/>

  </div>
</template>

<script>
import submitDialog from './submitDialog'
import tradeContract from './tradeBackgroundInfo/tradeContract'
import invoice from './tradeBackgroundInfo/invoice'
import attaList from './tradeBackgroundInfo/attaList'

export default {
  name: "detail",
  components: {
    submitDialog,tradeContract,invoice,attaList
  },

  data() {
    return {
      form:{},
      detail:{},
      zjControl:{},
      dictionary:{},
      uDictionary:{},
      tabs:'tradeContract',
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
