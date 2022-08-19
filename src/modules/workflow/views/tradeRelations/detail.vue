<template>
  <zj-content-container>
    <zj-top-header title="贸易关系交易详情"></zj-top-header>
    <!--  贸易关系信息  -->
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
    <zj-content-block>
    <zj-header title="操作记录"></zj-header>
    <zj-content>
      <zj-table ref="logTable"
                :dataList="xq.businessParamLogList"
                :pager="false">
        <zj-table-column type="seq" width="60" title="序号"/>
        <zj-table-column field="operType" title="业务节点"/>
        <zj-table-column
          field="operPerson"
          title="处理人"
        />
        <zj-table-column
          field="operDatetime"
          title="处理时间"
        />
        <zj-table-column field="operResult" title="审核结果"/>
        <zj-table-column field="notes" title="审核意见"/>
      </zj-table>
    </zj-content>
  </zj-content-block>
    <zj-content-footer>
      <zj-button @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import relationsInfo from '@modules/ebill/views/tradeBackground/busiessTradeRelations/detilt/info'
import OperateLog from '../components/operateLog';

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
        alreadyDetail: this.$api.platformRelations.alreadyDetail,//详情
        downloadFile: this.$api.baseCommon.downloadFile,//下载
      },
      xq: {},
      notes: "",
      serialNo: "1533453571227164672",
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
        this.notes=""
      });
    },
    refuse() {
      let params = {
        notes: this.notes,
        // serialNo: row.serialNo
        serialNo: this.serialNo
      }
      this.zjControl.refuse(params).then((res) => {
        this.back()
        this.notes=""
      });
    },
    back() { },
    downstuff(row) {
      let params = {
        fileUrl: row.fileId,
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
      this.zjControl.alreadyDetail(params).then((res) => {
        this.xq = res.data;
        console.log(this.xq);
      });
    }
  },
};
</script>
