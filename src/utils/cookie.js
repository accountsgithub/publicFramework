// 获取cookie、
export const getCookie = cname => {
  let name = `${cname}=`
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}

// 设置cookie,增加到vue实例方便全局调用
export const setCookie = (cName, value, expiredays) => {
  const exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie =
    cName +
    '=' +
    escape(value) +
    (expiredays == null ? '' : ';expires=' + exdate.toGMTString()) //eslint-disable-line
}

// 删除cookie
export const delCookie = name => {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() //eslint-disable-line
  }
}
