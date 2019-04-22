/* 首字母大写 */
export const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase())

/**
 * 生成下拉数据
 * @param labelProp String
 * @param valueProp String
 * @returns Object 下拉数据
 */
export const generatedOptions = (
  labelProp = 'label',
  valueProp = 'value'
) => originSource => {
  return Object.keys(originSource).map(key => ({
    [labelProp]: key,
    [valueProp]: originSource[key]
  }))
}

/**
 * 魔法值，神仙数字 映射成 人类能识别的字符串：）
 * @param key 需要映射的魔法值
 */
export const mappingValue = key => (source, mappingProp = 'label') => {
  const map = source.reduce((map, sourceTarget) => {
    map[sourceTarget.value] = sourceTarget[mappingProp]
    return map
  }, {})
  return map[key]
}

export const trim = str => {
  if (Object.prototype.toString.call(str) === '[object String]') {
    return str.trim()
  }
  return str
}

export const isObject = value => {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}

export const isArray = value => {
  const _isArray =
    Array.isArray ||
    (_arg => Object.prototype.toString.call(_arg) === '[object Array]')
  return _isArray(value)
}

export const isEmpty = value => {
  if (value === null || value === undefined) return true
  if (isObject(value)) return Object.keys(value).length === 0
  if (isArray(value)) return value.length === 0

  return false
}

export const isString = value => {
  return Object.prototype.toString.call(value) === '[object String]'
}

export const downloadFilesUrl = url => {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}
