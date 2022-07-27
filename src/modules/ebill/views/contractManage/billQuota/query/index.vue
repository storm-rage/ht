<template>
  <div>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="买方企业名称：">
            <el-input
              v-model.trim="searchForm.coreName"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="申请日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.applyDateStart"
              :endDate.sync="searchForm.applyDateEnd"
            />
          </el-form-item>

          <el-form-item label="申请增加额度：">
            <zj-amount-range :startAmt.sync="searchForm.applyAddCreditAmountStart"
                             :endAmt.sync="searchForm.applyAddCreditAmountEnd"></zj-amount-range>
          </el-form-item>
          <el-form-item label="申请流水号：">
            <el-input
              v-model.trim="searchForm.serialNo"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="申请状态：">
            <el-select v-model="searchForm.applyStatus">
              <el-option value="" />
              <el-option
                v-for="item in dictionary.applyStatus"
                :key="`${item.code}applyStatus`"
                :label="item.desc"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column field="serialNo" title="申请流水号"></zj-table-column>
        <zj-table-column field="coreName" title="买方企业名称" />
        <zj-table-column
          field="applyAddCreditAmount"
          title="申请增加额度"
          :formatter="money"
        />
        <zj-table-column
          field="factoringCreditAmount"
          title="调整前额度"
          :formatter="money"
        />
        <zj-table-column
          field="adjustCreditAmount"
          title="调整后额度"
          :formatter="money"
        />
        <zj-table-column field="creditExpireDate" title="额度到期日" :formatter="date" />
        <zj-table-column field="receiveDatetime" title="申请时间" />
        <zj-table-column field="applyStatus" title="申请状态">
          <template v-slot="{row}">
            <span v-if="row.applyStatus === 'D001'||row.applyStatus==='D006'">
              <el-popover placement="left" width="280" trigger="hover">
                <p>拒绝时间：{{row.stateChangeDatetime}}</p>
                <p>拒绝原因：{{row.rejectReason}}</p>
                <el-link slot="reference" :underline="false" type="primary">{{typeMap(dictionary.applyStatus, row.applyStatus)}}</el-link>
              </el-popover>
            </span>
            <span v-else>{{typeMap(dictionary.applyStatus, row.applyStatus)}}</span>
          </template>
        </zj-table-column>
        <zj-table-column title="操作" fixed="right">
      <!--3.	若申请状态为拒绝（包括复核拒绝和保理公司审核拒绝），则不展示详情按钮。鼠标防止在对应状态时，浮框展示拒绝时间和拒绝原因-->
          <template v-slot="{ row }">
            <zj-button
              v-if="row.applyStatus !== 'D001'&&row.applyStatus!=='D006'"
              type="text"
              @click="toViewDetail(row)"
              :api="zjBtn.queryDetail">详情</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
  </div>
</template>
<script>

export default {
  data() {
    return {
      zjControl: {
        tableApi: this.$api.billQuotaManage.queryList,
        getCreditQueryDic: this.$api.billQuotaManage.getCreditQueryDic,
        queryDetail: this.$api.billQuotaManage.getCreditQueryDetail,
      },
      searchForm: {
        coreName: "",
        applyDateStart: "",
        applyDateEnd: "",
        applyAddCreditAmountStart: "",
        applyAddCreditAmountEnd: "",
        serialNo: "",
        applyStatus: ""
      },
      // 字典
      dictionary: {}
    };
  },
  created() {
    this.getApi();
    this.zjControl.getCreditQueryDic().then(res => {
      this.dictionary = res.data
    })
  },
  methods: {
    toViewDetail(row) {
      this.goChild('changeDetail',{contractId: row.contractId,factoringCreditId: row.factoringCreditId});
    },
  },
};
</script>

<style scoped>
.down {
  margin-left: 750px;
}
</style>
