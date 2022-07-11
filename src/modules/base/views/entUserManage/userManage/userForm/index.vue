<template>
  <zj-content-container>
    <zj-top-header>{{isAdd?'新增用户申请':'修改用户信息申请'}}</zj-top-header>
    <el-form ref="form" label-width="160px">
      <zj-content-block v-if="isAdd">
        <zj-header title="企业信息"></zj-header>
        <zj-content>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="企业名称：">
                  <span>xxx</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="平台客户类型：">
                  <span>xxxxxxx</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户业务系统编码：">
                  <span>xx</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否海天集团：">
                  <span>xx</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </zj-content>
      </zj-content-block>
      <zj-content-block>
        <zj-header title="用户信息"></zj-header>
        <zj-content>
          <div>
            <el-row>
              <el-col :span="8" v-if="isAdd">
                <el-form-item label="用户编码：">
                  <span>xxx</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="用户姓名：">
                  <el-input v-model="form.a" v-if="isAdd" />
                  <span v-else>xxxxxxx</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件类型：">
                  <el-select
                    v-model="form.a"
                    filterable
                    placeholder="请选择"
                    :popper-append-to-body="false"
                    v-if="isAdd" 
                  >
                    <el-option :label="身份证号码" :value="身份证号码" />
                  </el-select>
                  <span v-else>62434343</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码：">
                  <el-input v-model="form.a" v-if="isAdd" />
                  <span v-else>xxxxxxx</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件有效期：">
                  <zj-date-range-picker
                    class="el-form-item__regExpire"
                    :startDate.sync="form.certStartDate"
                    :endDate.sync="form.certEndDate"
                    @startChange="certStartChange"
                    @endChange="certEndChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码/用户名：">
                  <el-input v-model="form.a" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="邮箱：">
                  <el-input v-model="form.a" />
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="isAdd">
                <el-form-item label="海天业务系统账号：">
                  <el-input v-model="form.a" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="用户角色：">
                  <el-select
                    v-model="form.a"
                    filterable
                    placeholder="请选择"
                    :popper-append-to-body="false"
                  >
                    <el-option :label="身份证号码" :value="身份证号码" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="请选择开凭证对账单类型权限："
                  label-width="280px"
                >
                  <el-select
                    v-model="form.a"
                    filterable
                    placeholder="请选择"
                    :popper-append-to-body="false"
                  >
                    <el-option :label="身份证号码" :value="身份证号码" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </zj-content>
      </zj-content-block>
    </el-form>
    <zj-content-block v-if="!isAdd">
      <zj-header title="用户归属企业信息"></zj-header>
      <zj-content>
        <zj-table :dataList="fileList">
          <zj-table-column field="field1" title="企业代码" />
          <zj-table-column field="field2" title="客户业务系统编码" />
          <zj-table-column field="field3" title="企业名称" />
          <zj-table-column field="field3" title="是否海天集团" />
          <zj-table-column field="field3" title="平台客户类型" />
          <zj-table-column field="field3" title="创建日期" />
          <zj-table-column field="field3" title="企业状态" />
          <zj-table-column field="field3" title="用户状态" />
          <zj-table-column field="field4" title="角色" />
          <zj-table-column title="操作" fixed="right" width="200px">
            <template>
              <zj-button type="text" @click="&quot;&quot;;">维护角色</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <zj-content-footer>
      <zj-button type="primary" @click="submit">提交申请</zj-button>
      <zj-button class="back" @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
export default {
  components: {},

  data() {
    return {
      isAdd: this.$route.name === "userAdd" ? true : false,
      form: {},
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
      ],
    };
  },
  methods: {
    back() {},
  },
};
</script>

<style lang="less" scoped>
//证件有效期
/deep/.el-form-item__regExpire {
  .zj-date-range-picker {
    width: 100px;
    .el-input__inner {
      padding-left: 3px;
    }
    & ~ span {
      display: inline-block;
      width: 20px;
      text-align: center;
    }
  }
  .el-form-item {
    margin-bottom: 0;
    .el-form-item__error {
      top: 14px;
    }
  }
}
</style>