function longestPalindrome(s: string): string {
  // 先写工具函数
  // 1. 提供isPalindrome函数以判断是否为回文字符串
  // ----
  // 实际代码
  // 选择使用扩展中心算法
  // 思路:
  // 1. 从最左侧起
  // 2. 奇数回文长度 -> 选择一个字符作为中心
  //    2.1 向左向右进行扩展, 直到有一边抵达重点, 或两侧出现不一致的字符(表示回文结束)
  // 3. 偶数回文长度 -> 选择连续两个相同字符作为中心
  //    3.1 向左向右进行扩展, 直到有一边抵达重点, 或两侧出现不一致的字符(表示回文结束)
  // 3. 计算最长的回文字符
  function isPalindrome(s: string): boolean {
    return s === s.split("").reverse().join("");
  }

  /**
   * 从指定中心开始, 找到字符串范围内最长的字符串半径
   *
   */
  function getMaxPalindromeStrByCircleCenter(
    circleLeftPos: number,
    circleRightPos: number
  ) {
    // 扩展点位
    let nextLeftPos = circleLeftPos - 1;
    let nextRightPos = circleRightPos + 1;

    let needMoreCheckFlag = false;
    while (nextLeftPos >= 0 && nextRightPos < s.length) {
      if (s[nextLeftPos] === s[nextRightPos]) {
        // 相等, 可以继续向外扩展
        nextLeftPos = nextLeftPos - 1;
        nextRightPos = nextRightPos + 1;
        needMoreCheckFlag = true;
        continue;
      } else {
        // 不相等, 说明回文字符串已结束, 当前已是最大可能长度
        return s.slice(nextLeftPos + 1, nextRightPos - 1 + 1);
      }
    }
    if (needMoreCheckFlag) {
      return s.slice(nextLeftPos + 1, nextRightPos - 1 + 1);
    } else {
      return s.slice(circleLeftPos, circleRightPos + 1);
    }
  }

  // 长度小于2直接返回即可
  if (s.length < 2) {
    return s;
  }

  let maxLengthStr = "";
  for (let checkPos = 0; checkPos < s.length; checkPos++) {
    if (s[checkPos] === s[checkPos + 1]) {
      // 这时可以额外检测以双字符为中心的长度
      // 不用担心右侧溢出, 因为溢出后返回undefined, 会自动略过
      let doubleCenterStr = getMaxPalindromeStrByCircleCenter(
        checkPos,
        checkPos + 1
      );
      if (doubleCenterStr.length > maxLengthStr.length) {
        maxLengthStr = doubleCenterStr;
      }
    }
    // 检测普通情况
    let singleCenterStr = getMaxPalindromeStrByCircleCenter(checkPos, checkPos);
    if (singleCenterStr.length > maxLengthStr.length) {
      maxLengthStr = singleCenterStr;
    }
  }

  return maxLengthStr;
}
