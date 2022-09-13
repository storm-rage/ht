<template>
  <zj-content-block>
    <zj-header title="阶段性协议信息"></zj-header>
    <zj-content>

      <zj-list-layout>
        <!--   代办和已办结没有按钮和查询条件   -->
        <template v-if="rowData.maintainType&&rowData.maintainType=='1'" slot="rightBtns">
          <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch()">重置</vxe-button>
          <vxe-button class="search" icon="el-icon-search" @click="search(true,'searchTable')">查询</vxe-button>
        </template>
        <template v-if="rowData.maintainType&&rowData.maintainType=='1'" slot="searchForm">
          <el-form ref="searchForm" :model="searchForm">
            <el-form-item label="状态：">
              <el-select v-model="searchForm.agreementState">
                <el-option label="全部" value=""/>
                <el-option v-for="(item, index) in dictionary.agreementStateList" :key="index" :value="item.code" :label="item.desc"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="协议签订日期：">
              <zj-date-range-picker
                :startDate.sync="searchForm.agreementStartDateBegin"
                :endDate.sync="searchForm.agreementStartDateEnd"
              />
            </el-form-item>
            <el-form-item label="阶段性协议编码：">
              <el-input v-model="searchForm.agreementNo" @keyup.enter.native="enterSearch"/>
            </el-form-item>
            <el-form-item label="协议类型：">
              <el-select v-model="searchForm.agreementType">
                <el-option label="全部" value=""/>
                <el-option v-for="(item, index) in dictionary.agreementTypeList" :key="index" :value="item.code" :label="item.desc"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        <zj-table ref="searchTable" :params="searchForm" :api="rowData.maintainType&&rowData.maintainType=='1'?zjControl.queryBasePhasedAgreePage:''"  :dataList="tableData">
        <!-- <zj-table ref="searchTable" :dataList="tableData" > -->
          <zj-table-column field="agreementNo" title="SRM阶段性协议编号"/>
          <zj-table-column field="agreementNo" title="阶段性协议编号"/>
          <zj-table-column field="agreementName" title="阶段性协议名称"/>
          <zj-table-column field="agreementStartDate" title="协议签订日期" :formatter="date"/>
          <zj-table-column field="agreementEstimateEndDate" title="协议预计到期日" :formatter="date"/>
          <zj-table-column field="agreementType" title="协议类型"/>
          <zj-table-column field="agreementNumber" title="协议数量"/>
          <zj-table-column field="price" title="单价"/>
          <zj-table-column field="field2" title="计价单位"/>
          <zj-table-column field="agreementEstimatedPrice" title="协议预估总价" :formatter="money"/>
          <zj-table-column field="fileName" title="协议附件"/>
          <zj-table-column field="agreementStatus" title="状态"/>
          <zj-table-column field="isAgreementOnline" title="数据来源"/>
          <zj-table-column field="field5" title="上次维护日期" :formatter="date"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{row}">
              <zj-button type="text" @click="attaDownload(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-list-layout>

    </zj-content>
    <add-or-edit ref="addOrEdit" :zjControl="zjControl"/>
  </zj-content-block>
</template>
<script>
import ZjButton from "@pubComponent/button/ZjButtons";
import addOrEdit from '../dialog/addOrEdit';

export default {
  props: {
    tableData: Array,
    zjControl: Object,
    rowData: {
      type: Object,
      default: ()=>{
        return {}
      }
    },
  },
  components: {ZjButton,addOrEdit},
  data () {
    return {
      searchForm:{
        buyerId: this.rowData.buyerId,
        sellerId: this.rowData.sellerId,
      },
      agreementList: [
        {}
      ],
      dictionary: {}
    };
  },
  created() {
    this.getBackPhasedAgreeDirectory()
  },
  methods: {
    afterResetSearch() {
      this.searchForm.buyerId = this.rowData.buyerId
      this.searchForm.sellerId = this.rowData.sellerId
    },
    addEditAgreement(row,flag){
      this.$refs.addOrEdit.show(row,flag)
    },
    attaDelete(row) {},
    attaDownload(row) {
      this.zjControl.downLoadFile({...row,fileUrl: row.fileId,fileId: row.fileId})
    },
    getBackPhasedAgreeDirectory() {
      this.zjControl.getBackPhasedAgreeDirectory && this.zjControl.getBackPhasedAgreeDirectory().then(res=>{
        this.dictionary = res.data
      })
    }
  }
}
</script>
