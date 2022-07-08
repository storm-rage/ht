<template>
  <div class="FdOpenAndReceipt-OrderAudit_pending">
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="交易流水号：">
            <el-input v-model="searchForm.serialNo" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item  label="交易日期：" class="col-center">
            <zj-date-range-picker
              :startDate.sync="searchForm.tranDateStart"
              :startPlaceholder="''"
              :endDate.sync="searchForm.tranDateEnd"
              :endPlaceholder="''"
            />
          </el-form-item>
          <!--<el-form-item label="交易金额：">
            <el-input v-model="searchForm.tranAmt"/>
          </el-form-item>-->
          <el-form-item  label="接口状态：" class="col-right">
            <el-select v-model="searchForm.tranStatus"
                       :popper-append-to-body="false"
            >
              <el-option
                v-for="(item, index) in dictionary.tranStatus"
                :key="index"
                :value="item.code"
                :label="item.desc"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$i18n.messages[$i18n.locale].lang.financingName+'编号：'">
            <el-input v-model="searchForm.ebillCode" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item  label="开单企业：" class="col-center">
            <el-input v-model="searchForm.writerNameLike" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item  label="接口名称：" class="col-right">
            <el-select v-model="searchForm.tranType"
                       :popper-append-to-body="false"
            >
              <el-option
                v-for="(item, index) in dictionary.tranType"
                :key="index"
                :value="item.code"
                :label="item.desc"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item  :label="$store.getters['project/productName']+'企业：'">
            <el-input v-model="searchForm.financingEntNameLike" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item  label="资金方企业：" class="col-center">
            <el-input v-model="searchForm.fundingEntNameLike" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item  label="所属项目：" class="col-right">
            <el-select v-model="searchForm.projectId"
                       :popper-append-to-body="false"
                       clearable
            >
              <el-option
                v-for="(item, index) in dictionary.projectList"
                :key="index"
                :value="item.code"
                :label="item.desc"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <zj-table ref="searchTable" :api="$api.exceptionHandle.queryBankFinancing" :params="searchForm">
        <zj-table-column field="tranType" title="接口名称" :formatter="(obj) => typeMap(dictionary.tranType, obj.cellValue)"/>
        <zj-table-column field="projectName" title="所属项目"/>
        <zj-table-column field="serialNo" title="交易流水号" align=""/>
        <zj-table-column field="ebillCode" :title="$i18n.messages[$i18n.locale].lang.financingName+'编号'" align=""/>
        <zj-table-column field="tranAmt" title="交易金额" :formatter="money" align="right"/>
        <zj-table-column field="tranDate" title="交易日期" :formatter="date" align="center"/>
        <zj-table-column field="writerName" title="开单企业"/>
        <zj-table-column field="fundingEntName" title="资金方企业"/>
        <zj-table-column align="center" field="sendDatetime" title="接口发送时间"/>
        <zj-table-column field="tranStatus" title="接口状态" :formatter="(obj) => typeMap(dictionary.tranStatus, obj.cellValue)"/>
        <zj-table-column field="remark" title="原因"/>
        <zj-table-column title="操作" fixed="right" width="220px" :show-overflow="false">
          <template v-slot="{row}">
            <zj-button type="text" @click="commitBankFinancing(row, '0')" v-if="row.channelNo !== 'CMB' && row.tranStatus === '3'">结果查询</zj-button>
            <!-- base -->
            <template v-else>
              <zj-button type="text" @click="commitBankFinancing(row, '1')" v-if="row.tranStatus === '0'">重新发送</zj-button>
              <zj-button type="text" @click="commitBankFinancing(row, '2')" v-if="row.channelNo !== 'CMB' && row.tranStatus === '0'">驳回至资料审核</zj-button>
              <zj-button type="text" @click="commitBankFinancing(row, '3')" v-if="row.tranStatus === '0'">作废</zj-button>
            </template>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
    <!-- 驳回 -->
    <zj-reject-dialog
      ref="rejectDialog"
      :beforeReject="precondition"
      @reject="reviewReject"
      :title="rejectTitle"
      :label="'原因'"
      message="请输入原因"
      :max="100"
    />

  </div>
</template>

<script>
  export default {
    name: "pending",
    data(){
      return{
        dragVisible: true,
        dictionary:{},

        searchForm:{
          serialNo: '',
          tranDateStart: '',
          tranDateEnd: '',
          tranType: '',
          ebillCode: '',
          writerNameLike: '',
          tranStatus: '',
          financingEntNameLike: '',
          fundingEntNameLike: '',
          projectId:''
        },
        rejectTitle: '',
        row: null,
        operateType: '',

      }
    },
    methods:{
      //获取字典
      getDics (){
        this.$api.exceptionHandle.getDics().then(res => {
          this.dictionary = res.data
        })
      },
      //前置条件
      precondition (boo = false){
        return true
      },
      //拒绝
      reviewReject (text){
        if (!text.trim() && (this.operateType==='2'||this.operateType==='3')) return
        this.$api.exceptionHandle.commitBankFinancing({
          id: this.row.id,
          operateType: this.operateType,
          remark: text
        }).then(res => {
          this.row = null
          if (this.$refs.rejectDialog) {
            this.$refs.rejectDialog.close()
          }


          this.$refs.searchTable.iRefresh(true)
          if (this.operateType === '1') {
            this.$messageBox({ type: 'success', content: '提交成功！' })
            return
          }
          this.$messageBox({ type: 'success', content: '操作成功！' })

        })
      },
      commitBankFinancing (obj, operateType) {
        this.operateType = operateType
        this.row = obj

        if (operateType === '2') { // 驳回
          this.rejectTitle = '驳回至资料审核'
          this.$refs.rejectDialog.open()
        } else if (operateType === '3') { // 作废
          this.rejectTitle = '作废'
          this.$refs.rejectDialog.open()
        } else {
          this.reviewReject('')
        }
      }
    },
    created() {
      this.getDics()
    },
  }
</script>

<style lang="less">
.fixedColumn {
  width: 250px!important;
}
.vxe-cell{
  min-height: 58px!important;
}
.vxe-body--column {
  height: 68px !important;
}
</style>
