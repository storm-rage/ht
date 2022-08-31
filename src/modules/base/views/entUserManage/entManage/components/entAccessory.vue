<template>
  <el-form :model="form" ref="form" :rules="rules">
    <zj-content-block>
      <zj-header :title="title"></zj-header>
      <zj-content>
        <zj-table ref="fileTable" :dataList="fileList" :pager="false">
          <zj-table-column type="seq" title="序号" width="60" />
          <zj-table-column field="type" title="附件类型" />
          <zj-table-column field="fileName" title="附件名称" />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <template v-if="isEdit">
                <zj-upload class="zj-inline" :httpRequest="handleFileUpload" :data="{ row }">
                  <zj-button slot="trigger" type="text">上传</zj-button>
                </zj-upload>
              </template>
              <template>
                <zj-button v-show="row.fileId" type="text" @click="toDownload(row)">下载</zj-button>
              </template>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </el-form>
</template>
<script>
export default {
  components: {},

  props: {
    // 是否可以编辑表单
    isEdit: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      // 表单
      form: {},
      rules: {},
      // 列表
      fileList: [],
      // 当前编辑行
      currentEditRow: {},
      // 当前编辑index
      currentEditIndex: 0,
    };
  },
  methods: {
    getForm() {
      return this.$refs.form;
    },
    getData() {
      return { form: this.form, list: this.fileList };
    },
    // 下载
    toDownload(row) {
      this.$api.baseCommon.downloadFile.downloadFile(row)
    },
    handleFileUpload({ file, data }) {
      let formData = new FormData();
      formData.append("file", file);
      this.$api.baseCommon.uploadFile(formData).then((res) => {
        data.row.fileId = res.data.fileId;
        data.row.fileName = res.data.fileName;
      });
    },
  },
};
</script>
