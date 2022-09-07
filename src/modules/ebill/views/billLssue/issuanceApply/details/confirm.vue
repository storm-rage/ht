<template>
  <div class="confirm">
    <div class="confirmTitle">
      <ZjTopHeader>请确认电子债权凭证签发申请</ZjTopHeader>
    </div>
    <zj-table ref="searchTable" :dataList="row.list">
      <zj-table-column field="ebillCode" title="海e单编号" />
      <zj-table-column field="acctBillCode" title="对账单编号" />
      <zj-table-column field="companyName" title="买方名称" />
      <zj-table-column field="supplierName" title="供应商名称" />
      <zj-table-column
        field="checkBillDate"
        title="对账日期"
        :formatter="date"
      />
      <zj-table-column
        field="estimatedPaymentDate"
        title="预计付款日期"
        :formatter="date"
      />
      <zj-table-column
        field="checkBillAmt"
        title="对账单金额"
        :formatter="money"
      />
      <zj-table-column
        field="openBillAmt"
        title="开单金额"
        :formatter="money"
      />
      <zj-table-column
        field="dueBillDate"
        title="海e单到期日"
        :formatter="date"
      />
      <zj-table-column field="voucherRemark" title="备注" />
      <zj-table-column title="操作" fixed="right">
        <template v-slot="{ row }">
          <zj-button type="text" @click="viewConfirm(row)"
            >开单确认书</zj-button
          >
        </template>
      </zj-table-column>

      <template slot="pager-left">
        开单笔数：{{ row.list ? row.list.length : 0 }}&nbsp;&nbsp; 开单金额：{{
          money(allPayableAmt)
        }}
      </template>
    </zj-table>

    <div class="ageree">
      <el-checkbox v-model="agreeCheck">我已阅读并同意相关协议</el-checkbox>
      <!-- &nbsp;
      <el-link :underline="false" type="primary">《额度调整申请书》</el-link> -->
    </div>

    <div class="btns">
      <zj-button type="primary" :disabled="!agreeCheck" @click="confirmSubmit"
        >确认提交</zj-button
      >
      <zj-button @click="toParent">取消</zj-button>
    </div>
    <el-dialog
      :visible.sync="dialogShow"
      width="800px"
      :close-on-click-modal="false"
    >
      <div v-html="dialogHtml"></div>
    </el-dialog>
    <!-- 工作流 -->
    <!-- 云证书签章 -->
    <zj-certuficate ref="certuficate" @confirm="handleCertuficateDone" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      zjControl: {
        signUserProtocol: this.$api.login.signUserProtocol, //人脸签署
        billCommit: this.$api.openBillApply.billCommit, //对账单-提交复核
        getKdAgreeemnt: this.$api.openBillApply.getKdAgreeemnt // 开单确认书-协议查看
      },
      searchForm: {},
      tableData: [{ id: 1 }],
      agreeCheck: false,
      dialogShow: false, // 开单通知书显示
      dialogHtml: '' // 开单通知书内容
    }
  },
  computed: {
    allPayableAmt () {
      return this.row.list
        ? this.row.list.reduce((all, item) => (all += +item.totalOpenAmt), 0)
        : 0
    }
  },
  activated () {
    this.getRow()
  },
  methods: {
    confirmSubmit () {
      this.$confirm(
        '<p>您确定将所选中的数据提交签发申请吗？</p><p>注：确认后进入盖章环节，如有需要，请及时联系签章人员！</p>',
        '温馨提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }
      ).then(() => {
        if (this.agreeCheck !== true) {
          this.$message.warning('请检查我已阅读并同意相关协议是否勾选')
          return
        } else {
          if(this.row.isHtEnterprise=='1') {
            this.save()
          } else {
            this.signUserProtocol()
          }
        }
      })
    },
    save () {
      this.zjControl
        .billCommit({
          accountBillList: this.row.list,
          applyType: this.row.applyType
        })
        .then(res => {
          if (res.code === 200) {
            this.toParent()
            this.$message.success('提交成功!')
          }
        })
        .catch(() => {})
    },
    //取消
    toParent () {
      this.agreeCheck = false
      this.tabDel()
      this.$router.push('/openBillApply')
    },
    // 开单确认书
    viewConfirm (row) {
      let data = {
        id: row.id,
        acctBillCode: row.acctBillCode,
        companyName: row.companyName,
        dueBillDate: row.dueBillDate,
        ebillCode: row.ebillCode,
        openBillAmt: row.openBillAmt,
        supplierName: row.supplierName
      }
      this.zjControl
        .getKdAgreeemnt(data)
        .then(res => {
          this.dialogHtml = res.data.agreement.html
          this.dialogShow = true
        })
        .catch(() => {})
    },
    // 去签协议
    signUserProtocol () {
      this.$refs.certuficate.open()
    },
    //云证书返回
    handleCertuficateDone() {
      console.log("云证书返回");
      this.save()
    },
  }
}
</script>

<style lang="less" scoped>
.confirm {
  /deep/ .vxe-pager--left-wrapper {
    float: left;
    padding-left: 10px;
  }

  .confirmTitle {
    padding: 10px 0 20px;
  }

  .ageree {
    display: flex;
    justify-content: center;
    margin: 50px 0 20px;
  }
  .btns {
    display: flex;
    justify-content: center;
  }
}
</style>
