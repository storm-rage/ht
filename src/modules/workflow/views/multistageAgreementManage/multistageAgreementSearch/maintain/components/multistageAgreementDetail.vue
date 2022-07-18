<template>
  <zj-content-block>
    <zj-header title="阶段性协议信息"></zj-header>
    <zj-content>

      <zj-list-layout>
        <tempalte slot="searchForm">
          <el-form ref="searchForm" :model="searchForm">
            <el-form-item label="状态：">
              <el-select v-model="searchForm.state">
                <el-option label="全部"/>
              </el-select>
            </el-form-item>
            <el-form-item label="协议签订日期：">
              <zj-date-range-picker
                :startDate.sync="searchForm.lastTimeDateStart"
                :endDate.sync="searchForm.lastTimeDateEnd"
              />
            </el-form-item>
            <el-form-item label="阶段性协议编码：">
              <el-input v-model="searchForm.supplierCode" @keyup.enter.native="enterSearch"/>
            </el-form-item>
            <el-form-item label="协议类型：">
              <el-select v-model="searchForm.type">
                <el-option label="全部"/>
              </el-select>
            </el-form-item>
          </el-form>
        </tempalte>
        <zj-table ref="logTable" :dataList="agreementList">
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
          <zj-table-column field="field5" title="上次维护日期" :formatter="date"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{row}">
              <zj-button type="text" @click="attaDownload(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-list-layout>

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
      searchForm:{},
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
    attaDownload(row) {},

  }
}
</script>
