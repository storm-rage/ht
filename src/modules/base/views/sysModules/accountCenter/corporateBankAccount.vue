<template>
<!-- 企业银行账户 -->
<div id="corporateBankAccount" class="content-wrap">
  <zj-table ref="searchTable" class="zj-search-table" :api="zjControl.tableApi" :params="{}"
            keep-source
            :edit-config="{trigger: 'manual', mode: 'row', icon:'-', autoClear: false,showStatus: true}"
  >
    <zj-table-column field="acctType" title="账户用途" :formatter="(obj) => typeMap(dictionary.acctType,obj.cellValue)"/>
    <zj-table-column field="bankAccname" title="户名" :edit-render="{name: '$input'}"/>
    <zj-table-column field="bankName" title="开户行" :edit-render="{name: '$input'}"/>
    <zj-table-column field="bankAccno" title="银行账号" :edit-render="{name: '$input',events:{input:accnoInput}}"/>
    <zj-table-column field="bankNo" title="联行号" :edit-render="{name: '$input'}"/>
    <zj-table-column  title="操作" fixed="right" v-if="zjBtn.updateMyEntBank">
      <template v-slot="{row}">
        <template v-if="$refs.searchTable.isActiveByRow(row)">
          <zj-button type="text" @click="save(row)">保存</zj-button>
          <zj-button type="text" @click="cancel">取消</zj-button>
        </template>
        <template v-else>
          <zj-button type="text" @click="edit(row)">修改</zj-button>
        </template>
      </template>
    </zj-table-column>
  </zj-table>
</div>
</template>

<script>
    import tableMixins from "@common/mixins/tableMixins";
    export default {
        name: "corporateBankAccount",
        mixins:[tableMixins],
        data(){
          return {
            zjControl:{
              getDictionary:this.$api.corporateBankAccount.getDictionary,//字典
              tableApi:this.$api.corporateBankAccount.queryMyEntBankPage,//列表
              updateMyEntBank:this.$api.corporateBankAccount.updateMyEntBank,//修改
            },
            dictionary:{},
          }
        },
        created(){
          this.getApi()
          this.getDictionary()
        },
        methods:{
          getDictionary(){
            this.zjControl.getDictionary().then(res => {
              this.dictionary = Object.assign(this.dictionary,res.data)
            })
          },
          //银行账号
          accnoInput(data){
            data.row.bankAccno = data.row.bankAccno.replace(/[^\d]/g,'')
          },
          //修改
          edit(row){
            if(!this.tableEditReport(['searchTable'])){return}
            this.$refs.searchTable.setActiveRow(row)
          },
          //保存
          save(row){
            //户
            if(!row.bankAccname){ return this.$messageBox({type:'info',content:'请输入户名'}) }
            //开
            if(!row.bankName){ return this.$messageBox({type:'info',content:'请输入开户行'}) }
            //银行账号
            if(!row.bankAccno){ return this.$messageBox({type:'info',content:'请输入银行账号'}) }
            let bankAcctReg = /^(\d{8,})$/
            if(row.bankAccno && !bankAcctReg.test(row.bankAccno)){ return this.$messageBox({type:'info',content:'银行账号格式不正确'}) }
            //联
            if(!row.bankNo){ return this.$messageBox({type:'info',content:'请输入联行号'}) }
            let bankNoReg = /^(\d{1,12})$/
            if(row.bankNo && !bankNoReg.test(row.bankNo)){ return this.$messageBox({type:'info',content:'联行号格式不正确'}) }

            //
            let params = Object.assign({},row)
            this.zjControl.updateMyEntBank(params).then(() => {
              this.$Message.success('修改成功！')
              this.$refs.searchTable.clearActived()
              this.search(false)
            })
          },
          //取消
          cancel(){
            this.$refs.searchTable.clearActived()
            this.search(false)
          }
        }
    }
</script>

<style lang="less">
#corporateBankAccount{
  .vxe-body--row{
    .vxe-body--column{
      padding-top: 2px;
      .vxe-input{
        height: 26px;
      }
    }
  }


}
</style>
