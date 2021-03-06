function isNumber(s: string): boolean {
  let inputStr = s;
  // 剔除空格
  inputStr = inputStr.trim();
  // 先确保基本形式正确
  // 以下字符只能出现一次
  // -/+号可以出现两次, -3e-5
  // -/+号可以出现两次, +3e+5
  let onlyOnceCharList = ["e", "."];
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
  if (inputStr.replace(/^\+/, "").replace(/e\+/, "").includes("+")) {
    return false;
  }
  // 剔除e/+/-/.之后, 只应剩下数字
  if (
    inputStr
      .replace(/^\+/, "")
      .replace(/e\+/, "")
      .replace(/^-/, "")
      .replace(/e-/, "")
      .replace(/e/, "")
      .replace(/\./, "")
      .replace(/\d+/g, "").length > 0
  ) {
    return false;
  }

  // 可以开始正常处理了

  // 带e
  let case1 = /^(\+|-)?(\d+)?\.?\d+(e(-|\+)?\d+)$/.test(inputStr);
  // 带e且小数点后没数字
  let case2 = /^(\+|-)?(\d+)\.?(e(-|\+)?\d+)$/.test(inputStr);
  // 不带e
  let case3 = /^(\+|-)?(\d+)?\.?\d+$/.test(inputStr);
  // 不带ee且小数点后没数字
  let case4 = /^(\+|-)?(\d+)\.?$/.test(inputStr);
  if (case1 || case2 || case3 || case4) {
    return true;
  }
  return false;
}

let result65 = isNumber(
  // "123"
  //   "+1.1e23"
  //   ".0 "
  " 005047e+6"
);
console.log("result =>", result65);
