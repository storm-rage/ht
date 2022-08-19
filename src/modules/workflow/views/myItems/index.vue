<template>
  <zj-content-container>
    <zj-tabs v-model="tabAtive" @tab-click="handleClick">
      <el-tab-pane label="代办" name="agenda"> </el-tab-pane>
      <el-tab-pane label="已办" name="pending"> </el-tab-pane>
      <el-tab-pane label="已办结" name="processed"> </el-tab-pane>
    </zj-tabs>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm">
          <el-form-item label="申请流水号：">
            <el-input
              v-model="searchForm.serialNo"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="业务类型：" class="col-center">
            <el-select v-model="searchForm.busType">
              <el-option
                v-for="item in dictionary.busType"
                :label="item.desc"
                :value="item.code"
                :key="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="接收日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.startTimeStart"
              :endDate.sync="searchForm.startTimeEnd"
            />
          </el-form-item>
          <el-form-item label="发起方：">
            <el-select v-model="searchForm.startObject">
              <el-option
                v-for="item in dictionary.busType"
                :label="item.desc"
                :value="item.code"
                :key="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商名称：" v-if="tabAtive === 'agenda'">
            <el-input
              v-model="searchForm.sellerEntName"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
        </el-form>
      </template>
    </zj-list-layout>
    <zj-content>
      <zj-table ref="searchTable" :params="searchForm" :api="tableApi">
        <zj-table-column field="serialNo" title="申请流水号"
          ><template v-slot="{ row }">
            <span class="table-elbill-code" @click="toDetail(row)">{{
              row.serialNo
            }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="sellerEntName" title="供应商名称" />
        <zj-table-column field="busType" title="业务类型" />
        <zj-table-column
          field="applyType"
          title="申请类型"
          v-if="tabAtive === 'agenda'"
        />
        <zj-table-column field="loginName" title="操作类型" v-else />
        <zj-table-column field="startObject" title="发起方" />
        <zj-table-column
          field="startTime"
          title="接收时间"
          v-if="tabAtive === 'agenda'"
        />
        <zj-table-column field="startTime" title="处理时间" v-else />
        <zj-table-column field="roleNames" title="申请状态" />
        <zj-table-column
          title="操作"
          fixed="right"
          v-if="tabAtive === 'agenda'"
        >
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="toHandle(row)"
              :api="zjBtn.getEnterprise"
              >处理</zj-button
            >
            <zj-button
              type="text"
              @click="toCancellation(row.id)"
              :api="zjBtn.getEnterprise"
              >作废</zj-button
            >
          </template>
        </zj-table-column>
      </zj-table>
    </zj-content>
  </zj-content-container>
</template>

<script>
export default {
  name: "myItems",
  components: {},
  data() {
    return {
      tabAtive: "agenda",
      searchForm: {},
      zjControl: this.$api.myItems,
      fileList: [],
      dictionary: {},
      tableApi: this.$api.myItems.myTodoList,
    };
  },
  created() {},
  methods: {
    // 切换表格api
    handleClick({ name }) {
      if (name === "agenda") {
        this.tableApi = this.$api.myItems.myTodoList;
      }
      if (name === "pending") {
        this.tableApi = this.$api.myItems.myTodoDoneList;
      }
      if (name === "processed") {
        this.tableApi = this.$api.myItems.myTodoDoneFinishedList;
      }
    },
    // 跳转对应的详情
    toDetail(row) {
      if (row.basType) {
        this.goChild("", row);
      }
    },
    // 跳转对应的审核
    toHandle(row) {
      if (row.basType) {
        this.goChild("", row);
      }
    },
    // 作废
    toCancellation() {
      this.$confirm("是否确认提作废该条数据?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$message({
          type: "success",
          message: "废除成功!",
        });
      });
    },
  },
};
</script>

<style lang="less">
</style>
