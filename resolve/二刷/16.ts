function threeSumClosest(nums: number[], target: number): number {
  // 最接近的三数, 基本思路和三数之和一致, 双指针
  // 2. 锁定一个数
  // 3. 左右分开寻找, 找到最接近的数

  let closestVal = undefined;
  // 1. 先排序
  nums.sort((a, b) => {
    return b - a;
  });

  // 获取最接近的值
  function getCloseValue(target: number, val1: number, val2: number) {
    if (val1 === undefined) {
      return val2;
    }
    if (val2 === undefined) {
      return val1;
    }

    if (Math.abs(val1 - target) > Math.abs(val2 - target)) {
      return val2;
    } else {
      return val1;
    }
  }

  // 然后编写检测函数

  function checkByPos(startPos) {
    let baseNum = nums[startPos];
    let remainList = nums.slice(startPos + 1);
    if (remainList.length < 2) {
      // 没有意义
      return;
    }

    let leftCheckPos = 0;
    let rightCheckPos = remainList.length - 1;

    // 循环一遍
    while (leftCheckPos < rightCheckPos) {
      let leftCheckNum = remainList[leftCheckPos];
      let rightCheckNum = remainList[rightCheckPos];

      let sumResult = baseNum + leftCheckNum + rightCheckNum;
      let checkResult = sumResult - target;

      if (checkResult < 0) {
        // 偏小
        rightCheckPos = rightCheckPos - 1;
        // 更新最接近的值
        closestVal = getCloseValue(target, closestVal, sumResult);
      } else if (checkResult === 0) {
        closestVal = sumResult;
        // 可以直接结束
        return;
      } else {
        // 偏大
        leftCheckPos = leftCheckPos + 1;
        // 更新最接近的值
        closestVal = getCloseValue(target, closestVal, sumResult);
      }
    }
    return;
  }

  for (let pos = 0; pos < nums.length; pos = pos + 1) {
    checkByPos(pos);
    // 若找到了匹配值, 直接返回
    if (closestVal === target) {
      return closestVal;
    }
  }
  return closestVal;
}

// console.log("threeSumClosest => ", threeSumClosest([-1, 2, -2, 1], 1));
