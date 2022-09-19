<template>
  <zj-content-container>
    <!--  凭证融资  -->
      <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
        <zj-content>
        <zj-collapse :title="`请选择${productName}开单人/转让企业`">
          <el-form ref="searchFormEnt" :model="searchForm">
            <el-form-item :label="`${productName}开单人/转让企业：`">
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
        </zj-collapse>
        </zj-content>
          <zj-content>
        <zj-collapse :title="`${productName}信息`">
          <zj-list-layout>
            <template slot="rightBtns">
              <div v-show="false">
                <vxe-button class="reset" icon="el-icon-refresh" @click="reset(nextParams.entId)">重置</vxe-button>
                <vxe-button class="search" icon="el-icon-search" @click="entChange(nextParams.entId)">查询</vxe-button>
              </div>
            </template>
            <template slot="searchForm" style="border-bottom: none;">
              <el-form ref="searchForm" :model="searchForm" label-position="top" class="zj-searchForm">
                <el-form-item :label="`${productName}持有日期：`">
                  <zj-date-range-picker
                    :startDate.sync="searchForm.holderDateStart"
                    :endDate.sync="searchForm.holderDateEnd"
                    placeholder="年/月/日"
                  />
                </el-form-item>
                <el-form-item :label="`${productName}到期日：`">
                  <zj-date-range-picker
                    :startDate.sync="searchForm.expireDateStart"
                    :endDate.sync="searchForm.expireDateEnd"
                    placeholder="年/月/日"
                  />
                </el-form-item>
                <el-form-item :label="`${productName}金额：`">
                  <zj-amount-range
                    :startAmt.sync="searchForm.ebillAmtStart"
                    :endAmt.sync="searchForm.ebillAmtEnd"
                    @keyupEnterNative="entChange(nextParams.entId)"
                  />
                </el-form-item>
                <el-form-item :label="`${productName}编号：`">
                  <el-input v-model="searchForm.ebillCodeLike" @keyup.enter.native="entChange(nextParams.entId)"/>
                </el-form-item>
                <el-form-item>
                  <zj-button class="reset" icon="el-icon-refresh" @click="reset(nextParams.entId)">重置</zj-button>
                  <zj-button class="search zj-m-l-30" type="primary" icon="el-icon-search" @click="entChange(nextParams.entId)">查询</zj-button>
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
              <zj-table-column field="ebillCode" :title="`${productName}编号`"/>
              <zj-table-column field="rootCode" :title="`原始${productName}编号`"/>
              <zj-table-column field="writerName" title="开单人"/>
              <zj-table-column field="transferName" title="转让企业">
                <template v-slot="{row}">
                  {{row.transferName?row.transferName:'-'}}
                </template>
              </zj-table-column>
              <zj-table-column field="ebillAmt" :title="`${productName}金额`" :formatter="money"/>
              <zj-table-column field="availableAmt" title="剩余可用金额" :formatter="money"/>
              <zj-table-column field="holderDate" :title="`${productName}持有日期`" :formatter="date"/>
              <zj-table-column field="expireDate" :title="`${productName}到期日`" :formatter="date"/>
              <el-row slot="bottom-total" class="slotRows" >
                {{productName}}金额合计：{{moneyNoSynbol(totalAmount)}}
                <span class="zj-m-l-20">已勾选{{productName}}金额合计：{{moneyNoSynbol(checkedTotalAmount)}}</span>
              </el-row>
            </zj-table>
          </zj-list-layout>

        </zj-collapse>
        </zj-content>
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
    productName () {
      return this.$store.getters['user/productName']
    },
  },
  watch: {
    dictionary () {
      if (this.dictionary.entInfoList && this.dictionary.entInfoList.length && this.searchForm.entId === '') {
        this.searchForm.entId = this.dictionary.entInfoList[0].entId
        this.entChange(this.searchForm.entId)
      }
    }
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
      if(!val) {return this.$message.error('请选择开单人/转让企业！')}
      //凭证ID存放本地
      this.nextParams = {
        entId: val,
      }
      windowSSStorage.setItem('cacheEntInfo',val)
      this.$emit('nextStepParams',this.nextParams)
      let params = {
        ...this.searchForm,
        entId: val,//选择凭证签发人ID/转让企业ID
        page: 1,
        rows: 10,
      }
      console.log(JSON.stringify(this.nextParams))
      this.zjControl.queryFinancingApplyBillPage(params).then(res=>{
        this.billList = res.data.rows
        this.totalAmount = res.data.totalAmount
        //选中之前选中的凭证
        if(windowSSStorage.getItem('cacheBillCheck') && res.data.rows.length) {
          let cacheCheck = windowSSStorage.getItem('cacheBillCheck')
          console.log(JSON.parse(cacheCheck))
          console.log(this.$refs.searchTable)
          this.$nextTick(()=>{
            if(this.$refs.searchTable) {
              this.$refs.searchTable.setCheckboxRow(JSON.parse(cacheCheck), true)
              this.$refs.searchTable.updateData()
            }
          })

          let list = [...JSON.parse(cacheCheck)]
          this.checkChange([...list])
        }
      })
    },
    handleEntId() {
      //如果有缓存的entId取缓存的entId，没有缓存默认取第一个企业entId
      if(windowSSStorage.getItem('cacheEntInfo')) {
        this.searchForm.entId = windowSSStorage.getItem('cacheEntInfo')
        this.entChange(this.searchForm.entId)
      }
    },
    checkChange(billList) {
      console.log(billList)
      let objArr = billList instanceof Array ? billList : billList.records
      console.log(objArr)
      let checkArr = []
      if(this.$refs.searchTable) {
        checkArr = this.$refs.searchTable.getCheckboxRecords().length?this.$refs.searchTable.getCheckboxRecords() : objArr
      }
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
          if(i.expireDate !== expDate) {
            console.log(i.expireDate+'-----'+expDate)
            nextFlag = true
            this.$message.error(`请选择到期日为同一天的${this.productName}！`)
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
      console.log(JSON.stringify(this.nextParams))
      this.$emit('nextStepParams',this.nextParams)
    },
    reset(val) {
      if(!val) {return this.$message.error('请选择开单人/转让企业！')}
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
