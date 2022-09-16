<template>
  <div>
    <div class="zj-search-condition"></div>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="对账单编号：" class="col-center">
            <el-input
              v-model.trim="searchForm.acctBillCode"
              clearable
              @keyup.enter.native="search"
            />
          </el-form-item>
          <el-form-item label="供应商业务系统编码：" class="col-center">
            <el-input
              v-model.trim="searchForm.supplierCode"
              clearable
              @keyup.enter.native="search"
            />
          </el-form-item>
          <el-form-item label="供应商名称：" class="col-center">
            <el-input
              v-model.trim="searchForm.supplierName"
              clearable
              @keyup.enter.native="search"
            />
          </el-form-item>
          <el-form-item label="对账日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.checkBillDateStart"
              :endDate.sync="searchForm.checkBillDateEnd"
            />
          </el-form-item>
          <el-form-item label="预计付款日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.estimatedPaymentDateStart"
              :endDate.sync="searchForm.estimatedPaymentDateEnd"
            />
          </el-form-item>
          <el-form-item label="是否开立凭证：" class="col-center">
            <el-select
              v-model="searchForm.isApplyVoucher"
              placeholder="请选择"
              clearable
              :popper-append-to-body="false"
            >
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in dictionary.isApplyVoucher"
                :key="item.code"
                :label="item.desc"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <div class="zj-search-response">
        <zj-table
          ref="searchTable"
          :api="zjControl.onlineList"
          :params="searchForm"
          keep-source
          @checkbox-change="checkChange"
          @checkbox-all="checkChange"
          :edit-config="{
            trigger: 'manual',
            mode: 'row',
            icon: '-',
            autoClear: false,
            showStatus: true
          }"
        >
          <zj-table-column type="checkbox" width="60" />
          <zj-table-column field="acctBillCode" title="对账单编号" />
          <zj-table-column field="companyName" title="买方名称" />
          <zj-table-column
            field="supplierCode"
            title="供应商业务系统编码"
            width="140"
          />
          <zj-table-column field="supplierName" title="供应商名称" />
          <zj-table-column
            field="checkBillDate"
            title="对账日期"
            width="100"
            :formatter="date"
          />
          <zj-table-column
            field="inputDate"
            title="入库日期/放行日期"
            width="200"
          >
            <template v-slot="{ row }">
              <div v-if="row.inputDate || row.passDate">
                {{ dateFormat(row.inputDate) }} ~ {{ dateFormat(row.passDate) }}
              </div>
              <div v-else>-</div>
            </template>
          </zj-table-column>
          <zj-table-column
            field="estimatedPaymentDate"
            title="预计付款日期"
            :formatter="date"
          >
            <template v-slot="{ row }">
              <div v-if="$refs.searchTable.isActiveByRow(row)">
                <zj-date-picker
                  class="table-date-picker"
                  :date.sync="row.estimatedPaymentDate"
                  :overNow="true"
                />
              </div>
              <div v-else>{{ date(row.estimatedPaymentDate) }}</div>
            </template>
          </zj-table-column>
          <zj-table-column
            field="checkBillAmt"
            title="对账单金额"
            width="120"
          />
          <zj-table-column field="openBillAmt" title="开单金额" width="120">
            <template v-slot="{ row }">
              <div v-if="$refs.searchTable.isActiveByRow(row)">
                <vxe-input
                  v-model="row.openBillAmt"
                  type="float"
                  digits="2"
                  :controls="false"
                  style="width: 100%;"
                  @change="openBillAmtChange(row)"
                ></vxe-input>
              </div>
              <div v-else>{{ money(row.openBillAmt) }}</div>
            </template>
          </zj-table-column>
          <zj-table-column
            field="isApplyVoucher"
            title="是否申请开立债权凭证"
            width="100"
            :formatter="obj => ifOrNot(obj.cellValue)"
          />
          <zj-table-column field="billSource" title="对账单来源" />
          <zj-table-column
            field="voucherRemark"
            title="备注"
            :edit-render="{ name: '$input' }"
          />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row, rowIndex }">
              <template v-if="!$refs.searchTable.isActiveByRow(row)">
                <zj-button type="text" @click="minute(row)">详情</zj-button>
                <zj-button type="text" @click="edit(row)">修改</zj-button>
              </template>
              <template v-if="$refs.searchTable.isActiveByRow(row)">
                <zj-button type="text" @click="save(row, rowIndex)"
                  >保存</zj-button
                >
                <zj-button type="text" @click="cancel(row, rowIndex)"
                  >取消</zj-button
                >
              </template>
            </template>
          </zj-table-column>
        </zj-table>

        <zj-content style="padding-top: 0">
          <zj-content-tip
            text="注：1.预计还款日期为平台根据结算周期计算所得，支持修改。
                    2.点击修改，可修改预计付款日、开单金额和备注
                    3.凭证到期日=预计付款日+开单宽限期限。"
          ></zj-content-tip>
        </zj-content>
      </div>
      <!-- 工作流 -->
      <zj-workflow v-model="workflow">
        <el-row slot="right">
          <zj-button @click="toIssuance" :api="zjBtn.passBillSignBatch"
            >签发凭证</zj-button
          >
        </el-row>
      </zj-workflow>
    </zj-list-layout>
  </div>
</template>
<script>
// import { OperateFlag } from "@modules/constant.js";
import { formatDate } from '@utils/index'
export default {
  data () {
    return {
      workflow: '',
      zjControl: {
        onlineList: this.$api.openBillApply.onlineList, //线上对账单-查询
        onlineDetail: this.$api.openBillApply.onlineDetail, //线上对账单-详情
        billApply: this.$api.openBillApply.billApply, //对账单-签发凭证
        updateStatementOnline: this.$api.openBillApply.updateStatementOnline // 修改
      },
      searchForm: {
        acctBillCode: '',
        supplierCode: '',
        supplierName: '',
        checkBillDateStart: '',
        checkBillDateEnd: '',
        estimatedPaymentDateStart: '',
        estimatedPaymentDateEnd: '',
        isApplyVoucher: '1'
      },
      dictionary: {
        isApplyVoucher: [
          { desc: '是', code: '1' },
          { desc: '否', code: '0' }
        ]
      },
      onlineDetailLsit: {}, //存储详情数据
      openBillApplyRow: {}, //编辑当前行
      list: []
    }
  },
  created () {
    this.getApi()
  },
  activated() {
    this.$nextTick(()=>{
      this.search()
    })
  },
  methods: {
    dateFormat (time) {
      if (!time) return '-'
      return this.date({cellValue: time})
    },
    afterResetSearch() {
      this.searchForm.isApplyVoucher = '1'
      // window.console.log('this.searchForm', this.searchForm);
    },
    //详情
    minute (row) {
      this.$router.push({
        name: 'openBillApplyDetails',
        query: { rowId: row.id },
        params: {
          currentActiveTab: "onLine"
        }
      })
    },
    //修改单元格
    edit (row) {
      console.log(row, '修改')
      if (!this.isTableEdit()) {
        return
      }
      // this.openBillApplyRow = Object.assign({}, row)
      this.openBillApplyRow = JSON.parse(JSON.stringify(row))
      this.$refs.searchTable.setActiveRow(row)
    },
    openBillAmtChange(row) {
      if(+row.openBillAmt > +row.checkBillAmt) {
        row.openBillAmt = row.checkBillAmt
      }
    },
    isTableEdit () {
      let key = true
      if (this.$refs.searchTable && this.$refs.searchTable.getActiveRecord()) {
        key = false
      }
      if (!key) {
        this.$log.alert('请保存当前正在编辑的数据')
      }
      return key
    },
    //保存单元格
    save (row) {
      this.form = { ...this.form, ...row }
      this.zjControl
        .updateStatementOnline({
          id: row.id,
          acctBillCode: row.acctBillCode,
          estimatedPaymentDate: row.estimatedPaymentDate,
          // payableAmt: row.openBillAmt,
          openBillAmt: row.openBillAmt,
          voucherRemark: row.voucherRemark
        })
        .then(res => {
          this.$refs.searchTable.clearActived()
          this.$message.success('保存成功')
        })
        .catch(() => {})
    },
    //取消单元格
    cancel (row) {
      row = Object.assign({}, this.openBillApplyRow)
      this.$refs.searchTable.clearActived()
    },
    //勾选
    checkChange () {
      let checkArr = this.$refs.searchTable.getCheckboxRecords()
      // console.log(checkArr, '勾选的值11111')
      this.list = checkArr
      // console.log(this.list, '勾选的值22222')
    },
    //签发凭证
    toIssuance () {
      let overtimeAcctBillCodelist = []
      let isError = this.list.some(item=>{
        if(item.isApplyVoucher != '1') {
          return true
        }
        if(this.$moment(item.estimatedPaymentDate).diff(this.$moment(),'days') >= 180) {
          overtimeAcctBillCodelist.push(item.acctBillCode)
        }
      })
      isError && (this.$message.warning('只允许“是否申请开立债权凭证=是”的对账单开立债权凭证。'))
      if(overtimeAcctBillCodelist.length) {
        this.$messageBox({
          type:'confirm',
          title:'提交确认',
          content: `海诺单天数大于180天，请确认是否签发?对账单号：${overtimeAcctBillCodelist.join(',')}`,
          showCancelButton:true,
          messageResolve:()=>{
            this.toIssuanceSave()
          },
          messageReject: ()=>{}
        })
      } else {
        this.toIssuanceSave()
      }
    },
    toIssuanceSave() {
      let params = {
        applyType: '0',
        accountBillList: this.list
      }
      this.zjControl.billApply(params).then(res => {
        if (res.code === 200) {
          this.goChild('openBillApplyConfirm', {
            list: res.data.accountBillList || [],
            applyType: '0', // 线上
            isHtEnterprise: res.data.isHtEnterprise,
            currentActiveTab: "onLine"
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.zj-search-condition {
  margin-top: 10px;
  margin-left: 20px;
}
.zj-search-response {
  /deep/ .is--controls,
  .vxe-input {
    line-height: 2.5;
  }
}
.table-date-picker {
  width: 100%;
  /deep/ .el-input__inner {
    width: 100%;
    min-width: auto;
  }
}
</style>
