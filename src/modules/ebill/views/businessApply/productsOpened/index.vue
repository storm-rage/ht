<template>
  <div>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="申请日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.applyDateStart"
              :endDate.sync="searchForm.applyDateEnd"
            />
          </el-form-item>
          <el-form-item label="申请状态：" class="col-center">
            <el-select v-model="searchForm.applyStatus"
                       placeholder="请选择"
                       clearable
                       :popper-append-to-body="false" >
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in dictionary.applyStatus"
                :key="item.code"
                :label="item.desc"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template slot="btnGroups">
        <div style="padding-top: 20px">
          <zj-button type="primary" :api="zjBtn.openApply" @click="toApply">产品开通申请</zj-button>
        </div>
      </template>
      <zj-table ref="searchTable" :params="searchForm" :api="zjControl.tableApi">
        <zj-table-column field="serialNo" title="申请流水号"/>
        <zj-table-column field="productApplyDatetime" title="申请时间"/>
        <zj-table-column field="productType" title="申请产品" :formatter="(obj) => typeMap(dictionary.productType, obj.cellValue)"/>
        <zj-table-column field="applyStatus" title="申请状态" :formatter="(obj) => typeMap(dictionary.applyStatus, obj.cellValue)"/>
      </zj-table>
    </zj-list-layout>
  </div>
</template>
<script>

export default {
  data() {
    return {
      zjControl: {
        getDataDirectory: this.$api.productOpenApply.getDataDirectory,
        tableApi: this.$api.productOpenApply.queryProudctApplyPage,
        openApply: this.$api.productOpenApply.submitProductOpenAplly,
      },
      searchForm:{
        applyDateStart: '',
        applyDateEnd: '',
        applyStatus: ''
      },
      // 字典
      dictionary: {}
    }
  },
  created() {
    this.getApi()
    this.zjControl.getDataDirectory().then(res => {
      this.dictionary = res.data
    })
  },
  methods: {
    //跳转申请页面
    toApply() {
      this.$router.push({name:'productsOpenedApply'})
    }
  }
}
</script>
