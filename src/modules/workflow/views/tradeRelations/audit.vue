<template>
  <zj-content-container>
    <zj-top-header title="贸易关系审核"></zj-top-header>
    <zj-content-block>
      <!--  交易信息  -->
      <zj-header title="交易信息"></zj-header>
      <zj-content>
        <el-form ref="form" label-width="160px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请流水号：" prop="field1">
                {{ xq.serialNo }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请类型：" prop="field1"> {{ xq.applyType }} </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请状态：" prop="field1"> {{ xq.applyStatus }} </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请时间：" prop="field1"> {{ xq.applyDatetime }} </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zj-content>
    </zj-content-block>
    <!-- <relations-info /> -->
    <zj-content-block>
      <zj-content-block>
        <ZjHeader>买方企业信息</ZjHeader>
        <el-form ref="form" label-width="160px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="买方企业名称："> {{ xq.buyerEntName }} </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否海天集团："> {{ xq.buyerIsHtEnterprise }} </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户业务系统编码："> {{ xq.buyerCustomCode }} </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zj-content-block>

      <zj-content-block>
        <ZjHeader>卖方企业信息</ZjHeader>
        <el-form ref="form" label-width="160px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="卖方企业名称："> {{ xq.sellerEntName }} </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户业务系统编码："> {{ xq.sellerCustomCode }} </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贸易关系状态："> {{ xq.state }} </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="冻结原因："> {{ xq.freezeReason }} </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zj-content-block>

      <zj-content-block>
        <ZjHeader>卖方银行账户信息</ZjHeader>
        <el-form ref="form" label-width="160px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="银行账号："> {{ xq.bankAccount }} </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行账户户名："> {{ xq.bankAccname }} </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行账号开户行："> {{ xq.bankName }} </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户行联行号："> {{ xq.bankNo }} </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行类型："> {{ xq.bankType }} </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zj-content-block>

      <zj-content-block>
        <ZjHeader>附件信息</ZjHeader>
        <zj-content>
          <zj-table :dataList="xq.attachList">
            <zj-table-column type="seq" title="序号" />
            <zj-table-column field="fileId" title="附件名称" />
            <zj-table-column title="操作">
              <template v-slot="{ row }">
                <zj-button type="text" @click="downstuff(row)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
    </zj-content-block>
    <!--  操作记录  -->
    <!-- <operate-log></operate-log> -->
    <!--  审批意见  -->
    <!-- <audit-remark></audit-remark> -->
    <zj-content-block>
      <zj-header title="审核意见"></zj-header>
      <zj-content>
        <el-form ref="form" label-width="100px" hide-required-asterisk>
          <!-- <el-form-item label="审核意见：" prop="notes" :rules="[{ required: true, message: '请选输入审核意见' }]"> -->
          <el-form-item prop="notes">
            <el-input type="textarea" v-model="notes" style="width: 100%"></el-input>
          </el-form-item>
        </el-form>
      </zj-content>
    </zj-content-block>
    <zj-content-footer>
      <zj-button type="primary" @click="pass">审核通过</zj-button>
      <zj-button type="primary" @click="refuse">拒绝</zj-button>
      <zj-button @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import relationsInfo from "@modules/ebill/views/tradeBackground/busiessTradeRelations/detilt/info";
import OperateLog from "../components/operateLog";
import AuditRemark from "../components/auditRemark";

export default {
  components: {
    // relationsInfo,
    // OperateLog,
    // AuditRemark,
  },
  data() {
    return {
      searchForm: {},
      zjControl: {
        refuse: this.$api.platformRelations.refuse,//审核拒绝
        pass: this.$api.platformRelations.pass,//审核通过
        auditDetail: this.$api.platformRelations.auditDetail,//详情
        downloadFile: this.$api.baseCommon.downloadFile,//下载
      },
      xq: {},
      notes: "",
      serialNo: "1533483500706979840",
      // 1533450545422729216
      // 1533450558307631104
      // 1533453571227164672
      // 1533453914824548352
      // 1533483500706979840
    };
  },
  created() {
    this.getRow()
    this.getDetails()
    // console.log(this.row);
    // console.log(xq.attachList.length);
  },
  methods: {
    pass() {
      let params = {
        notes: this.notes,
        // serialNo: row.serialNo
        serialNo: this.serialNo
      }
      this.zjControl.pass(params).then((res) => {
        this.back()
        this.notes = ""
      });
    },
    refuse() {
      if (this.notes) {
        let params = {
          notes: this.notes,
          // serialNo: row.serialNo
          serialNo: this.serialNo
        }
        this.zjControl.refuse(params).then((res) => {
          this.back()
          this.notes = ""
        });
      }else{
        this.$messageBox({
              type: 'warning',
              content: `请输入审核意见`,
              title: '提示',
              showConfirmButton: true,
              center: true
            })
      }

    },
    back() { },
    downstuff(row) {
      let params = {
        fileUrl: row.fileId,
        fileId: row.fileId,
        fileName: row.fileName
        //后端字段取反，等会改完再看看
      }
      this.zjControl.downloadFile(params).then((res) => {
      });
    },
    getDetails() {
      console.log(this.row.id);
      let params = {
        // id: this.row.id
        serialNo: this.serialNo
      }
      this.zjControl.auditDetail(params).then((res) => {
        this.xq = res.data;
        console.log(this.xq);
      });
    }
  },
};
</script>
