<template>
  <div>
    <!-- 若已上传证明文件，再次点击“上传证明材料”时，弹出提醒：“已有证明材料，上传将覆盖原证明材料，是否继续上传？”按钮：确认&取消。点击确认，则继续。点击取消，则关闭弹窗
          8月15日需求变动
    -->
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="买方企业名称：" class="col-center">
            <el-input v-model.trim="searchForm.buyerEntName" />
          </el-form-item>
          <el-form-item label="卖方企业名称：" class="col-center">
            <el-input v-model.trim="searchForm.sellerEntName" />
          </el-form-item>
          <el-form-item label="贸易关系状态：" class="col-center">
            <el-select v-model="searchForm.state" placeholder="请选择" clearable :popper-append-to-body="false">
              <el-option value="" label="全部"></el-option>
              <el-option v-for="item in dictionary.state" :key="item.code" :label="item.desc" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <div class="zj-search-response">
        <zj-button class="zj-m-l-10 zj-m-t-10 zj-m-b-10 mb-10 mt-10" type="primary" @click="openDialog">新增</zj-button>
        <zj-content style="padding-top: 0">
          <zj-content-tip text="注：证明材料可为买卖双方发票，贸易合同等证明双方真实贸易关系的材料，支持上传pdf，图片和压缩包！"></zj-content-tip>
        </zj-content>
        <zj-table ref="searchTable" :params="searchForm" :api="zjControl.relationLsit">
          <zj-table-column field="buyerEntName" title="买方企业名称" />
          <zj-table-column field="sellerEntName" title="卖方企业名称" />
          <zj-table-column field="bankAccount" title="卖方银行账号" />
          <zj-table-column field="bankAccname" title="卖方企业银行账户户名" />
          <zj-table-column field="bankName" title="卖方企业开户行" />
          <zj-table-column field="bankNo" title="银行联行号" />
          <!-- <zj-table-column field="bankType" title="银行类型" /> -->
          <zj-table-column field="state" title="贸易关系状态" />
          <zj-table-column field="agreementName" title="协议" />
          <zj-table-column field="fileName" title="证明材料" />
          <zj-table-column field="lastUpdateDatetime" title="上次更新时间" :formatter="date" />
          <zj-table-column title="操作" fixed="right" width="100px">
            <template v-slot="{ row }">
              <zj-button type="text" @click="edit(row)" v-if="row.isBuyerFlag==1">修改</zj-button>
              <!-- <zj-button type="text" @click="upCredential(row)" :api="zjBtn.getEnterprise">上传材料证明</zj-button> -->
              <zj-upload 
              :httpRequest="uploadsc"
              :data="{row}"
              accept=".pdf,.jpg,.zip,.bmp,.gif,.jpeg,.png,.rar"
              style="display: inline-block"
              >
              <zj-button type="text" :api="zjBtn.getEnterprise" v-if="row.isBuyerFlag==0" >上传材料证明</zj-button>
              </zj-upload>
              <span type="text" v-if="row.isBuyerFlag!=0&&row.isBuyerFlag!=1">--</span>
            </template>
          </zj-table-column>
        </zj-table>
      </div>
    </zj-list-layout>
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" center width="500px"
      :title="type == 'add' ? '新增贸易关系' : '修改贸易关系'" custom-class="mbi-editDialog" @close="cancel" top="6vh">
      <el-form ref="formModel" class="mbi-form" :model="formModel" :rules="formRules" :class="editFlag ? '' : 'nmb0'"
        label-width="140px">
        <el-form-item label="买方企业名称：" prop="buyerEntName" :class="{ 'zj-m-b-5': !editFlag }">
          <span class="static-text">{{ formModel.buyerEntName }}</span>
        </el-form-item>
        <el-form-item label="卖方企业名称：" :class="{ 'zj-m-b-5': !editFlag }" prop="sellerEntName">
          <el-input v-model="formModel.sellerEntName" />
        </el-form-item>
        <el-form-item label="卖方银行账号：" prop="bankAccount" :class="{ 'zj-m-b-5': !editFlag }">
          <el-input v-model="formModel.bankAccount" />
        </el-form-item>
        <el-form-item label="卖方银行账号户名：" prop="bankAccname" :class="{ 'zj-m-b-5': !editFlag }">
          <el-input v-model="formModel.bankAccname" />
        </el-form-item>
        <el-form-item label="卖方企业开户行：" prop="bankName" :class="{ 'zj-m-b-5': !editFlag }">
          <el-input v-model="formModel.bankName" />
        </el-form-item>
        <el-form-item label="银行联行号：" prop="bankNo" :class="{ 'zj-m-b-5': !editFlag }">
          <el-input v-model="formModel.bankNo" />
        </el-form-item>
        <el-form-item label="银行类型：" prop="bankType" :class="{ 'zj-m-b-5': !editFlag }">
          <!--        <span class="static-text" v-show="!editFlag">{{formModel.invoiceEmail}}</span>-->
          <el-input v-model="formModel.bankType" />
        </el-form-item>
      </el-form>

      <el-row slot="footer" class="dialog-footer">
        <zj-button status="primary" @click="save">保存</zj-button>
        <zj-button class="back" @click="dialogVisibleTo">取消</zj-button>
      </el-row>
    </el-dialog>

    <!-- <el-dialog :visible.sync="dialogVisible2" :close-on-click-modal="false" center width="50%" title="上传证明材料"
      custom-class="mbi-editDialog" @close="cancel" top="6vh">
      <div class="upForm">
        <div class="upFormItem">
          <span>买方企业名称：{{ buyerEntName }}</span>
        </div>
        <div class="upFormItem">
          <span>卖方企业名称：{{ sellerEntName }}</span>
        </div>
        <div class="upFormItem">
          <zj-upload class="zj-inline" ref="upload" :auto-upload="false" :multiple="true" :showFileList="true"
            :onRemove="onRemove" :onChange="onChange" :httpRequest="dayUpload" 
            accept=".pdf,.jpg,.zip,.bmp,.gif,.jpeg,.png,.rar">
            <zj-button type="primary" style="width: 100px" size="mini" slot="trigger">上传</zj-button>
            <div class="upFormItem">
              <zj-content style="padding-top: 0">
                <zj-content-tip text="注：1.证明材料可为买卖双方发票，贸易合同等证明双方真实贸易关系的材料。2.支持上传pdf，图片和压缩包！"></zj-content-tip>
              </zj-content>
            </div>
                    <zj-button status="primary" @click="saveTo">保存</zj-button>
        <zj-button class="back" @click="dialogVisible2 = false">取消</zj-button>
          </zj-upload>
        </div>
      </div>
      <el-row slot="footer" class="dialog-footer">
      </el-row>
    </el-dialog> -->

    <el-dialog :visible.sync="dialogVisibleGo" :close-on-click-modal="false" center width="50%" title="贸易关系确认函"
      custom-class="mbi-editDialog" @close="cancel" top="6vh">
      <div class="upForm">
        <div class="upFormItem">
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum laoreet. Proin gravida dolor sit amet lacus
            accumsan et viverra justo commodo. Proin sodales pulvinar sic
            tempor. Sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
            vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc
            accuan eget.</span>
        </div>
      </div>
      <el-row slot="footer" class="dialog-footer">
        <zj-button type="primary" status="primary" @click="saveTo">确认签署</zj-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      relList: [],
      formRules: {
        sellerEntName: [
          { required: true, message: "请输入卖方企业名称", trigger: "blur" },
        ],
        bankAccount: [
          { required: true, message: "请输入卖方银行账号", trigger: "blur" },
        ],
        bankName: [
          {
            required: true,
            message: "请输入卖方银行账号户名",
            trigger: "blur",
          },
        ],
        bankNo: [
          { required: true, message: "请输入银行联号", trigger: "blur" },
        ],
        bankType: [
          { required: true, message: "请输入银行类型", trigger: "blur" },
        ],
      },
      editFlag: "1",
      workflow: "",
      zjControl: {
        relationLsit: this.$api.tradeRelations.relationLsit, //查询贸易关系
        relationAdd: this.$api.tradeRelations.relationAdd, //新增贸易关系
        relationAddtradeCheck: this.$api.tradeRelations.relationAddtradeCheck, //新增校验
        relationEnt: this.$api.tradeRelations.relationEnt, //修改贸易关系
        materialAttach: this.$api.tradeRelations.materialAttach, //上传证明材料
        getDirectory: this.$api.tradeRelations.tradeRelationsGetDirectory, //字典
      },
      dictionary: {},
      searchForm: {},
      tableData: [{ id: 1 }],
      formModel: {},
      dialogVisible: false,
      type: "add",
      dialogVisible2: false,
      buyerEntName: "",
      sellerEntName: "",
      listId: "",
      dialogVisibleGo: false,
      fileOBList: [],
      tjid: "",

    };
  },
  created() {
    this.getApi();
    this.getDirectory1();
    this.getRow();
  },
  watch: {
    dialogVisible(value) {
      if (!value) {
        this.formModel = {};
      }
    },
  },
  methods: {
    
    getDirectory1() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data;
      });
    },
    //取消
    cancel() { },
    //修改
    edit(row) {
      this.tjid = row.id
      this.type = "edit";
      this.dialogVisible = true;
      this.formModel = { ...row };
      // console.log(this.formModel)
      // if(!this.tableEditReport(['searchTable'])){return}
      // this.$refs.searchTable.setActiveRow(row)
    },
    //新增
    openDialog() {
      this.type = "add";
      this.dialogVisible = true;
    },
    //取消
    dialogVisibleTo() {
      this.dialogVisible = false;
    },
    //保存
    save(row) {
      if (this.type == "add") {
        alert("保存");
        let paramsWod = {
          // buyerEntName: this.formModel.buyerEntName, //买方企业名称
          sellerEntName: this.formModel.sellerEntName, //卖方企业名称
          // bankAccount: this.formModel.bankAccount, //卖方银行账号
          // invoicePhone: this.formModel.invoicePhone, //卖方银行账号户名
          // invoiceBankInfo: this.formModel.invoiceBankInfo, //卖方企业开户行
          // bankNo: this.formModel.bankNo, //银行联号
          // bankType: this.formModel.bankType, //银行类型
        };
        this.zjControl.relationAddtradeCheck(paramsWod).then((res) => {
          if (res.code == 200) {
            this.dialogVisibleGo = true;
            let params = {
              buyerEntName: this.formModel.buyerEntName, //买方企业名称
              sellerEntName: this.formModel.sellerEntName, //卖方企业名称
              bankAccount: this.formModel.bankAccount, //卖方银行账号
              invoicePhone: this.formModel.invoicePhone, //卖方银行账号户名
              invoiceBankInfo: this.formModel.invoiceBankInfo, //卖方企业开户行
              bankNo: this.formModel.bankNo, //银行联号
              bankType: this.formModel.bankType, //银行类型
            };
            this.zjControl.relationAdd(params).then((res) => {
              // this.$Message.success("新增成功！");
              this.dialogVisible = false;
            });
          }
        });
      }
      if (this.type == "edit") {
        // alert("修改");
        // this.$Message.success("修改成功！");
        let params = {
          id: this.tjid,
          buyerEntName: this.formModel.buyerEntName, //买方企业名称
          sellerEntName: this.formModel.sellerEntName, //卖方企业名称
          bankAccount: this.formModel.bankAccount, //卖方银行账号
          bankAccname: this.formModel.bankAccname, //卖方银行账号户名
          bankName: this.formModel.bankName, //卖方企业开户行
          bankNo: this.formModel.bankNo, //银行联号
          bankType: this.formModel.bankType, //银行类型
        };
        this.zjControl.relationEnt(params).then((res) => {
          // this.$Message.success("修改成功！");
          // alert("修改成功！");
          this.search()
          this.dialogVisible = false;
        });
      }
    },
    //上传证明材料

    // upCredential(row) {
    //   this.buyerEntName = row.buyerEntName; //买方企业名称
    //   this.sellerEntName = row.sellerEntName; //卖方企业名称
    //   this.listId = row.id;
    //   this.dialogVisible2 = true;
    // },
    // 直接上传不弹框，需要判断是否已有证明材料（没写，$messageBox没挂上）
    uploadsc({file,data}){
              console.log(data);
          let formData = new FormData()
          formData.append('fileOB', file)
          formData.append('id', data.row.id)
          this.$api.tradeRelations.materialAttach(formData).then(() => {
            this.search()
             
            this.$MessageBox.success('发票上传成功')
      //  this.$MessageBox({
      //    type:"confirm",
      //    title:"溫馨提示",
      //    content:"当前已有证明材料是否继续上传",
      //    showCancelButton:true,
      //    messageResolve:()=>{
      //   }
      // })
      })
     
    },
    // //上传按钮
    // dayUpload({ file, files }) {
    //   console.log(files);
    //   let formData = new FormData()
    //   formData.append('fileOBList', file.file)
    //   // this.$api.tradeRelations.materialAttach(formData).then(ret => {
    //   //   this.$messageBox({
    //   //     type: 'success',
    //   //     content:'操作成功',
    //   //   });
    //   // }).catch(() => {
    //   // })
    //   this.$api.tradeRelations.materialAttach(formData).then(() => {
    //     this.$Message.success('发票上传成功')
    //   })
    // },
    // // 移除
    // onRemove(file, fileList) {
    //   console.log("onRemove");
    // },
    // onChange(file, fileList) {
    //   // console.log("change");
    //   // console.log(file);
    //   // this.fileOBList=fileList
    //   // console.log(fileList);
    //   let formData = new FormData()

    //   this.file = formData.append("file", file)
    // },
    //上传证明保存
    saveTo() {
      // console.log(file, fileList,data);
      // this.zjControl.materialAttach(formData).then((res) => {
      //   console.log(res, "---------------");
      // });
      console.log("saveto点击");
      
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
