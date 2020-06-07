function maxSubArray(nums: number[]): number {
  // 假设n,m为最大子序和
  // 那么这个子序的条件为: (0~n)和(m~+∞)区间中, 任意一端从子序边界向数组边界的子序和, 均小于0
  // 即: 补充该段子序, 不能让子序和增加

  // 求子序和, 第一步是合并, 将紧邻的非负数合并为一项, 将相邻负数合并为一项
  // 合并后状态一定为正负交替
  // 若正负之和大于0, 则亦应合并(吞噬成本小于负数成本)
  // 此时向哪侧合并的问题不成立. 因为, 如果合并后收益为正, 会重新出现合并case, 一直到满足最大子序和为止

  // 执行合并, 直到没有新合并发生, 此时最大的整数即为最大子序和(支持负数的情况)

  function mergeIt(inputNums: number[]) {
    let mergedList = [];
    let hasMerge = false;
    let mergedAt = -1;
    for (let index = 0; index < inputNums.length; index++) {
      let a = inputNums[index];
      let b = inputNums[index + 1];

      mergedAt++;
      mergedList[mergedAt] = a;

      if (a !== undefined && b !== undefined) {
        // 符号相同, 直接合并
        let condition_1 = a * b > 0;
        // 符号不同, 需要第三项存在且大于0, 且两项和大于0, 才应该合并
        let condition_2 = inputNums[index + 2] > 0 && a + b > 0;
        if (condition_1 || condition_2) {
          mergedList[mergedAt] = mergedList[mergedAt] + b;
          hasMerge = true;
          // 跳过b项
          index++;
          continue;
        }
      }
    }
    return {
      mergedList,
      hasMerge,
    };
  }

  let hasMerge = true;
  let mergedList = nums;
  while (hasMerge) {
    let result = mergeIt(mergedList);
    mergedList = result.mergedList;
    hasMerge = result.hasMerge;
  }
  let max = Number.MIN_SAFE_INTEGER;
  for (let item of mergedList) {
    if (item > max) {
      max = item;
    }
  }
  return max;
}

function test() {
  let a = [0, -10000, 20, -19, 8, -7, 10, -8, 1];
  let result = maxSubArray(a);
  console.log(result);
}
