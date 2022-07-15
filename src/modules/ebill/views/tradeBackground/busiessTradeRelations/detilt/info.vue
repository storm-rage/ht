<template>
  <zj-content-block>
    <zj-content-block>
      <ZjHeader>买方企业信息</ZjHeader>
      <el-form ref="form" label-width="160px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="买方企业名称："> 546565465 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否海天集团："> 546565465 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户业务系统编码："> 546565465 </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </zj-content-block>

    <zj-content-block>
      <ZjHeader>卖方企业信息</ZjHeader>
      <el-form ref="form" label-width="160px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="卖方企业名称："> 546565465 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户业务系统编码："> 546565465 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="贸易关系状态："> 546565465 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="冻结原因："> 546565465 </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </zj-content-block>

    <zj-content-block>
      <ZjHeader>卖方银行账户信息</ZjHeader>
      <el-form ref="form" label-width="160px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="银行账号："> 546565465 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行账户户名："> 546565465 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行账号开户行："> 546565465 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户行联行号："> 546565465 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行类型："> 546565465 </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </zj-content-block>

    <zj-content-block>
      <ZjHeader>附件信息</ZjHeader>
      <zj-content>
        <zj-table
         :pager="false"
          ref="searchTable"
          :params="searchForm"
          :api="zjControl.tableApi"
        >
          <zj-table-column prop="id" title="序号" />
          <zj-table-column field="" title="附件名称" />
          <zj-table-column field="" title="操作" />
        </zj-table>
      </zj-content>
    </zj-content-block>
  </zj-content-block>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {},
      zjControl: {},
    };
  },
};
</script>

<style lang="less" scoped>
</style>