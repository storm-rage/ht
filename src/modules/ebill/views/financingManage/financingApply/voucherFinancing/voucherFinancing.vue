<template>
  <zj-content-container>
    <!--  凭证融资  -->
      <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
        <zj-header title="请选择海e单开单人/转让企业"/>
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="海e单开单人/转让企业：">
            <el-select v-model="searchForm.entId" @change="entChange">
              <el-option
                v-for="item in dictionary.entInfoList"
                :label="item.entName"
                :value="item.entId"
                :key="item.entId"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <zj-list-layout>
          <zj-header title="凭证信息"/>
          <template slot="rightBtns">
            <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch()">重置</vxe-button>
            <vxe-button class="search" icon="el-icon-search" @click="search()">查询</vxe-button>
          </template>
          <template slot="searchForm">
            <el-form ref="searchForm" :model="searchForm">
              <el-form-item label="凭证持有日期：">
                <zj-date-range-picker
                  :startDate.sync="searchForm.holderDateStart"
                  :endDate.sync="searchForm.holderDateEnd"
                />
              </el-form-item>
              <el-form-item label="凭证到期日：">
                <zj-date-range-picker
                  :startDate.sync="searchForm.expireDateStart"
                  :endDate.sync="searchForm.expireDateEnd"
                />
              </el-form-item>
              <el-form-item label="凭证金额：">
                <zj-amount-range
                  :startAmt.sync="searchForm.ebillAmtStart"
                  :endAmt.sync="searchForm.ebillAmtEnd"
                  @keyupEnterNative="enterSearch"
                />
              </el-form-item>
              <el-form-item label="凭证编号：">
                <el-input v-model="searchForm.ebillCodeLike" @keyup.enter.native="search"/>
              </el-form-item>
            </el-form>
          </template>
          <zj-table ref="searchTable"
                    :api="searchForm.entId?zjControl.queryFinancingApplyBillPage:''"
                    :params="searchForm.entId?searchForm:{}"
                    @checkbox-change="checkChange"
                    @checkbox-all="checkChange"
                    :radio-config="{highlight: true}"
          >
            <zj-table-column type="checkbox" width="40"/>
            <zj-table-column field="ebillCode" title="债权凭证编号"/>
            <zj-table-column field="rootCode" title="原始债权凭证编号"/>
            <zj-table-column field="writerName" title="凭证签发人"/>
            <zj-table-column field="transferName" title="转让企业"/>
            <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money"/>
            <zj-table-column field="availableAmt" title="剩余可用金额" :formatter="money"/>
            <zj-table-column field="holderDate" title="凭证持有日期" :formatter="date"/>
            <zj-table-column field="expireDate" title="凭证到期日" :formatter="date"/>
            <el-row slot="pager-left" class="slotRows" >
              凭证金额合计：{{moneyNoSynbol(detail.totalAmount)}}
              <span class="zj-m-l-10">已勾选凭证金额合计：{{moneyNoSynbol(' ')}}</span>
            </el-row>
          </zj-table>
        </zj-list-layout>
      </div>
  </zj-content-container>
</template>
<script>
export default {
  name: 'voucherFinancing',
  props: {
    zjControl: Object,
    dictionary: Object,
  },
  data() {
    return {
      searchForm: {
        entId: '',
        holderDateStart: '',
        holderDateEnd: '',
        expireDateStart: '',
        expireDateEnd: '',
        ebillAmtStart: '',
        ebillAmtEnd: '',
        ebillCodeLike: '',
      },
      detail: {},
      nextParams: {},// 下一步需要的参数
    };
  },
  methods: {
    entChange(val) {
      let params = {
        ...this.searchForm,
        entId: val,//选择凭证签发人ID/转让企业ID
        page: 1,
        rows: 10,
      }
      this.zjControl.queryFinancingApplyBillPage(params).then(res=>{
        this.nextParams = {
          entId: params.entId,
        }
      })
    },
    checkChange() {
      let checkArr = this.$refs.searchTable.getCheckboxRecords()
      console.log(`~`+JSON.stringify(checkArr))
      //勾选多个凭证时，遍历数组查看选中的凭证是否为同一个到期日
      let flag = false
      if(checkArr.length > 1) {
        let expDate = checkArr[0].expireDate
        for(let i of checkArr) {
          if(i.expireDate !== expDate.expireDate) {
            flag = true
            return this.$message.error('请选择到期日为同一天的凭证！')
          }
        }
      }
      //勾选的凭证的id合集
      let selectBillId = checkArr.map(item=>item.id)
      this.nextParams = {
        ...this.nextParams,
        idList: selectBillId,
        nextFlag: flag,
      }
      this.$emit('nextStepParams',this.nextParams)
    },
    toNext() {},
    toEditQuota (row) {},
    applyLoan () {},
  },
  created() {
  }
};
</script>
