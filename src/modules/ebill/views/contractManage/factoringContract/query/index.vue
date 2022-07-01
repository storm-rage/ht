<template>
  <div>
    <div class="zj-search-condition">
      <el-row class="button-row">
        <zj-button class="reset" icon="el-icon-refresh" @click="resetSearch">重置</zj-button>
        <zj-button class="search" icon="el-icon-search" @click="search">查询</zj-button>
      </el-row>

      <el-form ref="searchForm" :model="searchForm">
        <el-form-item label="合同编号：">
          <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
        </el-form-item>

        <el-form-item label="合同签署类型：">
          <el-select v-model="contractType">
            <el-option value="1"/>
            <el-option value="2"/>
            <el-option value="3"/>
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
            <el-option value="全部"/>
            <el-option value="待复核"/>
          </el-select>
        </el-form-item>

        <el-form-item label="申请流水号：">
          <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
        </el-form-item>

        <el-form-item label="签约结果：">
          <el-select v-model="signingResults">
            <el-option value="全部"/>
            <el-option value="待复核"/>
            <el-option value="3"/>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="zj-search-response">
      <zj-table ref="searchTable" :dataList="list" :params="searchForm" :api="zjControl.tableApi">
        <zj-table-column type="seq" title="序号" width="60"/>
        <zj-table-column field="field1" title="申请流水号" />
        <zj-table-column field="field2" title="合同签署类型" />
        <zj-table-column field="field3" title="合同编号" />
        <zj-table-column field="field4" title="合同名称"/>
        <zj-table-column field="field5" title="申请状态"/>
        <zj-table-column field="field6" title="签约结果"/>
        <zj-table-column field="field7" title="申请时间"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="toViewDetail(row)" :api="zjBtn.getEnterprise">详情</zj-button>
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
          field1: '5435455',
          field2: '首次签约合同',
          field3: '789797898',
          field4: '国内商业保理合同',
          field5: '待复核',
          field6: '签约成功',
          field7: '2021.01.01 11:11:22'
        }
      ]
    }
  },
  created() {
    // this.getApi()
  },
  methods: {
    toViewDetail() {
      this.$router.push({name: 'mySignContractDetail'});
    }
  }
}
</script>
