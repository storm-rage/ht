<template>
<div id="bankSup-detail">
  <el-form ref="form" label-width="240px" class="bankForm">
    <el-row class="ta-c jc16 zj-p-b-15">银行-供应商企业参数配置详情</el-row>
    <el-form-item label="平台项目名称：">
      {{detailData.projectName}}
    </el-form-item>
    <el-form-item label="资金方名称：">
      {{detailData.fundingEntName}}
    </el-form-item>
    <el-form-item label="供应商企业名称：">
      {{detailData.entName}}
    </el-form-item>
    <template v-if="detailData.channelNo === 'CITIC'">
      <el-form-item label="是否准入：">
        {{typeMap(dictionary.isAllow,detailData.isAllow)}}
      </el-form-item>
      <el-form-item label="收款账户开户行：">
        {{detailData.bankName}}
      </el-form-item>
      <el-form-item label="收款账户户名/资金分簿名称：">
        {{detailData.bankAccname}}
      </el-form-item>
      <el-form-item label="供应商收款银行账号/资金分簿编号：">
        {{detailData.bankAccno}}
      </el-form-item>
      <el-form-item label="联行号：">
        {{detailData.bankNo}}
      </el-form-item>
      <!-- 需求说不要 -->
<!--      <el-form-item label="客户号：">-->
<!--        {{detailData.bankNo}}-->
<!--      </el-form-item>-->
      <!-- 24121 -->
<!--      <el-form-item label="准入生效日期：">-->
<!--        {{date(detailData.allowDate)}}-->
<!--      </el-form-item>-->
      <el-form-item label="融资利率（%）：">
        {{rate(detailData.interestRate)}}
      </el-form-item>
      <el-form-item label="保理手续费率（%）：">
        {{rate(detailData.blFeeRate)}}
      </el-form-item>
      <el-form-item label="平台服务费率（%）：">
        {{rate(detailData.plFeeRate)}}
      </el-form-item>
    </template>
    <template v-else-if="detailData.channelNo === 'ABC'">
      <el-form-item label="供应商银行客户号/供应商农行编码：">
        {{detailData.allowSerialNo}}
      </el-form-item>
      <el-form-item label="是否准入：">
        {{typeMap(dictionary.isAllow,detailData.isAllow)}}
      </el-form-item>
      <el-form-item label="准入生效日期：">
        {{`
            ${detailData.allowDate ? date(detailData.allowDate) : ''}
            ${detailData.allowDate || detailData.allowExpireDate ? ' 至 ' : '' }
            ${detailData.allowExpireDate ? date(detailData.allowExpireDate) : ''}
        `}}
      </el-form-item>
      <el-form-item label="融资放款账户名称：">
        {{detailData.bankAccname}}
      </el-form-item>
      <el-form-item label="融资放款账户号码：">
        {{detailData.bankAccno}}
      </el-form-item>
      <el-form-item label="融资利率（%）：">
        {{rate(detailData.interestRate)}}
      </el-form-item>
      <el-form-item label="保理手续费率（%）：">
        {{rate(detailData.blFeeRate)}}
      </el-form-item>
      <el-form-item label="平台服务费率（%）：">
        {{rate(detailData.plFeeRate)}}
      </el-form-item>
      <el-form-item label="收息方式：">
        {{detailData.interestType}}
      </el-form-item>
    </template>
    <el-row class="w100 zj-p-l-235">
      <zj-button class="back" @click="goParent">返回</zj-button>
    </el-row>
  </el-form>
</div>
</template>

<script>
    export default {
        name: "detail",
        data(){
          return {
            zjControl:{
              viewSup:this.$api.bankSup.getSignBillInfoDetail, //查看
              getDictionary:this.$api.bankSup.getDictionary,//字典
              getFundingList:this.$api.bankSup.getFundingList,//获取资金端信息列表
            },
            detailData:{},
            dictionary:{},
          }
        },
        created(){
          this.getRow()
          this.viewSup()
          this.getDictionary()
        },
        methods:{
          getDictionary(){
            this.zjControl.getDictionary().then(res => {
              this.dictionary = Object.assign(this.dictionary,res.data)
            })
          },
          viewSup(){
            let params = {
              id:this.row.id
            }
            this.zjControl.viewSup(params).then(res => {
              this.detailData = Object.assign({},res.data)
              this.getFundingList()
            })
          }
        }
    }
</script>

<style lang="less">
#bankSup-detail{
  width: 100%;
  min-height: 100%;
  background-color: white;
  .bankForm{
    width: 530px;
    margin: auto;
    transform: translateX(-10%);
    padding-top: 5vh;
    .el-form-item{
      margin-bottom: 5px;
      .el-form-item__label {
        color: #999999;
        padding-right: 0!important;
      }
    }
  }
}
</style>
