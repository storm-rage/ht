export default {
  data(){
    return {
      //其他资料
      bankList:[],//隶属、签章
      dateBankList:[],//到期清算
    }
  },
  methods:{
    //初始化表格
    initElse(){
      //隶属、签章
      let {bankAccname,bankName,bankAccno,bankNo} = this.detailData
      !bankAccname && !bankName && !bankAccno && !bankNo
        ? this.bankList = []
        : this.bankList = [{bankAccname,bankName,bankAccno,bankNo}]

      // this.bankList:[],//隶属、签章
      //   dateBankList:[],//到期清算
    },
    //确认提交
    confirm(){
      this.$messageBox({
        title:'提交确认',
        content:'您确认将该企业进行确认提交？',
        showCancelButton:true,
        messageResolve:()=>{
          let params = {
            id:this.row.id
          }
          this.zjControl.submitConfirm(params).then(()=>{
            this.$Message.success('提交成功！')
            this.goParent()
          })
        }
      })
    }
  }
}
