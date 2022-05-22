/**
 * 在threeSum的基础上可以直接完成fourSum
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums, target) {
  if (nums.length < 3) {
    return []
  }

  let res = new Set()
  for (let base_item_index = 0; base_item_index < nums.length - 2; base_item_index++) {
    if (base_item_index === 0 || (base_item_index > 0 && nums[base_item_index] !== nums[base_item_index - 1])) {
      let smallest_item_index = base_item_index + 1
      let largest_item_index = nums.length - 1
      let sum = target - nums[base_item_index]
      while (smallest_item_index < largest_item_index) {
        // 分别从最大最小值中取值, 相加后检查有没有可以和sum中和的值
        if ((nums[smallest_item_index] + nums[largest_item_index]) === sum) {
          // 有, 就将结果添加到Set里(自动去重)
          res.add([nums[base_item_index], nums[smallest_item_index], nums[largest_item_index]].join('_'))

          // 跳过相同的值
          while (smallest_item_index < largest_item_index && nums[smallest_item_index] === nums[smallest_item_index + 1]) {
            smallest_item_index++
          }
          while (smallest_item_index < largest_item_index && nums[largest_item_index] === nums[largest_item_index - 1]) {
            largest_item_index--
          }
          // 最大值,最小值都往前移一位
          smallest_item_index++
          largest_item_index--
        } else {
          // 没找到, 比较结果
          if (nums[smallest_item_index] + nums[largest_item_index] < sum) {
            // 不够 => 弃掉当前最小值, 取剩余元素中的最小值
            smallest_item_index++
          } else {
            // 过大 => 弃掉当前最大值, 取剩余元素中的最大值
            largest_item_index--
          }
        }
      }
    }
  }
  let value_list = []
  res.forEach((item) => {value_list.push(item.split('_').map(char => {return parseInt(char)}))})
  return value_list
}

var fourSum = function (nums, target) {
  //  从小到大排序
  nums = nums.sort((a, b) => {return a - b})
  // debugger
  let result = new Set()
  for (let first_item_index = 0; first_item_index < nums.length; first_item_index++) {
    let new_target = target - nums[first_item_index]
    let new_nums = nums.slice(first_item_index + 1)
    let three_result_list = threeSum(new_nums, new_target)
    if (three_result_list.length > 0) {
      for(let three_result_item of three_result_list){
        let single_result_key = nums[first_item_index] + '_' + three_result_item.join('_')
        result.add(single_result_key)
      }
    }
  }
  let value_list = []
  result.forEach((item) => {value_list.push(item.split('_').map(char => {return parseInt(char)}))})
  return value_list
}
