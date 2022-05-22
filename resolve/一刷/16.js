/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  // 先排个序
  nums = nums.sort((a,b)=>{return a-b})
  let sum
  let max_close_sum
  let current_differ
  let min_differ = Number.MAX_SAFE_INTEGER
  for(let first_index = 0; first_index < nums.length - 2; first_index++){
    for(let second_index = first_index +1; second_index < nums.length - 1; second_index++){
      for(let three_index=second_index + 1; three_index < nums.length; three_index++){
        sum = nums[first_index] + nums[second_index] + nums[three_index]
        current_differ = Math.abs(target - sum)
        if(current_differ < min_differ){
          max_close_sum = sum
          min_differ = current_differ
        }
      }
    }
  }
  return max_close_sum
};