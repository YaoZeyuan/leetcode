function isPosSame (strs, pos) {
  let last_char = strs[0][pos]
  for(let str of strs){
    if(last_char !== str[pos] || last_char === undefined){
      return false
    }
  }
  return true
}

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  if(strs.length === 0){
    return ''
  }
  if(strs.length === 1){
    return strs[0]
  }
  let result = []

  for(let index = 0; isPosSame(strs, index); index++){
    result.push(strs[0][index])
  }
  return result.join('')
};