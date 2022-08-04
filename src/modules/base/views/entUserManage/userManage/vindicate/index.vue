<template>
  <zj-content-container>
    <zj-top-header title="维护用户信息"></zj-top-header>
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
                  <span>{{ detailData.aaa | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码：">
                  <span>{{ detailData.aaa | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件有效期：">
                  <span>{{ detailData.aaa | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码/用户名：">
                  <span>{{ detailData.aaa | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="邮箱：">
                  <span>{{ detailData.aaa | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="海天业务系统账号：">
                 <span>{{ detailData.aaa | value }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </zj-content>
      </zj-content-block>
      <zj-content-block>
        <zj-header title="用户归属企业信息"></zj-header>
        <zj-content>
          <zj-table
            ref="searchTable"
            :params="searchForm"
            :api="zjControl.queryUserPage"
          >
            <zj-table-column field="field1" title="企业代码" />
            <zj-table-column field="field2" title="客户业务系统编码" />
            <zj-table-column field="field3" title="企业名称" />
            <zj-table-column field="field3" title="是否海天集团" />
            <zj-table-column field="field3" title="平台客户类型" />
            <zj-table-column field="field3" title="新增日期" />
            <zj-table-column field="field3" title="企业状态" />
            <zj-table-column field="field3" title="用户状态" />
            <zj-table-column field="field4" title="角色" />
            <zj-table-column
              title="操作"
              fixed="right"
              width="200px"
              v-if="pageType !== 'detail'"
            >
              <template>
                <zj-button type="text" @click="&quot;&quot;;">制key</zj-button>
                <zj-button type="text" @click="&quot;&quot;;">冻结</zj-button>
                <zj-button type="text" @click="&quot;&quot;;">注销</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
    </el-form>
    <zj-content-footer>
      <zj-button type="primary" @click="back" v-if="pageType !== 'detail'"
        >修改</zj-button
      >
      <zj-button class="back" @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      zjControl: {
        getUserInformation: this.$api.userInfoManage.getUserInformation,
      },
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
  },
};
</script>
