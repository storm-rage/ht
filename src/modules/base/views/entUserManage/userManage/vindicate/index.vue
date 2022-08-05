<template>
  <zj-content-container>
    <zj-top-header>
      {{ pageType === "detail" ? "用户详情" : "维护用户信息" }}
    </zj-top-header>
    <el-form ref="form" label-width="180px">
      <zj-content-block>
        <zj-header title="用户信息"></zj-header>
        <zj-content>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="用户编码：">
                  <span>{{ detailData.userCode | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="用户姓名：">
                  <span>{{ detailData.userName | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件类型：">
                  <span>{{ detailData.certType | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码：">
                  <span>{{ detailData.certNo | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件有效期：">
                  <span
                    >{{ detailData.certStartDate | value }} 至
                    {{ detailData.certEndDate | value }}</span
                  >
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码/用户名：">
                  <span>{{ detailData.mobileNo | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="邮箱：">
                  <span>{{ detailData.email | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="海天业务系统账号：">
                  <span>{{ detailData.htSysCode | value }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </zj-content>
      </zj-content-block>
      <zj-content-block>
        <zj-header title="用户归属企业信息"></zj-header>
        <zj-content>
          <zj-table ref="searchTable" :dataList="detailData.userAndEntInfoList">
            <zj-table-column field="code" title="企业代码" />
            <zj-table-column field="customCode" title="客户业务系统编码" />
            <zj-table-column field="entName" title="企业名称" />
            <zj-table-column field="isHtEnterprise" title="是否海天集团" />
            <zj-table-column field="entType" title="平台客户类型" />
            <zj-table-column field="createDatetime" title="新增日期" />
            <zj-table-column field="entState" title="企业状态" />
            <zj-table-column field="roleId" title="角色" />
            <zj-table-column field="userState" title="状态" />
            <zj-table-column
              field="field3"
              title="支持开立债权凭证的对账单类型"
              v-if="pageType !== 'detail'"
            />
            <zj-table-column
              title="操作"
              fixed="right"
              width="200px"
              v-if="pageType !== 'detail'"
            >
              <template>
                <zj-button type="text" @click="makeCertKey(row)"
                  >制key</zj-button
                >
                <zj-button type="text" @click="freezeUser(row)">冻结</zj-button>
                <zj-button type="text" @click="unfreezeUser(row)"
                  >解冻</zj-button
                >
                <zj-button type="text" @click="cancelUser(row)">注销</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
    </el-form>
    <zj-content-footer>
      <zj-button
        type="primary"
        @click="goChild('userUpdate', row)"
        v-if="pageType !== 'detail'"
        >修改</zj-button
      >
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      zjControl: this.$api.userInfoManage,
      pageType: this.$route.meta.pageType,
      detailData: {},
    };
  },
  created() {
    this.getRow();
    this.getUserInformation();
  },
  methods: {
    // 获取详情
    getUserInformation() {
      this.zjControl.getUserInformation({ id: this.row.id }).then((res) => {
        this.detailData = res.data;
      });
    },
    //制key
    makeCertKey(row) {
      this.$messageBox({
        type: "confirm",
        title: `制key确认`,
        content: `${"是否确认为用户" + row.userName + "  -  制作key"}`,
        messageResolve: () => {
          if (row.certType === "1") {
            let paramsKey = {
              userId: row.id,
              p10: "",
            };
            this.zjControl.makeCertKey(paramsKey).then(() => {
              this.$Message.success(`已为用户：${row.userName}  -  制Key成功`);
              this.search(false);
            });
          } else if (row.certType === "2") {
            let paramsClound = {
              entId: row.entId,
              userId: row.id,
            };
            this.zjControl.bindCloudCerUser(paramsClound).then(() => {
              this.$Message.success(
                `已为用户：${row.userName}  -  绑定云证书成功！`
              );
              this.search(false);
            });
          }
        },
      });
    },
    //账户冻结
    freezeUser(row) {
      this.$messageBox({
        type: "confirm",
        title: `温馨提示`,
        content: `是否确认冻结该用户？`,
        showCancelButton: true,
        messageResolve: () => {
          this.zjControl.freezeUser({ id: row.id }).then(() => {
            this.getNewUserInfo(true);
            this.$message.success("冻结账户成功！");
          });
        },
      });
    },
    //账户解冻
    unfreezeUser(row) {
      this.$messageBox({
        type: "confirm",
        title: `温馨提示`,
        content: `是否确认解冻该用户？`,
        showCancelButton: true,
        messageResolve: () => {
          this.zjControl.unfreezeUser({ id: row.id }).then(() => {
            this.getNewUserInfo(true);
            this.$message.success("解冻账户成功！");
          });
        },
      });
    },
    //账户注销
    cancelUser(row) {
      this.$messageBox({
        type: "confirm",
        title: `温馨提示`,
        content: `是否确认注销该用户？`,
        showCancelButton: true,
        messageResolve: () => {
          this.zjControl.cancelUser({ id: row.id }).then(() => {
            this.getNewUserInfo(true);
            this.$message.success("注销账户成功！");
          });
        },
      });
    },
  },
};
</script>
