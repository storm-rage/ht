<template>
  <div>
    <!-- 折叠面板 -->
    <el-collapse ref="elCollapse" v-model="collActive" class="zjcoll-noSelect">
      <!-- 贸易关系 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle">贸易关系</h4>
        </template>
        <zj-table
          ref="searchTable"
          :params="searchForm"
          :api="zjControl.tableApi"
        >
          <zj-table-column prop="id" title="序号" />
          <zj-table-column field="" title="买方企业名称" />
          <zj-table-column field="" title="是否已有订单保理额度" />
          <zj-table-column field="" title="额度总额" :formatter="money" />
          <zj-table-column field="" title="可用额度" :formatter="money" />
          <zj-table-column title="操作" fixed="right">
            <template>
              <zj-button
                type="text"
                @click="&quot;&quot;;"
                :api="zjBtn.getEnterprise"
                >维护记录</zj-button
              >
            </template>
          </zj-table-column>
        </zj-table>
      </el-collapse-item>

      <!-- 阶段性协议信息 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle">阶段性协议信息</h4>
        </template>
        <div class="zj-search-condition">
          <el-form ref="searchForm" :model="searchForm">
            <el-form-item label="状态：" class="col-center">
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
            <el-form-item label="协议签订日期：" class="col-right">
              <zj-date-range-picker
                :startDate.sync="searchForm.expireDateStart"
                :endDate.sync="searchForm.expireDateEnd"
              />
            </el-form-item>
            <el-form-item label="贸易合同编号：">
              <el-input v-model="searchForm.issueEntName" />
            </el-form-item>
            <el-form-item label="协议类型：" class="col-center">
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
          </el-form>
        </div>
        <zj-table
          ref="searchTable"
          :params="searchForm"
          :api="zjControl.tableApi"
        >
          <zj-table-column prop="id" title="买方企业名称" />
          <zj-table-column field="" title="阶段性协议编号" />
          <zj-table-column field="" title="阶段性协议名称" />
          <zj-table-column field="" title="协议签订日期" :formatter="date" />
          <zj-table-column field="" title="协议类型" />
          <zj-table-column field="" title="协议预计到期日" :formatter="date" />
          <zj-table-column field="" title="协议附件" />
          <zj-table-column field="" title="状态" />
          <zj-table-column title="操作" fixed="right">
            <template>
              <zj-button
                type="text"
                @click="&quot;&quot;;"
                :api="zjBtn.getEnterprise"
                >下载</zj-button
              >
            </template>
          </zj-table-column>
        </zj-table>
      </el-collapse-item>
    </el-collapse>
    <!-- 工作流 -->
    <zj-workflow>
      <el-row slot="right">
        <zj-button
          class="back"
          @click="$router.push('/openBillApply')"
          :api="zjBtn.passBillSignBatch"
          >返回</zj-button
        >
      </el-row>
    </zj-workflow>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {},
      searchForm: {},
      collActive: ["orderInfo"],
      checked: false,
    };
  },
  created() {},
  methods: {},
};
</script>
<style lang="less" scoped>
</style>