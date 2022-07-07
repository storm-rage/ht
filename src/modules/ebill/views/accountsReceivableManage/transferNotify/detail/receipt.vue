<template>
  <zj-content-container>
    <zj-top-header title="应收账款转让通知回执"></zj-top-header>
    <el-form  ref="form" label-width="160px">
      <zj-content-block>
        <zj-header title="基础信息"></zj-header>
        <zj-content>
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请流水号：">
                <span>QX000001</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="转出企业：">
                <span>深圳市仁义科技有限公司</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="签收企业/资金方：">
                <span>深圳市仁义科技有限公司</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="转让日期：">
                <span>2021-09-01</span>
              </el-form-item>
            </el-col>
          </el-row>
        </zj-content>
      </zj-content-block>
      <zj-content-block>
        <zj-header title="协议信息"></zj-header>
        <zj-content>
          <zj-table :pager="false">
            <zj-table-column
              type="seq"
              width="60"
              title="序号"/>
            <zj-table-column
              field="field2"
              title="协议附件"/>
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{ row }">
                <zj-button type="text" @click="toDownload(row)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
    </el-form>
    <zj-content-footer>
      <span style="display: inline-block;margin-right: 10px">
        <el-checkbox v-model="agreeCheck">已阅读并同意</el-checkbox>&nbsp;
        <el-link :underline="false" type="primary">《应收账款转让通知确认函》</el-link>
      </span>
      <zj-button type="primary" @click="back">回执确认</zj-button>
      <zj-button @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
export default {
  data () {
    return {
      agreeCheck: false
    };
  },
  methods: {
    toDownload (row) {},
    back () {}
  }
};
</script>
