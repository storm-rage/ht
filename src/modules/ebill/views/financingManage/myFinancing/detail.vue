<template>
  <div>
    <zj-content-container>
      <!--  入库融资/凭证融资详情  -->
      <zj-top-header title="入库融资/凭证融资详情"></zj-top-header>
      <zj-content-block>

      </zj-content-block>
      <zj-content-block>
        <zj-header title="融资信息"></zj-header>
        <el-form :model="form" ref="form" label-width="200px" class="financingForm">
          <el-row class="hd-row">
            <el-col :span="12">
              <el-form-item label="融资企业：" >
                {{form.entName}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="融资流水号：" >
                {{form.entName}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="融资申请金额：" prop="">
                <span>{{moneyNoSynbol(form.financingAccount)}}</span>
                <span>{{digitUp(1000)}}</span>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="融资期限：">
                {{date(form.financingContractNo)}}至{{date(form.financingContractNo)}}共{{form.total}}
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
              <el-form-item label="收款银行账号：">
                {{form.financingContractNo}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="融资状态：">
                {{form.financingContractNo}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="还款状态：">
                {{form.financingContractNo}}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <h2>还款记录</h2>
        <zj-table ref="searchTable" class="zj-search-table" :dataList="detail.voucherList"
        >
          <zj-table-column field="index" title="序号" />
          <zj-table-column field="voucherNo" title="还款方式" />
          <zj-table-column field="entName" title="凭证编号" />
          <zj-table-column field="entName" title="还款日期" :formatter="date"/>
          <zj-table-column field="entName" title="还款金额" :formatter="money"/>
          <zj-table-column field="entName" title="还款本金" :formatter="money"/>
          <zj-table-column field="entName" title="还款利息" :formatter="money"/>
          <el-row slot="pager-left" class="slotRows" >
            <span class="table-tips">还款金额合计：{{moneyNoSynbol(detail.total,' ')}}</span>
            <span class="table-tips">已还款本金合计：{{moneyNoSynbol(detail.total,' ')}}</span>
            <span class="table-tips">已还款利息合计：{{moneyNoSynbol(detail.total,' ')}}</span>
          </el-row>
        </zj-table>
      </zj-content-block>
      <zj-content-block>
        <zj-header title="融资协议"></zj-header>
        <zj-table ref="searchTable" class="zj-search-table" :dataList="detail.voucherList" :pager="false"
        >
          <zj-table-column field="index" title="序号" />
          <zj-table-column field="fileName" title="协议附件" />
          <zj-table-column title="操作">
            <template v-slot="{row}">
              <zj-button type="text" @click="attaDownLoad(row.fileId)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content-block>
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
