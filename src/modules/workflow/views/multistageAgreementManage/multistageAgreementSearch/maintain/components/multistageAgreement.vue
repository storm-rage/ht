<template>
  <zj-content-block>
    <zj-header title="阶段性协议信息"></zj-header>

    <zj-content>
      <!--   代办和已办结没有新增按钮   -->
      <el-row class="button-row">
        <zj-button type="primary" icon="el-icon-circle-plus-outline" @click="addEditAgreement({},'新增')" :api="zjControl.getAddDetail">新增</zj-button>
      </el-row>
      <zj-table ref="agreementTable"
                :dataList="tableData"
      >
        <zj-table-column type="checkbox" width="40px" fixed="left"></zj-table-column>
        <zj-table-column field="agreementNo" title="SRM阶段性协议编号"/>
        <zj-table-column field="agreementNo" title="阶段性协议编号"/>
        <zj-table-column field="agreementName" title="阶段性协议名称"/>
        <zj-table-column field="agreementType" title="协议类型"/>
        <zj-table-column field="agreementStartDate" title="协议签订日期" :formatter="date"/>
        <zj-table-column field="agreementEstimateEndDate" title="协议预计到期日" :formatter="date"/>
        <zj-table-column field="agreementNumber" title="协议数量"/>
        <zj-table-column field="price" title="单价"/>
        <zj-table-column field="agreementEstimatedPrice" title="协议预估总价" :formatter="money"/>
        <zj-table-column field="fileName" title="协议附件"/>
        <zj-table-column field="isStartExecute" title="是否已开始执行"/>
        <zj-table-column field="executeNumber" title="已开始执行数量"/>
        <zj-table-column field="agreementStatus" title="状态"/>
        <zj-table-column field="isAgreementOnline" title="数据来源"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="addEditAgreement(row,'维护')" :api="zjControl.savePhasedAgree">维护</zj-button>
            <zj-button type="text" @click="attaDelete(row)" :api="zjControl.deletePhasedAgree">删除</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-content>
    <add-or-edit ref="addOrEdit" :zjControl="zjControl"/>
  </zj-content-block>
</template>
<script>
// 操作记录
import ZjButton from "@pubComponent/button/ZjButtons";
import addOrEdit from '../dialog/addOrEdit';

export default {
  props: {
    tableData: Array,
    dictionary: Object,
    zjControl: Object,
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
      this.$refs.addOrEdit.show(row,flag)
    },
    //删除协议附件
    attaDelete(row) {
      let params = {
        phasedId: row.phasedId,
      }
      this.zjControl.deletePhasedAgree(params).then(res => {
        this.$message.success(res.data.msg)
        console.log(row.fileId)
      })
    },

  },
  created() {
    this.getRow()
  }
}
</script>
