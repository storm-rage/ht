import moment from "moment";

export const value = ( newValue ) => {
  let val = newValue ? newValue + '' : '--'
  return val
}

export let formatDate = time => {
  if (time) {
    return moment(time).format("YYYY-MM-DD HH:mm:ss");
  } else {
    return '';
  }
}

export let formatDateTime = time => {
  if (time) {
    return moment(time).format("YYYY-MM-DD HH:mm");
  } else {
    return '';
  }
}

export let formatDatetime = time => {
  if (time) {
    return moment(time).format("YYYY-MM-DD");
  } else {
    return '';
  }
}

export let formatTime = time => {
  if (time) {
    return moment(time).format("HH:mm");
  } else {
    return '';
  }
}

export let formatDuring = (mss) => {
  let days = parseInt(mss / (1000 * 60 * 60 * 24));
  let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = (mss % (1000 * 60)) / 1000;
  // return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
  return days ? (days + " 天 ") : hours ? (hours + " 小时 ") : minutes;
}

export let tempToTime = ($secs) => {
  if ($secs) {
    $secs = $secs / 1000;
    let $result = '';
    if ($secs >= 86400) {
      let $days = Math.floor($secs / 86400);
      $secs = $secs % 86400;
      $result = $days + '天';
      if ($secs > 0) {
        $result += ' ';
      }
    }
    if ($secs >= 3600) {
      let $hours = Math.floor($secs / 3600);
      $secs = $secs % 3600;
      $result += $hours + '小时';
      if ($secs > 0) {
        $result += ' ';
      }
    }
    if ($secs >= 60) {
      let $minutes = Math.floor($secs / 60);
      $secs = $secs % 60;
      $result += $minutes + '分钟';
      if ($secs > 0) {
        $result += ' ';
      }
    }
    $result += parseInt($secs) + '秒';
    return $result;
  }
  return "";
}

/**
 * @description 金额千分位
 * @param number：要格式化的数字
 * @param decimals：保留几位小数 默认2位
 */
export const formatMoney = (number, decimals = 2) => {
  if (number == 0) {
    return '0.00';
  }
  if (number == '/') {
    return '/';
  }
  if(number == undefined || number== null || number == ''){
    return '';
  }
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  let n = !isFinite(+number) ? 0 : +number
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  let sep =  ',';
  let dec =  '.';
  let s = '';
  let toFixedFix = function (n, prec) {
    let k = Math.pow(10, prec)
    return '' + Math.round(n * k) / k;
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  let re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

export const formatMoney0 = (number, decimals = 2) => {
  if(number == undefined || number== null || number == ''){
    return '0.00'
  }
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  let n = !isFinite(+number) ? 0 : +number
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  let sep =  ',';
  let dec =  '.';
  let s = ''
  let toFixedFix = function (n, prec) {
    let k = Math.pow(10, prec)
    return '' + Math.round(n * k) / k
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  let re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

export const newFormatMoney = (number, decimals = 2) => {
  if(!number && number!==0){
    return  '-'
  }
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  let n = !isFinite(+number) ? 0 : +number
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  let sep =  ',';
  let dec =  '.';
  let s = ''
  let toFixedFix = function (n, prec) {
    let k = Math.pow(10, prec)
    return '' + Math.round(n * k) / k
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  let re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
};

export const keepFour = (value) => {
  if(value==0){
    return '0.0000'
  }
  if(!value){
    return
  }
  let tempVal = Math.round(value * 10000) / 10000;
  tempVal = Number(tempVal).toFixed(4);
  if(tempVal === 'NaN'){
    return '0.0000'
  }
  return  tempVal
};

export const keepTwo = (value) => {
  if(value==0){
    return '0.00'
  }
  if(!value){
    return
  }
  let tempVal = Math.round(value * 100) / 100;
  tempVal = Number(tempVal).toFixed(2);
  if(tempVal === 'NaN'){
    return '0.00'
  }
  return  tempVal;
};
