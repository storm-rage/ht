<template>
  <div>
    <zj-content-container>
      <!--  入库融资申请/凭证融资申请  -->
      <div class="quota-manage">
        剩余可用额度：<span>{{detail.surplusQuota}}</span>
        总额度：<span>{{detail.totalQuota}}</span>
      </div>
      <zj-top-header title="入库融资申请/凭证融资申请"></zj-top-header>
      <el-form :model="form" ref="form" label-width="200px" class="financingForm">
        <el-row class="hd-row">
          <el-form-item label="融资企业：">
            {{form.entName}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="融资合同编号：">
              {{form.financingContractNo}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="融资合同期限：">
              {{form.finConStartDate}}至{{form.finConEndDate}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="融资申请金额：" prop="">
              <zj-number-input :precision="4" v-model="form.financingAccount">
                <template slot="append">元</template>
              </zj-number-input>
              <div>{{digitUp(1000)}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="融资开始日：" prop="">
              <zj-date-picker :date.sync="form.financingStartDate" :lessNow="true" :format="'yyyy年MM月dd日'"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="融资折扣率：">
              {{form.financingContractNo}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请转让金额：">
              <div>{{money(100)}}</div>
              <div class="tips">（申请转让金额=融资申请金额/折扣率 ）</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="预计融资期限：">
              {{form.finConStartDate}}至{{form.finConEndDate}}共{{}}天
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="融资月利率：">
              {{form.financingContractNo}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="预计利息：">
              <div>{{money(100)}}</div>
              <div class="tips">（预计利息 = 融资申请金额*融资月利率/30*预计融资天数）</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款银行账号：">
              {{form.financingContractNo}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <zj-table ref="searchTable" class="zj-search-table" :dataList="detail.voucherList"
      >
        <zj-table-column field="voucherNo" title="原始凭证编号" />
        <zj-table-column field="voucherNo" title="凭证编号" />
        <zj-table-column field="voucherSigner" title="凭证签发人" />
        <zj-table-column field="entName" title="转让企业" />
        <zj-table-column field="voucherAcc" title="凭证金额" :formatter="money"/>
        <zj-table-column field="voucherAcc" title="凭证持有日期" :formatter="date"/>
        <zj-table-column field="voucherAcc" title="凭证到期日" :formatter="date"/>
        <el-row slot="pager-left" class="slotRows" >
          凭证金额合计：{{moneyNoSynbol(' ')}}
        </el-row>
      </zj-table>
      <el-row>
        <zj-header title="融资协议"/>
        <el-row class="btn-row">
          <zj-button type="text">《入库融资协议》</zj-button>
          <zj-button type="text">《凭证融资协议》</zj-button>
          <zj-button type="text">《债权转让通知》</zj-button>
        </el-row>
        <div class="explain-text">
          <div>注：</div>
          <ol class="explain-content">
            <li class="explain-item">以上额度信息、预计融资期限与预计利息仅供参考，请以实际融资为准。</li>
            <li class="explain-item">剩余可用额度=额度总额-实际已用额度-在途使用额度。</li>
          </ol>
        </div>
      </el-row>
      <el-row>
        <zj-header title="贸易背景"/>

      </el-row>

    </zj-content-container>
    <el-row style="position: relative;margin-top: 20px;">
      <zj-content-footer>
        <zj-button class="submit-button" @click="goParent">上一步</zj-button>
        <zj-button class="submit-button" @click="submit">提交申请</zj-button>
      </zj-content-footer>
    </el-row>
    <submit-dialog ref="submitDialog"/>

  </div>
</template>

<script>
import submitDialog from './submitDialog'

export default {
  name: "detail",
  components: {
    submitDialog
  },

  data() {
    return {
      form:{},
      detail:{},
    }
  },
  methods: {
    submit(){
      this.$refs.submitDialog.open({form: this.form}, true)
    },
  }
}
</script>

<style scoped lang="less">
.quota-manage {
  height: 40px;
  line-height:40px;
  text-align: right;
  margin-bottom: 20px;
  color: #e6a23c;
  background-color: #fdf6ec;
}
.financingForm {
  margin-top: 20px;
}
.explain-text {
  display: flex;
  padding-bottom: 20px;
  background-color: rgba(2, 167, 240, 0);
  .explain-item {
    color: #555;
    font-size: 14px;
    margin-left: 20px;
  }
}
.hd-row {
  position: relative;
  &:after {
    position: absolute;
    top: 36px;
    left: 0;
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #cbcbcb;
  }
}

</style>
