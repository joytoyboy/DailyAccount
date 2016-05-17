// 参考：http://www.cnblogs.com/qinpengming/archive/2012/12/03/2800002.html

/**
 * 格式化时间为“yyyy-mm-dd”的形式。
 * @param time
 * @returns 格式化后的字符串
 */
function formatDate(date) {
  if (date == null){
    date = new Date();
  }
  return sprintf("%04d/%02d/%02d", date.getFullYear(), (date.getMonth()+1), date.getDate());
}

/**
 * 获取时间戳，单位：秒。
 * @param date
 */
function timeStamp(date) {
  if (null == date){
    date = new Date();
  }
  var timestamp = Date.parse(date) / 1000;
  return timestamp;
}
