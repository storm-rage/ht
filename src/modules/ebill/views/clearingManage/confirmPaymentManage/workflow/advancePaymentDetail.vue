<template>
<el-form ref="form" label-width="160px">
  <zj-content-block>
    <zj-header title="提前还款"></zj-header>
    <zj-content>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="还款日期：">
            2022-09-09
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="提前还款金额：">
            {{money('10000')}}
            <p>{{digitUp('10000')}}</p>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="本次计息天数：">
            20天
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="本次还款本金：">
            {{money('10000')}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="本次还款利息：">
            {{money('4')}}
          </el-form-item>
        </el-col>
      </el-row>
    </zj-content>
  </zj-content-block>
  <zj-content-block>
    <zj-header title="融资信息"></zj-header>
    <zj-content>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="融资流水号：">
            656546546
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="融资合同编号：">
           7567575675675676
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="融资月利率：">
            7%
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="融资金额：">
            {{money('10000')}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="融资开始日：">
            2022-09-09
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="融资到期日：">
            2023-09-0
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="已还款本金：">
            {{money('10000')}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上次还款日期：">
            2023-09-08
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="融资业务状态：">
            部分还款
          </el-form-item>
        </el-col>
      </el-row>
      <zj-collapse title="还款记录" class="zj-m-t-10">
        <zj-table ref="billTable"
                  :dataList="paymentList" >
          <zj-table-column type="seq" title="序号" width="60"/>
          <zj-table-column field="field1" title="还款方式"/>
          <zj-table-column field="field2" title="凭证编"/>
          <zj-table-column
            field="field3"
            title="还款日期"
          />
          <zj-table-column
            field="field4"
            title="还款金额"
            :formatter="money"
          />
          <zj-table-column field="field5" title="还款本金" :formatter="money"/>
          <zj-table-column field="field6" title="还款利息" :formatter="money"/>
          <!--   底部信息       -->
          <div slot="pager-left" style="position: absolute;left: 0">
            <span>还款金额合计：</span>{{money('1000')}}&nbsp;&nbsp;&nbsp;
            <span>已还款本金合计：</span>{{money('1000')}}&nbsp;&nbsp;&nbsp;
            <span>已还款利息合计：</span>{{money('1000')}}&nbsp;&nbsp;&nbsp;
          </div>
        </zj-table>
      </zj-collapse>
    </zj-content>
  </zj-content-block>
  <zj-content-block>
    <zj-header title="协议信息"></zj-header>
    <zj-table ref="billTable"
              :pager="false"
              :dataList="paymentList" >
      <zj-table-column type="seq" title="序号" width="50"/>
      <zj-table-column field="field2" title="协议编号"/>
      <zj-table-column
        field="field3"
        title="协议名称"
      />
      <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button v-if="row.fileId" type="text" @click="toDownload(row)">下载</zj-button>
          </template>
      </zj-table-column>
    </zj-table>
  </zj-content-block>
  <!-- 附件信息   -->
  <payment-file :is-edit="false"></payment-file>
</el-form>
</template>

<script>
/**
 * 提前还款流水详情页面
 */
import PaymentFile from '../components/paymentFile';
export default {
  name: 'BillAdvancePaymentDetail',
  components: {PaymentFile},

  data () {
    return {
      paymentList: []
    };
  },
  methods: {
    toDownload (row) {}
  }
}
</script>
