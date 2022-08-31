<template>
  <div>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="合同编号：">
            <el-input v-model.trim="searchForm.contractNo" @keyup.enter.native="enterSearch"/>
          </el-form-item>

          <el-form-item label="合同签署类型：">
            <el-select v-model="searchForm.applyType">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in dictionary.applyType"
                :key="`${item.code}applyType`"
                :label="item.desc"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="申请日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.applyStartDate"
              :endDate.sync="searchForm.applyEndDate"
            />
          </el-form-item>

          <el-form-item label="申请状态：">
            <el-select v-model="searchForm.applyStatus">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in dictionary.applyStatus"
                :key="`${item.code}applyStatus`"
                :label="item.desc"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="申请流水号：">
            <el-input v-model.trim="searchForm.serialNo" @keyup.enter.native="enterSearch"/>
          </el-form-item>

          <el-form-item label="签约结果：">
            <el-select v-model="searchForm.contractSignStatus">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in dictionary.contractSignStatus"
                :key="`${item.code}contractSignStatus`"
                :label="item.desc"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <zj-table ref="searchTable" :params="searchForm" :api="zjControl.tableApi">
        <zj-table-column type="seq" title="序号" width="60"/>
        <zj-table-column field="serialNo" title="申请流水号" />
        <zj-table-column field="applyTypeDesc" title="合同签署类型" />
        <zj-table-column field="contractNo" title="合同编号" />
        <zj-table-column field="contractName" title="合同名称"/>
        <zj-table-column field="applyStatusDesc" title="申请状态">
          <template v-slot="{row}">
            <span v-if="row.contractSignStatus==='1'">
              <el-popover placement="left" width="280" trigger="hover">
                <p>拒绝时间：{{row.rejectDatetime}}</p>
                <p>拒绝原因：{{row.rejectReason}}</p>
                <el-link slot="reference" :underline="false" type="primary">{{row.applyStatusDesc}}</el-link>
              </el-popover>
            </span>
            <span v-else>{{row.applyStatusDesc}}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="applyTypeDesc" title="签约结果"/>
        <zj-table-column field="applyDate" title="申请时间" :formatter="obj=>formatDate(obj.cellValue)" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text"
                       v-if="row.contractSignStatus!=='1'"
                       @click="toViewDetail(row)"
                       :api="zjBtn.queryMyEbContractDetail">详情</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
  </div>
</template>
<script>
import {formatDate} from '@utils/index'
export default {
  data() {
    return {
      zjControl: {
        tableApi: this.$api.factoringContract.queryMyEbContractPage,
        getEbContractDirectory: this.$api.factoringContract.getEbContractDirectory,
        queryMyEbContractDetail: this.$api.factoringContract.queryMyEbContractDetail
      },
      searchForm:{
        contractNo: '',
        applyType: '',
        applyStartDate: '',
        applyEndDate: '',
        applyStatus: '',
        serialNo:'',
        contractSignStatus: ''
      },
      // 字典
      dictionary: {}
    }
  },
  computed: {
    formatDate() {
      return formatDate
    }
  },
  created() {
    this.getApi();
    this.getDic();
  },
  methods: {
    getDic() {
      this.zjControl.getEbContractDirectory().then((res) => {
        this.dictionary = res.data
      });
    },
    toViewDetail(row) {
      this.goChild('mySignContractDetail',{serialNo: row.serialNo})
    }
  }
}
</script>
