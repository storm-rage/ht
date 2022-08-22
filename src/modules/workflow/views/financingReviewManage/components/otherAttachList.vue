<template>
  <div>
    <zj-content-block>
      <zj-header title="其他附件"/>
      <el-row v-if="proType !== '0'">是否已完成中登查询？若无，点此前往
        <zj-button type="text" @click="toZdNet">中登网</zj-button>
      </el-row>

      <zj-table ref="attaTable" class="zj-search-table" :dataList="dataList" :pager="false"
                keep-source
                :edit-config="{trigger: 'manual', mode: 'row', icon:'-', autoClear: false, showStatus: true}"
      >
        <zj-table-column type="seq" title="序号" width="60"/>
        <zj-table-column filed="busType" title="附件类型" :edit-render="{name: '$select', options: dictionary.attachTypes}">
<!--          <template v-slot="{row}">-->
<!--            <el-select v-model="row.busType"-->
<!--                       placeholder="请选择"-->
<!--                       filterable-->
<!--                       class="sw-year-select"-->
<!--                       :popper-append-to-body="false"-->
<!--            >-->
<!--              <el-option-->
<!--                v-for="item in dictionary.attachTypes"-->
<!--                :label="item.desc"-->
<!--                :value="item.code"-->
<!--                :key="item.code"-->
<!--              />-->
<!--            </el-select>-->
<!--          </template>-->
        </zj-table-column>
        <zj-table-column field="remark" title="补充说明" :edit-render="{name: '$input'}">
          <template v-slot="{row}">
            {{row.remark}}
          </template>
        </zj-table-column>
        <zj-table-column title="操作" >
          <template v-slot="{row}">
            <template v-if="$refs.attaTable.isActiveByRow(row)">
              <zj-upload class="zj-inline" :httpRequest="handleFileUpload" :data="{ row }">
                <zj-button slot="trigger" type="text">上传</zj-button>
              </zj-upload>
              <zj-button type="text" @click="saveRow(row)">保存</zj-button>
              <zj-button type="text" @click="cancel(row)">取消</zj-button>
            </template>
            <template v-if="!$refs.attaTable.isActiveByRow(row)">
              <zj-button type="text" @click="attaDelete(row)" >删除</zj-button>
              <zj-button type="text" @click="attaDownLoad(row)">下载</zj-button>
            </template>
          </template>
        </zj-table-column>
      </zj-table>
      <el-row class="button-row zj-center" v-if="proType !== '0'">
        <zj-button type="primary" icon="el-icon-circle-plus-outline" @click="infoUpload">上传资料</zj-button>
      </el-row>
    </zj-content-block>
  </div>
</template>

<script>
export default {
  name: "otherAttachList",
  props: {
    dataList: Array,
    proType: String,
    zjControl: Object,
    dictionary: Object,
  },
  data() {
    return {
    }
  },
  mounted() {
    console.log(this.dictionary)
  },
  methods: {
    getDic() {
      this.zjControl.getAuditDirectory().then(res=>{
        let dic = {
          ...res.data,
          attachTypes:JSON.parse(
            JSON.stringify(res.data.attachTypes)
              .replace(/code/g,'status')
              .replace(/desc/g,'label')
          )
        }
        this.dictionary = Object.assign(dic,res.data)
        console.log(this.dictionary)
      })
    },
    toZdNet() {
      //this.$router.push({path: ''})
    },
    attaDownLoad(row) {
      this.$api.baseCommon.downloadFile({
        fileId: row.fileId,
        fileName: row.fileName,
      })
    },
    attaDelete(row) {
      let params = {
        bizId : row.bizId,
        fileId : row.fileId,
        fileName : row.fileName,
        busType : row.busType,
        remark : row.remark,
        id : row.id,
        operateFlag : '',
      }
      this.zjControl.maintainAttach(params).then(res => {
        //刷新当前贸易关系下的合同附件列表

        // this.$emit('update',params)
        this.$message.success('保存成功！')
        this.$refs.attaTable.clearActived()
      })

    },
    //上传资料
    infoUpload() {
      if(!this.tableEditReport(["attaTable"])){return}
      let item = {busType:'', fileId:'', fileName:'', id:'', remark:'',}
      this.dataList.push(item)
      this.$refs.attaTable.setActiveRow(item)
    },
    //上传附件
    handleFileUpload({file,data}){
      let formData = new FormData()
      formData.append('file',file)
      this.zjControl.uploadFile(formData).then(res => {
        data.row.fileId = res.data.fileId
        data.row.remark = res.data.remark
        this.$message.success('附件上传成功!')
      })
    },
    saveRow(row) {
      if(!row.busType){ return this.$messageBox({type:'info',content:'请选择附件类型!'}) }
      if(!row.remark){ return this.$messageBox({type:'info',content:'请输入附件说明!'}) }
      //合同附件信息
      let params = {
        bizId : '',
        fileId : row.fileId,
        fileName : row.fileName,
        busType : row.busType,
        remark : row.remark,
        id : '',
        operateFlag : '',
      }
      this.zjControl.maintainAttach(params).then(res => {
        //刷新当前贸易关系下的合同附件列表
        //   let params = {
        //
        //   }
          // this.$emit('update',params)
          this.$message.success('保存成功！')
          this.$refs.attaTable.clearActived()
      })
    },
    cancel(row) {
      this.dataList.splice(row.index,1)
      this.$refs.attaTable.clearActived()
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
    this.getDic()
  }
}
</script>

<style scoped>

</style>
