function myAtoi(s: string): number {
  const Const_Max = Math.pow(2, 31) - 1;
  const Const_Min = 0 - Math.pow(2, 31);
  s = s.trim();

  // 第一步, 从字符串中抽取数字部分
  let rawCharList = s.split("");

  let isFlag = true;
  if (rawCharList[0] === "-") {
    isFlag = false;
    rawCharList.shift();
    if (Number.isNaN(parseInt(rawCharList[0]))) {
      // 如果后边紧跟着的不是数字, 则还是非法字符
      return 0;
    }
  } else if (rawCharList[0] === "+") {
    isFlag = true;
    rawCharList.shift();
    if (Number.isNaN(parseInt(rawCharList[0]))) {
      // 如果后边紧跟着的不是数字, 则还是非法字符
      return 0;
    }
  } else if (Number.isNaN(parseInt(rawCharList[0]))) {
    // 非法字符
    return 0;
  }
  let charList = [];

  // 过滤合法字符部分
  let checkIndex = 0;
  while (Number.isNaN(parseInt(rawCharList[checkIndex])) === false) {
    charList.push(rawCharList[checkIndex]);
    checkIndex = checkIndex + 1;
  }
  // 针对每一位进行转换
  let resultNum = 0;
  for (let index = 0; index < charList.length; index++) {
    let paddingNum = Math.pow(10, charList.length - index - 1);
    resultNum = resultNum + parseInt(charList[index]) * paddingNum;
  }
  if (isFlag === false) {
    resultNum = -resultNum;
  }
  // 避免数据溢出
  if (resultNum < Const_Min) {
    resultNum = Const_Min;
  }
  if (resultNum > Const_Max) {
    resultNum = Const_Max;
  }
  return resultNum;
}

// console.log(myAtoi("-4a2"));
