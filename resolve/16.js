/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let map = {}
  let index = 0
  for (let num of nums) {
    if (num in map) {
      if (target == num + num) {
        return [map[num], index]
      }
    }
    map[num] = index
    index = index + 1
  }
  for (let num of nums) {
    let other_num = target - num
    if ((other_num in map) && (map[other_num] != map[num])) {
      return [map[num], map[other_num]]
    }
  }
  return []
};


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {

  // 先算两个的
  for(let num of nums){

  }

};