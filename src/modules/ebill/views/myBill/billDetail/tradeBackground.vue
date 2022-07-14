<template>
  <zj-content-block>
    <zj-top-header>电子债权凭证详情</zj-top-header>
    <!-- 凭证信息 -->
    <zj-content-block>
      <zj-header title="凭证信息"></zj-header>
      <zj-content>
        <zj-table
          ref="searchTable"
          :pager="false"
          :params="searchForm"
          :api="zjControl.queryReceivedBillList"
        >
          <zj-table-column field="id" title="凭证编号"></zj-table-column>
          <zj-table-column field="issueEntName" title="凭证签发人" />
          <zj-table-column field="issueEntName" title="原始持有人" />
          <zj-table-column
            field="issueDate"
            title="签发日期"
            :formatter="date"
          />
          <zj-table-column
            field="ebillAmt"
            title="凭证金额"
            :formatter="money"
          />
          <zj-table-column
            field="transferAmt"
            title="剩余可用金额"
            :formatter="money"
          />
          <zj-table-column
            field="expireDate"
            title="到期日期"
            :formatter="date"
          />
          <zj-table-column
            field="state"
            title="凭证状态"
            :formatter="
              (obj) => typeMap(dictionary.enterpriseStateList, obj.cellValue)
            "
          />
        </zj-table>
      </zj-content>
    </zj-content-block>
    <!-- 对账单信息 -->
    <zj-content-block>
      <zj-header title="对账单信息-xxxxx"></zj-header>
      <zj-content>
        <zj-table
          ref="searchTable"
          :pager="false"
          :params="searchForm"
          :api="zjControl.tableApi"
        >
          <zj-table-column prop="id" title="对账单编号" />
          <zj-table-column field="" title="买方名称" />
          <zj-table-column field="" title="供应商编码" />
          <zj-table-column field="" title="供应商名称" />
          <zj-table-column field="" title="是否申请开立债权凭证" />
          <zj-table-column field="" title="对账日期" :formatter="date" />
          <zj-table-column
            field=""
            title="入库日期/放行日期"
            :formatter="date"
          />
          <zj-table-column field="" title="预计付款日期" :formatter="date" />
          <zj-table-column field="" title="对账单金额" />
          <zj-table-column field="" title="对账单来源" />
        </zj-table>
      </zj-content>
    </zj-content-block>
    <!-- 对账单明细 -->
    <zj-content-block>
      <zj-header title="对账单明细-xxxxx"></zj-header>
      <zj-content>
        <zj-table
          ref="searchTable"
          :params="searchForm"
          :api="zjControl.tableApi"
        >
          <zj-table-column prop="id" title="po单号" />
          <zj-table-column field="" title="dn单号" />
          <zj-table-column field="" title="物料编码" />
          <zj-table-column field="" title="物料名称" />
          <zj-table-column field="" title="单位" />
          <zj-table-column field="" title="入库日期" :formatter="date" />
          <zj-table-column field="" title="仓库" />
          <zj-table-column field="" title="入库数量" />
          <zj-table-column field="" title="退货数量" />
          <zj-table-column field="" title="等级" />
          <zj-table-column field="" title="订单单价" />
          <zj-table-column field="" title="折价" />
          <zj-table-column field="" title="结算单价" />
          <zj-table-column field="" title="税率%" />
          <zj-table-column field="" title="净额" />
          <zj-table-column field="" title="税额" />
          <zj-table-column field="" title="总计金额" />
        </zj-table>
      </zj-content>
    </zj-content-block>
    <!-- 贸易背景资料-对账单编号 -->
    <zj-content-block>
      <zj-header title="贸易背景资料-对账单编号"></zj-header>
      <zj-content>
        <zj-tabs v-model="tabAtive">
          <el-tab-pane
            :label="item.label"
            v-for="(item, index) in tabsList"
            :key="index"
            :name="item.name"
          >
            <!-- 贸易合同信息 -->
            <zj-content-block v-if="tabAtive === 'htxx'">
              <el-form ref="form" label-width="160px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="贸易合同编号：" prop="field1">
                      546565465
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="买方：" prop="field1">
                      业务申请
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="卖方：" prop="field1">
                      状态
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同金额：" prop="field1">
                      2022-09-08 11:18:19
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="签订日期：" prop="field1">
                      2022-09-08 11:18:19
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="货物名称：" prop="field1">
                      2022-09-08 11:18:19
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同附件：" prop="field1">
                      2022-09-08 11:18:19
                      <el-link :underline="false" type="primary">下载</el-link>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="阶段性协议编号：" prop="field1">
                      2022-09-08 11:18:19
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="阶段性协议名称：" prop="field1">
                      2022-09-08 11:18:19
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </zj-content-block>
            <!-- 发票信息 -->
            <zj-content-block v-if="tabAtive === 'fpxx'">
              <zj-content>
                <zj-table
                  class="zj-search-table"
                  :dataList="detailData.pubInvoiceInfoList"
                >
                  <zj-table-column field="invoiceType" title="发票类型" />
                  <zj-table-column field="invoiceNumber" title="发票号码" />
                  <zj-table-column field="invoiceCode" title="发票代码" />
                  <zj-table-column
                    field="totalAmtLowcase"
                    title="发票金额"
                    :formatter="money"
                  />
                  <zj-table-column field="seller" title="销售方" />
                  <zj-table-column field="buyer" title="购买方" />
                  <zj-table-column
                    field="invoiceDate"
                    title="发票日期"
                    :formatter="date"
                  />
                  <zj-table-column field="buyer" title="附件" />
                  <zj-table-column title="操作" fixed="right">
                    <template v-slot="{ row }">
                      <zj-button type="text" @click="toDownload(row)"
                        >下载</zj-button
                      >
                    </template>
                  </zj-table-column>
                </zj-table>
              </zj-content>
            </zj-content-block>
            <!-- 其他附件 -->
            <zj-content-block v-if="tabAtive === 'qtfj'">
              <zj-content>
                <zj-table
                  class="zj-search-table"
                  :dataList="detailData.pubInvoiceInfoList"
                >
                  <zj-table-column type="seq" title="序号" />
                  <zj-table-column field="buyer" title="文件名称" />
                  <zj-table-column title="操作" fixed="right">
                    <template v-slot="{ row }">
                      <zj-button type="text" @click="toDownload(row)"
                        >下载</zj-button
                      >
                    </template>
                  </zj-table-column>
                </zj-table>
              </zj-content>
            </zj-content-block>
          </el-tab-pane>
        </zj-tabs>
      </zj-content>
    </zj-content-block>
  </zj-content-block>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {},
      zjControl: {},
      detailData: {},
      tabAtive: "htxx",
      tabsList: [
        { label: "贸易合同信息", name: "htxx" },
        { label: "发票信息", name: "fpxx" },
        { label: "其他附件", name: "qtfj" },
      ],
    };
  },
  created() {
    this.getApi();
  },
  methods: {},
};
</script>

<style scoped lang="less">
</style>
