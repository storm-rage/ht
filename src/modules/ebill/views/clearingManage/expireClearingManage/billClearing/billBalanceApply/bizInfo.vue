<template>
  <el-form ref="form" label-width="160px">
    <!-- 基础信息   -->
    <zj-content-block>
      <zj-header title="基础信息"></zj-header>
      <zj-content>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="收款人名称：">
              方法士大夫士大夫
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签发人：">
              哥哥豆腐干豆腐干更广泛广泛大概
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="待清算尾款金额总计：">
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
    <!--   待清算凭证尾款   -->
    <zj-content-block>
      <zj-header title="待清算凭证尾款"></zj-header>
      <zj-content>
        <zj-table ref="billTable"
                  :pager="false"
                  @radio-change="handleRadioChange"
                  :radio-config="{highlight: true}"
                  :dataList="billList" >
          <zj-table-column type="radio" width="40px" fixed="left"></zj-table-column>
          <zj-table-column field="field1" title="原始凭证编号"/>
          <zj-table-column field="field2" title="收款单号"/>
          <zj-table-column
            field="field3"
            title="资金流水号"
          />
          <zj-table-column
            field="field4"
            title="凭证编号"
          >
            <template v-slot="{row}">
              <el-link @click="toViewDetail(row)" type="primary" :underline="false">{{row.field4}}</el-link>
            </template>
          </zj-table-column>
          <zj-table-column field="field5" title="签发人"/>
          <zj-table-column field="field6" title="签发日期" />
          <zj-table-column field="field9" title="凭证金额" :formatter="money"/>
          <zj-table-column field="field7" title="尾款金额" :formatter="money"/>
          <zj-table-column field="field9" title="凭证到期日" :formatter="date"/>
          <zj-table-column field="field9" title="凭证实际到期日" :formatter="date"/>
          <zj-table-column field="field8" title="收款人"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="融资详情-xxxxx（此处为凭证编号）"></zj-header>
      <zj-content>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="融资流水号：">
              方法士大夫士大夫
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="放款单号：">
              哥哥豆腐干豆腐干更广泛广泛大概
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="融资金额：">
              {{money('122222')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="融资类型：">
              方法士大夫士大夫
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="融资开始日：">
              哥哥豆腐干豆腐干更广泛广泛大概
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="融资到期日：">
              2022-01-01
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际融资到期日：">
              方法士大夫士大夫
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="融资月利率：">
              7%
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际计息天数：">
              30
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际利息：">
              {{money('122222')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际尾款金额：">
              {{money('122222')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="还款状态：">
              已还款
            </el-form-item>
          </el-col>
        </el-row>
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
      ],
      // 当前选中的行
      currentSelectBill:{}
    }
  },
  methods: {
    handleRadioChange({row}) {
      this.currentSelectBill = row;
    },
    toViewDetail (row) {}
  }
}
</script>
