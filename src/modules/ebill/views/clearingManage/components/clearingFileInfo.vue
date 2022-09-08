<template>
  <el-form :model="form" ref="form" label-width="100px">
    <zj-content-block>
      <zj-header title="附件信息"></zj-header>
      <zj-content>
        <zj-table ref="fileTable"
                  :dataList="fileList"
                  :pager="false"
                  keep-source
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
                <zj-upload class="zj-inline"
                           :httpRequest="handleFileUpload"
                           :beforeUpload="handleFileBeforeUpload">
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
            <el-form-item label="业务描述：" prop="busDesc">
              <el-input type="textarea" v-model="form.busDesc" :disabled="!isEdit"></el-input>
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
    busDesc:String,
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    attachList () {
      this.fileList = this.attachList;
    },
    busDesc () {
      this.form.busDesc = this.busDesc
    }
  },
  data () {
    return {
      zjControl: {
        downApi: this.$api.baseCommon.downloadFile,
        uploadApi: this.$api.baseCommon.uploadFile
      },
      form: {
        busDesc: ''
      },
      // 列表
      fileList: [],
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
    /**
     * 不包含删除列表的数据,到期清算
     * @returns {{list: [], busDesc: string}}
     */
    getNormalData() {
      return {busDesc: this.form.busDesc, list: this.fileList}
    },
    getData () {
      return {busDesc: this.form.busDesc, list: this.fileList.concat(this.delList)}
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
      row.operateFlag = OperateFlag.UPDATE
      this.$refs.fileTable.setActiveRow(row);
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
}
</script>
