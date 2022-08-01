<template>
  <div>
    <div class="zj-search-condition"></div>
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
          ref="openBillApply"
          :dataList="dataList"
          keep-source
          :edit-config="{
            trigger: 'manual',
            mode: 'row',
            icon: '-',
            autoClear: false,
            showStatus: true,
          }"
        >
          <zj-table-column type="selection" title="对账单编号" />
          <zj-table-column field="date" title="买方名称" />
          <zj-table-column field="name" title="供应商业务系统编码" />
          <zj-table-column field="address" title="供应商名称" />
          <zj-table-column field="date1" title="对账日期" :formatter="date" />
          <zj-table-column field="date2" title="入库日期/放行日期" />
          <zj-table-column
            field="date3"
            title="预计付款日期"
            :formatter="date"
          />
          <zj-table-column field="date4" title="对账单金额" />
          <zj-table-column field="date5" title="是否开立凭证" />
          <zj-table-column field="date6" title="对账单来源" />
          <zj-table-column field="date1" title="开立凭证说明" />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <template v-if="!$refs.openBillApply.isActiveByRow(row)">
                <zj-button
                  type="text"
                  :api="zjControl.onlineDetail"
                  @click="minute(row)"
                  >详情</zj-button
                >
                <zj-button type="text" @click="edit(row)">修改</zj-button>
              </template>
              <template v-if="$refs.openBillApply.isActiveByRow(row)">
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
                    2.点击修改，可修改预计付款日、开单金额和开立凭证说明
                    3.凭证到期日=预计付款日+开单宽限期限。"
          ></zj-content-tip>
        </zj-content>
      </div>
      <!-- 工作流 -->
      <zj-workflow v-model="workflow">
        <el-row slot="right">
          <zj-button @click="goChild" :api="zjBtn.passBillSignBatch"
            >签发凭证</zj-button
          >
        </el-row>
      </zj-workflow>
    </zj-list-layout>
  </div>
</template>
<script>
// import { OperateFlag } from "@modules/constant.js";
export default {
  data() {
    return {
      workflow: "",
      zjControl: {
        onlineList: this.$api.openBillApply.onlineList, //线上对账单-查询
        onlineDetail: this.$api.openBillApply.onlineDetail, //线上对账单-详情
      },
      searchForm: {},
      dataList: [
        {
          date: "11111",
          name: "22222",
          address: "3333333",
          date1: "11111",
          date2: "11111",
          date3: "11111",
          date4: "11111",
          date5: "11111",
          date6: "11111",
        },
        {
          date: "11111",
          name: "22222",
          address: "3333333",
          date1: "11111",
          date2: "11111",
          date3: "11111",
          date4: "11111",
          date5: "11111",
          date6: "11111",
        },
        {
          date: "11111",
          name: "22222",
          address: "3333333",
          date1: "11111",
          date2: "11111",
          date3: "11111",
          date4: "11111",
          date5: "11111",
          date6: "11111",
        },
        {
          date: "11111",
          name: "22222",
          address: "3333333",
          date1: "11111",
          date2: "11111",
          date3: "11111",
          date4: "11111",
          date5: "11111",
          date6: "11111",
        },
        {
          date: "11111",
          name: "22222",
          address: "3333333",
          date1: "11111",
          date2: "11111",
          date3: "11111",
          date4: "11111",
          date5: "11111",
          date6: "11111",
        },
        {
          date: "11111",
          name: "22222",
          address: "3333333",
          date1: "11111",
          date2: "11111",
          date3: "11111",
          date4: "11111",
          date5: "11111",
          date6: "11111",
        },
        {
          date: "11111",
          name: "22222",
          address: "3333333",
          date1: "11111",
          date2: "11111",
          date3: "11111",
          date4: "11111",
          date5: "11111",
          date6: "11111",
        },
        {
          date: "11111",
          name: "22222",
          address: "3333333",
          date1: "11111",
          date2: "11111",
          date3: "11111",
          date4: "11111",
          date5: "11111",
          date6: "11111",
        },
        {
          date: "11111",
          name: "22222",
          address: "3333333",
          date1: "11111",
          date2: "11111",
          date3: "11111",
          date4: "11111",
          date5: "11111",
          date6: "11111",
        },
        {
          date: "11111",
          name: "22222",
          address: "3333333",
          date1: "11111",
          date2: "11111",
          date3: "11111",
          date4: "11111",
          date5: "11111",
          date6: "11111",
        },
        {
          date: "11111",
          name: "22222",
          address: "3333333",
          date1: "11111",
          date2: "11111",
          date3: "11111",
          date4: "11111",
          date5: "11111",
          date6: "11111",
        },
      ],
      openBillApplyRow: {}, //编辑当前行
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    //详情
    minute(row){
      console.log(row,'详情')
      // return
      this.$router.push('/openBillApplyDetails',row)
    },
    //修改单元格
    edit(row) {
      console.log(row, "修改");
      if (!this.isTableEdit()) {
        return;
      }
      this.openBillApplyRow = Object.assign({}, row);
      this.$refs.openBillApply.setActiveRow(row);
    },
    isTableEdit() {
      let key = true;
      if (
        this.$refs.openBillApply &&
        this.$refs.openBillApply.getActiveRecord()
      ) {
        key = false;
      }
      if (!key) {
        this.$log.alert("请保存当前正在编辑的数据");
      }
      return key;
    },
    //保存单元格
    save(row) {
      this.form = { ...this.form, ...row };
      this.$refs.openBillApply.clearActived();
      this.$message.success("保存成功");
    },
    //取消单元格
    cancel() {
      this.$refs.openBillApply.clearActived();
    },
    //签发凭证
    goChild(row) {
      // console.log(row, "=======");
      this.$router.push("/openBillApplyConfirm");
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
