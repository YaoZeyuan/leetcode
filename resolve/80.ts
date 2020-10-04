function removeDuplicates(nums: number[]): number {
  // 将数组向左缩减一位
  function move1Pos(pos: number) {
    for (let i = pos; i < nums.length - 1; i++) {
      nums[i] = nums[i + 1];
    }
    return;
  }
  let currentNumsLength = nums.length;
  let currentAt = 0;
  while (currentAt < currentNumsLength) {
    // 第一位不考虑
    if (currentAt === 0) {
      currentAt++;
    }
    if (currentAt < currentNumsLength - 1) {
      // 只在现有数组内进行比较
      // 如果有连续三位相等, 则数组整体左移一位
      if (
        nums[currentAt - 1] === nums[currentAt] &&
        nums[currentAt] === nums[currentAt + 1]
      ) {
        move1Pos(currentAt);
        currentNumsLength--;
        continue;
      }
    }
    // 检查无误, 直接后移
    currentAt++;
  }
  return currentNumsLength;
}
