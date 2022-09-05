<template>
  <zj-content-container>
    <!--  凭证融资  -->
      <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
        <zj-header title="请选择海e单开单人/转让企业"/>
        <el-form ref="searchFormEnt" :model="searchForm">
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
            <vxe-button class="reset" icon="el-icon-refresh" @click="reset(nextParams.entId)">重置</vxe-button>
            <vxe-button class="search" icon="el-icon-search" @click="entChange(nextParams.entId)">查询</vxe-button>
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
                  @keyupEnterNative="entChange(nextParams.entId)"
                />
              </el-form-item>
              <el-form-item label="凭证编号：">
                <el-input v-model="searchForm.ebillCodeLike" @keyup.enter.native="entChange(nextParams.entId)"/>
              </el-form-item>
            </el-form>
          </template>
          <zj-table ref="searchTable"
                    row-id="id"
                    :dataList="billList"
                    @checkbox-change="checkChange"
                    @checkbox-all="checkChange"
                    :checkbox-config="{ highlight: true, reserve:true,}"
          >
            <zj-table-column type="checkbox" width="40" fixed="left"/>
            <zj-table-column field="ebillCode" title="债权凭证编号"/>
            <zj-table-column field="rootCode" title="原始债权凭证编号"/>
            <zj-table-column field="writerName" title="凭证签发人"/>
            <zj-table-column field="transferName" title="转让企业">
              <template v-slot="{row}">
                {{row.transferName?row.transferName:'-'}}
              </template>
            </zj-table-column>
            <zj-table-column field="ebillAmt" title="凭证金额" :formatter="money"/>
            <zj-table-column field="availableAmt" title="剩余可用金额" :formatter="money"/>
            <zj-table-column field="holderDate" title="凭证持有日期" :formatter="date"/>
            <zj-table-column field="expireDate" title="凭证到期日" :formatter="date"/>
            <el-row slot="pager-left" class="slotRows" >
              海e单金额合计：{{moneyNoSynbol(totalAmount)}}
              <span class="zj-m-l-10">已勾选凭证金额合计：{{moneyNoSynbol(checkedTotalAmount)}}</span>
            </el-row>
          </zj-table>
        </zj-list-layout>
      </div>
  </zj-content-container>
</template>
<script>
import {windowSSStorage} from "@utils/storageUtils";
export default {
  name: 'voucherFinancing',
  props: {
    zjControl: Object,
    dictionary: Object,
  },
  computed: {

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
      billList: [],
      totalAmount: '',
      checkedTotalAmount: 0,
      nextParams: {},// 下一步需要的参数
    };
  },
  methods: {
    entChange(val) {
      //凭证ID存放本地
      this.nextParams = {
        entId: val,
      }
      let params = {
        ...this.searchForm,
        entId: val,//选择凭证签发人ID/转让企业ID
        page: 1,
        rows: 10,
      }
      this.zjControl.queryFinancingApplyBillPage(params).then(res=>{
        this.billList = res.data.rows
        this.totalAmount = res.data.totalAmount
        if(windowSSStorage.getItem('cacheBillCheck') && res.data.rows.length) {
          let cacheCheck = windowSSStorage.getItem('cacheBillCheck')
          console.log(JSON.parse(cacheCheck))
          this.$refs.searchTable.setCheckboxRow(JSON.parse(cacheCheck), true)
          this.$refs.searchTable.updateData()

          let list = [...JSON.parse(cacheCheck)]
          this.checkChange([...list])
        }
      })
      windowSSStorage.setItem('cacheEntInfo',val)
      this.$emit('nextStepParams',this.nextParams)
    },
    handleEntId() {
      if(windowSSStorage.getItem('cacheEntInfo')) {
        this.searchForm.entId = windowSSStorage.getItem('cacheEntInfo')
        this.entChange(this.searchForm.entId)
      }
    },
    checkChange(billList) {
      console.log(billList)
      let objArr = billList.row
      console.log('objArr')
      this.$refs.searchTable.updateData()
      let checkArr = this.$refs.searchTable.getCheckboxRecords().length?this.$refs.searchTable.getCheckboxRecords() : objArr
      console.log(`~`+JSON.stringify(checkArr))
      windowSSStorage.setItem('cacheBillCheck',JSON.stringify(checkArr))
      let newCheckArr = checkArr.map(item=>item.ebillAmt)
      //已勾选凭证金额合计
      if(checkArr.length > 1 ) {
        this.checkedTotalAmount = newCheckArr.reduce((a,b)=>{
          return Number(a)+Number(b)
        })
      } else if(checkArr.length === 1) {
        this.checkedTotalAmount = checkArr[0].ebillAmt
      } else {
        this.checkedTotalAmount = 0
      }
      //勾选多个凭证时，遍历数组查看选中的凭证是否为同一个到期日
      let nextFlag = false
      if(checkArr.length > 1) {
        let expDate = checkArr[0].expireDate
        for(let i of checkArr) {
          if(i.expireDate !== expDate.expireDate) {
            nextFlag = true
            this.$message.error('请选择到期日为同一天的凭证！')
            break
          }
        }
      }
      //勾选的凭证的id合集
      let selectBillId = checkArr.map(item=>item.id)
      this.nextParams = {
        ...this.nextParams,
        idList: selectBillId,
        nextStepFlag: nextFlag,
      }
      this.$emit('nextStepParams',this.nextParams)
    },
    reset(val) {
      this.searchForm.holderDateStart = ''
      this.searchForm.holderDateEnd = ''
      this.searchForm.expireDateStart = ''
      this.searchForm.expireDateEnd = ''
      this.searchForm.ebillAmtStart = ''
      this.searchForm.ebillAmtEnd = ''
      this.searchForm.ebillCodeLike = ''
      this.entChange(val)
    }
  },
  created() {
  },
  mounted() {
    this.handleEntId()
    console.log(this.billList)
  },
};
</script>
<style lang="less" scoped>
/deep/.vxe-pager--wrapper{
  .vxe-pager--left-wrapper {
    float: left;
  }
}
</style>
