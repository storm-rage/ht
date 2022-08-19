<template>
  <el-dialog
    class="registerAudit-certificate"
    :show-close="true"
    @close="close"
    :center="true"
    :close-on-click-modal="false"
    width="800px"
    :visible.sync="show"
  >
    <!--  头部信息  -->
    <el-row slot="title" class="zj-f-s-20">发放证书</el-row>
    <!-- 主体 -->
    <div class="bodyDiv" style="width: 100%">
      <zj-table
        ref="searchTable"
        class="zj-search-table"
        style="min-width: 80% !important"
        :dataList="tableList"
      >
        <zj-table-column field="loginName" title="用户名" width="125" />
        <zj-table-column field="userName" title="姓名" width="125" />
        <zj-table-column
          field="certType"
          title="证件类型"
          :formatter="
            (obj) => typeMap(directory.legalCertTypeList, obj.cellValue)
          "
        />
        <zj-table-column field="certNo" title="证件号码" />
        <zj-table-column field="roleName" title="操作角色" width="125" />
        <zj-table-column field="issueCertState" title="发证书">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              v-if="row.issueCertState === '0'"
              @click="makeKey(row)"
            >
              {{
                operatCertType === "1"
                  ? "制key"
                  : operatCertType === "2"
                  ? "绑定云证书"
                  : ""
              }}
            </zj-button>
            <span v-else>
              {{
                operatCertType === "1"
                  ? "已制key"
                  : operatCertType === "2"
                  ? "已绑定云证书"
                  : ""
              }}
            </span>
          </template>
        </zj-table-column>
      </zj-table>
    </div>
    <!--  底部按钮  -->
    <el-row slot="footer" class="dialog-footer zj-m-t-20">
      <zj-button
        type="primary"
        @click="submitCert"
        :api="cBtn.submitEntIssuedCert"
        >发证完成</zj-button
      >
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: "certificate",
  props: {
    zjControl: Object,
    directory: Object,
    cBtn: Object,
  },
  data() {
    return {
      show: false,
      row: {},
      tableList: [],
      operatCertType: "",
    };
  },
  watch: {
    show(boo) {
      if (!boo) {
        return;
      }
      this.getCertUserInfo();
    },
  },
  methods: {
    //查询待发证用户信息
    getCertUserInfo() {
      let params = {
        id: this.row.id,
      };
      this.zjControl.getCertUserInfo(params).then((res) => {
        console.log(res.data);
        this.tableList = res.data.issueCertUserList;
        this.operatCertType = res.data.operatCertType;
      });
    },
    //关闭
    close() {
      this.$emit("close", false);
      this.show = false;
    },
    //制key
    makeKey(row) {
      let params = {
        entId: this.row.id,
        userId: row.id,
      };
      this.zjControl.certKey(params).then(() => {
        this.$Message.success("制Key成功！");
        this.getCertUserInfo();
      });
    },
    //发证完成
    submitCert() {
      let params = {
        id: this.row.id,
      };
      this.zjControl.submitEntIssuedCert(params).then((res) => {
        this.$Message.success("发证成功！");
        this.close();
      });
    },
  },
};
</script>

<style lang="less">
.registerAudit-certificate {
  .el-dialog__body {
    padding: 0 25px;
  }
  .el-dialog__footer {
    padding-top: 0;
    transform: translateY(-5px);
  }
}
</style>
