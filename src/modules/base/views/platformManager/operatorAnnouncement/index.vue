<template>
  <div class="operatorAnnouncement">
    <div class="zj-search-condition">
      <el-row class="button-row">
        <zj-button class="reset" icon="el-icon-refresh" @click="resetSearch"
          >重置</zj-button
        >
        <zj-button class="search" icon="el-icon-search" @click="search"
          >查询</zj-button
        >
      </el-row>
      <el-form ref="searchForm" :model="searchForm">
        <el-form-item label="类型：" class="col-center">
          <el-select
            v-model="searchForm.isGenerateVoucher"
            placeholder="请选择"
            clearable
            :popper-append-to-body="false"
          >
            <el-option value="" label="全部"></el-option>
            <!-- <el-option
              v-for="item in dictionary.isGenerateVouchers"
              :key="item.code"
              :label="item.desc"
              :value="item.code"
            >
            </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="转让申请日期：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
        </el-form-item>
        <el-form-item label="申请流水号：">
          <el-input
            v-model="searchForm.issueEntName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>
      </el-form>
    </div>

    <div class="zj-search-response">
      <zj-button class="zj-m-l-10 mb-10 mt-10" type="primary" @click="add"
        >新增</zj-button
      >
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column field="ebillCode" title="类型" />
        <zj-table-column field="issueEntName" title="标题" />
        <zj-table-column field="issueEntName" title="对象" />
        <zj-table-column field="issueEntName" title="内容" />
        <zj-table-column
          field="issueEntName"
          title="有效期起始时间"
          :formatter="date"
        />
        <zj-table-column
          field="issueEntName"
          title="有效期截止时间"
          :formatter="date"
        />
        <zj-table-column field="issueEntName" title="开关状态" />
        <zj-table-column
          field="issueEntName"
          title="创建时间"
          :formatter="date"
        />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="toDetail(row)"
              :api="zjBtn.getEnterprise"
              >详情</zj-button
            >
            <zj-button
              type="text"
              @click="toDetail(row)"
              :api="zjBtn.getEnterprise"
              >修改</zj-button
            >
            <zj-button
              type="text"
              @click="toDetail(row)"
              :api="zjBtn.getEnterprise"
              >删除</zj-button
            >
          </template>
        </zj-table-column>
      </zj-table>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      center
      width="60%"
      :title="
        type == 'add'
          ? '运营公告新增'
          : type == 'update'
          ? '运营公告修改'
          : '运营公告详情'
      "
      custom-class="mbi-editDialog"
      @close="cancel"
      top="6vh"
    >
      <el-form
        ref="form"
        class="mbi-form"
        :model="formModel"
        :rules="formRules"
        :class="editFlag ? '' : 'nmb0'"
        label-width="140px"
      >
        <el-form-item
          label="类型："
          prop="entName"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <el-select
            v-if="type != 'info'"
            v-model="formModel.isGenerateVoucher"
            placeholder="请选择"
            clearable
            :disabled="true"
            :popper-append-to-body="false"
          >
            <el-option value="" label="公告"></el-option>
            <!-- <el-option
              v-for="item in dictionary.isGenerateVouchers"
              :key="item.code"
              :label="item.desc"
              :value="item.code"
            >
            </el-option> -->
          </el-select>
          <span v-else>公告</span>
        </el-form-item>
        <el-form-item
          label="标题："
          :class="{ 'zj-m-b-5': !editFlag }"
          prop="invoiceTaxpayerId"
        >
          <el-input
            v-if="type != 'info'"
            v-model="formModel.invoiceTaxpayerId"
          />
          <span v-else>标题标题标题</span>
        </el-form-item>
        <el-form-item
          label="对象："
          prop="invoiceAddress"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <div v-if="type != 'info'">
            <el-radio v-model="formModel.type" label="1">门户</el-radio>
            <el-radio v-model="formModel.type" label="2">运营</el-radio>
          </div>
          <span v-else>标题标题标题</span>
        </el-form-item>
        <el-form-item
          label="内容："
          prop="invoicePhone"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <el-input  v-if="type != 'info'" type="textarea" v-model="formModel.invoicePhone" />
          <p v-else>内容内容内容内容内容</p>
        </el-form-item>
        <el-form-item
          label="图片："
          prop="invoiceBankInfo"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <zj-upload />
        </el-form-item>
        <el-form-item
          label="有效期："
          prop="invoiceBankAccno"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <zj-date-range-picker v-if="type != 'info'"
            :startDate.sync="formModel.expireDateStart"
            :endDate.sync="formModel.expireDateEnd"
          />
          <span v-else>2021-01-01至2021-09-01</span>
        </el-form-item>
        <el-form-item
          label="开关："
          prop="invoiceEmail"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <el-switch v-model="formModel.invoiceEmail" />
        </el-form-item>
      </el-form>

      <el-row slot="footer" class="dialog-footer">
        <zj-button type="primary" @click="save">保存</zj-button>
        <zj-button class="back" @click="dialogVisible = false">取消</zj-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zjControl: {},
      searchForm: {},
      dialogVisible: false,
      type: "info",
      tableData: [{ id: 1 }],
      formModel: {},
    };
  },
  methods: {
    add(e) {
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
</style>