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
                  <span>xxx</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="用户姓名：">
                  <span>xxxxxxx</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件类型：">
                  <span>62434343</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码：">
                  <span>8845454546565</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件有效期：">
                  <span>xx</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码/用户名：">
                  <span>656546546556S</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="邮箱：">
                  <span>xx</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="海天业务系统账号：">
                  <span>xxx</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </zj-content>
      </zj-content-block>
      <zj-content-block>
        <zj-header title="用户归属企业信息"></zj-header>
        <zj-content>
          <zj-table :dataList="fileList">
            <zj-table-column field="field1" title="企业代码" />
            <zj-table-column field="field2" title="客户业务系统编码" />
            <zj-table-column field="field3" title="企业名称" />
            <zj-table-column field="field3" title="是否海天集团" />
            <zj-table-column field="field3" title="平台客户类型" />
            <zj-table-column field="field3" title="新增日期" />
            <zj-table-column field="field3" title="企业状态" />
            <zj-table-column field="field3" title="用户状态" />
            <zj-table-column field="field4" title="角色" />
            <zj-table-column title="操作" fixed="right">
              <template>
                <zj-button type="text" @click="''">制key</zj-button>
                <zj-button type="text" @click="''">冻结</zj-button>
                <zj-button type="text" @click="''">注销</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
    </el-form>
    <zj-content-footer>
      <zj-button class="back" @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
export default {
  components: {},

  data() {
    return {
      fileList: [
        {
          field1: "海天a公司",
          field2: "是",
          field3: "54354343423X4645656456",
          field4: "订单保理",
          field5: "生效",
          field6: "2022.09.09 ～ 2023.09.08",
          field7: "100,000,000.00",
          field8: "生效",
        },
      ]
    };
  },
  methods: {
    back() {},
  },
};
</script>
