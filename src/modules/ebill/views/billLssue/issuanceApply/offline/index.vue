<template>
  <div>
    <div class="zj-search-condition">
      <el-row class="button-row">
        <zj-upload class="zj-inline" ref="upload" :httpRequest="upLoad">
          <zj-button type="primary" size="mini" slot="trigger"
            >上传开立凭证文件</zj-button
          >
        </zj-upload>
        <a class="file-download" style="cursor: pointer" @click="downs()"
          >点击下载《批量开立凭证导入模版》</a
        >
      </el-row>
    </div>

    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="对账单编号：">
            <el-input
              v-model="searchForm.acctBillCode"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="供应商业务系统编码：">
            <el-input
              v-model="searchForm.supplierCode"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="供应商名称：">
            <el-input
              v-model="searchForm.supplierName"
              @keyup.enter.native="enterSearch"
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
        </el-form>
      </template>
      <div class="zj-search-response">
        <zj-table
          :api="zjControl.offlineList"
          :params="searchForm"
          ref="searchTable"
          @after-load="afterLoad"
          @checkbox-change="checkChange"
          @checkbox-all="checkChange"
        >
          <zj-table-column type="checkbox" width="60" />
          <zj-table-column field="acctBillCode" title="对账单编号" />
          <zj-table-column field="supplierCode" title="供应商业务系统编码" />
          <zj-table-column field="supplierName" title="供应商名称" />
          <zj-table-column
            field="checkBillDate"
            title="对账日期"
            :formatter="date"
          />
          <zj-table-column
            field="checkBillAmt"
            title="对账单金额"
            :formatter="money"
          />
          <zj-table-column
            field="estimatedPaymentDate"
            title="预计付款日期"
            :formatter="date"
          />
          <zj-table-column field="voucherRemark" title="备注" />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="toDatails(row)"
                >维护附件</zj-button
              >
            </template>
          </zj-table-column>
        </zj-table>
        <zj-content style="padding-top: 0">
          <zj-content-tip
            text="注：1.凭证到期日=付款日期+开单宽限期限。"
          ></zj-content-tip>
        </zj-content>
      </div>
      <!-- 工作流 -->
      <zj-workflow>
        <el-row slot="right">
          <zj-button @click="toIssuance" :api="zjBtn.passBillSignBatch"
            >签发凭证</zj-button
          >
          <zj-button @click="remove" :api="zjBtn.passBillSignBatch"
            >删除</zj-button
          >
        </el-row>
      </zj-workflow>
    </zj-list-layout>
  </div>
</template>
<script>
export default {
  data () {
    return {
      zjControl: {
        offlineList: this.$api.openBillApply.offlineList, //线下对账单-查询
        openBill: this.$api.openBillApply.openBill, //下载批量开立凭证导入模板
        billExcel: this.$api.openBillApply.billExcel, //上传开立凭证文件
        billData: this.$api.openBillApply.billData, //上传开立凭证文件-保存数据
        accountOffline: this.$api.openBillApply.accountOffline, //线下对账单-删除
        billApply: this.$api.openBillApply.billApply //对账单-签发凭证
      },
      searchForm: {},
      selection: [], // 勾选的数据
      excelList: {}
    }
  },
  created () {
    this.getApi()
  },
  methods: {
    //点击下载
    downs (row) {
      this.zjControl
        .openBill()
        .then(res => {
          if (res.code === 200) {
          }
        })
        .catch(() => {})
    },
    //上传
    upLoad ({ file }) {
      let formData = new FormData()
      formData.append('fileOB', file)
      this.zjControl
        .billExcel(formData)
        .then(ret => {
          if (ret.code == 200) {
            this.excelList = ret.data
            this.$message.success('上传成功!')
            this.search()
          }
        })
        .catch(() => {})
    },
    //签发凭证
    toIssuance () {
      let overtimeAcctBillCodelist = []
      this.selection.forEach(item=>{
        if(this.$moment(item.estimatedPaymentDate).diff(this.$moment(),'days') >= 180) {
          overtimeAcctBillCodelist.push(item.acctBillCode)
        }
      })
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
    toIssuanceSave () {
      let params = {
        applyType: '1',
        accountBillList: this.selection
      }
      this.zjControl.billApply(params).then(res => {
        if (res.code === 200) {
          this.goChild('openBillApplyConfirm', {
            list: res.data.accountBillList || [],
            applyType: '1', // 线下
            isHtEnterprise: res.data.isHtEnterprise,
            currentActiveTab: "offline"
          })
        }
      })
    },
    //维护附件
    toDatails (row) {
      this.$router.push({
        name: 'offlineDatails',
        params: {
          rowData: {...row, currentActiveTab: "offline"}
        }
      })
    },
    afterLoad(data) {
      this.selection = data.filter(item=>item.checkBillStatus=='0')
      this.$refs.searchTable.setCheckboxRow(this.selection, true)
    },
    //勾选
    checkChange (row) {
      let checkArr = this.$refs.searchTable.getCheckboxRecords()
      // console.log(checkArr, "===勾选===");
      this.selection = checkArr
      // console.log(this.selection, "===储存勾选===");
    },
    //勾选删除
    remove () {
      this.$messageBox({
        type:'confirm',
        title:'删除确认',
        content: `是否确认删除选中对账单?`,
        showCancelButton:true,
        messageResolve:()=>{
          let params = {
            accountBillList: this.selection
          }
          this.zjControl
            .accountOffline(params)
            .then(ret => {
              if (ret.code == 200) {
                this.$message.success('删除成功!')
                this.$refs.searchTable.removeCheckboxRow()
              }
            })
            .catch(() => {})
        },
        messageReject: ()=>{

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
.file-download {
  vertical-align: bottom;
  padding-left: 20px;
  color: #0aa7f7;
}
/deep/#ZjWorkflow {
  .workflow-top {
    .el-row {
      padding: 5px 0 0;
      text-align: center;
    }
  }
  .workflow-bottom {
    .right {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
