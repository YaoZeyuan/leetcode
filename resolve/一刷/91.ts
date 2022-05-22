function numDecodings(s: string): number {
  let cacheMap: Map<string, number> = new Map();
  let keyDict: { [key: string]: string } = {};
  let callCounter = 0;

  // 生成26个字母对应表
  for (let i = 0; i < 26; i++) {
    keyDict[`${i + 1}`] = String.fromCharCode("A".charCodeAt(0) + i);
  }

  function getCodeCount(inputStr: string): number {
    callCounter++;

    // console.log("inputStr =>", inputStr);
    // console.log("inputStr.length =>", inputStr.length);
    if (cacheMap.has(inputStr)) {
      return cacheMap.get(inputStr) as number;
    }

    switch (inputStr.length) {
      case 0:
        return 0;
      case 1:
        if (inputStr !== "0") {
          //   let lastChar = keyDict[inputStr];
          //   encodeStrSet.add(lastChar);
          return 1;
        } else {
          return 0;
        }
    }

    let char_1 = inputStr.slice(0, 1);
    let char_1_remain = inputStr.slice(1);
    let char_1_count = 0;
    if (char_1 !== "0") {
      char_1_count = getCodeCount(char_1_remain);
      if (char_1_count <= 0) {
        if (char_1_remain.length === 0) {
          char_1_count = 1;
        } else {
          // 该分割方案不可行
          char_1_count = 0;
        }
      }
    }

    let char_2 = inputStr.slice(0, 2);
    let char_2_remain = inputStr.slice(2);
    let char_2_at = keyDict[char_2];
    let char_2_count = 0;
    if (char_2_at !== undefined) {
      char_2_count = getCodeCount(char_2_remain);
      if (char_2_count <= 0) {
        if (char_2_remain.length === 0) {
          char_2_count = 1;
        } else {
          // 该分割方案不可行
          char_2_count = 0;
        }
      }
    }
    cacheMap.set(inputStr, char_1_count + char_2_count);

    return char_1_count + char_2_count;
  }

  let set = getCodeCount(s);
  console.log("callCounter => ", callCounter);
  return set;
}

let result91 = numDecodings(
  "111111111111111111111111111111111111111111111111111111111111111"
);
console.log("result91 =>", result91);

// ABBBBB
// ABBBBB
// AKAKA
// 1111111
// AKAKA
