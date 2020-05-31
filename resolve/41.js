/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  let item = 1;
  // 只处理正整数
  let positiveList = nums.filter((x) => x > 0);
  positiveList.sort((a, b) => a - b);
  console.log(positiveList.join(","));
  for (let num of positiveList) {
    if (item < num) {
      return item;
    } else {
      if (item <= num) {
        item++;
      }
    }
  }
  return item;
};

let result = firstMissingPositive([1, 1, 5, 2, 2, 4, 0]);
console.log("result =>", result);
