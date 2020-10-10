function numDecodings(s: string): number {
  let cacheMap: Map<string, Set<string>> = new Map();
  let keyDict: { [key: string]: string } = {};
  let callCounter = 0;

  // 生成26个字母对应表
  for (let i = 0; i < 26; i++) {
    keyDict[`${i + 1}`] = String.fromCharCode("A".charCodeAt(0) + i);
  }

  function getCodeCount(
    inputStr: string,
    encodeStrSet: Set<string> = new Set()
  ): Set<string> {
    callCounter++;

    console.log("inputStr =>", inputStr);
    console.log("inputStr.length =>", inputStr.length);
    if (cacheMap.has(inputStr)) {
      return cacheMap.get(inputStr) as Set<string>;
    }

    switch (inputStr.length) {
      case 0:
        return encodeStrSet;
      case 1:
        if (inputStr !== "0") {
          let lastChar = keyDict[inputStr];
          encodeStrSet.add(lastChar);
          return encodeStrSet;
        } else {
          return encodeStrSet;
        }
    }

    let char_1 = inputStr.slice(0, 1);
    let char_1_remain = inputStr.slice(1);
    let char_1_set: Set<string> = new Set();
    if (char_1 !== "0") {
      let char_1_at = keyDict[char_1];
      char_1_set = getCodeCount(char_1_remain);
      if (char_1_set.size > 0) {
        for (let encodeStr of char_1_set) {
          encodeStrSet.add(char_1_at + encodeStr);
        }
      } else {
        if (char_1_remain.length === 0) {
          encodeStrSet.add(char_1_at);
        } else {
          // 该分割方案不可行
        }
      }
    }

    let char_2 = inputStr.slice(0, 2);
    let char_2_remain = inputStr.slice(2);
    let char_2_at = keyDict[char_2];
    let char_2_set: Set<string> = new Set();
    if (char_2_at !== undefined) {
      char_2_set = getCodeCount(char_2_remain);
      if (char_2_set.size > 0) {
        for (let encodeStr of char_2_set) {
          encodeStrSet.add(char_2_at + encodeStr);
        }
      } else {
        if (char_2_remain.length === 0) {
          encodeStrSet.add(char_2_at);
        } else {
          // 该分割方案不可行
        }
      }
    }
    cacheMap.set(inputStr, encodeStrSet);

    return encodeStrSet;
  }

  let set = getCodeCount(s);
  console.log("callCounter => ", callCounter);
  return set.size;
}

let result91 = numDecodings("111111111111111111111111111111111111111111111");
console.log("result91 =>", result91);
