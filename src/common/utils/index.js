// import XEUtils from 'xe-utils'

/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

let dateFtt = (fmt, date) => {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export function formatDate (value, fmt) {
  var crtTime = new Date(value)
  if (fmt === 'yyyy-MM-dd') return dateFtt(fmt, crtTime)
  return dateFtt('yyyy-MM-dd hh:mm:ss', crtTime) // 直接调用公共JS里面的时间类处理的办法
}

export function timestampToDate(timestamp, fmt) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours() + ':';
  let m = date.getMinutes() + ':';
  let s = date.getSeconds();
  if (fmt === 'time') {
    return Y+M+D+h+m+s;
  }
  return Y+M+D;
}

/**
 * 时间戳格式化函数
 * @param  {string} format    格式
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间
 * @return {string}           格式化的时间字符串
 */
export function timestampToDay(format, timestamp){
  var a, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date());
  var pad = function(n, c){
    if((n = n + "").length < c){
      return new Array(++c - n.length).join("0") + n;
    } else {
      return n;
    }
  };
  var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var txt_ordin = {1:"st", 2:"nd", 3:"rd", 21:"st", 22:"nd", 23:"rd", 31:"st"};
  var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var f = {
    // Day
    d: function(){return pad(f.j(), 2)},
    D: function(){return f.l().substr(0,3)},
    j: function(){return jsdate.getDate()},
    l: function(){return txt_weekdays[f.w()]},
    N: function(){return f.w() + 1},
    S: function(){return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'},
    w: function(){return jsdate.getDay()},
    z: function(){return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0},

    // Week
    W: function(){
      var a = f.z(), b = 364 + f.L() - a;
      var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
      if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){
        return 1;
      } else{
        if(a <= 2 && nd >= 4 && a >= (6 - nd)){
          nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
          return date("W", Math.round(nd2.getTime()/1000));
        } else{
          return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
        }
      }
    },

    // Month
    F: function(){return txt_months[f.n()]},
    m: function(){return pad(f.n(), 2)},
    M: function(){return f.F().substr(0,3)},
    n: function(){return jsdate.getMonth() + 1},
    t: function(){
      var n;
      if( (n = jsdate.getMonth() + 1) == 2 ){
        return 28 + f.L();
      } else{
        if( n & 1 && n < 8 || !(n & 1) && n > 7 ){
          return 31;
        } else{
          return 30;
        }
      }
    },

    // Year
    L: function(){var y = f.Y();return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0},
    //o not supported yet
    Y: function(){return jsdate.getFullYear()},
    y: function(){return (jsdate.getFullYear() + "").slice(2)},

    // Time
    a: function(){return jsdate.getHours() > 11 ? "pm" : "am"},
    A: function(){return f.a().toUpperCase()},
    B: function(){
      // peter paul koch:
      var off = (jsdate.getTimezoneOffset() + 60)*60;
      var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
      var beat = Math.floor(theSeconds/86.4);
      if (beat > 1000) beat -= 1000;
      if (beat < 0) beat += 1000;
      if ((String(beat)).length == 1) beat = "00"+beat;
      if ((String(beat)).length == 2) beat = "0"+beat;
      return beat;
    },
    g: function(){return jsdate.getHours() % 12 || 12},
    G: function(){return jsdate.getHours()},
    h: function(){return pad(f.g(), 2)},
    H: function(){return pad(jsdate.getHours(), 2)},
    i: function(){return pad(jsdate.getMinutes(), 2)},
    s: function(){return pad(jsdate.getSeconds(), 2)},
    //u not supported yet

    // Timezone
    //e not supported yet
    //I not supported yet
    O: function(){
      var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
      if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
      return t;
    },
    P: function(){var O = f.O();return (O.substr(0, 3) + ":" + O.substr(3, 2))},
    //T not supported yet
    //Z not supported yet

    // Full Date/Time
    c: function(){return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()},
    //r not supported yet
    U: function(){return Math.round(jsdate.getTime()/1000)}
  };

  return format.replace(/[\]?[a-zA-Z]/g, function(t, s){
    if( t!=s ){
      // escaped
      ret = s;
    } else if( f[s] ){
      // a date function exists
      ret = f[s]();
    } else{
      // nothing special
      ret = s;
    }
    return ret;
  });
}

/**
 * 比较两个对象的值是否相等
 * @param {Object} res
 * @returns Boolean
 */
export function isObjectEqual(a, b) {
  let aProps = Object.getOwnPropertyNames(a);
  let bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    console.error(1)
    return false;
  }

  for (var i = 0; i < aProps.length-1; i++) {
    var propName = aProps[i];

    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
}

/**
 * 表格数据统一化
 * @param {Object} res
 * @returns {Object}
 */
export function formatTableData (res) {
  return res.data
}

//日期格式化
export function swArrDate(cellValue) {
  if(cellValue && Array.isArray(cellValue)){

    let year = cellValue[0]
    let month = JSON.stringify(cellValue[1]+'').length === 1 ? '0' + cellValue[1] : cellValue[1]
    let day = JSON.stringify(cellValue[2]+'').length === 1 ? '0' + cellValue[2] : cellValue[2]
    let hour = JSON.stringify(cellValue[3]+'').length === 1 ? '0' + cellValue[3] : cellValue[3]
    let minute = JSON.stringify(cellValue[4]+'').length === 1 ? '0' + cellValue[4] : cellValue[4]
    let second = JSON.stringify(cellValue[5]+'').length === 1 ? '0' + cellValue[5] : cellValue[5]
    return `${year}-${month}-${day}  ${hour}:${minute}:${second}`
  }else{
    return cellValue
  }
}

/**
 * 表格日期统一化
 * @param {Object} res
 * @returns {Object}
 */
export function toDateString (cellValue,unit) {
  if (cellValue && cellValue.length === 8) {
    let y = cellValue.slice(0, 4)
    let m = cellValue.slice(4, 6)
    let d = cellValue.slice(6, 8)
    if(unit){
      return `${y}年${m}月${d}日`
    }else{
      return `${y}-${m}-${d}`
    }
  } else {
    return cellValue
  }
}

/**
 * 表格时间统一化
 * @param {Object} res
 * @returns {Object}
 */
export function toTimeString (cellValue) {
  if (cellValue && cellValue.length === 6) {
    let h = cellValue.slice(0, 2)
    let m = cellValue.slice(2, 4)
    let s = cellValue.slice(4, 6)
    return `${h}:${m}:${s}`
  } else {
    return cellValue
  }
}

/*
* 天眼查毫秒数转日期 yyyy-mm-dd
*/
export function tycDate(dateTime) {
  if(!dateTime){return '-'}
  let dt = typeof(dateTime) === 'number' ? dateTime : Number(dateTime)
  let date = new Date(dt)
  let year = date.getFullYear()
  let month = (date.getMonth()+1).toString().padStart(2,'0')
  let day = date.getDate().toString().padStart(2,'0')
  return year + '-' + month + '-' + day
}


/**
 * 时间戳转时间 格式'yyyy-MM-dd'
 * @param {num} timestamp
 * @returns {string}
 */
export function timestampForDate (timestamp) {
  function add0 (m) { return m < 10 ? '0' + m : m }
  let time = new Date(timestamp)
  let y = time.getFullYear()
  let m = time.getMonth() + 1
  let d = time.getDate()
  return `${y}${add0(m)}${add0(d)}`
}

/**
 * 数字转化为千分号分隔
 * @param {num} timestamp
 * @returns {string}}
 */
export function formatNumberRgx (num, split) {
  if (!num){
    // '¥ 0.00'
    return '0.00'
  }
  let moneyList = String(num).split('.')
  if(moneyList[1]){
    if(moneyList[1].length > 2){
      moneyList[1] = moneyList[1].slice(0,2)
    }
    else if(moneyList[1].length < 2){
      moneyList[1] = moneyList[1] + '0'
    }
  }else{
    moneyList[1] = '00'
  }
  moneyList[0] = moneyList[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${split || ' '}${moneyList.join('.')}`
}
export function formatNumberRgxNoSymbol(num,first, last) {
  if (!num){
    return `${first}0.00${last}`
  }
  let moneyList = String(num).split('.')
  if(moneyList[1]){
    if(moneyList[1].length > 2){
      moneyList[1] = moneyList[1].slice(0,2)
    }
    else if(moneyList[1].length < 2){
      moneyList[1] = moneyList[1] + '0'
    }
  }else{
    moneyList[1] = '00'
  }
  moneyList[0] = moneyList[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${first}${moneyList.join('.')}${last}`
}

/**
 * 银行卡号加-分隔符
 * @param {num} timestamp
 * @returns {string}}
 */
export function formatBankNum (num) {
  if (!num && num !== 0) return
  return num.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, '$1-')
}

/**
 * 数据转换
 */
export function formatterData (obj, data) {
  return obj[data] ? obj[data] : data
}

/**
 * 获取前X个月的日期
 */
export function getPreMonthDate (date, preNumber, split) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1 - preNumber
  let day = date.getDate()
  while (month > 12) {
    month = month - 12
    year++
  }
  while (month <= 0) {
    month = 12 + month
    year--
  }
  return [zeroFill(year, 2), zeroFill(month, 2), zeroFill(day, 2)].join(split || '')
}

/**
 * 获取前preNumber天的日期
 */
export function getPreDayDate (date, preNumber, split) {
  date.setTime(date.getTime() - preNumber * 24 * 60 * 60 * 1000)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return [zeroFill(year, 2), zeroFill(month, 2), zeroFill(day, 2)].join(split || '')
}

export function zeroFill (val, len, reverse) {
  val = val.toString()
  len = len - val.length
  for (let i = 0; i < len; i++) {
    if (reverse) {
      val = val + '0'
    } else {
      val = '0' + val
    }
  }
  return val
}

/**
 * 金额大写转换
 */

export function digitUp (money) {
  // 汉字的数字
  let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  // 基本单位
  let cnIntRadice = ['', '拾', '佰', '仟']
  // 对应整数部分扩展单位
  let cnIntUnits = ['', '万', '亿', '兆']
  // 对应小数部分单位
  let cnDecUnits = ['角', '分', '毫', '厘']
  // 整数金额时后面跟的字符
  let cnInteger = '整'
  // 整型完以后的单位
  let cnIntLast = '元'
  // 最大处理的数字
  let maxNum = 999999999999999.9999
  // 金额整数部分
  let integerNum
  // 金额小数部分
  let decimalNum
  // 输出的中文金额字符串
  let chineseStr = ''
  // 分离金额后用的数组，预定义
  let parts
  if (money === '') { return '' }
  money = parseFloat(money)
  if (money >= maxNum) {
    // 超出最大处理数字
    return ''
  }
  if (money === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  // 转换为字符串
  money = money.toString()
  if (money.indexOf('.') === -1) {
    integerNum = money
    decimalNum = ''
  } else {
    parts = money.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    let IntLen = integerNum.length
    for (let i = 0; i < IntLen; i++) {
      let n = integerNum.substr(i, 1)
      let p = IntLen - i - 1
      let q = p / 4
      let m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        // 归零
        zeroCount = 0
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  // 小数部分
  if (decimalNum !== '') {
    let decLen = decimalNum.length
    for (let i = 0; i < decLen; i++) {
      let n = decimalNum.substr(i, 1)
      if (n !== '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr === '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum === '') {
    chineseStr += cnInteger
  }
  return chineseStr
}

/**
 * 根据文件名提取文件类型后缀
 */
export function extension (fileName) {
  if (typeof fileName !== 'string') {
    fileName = String(fileName || '')
  }
  return ((fileName.match(/\.[^\\./]+$/ig) || '')[0] || '').toLowerCase()
}

/**
 * 判断数字值是否为空
 */
export function isHasValue (value) {
  if (value || value === 0) {
    return true
  } else {
    return false
  }
}

/**
 * 截取字符串
 */
export function getStr (str, firstStr, secondStr) {
  // "", null, undefined
  if (str === '' || str === null || str === undefined) {
    return ''
  }
  if (str.indexOf(firstStr) < 0) {
    return ''
  }
  var subFirstStr = str.substring(str.indexOf(firstStr) + firstStr.length, str.length)
  var subSecondStr = subFirstStr.substring(0, subFirstStr.indexOf(secondStr))
  return subSecondStr
}

/**
 * 判断是否是数字
 */
export function isNumeric (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

/**
 * 生成随机数
 */
export function uuid() {
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

/**
 * 一维数组转化为树结构
 * 融资轨迹树
 */
export function arrayToTree(nodes, vm) {
  let _this = vm
  var gc = function(id) {
    var cn = [];
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.parentCode === id) {

        // let tranType
        // switch (n.tranType) {
        //   case 'KD':
        //     tranType = '开单'
        //     break;
        //   case 'RZ':
        //     tranType = '融资'
        //     break;
        //   case 'ZR':
        //     tranType = '转单'
        //     break;
        //   case 'HG':
        //     tranType = '回购'
        //     break;
        //   default:
        //     tranType = '--'
        // }

        n.children = gc(n.ebillCode); //新增属性children
        n.label = n.holderName
        n.ebillCode = n.ebillCode
        n.ebillAmt = _this.money(n.ebillAmt)
        n.tranType = n.tranType
        n.holderDate = (n.holderDate ? _this.date(n.holderDate) : '--')
        cn.push(n);
      }
    }
    return cn
  }
  return gc(null)
}


/**
 * 如果传入的值是null、undefined或空字符串，则返回true。（可选的）
 * @param {Mixed} value 要验证的值。
 * @return {Boolean}
 */
export function isEmpty(v) {
  return v === null || v === undefined || (v.trim() === ''? true : false);
}
