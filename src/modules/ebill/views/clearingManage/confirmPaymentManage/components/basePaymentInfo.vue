<template>
  <el-form ref="form" label-width="160px">
    <zj-content-block>
      <zj-header title="基础信息"></zj-header>
      <zj-content>
        <el-row :gutter="10" v-if="isBill">
          <el-col :span="8">
            <el-form-item label="确认收款总金额：">
              {{money('10000')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="确认收款日期：">
              {{date('2022-09-09')}}
            </el-form-item>
          </el-col>
        </el-row>
        <zj-table ref="supplierTable"
                  :pager="false"
                  :dataList="supplierList" >
          <zj-table-column field="field1" title="资金流水号"/>
          <zj-table-column field="field2" title="付款方名称"/>
          <zj-table-column
            field="field3"
            title="收款金额"
            :formatter="money"
          />
          <zj-table-column
            field="field4"
            title="收款时间"
          />
          <zj-table-column field="field5" title="收款方名称"/>
          <zj-table-column field="field6" title="收款账号" />
          <zj-table-column field="field7" title="SA单号"/>
          <zj-table-column field="field8" title="已关联金额" :formatter="money"/>
          <zj-table-column field="field9" title="供应商简称"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </el-form>
</template>
<script>
/**
 * 凭证收款和非凭证收款基础信息
 */
export default {
  props: {
    // 是否是凭证收款
    isBill: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      supplierList: [
        {
          field1: '12312312',
          field2: '士大夫士大夫的',
          field3: '10000',
          field4: '2022-10-10',
          field5: '发士大夫士大夫大师傅',
          field6: '6232423434',
          field7: 'SA666546546',
          field8: '20000',
          field9: '十分士大夫地方'
        }
      ],
    }
  }
}
</script>
