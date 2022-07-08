<template>
  <div class="basicInfo">
    <ZjTopHeader>平台基础信息设置</ZjTopHeader>

    <ZjHeader>平台信息</ZjHeader>
    <div class="formBox">
      <el-form
        ref="form"
        class="mbi-form"
        :model="formModel"
        :rules="formRules"
        :class="editFlag ? '' : 'nmb0'"
        label-width="180px"
      >
        <el-form-item label="平台名称：">
          <el-input
            v-model="searchForm.issueEntName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>
        <el-form-item label="平台平台运营企业名称：">
          <el-input
            v-model="searchForm.issueEntName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>
      </el-form>
    </div>
    <ZjHeader>运营信息</ZjHeader>
    <h4>邮寄地址</h4>
    
    <div class="formBox">
      <el-form
        ref="form1"
        class="mbi-form"
        :model="formModel"
        :rules="formRules"
        :class="editFlag ? '' : 'nmb0'"
        label-width="180px"
      >
        <el-form-item label="收件人：">
          <el-input
            v-model="searchForm.issueEntName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>
        <el-form-item label="收件人电话：">
          <el-input
            v-model="searchForm.issueEntName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>
        <el-form-item label="收件地址：">
          <el-input
            v-model="searchForm.issueEntName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>
        <el-form-item label="客服电话：">
          <el-input
            v-model="searchForm.issueEntName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>
      </el-form>
    </div>
    <ZjContentFooter>
      <div class="footerBtnBox">
        <zj-button type="primary">确认</zj-button>
        <zj-button>返回</zj-button>
      </div>
    </ZjContentFooter>
  </div>
</template>

<script>
export default {
    data () {
        return {
            searchForm: {}
        }
    }
};
</script>

<style lang="less" scoped>
.basicInfo {
    > h4 {
        margin-left: 40px;
        margin-bottom: 10px;
        font-size: 16px;
    }
}
</style>