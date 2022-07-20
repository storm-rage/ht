<template>
  <div>
    <zj-content-container>
      <!--  订单融资复核  -->
      <div class="quota-manage">
        剩余可用额度：<span>{{detail.surplusQuota}}</span>
        总额度：<span>{{detail.totalQuota}}</span>
      </div>
      <zj-top-header title="订单融资复核"></zj-top-header>
      <el-form :model="form" ref="form" label-width="200px" class="financingForm">
        <el-row class="hd-row">
          <el-col :span="12">
            <el-form-item label="买方企业名称：" >
              {{form.entName}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="融资企业：" >
              {{form.entName}}
            </el-form-item>
          </el-col>
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
            <el-form-item label="预计融资期限：">
              {{form.finConStartDate}}至{{form.finConEndDate}}共{{}}天
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="融资月利率：">
              {{form.financingContractNo}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计利息：">
              <div>{{money(100)}}</div>
              <div class="tips">（预计利息 = 融资申请金额*融资月利率/30*预计融资天数）</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收款银行账号：">
              {{form.financingContractNo}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <zj-table ref="searchTable" class="zj-search-table" :dataList="detail.voucherList"
      >
        <zj-table-column field="voucherNo" title="阶段性协议编号" />
        <zj-table-column field="voucherNo" title="阶段性协议名称" />
        <zj-table-column field="entName" title="协议签订日期" />
        <zj-table-column field="exprise" title="协议预计到期日" :formatter="date"/>
        <zj-table-column field="state" title="状态" :formatter="(obj)=>typeMap(dictionary.states,obj.cellValue)"/>
        <zj-table-column field="atta" title="附件" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="attaDownLoad('entManageDetail',row)">下载</zj-button>
          </template>
        </zj-table-column>
        <el-row slot="pager-left" class="slotRows" >
          凭证金额合计：{{moneyNoSynbol(' ')}}
        </el-row>
      </zj-table>
      <el-row>
        <div class="explain-text">
          <div>注：</div>
          <ol class="explain-content">
            <li class="explain-item">以上额度信息、预计融资期限与预计利息仅供参考，请以实际融资为准。</li>
            <li class="explain-item">剩余可用额度=额度总额-实际已用额度-在途使用额度。</li>
          </ol>
        </div>
      </el-row>
    </zj-content-container>
    <el-row style="position: relative;margin-top: 20px;">
      <zj-content-footer>
        <el-checkbox v-model="checked">我已阅读并同意
          <zj-button type="text">《订单保理融资协议》</zj-button>
        </el-checkbox>
        <zj-button class="primary" @click="reviewResolve">复核通过</zj-button>
        <zj-button class="submit-button" @click="reject">拒绝</zj-button>
      </zj-content-footer>
    </el-row>
    <!--  复核通过  -->
    <submit-dialog ref="submitDialog"/>
    <!--  拒绝  -->
    <reject-dialog ref="rejectDialog"/>
    <!--  云证书  -->
    <zj-certuficate ref="ZjCertuficate"/>
  </div>
</template>

<script>
import submitDialog from './submitDialog'
import rejectDialog from './rejectDialog'
export default {
  name: "detail",
  components: {
    submitDialog,rejectDialog
  },

  data() {
    return {
      form:{
        test:'target'
      },
      detail:{},
      show: false,
      checked: '',
    }
  },
  methods: {
    attaDownLoad(){},
    reject(){
      this.$refs.rejectDialog.open({form: this.form}, true)

    },
    reviewResolve(){
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
