<template>
  <div>
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="买方企业名称：" class="col-right">
            <el-input v-model="searchForm.buyerEntName" @keyup.enter.native="enterSearch" />
          </el-form-item>
          <el-form-item label="卖方企业名称：" class="col-right">
            <el-input v-model="searchForm.sellerEntName" @keyup.enter.native="enterSearch" />
          </el-form-item>
          <el-form-item label="申请状态：" class="col-center">
            <el-select v-model="searchForm.applyStatus" placeholder="请选择" clearable :popper-append-to-body="false">
              <el-option value="" label="全部"></el-option>
              <el-option v-for="item in dictionary.applyStatus" :key="item.code" :label="item.desc" :value="item.code">
              </el-option>
              <!-- <el-option
              v-for="item in dictionary.isGenerateVouchers"
              :key="item.code"
              :label="item.desc"
              :value="item.code"
              applyState
            >
            </el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="申请流水号：" class="col-right">
            <el-input v-model="searchForm.serialNo" @keyup.enter.native="enterSearch" />
          </el-form-item>
        </el-form>
      </template>
      
      <zj-table ref="searchTable" :params="searchForm" :api="zjControl.recordPage">
        <zj-table-column field="serialNo" title="申请流水号" />
        <zj-table-column field="buyerEntName" title="买方企业名称" />
        <zj-table-column field="sellerEntName" title="卖方企业名称" />
        <zj-table-column field="bankAccount" title="卖方银行账号" />
        <zj-table-column field="bankAccname" title="卖方企业银行账户户名" />
        <zj-table-column field="bankName" title="卖方企业开户行" />
        <zj-table-column field="bankNo" title="银行联行号" />
        <!-- <zj-table-column field="applyStatus" title="申请状态" /> -->
        <!-- <zj-table-column title="申请状态">
            <template v-slot="{ row }">
            <div class="errtop">
              <span>{{row.applyStatus}}</span>
              <div class="errortip" v-if="row.id==109">
              <p>拒绝时间:{{row.rejectDatetime}}</p>  
              <p>拒绝原因：{{row.rejectReason}}</p>  
              </div>
            </div>
              </template>
          </zj-table-column> -->
        <zj-table-column title="申请状态">
          <template v-slot="{ row }">
          {{row.applyStatus}}
          <br>
            <zj-popover trigger="hover" placement="top" v-show="applyStatus==Y001">
            <p>&nbsp;</p>
              <p>拒绝时间:{{date(row.rejectDatetime)}}</p> 
              <p>&nbsp;</p>
               <p>拒绝原因：{{row.rejectReason}}</p>
            </zj-popover>
          </template>
        </zj-table-column>
        <zj-table-column field="applyDatetime" title="申请时间" :formatter="date" />
      </zj-table>
    </zj-list-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zjControl: {
        recordPage: this.$api.tradeRelations.recordPage,//交易记录查询列表
        getDirectory: this.$api.tradeRelations.tradeRelationsGetDirectory, //字典
        // getDirectory: this.$api.tradeRelations.tradeRelationsGetDirectory, //字典
      },
      searchForm: {},
      dictionary: {},
    };
  },
  created() {
    this.getApi();
    this.getDirectory1();
  },
  methods: {
    toBillDetails(row) {
      console.log(row);
    },
    getDirectory1() {
      console.log(111)
      this.zjControl.getDirectory().then((res) => {
        this.dictionary = res.data;
      });
    },
  },
};
</script>
<style>
.errortip {
  position: absolute;
  width: 260px;
  height: 60px;
  border: 1px black solid;
  top: 15px;
  left: 0px;
  right: 300px;
  background-color: rgb(255, 255, 255);
  z-index: 1000;
  text-align: left;
}

.errortop {
  position: relative;
}
</style>
