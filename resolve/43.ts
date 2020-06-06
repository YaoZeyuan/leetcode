function multiply(num1: string, num2: string): string {
  if (num1 === "0" || num2 === "0") {
    return "0";
  }
  const A2IMap = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
  };

  /**
   * 字符乘字符串
   * @param char
   * @param str
   */
  function charMuiltStr(char: string, str: string, offset = 0): string {
    if (char === "0") {
      return "0";
    }
    let 进位 = 0;
    let result = "0".repeat(offset);
    let charInt = A2IMap[char];
    for (let i = 0; i < str.length; i++) {
      let muiltChar = str[str.length - i - 1];
      let muiltCharInt = A2IMap[muiltChar];
      let buf = muiltCharInt * charInt + 进位;
      result = `${buf % 10}${result}`;

      进位 = Math.floor(buf / 10);
    }
    if (进位 > 0) {
      result = `${进位}${result}`;
    }
    return result;
  }

  function strAdd(input1: string, input2: string): string {
    let maxLength =
      input1.length > input2.length ? input1.length : input2.length;
    let 进位 = 0;
    let result = "";
    for (let i = 0; i < maxLength; i++) {
      let int1 = input1[input1.length - i - 1]
        ? A2IMap[input1[input1.length - i - 1]]
        : 0;
      let int2 = input2[input2.length - i - 1]
        ? A2IMap[input2[input2.length - i - 1]]
        : 0;
      let buf = int1 + int2 + 进位;
      result = `${buf % 10}${result}`;
      进位 = Math.floor(buf / 10);
    }
    if (进位 > 0) {
      result = `${进位}${result}`;
    }
    return result;
  }

  let offset = 0;
  let finalResult = "0";
  for (let i = 0; i < num1.length; i++) {
    let num1Char = num1[num1.length - i - 1];
    let bufResult = charMuiltStr(num1Char, num2, offset);
    offset = offset + 1;
    finalResult = strAdd(bufResult, finalResult);
  }
  return finalResult;
}

function test() {
  let a = 89213702139n;
  let b = 89213702139n;
  let result = multiply(`${a}`, `${b}`);
  console.log("result = ", result);
  console.log("`${a * b}` = ", `${a * b}`);
  console.log("check = ", result === `${a * b}`);
}

test();
