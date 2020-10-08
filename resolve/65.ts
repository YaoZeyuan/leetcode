function isNumber(s: string): boolean {
  let inputStr = s;
  // 剔除空格
  inputStr = inputStr.replace(/\s/g, "");
  // 先确保基本形式正确
  // 以下字符只能出现一次
  // -号可以出现两次, -3e-5
  let onlyOnceCharList = ["e", "+", "."];
  for (let checkChar of onlyOnceCharList) {
    if (inputStr.split(checkChar).length > 2) {
      return false;
    }
  }
  // -号只能出现在开头/e后边
  if (inputStr.replace(/^-/, "").replace(/e-/, "").includes("-")) {
    return false;
  }
  // +号只能出现在开头
  if (inputStr.replace(/^\+/, "").includes("+")) {
    return false;
  }
  // 剔除e/+/-/.之后, 只应剩下数字
  if (
    inputStr
      .replace(/^\+/, "")
      .replace(/^-/, "")
      .replace(/e-/, "")
      .replace(/e/, "")
      .replace(/\./, "")
      .replace(/\d+/g, "").length > 0
  ) {
    return false;
  }

  // 可以开始正常处理了

  // 带e, 前缀带小数点
  let case1 = /^(\+|-)?\d+\.\d+(e-?\d+)$/.test(inputStr);
  // 带e, 前缀不带小数点
  let case2 = /^(\+|-)?\d+(e-?\d+)$/.test(inputStr);
  // 不带e
  let case3 = /^(\+|-)?(\d+)?\.?\d+$/.test(inputStr);
  if (case1 || case2 || case3) {
    return true;
  }
  return false;
}

let result65 = isNumber(
  // "123"
  //   "+1.1e23"
  ".0 "
);
console.log("result =>", result65);
