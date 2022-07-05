<template>
  <zj-content-container>
    <zj-top-header title="供应商业务设置详情"></zj-top-header>
    <el-form ref="form" label-width="160px">
      <!--  客户基本信息  -->
      <supplier-base-info title="客户基本信息"></supplier-base-info>
<!--      <zj-content-block>-->
<!--        <zj-header title="客户基本信息"></zj-header>-->
<!--        <zj-content>-->
<!--          <zj-table :dataList="customList">-->
<!--            <zj-table-column-->
<!--              field="field1"-->
<!--              title="供应商名称"/>-->
<!--            <zj-table-column-->
<!--              field="field2"-->
<!--              title="供应商编码"/>-->
<!--            <zj-table-column-->
<!--              field="field3"-->
<!--              title="供应商统一社会信用代码"/>-->
<!--            <zj-table-column-->
<!--              field="field4"-->
<!--              title="申请产品"/>-->
<!--          </zj-table>-->
<!--          <div>-->
<!--            <zj-collapse title="供应商业务联系人"  class="zj-m-t-10">-->
<!--              <el-row>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="联系人：" >-->
<!--                    {{form.field1}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="联系号码：">-->
<!--                    {{form.field2}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="联系邮箱：">-->
<!--                    {{form.field3}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="联系地址：">-->
<!--                    {{form.field4}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--              </el-row>-->
<!--            </zj-collapse>-->
<!--            <zj-collapse title="供应商收款账户" class="zj-m-t-10">-->
<!--              <el-row>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="银行账户名称：" >-->
<!--                    {{form.field5}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="开户银行：">-->
<!--                    {{form.field6}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="银行账号：">-->
<!--                    {{form.field7}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--              </el-row>-->
<!--            </zj-collapse>-->
<!--          </div>-->
<!--        </zj-content>-->
<!--      </zj-content-block>-->
      <!--  贸易关系  -->
      <zj-content-block>
        <zj-header title="贸易关系"></zj-header>
        <zj-content>
          <zj-table ref="tradeTable"  :dataList="tradeList"  @radio-change="handleRadioChange" :radio-config="{highlight: true}">
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
      <div v-if="currentTrade.field1">
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
      </div>
      <!--   其他附件     -->
      <zj-content-block>
        <zj-header title="其他附件"></zj-header>
        <zj-content>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注：" label-width="130px">
                <el-input disabled v-model="form.field3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <zj-table :dataList="customList">
            <zj-table-column type="seq" title="序号" width="60"/>
            <zj-table-column
              field="field1"
              title="附件"/>
            <zj-table-column
              field="field2"
              title="附件说明"/>
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{ row }">
                <zj-button type="text" @click="toDownload(row)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
    </el-form>
    <zj-content-footer>
      <zj-button  class="back" @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import SupplierBaseInfo from '../components/supplierBaseInfo';
import BillInfoTextTip from '../components/billInfoTextTip';
export default {
  components: {
    SupplierBaseInfo,
    BillInfoTextTip
  },
  data() {
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
      tradeList: [
        {
          field1: '佛山市a有限公司',
          field2: '是',
          field3: '756756756767',
          field4: '非保理',
          field5: '12',
          field6: '1000',
          field7: '2000',
          field8: '正常',
          field9: '保理产品',
          field10: '电子凭证'
        }
      ],
      //当前选中的贸易对象
      currentTrade: {}
    }
  },
  methods: {
    handleRadioChange({row}) {
      this.currentTrade = row;
    },
    toDownload(row) {},
    back() {}
  }
}
</script>
