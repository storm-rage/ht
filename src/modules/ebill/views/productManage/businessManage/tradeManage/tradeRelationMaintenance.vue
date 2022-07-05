<template>
  <zj-content-container>
    <zj-top-header title="维护供应商业务参数"></zj-top-header>
    <el-form ref="form" :model="form" :rules="rules" label-width="160px">
      <!--  客户基本信息  -->
      <supplier-base-info title="客户基本信息"></supplier-base-info>
      <!--   贸易关系   -->
      <zj-content-block>
        <zj-header title="贸易关系"></zj-header>
        <zj-content>
          <zj-table ref="tradeTable"  :dataList="tradeList" >
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
          <div>
            <zj-collapse title="基础信息维护"  class="zj-m-t-10">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="保理标识：" prop="field1">
                    <el-select v-model="form.field1"></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="预计年采购金额：" prop="field1">
                   <zj-number-input v-model="form.field1">
                     <template slot="append">元</template>
                   </zj-number-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="结算周期：" prop="field1">
                    <el-select v-model="form.field1"></el-select>
                    &nbsp;<zj-text-tip text="注：结算周期从mdm取值仅供参考，最终以平台维护为准。"></zj-text-tip>
                  </el-form-item>
                </el-col>
              </el-row>
            </zj-collapse>
          </div>
        </zj-content>
      </zj-content-block>
      <zj-content-block>
        <zj-header title="请选择需要维护产品"></zj-header>
        <zj-content>
          <el-tree
            :data="treeData"
            show-checkbox
            node-key="id"
            default-expand-all
            :props="defaultProps"
            @check="handleTreeChange"
          ></el-tree>
        </zj-content>
      </zj-content-block>
      <zj-content-block v-for="(item,index) in needMaintenanceProducts" :key="`${index}product`">
        <zj-header :title="`${item.label}业务设置-海天另一个公司`"></zj-header>
        <zj-content v-if="item.code === 'orderBl'">
          <el-row>
            <el-col :span="8">
              <el-form-item label="保理合同编号：" >
               55454354
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保理合同有效期：" >
                2022.09.09～2023.09.09
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保理合同状态：" >
                生效
              </el-form-item>
            </el-col>
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
                <el-input v-model="form.field3">
                  <template slot="append">%</template>
                </el-input>&nbsp;<zj-text-tip text="注：订单融资日利率=订单融资月利率/30"></zj-text-tip>
              </el-form-item>
            </el-col>
          </el-row>
        </zj-content>
        <zj-content v-if="item.code === 'bill'">
          <el-row>
            <el-col :span="24">
              <el-form-item label="开单宽限天数：">
                {{billInfo.openBillMaxDay}}天
              </el-form-item>
            </el-col>
          </el-row>
          <zj-table :dataList="billInfo.list">
            <zj-table-column
              field="field1"
              title="电子债权凭证期限（天）">
              <template v-slot="{row}">
                {{row.startDay}}～{{row.endDay}}
              </template>
            </zj-table-column>
            <zj-table-column
              field="discountAmt"
              title="凭证可用折扣"/>
            <zj-table-column
              field="financeRate"
              title="凭证融资月利率"/>
          </zj-table>
          <div class="zj-center">
            <el-button @click="toMaintenanceBillInfo(item)" style="width: 100px" size="small" type="primary">维护</el-button>
          </div>
          <bill-info-text-tip></bill-info-text-tip>
        </zj-content>
      </zj-content-block>
      <!--  其他附件    -->
      <other-file-setting ref="ofileSetting" is-edit></other-file-setting>
    </el-form>
    <zj-content-footer>
      <zj-button class="confirm" @click="back">提交申请</zj-button>
      <zj-button class="back" @click="back">返回</zj-button>
    </zj-content-footer>
    <bill-info-maintenance ref="billInfoMaintenance" @done="handleBillMaintenanceDone"></bill-info-maintenance>
  </zj-content-container>
</template>
<script>
import SupplierBaseInfo from '../components/supplierBaseInfo';
import OtherFileSetting from '../components/otherFileSetting';
import BillInfoTextTip from '../components/billInfoTextTip';
import BillInfoMaintenance from './dialog/billInfoMaintenance';
export default {
  components: {
    SupplierBaseInfo,
    OtherFileSetting,
    BillInfoTextTip,
    BillInfoMaintenance
  },
  data () {
    return {
      form: {},
      rules: {},
      tradeList: [],
      treeData: [
        {
          id: '0',
          label: '全部',
          children: [
            {
              id: '1',
              label: '订单保理',
              code: 'orderBl'
            },
            {
              id: '2',
              label: '电子债券凭证',
              code: 'bill'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      needMaintenanceProducts: [],
      billInfo: {
        openBillMaxDay: 0,
        list: []
      },
    }
  },
  methods: {
    handleTreeChange (list,{checkedNodes}) {
      console.error(checkedNodes);
      this.needMaintenanceProducts = checkedNodes.filter((item) => {
        return item.id !== '0';
      })
    },
    toMaintenanceBillInfo (item) {
      this.$refs.billInfoMaintenance.show(this.billInfo, `${item.label}业务设置-海天另一个公司`);
    },
    handleBillMaintenanceDone (obj) {
      this.billInfo = Object.assign({}, obj);
    },
    back () {}
  }
};
</script>
