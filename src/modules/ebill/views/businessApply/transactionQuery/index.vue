<template>
  <zj-content-container>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="申请日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.applyDatetimeStart"
              :endDate.sync="searchForm.applyDatetimeEnd"
            />
          </el-form-item>
          <el-form-item label="申请状态：" class="col-center">
            <el-select
              v-model="searchForm.applyStatus"
              placeholder="请选择"
              clearable
              :popper-append-to-body="false"
            >
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
          <el-form-item label="申请流水号：" class="col-center">
            <el-input v-model="searchForm.serialNo" />
          </el-form-item>
        </el-form>
      </template>

      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column field="serialNo" title="申请流水号" />
        <zj-table-column
          field="busType"
          title="申请类型"
          :formatter="(obj) => typeMap(dictionary.busType, obj.busType)"
        />
        <zj-table-column
          field="applyDatetime"
          title="申请时间"
          :formatter="date"
        />
        <zj-table-column
          field="state"
          title="申请状态"
          :formatter="(obj) => typeMap(dictionary.applyStatus, obj.applyStatus)"
        />
      </zj-table>
    </zj-list-layout>
  </zj-content-container>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {
        ...this.$api.maintainTransaction,
      },
      searchForm: {},
      dictionary: {},
    };
  },
  created() {
    this.getApi();
    this.getDirectory();
  },
  methods: {
    // 获取字典
    getDirectory() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data;
      });
    },
    toBillDetails(row) {
      console.log(row);
    },
  },
};
</script>
