<template>
  <div>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="供应商名称：">
            <el-input v-model.trim="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
          </el-form-item>

          <el-form-item label="合同状态：">
            <el-select v-model="contractType">
              <el-option value="1"/>
              <el-option value="2"/>
              <el-option value="3"/>
            </el-select>
          </el-form-item>

          <el-form-item label="是否海天一级供应商：">
            <el-select v-model="applicationStatus">
              <el-option value="全部"/>
              <el-option value="待复核"/>
            </el-select>
          </el-form-item>

          <el-form-item label="合同生效日：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>

          <el-form-item label="合同编号：">
            <el-input v-model.trim="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
          </el-form-item>
        </el-form>
      </template>
      <zj-table ref="searchTable" :dataList="list" :params="searchForm" :api="zjControl.tableApi">
        <zj-table-column field="field1" title="供应商名称" />
        <zj-table-column field="field2" title="是否海天一级供应商" />
        <zj-table-column field="field3" title="供应商统一社会信用代码" />
        <zj-table-column field="field4" title="合同编号"/>
        <zj-table-column field="field5" title="合同名称"/>
        <zj-table-column field="field6" title="合同生效日期"/>
        <zj-table-column field="field7" title="合同失效日期"/>
        <zj-table-column field="field8" title="合同状态"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="toViewDetail(row)" :api="zjBtn.getEnterprise">详情</zj-button>
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
      zjControl: {},
      searchForm:{
        issueEntName: '',
        expireDateStart: '',
        expireDateEnd: '',
        ebillAmtStart: '',
        ebillAmtEnd: '',
        ebillCode:'',
        issueDateStart: '',
        issueDateEnd: '',
      },
      list: [
        {
          field1: '佛山市a有限公司',
          field2: '是',
          field3: '789797898',
          field4: '86786786787878',
          field5: '国内商业保理合同',
          field6: '2022.09.09',
          field7: '2023.09.09',
          field8: '生效'
        }
      ]
    }
  },
  created() {
    // this.getApi()
  },
  methods: {
    toViewDetail() {
      this.$router.push({name: 'factoringContractDetail'});
    }
  }
}
</script>
