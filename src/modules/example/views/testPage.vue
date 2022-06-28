<template>
<div class="testPage">
<!--  <zj-details></zj-details>-->
<!--  <zj-button @click="goChild('financingApplyOneApply',{})">返回单笔融资</zj-button>-->
<!--  <zj-eye-sky :entName="'北京百度网讯科技有限公司'" :show="showFlag"/>-->
<!--  <zj-one-invoice/>-->
<!--    <el-row class="zj-m-t-20 zj-m-l-20">-->
<!--      <zj-button class="pass">通过</zj-button>-->
<!--      <zj-button class="reject">驳回</zj-button>-->
<!--      <zj-button class="back">返回</zj-button>-->
<!--      <zj-button class="cancel">取消</zj-button>-->
<!--      <zj-button class="confirm">确认</zj-button>-->
<!--    </el-row>-->

<!--    <el-row class="zj-search-header">-->
<!--      <div class="btnBox">-->
<!--        <zj-button class="reset" icon="el-icon-refresh">重置</zj-button>-->
<!--        <zj-button class="search" icon="el-icon-search">查询</zj-button>-->
<!--      </div>-->
<!--    </el-row>-->
<!--    <el-form ref="searchForm" :model="searchForm" class="zj-search-form">-->
<!--      <el-form-item  label="原始持单企业名称：">-->
<!--        <el-input v-model="searchForm.receiptEntNameLike"/>-->
<!--      </el-form-item>-->
<!--      <el-form-item  label="业务方：" class="col-center">-->
<!--        <el-input v-model="searchForm.createEntNameLike"/>-->
<!--      </el-form-item>-->
<!--      <el-form-item  label="融单编号：" class="col-right">-->
<!--        <el-input v-model="searchForm.ebillCode"/>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--    <el-row class="zj-search-body">-->
<!--      <div class="btnBox">-->
<!--        <zj-button class="export" icon="iconfont icon-daochu">导出数据</zj-button>-->
<!--        <zj-button class="import" icon="iconfont icon-daoru">导入模板</zj-button>-->
<!--        <zj-button class="append" icon="el-icon-circle-plus-outline">新增</zj-button>-->
<!--        <zj-button class="trend" icon="iconfont icon-huiyuanfazhanqushi">新增趋势</zj-button>-->
<!--      </div>-->
<!--    </el-row>-->

<!--  <zj-button class="img orderBusinessFlow" style="float: right;margin-right: 10px">开单业务流程图</zj-button>-->
<!--  <zj-button class="downAgre">-->
<!--    <div class="left orderOpenConfim"/>开单确认书<div class="right"/>-->
<!--  </zj-button>-->
<!--  <zj-button class="downAgre">-->
<!--    <div class="left orderOpenVoucher"/>开单凭证书<div class="right"/>-->
<!--  </zj-button>-->
<!--  <zj-button class="downAgre">-->
<!--    <div class="left orderTranferVoucher"/>融资转让凭证<div class="right"/>-->
<!--  </zj-button>-->
<!--  <zj-button class="downAgre">-->
<!--    <div class="left orderTranferAgreement"/>融资转让协议<div class="right"/>-->
<!--  </zj-button>-->

<!--  <zj-one-invoice ref="zjOneInvoice"/>-->

<!--  <el-radio-group v-model="billModel">-->
<!--    <el-radio :label="'1'">期限固定</el-radio>-->
<!--    <el-radio :label="'2'">期限不固定</el-radio>-->
<!--  </el-radio-group>-->

  <!-- 上传 -->
<!--  <zj-upload class=" zj-inline">-->
<!--    <zj-button slot="trigger" class="trigger">选择上传文件</zj-button>-->
<!--    <span slot="tip" class="tip">提示文字</span>-->
<!--  </zj-upload>-->

<!--  <img src="@pubComponent/messageBox/img/success.png"/>-->

<!--    <zjPdf :item="item"/>-->

<!--    <zj-button class="whl-btn-reset" icon="el-icon-refresh">重置</zj-button>-->
<!--    <zj-button class="whl-btn-search" icon="el-icon-search">查询</zj-button>-->


  <!-- 2021-06-10 查询页 -->
<!--  <div class="zj-search-condition">-->
<!--    &lt;!&ndash; 快捷查询 &ndash;&gt;-->
<!--    <el-row class="quick-row">-->
<!--      <div class="quick-item"-->
<!--           v-for="item in directory.supplierTradeTypeList"-->
<!--           :key="item.code"-->
<!--           @click="quickQuery(item.code)"-->
<!--           :class="{'active': item.code === quickCheck }">-->
<!--        {{item.desc}}-->
<!--      </div>-->
<!--    </el-row>-->
<!--    &lt;!&ndash; 复选框 &ndash;&gt;-->
<!--    <el-row class="checkbox-row">-->
<!--      <zj-checkbox :list="directory.platFormEntStateListCheList" :value.sync="checkList" @handleCheckedChange="handleCheckedChange"/>-->
<!--    </el-row>-->
<!--    &lt;!&ndash; 按钮栏 &ndash;&gt;-->
<!--    <el-row class="button-row">-->
<!--      <zj-button class="export" icon="iconfont icon-daochu">导出数据</zj-button>-->

<!--      <zj-button class="reset" icon="el-icon-refresh" @click="resetSearch" :api="zjBtn.tableApi">重置</zj-button>-->
<!--      <zj-button class="search" icon="el-icon-search" @click="search" :api="zjBtn.tableApi">查询</zj-button>-->
<!--    </el-row>-->
<!--    <el-form class="search-form">-->
<!--      <el-form-item label="企业名称：">-->
<!--        <el-input v-model="searchForm.nameLike" placeholder="" @keyup.enter.native="enterSearch"/>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="注册申请日期：" class="col-center">-->
<!--        <zj-date-range-picker  class="searchFormDate"-->
<!--                               :startDate.sync="searchForm.applyDatetimeStart"-->
<!--                               :endDate.sync="searchForm.applyDatetimeEnd"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="平台客户类型：" class="col-right">-->
<!--        <el-select v-model="searchForm.entType"-->
<!--                   filterable placeholder="请选择"-->
<!--                   :popper-append-to-body="false"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="item in platFormAuditEntTypeList"-->
<!--            :key="item.value"-->
<!--            :label="item.desc"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--  </div>-->
<!--  <div class="zj-search-response">-->
<!--    <zj-table-->
<!--      ref="searchTable"-->
<!--      :params="searchForm"-->
<!--      :api="zjControl.tableApi">-->
<!--      <zj-table-column field="name" title="企业名称" />-->
<!--      <zj-table-column field="entType" title="企业类型">-->
<!--        <template v-slot="{row}">-->
<!--          &lt;!&ndash; 核心企业 &ndash;&gt;-->
<!--          <template v-if="row.entType === 'B'">-->
<!--            {{typeMap(directory.platFormAuditEntTypeList,row.entType)}}-->
<!--          </template>-->
<!--          &lt;!&ndash; 供应商 &ndash;&gt;-->
<!--          <template v-else-if="row.entType === 'S'">-->
<!--            &lt;!&ndash; 直接供应商 &ndash;&gt;-->
<!--            <template v-if="row.supplierType === '01'">-->
<!--              {{typeMap(directory.platFormAuditEntTypeList,row.entType)}}-->
<!--              ( 直接供应商 )-->
<!--            </template>-->
<!--            &lt;!&ndash; 间接供应商 &ndash;&gt;-->
<!--            <template v-else>-->
<!--              &lt;!&ndash; 有贸易关系 &ndash;&gt;-->
<!--              <template v-if="row.isTradeRelation === '1'">-->
<!--                <label>-->
<!--                  {{typeMap(directory.platFormAuditEntTypeList,row.entType)}}-->
<!--                  ( 间接供应商<span class="success">√</span> )-->
<!--                </label>-->
<!--              </template>-->
<!--              &lt;!&ndash; 无贸易关系 &ndash;&gt;-->
<!--              <template v-else>-->
<!--                <label>-->
<!--                  {{typeMap(directory.platFormAuditEntTypeList,row.entType)}}-->
<!--                  ( 间接供应商<span class="red">×</span> )-->
<!--                </label>-->
<!--              </template>-->
<!--            </template>-->
<!--          </template>-->
<!--          <template v-else>——</template>-->
<!--        </template>-->
<!--      </zj-table-column>-->
<!--      <zj-table-column field="applyDatetime" title="申请时间" :formatter="filter"/>-->
<!--      <zj-table-column field="state" title="企业注册状态" :formatter="(obj) => typeMap(directory.platFormEntStateList,obj.cellValue)"/>-->
<!--      <zj-table-column title="操作" fixed="right" >-->
<!--        <template v-slot="{row}">-->
<!--          <zj-button type="text" @click="goChild('registerAuditApplyAudit',row)" v-if="row.state==='3'">审核</zj-button>-->
<!--          <zj-button type="text" @click="goChild('registerAuditProtocolAudit',row)" v-else-if="row.state==='4'">确认</zj-button>-->
<!--          <zj-button type="text" :api="zjBtn.getCertUserInfo" @click="certificate(row)" v-else-if="row.state==='5'">发证</zj-button>-->
<!--          <span v-else>——</span>-->
<!--        </template>-->
<!--      </zj-table-column>-->
<!--    </zj-table>-->
<!--  </div>-->

  <!-- 2021-06-11 表格自适应 -->
  <zj-table
    ref="invoTable"
    :dataList="[{}]"
    :pagerPageSize="5"
  >
    <zj-table-column field="invoiceType" title="发票类型" width="80"/>
    <zj-table-column field="invoiceCode" title="发票代码" width="80"/>
    <zj-table-column field="invoiceNumber" title="发票号码" width="80"/>
    <zj-table-column field="totalAmtLowcase" title="发票金额(含税)" width="100"/>
    <zj-table-column field="sellAmount" title="发票金额(不含税)" width="120"/>

    <zj-table-column field="usedAmt" title="发票使用金额" width="90"/>
    <zj-table-column field="financingUsedAmt" title="本次融资占用金额" width="120"/>

    <zj-table-column field="invoiceDate" title="发票日期" width="80"/>
    <zj-table-column field="seller" title="销售方" width="60"/>
    <zj-table-column field="buyer" title="购买方" width="60"/>
    <zj-table-column title="验真结果" width="80"/>
    <zj-table-column field="sysAuditResult" title="系统审核结果" width="90"/>
    <zj-table-column field="fileName" title="发票附件" width="80"/>
    <zj-table-column title="操作" fixed="right">
      <template >
        <zj-button type="text" >审核通过</zj-button>
        <zj-button type="text" >查看</zj-button>
        <zj-button type="text" >下载</zj-button>
      </template>
    </zj-table-column>
  </zj-table>
</div>
</template>

<script>

    export default {
        name: "testPage",
      components: {

      },
      data(){
          return {
            invoice_invoiceType:'',invoice_invoiceCode:'',invoice_invoiceNumber:'',invoice_totalAmtLowcase:'',
            invoice_sellAmount:'', invoice_usedAmt:'', invoice_financingUsedAmt :'',invoice_invoiceDate:'',
            invoice_seller :'',invoice_buyer:'', invoic_validateFlag:'', invoice_sysAuditResult:'',
            invoice_fileName:'', invoice_operation:'',
          }
        },
        mounted() {


        },
        methods:{
          // tableResize(ref,list = [], unit = 'px'){
          //   list.forEach(item => {
          //     let itemValue = ''
          //     this.$set(
          //       this,item.name,itemValue
          //     )
          //   })
          // }
        }
    }
</script>

<style lang="less">




</style>
