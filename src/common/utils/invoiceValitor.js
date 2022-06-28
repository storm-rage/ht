export default {
  methods:{
    //新增单个判断
    invoceOne(row){
      // let rowIndex = this.$refs.invoiceTable.getRowIndex(row)
      let rowIndex = this.findRowIndex('invoiceList',row)
      let haveIndex = -1

      for (let i=0; i<this.contractData.invoiceList.length;i++){
        if(i !== rowIndex){
          if(
            row.invoiceNumber === this.contractData.invoiceList[i].invoiceNumber &&
            row.invoiceCode === this.contractData.invoiceList[i].invoiceCode
          ){
            haveIndex = i
            break
          }
        }
      }
      return {
        flag:haveIndex >= 0, //是否存在，true存在
        haveIndex,//该项在列表的位置 从0开始
        invoiceNumber:row.invoiceNumber,//发票号码
        invoiceCode:row.invoiceCode,//发票代码
      }
    },
    //①初步校验格式--是否已填
    rulesSave(row) {
      //校验发票种类是否选中
      if (!row.invoiceType){
        this.$Message.error('请选择发票种类')
        return false
      }
      let num = new RegExp(/^[\d]{1,8}$/)
      let num2 = new RegExp(/^[\d]{1,12}$/)
      //校验发票代码
      if (!row.invoiceCode){
        this.$Message.error('请填写发票代码')
        return false
      }
      if (  row.invoiceCode && !num2.test(row.invoiceCode) ){
        this.$Message.error('发票代码为1-12位数字')
        return false
      }
      //校验发票号码
      if (!row.invoiceNumber){
        this.$Message.error('请填写发票号码')
        return false
      }
      if (  row.invoiceNumber && !num.test(row.invoiceNumber) ){
        this.$Message.error('发票号码为1-8位数字')
        return false
      }

      //校验发票金额
      let key = this.moneyFormat(row)
      if (!key) return false
      //校验日期
      if(!row.invoiceDate){
        this.$Message.error('请选择发票日期')
        return false
      }
      //校验码(后6位)
      if(row.invoiceType === '增值税电子普通发票' || row.invoiceType === '增值税普通发票'){
        if(row.validateFlag !== '1' && !row.verifyCode){
          this.$Message.error('请输入校验码(后6位)')
          return false
        }else if(row.validateFlag !== '1' && row.verifyCode && (row.verifyCode.length <6 || row.verifyCode.length>6)){
          this.$Message.error('校验码为6位数')
          return false
        }else {
          return true
        }
      }
      //发票附件
      // if(!row.fileId){
      //     this.$Message.error('请上传发票附件')
      //     return false
      // }
      return true
    },
    //①①校验金额格式
    moneyFormat(row){
      //1.发票金额(含税)
      let key1 = this.MoneyValidator(row.totalAmtLowcase,'发票金额(含税)',true)
      if(!key1) return false
      //2.检验发票金额(不含税)
      let key2 = this.MoneyValidator(row.sellAmount,'发票金额(不含税)',true)
      if(!key2) return false
      //3.检验发票使用金额
      let key3 = this.MoneyValidator(row.usedAmt,'发票使用金额',true)
      if(!key3) return false
      return true
    },
    //金额格式校验的方法
    MoneyValidator(money,mes,boo){
      let num = /(^[1-9]*\d*$)/    // 数字
      let NoNum = /[^\d]/ //非数字校验
      let fiveReg = /^\d+\.\d{0,2}$/ //小数点校验
      let key = false
      if(!money && boo){
        this.$Message.error(`请输入${mes}`)
        key = false
      }else if(!boo){
        return true
      }
      else if( money && String(money).indexOf('.') <= 0 ){ //当无小数点时
        if(!num.test(money)){
          if(NoNum.test(money)){
            this.$Message.error(`请输入正确的${mes}`)
            key = false
          }
          else{
            key = true
          }
        }else {
          key = true
        }
      }
      else if( money && String(money).indexOf('.') > 0) { //当有小数点时
        //记录第一个小数点出现的位置
        var oneXsd = String(money).indexOf('.')
        //计算小数点个数
        var xsd = 0
        for (var i = 0; i < money.length; i++) {
          if (money[i] === '.') {
            xsd++
          }
        }
        //将内容按小数点切割
        var arr = String(money).split('.')
        for (var j = 0; j < arr.length; j++) {
          if (NoNum.test(arr[j])) {
            this.$Message.error(`请输入正确的${mes}`)
            key = false
          }
        }
        // 1.根据小数点个数判断
        if (xsd > 1 || oneXsd + 1 === money.length) {
          this.$Message.error(`请输入正确的${mes}`)
          key = false
        } else if (!fiveReg.test(money)) {
          this.$Message.error(`${mes}仅支持2位小数！`)
          key = false
        } else {
          key = true
        }
      }
      return key
    },
    //③③校验发票使用金额加上 已使用金额是否大于  发票金额含税
    moneyMaxMin(row){
      if(Number(row.usedAmt) > Number(row.totalAmtLowcase) ){
          this.$Message.error(
              `发票使用金额：￥${row.usedAmt}，
              不可大于发票金额(含税)：￥${row.totalAmtLowcase}`
          )
          return false
      }else{
        return true
      }
    }
  }
}
