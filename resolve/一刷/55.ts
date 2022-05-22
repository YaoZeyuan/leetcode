function canJump(nums: number[]): boolean {
  // 0 肯定可以
  if (nums.length === 0) {
    return true;
  }

  let markList = [];
  let index = 0;
  while (index < nums.length) {
    let currentValue = nums[index];
    // 当前位置显然是可达的
    markList[index] = true;
    if (currentValue === 0) {
      // 若当前位置不能继续前进
      if (markList[index + 1] === true) {
        // 如果下个位置本身可达, 则直接步入下个位置
        index++;
        continue;
      } else {
        // 否则, 终止前进
        return markList[nums.length - 1] === true;
      }
    } else {
      // 将后续n个位置都标记为可达
      for (let reachAt = 0; reachAt <= currentValue; reachAt++) {
        markList[index + reachAt] = true;
      }
      index++;
      continue;
    }
  }

  // 返回最后一个位置是否可达
  return markList[nums.length - 1] === true;
}
