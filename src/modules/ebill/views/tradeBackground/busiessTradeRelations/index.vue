<template>
  <div>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="买方企业名称：" class="col-center">
            <el-input v-model="searchForm.buyerEntName" />
          </el-form-item>
          <el-form-item label="卖方企业名称：" class="col-center">
            <el-input v-model="searchForm.sellerEntName" />
          </el-form-item>
          <el-form-item label="上次更新日期" class="col-right">
            <zj-date-range-picker :startDate.sync="searchForm.lastUpdateDatetimeStart"
              :endDate.sync="searchForm.lastUpdateDatetimeEnd" />
          </el-form-item>
          <el-form-item label="贸易关系状态：" class="col-center">
            <el-select v-model="searchForm.state" placeholder="请选择" clearable :popper-append-to-body="false">
              <el-option value="" label="全部"></el-option>
              <el-option v-for="item in dictionary.state" :key="item.code" :label="item.desc" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="买方是否海天集团：" class="col-center">
            <el-select v-model="searchForm.buyerIsHtEnterprise" placeholder="请选择" clearable
              :popper-append-to-body="false">
              <el-option value="" label="全部"></el-option>
              <el-option v-for="item in dictionary.buyerIsHtEnterprise" :key="item.code" :label="item.desc"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <!-- <div class="zj-search-response"> -->
      <zj-table ref="searchTable" :params="searchForm" :api="zjControl.relationLsit">
        <!-- <zj-table-column prop="id" field="" title="买方企业名称" /> -->
        <zj-table-column field="buyerEntName" title="买方企业名称" />
        <zj-table-column field="buyerIsHtEnterprise" title="买方是否海天集团" />
        <zj-table-column field="sellerEntName" title="卖方企业名称" />
        <zj-table-column field="bankAccount" title="卖方银行账号" />
        <zj-table-column field="bankName" title="卖方企业开户行" />
        <zj-table-column field="bankAccname" title="卖方企业银行账户户名" />
        <zj-table-column field="bankNo" title="银行联行号" />
        <zj-table-column field="bankType" title="银行类型" />
        <zj-table-column field="state" title="贸易关系状态" />
        <zj-table-column title="协议">
          <template v-slot="{ row }">
            <zj-button type="text" @click="downsagreement(row)">
              {{ row.mygxqrhFileId }}
            </zj-button>
          </template>
        </zj-table-column>
        <zj-table-column title="证明材料">
          <template v-slot="{ row }">
            <zj-button type="text" @click="downstuff(row)">
              {{ row.mygxzmclFileName }}
            </zj-button>
          </template>
        </zj-table-column>
        <zj-table-column field="lastUpdateDatetime" title="上次更新时间" :formatter="date" />
        <zj-table-column title="操作" fixed="right" align="left">
          <template v-slot="{ row }">
            <zj-button type="text" @click="toInfo(row)">详情</zj-button>
            <!-- <zj-button type="text" @click="openDialog(row)" v-show="row.state == '正常'">冻结</zj-button>
            <zj-button type="text" @click="edit(row)" v-show="row.state == '冻结'">解冻</zj-button> -->
            <zj-button type="text" @click="openDialog(row)" v-show="row.state=='正常'&&row.buyerIsHtEnterprise=='否'">冻结</zj-button>
            <zj-button type="text" @click="edit(row)" v-show="row.state=='冻结'&&row.buyerIsHtEnterprise=='否'">解冻</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
      <!-- </div> -->
    </zj-list-layout>
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" center width="550px"
      :title="type == 'disable' ? '冻结确定' : '解冻确定'" custom-class="mbi-editDialog">
      <el-form ref="form" class="mbi-form" :model="formModel" label="top">
        <el-form-item :label="type == 'disable' ? '请录入冻结原因：' : '请录入解冻原因：'" prop="cause">
          <el-input type="textarea" v-model="cause"></el-input>
        </el-form-item>
      </el-form>

      <el-row slot="footer" class="dialog-footer">
        <zj-button status="primary" @click="savehot(row)" v-if="type == 'relieve'">确定</zj-button>
        <zj-button status="primary" @click="savecold(row)" v-if="type == 'disable'">确定</zj-button>
        <zj-button class="back" @click="dialogVisible = false">取消</zj-button>
      </el-row>
    </el-dialog>
    <zj-preview :visible.sync="viewShow" :fileUrl="viewUrl" :showFooter="false" :fileType="viewType"
      @close="viewShow = false" />
  </div>
</template>
<script>
import view from "@pubComponent/preview/view";
export default {
  mixins: [view],
  data() {
    return {
      workflow: "",
      zjControl: {
        relationLsit: this.$api.platformRelations.relationLsit,
        getDirectory: this.$api.platformRelations.getDirectory,
        freeze: this.$api.platformRelations.freeze,//冻结
        unfreeze: this.$api.platformRelations.unfreeze,//解冻
        downloadFile: this.$api.baseCommon.downloadFile,//下载
      },
      searchForm: {
        expireDateStart: "",
        expireDateEnd: "",
      },
      dictionary: {},
      tableData: [{ id: 1 }],
      formModel: {},
      dialogVisible: false,
      type: "disable",
      // 原因
      cause: "",
      listId: "",
    };
  },
  created() {
    this.getRow()
    this.getApi();
    this.getDirectory();
  },
  methods: {
    downstuff(row) {
      let params = {
        fileUrl:row.mygxzmclFileId,
        fileId:row.mygxzmclFileId,
        fileName:row.mygxzmclFileName
      }
      this.zjControl.downloadFile(params).then((res) => {
      });
    },
    downsagreement(row) {
      let params = {
        fileUrl:row.mygxqrhFileId,
        fileId:row.mygxqrhFileId,
        fileName:row.mygxqrhFileName
      }
      this.zjControl.downloadFile(params).then((res) => {
      });
    },
    //解冻
    savehot() {
      let params = {
        id: this.listId,
        freezeReason: this.cause
      }
      this.zjControl.unfreeze(params).then((res) => {
        this.dialogVisible = false;
        this.search()
        this.cause = ""
      });
    },
    //冻结
    savecold() {
      let params = {
        id: this.listId,
        freezeReason: this.cause
      }
      this.zjControl.freeze(params).then((res) => {
        this.dialogVisible = false;
        this.search()
        this.cause = ""
      });
    },
    getDirectory() {
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data;
      });
    },
    //解冻
    edit(row) {
      this.listId = row.id
      this.type = "relieve";
      this.dialogVisible = true;
    },
    // 冻结
    openDialog(row) {
      this.listId = row.id
      this.type = "disable";
      this.dialogVisible = true;
    },
    toInfo(row) {
      row.parent = "tradeRelationPlatform"
      this.goChild("busiessTradeRelationsInfo", row)
      // this.$router.push("/busiessTradeRelationsInfo");
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
</style>
