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
              v-model="searchForm.issueEntName"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="供应商业务系统编码：">
            <el-input
              v-model="searchForm.issueEntName"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="供应商名称：">
            <el-input
              v-model="searchForm.issueEntName"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="对账日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>
          <el-form-item label="预计付款日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>
        </el-form>
      </template>
      <div class="zj-search-response">
        <zj-table
          :dataList="dataList"
          ref="selectionCheckbox"
          @checkbox-change="checkChange"
          @checkbox-all="checkChange"
        >
          <zj-table-column type="checkbox" title="对账单编号" />
          <zj-table-column field="date1" title="供应商编码" />
          <zj-table-column field="date2" title="供应商名称" />
          <zj-table-column field="date3" title="对账日期" :formatter="date" />
          <zj-table-column field="date4" title="对账单金额" />
          <zj-table-column field="date5" title="付款日期" :formatter="date" />
          <zj-table-column field="date6" title="开立凭证说明" />
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
          <zj-button @click="goChild" :api="zjBtn.passBillSignBatch"
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
  data() {
    return {
      zjControl: {
        offlineList: this.$api.openBillApply.offlineList, //线上对账单-查询
        openBill: this.$api.openBillApply.openBill, //下载批量开立凭证导入模板
        billExcel: this.$api.openBillApply.billExcel, //上传开立凭证文件
        billData: this.$api.openBillApply.billData, //上传开立凭证文件-保存数据
        accountOffline: this.$api.openBillApply.accountOffline, //线下对账单-删除
      },
      searchForm: {},
      selection: [], //储存删除的值
      dataList: [
        {
          date1: "1值",
          date2: "1值",
          date3: "1值",
          date4: "1值",
          date5: "1值",
          date6: "1值",
        },
        {
          date1: "2值",
          date2: "2值",
          date3: "2值",
          date4: "2值",
          date5: "2值",
          date6: "2值",
        },
        {
          date1: "3值",
          date2: "3值",
          date3: "3值",
          date4: "3值",
          date5: "3值",
          date6: "3值",
        },
        {
          date1: "11111",
          date2: "22222",
          date3: "33333",
          date4: "44444",
          date5: "55555",
          date6: "66666",
        },
        {
          date1: "11111",
          date2: "22222",
          date3: "33333",
          date4: "44444",
          date5: "55555",
          date6: "66666",
        },
        {
          date1: "11111",
          date2: "22222",
          date3: "33333",
          date4: "44444",
          date5: "55555",
          date6: "66666",
        },
        {
          date1: "11111",
          date2: "22222",
          date3: "33333",
          date4: "44444",
          date5: "55555",
          date6: "66666",
        },
      ],
      excelList: {},
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    //点击下载
    downs(row) {
      this.zjControl.openBill().then((res) => {
        if (res.code === 200) {
        }
      });
    },
    //上传
    upLoad({ file }) {
      let formData = new FormData();
      formData.append("fileOB", file);
      this.zjControl
        .billExcel(formData)
        .then((ret) => {
          if (ret.code == 200) {
            // console.log(ret, "============");
            this.excelList = ret.data;
            this.$message.success("上传成功!");
          }
        })
        .catch(() => {});
    },
    //签发凭证
    goChild(row) {
      // console.log(row, "=======");
      this.$router.push("/openBillApplyConfirm");
    },
    //维护附件
    toDatails(row) {
      this.$router.push("/openBillApplyConfirm");
    },
    //勾选
    checkChange(row) {
      // console.log(row.row,"====row====")
      // this.$nextTick(() => {
      //   console.log(this.$refs.selectionCheckbox, "==勾选1===");
      // });
      // return;
      let checkArr = this.$refs.selectionCheckbox.getCheckboxRecords();
      console.log(checkArr, "===勾选===");
      this.selection = checkArr
      console.log(this.selection, "===储存勾选===");
    },
    //勾选删除
    remove() {
      this.$refs.selectionCheckbox.removeCheckboxRow();
    },
    // handleChange(val){
    //   this.selection = val
    //   alert(val)
    //   console.log(val,"======删除=====")
    // },
  },
};
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