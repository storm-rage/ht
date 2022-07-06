<template>
  <div class="UserManagement search-page">
    <el-tabs v-model="tabAtive" type="card" class="zj-tabs-card">
      <!-- <el-tab-pane
        :label="item.label"
        v-for="(item, index) in tabsList"
        :key="index"
        :name="tabAtive"
      >
        <component
          :is="tabAtive"
          v-if="item.name === tabAtive"
          :dictionary="dictionary"
        ></component>
      </el-tab-pane> -->
      <el-tab-pane label="用户记录" name="userInfo">
        <userInfo :zjControl="zjControl" :uDictionary="uDictionary" :uBtn="zjBtn"/>
      </el-tab-pane>
      <el-tab-pane label="代办" name="agenda">
        <agenda :zjControl="zjControl" :mDictionary="mDictionary" :mBtn="zjBtn"/>
      </el-tab-pane>
      <el-tab-pane label="已办" name="accomplish">
        <accomplish :zjControl="zjControl" :mDictionary="mDictionary" :mBtn="zjBtn"/>
      </el-tab-pane>
      <el-tab-pane label="已办结" name="end">
        <end :zjControl="zjControl" :mDictionary="mDictionary" :mBtn="zjBtn"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import userInfo from "./userInfo/userInfo";
import agenda from "./maintainRecord/maintainRecord";
import accomplish from "./maintainRecord/maintainRecord";
import end from "./maintainRecord/maintainRecord";
export default {
  name: "UserManagement",
  components: {
    userInfo,
    agenda,
    accomplish,
    end
  },
  data() {
    return {
      tabAtive: "userInfo",
      tabsList: [
        { label: "用户信息", name: "userInfo" },
        { label: "待办", name: "agenda" },
        { label: "已办", name: "accomplish" },
        { label: "已办结", name: "end" }
      ],
      dictionary:{},
      zjControl: {
        //用户信息
        uGetDictionary: this.$api.userInfoManage.getUserDictionary, //数据字典
        uTableApi: this.$api.userInfoManage.queryUserPage, //用户列表
        uAddUser: this.$api.userInfoManage.addUser, //新增用户
        uExportUsers: this.$api.userInfoManage.exportUsers, //列表导出
        uValidateMobileRealName:
          this.$api.userInfoManage.validateMobileRealName, //联网核查
        uUpdateUser: this.$api.userInfoManage.updateUser, //管理入口检测
        uBindCloudCerUser: this.$api.userInfoManage.bindCloudCerUser, //绑定云证书
        uMakeCertKey: this.$api.userInfoManage.makeCertKey, //制key
        uGetUserInformationDetail:
          this.$api.userInfoManage.getUserInformationDetail, //详情入口检测
        uUserInfo: this.$api.userInfoManage.getUserInformation, //获取用户详情
        //维护记录
        mTableApi: this.$api.userInfoManage.queryUserLogsPage, //维护记录
        mGetDictionary: this.$api.userInfoManage.getUserLogsDictionary, //数据字典
      },
      tabs: "userInfo",
      uDictionary: {},
      mDictionary: {},
    };
  },
  methods: {
    getApiAfter() {
      this.zjBtn.userInfo
        ? (this.tabAtive = "userInfo")
        : (this.tabAtive = "maintainRecord");
    },
    uGetDictionary() {
      this.zjControl.uGetDictionary().then((res) => {
        this.uDictionary = res.data;
      });
    },
    mGetDictionary() {
      this.zjControl.mGetDictionary().then((res) => {
        this.mDictionary = res.data;
      });
    },
  },
  created() {
    this.getApi();
    this.uGetDictionary();
    this.mGetDictionary();
  },
};
</script>

<style lang="less">
.uiTabs {
  .el-tabs__nav {
    margin-left: 100px;
    /*padding: 10px 0 5px 0;*/
  }
  .el-tabs__item {
    padding: 0 10px !important;
    /*transform: translateX(-20px);*/
  }
  /*.is-active{*/
  /*  border: 2px solid #f56c6c;*/
  /*  border-bottom: none;*/
  /*  border-radius: 12px 12px 0 0;*/
  /*  transform: translateY(2px);*/
  /*}*/
}
</style>
