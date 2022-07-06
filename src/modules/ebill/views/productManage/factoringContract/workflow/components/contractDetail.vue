<template>
  <el-form  ref="form" label-width="160px">
    <zj-content-block>
      <zj-header title="合同信息"></zj-header>
      <zj-content>
        <div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同编号：">
                <span>334354534</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同生成时间：">
                <span>2021.01.01 11:11:22</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <zj-table :pager="false">
          <zj-table-column
            type="seq"
            width="60"
            title="序号"/>
          <zj-table-column
            field="field2"
            title="买方企业名称"/>
          <zj-table-column
            field="field3"
            title="应收账款转让期限"/>
          <zj-table-column
            field="field4"
            title="授信额度" :formatter="money"/>
          <zj-table-column
            field="field5"
            title="额度期限"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="本次确认合同/协议"></zj-header>
      <zj-content>
        <zj-table>
          <zj-table-column
            type="seq"
            width="60"
            title="序号"/>
          <zj-table-column
            field="field2"
            title="合同/协议编号"/>
          <zj-table-column
            field="field3"
            title="合同/协议名称"/>
          <zj-table-column
            field="field4"
            title="签署方"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="toDownload(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </el-form>
</template>
<script>
export default {
  data () {
    return {};
  },
  methods: {
    toDownload (row) {}
  }
};
</script>
