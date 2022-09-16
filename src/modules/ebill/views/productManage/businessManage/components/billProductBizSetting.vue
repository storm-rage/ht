<template>
  <el-form :model="form" ref="form" label-width="180px">
    <zj-content-block>
      <zj-header :title="title"></zj-header>
      <zj-content>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="开单宽限天数：">
              {{form.openGraceDays}}天
            </el-form-item>
          </el-col>
        </el-row>
        <zj-table :dataList="form.billFactoringModelList" :pager="false">
          <zj-table-column
            field="field1"
            title="电子债权凭证期限（天）">
            <template v-slot="{row}">
              {{row.rdDateStart}}～{{row.rdDateEnd}}
            </template>
          </zj-table-column>
          <zj-table-column
            field="availableDiscountsRate"
            :formatter="['formatColumnRate','2']"
            title="凭证可用折扣"/>
          <zj-table-column
            field="rdFinancingMonthRate"
            formatter="formatColumnRate"
            title="凭证融资月利率"/>
        </zj-table>
        <div class="zj-center zj-m-t-10" v-if="isEdit">
          <el-button @click="toMaintenanceBillInfo" style="width: 100px" size="small" type="primary">维护</el-button>
        </div>
        <bill-info-text-tip></bill-info-text-tip>
      </zj-content>
    </zj-content-block>
    <bill-info-maintenance ref="billInfoMaintenance" @done="handleBillMaintenanceDone"></bill-info-maintenance>
  </el-form>

</template>
<script>
import BillInfoTextTip from './billInfoTextTip';
import BillInfoMaintenance from './dialog/billInfoMaintenance';
export default {
  components: {
    BillInfoTextTip,
    BillInfoMaintenance
  },
  props: {
    // 参数
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 开单宽限天数
    openGraceDays: Number,
    // 是否可以编辑表单
    isEdit: {
      type: Boolean,
      default: false
    },
    title:String,
    // 字典
    dic: Object,
  },
  watch: {
    list: {
      deep: true,
      handler () {
        this.form.billFactoringModelList = this.list||[];
      }
    },
    openGraceDays () {
      this.form.openGraceDays = this.openGraceDays
    }
  },
  mounted() {
    this.form.openGraceDays = this.openGraceDays
    this.form.billFactoringModelList = this.list||[]
  },
  data () {
    return {
      form: {
        billFactoringModelList: [],
        openGraceDays: null
      }
    };
  },
  methods: {
    toMaintenanceBillInfo () {
      this.$refs.billInfoMaintenance.show(this.form, this.title);
    },
    handleBillMaintenanceDone (obj) {
      this.form = Object.assign({}, obj);
    },
    getData () {
      return this.form;
    }
  }
}
</script>
