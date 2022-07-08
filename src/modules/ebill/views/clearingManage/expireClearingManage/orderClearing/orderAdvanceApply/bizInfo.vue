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
        </el-row>
      </zj-content>
    </zj-content-block>
    <!--   待清算提前收款   -->
    <zj-content-block>
      <zj-header title="待清算提前收款"></zj-header>
      <zj-content>
        <zj-table ref="billTable"
                  :pager="false"
                  @radio-change="handleRadioChange"
                  :radio-config="{highlight: true}"
                  :dataList="billList" >
          <zj-table-column type="radio" width="40px" fixed="left"></zj-table-column>
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
          <zj-table-column field="field5" title="收款单号"/>
          <zj-table-column field="field6" title="融资流水号" />
          <zj-table-column field="field9" title="提前还款日期" :formatter="date"/>
          <zj-table-column field="field9" title="提前还款金额" :formatter="money"/>
          <zj-table-column field="field7" title="还款本金" :formatter="money"/>
          <zj-table-column field="field7" title="还款利息" :formatter="money"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="融资详情"></zj-header>
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
            <el-form-item label="已还款本金：">
              {{money('1000000000')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="往期未偿还利息：">
              {{money('1000000000')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="利息起算日：">
              2023-09-08
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本次还款日期：">
              2023-09-08
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本次计息天数：">
              30
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本次还款金额：">
              {{money('122222')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本次还款本金：">
              {{money('122222')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本次还款利息：">
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
    }
  }
}
</script>
