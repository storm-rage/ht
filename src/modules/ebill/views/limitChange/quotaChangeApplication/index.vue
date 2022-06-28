<template>
  <div>
    <h1 slot="title" class="orderTitle bl">保理合同</h1>

    <zj-table ref="searchTable" :params="searchForm">
      <zj-table-column field="ebillAmt" title="合同编号" :formatter="money" />
      <zj-table-column field="splusAmt" title="合同名称" :formatter="money" />
      <zj-table-column
        field="issueDate"
        title="合同生效日期"
        :formatter="date"
      />
      <zj-table-column
        field="receiveDate"
        title="合同失效日期"
        :formatter="date"
      />
      <zj-table-column field="receiveDate" title="合同状态" :formatter="date" />
      <zj-table-column title="操作" fixed="right">
        <template>
          <zj-button type="text" @click="goChild">详情</zj-button>
        </template>
      </zj-table-column>
    </zj-table>

    <h1 slot="title" class="orderTitle bl">额度信息</h1>

    <zj-table ref="searchTable" :params="searchForm">
      <zj-table-column field="issueEntName" title="序号" />
      <zj-table-column field="ebillAmt" title="协议编号" :formatter="money" />
      <zj-table-column
        field="splusAmt"
        title="买方企业名称"
        :formatter="money"
      />
      <zj-table-column
        field="issueDate"
        title="合同/协议名称"
        :formatter="date"
      />
      <zj-table-column field="receiveDate" title="生效日期" :formatter="date" />
      <zj-table-column
        field="receiveDate"
        title="合同/协议状态"
        :formatter="date"
      />
      <zj-table-column title="操作" fixed="right">
        <template v-slot="{ row }">
          <zj-button
            type="text"
            @click="goChild('entManageDetail', row)"
            :api="zjBtn.getEnterprise"
            >下载</zj-button
          >
        </template>
      </zj-table-column>
    </zj-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {},
    };
  },
};
</script>

<style scoped>
</style>
