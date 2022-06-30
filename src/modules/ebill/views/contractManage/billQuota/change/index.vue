<template>
  <div>
    <div data-v-2cce9ee5="" data-v-f5a55c9a="" class="money-block">
      <img
        data-v-2cce9ee5=""
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAA0JJREFUWAnNWE1IVFEUPue+mVGc0aACd4FSOdBgm8IIUp+boAzTUfOntVDQ3zqisUW01EUbVy60kWYkLK1WY7oKdCNZKdhCiiwqBBdmznvvdO7Ak9F57/Xmx6EDw733/H7vnnPvefMQmDoSXRcNhPtIcJIAfJK334QA24SwIAj6Y01jU5gCATC534Gd/AuAZkGIESelYshkNgQQ1RYjmFMMWRKcouLUhBMQiYHT839QPkA2AXC1UI+RIxBcFR7ldDmWBBnMy0KAyR4IwpyvDOpi9aMfhtXhLVFZ04oIE/mCyQqIDHiovKIxeib63QwcOxHZDkGwHQGfmrxcRvdAEAdDjcG2oVNDXBu7KaJGNFRbexBxVEp4XOffAIP7ulvTfvVPIOzMYPNb42r0dgQjcp5BRHxZz05cYUEto3gUgJLquBq9owhxWV7lGQYWDAwnuvgY29KmUKA71jD23E6jc6bngmFQP+/DfKkiHozUj6yl67L/m7weTOdZzW2BcD18Y4SXxtWxeSvD9pmrZ8HQH7JsDUG5F1NHVqz0JC883R3nGzxsJ5d8JyC/geCHnTEB+hHJYLBbdjomHwkV1isBpAPs02Py00dLZkoBlXBcHX2VrpzvvDPRc14H47WVH9tiRaJdubYyzpane+x92u+IQ5TwbHct6BDnE7EYaqxphzcgFmHpGRAeQ49ok5edg7mlyHZHLLWZ2fu2twJ1cQSBVvjYti5OLw+8o6XHRNDMNbAEml7VMX09YGdvx896R7QkVhFpL0yHBHRjZ07QwkXZAt71EPPem3w3Y9ZAjINHP4qfn6qlcyHQqyW3lzlFus8rjpsBA6WBz+bc7Zh1amRvIdDPGUZyStOSqWbHu6D80YzJ1E+nOm4DSbcATL2sd0Qacn184f2YITLkgwQlA3mdkhnkur9IfZNyAhJriCbYQaJvvs/7a2Ojj985jXjTk2um01zGrFOTSxA3NnkBkbXg9/sOl/l9lW6COenY9xoQd1HBnWPq5MStjGuqmbuTbJQZZAskQ3OfGXmlppDY/h8gfCu6epUr5NPv9SUx8J9wWNgrKPY69XlCfp8oduC98SQGIT+ScKFwC4e5YqYpFYtjytgSw1/RTg336qQGHQAAAABJRU5ErkJggg=="
      /><span data-v-2cce9ee5="" class="text">可使用融单金额：</span
      ><span data-v-2cce9ee5="" class="money">¥ 0.00</span
      ><span data-v-2cce9ee5="" class="tips-text"
        >可使用融单金额：当前状态为“正常持有”的，折扣后的可用金额</span
      >
    </div>

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
        <el-form-item label="合同编号：">
          <el-input
            v-model="searchForm.issueEntName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>

        <el-form-item label="合同签署类型：">
          <el-select v-model="contractType">
            <el-option value="1" />
            <el-option value="2" />
            <el-option value="3" />
          </el-select>
        </el-form-item>

        <el-form-item label="申请日期：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
        </el-form-item>

        <el-form-item label="申请状态：">
          <el-select v-model="applicationStatus">
            <el-option value="全部" />
            <el-option value="待复核" />
          </el-select>
        </el-form-item>

        <el-form-item label="申请流水号：">
          <el-input
            v-model="searchForm.issueEntName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>

        <el-form-item label="合同签署类型：">
          <el-select v-model="applicationStatus">
            <el-option value="全部" />
            <el-option value="待复核" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="zj-search-response">
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column field="ebillCode" title="原始凭证编号">
          <template v-slot="{ row }">
            <span class="table-elbill-code" @click="toBillDetails(row)">{{
              row.ebillCode
            }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="issueEntName" title="凭证编号" />
        <zj-table-column field="ebillAmt" title="签发人" :formatter="money" />
        <zj-table-column
          field="transferAmt"
          title="原始持有人"
          :formatter="money"
        />
        <zj-table-column
          field="splusAmt"
          title="凭证签发日"
          :formatter="money"
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
        <zj-table-column
          field="expireDate"
          title="凭证金额"
          :formatter="date"
        />
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
    </div>

    <div class="down">
      <el-row class="button-row">
        <el-button class="search" type="primary" @click="reTrun"
          >发起转让申请</el-button
        >
      </el-row>
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
      this.$router.push("/limitChangeDetails");
    },
  },
};
</script>

<style scoped>
.down {
  margin-left: 750px;
}
</style>