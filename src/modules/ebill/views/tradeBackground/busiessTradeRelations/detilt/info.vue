<template>
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
</template>

<script>
import { Row } from 'element-ui';
import view from "@pubComponent/preview/view";
export default {
  mixins:[view],
  data() {
    return {
      searchForm: {},
      zjControl: {
        relationDetail: this.$api.platformRelations.relationDetail,
        getDirectory: this.$api.platformRelations.getDirectory,
        downloadFile: this.$api.baseCommon.downloadFile,//下载
      },
      xq: {},

    };
  },
  created() {
    this.getRow()
    this.getDetails()
    console.log(this.row);
    console.log(xq.attachList.length);
  },
  methods: {
    downstuff(row) {
      let params = {
        fileUrl:row.fileId,
        fileId:row.fileId,
        fileName:row.fileName
        //后端字段取反，等会改完再看看
      }
      this.zjControl.downloadFile(params).then((res) => {
      });
    },
    getDetails() {
      console.log(this.row.id);
      let params = {
        id: this.row.id
      }
      this.zjControl.relationDetail(params).then((res) => {
        this.xq = res.data;
        console.log(this.xq);
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
