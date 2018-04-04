/**
 * 这个题官方test case里没有考虑到1和0的情况: )
 * @type {{'1': Array, '2': string[], '3': string[], '4': string[], '5': string[], '6': string[], '7': string[], '8': string[], '9': string[], '0': Array}}
 */

let digit_map = {
  '1':[],
  '2':['a', 'b', 'c'],
  '3':['d', 'e', 'f'],
  '4':['g', 'h', 'i', ],
  '5':['j', 'k', 'l', ],
  '6':['m' , 'n', 'o', ],
  '7':['p', 'q', 'r', 's'],
  '8':['t', 'u', 'v'],
  '9':['w', 'x', 'y', 'z'],
  '0':[],

}

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  let str_list = digits.split('')
  let result = []
  while(str_list.length > 0){
    let char = str_list[0]
    str_list = str_list.slice(1)
    let char_map_list = digit_map[char]
    if(char_map_list.length === 0){
      continue
    }
    if(result.length === 0){
      result = char_map_list
    }else{
      let new_result = []
      for(let old_result_item of result){
        for(let char_item of char_map_list){
          new_result.push(old_result_item + char_item)
        }
      }
      result = new_result
    }
  }
  return result
};