/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const left_small = '(';
  const right_small = ')';
  const left_middle = '[';
  const right_middle = ']';
  const left_large = '{';
  const right_large = '}';
  let stack = []
  let char_list = s.split('')
  for(let char of char_list){
    switch (char){
      case left_large:
        stack.push(left_large)
        break;
      case left_middle:
        stack.push(left_middle)
        break;
      case left_small:
        stack.push(left_small)
        break;
      case right_large:
        if(stack[stack.length - 1] !== left_large){
          return false
        }
        stack.pop()
        break;
      case right_middle:
        if(stack[stack.length - 1] !== left_middle){
          return false
        }
        stack.pop()
        break;
      case right_small:
        if(stack[stack.length - 1] !== left_small){
          return false
        }
        stack.pop()
        break;
    }
  }
    return stack.length === 0


};