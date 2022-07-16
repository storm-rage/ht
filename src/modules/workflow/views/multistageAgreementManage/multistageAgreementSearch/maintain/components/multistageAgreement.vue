<template>
  <zj-content-block>
    <zj-header title="阶段性协议信息"></zj-header>

    <zj-content>
      <el-row class="button-row">
        <zj-button type="primary" icon="el-icon-circle-plus-outline" @click="addEditAgreement('','新增')">新增</zj-button>
      </el-row>
      <zj-table ref="logTable" :dataList="agreementList">
        <zj-table-column type="checkbox" width="40px" fixed="left"></zj-table-column>
        <zj-table-column field="field1" title="阶段性协议编号"/>
        <zj-table-column field="field2" title="阶段性协议名称"/>
        <zj-table-column field="field2" title="协议类型"/>
        <zj-table-column field="field2" title="协议签订日期" :formatter="date"/>
        <zj-table-column field="field2" title="协议预计到期日" :formatter="date"/>
        <zj-table-column field="field2" title="协议数量"/>
        <zj-table-column field="field2" title="单价"/>
        <zj-table-column field="field2" title="协议预估总价" :formatter="money"/>
        <zj-table-column field="field2" title="协议附件"/>
        <zj-table-column field="field2" title="是否已开始执行"/>
        <zj-table-column field="field2" title="已开始执行数量"/>
        <zj-table-column field="field2" title="状态"/>
        <zj-table-column field="field5" title="数据来源"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="addEditAgreement(row,'维护')">维护</zj-button>
            <zj-button type="text" @click="attaDelete(row)">删除</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-content>
    <add-or-edit ref="addOrEdit"/>
  </zj-content-block>
</template>
<script>
// 操作记录
import ZjButton from "@pubComponent/button/ZjButtons";
import addOrEdit from '../dialog/addOrEdit';

export default {
  components: {ZjButton,addOrEdit},
  data () {
    return {
      agreementList: [
        {}
      ],
    };
  },
  methods: {
    addEditAgreement(row,flag){
      this.$refs.addOrEdit.show(row,flag)
    },
    attaDelete(row) {},

  }
}
</script>
