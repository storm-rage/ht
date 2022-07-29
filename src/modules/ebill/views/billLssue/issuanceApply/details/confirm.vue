<template>
  <div class="confirm">
    <div class="confirmTitle">
      <ZjTopHeader>请确认电子债权凭证签发申请</ZjTopHeader>
    </div>
    <zj-table ref="searchTable" :params="searchForm" :api="zjControl.billApply">
      <zj-table-column prop="id" title="债权凭证编号" />
      <zj-table-column field="" title="对账单编号" />
      <zj-table-column field="" title="买方名称" />
      <zj-table-column field="" title="供应商名称" />
      <zj-table-column field="" title="对账日期" :formatter="date" />
      <zj-table-column field="" title="预计付款日期" :formatter="date" />
      <zj-table-column field="" title="对账单金额" />
      <zj-table-column field="" title="开单金额" />
      <zj-table-column field="" title="凭证到期日" :formatter="date" />
      <zj-table-column field="" title="开立凭证说明" />
      <zj-table-column title="操作" fixed="right">
        <template v-slot="{ row }">
          <zj-button type="text" @click="toDatails(row)">开单确认书</zj-button>
        </template>
      </zj-table-column>

      <template slot="pager-left">
        开单笔数：6&nbsp;&nbsp; 开单笔数：1,000.00
      </template>
    </zj-table>

    <div class="ageree">
      <el-checkbox v-model="agreeCheck">我已阅读并同意相关协议</el-checkbox>
      <!-- &nbsp;
      <el-link :underline="false" type="primary">《额度调整申请书》</el-link> -->
    </div>

    <div class="btns">
      <zj-button type="primary" @click="confirmSubmit">确认提交</zj-button>
      <zj-button @click="goChild">取消</zj-button>
    </div>

    <!-- 工作流 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      zjControl: {},
      searchForm: {},
      tableData: [{ id: 1 }],
      agreeCheck: false,
    };
  },

  methods: {
    confirmSubmit() {
      this.$confirm(
        "您确定将所选中的数据提交复核吗？注：确认后进入盖章环节，如有需要，请及时联系签章人员！",
        "温馨提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }
      ).then(() => {
        if (this.agreeCheck !== true) {
          this.$message.warning("请检查我已阅读并同意相关协议是否勾选");
          return;
        } else {
          this.$message.success("提交成功!");
        }
      });
    },
    //取消
    goChild() {
      this.agreeCheck = false;
      this.$router.push("/openBillApply");
    },
  },
};
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