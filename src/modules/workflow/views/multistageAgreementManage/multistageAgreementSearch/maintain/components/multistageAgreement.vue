<template>
  <zj-content-block>
    <zj-header title="阶段性协议信息"/>

    <zj-content>
      <!--   代办和已办结没有新增按钮   -->
      <el-row class="button-row" style="margin-bottom: 10px;" >
        <zj-button type="primary" icon="el-icon-circle-plus-outline" @click="addEditAgreement('','新增')" :api="zjControl.getAddDetail">新增</zj-button>
      </el-row>
      <zj-table ref="agreementTable"
                :dataList="tableData.phasedAgreementList"
      >
        <!-- <zj-table-column type="checkbox" width="40px" fixed="left"/> -->
        <zj-table-column field="srmAgreementNo" title="SRM阶段性协议编号"/>
        <zj-table-column field="agreementNo" title="阶段性协议编号"/>
        <zj-table-column field="agreementName" title="阶段性协议名称"/>
        <zj-table-column field="agreementType" title="协议类型" :formatter="obj=>typeMap(dictionary.agreementTypeList,obj.cellValue)"/>
        <zj-table-column field="agreementStartDate" title="协议签订日期" :formatter="date"/>
        <zj-table-column field="agreementEstimateEndDate" title="协议预计到期日" :formatter="date"/>
        <zj-table-column field="agreementNumber" title="协议数量"/>
        <zj-table-column field="unit" title="单位"/>
        <zj-table-column field="price" title="单价"/>
        <zj-table-column field="priceUnits" title="计价单位"/>
        <zj-table-column field="agreementEstimatedPrice" title="协议预估总价" :formatter="money"/>
        <zj-table-column field="fileName" title="协议附件"/>
        <zj-table-column field="agreementStatus" title="状态" :formatter="obj=>typeMap(dictionary.agreementStateList,obj.cellValue)"/>
        <zj-table-column field="isAgreementOnline" title="数据来源" :formatter="obj=>typeMap(dictionary.onlineList,obj.cellValue)"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="addEditAgreement(row,'维护')" :api="zjControl.savePhasedAgree">维护</zj-button>
            <zj-button type="text" @click="attaDelete(row)" :api="zjControl.deletePhasedAgree" v-if="row.isAgreementOnline !== '0'">删除</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-content>
    <add-or-edit ref="addOrEdit" :rowData="rowData" v-bind="$attrs" :zjControl="zjControl" :dictionary="dictionary" @agreementUpdate="agreementUpdate"/>
  </zj-content-block>
</template>
<script>
// 操作记录
import ZjButton from "@pubComponent/button/ZjButtons";
import addOrEdit from '../dialog/addOrEdit';

export default {
  props: {
    tableData: Object,
    dictionary: Object,
    zjControl: Object,
    rowData: Object,
  },
  components: {
    ZjButton,
    addOrEdit
  },
  data () {
    return {

    };
  },
  methods: {
    addEditAgreement(row,flag){
      this.$refs.addOrEdit.show(row, flag, this.tableData.tradeRelationModelList)
    },
    agreementUpdate(val) {
      // this.tableData.phasedAgreementList.splice(0,1,val)
      this.$emit('handleAgreementList', val)
    },
    //删除协议附件
    attaDelete(row) {
      let params = {
        phasedId: row.phasedId,
      }
      let requestUrl = this.rowData.maintainType=='1'?this.zjControl.deletePhasedAgree:this.zjControl.deleteWaitPhasedAgree
      this.$messageBox({
          type:'info',
          title:'温馨提示',
          content:`是否确认删除？`,
          showCancelButton: true,
          messageResolve:()=>{
            requestUrl(params).then(res=>{
              this.$emit('handleAgreementList',this.tableData)
              this.$message.success(res.data.msg)
              console.log(row.fileId)
            })
          }
        })
    },

  },
  created() {
    this.getRow()
  }
}
</script>
