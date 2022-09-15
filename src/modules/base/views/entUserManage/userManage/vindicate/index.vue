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
                  {{
                    typeMap(this.dictionary.certType, this.detailData.certType)
                  }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码：">
                  <span>{{ detailData.certNo | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件有效期：">
                  <span>{{ detailData.certStartDate | value }} 至
                    {{ detailData.certEndDate | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码/用户名：">
                  <span>{{ detailData.mobileNo | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="海天业务系统账号：">
                  <span>{{ detailData.htSysCode | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <zj-button v-if="detailData.idCardAttach" type="text" style="font-size: 16px" @click="downloadFile(detailData.idCardAttach)" :disabled="Array.isArray(detailData.idCardAttach)&&!detailData.idCardAttach.length">身份证影像件</zj-button>
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
            <zj-table-column field="isHtEnterprise" title="是否海天集团" :formatter="(obj) => typeMap(dictionary.isHtEnterprise, obj.cellValue)" />
            <zj-table-column field="entType" title="平台客户类型" :formatter="(obj) => typeMap(dictionary.entType, obj.cellValue)" />
            <zj-table-column field="createDatetime" title="新增日期" :formatter="date" />
            <zj-table-column field="entState" title="企业状态" :formatter="(obj) => typeMap(dictionary.enterpriseStateList, obj.cellValue)" />
            <zj-table-column field="roleId" title="角色" :formatter="(obj) => typeMap(dictionary.sysRoleList, obj.cellValue)" />
            <zj-table-column field="email" title="邮箱" />
            <zj-table-column field="userState" title="状态" :formatter="(obj) => typeMap(dictionary.userState, obj.cellValue)" />
            <zj-table-column field="statementAccountType" title="支持开立债权凭证的对账单类型" v-if="pageType !== 'detail'">
              <template v-slot="{ row }">
                {{handleStatementAccountType
                (row.statementAccountType)}}
              </template>
            </zj-table-column>
            <zj-table-column title="操作" fixed="right" width="240px" v-if="pageType !== 'detail'">
              <template v-slot="{ row }">
                <!-- 是海天集团并且是核心企业、平台、保理公司不显示制key -->
                <zj-button type="text" @click="makeCertKey(row)" v-if="(row.isHtEnterprise === '1' && !['B','0','BL'].includes(row.entType)) || row.isHtEnterprise === '0' && row.issueCertState === '0'">制key</zj-button>
                <zj-button type="text" @click="freezeUser(row)" v-if="row.userState === '1'">冻结</zj-button>
                <zj-button type="text" @click="unfreezeUser(row)" v-if="row.userState === '5'">解冻</zj-button>
                <zj-button type="text" @click="cancelUser(row)" v-if="row.userState === '1' || row.userState === '5'">注销</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
    </el-form>
    <zj-content-footer>
      <zj-button type="primary" @click="toDetail(row)" v-if="pageType !== 'detail'">修改</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      zjControl: {
        downloadFile: this.$api.baseCommon.downloadFile,//文件下载
        ...this.$api.userInfoManage,
      },
      pageType: this.$route.meta.pageType,
      detailData: {},
      dictionary: {},
    };
  },
  created() {
    this.getRow();
    this.getDictionary();
  },
  methods: {
    //获取字典
    getDictionary() {
      this.zjControl.getUserDictionary().then((res) => {
        this.dictionary = res.data;
        this.getUserInformation();
      });
    },
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
        content: `${"是否确认为用户" + this.detailData.userName + "  -  绑定云证书？"}`,
        messageResolve: () => {
          let params = {
            entId: row.entId,
            userId: this.detailData.id,
          };
          this.zjControl.bindCloudCerUser(params).then(() => {
            this.$message.success(`已为用户：${row.userName}  -  绑定云证书成功！`);
            this.getUserInformation();
          });
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
          let params = {
            entId: row.entId,
            roleId: row.roleId,
            userId: this.detailData.id,
          }
          this.zjControl.freezeUser(params).then(() => {
            this.getUserInformation();
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
          let params = {
            entId: row.entId,
            roleId: row.roleId,
            userId: this.detailData.id,
          }
          this.zjControl.unfreezeUser(params).then(() => {
            this.getUserInformation();
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
          let params = {
            entId: row.entId,
            roleId: row.roleId,
            userId: this.detailData.id,
          }
          this.zjControl.cancelUser(params).then(() => {
            this.getUserInformation();
            this.$message.success("注销账户成功！");
          });
        },
      });
    },
    //对账单类型转码
    handleStatementAccountType(data) {
      if (!!data) {
        let arr = data.split(',')
        if (Array.isArray(arr) && data.length) {
          arr.forEach((item, i) => {
            console.log(this.typeMap(this.dictionary.statementAccountTypeList, item))
            arr[i] = this.typeMap(this.dictionary.statementAccountTypeList, item)
          })
          return arr.join(',')
        }
      }
    },
    downloadFile(data) {
      this.zjControl.downloadFile(data[0])
    },
    toDetail(row) {
      if (this.detailData.userAndEntInfoList.length) {
        this.detailData.userAndEntInfoList.forEach((item, index) => {
          if (item.isHtEnterprise === '0') {
            this.$messageBox({
              type: 'warning',
              content: `归属企业必须都是海天集团才能修改`,
              title: '提示',
              showConfirmButton: true,
              center: true
            })
            return false;
          }
          if (index >= this.detailData.userAndEntInfoList.length - 1) {
            this.goChild('userUpdate', row)
          }
        })
      }
    }
  },
};
</script>
<style lang="less" scoped>
// .fileBtn {
//   color: #ccc;
//   font-size: 20px;
// }
</style>