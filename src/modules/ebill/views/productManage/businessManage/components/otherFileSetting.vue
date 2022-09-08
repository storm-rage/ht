<template>
  <el-form :model="form" ref="form">
    <zj-content-block>
      <zj-header title="其他附件"></zj-header>
      <zj-content>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注：" label-width="100px" prop="remark">
              <el-input :disabled="!isEdit" v-model.trim="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <zj-table ref="fileTable"
                  :dataList="fileList"
                  :pager="false"
                  keep-source
                  :edit-config="{trigger: 'manual',mode: 'row',icon: '-',autoClear: false,showStatus: true}">
          <zj-table-column type="seq" title="序号" width="60"/>
          <zj-table-column
            field="fileName"
            title="附件"/>
          <zj-table-column
            field="remark"
            title="附件说明" :edit-render="{name: '$input',props: {maxlength: 200}}"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row, rowIndex }">
              <template v-if="$refs.fileTable.isActiveByRow(row)">
                <zj-upload class="zj-inline" :beforeUpload="handleFileBeforeUpload" :httpRequest="handleFileUpload">
                  <zj-button slot="trigger" type="text">上传</zj-button>
                </zj-upload>
                <zj-button type="text" @click="toSave(row,rowIndex)">保存</zj-button>
                <zj-button type="text" style="margin-left: 0px" @click="toCancel(row,rowIndex)">取消</zj-button>
              </template>
              <template v-else>
                <zj-button v-if="row.fileId" type="text" @click="toDownload(row)">下载</zj-button>
                <zj-button v-if="isEdit" type="text" @click="delFile(row,rowIndex)">删除</zj-button>
              </template>
            </template>
          </zj-table-column>
        </zj-table>

        <div class="zj-m-t-20 zj-center">
          <el-button style="width: 100px" size="small" type="primary" v-if="isEdit" @click="toAddFile">新增</el-button>
        </div>
      </zj-content>
    </zj-content-block>
  </el-form>

</template>
<script>
import {OperateFlag} from '@modules/constant.js';
export default {
  props: {
    // 附件列表
    attachList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    remark:String,
    // 是否可以编辑表单
    isEdit: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    attachList () {
      this.fileList = this.attachList;
    },
    remark () {
      this.form.remark = this.remark
    }
  },
  created() {
    this.fileList = this.attachList;
    this.form.remark = this.remark
  },
  data() {
    return {
      zjControl: {
        downApi: this.$api.baseCommon.downloadFile,
        uploadApi: this.$api.baseCommon.uploadFile
      },
      // 表单
      form: {
        remark: ''
      },
      // 列表
      fileList: this.attachList,
      // 当前编辑行
      currentEditRow: {},
      // 当前编辑index
      currentEditIndex: 0,
      // 删除列表
      delList: []
    }
  },
  methods: {
    getForm() {
      return this.$refs.form;
    },
    getData () {
      return {remark: this.form.remark, list:  this.fileList.concat(this.delList)}
    },
    // 下载
    toDownload (row) {
      this.zjControl.downApi(row);
    },
    // 删除
    delFile (row,index) {
      if (row.id) {
        row.operateFlag = OperateFlag.DEL;
        this.delList.push({...row});
        this.$delete(this.fileList, index);
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
        fileId: '',
        operateFlag: OperateFlag.ADD,
        id: ''
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
      this.$delete(this.fileList, index);
      this.$refs.fileTable.clearActived();
    },
    /**
     * todo:无用
     * @param file
     */
    handleFileChange(file) {
      let currentFile = this.fileList[this.currentEditIndex];
      currentFile.fileName = file.name;
      currentFile.file = file;
      this.$set(this.fileList, this.currentEditIndex, currentFile);
    },
    /**
     * 处理文件上传前：
     * 支持pdf、图片、压缩包、word和excel
     * @param file
     */
    handleFileBeforeUpload(file) {
      const fileName = file.name;
      if (fileName) {
        const names = fileName.split('.');
        const fileType = names[1].toLowerCase();
        const supportFileTypes = ['pdf','bmp','gif','jpg','jpeg','png','zip','rar','doc','docx','xlsx','xls'];
        if (!supportFileTypes.includes(fileType)) {
          this.$messageBox({
            type: 'warning',
            content: '上传文件格式有误！只支持上传BMP格式、GIF格式、JPEG格式、PNG格式、ZIP格式、RAR格式、PDF格式、DOC格式、DOCX格式、XLSX格式以及XLS格式！',
            title: '提示',
            showConfirmButton: true,
            center: true
          })
          return false;
        }else {
          return true
        }
      }
      return true;
    },
    /**
     * 上传文件
     * @param file
     */
    handleFileUpload ({file}) {
      let formData = new FormData()
      formData.append('file',file)
      this.zjControl.uploadApi(formData).then(res => {
        let currentFile = this.fileList[this.currentEditIndex];
        const {fileId, fileName} = res.data;
        currentFile.fileName = fileName;
        currentFile.fileId = fileId
        this.$set(this.fileList, this.currentEditIndex, currentFile);
        this.$message.success('附件上传成功!')
      })
    }
  }
};
</script>
