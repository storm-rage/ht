<template>
  <zj-content-container>
    <zj-tabs v-model="tabAtive" type="card" @tab-click="handleClick">
      <el-tab-pane label="待办" name="agenda"> </el-tab-pane>
      <el-tab-pane label="已办" name="pending"> </el-tab-pane>
      <el-tab-pane label="已办结" name="processed"> </el-tab-pane>
    </zj-tabs>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm">
          <el-form-item label="申请流水号：">
            <el-input v-model="searchForm.serialNo" @keyup.enter.native="enterSearch" />
          </el-form-item>
          <el-form-item label="业务类型：" class="col-center">
            <el-select v-model="searchForm.busType">
              <el-option label="全部" value="" />
              <el-option v-for="item in dictionary.busTypeList" :label="item.desc" :value="item.code" :key="item.code" />
            </el-select>
          </el-form-item>
          <el-form-item label="接收日期：" class="col-right">
            <zj-date-range-picker :startDate.sync="searchForm.startTimeStart" :endDate.sync="searchForm.startTimeEnd" />
          </el-form-item>
          <el-form-item label="发起方：">
            <el-select v-model="searchForm.startObject">
              <el-option label="全部" value="" />
              <el-option v-for="item in dictionary.startObjectList" :label="item.desc" :value="item.code" :key="item.code" />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商名称：" v-if="tabAtive === 'agenda'">
            <el-input v-model="searchForm.sellerEntName" @keyup.enter.native="enterSearch" />
          </el-form-item>
        </el-form>
      </template>
    </zj-list-layout>
    <zj-content>
      <zj-table ref="searchTable" :params="searchForm" :api="tableApi">
        <zj-table-column field="serialNo" title="申请流水号"><template v-slot="{ row }">
            <span class="table-elbill-code" @click="toDetail(row)">{{
              row.serialNo
            }}</span>
          </template>
        </zj-table-column>
        <zj-table-column field="sellerEntName" title="供应商名称" />
        <zj-table-column field="busTypeDesc" title="业务类型" />
        <zj-table-column field="applyTypeDesc" title="申请类型" v-if="tabAtive === 'agenda'" />
        <zj-table-column field="operateType" title="操作类型" v-else />
        <zj-table-column field="startObject" title="发起方" :formatter="(obj) => typeMap(dictionary.startObjectList, obj.cellValue)" />
        <zj-table-column field="startTime" title="接收时间" :formatter="obj=>formatDate(obj.cellValue)" v-if="tabAtive === 'agenda'" />
        <zj-table-column field="endTime" title="处理时间" :formatter="obj=>formatDate(obj.cellValue)" v-else />
        <zj-table-column field="workflowState" title="申请状态" :formatter="(obj) => typeMap(dictionary.workflowStateList, obj.cellValue)" />
        <zj-table-column title="操作" fixed="right" v-if="tabAtive === 'agenda'">
          <template v-slot="{ row }">
            <zj-button type="text" @click="toHandle(row)" v-if="!['A000','D010','E000','S001','U000'].includes(row.workflowState)">处理</zj-button>
            <span v-else>—</span>
            <zj-button type="text" @click="toCancellation(row)" v-if="['E005','U006','S004'].includes(row.workflowState) && row.startObject === 'PT'">作废</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-content>
  </zj-content-container>
</template>

<script>
import { myItemsPath } from '../../constant'
export default {
  name: "myItems",
  components: {},
  data() {
    return {
      tabAtive: "agenda",
      searchForm: {
        serialNo: "",
        busType: "",
        startTimeStart: "",
        startTimeEnd: "",
        startObject: "",
        sellerEntName: "",
      },
      zjControl: this.$api.myItems,
      fileList: [],
      dictionary: {},
      tableApi: this.$api.myItems.myTodoList,
    };
  },
  created() {
    console.log(myItemsPath)
    this.getDirectory()
    this.getRow()
    this.row.busType && (this.searchForm.busType = this.row.busType)
  },
  methods: {
    // 获取字典
    getDirectory() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data;
      });
    },
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
      if (this.tabAtive === 'agenda') {
        // 代办
        if (myItemsPath[row.busType].detailPath) {
          this.goChild(myItemsPath[row.busType].detailPath, row);
        }
        else if (myItemsPath[row.busType][row.applyType][row.workflowState].detailPath) {
          this.goChild(myItemsPath[row.busType][row.applyType][row.workflowState].detailPath, row);
        }
      } else {
        // 已办和已办结
        if (myItemsPath[row.busType].doneDetailPath) {
          this.goChild(myItemsPath[row.busType].doneDetailPath, { ...row, tabAtive: this.tabAtive });
        } else {
          this.goChild(myItemsPath[row.busType][row.applyType].doneDetailPath, { ...row, tabAtive: this.tabAtive });
        }
      }
    },
    // 跳转对应的审核
    toHandle(row) {
      if (this.tabAtive === 'agenda') {
        // 代办
        if (myItemsPath[row.busType].auditPath) {
          this.goChild(myItemsPath[row.busType].auditPath, row, 'todo');
        } else if (myItemsPath[row.busType][row.applyType][row.workflowState].auditPath) {
          this.goChild(myItemsPath[row.busType][row.applyType][row.workflowState].auditPath, row , 'todo');
        }
      }
    },
    // 作废
    toCancellation(row) {
      this.$confirm("是否确认提作废该条数据?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = {
          serialNo: row.serialNo,
          workflowState: row.workflowState,
          busType: row.busType
        }
        this.zjControl.invalidateFlowable(params).then(res => {
          this.$message({
            type: "success",
            message: "作废成功!",
          });
          this.search()
        })

      });
    },
  },
};
</script>

<style lang="less">
</style>
