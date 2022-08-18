<template>
  <zj-content-block>
    <zj-list-layout>
      <template slot="rightBtns">
        <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch()">重置</vxe-button>
        <vxe-button class="search" icon="el-icon-search" @click="search()">查询</vxe-button>
      </template>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="申请流水号：">
            <el-input v-model="searchForm.serialNo" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="申请日期：">
            <zj-date-range-picker
              :startDate.sync="searchForm.receiveDatetimeBegin"
              :endDate.sync="searchForm.receiveDatetimeEnd"
            />
          </el-form-item>
          <el-form-item label="申请状态：">
            <el-select v-model="searchForm.applyStatus">
              <el-option label="全部" value=""/>
              <el-option
                v-for="item in dictionary.applyStatusList"
                :label="item.desc"
                :value="item.code"
                :key="item.code"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <zj-table ref="searchTable"
                :api="zjControl.getMyTradeRelationRecord"
                :params="{
                  ...searchForm,
                  busTradeId: row.busTradeId,
                  buyerId: row.buyerId,
                  buyerName: row.buyerName,
                }"
      >
        <zj-table-column type="seq" width="60" title="序号"/>
        <zj-table-column field="serialNo" title="申请流水号"/>
        <zj-table-column field="coreName" title="买方企业名称"/>
        <zj-table-column field="receiveDatetime" title="申请时间"/>
        <zj-table-column field="applyStatus" title="申请状态"/>
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{row}">
            <zj-button type="text" @click="toDetail(row)" :api="zjBtn.getTradeRelationRecordDetail">详情</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
    <zj-content-footer>
      <zj-button type="back" @click="goParent">返回</zj-button>
    </zj-content-footer>

  </zj-content-block>
</template>
<script>
// 维护记录
export default {
  name: 'maintainLog',
  watch: {
    searchForm: {
      handler (val) {
        console.log(val)
        return {...val}
      },
    }
  },
  data () {
    return {
      zjControl:{
        getPhasedAgreeDirectory:this.$api.agreementManage.getPhasedAgreeDirectory,//企业端-字典
        getMyTradeRelationRecord:this.$api.agreementManage.getMyTradeRelationRecord,//企业端-我的阶段性协议-贸易关系-维护记录列表查询
        getTradeRelationRecordDetail:this.$api.agreementManage.getTradeRelationRecordDetail,//企业端-我的阶段性协议-贸易关系-维护记录-详情
      },
      searchForm: {
        serialNo:'',
        receiveDatetimeBegin:'',
        receiveDatetimeEnd:'',
        applyStatus:'',
      },
      dictionary: {},
    };
  },
  methods: {
    toDetail(row) {
      this.goChild('frontPhasedMaintainLogDetail',row)
    },
    getPhasedAgreeDirectory() {
      this.zjControl.getPhasedAgreeDirectory().then(res=>{
        this.dictionary = Object.assign({},res.data)
      })
    },
  },
  created() {
    this.getApi()
    this.getRow()
    this.getPhasedAgreeDirectory()

  }
}
</script>
