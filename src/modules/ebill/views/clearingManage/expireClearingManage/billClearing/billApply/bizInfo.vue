<template>
  <el-form ref="form" label-width="160px">
    <!-- 基础信息   -->
    <zj-content-block>
      <zj-header title="基础信息"></zj-header>
      <zj-content>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="当前持有人名称：">
              方法士大夫士大夫
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签发人：">
              哥哥豆腐干豆腐干更广泛广泛大概
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="待清算凭证金额总计：">
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
    <!--   待清算凭证   -->
    <zj-content-block>
      <zj-header title="待清算凭证"></zj-header>
      <zj-content>
        <zj-table ref="billTable"
                  :pager="false"
                  :dataList="billList" >
          <zj-table-column field="field1" title="原始凭证编号"/>
          <zj-table-column field="field2" title="收款单号"/>
          <zj-table-column
            field="field3"
            title="资金流水号"
          />
          <zj-table-column
            field="field4"
            title="凭证编号"
          />
          <zj-table-column field="field5" title="签发人"/>
          <zj-table-column field="field6" title="签发日期" />
          <zj-table-column field="field7" title="原始持有人"/>
          <zj-table-column field="field8" title="当前持有人"/>
          <zj-table-column field="field9" title="凭证金额" :formatter="money"/>
          <zj-table-column field="field9" title="凭证到期日"/>
          <zj-table-column field="field9" title="凭证实际到期日"/>
          <zj-table-column field="field9" title="最终付款金额" :formatter="money"/>
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
