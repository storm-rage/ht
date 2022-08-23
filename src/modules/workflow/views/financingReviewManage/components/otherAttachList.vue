<template>
  <div>
    <zj-content-block>
      <zj-header title="其他附件"/>
      <el-row v-if="opeType">是否已完成中登查询？若无，点此前往
        <zj-button type="text" @click="toZdNet">中登网</zj-button>
      </el-row>
      <zj-table ref="otherAttachTable" class="zj-search-table"
                :dataList="dataList" :pager="false"
                keep-source
                :edit-config="{trigger: 'manual', mode: 'row', icon:'-', autoClear: false, showStatus: true}"
      >
        <zj-table-column type="seq" title="序号" width="60"/>
        <zj-table-column field="busType" title="附件类型"
                         :edit-render="{
                            name: '$select',
                            options: dictionary.attachTypesTable,
                            optionProps: { value: 'status', label: 'label', key: 'status' }
                         }"
        >
        </zj-table-column>
        <zj-table-column field="remark" title="补充说明" :edit-render="{name: '$input'}"/>
        <zj-table-column field="fileName" title="附件名称"/>
        <zj-table-column title="操作" >
          <template v-slot="{row,rowIndex}">
            <template v-if="$refs.otherAttachTable.isActiveByRow(row)">
              <zj-upload class="zj-inline" :httpRequest="handleFileUpload" :data="{ row }">
                <zj-button slot="trigger" type="text">上传</zj-button>
              </zj-upload>
              <zj-button type="text" @click="saveRow(row,rowIndex)">保存</zj-button>
              <zj-button type="text" @click="cancel(row,rowIndex)">取消</zj-button>
            </template>
            <template v-else>
              <zj-button type="text" @click="attaDelete(row,rowIndex)" >删除</zj-button>
              <zj-button type="text" @click="attaDownLoad(row)">下载</zj-button>
            </template>
          </template>
        </zj-table-column>
      </zj-table>
      <el-row class="button-row zj-center zj-m-t-20" v-if="opeType">
        <zj-button type="primary" icon="el-icon-circle-plus-outline" @click="infoUpload">上传资料</zj-button>
      </el-row>
    </zj-content-block>
  </div>
</template>

<script>
import {OperateFlag} from '@modules/constant.js';
export default {
  name: "otherAttachList",
  props: {
    dataList: Array,
    proType: String,
    bizId: String,
    zjControl: Object,
    dictionary: Object,
    opeType: Boolean,
  },
  data() {
    return {
    }
  },
  watch: {
    bizId() {
      return {...this.bizId}
    }
  },
  methods: {
    toZdNet() {
      //this.$router.push({path: ''})
    },
    attaDownLoad(row) {
      this.$api.baseCommon.downloadFile({
        fileUrl: row.fileId,
        fileName: row.fileName,
      })
    },
    attaDelete(row,rowIndex) {
      let params = {
        bizId : this.bizId,
        fileId : row.fileId,
        fileName : row.fileName,
        busType : row.busType,
        remark : row.remark,
        id : row.id,
        operateFlag : OperateFlag.DEL,
      }
      this.zjControl.maintainAttach(params).then(res => {
        this.dataList.splice(rowIndex,1)
        this.$message.success('删除附件成功！')
        this.$refs.otherAttachTable.clearActived()
      })
    },
    //上传资料
    infoUpload() {
      if(!this.tableEditReport(["otherAttachTable"])){return}
      let item = {busType:'', fileId:'', fileName:'', id:'', remark:'',}
      this.dataList.push(item)
      this.$refs.otherAttachTable.setActiveRow(item)
    },
    //上传附件
    handleFileUpload({file,data}){
      let formData = new FormData()
      formData.append('file',file)
      this.$api.baseCommon.uploadFile(formData).then(res => {
        data.row.fileId = res.data.fileId
        data.row.fileName = res.data.fileName
        this.$message.success('附件上传成功!')
      })
    },
    saveRow(row,rowIndex) {
      if(!row.busType){ return this.$messageBox({type:'info',content:'请选择附件类型!'}) }
      if(!row.remark){ return this.$messageBox({type:'info',content:'请输入附件说明!'}) }
      if(!row.fileName){ return this.$messageBox({type:'info',content:'请上传附件!'}) }
      //合同附件信息
      let flag = row.fileId ? OperateFlag.UPDATE : OperateFlag.ADD
      let params = {
        bizId : this.bizId,
        fileId : row.fileId,
        fileName : row.fileName,
        busType : row.busType,
        remark : row.remark,
        id : row.id,
        operateFlag : flag,
      }
      this.zjControl.maintainAttach(params).then(res => {
        this.dataList.splice(rowIndex,1,res.data)
        row.save = true
        this.$message.success('保存成功！')
        this.$refs.otherAttachTable.clearActived()
      })
    },
    cancel(row,rowIndex) {
      if(!row.save) {
        this.dataList.splice(rowIndex,1)
      }
      this.$refs.otherAttachTable.clearActived()
    },
    //检测是否正在编辑     tableRefList需要检测的table数组
    tableEditReport(tableRefList){
      let key = true
      tableRefList.forEach(item => {
        if(this.$refs[item] && this.$refs[item].getActiveRecord()){
          key = false
        }
      })
      if(!key){
        this.$log.alert('请保存当前正在编辑的数据')
        return false
      }else{
        return true
      }
    },
  },
  created() {
  }
}
</script>

<style scoped>

</style>
