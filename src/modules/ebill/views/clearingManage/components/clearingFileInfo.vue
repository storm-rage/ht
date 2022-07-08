<template>
  <el-form :model="form" ref="form" label-width="100px">
    <zj-content-block>
      <zj-header title="附件信息"></zj-header>
      <zj-content>
        <zj-table ref="fileTable"
                  :dataList="fileList"
                  :pager="false" keep-source
                  :edit-config="{trigger: 'manual',mode: 'row',icon: '-',autoClear: false,showStatus: true}">
          <zj-table-column type="seq" title="序号" width="50"/>
          <zj-table-column
            field="fileName"
            title="附件名称"/>
          <zj-table-column
            field="remark"
            title="附件说明" :edit-render="{name: '$input',props: {maxlength: 200}}"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row, rowIndex }">
              <template v-if="$refs.fileTable.isActiveByRow(row)">
                <zj-upload class="zj-inline" :httpRequest="handleFileUpload" :autoUpload="false" :onChange="handleFileChange">
                  <zj-button slot="trigger" type="text">上传</zj-button>
                </zj-upload>
                <zj-button type="text" @click="toSave(row,rowIndex)">保存</zj-button>
                <zj-button type="text" style="margin-left: 0px" @click="toCancel(row,rowIndex)">取消</zj-button>
              </template>
              <template v-else>
                <zj-button v-if="row.fileId" type="text" @click="toDownload(row)">下载</zj-button>
                <zj-button v-if="isEdit" type="text" @click="delFile(row,rowIndex)">删除</zj-button>
                <zj-button v-if="isEdit" type="text" @click="toEditFile(row)">修改</zj-button>
              </template>
            </template>
          </zj-table-column>
        </zj-table>
        <div class="zj-m-t-20 zj-center">
          <el-button style="width: 100px" size="small" type="primary" v-if="isEdit" @click="toAddFile">新增</el-button>
        </div>
        <el-row class="zj-m-t-20">
          <el-col>
            <el-form-item label="业务描述：" prop="remark">
              <el-input type="textarea" v-model="form.remark" :disabled="!isEdit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </zj-content>
    </zj-content-block>
  </el-form>
</template>
<script>
/**
 * 凭证收款和非凭证收款,清算申请附件信息
 */
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: {
        remark: ''
      },
      // 列表
      fileList: [],
      // 当前编辑行
      currentEditRow: {},
      // 当前编辑index
      currentEditIndex: 0
    }
  },
  methods: {
    getForm() {
      return this.$refs.form;
    },
    getData () {
      return {form: this.form, list: this.fileList}
    },
    // 下载
    toDownload (row) {
    },
    // 删除
    delFile (row,index) {
      if (row.fileId) {
        //发送请求
      }else {
        this.$delete(this.fileList, index);
      }
    },
    isTableEdit () {
      let key = true;
      if (this.$refs.fileTable && this.$refs.fileTable.getActiveRecord()) {
        key = false;
      }
      if (!key) {
        this.$log.alert('请保存当前正在编辑的数据')
      }
      return key;
    },
    // 新增
    toAddFile () {
      if (!this.isTableEdit()) {return;}
      const row =  {
        fileName: '',
        remark: '',
        fileId: ''
      }
      this.fileList.push(row);
      this.$refs.fileTable.setActiveRow(row);
      this.currentEditIndex = this.fileList.length - 1;
    },
    // 保存
    toSave (row,index) {
      if (!row.fileName) {
        this.$messageBox({
          type: 'warning',
          content: '请上传附件',
          title: '提示',
          showConfirmButton: true,
          center: true
        })
        return;
      }
      this.$set(this.fileList,index,Object.assign({},row));
      this.$refs.fileTable.clearActived();
      this.$message.success('保存成功')
    },
    // 取消
    toCancel (row,index) {
      if (Object.keys(this.currentEditRow).length > 0) {
        this.$set(this.fileList,index,{...this.currentEditRow});
        this.$refs.fileTable.clearActived();
        this.currentEditRow = {};
      }else {
        this.$delete(this.fileList, index);
        this.$refs.fileTable.clearActived();
      }
    },
    // 编辑
    toEditFile (row) {
      if (!this.isTableEdit()) {return;}
      this.currentEditRow = {...row};
      this.$refs.fileTable.setActiveRow(row);
    },
    handleFileChange(file) {
      let currentFile = this.fileList[this.currentEditIndex];
      currentFile.fileName = file.name;
      currentFile.file = file;
      this.$set(this.fileList, this.currentEditIndex, currentFile);
    },
    handleFileUpload () {}
  }
}
</script>
