/**
 * 这个题没什么意义, 因为罗马数字不能跨位减, 所以可以考虑穷举出每一位的所有可能情况来强解
 * @param num
 * @return {*}
 */
function int2roman (num) {
  let M = ["", "M", "MM", "MMM"]
  let C = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"]
  let X = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"]
  let I = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]

  return M[Math.floor(num/1000)] + C[Math.floor((num%1000)/100)] + X[Math.floor((num%100)/10)] + I[num%10];
}