import { toDateString, toTimeString, formatNumberRgx,formatNumberRgxNoSymbol, formatBankNum, getPreMonthDate, getPreDayDate, extension, isHasValue, digitUp,
        tycDate,swArrDate
} from './index.js'
export default {
  install (Vue) {
    //初始化不规则字典
    Vue.prototype.dicInit = function (list,allArr,desc = '全部') {
      let newDic = {}
      for(let i in list) {
        newDic[i] = []
        for(let j=0; j<list[i].length ; j++){
          for(var k in list[i][j]){
            newDic[i].push({
              code:k,desc:list[i][j][k]
            })
          }
        }
      }
      //是否添加全部选项
      if(allArr && Array.isArray(allArr) && allArr.length > 0){
        for(let l=0; l<allArr.length; l++){
          for(let m in newDic){
            if(m === allArr[l] ){
              newDic[m].unshift({code:'',desc})
            }
          }
        }
      }
      return newDic
    },
    // 格式化显示内容 Function({cellValue, row, column})
    //sw天眼查-毫秒转日期
    Vue.prototype.tycDates = function (str) {
      return tycDate(str)
    }
    //sw数组时间
    Vue.prototype.arrDate = function (obj) {
      return obj instanceof Object ? swArrDate(obj.cellValue) : swArrDate(obj,unit)
    }
    // 日期格式化
    Vue.prototype.date = function (obj,unit) {
      return obj instanceof Object ? toDateString(obj.cellValue,unit) : toDateString(obj,unit)
    }
    // sw字符串日期+时间
    Vue.prototype.dayTime = function(str){
      if(!str){return '--'}
      let year = str.slice(0,4)
      let month = str.slice(4,6)
      let day = str.slice(6,8)
      let hour = str.slice(8,10)
      let min = str.slice(10,12)
      let sec = str.slice(12,14)
      return year+'-'+month+'-'+day + '  ' +hour+':'+min+':'+sec
    }
    // 时间格式化
    Vue.prototype.time = function (obj) {
      return obj instanceof Object ? toTimeString(obj.cellValue) : toTimeString(obj)
    }
    // 金额格式化
    Vue.prototype.money = function (obj) {
      return obj instanceof Object ? formatNumberRgx(obj.cellValue) : formatNumberRgx(obj)
    }
    Vue.prototype.moneyNoSynbol = function (obj,first='¥',last='') {
      return obj instanceof Object ? formatNumberRgxNoSymbol(obj.cellValue,first,last) : formatNumberRgxNoSymbol(obj,first,last)
    }
    // 金额转大写
    Vue.prototype.digitUp = function (obj) {
      return obj instanceof Object ? digitUp(obj.cellValue) : digitUp(obj)
    }
    // 银行账户格式化
    Vue.prototype.account = function (obj) {
      return obj instanceof Object ? formatBankNum(obj.cellValue) : formatBankNum(obj)
    }
    // 利率格式化
    Vue.prototype.rate = function (obj) {
      if (obj instanceof Object) {
        return isHasValue(obj.cellValue) ? `${obj.cellValue}` : ''
      } else {
        return isHasValue(obj) ? `${obj}` : ''
      }
    }
    Vue.prototype.rateEpd = function (obj) {
      if (obj instanceof Object) {
        return isHasValue(obj.cellValue) ? `${obj.cellValue}%` : ''
      } else {
        return isHasValue(obj) ? `${obj}%` : ''
      }
    }
    Vue.prototype.datalistToTree = function (data, parentId) {
      let itemArr = [],
        self = this;
      data.forEach(node => {
        if (node.parentId == parentId) {
          let newNode = node;
          if (newNode.typeName) {
            newNode.orgName = newNode.typeName;
          }
          if (newNode.subject && newNode.typeName) {
            newNode.orgName = newNode.subject;
          }
          if (newNode.catKey = "DIC" && newNode.name) {
            newNode.orgName = newNode.name;
          }
          if (newNode.typeId) {
            newNode.orgId = newNode.typeId;
          }
          if (newNode.typeId && newNode.defId) {
            newNode.orgId = newNode.defId;
          }

          newNode.clickNode = false;
          newNode.isFolder = true;
          newNode.isExpand = false;
          newNode.loadNode = 0;

          newNode.children =  self.datalistToTree(data, newNode.typeId);
          itemArr.push(newNode);
        }
      })
      return itemArr;
    }
    // 数据匹配
    Vue.prototype.value = function (obj, data) {
      return obj[data] ? obj[data] : data
    }
    // 渲染数据 将list转为map格式
    Vue.prototype.renderObj = function (obj) {
      const renderObj = {}
      obj.map((item) => {
        Object.assign(renderObj, item)
      })
      return renderObj
    }
    // 数据匹配
    Vue.prototype.render = function (obj, data) {
      const renderObj = {}
      obj.map((item) => {
        Object.assign(renderObj, item)
      })
      return renderObj[data] ? renderObj[data] : data
    }

	// 类型匹配
    Vue.prototype.typeMap = function (list, data) {
      let typeName = '—'
      if ( list ){
        for(var i = 0; i < list.length; i++){
          if (typeof(data) === "number" && list[i].code === data + '') {
            typeName = list[i].desc
          }
          if(list[i].code === data){
            typeName = list[i].desc
          }
          if (list[i].id === data) {
            typeName = list[i].name
          }
          if (list[i].value === data) {
            typeName = list[i].label
          }
          if(list[i].clearState === data){
            typeName = list[i].clearStateZh
          }
          if(list[i].channelNo === data){
            typeName = list[i].channelNoName
          }
          if(list[i].projectId === data){
            typeName = list[i].projectName
          }
        }
        //当上面循环娶不到值时，则为不正规字典，进行下方循环
        if(typeName === '—'){
          for(var j=0; j<list.length; j++){
            for(var k in list[j]){
              if(k === data){
                typeName = list[j][k]
              }
            }
          }
        }
      }
      return typeName
    }
    //只过滤
    Vue.prototype.filter = function(obj){
      if(obj){
        if(typeof(obj)==='object'){
          return obj.cellValue || '—'
        }else{
          return obj || '—'
        }
      }else{
        return '—'
      }
    }
    // 获取前X月的日期
    Vue.prototype.getPreMonthDate = function (date, preNumber, split) {
      return getPreMonthDate(date, preNumber, split)
    }
    // 获取前X天的日期
    Vue.prototype.getPreDayDate = function (date, preNumber, split) {
      return getPreDayDate(date, preNumber, split)
    }
    // 是否是pdf
    Vue.prototype.isPdf = function (fileName) {
      return /^\.pdf$/i.test(extension(fileName))
    }
    // 是否是img
    Vue.prototype.isImg = function (fileName) {
      return /^\.(jpg|jpeg|png|gif|svg|bmp)$/i.test(extension(fileName))
    }
    // 金额格式化
    Vue.prototype.formatMoneyRgx = formatNumberRgx
    // 金额转换值
    Vue.prototype.parserMoneyRgx = function (value) {
      return value.replace(/$s?|(,*)/g, '')
    }
    // 判断数字值是否为空
    Vue.prototype.isHasValue = isHasValue
    //金额输入框
    Vue.prototype.moneyInput = function (obj,name,min = 0,max = 99999999999999.99) {
      //只保留数字与小数点
      obj[name] = obj[name].replace(/[^\d\.]/g,'')
      //第一位为数字
      obj[name] = obj[name].replace(/^\./g,'')
      //保证只有一位小数点
      obj[name] = obj[name].replace(/\.{2,}/g,'.')
      obj[name] = obj[name].replace('.','$#$').replace(/\./g,'').replace('$#$','.')
      // //判断最大值
      // if(Number(obj[name]) > max){
      //   //切割
      //   console.error( max)
      //   let maxStr = String(max).split('.').join('.')
      //   obj[name] = maxStr
      //   return
      // }
      //按小数点切割
      if(obj[name].split('.').length > 1){
        //当小数存在
        if(obj[name].split('.')[1]){
          //小数大于两位
          if(obj[name].split('.')[1].length > 2){
            let mixNum = String(Number(obj[name].split('.')[1]))
            if(mixNum.length < 2){
              mixNum = '0'+mixNum
            }
            obj[name] = Number(obj[name].split('.')[0]) +'.'+ mixNum.slice(0,2)
          }else{
            obj[name] = Number(obj[name].split('.')[0]) +'.'+ obj[name].split('.')[1]
          }
        }else{
          obj[name] = Number(obj[name].split('.')[0]) +'.'
        }
      }else{
        let num = Number(obj[name].split('.')[0]) + ''
        if(num === '0'){
          num = ''
        }
        obj[name] = num + ''
      }

    }
    Vue.prototype.moneyBlur = function (obj,name) {
      //当不等于0是取两位小数
      if(obj[name] && Number(obj[name]) > 0){
        obj[name] =  String(Number(obj[name]).toFixed(2))
      }
      //最后限制最大值
      if(obj[name] && Number(obj[name]) > 99999999999999.99){
        obj[name] = '99999999999999.99'
      }
    }
  }
}
