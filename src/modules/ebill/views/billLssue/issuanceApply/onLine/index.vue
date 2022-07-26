<template>
  <div>
    <div class="zj-search-condition">
    </div>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="对账单编号：" class="col-center">
            <el-input v-model="searchForm.ebillCode" />
          </el-form-item>
          <el-form-item label="供应商编码：" class="col-center">
            <el-input v-model="searchForm.ebillCode" />
          </el-form-item>
          <el-form-item label="供应商名称：" class="col-center">
            <el-input v-model="searchForm.ebillCode" />
          </el-form-item>
          <el-form-item label="对账日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>
          <el-form-item label="付款日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>
          <el-form-item label="是否开立凭证：" class="col-center">
            <el-select
              v-model="searchForm.isGenerateVoucher"
              placeholder="请选择"
              clearable
              :popper-append-to-body="false"
            >
              <el-option value="" label="全部"></el-option>
              <!-- <el-option
              v-for="item in dictionary.isGenerateVouchers"
              :key="item.code"
              :label="item.desc"
              :value="item.code"
            >
            </el-option> -->
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <div class="zj-search-response">
        <zj-table
          ref="searchTable"
          :params="searchForm"
          :api="zjControl.onlineList"
          :data="tableData"
        >
          <zj-table-column type="selection" title="对账单编号" />
          <zj-table-column prop="date" title="买方名称" />
          <zj-table-column prop="name" title="供应商业务系统编码" />
          <zj-table-column prop="address" title="供应商名称" />
          <zj-table-column field="" title="对账日期" :formatter="date" />
          <zj-table-column field="" title="入库日期/放行日期" />
          <zj-table-column field="" title="预计付款日期" :formatter="date" />
          <zj-table-column field="" title="对账单金额" />
          <zj-table-column field="" title="是否开立凭证" />
          <zj-table-column field="" title="对账单来源" />
          <zj-table-column field="" title="开立凭证说明" />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button
                type="text"
                @click="$router.push('/issuanceApplyDetails')"
                :api="zjBtn.getEnterprise"
                >详情</zj-button
              >
              <zj-button type="text" @click="edit(row)">修改</zj-button>
            </template>
          </zj-table-column>
        </zj-table>

        <zj-content style="padding-top: 0">
          <zj-content-tip
            text="注：1.预计还款日期为平台根据结算周期计算所得，支持修改。
                    2.点击修改，可修改预计付款日、开单金额和开立凭证说明
                    3.凭证到期日=预计付款日+开单宽限期限。"
          ></zj-content-tip>
        </zj-content>
      </div>
      <!-- 工作流 -->
      <zj-workflow v-model="workflow">
        <el-row slot="right">
          <zj-button @click="&quot;&quot;;" :api="zjBtn.passBillSignBatch"
            >签发凭证</zj-button
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
      workflow: "",
      tableData:[{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      zjControl: {
        onlineList: this.$api.issuanceApply.onlineList, //线上对账单-查询
      },
      searchForm: {},
      // tableData: [{ id: 1 }],
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    //修改
    edit(row) {
      if (!this.tableEditReport(["searchTable"])) {
        return;
      }
      this.$refs.searchTable.setActiveRow(row);
    },
  },
};
</script>
<style lang="less" scoped>
.zj-search-condition {
  margin-top: 10px;
  margin-left: 20px;
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
