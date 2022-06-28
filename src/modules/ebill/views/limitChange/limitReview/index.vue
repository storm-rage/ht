<template>
  <div>
    <div class="zj-search-condition">
      <el-row class="button-row">
        <zj-button class="reset" icon="el-icon-refresh" @click="resetSearch"
          >重置</zj-button
        >
        <zj-button class="search" icon="el-icon-search" @click="search"
          >查询</zj-button
        >
      </el-row>

      <el-form ref="searchForm" :model="searchForm">
        <el-form-item label="买方企业名称：">
          <el-input
            v-model="searchForm.issueEntName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>

        <el-form-item label="申请日期：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
        </el-form-item>

        <el-form-item label="申请调加额度：">
          <el-input-number
            v-model="num"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="10"
          ></el-input-number
          >至
          <el-input-number
            v-model="num"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="申请流水号：">
          <el-input
            v-model="searchForm.issueEntName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="zj-search-response">
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column field="ebillCode" title="凭证编号">
          <template v-slot="{ row }">
            <span class="table-elbill-code" @click="toBillDetails(row)">{{
              row.ebillCode
            }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="issueEntName" title="序号" />
        <zj-table-column
          field="ebillAmt"
          title="申请流水号"
          :formatter="money"
        />
        <zj-table-column
          field="transferAmt"
          title="合同签署类型"
          :formatter="money"
        />
        <zj-table-column field="splusAmt" title="合同编号" :formatter="money" />
        <zj-table-column field="issueDate" title="合同名称" :formatter="date" />
        <zj-table-column
          field="receiveDate"
          title="申请状态"
          :formatter="date"
        />
        <zj-table-column
          field="expireDate"
          title="签约结果"
          :formatter="date"
        />
        <zj-table-column
          field="expireDate"
          title="申请时间"
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
              >详情</zj-button
            >
          </template>
        </zj-table-column>
      </zj-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {},
      searchForm: {
        issueEntName: "",
        expireDateStart: "",
        expireDateEnd: "",
        ebillAmtStart: "",
        ebillAmtEnd: "",
        ebillCode: "",
        issueDateStart: "",
        issueDateEnd: "",
      },
      contractType: "", // 合同签署类型
      applicationStatus: "", // 申请状态
      signingResults: "", // 签约结果
    };
  },
  created() {
    this.getApi();
  },
  methods: {
    toBillDetails(row) {
      console.log(row);
    },
    goChild() {
      this.$router.push("/contractSingningDetails");
    },
  },
};
</script>
