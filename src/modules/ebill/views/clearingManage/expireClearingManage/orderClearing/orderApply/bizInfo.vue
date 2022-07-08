<template>
  <el-form ref="form" label-width="160px">
    <!-- 基础信息   -->
    <zj-content-block>
      <zj-header title="基础信息"></zj-header>
      <zj-content>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="供应商名称：">
              方法士大夫士大夫
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核心企业名称：">
              哥哥豆腐干豆腐干更广泛广泛大概
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="待清算金额总计：">
              {{money('122222')}}
            </el-form-item>
          </el-col>
        </el-row>
        <zj-collapse title="供应商收款银行账号" class="zj-m-t-10">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="收款账户名称：">
                感豆腐干豆腐干梵蒂冈的灌灌灌灌郭德纲
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收款账号：">
                623423324324324324
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收款账户开户行：">
                广泛大锅饭大概公分的个古风格梵蒂冈地方官
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行联行号：">
                12123232
              </el-form-item>
            </el-col>
          </el-row>
        </zj-collapse>
      </zj-content>
    </zj-content-block>
    <!--   待清算订单清单   -->
    <zj-content-block>
      <zj-header title="待清算订单清单"></zj-header>
      <zj-content>
        <zj-table ref="billTable"
                  :pager="false"
                  :dataList="billList" >
          <zj-table-column field="field1" title="核心企业代码"/>
          <zj-table-column field="field2" title="核心企业名称"/>
          <zj-table-column
            field="field3"
            title="供应商编码"
          />
          <zj-table-column
            field="field4"
            title="供应商名称"
          >
          </zj-table-column>
          <zj-table-column field="field6" title="融资流水号" />
          <zj-table-column field="field5" title="收款单号"/>
          <zj-table-column field="field7" title="确认收款日期" :formatter="date"/>
          <zj-table-column field="field9" title="确认收款金额" :formatter="money"/>
          <zj-table-column field="field9" title="实际付款金额" :formatter="money"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </el-form>
</template>
<script>
/**
 * 业务信息，工作流共享
 */
export default {
  data () {
    return {
      billList: [
        {

        }
      ]
    }
  }
}
</script>
