<template>
  <zj-content-container>
    <zj-top-header title="供应商额度管理"></zj-top-header>
    <el-form ref="form" :model="form" :rules="rules" label-width="160px">
      <!--  供应商基本信息  -->
      <supplier-base-info title="供应商基本信息"></supplier-base-info>
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
        </zj-content>
      </zj-content-block>
      <!--   产品名称   -->
      <zj-content-block>
        <zj-header title="产品名称"></zj-header>
        <zj-content>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="保理合同编号：" prop="field1">
               23424234234
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保理合同有效期：" prop="field1">
                2022.09.09～2023.09.09
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保理合同状态：" prop="field1">
                生效
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保理追索方式：" prop="field1">
                有追索权
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保理融资形式：" prop="field1">
                明保理
              </el-form-item>
            </el-col>
          </el-row>
          <zj-table ref="financeTable"
                    keep-source
                    :pager="false"
                    :edit-config="{trigger: 'manual',mode: 'row',icon: '-',autoClear: false,showStatus: true}"
                    :dataList="financeList">
            <zj-table-column
              field="field1"
              :edit-render="{name: '$input',props: {maxlength: 200}}"
              :formatter="money"
              title="订单保理额度（元）">
            </zj-table-column>
            <zj-table-column
              field="field2"
              title="订单保理额度期限（月）"/>
            <zj-table-column
              field="field3"
              title="订单保理额度有效期"/>
            <zj-table-column
              field="field4"
              title="应收账款转让有效期"/>
            <zj-table-column
              field="field5"
              title="订单融资宽限期（天）"/>
            <zj-table-column
              field="field6"
              title="订单融资月利率"/>
            <zj-table-column
              field="field7"
              title="订单额度状态"/>
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{ row }">
                <template v-if="$refs.financeTable.isActiveByRow(row)">
                  <zj-button type="text" @click="toSave(row,$index)">保存</zj-button>
                  <zj-button type="text" style="margin-left: 0px" @click="toCancel(row,$index)">取消</zj-button>
                </template>
                <template v-else>
                  <zj-button type="text" @click="toReSign(row)">续签</zj-button>
                  <zj-button type="text" @click="toMaintenance(row)">维护</zj-button>
                </template>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
      <!--  其他附件    -->
      <other-file-setting ref="ofileSetting" is-edit></other-file-setting>
    </el-form>
    <quota-re-sign ref="quotaReSign"></quota-re-sign>
    <zj-content-footer>
      <zj-button type="primary" @click="back">提交申请</zj-button>
      <zj-button  @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import SupplierBaseInfo from '../components/supplierBaseInfo';
import OtherFileSetting from '../components/otherFileSetting';
import QuotaReSign from './dialog/quotaReSign';
export default {
  components: {
    SupplierBaseInfo,
    OtherFileSetting,
    QuotaReSign
  },
  data () {
    return {
      tradeList: [],
      financeList: [
        {
          field1: '10000',
          field2: '12',
          field3: '2022.09.09～2023.09.09',
          field4: '2022.09.09～2023.09.09',
          field5: '3',
          field6: '7%',
          field7: '生效',
        }
      ],
      currentEditRow: {}
    };
  },
  methods: {
    back() {
    },
    isTableEdit () {
      let key = true;
      if (this.$refs.financeTable && this.$refs.financeTable.getActiveRecord()) {
        key = false;
      }
      if (!key) {
        this.$log.alert('请保存当前正在编辑的数据')
      }
      return key;
    },
    toReSign (row) {
      this.$refs.quotaReSign.show(row)
    },
    toMaintenance(row) {
      if (!this.isTableEdit()) {return;}
      this.currentEditRow = {...row};
      this.$refs.financeTable.setActiveRow(row);
    },
    // 保存
    toSave (row,index) {
      // if (!row.fileName) {
      //   this.$messageBox({
      //     type: 'warning',
      //     content: '请上传附件',
      //     title: '提示',
      //     showConfirmButton: true,
      //     center: true
      //   })
      //   return;
      // }
      this.$set(this.financeList,index,Object.assign({},row));
      this.$refs.financeTable.clearActived();
      this.$message.success('保存成功')
    },
    // 取消
    toCancel (row,index) {
      this.$set(this.financeList,index,{...this.currentEditRow});
      this.$refs.financeTable.clearActived();
      this.currentEditRow = {};
    },
  }
};
</script>
