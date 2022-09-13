<template>
  <div>
    <el-dialog title="融资申请" class="" width="80%"
               :visible.sync="show"
               :close-on-click-modal="false"
    >

      <zj-content-block class="zj-m-b-30">
        <zj-content-block class="zj-center">
          本次申请融资金额{{moneyNoSynbol(invoiceAmt)}}
        </zj-content-block>
        <zj-content-block>
          <el-row>融单关联发票信息</el-row>
          <zj-table ref="invoiceItemTable" class="zj-search-table"
                    :dataList="invoiceItemList"
                    @checkbox-change="checkChange"
                    @checkbox-all="checkChange"
          >
            <zj-table-column type="checkbox" width="40" fixed="left"/>
            <zj-table-column field="invoiceType" title="发票类型"/>
            <zj-table-column field="invoiceCode" title="发票代码"/>
            <zj-table-column field="invoiceNumber" title="发票号码"/>
            <zj-table-column field="totalAmtLowcase" title="发票金额（含税）" :formatter="money"/>
            <zj-table-column field="sellAmount" title="发票金额（不含税）" :formatter="money"/>
            <zj-table-column field="usedAmt" title="发票使用金额" :formatter="money"/>
            <zj-table-column field="financingUsedAmtTotal" title="融资已占用金额" :formatter="money"/>
            <zj-table-column field="financingUsedAmt" title="本次融资发票金额" :formatter="money"/>
            <zj-table-column field="invoiceDate" title="发票日期" :formatter="date"/>
            <zj-table-column field="fileName" title="发票附件"/>
          </zj-table>
        </zj-content-block>
        <zj-content-block>
          <el-row>本次申请融资发票信息</el-row>
          <zj-table ref="applyInvoiceTable" class="zj-search-table"
                    :dataList="applyInvoiceList"
                    keep-source
                    :edit-config="{trigger: 'manual', mode: 'row', icon:'-', autoClear: false,showStatus: true}"
                    :pager="false"
          >
            <zj-table-column field="invoiceType" title="发票类型"/>
            <zj-table-column field="invoiceCode" title="发票代码"/>
            <zj-table-column field="invoiceNumber" title="发票号码"/>
            <zj-table-column field="totalAmtLowcase" title="发票金额（含税）" :formatter="money"/>
            <zj-table-column field="sellAmount" title="发票金额（不含税）" :formatter="money"/>
            <zj-table-column field="usedAmt" title="发票使用金额" :formatter="money"/>
            <zj-table-column field="financingUsedAmtTotal" title="融资已占用金额" :formatter="money"/>
            <zj-table-column field="financingUsedAmt" title="本次融资发票金额" :edit-render="{name: '$input'}" :formatter="money"/>
            <zj-table-column field="invoiceDate" title="发票日期" :formatter="date"/>
            <zj-table-column field="fileName" title="发票附件"/>
            <zj-table-column title="操作" fixed="right" width="240">
              <template v-slot="{row,rowIndex}">
                <template v-if="$refs.applyInvoiceTable.isActiveByRow(row)">
                  <zj-button type="text" @click="saveInvoice(row,rowIndex)">保存</zj-button>
                  <zj-button type="text" @click="cancelInvoice(row,rowIndex)">取消</zj-button>
                </template>
                <template v-if="!$refs.applyInvoiceTable.isActiveByRow(row)">
                  <zj-button type="text" @click="modifyInvoice('applyInvoiceTable',row)">维护</zj-button>
                  <zj-button type="text" @click="previewFile(row)">查看</zj-button>
                  <zj-button type="text" @click="downloadFile(row)">下载</zj-button>
                  <zj-button type="text" @click="deleteInvoice(row,rowIndex)">删除</zj-button>
                </template>
              </template>
            </zj-table-column>

          </zj-table>
        </zj-content-block>
      </zj-content-block>
      <zj-content-footer>
        <zj-button type="primary" @click="submit">确认</zj-button>
      </zj-content-footer>
    </el-dialog>
    <!--   查看器 -->
    <zj-preview :visible.sync="viewShow" :fileUrl="viewUrl" :showFooter="false" :fileType="viewType" @close="viewShow = false" />
  </div>
</template>

<script>
import view from "@pubComponent/preview/view.js";
export default {
  name: "choiceInvoice",
  props: {
    invoiceItemList: Array,
  },
  mixins: [view],
  components: {},
  data() {
    return {
      show: false,
      form: {},
      invoiceAmt: 0,
      invoiceList: {},
      applyInvoiceList: [],
      oldRowInfo: {},
    }
  },

  methods: {
    open(invoiceList,invoiceAmt) {
      this.show = true
      this.invoiceList = invoiceList
      console.log(`obj=`+JSON.stringify(this.invoiceList))
    },
    checkChange() {
      let checkArr = this.$refs.invoiceItemTable.getCheckboxRecords()
      this.applyInvoiceList = checkArr
      console.log(`checkedInvoice===`+this.applyInvoiceList)
    },
    submit() {
      for(let item of this.applyInvoiceList) {
        if(!item.financingUsedAmt) {
          item.financingUsedAmt = '0.00'
        }
      }
      this.$emit('handleInvoiceList',this.applyInvoiceList)
      this.show = false
    },
    saveInvoice(row,rowIndex) {
      if(!row.financingUsedAmt) {return this.$message.error('请输入本次融资发票金额！')}
      let flag = (row.usedAmt - row.financingUsedAmtTotal) < row.financingUsedAmt
      if(flag) {
        return this.$message.error(`本次融资发票金额不能大于${row.usedAmt - row.financingUsedAmtTotal}!`)
      }
      this.applyInvoiceList[rowIndex] = row
      this.$message.success('发票保存成功！')
      this.$refs.applyInvoiceTable.clearActived()
    },
    cancelInvoice(row,rowIndex) {
      if(row.bankAccId){
        this.applyInvoiceList.splice(rowIndex,1,this.oldRowInfo)
      } else{
        this.applyInvoiceList.splice(rowIndex,1)
      }
      this.$refs.applyInvoiceTable.clearActived()
    },
    modifyInvoice(table,row) {
      if(!this.tableEditReport(["applyInvoiceTable"])){return}
      this.oldRowInfo = Object.assign({},row)
      this.$refs.applyInvoiceTable.setActiveRow(row)
    },
    downloadFile(row) {
      this.$api.baseCommon.downloadFile({
        fileId: row.fileId,
        fileName: row.fileName,
      })
    },
    deleteInvoice(row,rowIndex) {
      this.applyInvoiceList.splice(rowIndex,1)

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
