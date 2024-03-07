function getLocaleDateTimeString (date, ms = false, sp = '') {
    let curMonth = (date.getMonth() + 1);
    if (curMonth < 10) { curMonth = '0' + curMonth; }

    let curDay = date.getDate();
    if (curDay < 10) { curDay = '0' + curDay; }

    let curHour = date.getHours();
    if (curHour < 10) { curHour = '0' + curHour; }

    let curMin = date.getMinutes();
    if (curMin < 10) { curMin = '0' + curMin; }

    let curSec = date.getSeconds();
    if (curSec < 10) { curSec = '0' + curSec; }

    let curMs = '';
    if (ms === true) {
      curMs = date.getMilliseconds();
      if (sp !== '') {
        curMs = '.' + curMs;
      }
    }

    const curYear = date.getFullYear();

    switch (sp) {
    case '':
      return `${curYear}${curMonth}${curDay}${curHour}${curMin}${curSec}${curMs}`;
    case 'ISO':
      return `${curYear}-${curMonth}-${curDay}T${curHour}:${curMin}:${curSec}${curMs}Z`;
    default:
      return `${curYear}${sp}${curMonth}${sp}${curDay} ${curHour}:${curMin}:${curSec}${curMs}`;
    }
  }

/** 获取 本地 日期时间字符串
   *
   * @param {date} date Date Object
   * @param {string} sp 日期分隔符, 缺省 '-'
   * @return {string} 格式化后的字符串
   */
function getLocaleDateString (date, sp = '-') {
    let curMonth = (date.getMonth() + 1);
    if (curMonth < 10) { curMonth = '0' + curMonth; }

    let curDay = date.getDate();
    if (curDay < 10) { curDay = '0' + curDay; }

    return `${date.getFullYear()}${sp}${curMonth}${sp}${curDay}`;
  }

/**
   * 格式化日期字符串,本地时间
   * @param {Date} dateObj Date 对象 或者 时间戳
   * @param {String} fmt 格式化字符串 默认 'yyyy-MM-dd hh:mm:ss'
   * @returns {String}
   */
function dateFormat ( dateObj = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss' ) {
    if ( dateObj instanceof Date === false ) {
      dateObj = new Date( dateObj );
    }
  
    if ( fmt === 'yyyy-MM-dd hh:mm:ss' ) {
      return getLocaleDateTimeString( dateObj, false, '-' );
    } else if ( fmt === 'yyyy-MM-dd' ) {
      return getLocaleDateString( dateObj );
    }
  
    const o = {
      'M+': dateObj.getMonth() + 1, // 月份
      'd+': dateObj.getDate(), // 日
      'h+': dateObj.getHours(), // 小时
      'm+': dateObj.getMinutes(), // 分
      's+': dateObj.getSeconds(), // 秒
      'q+': Math.floor( ( dateObj.getMonth() + 3 ) / 3 ), // 季度
      S: dateObj.getMilliseconds(), // 毫秒
    };
  
    let reY = fmt.match(/(y+)/);
    if(reY !== null) {
        fmt = fmt.replace( reY[1],
            ( dateObj.getFullYear() + '' ).substring( 4 - reY[1].length )
        );
    }
    for ( const k in o ) {
      const re = new RegExp( '(' + k + ')' );
        let m = fmt.match(re);
        if( m !== null ) {
            fmt = fmt.replace( m[1],
                m[1].length === 1 ? o[k] : ( '00' + o[k] ).substring( ( '' + o[k] ).length )
            );
        }
    }
    return fmt;
}

function getISODateString (date, sp = '-') {
    let curMonth = (date.getUTCMonth() + 1);
    if (curMonth < 10) { curMonth = '0' + curMonth; }

    let curDay = date.getUTCDate();
    if (curDay < 10) { curDay = '0' + curDay; }

    return `${date.getUTCFullYear()}${sp}${curMonth}${sp}${curDay}`;
}


function getISODateTimeString (date, ms = false, sp = '') {
    let curMonth = (date.getUTCMonth() + 1);
    if (curMonth < 10) { curMonth = '0' + curMonth; }

    let curDay = date.getUTCDate();
    if (curDay < 10) { curDay = '0' + curDay; }

    let curHour = date.getUTCHours();
    if (curHour < 10) { curHour = '0' + curHour; }

    let curMin = date.getUTCMinutes();
    if (curMin < 10) { curMin = '0' + curMin; }

    let curSec = date.getUTCSeconds();
    if (curSec < 10) { curSec = '0' + curSec; }

    let curMs = '';
    if (ms === true) {
        curMs = date.getUTCMilliseconds();
        if (sp !== '') {
        curMs = '.' + curMs;
        }
    }

    const curYear = date.getUTCFullYear();

    switch (sp) {
    case '':
        return `${curYear}${curMonth}${curDay}${curHour}${curMin}${curSec}${curMs}`;
    case 'ISO':
        return `${curYear}-${curMonth}-${curDay}T${curHour}:${curMin}:${curSec}${curMs}Z`;
    default:
        return `${curYear}${sp}${curMonth}${sp}${curDay} ${curHour}:${curMin}:${curSec}${curMs}`;
    }
}

  
/**
 * 格式化日期字符串,UTC时间
 * @param {Date} dateObj Date 对象 或者 时间戳
 * @param {String} fmt 格式化字符串 默认 'yyyy-MM-dd hh:mm:ss'
 * @returns {String}
 */
function dateFormatISO ( dateObj = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss' ) {
    if ( dateObj instanceof Date === false ) {
        dateObj = new Date( dateObj );
    }

    if ( fmt === 'yyyy-MM-dd hh:mm:ss' ) {
        return getISODateTimeString( dateObj, false, '-' );
    } else if ( fmt === 'yyyy-MM-dd' ) {
        return getISODateString( dateObj );
    }

    const o = {
        'M+': dateObj.getUTCMonth() + 1, // 月份
        'd+': dateObj.getUTCDate(), // 日
        'h+': dateObj.getUTCHours(), // 小时
        'm+': dateObj.getUTCMinutes(), // 分
        's+': dateObj.getUTCSeconds(), // 秒
        'q+': Math.floor( ( dateObj.getUTCMonth() + 3 ) / 3 ), // 季度
        S: dateObj.getUTCMilliseconds(), // 毫秒
    };

    let reY = fmt.match(/(y+)/);
    if(reY !== null) {
        fmt = fmt.replace( reY[1],
            ( dateObj.getFullYear() + '' ).substring( 4 - reY[1].length )
        );
    }
    for ( const k in o ) {
        const re = new RegExp( '(' + k + ')' );
        let m = fmt.match(re);
        if( m !== null ) {
            fmt = fmt.replace( m[1],
                m[1].length === 1 ? o[k] : ( '00' + o[k] ).substring( ( '' + o[k] ).length )
            );
        }
    }
    return fmt;
}
  
  
/**
 * 格式化日期字符串,UTC时间
 * @param {boolean} isUtc utc is true
 * @param {Date} dateObj Date 对象 或者 时间戳
 * @param {String} fmt 格式化字符串 默认 'yyyy-MM-dd hh:mm:ss'
 * @returns {String}
 */
function dateFormatT ( isUtc, dateObj = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss' ) {
    if ( isUtc === true ) {
        return dateFormatISO( dateObj, fmt );
    }

    return dateFormat( dateObj, fmt );
}

function conv2Ms(timestamp) {  
  // 假设基于秒的时间戳是从1970年1月1日开始的秒数  
  const secondsInYear = 31536000; // 一年的秒数  
  const maxTimestampInSeconds = secondsInYear * 50; // 假设一个基于秒的时间戳不会超过50年  
  
  // 检查时间戳是否在基于秒的合理范围内  
  if (timestamp <= maxTimestampInSeconds) {  
    return timestamp * 1000;  
  } else {
    return timestamp;
  }
}

/**
 * 
 * @param {string} ele - 元素id
 */
function copyValue( eleId ) {
  let copyText = document.getElementById(eleId).innerText;
  navigator.clipboard.writeText(copyText).then(function() {
    console.log('已复制到剪贴板: ', copyText);
  }).catch(function(err) {
      console.error('Could not copy text: ', err);
  });
}

function getGithubProxy() {
  let v = localStorage.getItem('githubProxy');
  if( v === null ) { 
    v = 'https://mirror.ghproxy.com/';
    localStorage.setItem('githubProxy', v);
  }
  return v;
}

function setGithubProxy( proxyUrl) {
  localStorage.setItem('githubProxy', proxyUrl);
  alert('设置成功')
}

/**
 * 打开web页面
 * 
 * @param {string} url 页面的 url
 */
function openWebPage(url) {
  chrome.tabs.query({}, function(tabs) {
      // 检查是否已经打开了目标网址的标签页
      const existingTab = tabs.find(tab => tab.url === url);
  
      if (existingTab) {
        // 如果已经打开了，激活该标签页
        chrome.tabs.update(existingTab.id, { active: true });
      } else {
        // 如果没有打开，创建新的标签页
        chrome.tabs.create({ url: url });
      }
    });
}