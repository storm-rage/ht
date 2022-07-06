<template>
  <div>
    <div class="zj-search-condition">
      <el-row class="button-row">
        <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch">重置</vxe-button>
        <vxe-button class="search" icon="el-icon-search" @click="search">查询</vxe-button>
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

        <el-form-item label="申请增加额度：">
          <zj-amount-range :startAmt.sync="searchForm.ebillAmtStart" :endAmt.sync="searchForm.ebillAmtEnd"></zj-amount-range>
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
        :dataList="list"
        :api="zjControl.tableApi"
      >
        <zj-table-column field="field1" title="申请流水号"></zj-table-column>
        <zj-table-column field="field2" title="买方企业名称" />
        <zj-table-column
          field="field3"
          title="申请增加额度"
          :formatter="money"
        />
        <zj-table-column
          field="field4"
          title="调整前额度"
          :formatter="money"
        />
        <zj-table-column
          field="field5"
          title="调整后额度"
          :formatter="money"
        />
        <zj-table-column field="field6" title="额度到期日" :formatter="date" />
        <zj-table-column field="field7" title="申请时间" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="toReviewDetail(row)"
              :api="zjBtn.getEnterprise">复核</zj-button>
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
      list: [
        {
          field1: 't000001',
          field2: '测试企业001',
          field3: '1000',
          field4: '12000',
          field5: '13000',
          field6: '2024-09-01',
          field7: '2021-09-01 11:22:22',
        }
      ]
    };
  },
  created() {
    // this.getApi();
  },
  methods: {
    toReviewDetail() {
      this.$router.push({name: 'quotaChangeReview'});
    },
  },
};
</script>
