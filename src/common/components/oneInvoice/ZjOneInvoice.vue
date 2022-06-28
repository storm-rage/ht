<template>
  <div>
      <el-dialog id="zj-one-invoice" title="发票信息" width="80%"
                 :visible.sync="show" center :close-on-click-modal="false" @close="close"
      >
        <el-collapse ref="elCollapse" class="zjcoll-noSelect" v-model="activeList">
          <el-collapse-item name="info" :disabled="true">
            <h4 slot="title" class="orderTitle">发票信息</h4>
            <zj-table class="zj-search-table" :dataList="detailData.pubInvoiceInfoList">
              <zj-table-column field="invoiceType" title="发票类型"/>
              <zj-table-column field="invoiceCode" title="发票代码"/>
              <zj-table-column field="invoiceNumber" title="发票号码"/>
              <zj-table-column field="totalAmtLowcase" title="发票金额(含税)" :formatter="money"/>
              <zj-table-column field="sellAmount" title="发票金额(不含税)" :formatter="money"/>
              <zj-table-column field="invoiceDate" title="发票日期" :formatter="date" />
              <zj-table-column field="seller" title="销售方"/>
              <zj-table-column field="buyer" title="购买方"/>
              <zj-table-column field="validateFlag" title="验真结果">
                <template v-slot="{row}">
                  <span :class="row.validateFlag === '2' ? 'red' : ''">
                    {{typeMap(dictionary.validateFlag,row.validateFlag)}}
                  </span>
                </template>
              </zj-table-column>
              <zj-table-column field="sysAuditState" title="系统审核结果">
                <template v-slot="{row}">
                  <span :class="row.sysAuditResult === '2' ? 'red' : ''">
<!--                    {{typeMap(dictionary.sysAuditResult,row.sysAuditResult)}}-->
                    {{row.sysAuditResult}}
                  </span>
                </template>
              </zj-table-column>
              <zj-table-column field="fileName" title="发票附件" width="80"/>
              <zj-table-column title="操作" fixed="right">
                <template v-slot="{row}">
                  <zj-button type="text" @click="previewFile(row)" v-if="row.fileId">查看</zj-button>
                  <zj-button type="text" @click="downs(row)" v-if="row.fileId">下载</zj-button>
                </template>
              </zj-table-column>
            </zj-table>
          </el-collapse-item>
          <el-collapse-item name="finan" :disabled="true">
            <h4 slot="title" class="orderTitle">发票关联的{{$store.getters['project/productName']}}信息</h4>
            <zj-table class="zj-search-table" :dataList="detailData.ebBillInfos" :class="detailData.ebBillInfos && detailData.ebBillInfos.length ? '' : 'tableNullCenter'">
              <zj-table-column field="ebillCode" :title="$i18n.messages[$i18n.locale].lang.financingName + '编号'" width="240"/>
              <zj-table-column field="writerName" title="开单企业"/>
              <zj-table-column field="transferName" title="转让企业" :formatter="filter"/>
              <zj-table-column field="ebillAmt" :title="$i18n.messages[$i18n.locale].lang.financingName + '金额'" :formatter="money"/>
              <zj-table-column field="usedAmt" title="发票使用金额" :formatter="money"/>
              <zj-table-column field="openDate" title="开单日期" :formatter="date"/>
              <zj-table-column field="expireDate" title="到期日期" :formatter="date"/>
              <el-row slot="pager-right" class="slotRows" v-if="detailData.ebBillInfos && detailData.ebBillInfos.length">
                发票使用金额合计：{{moneyNoSynbol(detailData.totalBillUsedAmt,'¥ ')}}
              </el-row>
            </zj-table>
          </el-collapse-item>
          <el-collapse-item name="finanInfo" :disabled="true">
            <h4 slot="title" class="orderTitle">发票关联的融资信息</h4>
            <zj-table class="zj-search-table" :dataList="detailData.ebBillFinancingInvoiceInfos">
              <zj-table-column field="serialNo" title="融资流水号"/>
              <zj-table-column field="ebillCode" width="230" :title="'融资'+$i18n.messages[$i18n.locale].lang.financingName+'编号'"/>
              <zj-table-column field="sourceCode" title="源单编号"/>
              <zj-table-column field="userAmt" title="融资占用金额" :formatter="money"/>
              <zj-table-column field="applyDatetime" title="融资申请日期" :formatter="date"/>
              <zj-table-column field="workflowState" title="融资状态" :formatter="(obj) => typeMap(dictionary.workflowState,obj.cellValue)"/>
              <el-row slot="pager-right" style="position: absolute;left:0;top:0;text-align: left"
                      v-if="detailData.ebBillFinancingInvoiceInfos &&detailData.ebBillFinancingInvoiceInfos.length"
              >
                发票融资占用金额合计：{{moneyNoSynbol(detailData.totalFinancingUsedAmt,'¥ ')}}
              </el-row>
            </zj-table>
          </el-collapse-item>
        </el-collapse>
        <el-row>
          <div class="dbsmHeader">
            说明
          </div>
          <div class="dbsmBody">
            发票使用金额合计 ≤ 源单金额合计<br/>
            融资占用金额合计 ≤ 发票使用金额合计<br/>
            同一源单的融资占用金额合计 ≤ 该源单金额
          </div>

        </el-row>

      </el-dialog>
      <!-- 查看器 -->
      <zj-preview :visible.sync="viewShow" :fileUrl="viewUrl" :showFooter="false" :fileType="viewType" @close="viewShow=false"/>
  </div>
</template>

<script>
    import view from "@pubComponent/preview/view";
    export default {
        name: "ZjOneInvoice",
        mixins:[view],
        data(){
          return {
            show:false,
            activeList:['info','finan','finanInfo'],
            oldActiveList:['info','finan','finanInfo'],
            zjControl:{
              queryInvoiceRealateList:this.$api.oneInvoice.queryInvoiceRealateList,
              getDirectory:this.$api.oneInvoice.getDirectory,
            },
            dictionary:{},
            detailData:{
              pubInvoiceInfoList:[],
              ebBillInfos:[],
              ebBillFinancingInvoiceInfos:[],
            }
          }
        },
        created(){
          this.getDirectory()
        },
        methods:{
          getDirectory(){
            this.zjControl.getDirectory().then(res => {
              this.dictionary = res.data
            })
          },
          open(row){
            let {id,invoiceCode,invoiceNumber} = row
            let params = {
              invoiceId:id,
              invoiceCode,
              invoiceNumber
            }
            this.zjControl.queryInvoiceRealateList(params).then(res => {
              res.data.pubInvoiceInfoList = [res.data.pubInvoiceInfo]
              this.detailData = Object.assign(this.detailData, res.data)
              this.show = true
            })
          },
          close(){
            this.show = false
            this.activeList = this.oldActiveList
          }
        },
        computed:{
          usedAmt(){
            let money = 0
            if(this.detailData.ebBillInfos && this.detailData.ebBillInfos.length){
              this.detailData.ebBillInfos.forEach(item => {
                money += Number(item.usedAmt)
              })
            }
            return money
          },
          financingUsedAmtTotal(){
            let money = 0
            if(this.detailData.ebBillFinancingInvoiceInfos && this.detailData.ebBillFinancingInvoiceInfos.length){
              this.detailData.ebBillFinancingInvoiceInfos.forEach(item => {
                money += Number(item.financingUsedAmtTotal)
              })
            }
            return money
          }
        }
    }
</script>

<style lang="less">
#zj-one-invoice{
  .el-collapse-item{
    border: 1px solid #999999;
    margin-bottom: 10px;
    padding-top: 10px;
    .el-collapse-item__content{
      padding-bottom: 5px;
    }
  }
  .slotRows{
    position: absolute;
    left: 0;
    width: 100%;
    text-align: left;
  }
}
</style>
