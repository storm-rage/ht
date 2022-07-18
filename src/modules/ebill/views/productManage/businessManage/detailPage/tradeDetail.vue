<template>
  <el-form ref="form" label-width="160px">
    <zj-content-block>
      <zj-header title="贸易关系"></zj-header>
      <zj-content>
        <zj-table ref="tradeTable"
                  :dataList="tradeList"
                  row-id="tradeId"
                  :pager="false"
                  @radio-change="handleRadioChange"
                  :radio-config="{highlight: true,checkRowKey: defaultSelectRowId}">
          <zj-table-column type="radio"  width="50"/>
          <zj-table-column field="field1" title="核心企业名称"/>
          <zj-table-column field="field2" title="核心企业是否海天集团"/>
          <zj-table-column
            field="field3"
            title="核心企业统一社会信用代码"
          />
          <zj-table-column
            field="field4"
            title="保理标识"
          />
          <zj-table-column field="field5" title="结算周期"/>
          <zj-table-column field="field6" title="供应商总额度" :formatter="money"/>
          <zj-table-column field="field7" title="预计年采购金额" :formatter="money"/>
          <zj-table-column field="field7" title="贸易关系状态"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <!--  产品  -->
    <div v-if="currentTrade.tradeId">
      <zj-content-block>
        <zj-header :title="`${currentTrade.field9}业务设置-${currentTrade.field1}`"></zj-header>
        <zj-content>
          <div style="width: 67%;margin: 0 auto">
            <el-row>
              <el-col :span="12">
                <el-form-item label="保理追索方式：" >
                  <el-select v-model="form.field1" disabled>
                    <el-option></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="保理融资形式：">
                  <el-select v-model="form.field1" disabled>
                    <el-option></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="订单保理额度期限：">
                  <el-input disabled v-model="form.field3">
                    <template slot="append">月</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="受让应收账款开始日：">
                  <el-date-picker v-model="form.field1" disabled></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="受让应收账款结束日：">
                  <el-date-picker v-model="form.field1" disabled></el-date-picker>&nbsp;共x天
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="订单融资月利率：">
                  <el-input disabled v-model="form.field3">
                    <template slot="append">%</template>
                  </el-input>&nbsp;<zj-text-tip text="注：订单融资日利率=订单融资月利率/30"></zj-text-tip>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </zj-content>
      </zj-content-block>
      <zj-content-block>
        <zj-header :title="`${currentTrade.field10}业务设置-${currentTrade.field1}`"></zj-header>
        <zj-content>
          <el-row>
            <el-col :span="24">
              <el-form-item label="开单宽限天数：">
                10天
              </el-form-item>
            </el-col>
          </el-row>
          <zj-table :dataList="customList">
            <zj-table-column
              field="field1"
              title="电子债权凭证期限（天）"/>
            <zj-table-column
              field="field2"
              title="凭证可用折扣"/>
            <zj-table-column
              field="field3"
              title="凭证融资月利率"/>
          </zj-table>
          <bill-info-text-tip></bill-info-text-tip>
        </zj-content>
      </zj-content-block>
      <!--  其他附件    -->
      <other-file-setting></other-file-setting>
    </div>
  </el-form>
</template>
<script>
import BillInfoTextTip from '../components/billInfoTextTip';
import OtherFileSetting from '../components/otherFileSetting';
export default {
  props: {
    tradeList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    tradeList () {
      if (this.tradeList&& this.tradeList.length) {
        this.defaultSelectRowId = this.tradeList[0].tradeId
      }
    }
  },
  components: {
    BillInfoTextTip,
    OtherFileSetting
  },
  data () {
    return {
      customList: [],
      form: {
        field1: 'tretetre',
        field2: '打工的广泛大概',
        field3: '高度公分的',
        field4: '广泛大锅饭大概',
        field5: '疯狂课件课件课件',
        field6: '招生银行',
        field7: '62343434343'
      },
      // 默认勾选第一个供应商
      defaultSelectRowId: '',
      //当前选中的贸易对象
      currentTrade: {}
    };
  },
  methods: {
    handleRadioChange({row}) {
      this.currentTrade = row;
    }
  }
};
</script>
