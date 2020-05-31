/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  let map = [];
  // 将nums映射为数组
  for (let num of nums) {
    if (num > 0) {
      map[num] = 1;
    }
  }
  // 寻找数组中, 第一个未出现的整数index
  for (let i = 1; i < nums.length + 1; i++) {
    if (map[i] === undefined) {
      return i;
    }
  }
  return nums.length + 1;
};

let result = firstMissingPositive([1,1,1]);
console.log("result =>", result);
