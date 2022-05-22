function twoSum(nums: number[], target: number): number[] {
  // 解题思路
  // 1. 利用map, 建立num => index的数据库db
  let db = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    if (db.has(nums[i]) === false) {
      db.set(nums[i], i);
    }
  }
  // 2. 循环检查nums数组, 从第一个数num开始, 检查db中是否有 target - num
  // 2.1若存在, 返回num的下标和target-num的下标, 问题结束
  // 2.2若不存在, 检查下一个数字.
  // 3. 若完全不存在, 返回空数组
  for (let i = 0; i < nums.length; i++) {
    let checkNum = target - nums[i];

    if (db.has(checkNum)) {
      if (checkNum !== nums[i]) {
        return [i, db.get(checkNum)];
      } else {
        // 需要判断数组中有几个checkNum
        let firstPos = nums.indexOf(checkNum);
        let lastPos = nums.lastIndexOf(checkNum);
        if (firstPos === lastPos) {
          continue;
        } else {
          return [firstPos, lastPos];
        }
      }
    }
  }
  return [];
}

let final = twoSum([1, 2, 3, 6, 3], 6);
console.log("1111111");
console.log(final);
