/**
 * 这个题非常坑, js的对象查找key的效率和Set比较非常低, 把Object换成Set后, 程序执行速度快了10倍 = =
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (nums.length < 3) {
    return []
  }

  nums = nums.sort()
  let number_map = {}
  let number_set = new Set()
  for (let num of nums) {

    if (number_map[num]) {
      number_map[num].push(num)
    } else {
      number_set.add(num)
      number_map[num] = [num]
    }
  }
  let result = {}
  let has_target_0 = false
  let is_length_less_3 = number_map[0] && number_map[0].length < 3
  for (let first_index = 0; first_index < nums.length; first_index++) {
    for (let second_index = first_index + 1; second_index < nums.length; second_index++) {
      let target = -(nums[first_index] + nums[second_index])
      if (nums[first_index] === nums[second_index] && 0 === target && number_set.has(target)) {
        if (is_length_less_3) {
          continue
        }
        if (has_target_0 === false) {
          result['0_0_0'] = [0, 0, 0]
        }
        has_target_0 = true
        continue
      }
      if (number_set.has(target)) {
        let first_number = nums[first_index]
        let second_number = nums[second_index]
        let target = (second_number + first_number)

        if (target === 0) {
          if (number_map[0].length < 3) {
            continue
          }
        } else {
          if (-target === first_number || -target === second_number) {
            if (number_map[-target].length < 2) {
              continue
            }
          }
        }
        let raw_json
        if (first_number < second_number) {
          let a = first_number
          first_number = second_number
          second_number = a
        }

        if (-target > second_number) {
          if (-target > first_number) {
            raw_json = [-target, first_number, second_number]
          } else {
            raw_json = [first_number, -target, second_number]
          }
        } else {
          raw_json = [first_number, second_number, -target]
        }

        result[raw_json.join('_')] = raw_json
      }
    }
  }
  return Object.values(result)
}