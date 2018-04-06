function redirect (n, remain_insert, parent_result = '') {
  if(n === 0){
    return [parent_result]
  }
  if(remain_insert === 0){
    return ['('.repeat(n) + parent_result + ')'.repeat(n)]
  }


  if(n === 0){
    return ['('.repeat(n) + parent_result + ')'.repeat(n)]
  }else{
    return redirect(n-1, )
  }

}


/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {



};