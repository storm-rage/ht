<template>
  <div>
    <zj-list-layout noBottomBorder>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="供应商名称：">
            <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="核心企业：">
            <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
          </el-form-item>
        </el-form>
      </template>
      <zj-table ref="searchTable"
                :dataList="list"
                :params="searchForm"
                :api="zjControl.tableApi">
        <zj-table-column field="field1" title="供应商编码">
        </zj-table-column>
        <zj-table-column field="field2" title="供应商名称" />
        <zj-table-column field="field3" title="核心企业编码"/>
        <zj-table-column field="field4" title="核心企业名称"/>
        <zj-table-column field="field5" title="核心企业是否海天集团"/>
        <zj-table-column field="field6" title="保理标识"/>
        <zj-table-column field="field7" title="贸易关系状态"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="toSubmitPayment(row)" :api="zjBtn.getEnterprise">确认收款</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
  </div>
</template>
<script>
export default {
  data () {
    return {
      zjControl: {},
      searchForm: {},
      list: [
        {
          field1: '45435435',
          field2: '十分发达省份',
          field3: '655464565',
          field4: '地方官梵蒂冈梵蒂冈',
          field5: '是',
          field6: '呵呵',
          field7: '正常'
        }
      ]
    }
  },
  methods: {
    toSubmitPayment (row) {
      this.$router.push({name: 'otherConfirmPaymentApply'})
    }
  }
}
</script>
