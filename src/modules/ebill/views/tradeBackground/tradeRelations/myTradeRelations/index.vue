<template>
  <div>
    <zj-list-layout>
      <template slot="searchForm">
      <el-form ref="searchForm" :model="searchForm">
        <el-form-item label="买方企业名称：" class="col-center">
          <el-input v-model="searchForm.ebillCode" />
        </el-form-item>
        <el-form-item label="卖方企业名称：" class="col-center">
          <el-input v-model="searchForm.ebillCode" />
        </el-form-item>
        <el-form-item label="贸易关系状态：" class="col-center">
          <el-select
            v-model="searchForm.isGenerateVoucher"
            placeholder="请选择"
            clearable
            :popper-append-to-body="false"
          >
            <el-option value="" label="全部"></el-option>
            <!-- <el-option
              v-for="item in dictionary.isGenerateVouchers"
              :key="item.code"
              :label="item.desc"
              :value="item.code"
            >
            </el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
      </template>
    <div class="zj-search-response">
      <zj-button
        class="zj-m-l-10 zj-m-t-10 zj-m-b-10 mb-10 mt-10"
        type="primary"
        @click="openDialog"
        >新增</zj-button
      >
      <zj-content style="padding-top: 0">
        <zj-content-tip
          text="注：证明材料可为买卖双方发票，贸易合同等证明双方真实贸易关系的材料，支持上次pdf，图片和压缩包！"
        ></zj-content-tip>
      </zj-content>
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.relationLsit"
      >
        <zj-table-column field="agreementName" title="买方企业名称" />
        <zj-table-column field="buyerEntName" title="卖方企业名称" />
        <zj-table-column field="bankAccount" title="卖方银行账号" />
        <zj-table-column field="bankAccname" title="卖方企业银行账户户名" />
        <zj-table-column field="bankNo" title="银行联行号" />
        <zj-table-column field="bankName" title="银行类型" />
        <zj-table-column field="sellerEntId" title="贸易关系状态" />
        <zj-table-column field="buyerIsHtEnterprise" title="协议" />
        <zj-table-column field="sellerEntName" title="证明材料" />
        <zj-table-column field="state" title="上次更新时间" :formatter="date" />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button type="text" @click="edit(row)">修改</zj-button>
            <zj-button
              type="text"
              @click="upCredential(row)"
              :api="zjBtn.getEnterprise"
              >上次材料证明</zj-button
            >
          </template>
        </zj-table-column>
      </zj-table>
    </div>
    </zj-list-layout>
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      center
      width="500px"
      :title="type == 'add' ? '新增贸易关系' : '修改贸易关系'"
      custom-class="mbi-editDialog"
      @close="cancel"
      top="6vh"
    >
      <el-form
        ref="formModel"
        class="mbi-form"
        :model="formModel"
        :rules="formRules"
        :class="editFlag ? '' : 'nmb0'"
        label-width="140px"
      >
        <el-form-item
          label="买方企业名称："
          prop="entName"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <span class="static-text">{{ relList.bankAccname }}</span>
        </el-form-item>
        <el-form-item
          label="卖方企业名称："
          :class="{ 'zj-m-b-5': !editFlag }"
          prop="invoiceTaxpayerId"
        >
          <el-input v-model="formModel.buyerEntName" />
        </el-form-item>
        <el-form-item
          label="卖方银行账号："
          prop="invoiceAddress"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <el-input v-model="formModel.bankAccount" />
        </el-form-item>
        <el-form-item
          label="卖方银行账号户名："
          prop="invoicePhone"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <el-input v-model="formModel.bankName" />
        </el-form-item>
        <el-form-item
          label="卖方企业开户行："
          prop="invoiceBankInfo"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <el-input v-model="formModel.bankName" />
        </el-form-item>
        <el-form-item
          label="银行联行号："
          prop="invoiceBankAccno"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <el-input v-model="formModel.bankName" />
        </el-form-item>
        <el-form-item
          label="银行类型："
          prop="invoiceEmail"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <!--        <span class="static-text" v-show="!editFlag">{{formModel.invoiceEmail}}</span>-->
          <el-input v-model="formModel.bankName" />
        </el-form-item>
      </el-form>

      <el-row slot="footer" class="dialog-footer">
        <zj-button status="primary" @click="save">保存</zj-button>
        <zj-button class="back" @click="dialogVisibleTo">取消</zj-button>
      </el-row>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogVisible2"
      :close-on-click-modal="false"
      center
      width="50%"
      title="上传证明材料"
      custom-class="mbi-editDialog"
      @close="cancel"
      top="6vh"
    >
      <div class="upForm">
        <div class="upFormItem">
          <span>买方企业名称：XXXXXX</span>
        </div>

        <div class="upFormItem">
          <span>卖方企业名称：XXXXXX</span>
        </div>

        <div class="upFormItem">
          <ZjUpload api="hhh"></ZjUpload>
        </div>

        <div class="upFormItem">
          <zj-content style="padding-top: 0">
            <zj-content-tip
              text="注：1.证明材料可为买卖双方发票，贸易合同等证明双方真实贸易关系的材料。2.支持上传pdf，图片和压缩包！"
            ></zj-content-tip>
          </zj-content>
        </div>
      </div>
      <el-row slot="footer" class="dialog-footer">
        <zj-button status="primary" @click="save">保存</zj-button>
        <zj-button class="back" @click="dialogVisible2 = false">取消</zj-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      relList:[],
      formRules:{},
      editFlag:"1",
      workflow: "",
      zjControl: {
        relationLsit: this.$api.tradeRelations.relationLsit,//查询列表
        relationAdd: this.$api.tradeRelations.relationAdd,//新增贸易关系
      },
      searchForm: {},
      tableData: [{ id: 1 }],
      formModel: {},
      dialogVisible: false,
      type: "add",
      dialogVisible2: false,
    };
  },
  created() {
    this.getApi();
    this.relationLsitApi();
  },
  methods: {
    //查询
    relationLsitApi(){
      let params = {
        page : "1",
        rows : "10"
      }
      this.zjControl.relationLsit(params).then(res=>{
      if(res.code===200){
        this.relList = res.data.rows[0]
      }
      console.log(this.relList,"1111111")
    })
    },
    //清空
    dataNull(){
      this.formModel.invoiceTaxpayerId = ""
      this.formModel.invoiceAddress = ""
      this.formModel.invoicePhone = ""
      this.formModel.invoiceBankInfo = ""
      this.formModel.invoiceBankAccno = ""
      this.formModel.invoiceEmail = ""
    },
    //查询
    resetSearch(){
      alert("-------------")
    },
    //取消
    cancel(){
      this.dataNull()
    },
    //保存
    save(row){
      if(this.type == "add"){
        let params = {
          // entName:this.formModel.entName,//买方企业名称
          invoiceTaxpayerId:this.formModel.invoiceTaxpayerId,//卖方企业名称
          invoiceAddress:this.formModel.invoiceAddress,//卖方银行账号
          invoicePhone:this.formModel.invoicePhone,//卖方银行账号户名
          invoiceBankInfo:this.formModel.invoiceBankInfo,//卖方企业开户行
          invoiceBankAccno:this.formModel.invoiceBankAccno,//银行联号
          invoiceEmail:this.formModel.invoiceEmail,//银行类型
        }
          this.zjControl.relationAdd(params).then(() => {
          this.$Message.success('新增成功！')
          this.dialogVisible = false;
          this.dataNull()
        })
      }else{
        alert("修改")
        console.log(row,"1111111")
      }
    },
    //修改
    edit(row) {
      this.type = "edit";
      this.dialogVisible = true;
      this.formModel =  {...row}
      console.log(this.formModel)
      // if(!this.tableEditReport(['searchTable'])){return}
      // this.$refs.searchTable.setActiveRow(row)
    },
    //新增
    openDialog() {
      this.type = "add";
      this.dialogVisible = true;
    },
    //取消
    dialogVisibleTo(){
      this.dialogVisible = false;
      this.dataNull()
    },
    //上传证明材料
    upCredential(row) {
      this.dialogVisible2 = true;
    },
  },
};
</script>
<style lang="less" scoped>
/deep/#ZjWorkflow {
  .workflow-top {
    .el-row {
      padding: 5px 0 0;
      text-align: center;
    }
  }
  .workflow-bottom {
    .right {
      width: 100%;
      text-align: center;
    }
  }
}

.upForm {
  .upFormItem {
    margin-bottom: 10px;
  }
}
</style>
