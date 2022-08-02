<template>
  <div>
    <zj-content-container>
      <!--  凭证签收  -->
          <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
            <zj-list-layout>
              <template slot="searchForm">
                <el-form ref="searchForm" :model="searchForm">
                  <el-form-item label="凭证开立/转让日期：">
                    <zj-date-range-picker
                      :startDate.sync="searchForm.stateChangeDateStart"
                      :endDate.sync="searchForm.stateChangeDateEnd"
                    ></zj-date-range-picker>
                  </el-form-item>
                  <el-form-item label="签发人/转让方：">
                    <el-input v-model="searchForm.fromEntNameLike" @keyup.enter.native="search"></el-input>
                  </el-form-item>
                  <el-form-item label="凭证金额：">
                    <zj-amount-range :startAmt.sync="searchForm.ebillAmt" :endAmt.sync="searchForm.ebillAmt"></zj-amount-range>
                  </el-form-item>
                  <el-form-item label="签收类型：">
                    <el-select v-model="searchForm.operType">
                      <el-option label="全部" value=""></el-option>
                      <el-option
                        v-for="item in dictionary.openType"
                        :label="item.desc"
                        :value="item.code"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-form>
              </template>
<!--              <zj-table ref="searchTable" :api="zjControl.queryBillSignPage" :params="{searchForm}" :dataList="list">-->
              <zj-table ref="searchTable"  :dataList="list">
                <zj-table-column field="ebillCode" title="凭证编号"/>
                <zj-table-column field="fromEntName" title="签发人/转让方"/>
                <zj-table-column field="operType" title="签收类型" :formatter="obj=>typeMap(dictionary.openType,obj.cellValue)"/>
                <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money"/>
                <zj-table-column field="expireDate" title="凭证到期日" :formatter="date"/>
                <zj-table-column field="stateChangeDate" title="凭证开立/转让日期" :formatter="date"/>
                <zj-table-column title="操作">
                  <template v-slot="{row}">
                    <zj-button type="text" @click="signFor(row)">签收</zj-button>
                    <zj-button type="text" @click="refuseSignFor(row)">拒签</zj-button>
                  </template>
                </zj-table-column>
              </zj-table>
            </zj-list-layout>
          </div>
    </zj-content-container>
    <reject-dialog ref="rejectDialog"/>
  </div>
</template>
<script>
import rejectDialog from './components/rejectDialog'
import billLssueMyBill from "../../../api/billLssueBillSignForApi";

export default {
  components: {
    rejectDialog,
  },
  data() {
    return {
      zjControl: {
        getBillSignBillInfoDetail:this.$api.billLssueBillSignFor.getBillSignBillInfoDetail,//凭证签收-详情
        getBillSignDictionary:this.$api.billLssueBillSignFor.getBillSignDictionary,//获取数据字典
        getOneBillSignAgreement:this.$api.billLssueBillSignFor.getOneBillSignAgreement,//融单签收-查询融单签收协议信息-单个协议查看
        passBillSign:this.$api.billLssueBillSignFor.passBillSign,//融单签收-审核通过
        queryBillSignPage:this.$api.billLssueBillSignFor.queryBillSignPage,//凭证签收-查询
        rejectBillSign:this.$api.billLssueBillSignFor.rejectBillSign,//融单签收-审批拒绝
      },
      searchForm: {
        stateChangeDateStart: '',
        stateChangeDateEnd: '',
        fromEntNameLike: '',
        ebillAmt: '',
        operType: '',
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

      dictionary: {},
    };
  },
  methods: {
    getBillSignDictionary(){
      this.zjControl.getBillSignDictionary().then(res=>{
        this.dictionary = res.data
      })
    },
    toContractSign(row) {
      console.log(row);
    },
    toDetail (row) {
      this.goChild('productInfoManageDetail', row)
    },
    signFor (row) {
      this.goChild('voucherSignForDetail', row)
    },
    refuseSignFor(row) {
      this.$refs.rejectDialog.open({form: this.form}, true)
    },
  },
  created() {
    this.getApi()
    this.getBillSignDictionary()
  }
};
</script>
