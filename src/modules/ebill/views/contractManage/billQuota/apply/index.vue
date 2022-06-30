<template>
  <div>
    <zj-content-block>
      <zj-header title="保理合同"></zj-header>
      <zj-content>
        <zj-table ref="searchContractTable"  :dataList="contractList">
          <zj-table-column field="field1" title="合同编号"/>
          <zj-table-column field="field2" title="合同名称"/>
          <zj-table-column
            field="field3"
            title="合同生效日期"
            :formatter="date"
          />
          <zj-table-column
            field="field4"
            title="合同失效日期"
            :formatter="date"
          />
          <zj-table-column field="field5" title="合同状态"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="toContractDetail(row)">详情</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>

    <zj-content-block>
      <zj-header title="额度信息"></zj-header>
      <zj-content>
        <zj-table ref="searchQuotaTable" :dataList="quotaList">
          <zj-table-column type="seq" title="序号" width="60"/>
          <zj-table-column field="field2" title="买方企业名称" />
          <zj-table-column
            field="field3"
            title="应收账款转让期限"
          />
          <zj-table-column
            field="field4"
            title="授信额度"
            :formatter="money"
          />
          <zj-table-column field="field5" title="额度期限（月）"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button
                type="text"
                @click="toApplyPage(row)"
                :api="zjBtn.getEnterprise">额度变更申请</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      contractList: [
        {
          field1: '1221321323',
          field2: '国内商业保理合同',
          field3: '2022-06-01 10:10:10',
          field4: '2023-06-01 10:10:10',
          field5: '生效'
        }
      ],
      quotaList: [
        {
          field1: '1',
          field2: '海天a公司',
          field3: '2022.09.09 ～ 2023.09.08',
          field4: '100,000,000.00',
          field5: '4'
        },
        {
          field1: '2',
          field2: '海天b公司',
          field3: '2022.09.09 ～ 2023.09.08',
          field4: '100,000,000.00',
          field5: '5'
        }
      ]
    };
  },
  methods: {
    toContractDetail(row) {
      this.$router.push({name: 'domesticBusiness'})
    },
    toApplyPage(row) {}
  }
};
</script>

<style scoped>
</style>
