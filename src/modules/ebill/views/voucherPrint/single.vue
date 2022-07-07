<template>
<div id="voucherPrint-single">
  <div class="zj-search-condition">
    <el-row class="checkbox-row">
      <zj-checkbox :list="dictionary.voucherTypeCheckList" :value.sync="checkList" @handleCheckedChange="handleCheckedChange"/>
    </el-row>
    <el-row class="button-row">
      <vxebutton class="export" icon="iconfont icon-dayin" :title="!printFlag ?'请选择需要打印的凭证' : ''" @click="printVoucher" :api="zjBtn.voucherPrint">打印</vxebutton>
      <vxebutton class="reset" icon="el-icon-refresh" @click="resetSearch">重置</vxebutton>
      <vxebutton class="search" icon="el-icon-search" @click="search">查询</vxebutton>
    </el-row>
    <el-form ref="searchForm" :model="searchForm">
      <el-form-item label="凭证生成日期：">
        <zj-date-range-picker :startDate.sync="searchForm.createDatetimeStart" :endDate.sync="searchForm.createDatetimeEnd"/>
      </el-form-item>
      <el-form-item label="凭证号：" class="col-center">
        <el-input v-model="searchForm.voucherNo" @keyup.enter.native="enterSearch"/>
      </el-form-item>
      <el-form-item :label="$i18n.messages[$i18n.locale].lang.financingName+'编号：'" class="col-right">
        <el-input v-model="searchForm.bizNoLike" @keyup.enter.native="enterSearch"/>
      </el-form-item>
      <el-form-item label="开单企业：">
        <el-input v-model="searchForm.writerNameLike" @keyup.enter.native="enterSearch"/>
      </el-form-item>
      <el-form-item label="原始持单企业：" class="col-center">
        <el-input v-model="searchForm.receiptEntNameLike" @keyup.enter.native="enterSearch"/>
      </el-form-item>
      <el-form-item label="转让企业：" class="col-right">
        <el-input v-model="searchForm.transferNameLike" @keyup.enter.native="enterSearch"/>
      </el-form-item>
    </el-form>
  </div>
  <div class="zj-search-response">
    <zj-table ref="searchTable"
              :api="zjControl.tableApi" :params="searchForm"
              v-if="tableFlag" @dataChange="tableDataChange"
              @checkbox-change="tableCheckChange" @checkbox-all="tableCheckChange"
    >
      <zj-table-column fixed="left" type="checkbox" width="30"/>
      <zj-table-column field="voucherNo" title="凭证号"/>
      <zj-table-column field="voucherType" title="凭证类型" :formatter="(obj) => typeMap(dictionary.voucherType,obj.cellValue)"/>
      <zj-table-column field="bizNo" :title="$i18n.messages[$i18n.locale].lang.financingName+'编号'" width="230"/>
      <zj-table-column field="payEntName" title="开单企业"/>
      <zj-table-column field="createEntName" title="业务方"/>
      <zj-table-column field="transferName" title="转让企业"/>
      <zj-table-column field="receiptEntName" title="持单企业"/>
      <zj-table-column field="createDatetime" title="凭证生成日期" :formatter="date"/>
      <zj-table-column field="printNum" title="打印次数" />
      <zj-table-column  title="操作" fixed="right" v-if="zjBtn.voucherPrint">
        <template v-slot="{row}">
          <zj-button type="text" @click="printVoucher(row)">打印预览</zj-button>
        </template>
      </zj-table-column>
    </zj-table>
  </div>
</div>
</template>

<script>
    import voucher from "@utils/voucher";
    import getLodop from "@utils/print";
    import { uuid } from '@utils'
    export default {
        name: "single",
        data(){
          return {
            zjControl:{
              getDictionary:this.$api.singlePrint.getDictionary,//字典
              tableApi:this.$api.singlePrint.tableApi,//表格
              voucherPrint:this.$api.singlePrint.voucherPrint,//打印
              printNum:this.$api.singlePrint.printNum,//次数
            },
            searchForm:{
              voucherTypes:[],
              createDatetimeStart:'',
              createDatetimeEnd:'',
              voucherNo:'',
              bizNoLike:'',
              writerNameLike:'',
              receiptEntNameLike:'',
              transferNameLike:''
            },
            dictionary:{},
            tableFlag:false,
            btnFlag:false,
            checkList:[],//凭证类型
            //打印
            printFlag:false,
            printData:[],
            printStatus:-1
          }
        },
        created() {
          this.getApi()
          this.getDictionary()
        },
        methods:{
            beforeSearch(){
              this.printFlag = false
              this.printData = []
              // this.checkList = []
              this.btnFlag = false
            },
            beforeResetSearch(){
              this.printFlag = false
              this.printData = []
              this.checkList = []
              this.btnFlag = false
            },
            afterResetSearch(){
              this.searchForm.voucherTypes = []
              this.dictionary.voucherType.map(item => {
                this.searchForm.voucherTypes.push(item.code)
              })
            },
            //表格
            tableCheckChange({records}){
              this.printFlag = records.length > 0
            },
            tableDataChange(data){
              this.btnFlag = data && data.rows && data.rows.length
            },
            //字典
            getDictionary(){
              this.zjControl.getDictionary().then(res => {
                const productName = this.$store.getters['project/productName'];
                res.data.voucherType = JSON.parse(
                  JSON.stringify(res.data.voucherType).replace(new RegExp("融单","g"), productName)
                )
                res.data.voucherTypeCheckList = JSON.parse(
                  JSON.stringify(res.data.voucherType).replace(/code/g,'key').replace(/desc/g,'label')
                )
                this.dictionary = res.data
                //初始查询
                this.searchForm.voucherTypes = []
                res.data.voucherType.map(item => {
                  this.searchForm.voucherTypes.push(item.code)
                })
                this.tableFlag = true
              })
            },
            //类型变化
            handleCheckedChange(data){
              this.searchForm.voucherTypes = data.array
            },
            //打印或预览
            async printVoucher(row){
              this.printStatus = -1
              let that = this
              let params = {
                ids:[]
              }
              if(row){
                params.ids = [row.id]
              }
              //打印
              else {
                params.ids = this.$refs.searchTable.getCheckboxRecords().map(item => item.id)
                if(!params.ids.length){
                  return this.$messageBox({
                    type: 'info',
                    content: '请选择需要进行打印的凭证！',
                    title: '提示',
                    showConfirmButton: true,
                    center: true
                  });
                }
              }
              let res = await this.zjControl.voucherPrint(params).catch(() => {})
              res.data.voucherModels.map(item => {
                item.id = uuid()
              })
              this.printData = res.data.voucherModels
              //lodop
              let LODOP = getLodop();
              this.printData.map((item,index) => {
                // console.error(item)
                let pageContent = document.createElement('DIV')
                pageContent.id = item.id
                pageContent.className = 'printNode'
                pageContent.innerHTML = voucher(item,'voucherType',that)
                // document.body.appendChild(pageContent)
                if (LODOP != null && typeof LODOP.VERSION != "undefined"){
                  document.body.appendChild(pageContent)
                }
                /*
                   ADD_PRINT_HTML
                  名称：增加超文本打印项(图形模式)
                  格式：ADD_PRINT_HTML(Top,Left,Width,Height, strHtmlContent)
                  功能：增加超文本打印项，设定该打印项在纸张内的位置和区域大小，实现超文本控制打印。
                */
                if (index === 0) {
                  LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_分页输出一");
                  LODOP.ADD_PRINT_HTM(4, 4, 750, 1000,pageContent.innerHTML);
                  if (index < this.printData.length-1) {
                    LODOP.NewPage();
                  } else {
                    LODOP.PREVIEW();
                  }
                } else if (index > 0 && index < this.printData.length-1) {
                  LODOP.ADD_PRINT_HTM(4, 4, 750, 1000,pageContent.innerHTML);
                  LODOP.NewPage();
                } else if (index > 0 && index === this.printData.length-1) {
                  LODOP.ADD_PRINT_HTM(4, 4, 750, 1000,pageContent.innerHTML);
                  LODOP.PREVIEW();
                }
              })
              if (LODOP != null && typeof LODOP.VERSION != "undefined") {
                let loading = this.$loading({
                  lock: true,
                  text: '正在打印中请勿操作页面！',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                })

                LODOP.On_Return=function(TaskID, sValue){
                  that.printStatus = sValue;
                  setTimeout(function () {
                    loading.close()
                    let printNodes = document.getElementsByClassName('printNode')
                    if (printNodes.length === 1) {
                      document.body.removeChild(printNodes[0])
                    }
                    for (let k = printNodes.length-1; k > 0; k--) {
                      document.body.removeChild(printNodes[k])
                    }
                  }, 200);
                  if(that.printStatus !== -1){
                    if(that.printStatus > 0 ){
                      //增加次数
                      that.zjControl.printNum(params).then(()=>{
                        that.search(false)
                      })
                    }
                  }
                }

              }
            }
          }
    }
</script>

<style lang="less">
#voucherPrint-single{

}
</style>
