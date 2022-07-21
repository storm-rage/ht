<template>
  <!-- 个人中心 -->
  <zj-content-container>
    <zj-center>
      <zj-header>我的账户</zj-header>
      <div style="width: 80%; margin: 0 auto">
        <zj-tabs v-model="tabAtive" tab-position="left">
          <el-tab-pane label="我的基本信息" name="myBasicInformation">
            <zj-content-block>
              <h4 class="zj-m-b-20">我的企业信息</h4>
              <el-form ref="form">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="企业名称：" prop="field1">
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="统一社会信用代码：" prop="field1">
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="注册地址：" prop="field1">
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </zj-content-block>

            <zj-content-block>
              <h4 class="zj-m-b-20">我的个人信息</h4>
              <el-form ref="form">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="姓名：" prop="field1"> </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="绑定手机：" prop="field1">
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="注册地址：" prop="field1">
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </zj-content-block>
          </el-tab-pane>
          <el-tab-pane label="我的开票信息" name="myBillingInformation">
            <zj-content-block>
              <h4 class="zj-m-b-20">我的开票信息</h4>
              <el-form ref="form" label-width="120px">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="企业名称：" prop="field1">
                      <el-input v-model="form.field1" v-if="isEdit" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="纳税人识别号：" prop="field1">
                      <el-input v-model="form.field1" v-if="isEdit" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="地址、电话：" prop="field1">
                      <el-input v-model="form.field1" v-if="isEdit" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="开户行及账号：" prop="field1">
                      <el-input v-model="form.field1" v-if="isEdit" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="电子邮箱：" prop="field1">
                      <el-input v-model="form.field1" v-if="isEdit" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </zj-content-block>
          </el-tab-pane>
        </zj-tabs>
      </div>
    </zj-center>
    <zj-content-footer>
      <zj-button
        type="primary"
        @click="$router.push('/entInfoMaintain')"
        v-show="tabAtive === 'myBasicInformation'"
        >维护企业信息</zj-button
      >
      <zj-button
        type="primary"
        @click="$router.push('/userInfoMaintain')"
        v-show="tabAtive === 'myBasicInformation'"
        >维护个人信息</zj-button
      >
      <zj-button
        type="primary"
        @click="isEdit = true"
        v-show="tabAtive === 'myBillingInformation' && !isEdit"
        >修改</zj-button
      >
      <zj-button type="primary" @click="toUpdate" v-show="isEdit"
        >保存</zj-button
      >
      <zj-button class="back" @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
export default {
  name: "personalCenter",
  data() {
    return {
      zjControl: {},
      tabAtive: "myBasicInformation",
      isEdit: false,
      form:{}
      // tabsList: [
      //   { label: "我的基本信息", name: "myBasicInformation" },
      //   { label: "我的开票信息", name: "myBillingInformation" },
      // ],
      // dictionary: {},
    };
  },
  methods: {
    back() {},
    toUpdate() {},
  },
};
</script>

<style lang="less">
.el-tab-pane {
  margin-left: 40px;
}
</style>
