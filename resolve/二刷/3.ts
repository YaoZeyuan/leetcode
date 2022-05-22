function lengthOfLongestSubstring(s: string): number {
  // 思路
  // 若s.length === 0, 直接返回0即可
  // 使用滑动窗口法解题
  // 初始条件: startPos = 0, endPos = 0, currentCharMap = new Map<string, number>(首字符, 首字符出现位置)
  // 终止条件: endPos === s.length
  // 检查规则:
  // 1. 检查位于endPos + 1的字符是否出现在currentCharSet中
  // 1.1    若未出现, 则endPos + 1, 更新最长子字符串长度, 将新字符位置添加到currentCharMap中
  // 1.2    若已出现, 则将startPos更新为首字符出现位置+1, 若endPos小于startPos, 则更新endPos = startPos, 重新生成currentCharMap
  if (s.length === 0) {
    return 0;
  }
  let startPos = 0;
  let endPos = 0;
  let maxSubStringLength = 1; // 至少是当前字符
  let currentCharMap = new Map<string, number>();
  currentCharMap.set(s[startPos], startPos);

  while (endPos < s.length) {
    let nextChar = s[endPos + 1];
    if (nextChar === undefined) {
      // 已比较到最后, 可以直接返回
      return maxSubStringLength;
    }

    if (currentCharMap.has(nextChar)) {
      // 如果已经出现
      // 更新startPos位置
      startPos = currentCharMap.get(nextChar) + 1;
      if (endPos < startPos) {
        endPos = startPos;
      }
      // 重新生成新子串
      currentCharMap = new Map();
      for (let i = startPos; i <= endPos; i++) {
        // 这一路上一定没有重复子串
        currentCharMap.set(s[i], i);
      }
    } else {
      // 没有, 则扩展窗口
      endPos = endPos + 1;

      maxSubStringLength = Math.max(endPos - startPos + 1, maxSubStringLength);
      currentCharMap.set(nextChar, endPos);
    }
  }
  return maxSubStringLength;
}

// let result = lengthOfLongestSubstring("abcabcbb");
// console.log("result => ", result);
