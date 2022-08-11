<template>
  <zj-content-container>
    <zj-money-block
      img-name="hold-img"
      text="可转让电子债券凭证金额："
      tipsText="说明：可转让债权凭证金额：当前状态为“正常持有”的，折扣范围内的可用金额。"
    />
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="合同编号：">
            <el-input
              v-model="searchForm.issueEntName"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>

          <el-form-item label="凭证到期日：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>

          <el-form-item label="凭证金额：" class="col-center">
            <zj-amount-range
              :startAmt.sync="searchForm.ebillAmtStart"
              :endAmt.sync="searchForm.ebillAmtEnd"
              @keyupEnterNative="enterSearch"
            />
          </el-form-item>

          <el-form-item label="转让企业：">
            <el-input
              v-model="searchForm.issueEntName"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>

          <el-form-item label="债权凭证编号：">
            <el-input
              v-model="searchForm.issueEntName"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>

          <el-form-item label="凭证签收日：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>
        </el-form>
      </template>
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
        @checkbox-change="tableCheckChange"
        @checkbox-all="tableCheckChange"
      >
        <zj-table-column
          type="checkbox"
          width="40px"
          fixed="left"
        ></zj-table-column>
        <zj-table-column field="ebillCode" title="债权凭证编号">
          <template v-slot="{ row }">
            <span class="table-elbill-code" @click="goChild('', row)">{{
              row.ebillCode
            }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="issueEntName" title="原始债权凭证编号" />
        <zj-table-column field="ebillAmt" title="签发人" :formatter="money" />
        <zj-table-column
          field="transferAmt"
          title="原始持有人"
          :formatter="money"
        />
        <zj-table-column
          field="issueDate"
          title="凭证签发日"
          :formatter="date"
        />
        <zj-table-column
          field="issueDate"
          title="凭证到期日"
          :formatter="date"
        />
        <zj-table-column
          field="receiveDate"
          title="转让企业"
          :formatter="date"
        />
        <zj-table-column field="splusAmt" title="凭证金额" :formatter="money" />
        <zj-table-column
          field="expireDate"
          title="凭证签收日"
          :formatter="date"
        />
        <zj-table-column
          field="state"
          title="凭证状态"
          :formatter="
            (obj) => typeMap(dictionary.enterpriseStateList, obj.cellValue)
          "
        />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="goChild('entManageDetail', row)"
              :api="zjBtn.getEnterprise"
              >转让申请</zj-button
            >
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
    <zj-content-footer>
      <zj-button
        type="primary"
        @click="goChild('billAssignApply', ids)"
        :api="zjBtn.passBillSignBatch"
        >发起转让申请</zj-button
      >
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {},
      searchForm: {},
      ids: [],
      dictionary: {},
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    // 获取字典
    queryDictionary() {
      this.zjControl.queryEntDictionary().then((res) => {
        this.dictionary = res.data;
      });
    },
    tableCheckChange({ records }) {
      console.log(records);
      this.ids = [];
      records.forEach((item) => {
        this.ids.push(item.id);
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
