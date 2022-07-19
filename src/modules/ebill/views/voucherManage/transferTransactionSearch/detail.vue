<template>
  <div>
    <zj-content-container>
      <!--  转让交易详情  -->
      <zj-top-header title="转让交易详情"></zj-top-header>
      <zj-content-block>
        <zj-header title="交易信息"></zj-header>
        <el-form :model="form" ref="form" label-width="200px" class="financingForm">
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请流水号：" >
                {{form.entName}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请状态：" >
                {{form.entName}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="拒绝原因：" >
                <span>{{digitUp(1000)}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="转让凭证总数：">
                {{form.total}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="转让总金额：">
                {{form.financingContractNo}}元
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zj-content-block>
      <el-row>
        <zj-header title="电子债权凭证信息"></zj-header>
        <zj-table ref="searchTable" class="zj-search-table" :dataList="detail.voucherList" :pager="false"
        >
          <zj-table-column field="index" title="原始凭证编号" />
          <zj-table-column field="fileName" title="凭证编号" />
          <zj-table-column field="fileName" title="签发人" />
          <zj-table-column field="fileName" title="原始持有人" />
          <zj-table-column field="fileName" title="凭证签发日" :formatter="date"/>
          <zj-table-column field="fileName" title="凭证到期日" :formatter="date"/>
          <zj-table-column field="fileName" title="转让企业"/>
          <zj-table-column field="fileName" title="凭证金额" :formatter="money"/>
          <zj-table-column field="fileName" title="凭证签收日" :formatter="date"/>
        </zj-table>
      </el-row>
      <el-row>
        <zj-header title="转让信息"></zj-header>
        <zj-table ref="searchTable" class="zj-search-table" :dataList="detail.voucherList" :pager="false"
        >
          <zj-table-column field="fileName" title="凭证编号" />
          <zj-table-column field="fileName" title="被转让人名称" />
          <zj-table-column field="fileName" title="转让金额" />
          <zj-table-column field="fileName" title="收款账号"/>
          <zj-table-column field="fileName" title="收款账户户名"/>
          <zj-table-column field="fileName" title="收款银行联行号"/>
          <zj-table-column field="fileName" title="收款账户开户行"/>
          <zj-table-column field="fileName" title="备注"/>
          <zj-table-column field="fileName" title="处理结果" />
          <zj-table-column field="fileName" title="失败原因" />
        </zj-table>
      </el-row>
    </zj-content-container>
    <el-row style="position: relative;margin-top: 20px;">
      <zj-content-footer>
        <zj-button class="submit-button" @click="goParent">返回</zj-button>
      </zj-content-footer>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "detail",
  components: {},

  data() {
    return {
      form:{
        test:'target'
      },
      detail:{},
      show: false,

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
