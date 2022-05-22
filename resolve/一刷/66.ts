function plusOne(digits: number[]): number[] {
  // 最后一位数+1
  digits[digits.length - 1] = digits[digits.length - 1] + 1;

  // 依次检测进位情况
  let checkPos = digits.length - 1;
  while (checkPos > 0) {
    if (digits[checkPos] === 10) {
      digits[checkPos - 1] = digits[checkPos - 1] + 1;
      digits[checkPos] = 0;
      // 准备检查下一位
      checkPos = checkPos - 1;
    } else {
      // 没有进位, 直接返回即可
      return digits;
    }
  }
  // 检查最后一位
  if (digits[0] === 10) {
    digits[0] = 0;
    return [1, ...digits];
  } else {
    return digits;
  }
}
