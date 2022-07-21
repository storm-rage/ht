<template>
  <zj-content-container>
    <!--  客户信息明细  -->
    <zj-list-layout>
      <zj-table ref="searchTable" :dataList="list">
        <zj-table-column field="field1" title="姓名"/>
        <zj-table-column field="field2" title="证件类型"/>
        <zj-table-column field="field3" title="证件号码"/>
        <zj-table-column field="field4" title="手机号"/>
        <zj-table-column field="field5" title="邮箱"/>
        <zj-table-column field="field6" title="内部系统账号"/>
        <zj-table-column field="field6" title="操作员角色"/>
        <zj-table-column field="field6" title="支持对账单类型"/>
      </zj-table>
    </zj-list-layout>
  </zj-content-container>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      searchForm: {
        statisticsMonth: '',
      },
      list: [
        {
          field1: 'scm00001',
          field2: '某某产品一号',
          field3: '上游',
          field4: '订单保理',
          field5: '2022.09.08 11:18:19',
          field6: '生效',
          field7: '是'
        }
      ],
      tradeList: []
    };
  },
  methods: {
    /**
     *
     * @param row
     */
    toContractDetail(row) {
      console.error(row);
      this.$router.push({name: 'businessDetail'});
    },
    /**
     *
     * @param row
     */
    toContractSign(row) {
      console.log(row);
    },
    handleRadioChange({row}) {
      this.tradeList.push({
        field1: '佛山市a有限公司',
        field2: '是',
        field3: '756756756767',
        field4: '非保理',
        field5: '12',
        field6: '1000',
        field7: '2000',
        field8: '正常'
      })
    },
    toDetail (row) {
      this.goChild('productInfoManageDetail', row)
    },
    toEdit (row) {
      this.goChild('productInfoManageEdit', row)
    },
    toEditQuota (row) {},
  }
};
</script>
