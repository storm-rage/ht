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
          <zj-table-column prop="id" title="买方企业名称" />
          <zj-table-column field="" title="是否已有订单保理额度" />
          <zj-table-column field="" title="额度总额" />
          <zj-table-column field="" title="可用额度" />
        </zj-table>
      </el-collapse-item>

      <!-- 阶段性协议信息 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle">阶段性协议信息</h4>
        </template>
        <zj-table
          ref="searchTable"
          :params="searchForm"
          :api="zjControl.tableApi"
        >
          <zj-table-column prop="id" title="买方企业名称" />
          <zj-table-column field="" title="阶段性协议编号" />
          <zj-table-column field="" title="阶段性协议名称" />
          <zj-table-column field="" title="协议类型" />
          <zj-table-column field="" title="协议签订日期" :formatter="date" />
          <zj-table-column field="" title="协议预计到期日" :formatter="date" />
          <zj-table-column field="" title="路径描述" />
          <zj-table-column field="" title="状态" />
        </zj-table>
      </el-collapse-item>

      <!--上传贸易合同附件 -->
      <el-collapse-item name="orderInfo" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle">请上传贸易合同附件</h4>
        </template>
        <zj-table
          ref="searchTable"
          :params="searchForm"
          :api="zjControl.tableApi"
        >
          <zj-table-column prop="id" title="序号" />
          <zj-table-column field="" title="合同附件" />
          <zj-table-column field="" title="附件说明" />
          <zj-table-column title="操作" fixed="right">
            <template>
              <zj-button
                type="text"
                @click="&quot;&quot;;"
                :api="zjBtn.getEnterprise"
                >下载</zj-button
              >
              <zj-button
                type="text"
                @click="&quot;&quot;;"
                :api="zjBtn.getEnterprise"
                >删除</zj-button
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
          @click="$router.push('/openBillApply')"
          :api="zjBtn.passBillSignBatch"
          >提交</zj-button
        >
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