export default {
  methods:{
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
    //查找对应的index   data大对象  list：data中的数组  row行数据  flag判断条件
    tableFindIndex(data,list,row,flag){
      // return  this[data][list].findIndex(item => item[flag] === item[flag] || item._XID === row._XID)
      if(flag){
        return  this[data][list].findIndex(item => item[flag] === item[flag])
      }else{
        return  this[data][list].findIndex(item => item._XID === row._XID)
      }

    },
    //新增检测是否已存在  data大对象  list：data中的数组  row行数据  flag判断条件
    tableAddReport(data,list,row,flag='id'){
      let rowIndex = this.tableFindIndex(data,list,row)
      let haveIndex = -1
      for (let i=0; i<this[data][list].length;i++){
        if(i !== rowIndex){
          if(row[flag] === this[data][list][i][flag]){
            haveIndex = i
            break
          }
        }
      }
      return {
        flag:haveIndex >= 0, //是否存在，true存在
        index,//该项在列表的位置 从0开始
      }
    },
    //金额校验    money金额   mes对应名
    tableMoneyVali(money,mes){
      let maxMoney = '99999999999999.99'
      let maxMoneyText = '￥99,999,999,999,999.99'
      let key = false
      let num = /(^[1-9]*\d*$)/    // 数字
      let NoNum = /[^\d]/ //非数字校验
      let fiveReg = /^\d+\.\d{0,2}$/ //小数点校验
      if(!money){
        this.$Message.warning(`请输入${mes}`)
        key = false
      }
      else if( money && String(money).indexOf('.') <= 0 ){ //当无小数点时
        if(!num.test(money)){
          if(NoNum.test(money)){
            this.$Message.warning(`请输入正确的${mes}`)
            key = false
          }else if(Number(money) < 0){
            this.$Message.error(`${mes}不可小于0`)
            key = false
          }else if(Number(money) > Number(maxMoney)){
            key = false
            this.$Message.warning(`${mes}不可大于：${maxMoneyText}`)
          }
          else{
            key = true
          }
        }else if(Number(money) < 0){
          this.$Message.error(`${mes}不可小于0`)
          key = false
        }
        else if(Number(money) > Number(maxMoney)){
          key = false
          this.$Message.warning(`${mes}不可大于：${maxMoneyText}`)
        }
        else {
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
            this.$Message.warning(`请输入正确的${mes}`)
            key = false
          }
        }
        // 1.根据小数点个数判断
        if (xsd > 1 || oneXsd + 1 === money.length) {
          this.$Message.warning(`请输入正确的${mes}`)
          key = false
        }else if(Number(money) < 0){
          this.$Message.error(`${mes}不可小于0`)
          key = false
        } else if (!fiveReg.test(money)) {
          this.$Message.warning(`${mes}仅支持2位小数！`)
          key = false
        } else if(Number(money) > Number(maxMoney)){
          key = false
          this.$Message.warning(`${mes}不可大于：${maxMoneyText}`)
        } else {
          key = true
        }
      }
      return key
    },
    //长度校验  row行数据  name字段名  num长度  mes提示语  boo是否必填
    tableLengthVali(row,name,num,mes,boo){
      let key = false
      if(boo && !row[name]){
        this.$Message.warning(`请输入${mes}`)
        key = false
      }else if(row[name] && row[name].length > num){
        this.$Message.warning(`${mes}长度不得超过${num}字符`)
        key = false
      }else{
        key = true
      }
      return key
    },
  }
}
