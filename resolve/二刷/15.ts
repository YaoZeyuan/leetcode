function threeSum(nums: number[]): number[][] {
  /**
   * 双指针法解题
   * 基本思路还是通过排序进行剪枝
   *
   * 1. 对nums进行从大到小排序
   * 2. 从最左侧起, 取nums中的一个数. 以该数右侧所有数字作为输入队列
   *    1.  若队列长度小于2, 则一定没有可选值, 直接略过
   *    2.  以两个指针, 从最左侧和最右侧起步. 若三数和大于0, 则将左侧数字右移动(调小), 若三数和小于0, 则将右侧数字左移(调大)
   *        1.  如果反过来,  若三数和大于0, 则将右侧数字向左移动, 会继续调大, 无法起到效果
   *    3.  若左右指针重合, 跳过该轮检测
   *    4.  若三数和等于0, 则将左侧数字右移动, 继续检测
   */

  // 先按从大到小进行排序
  nums.sort((a, b) => {
    return b - a;
  });

  let answerMap = new Map<string, number[]>();

  /**
   * 指定起始位置, 快速查找三数和
   */
  function generatePariList(startCheckPos = 0) {
    let remainList = nums.slice(startCheckPos + 1);
    let baseNum = nums[startCheckPos];
    if (remainList.length < 2) {
      return;
    }

    let leftCheckPos = 0;
    let rightCheckPos = remainList.length - 1;

    while (leftCheckPos < rightCheckPos) {
      let leftCheckNum = remainList[leftCheckPos];
      let rightCheckNum = remainList[rightCheckPos];

      let checkResult = baseNum + leftCheckNum + rightCheckNum;
      if (checkResult < 0) {
        // 偏小
        rightCheckPos = rightCheckPos - 1;
      } else if (checkResult === 0) {
        // 正好相等, 记录结果
        answerMap.set(
          JSON.stringify([baseNum, leftCheckNum, rightCheckNum].sort()),
          [baseNum, leftCheckNum, rightCheckNum].sort()
        );
        leftCheckPos = leftCheckPos + 1;
      } else {
        // 偏大
        leftCheckPos = leftCheckPos + 1;
      }
    }
    return;
  }
  // 进行检测
  for (let pos = 0; pos < nums.length; pos = pos + 1) {
    generatePariList(pos);
  }
  return [...answerMap.values()];
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
