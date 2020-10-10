function numDecodings(s: string): number {
  let cacheMap = new Map();
  let keyDict: { [key: string]: string } = {};

  // 生成26个字母对应表
  for (let i = 0; i < 26; i++) {
    keyDict[`${i + 1}`] = String.fromCharCode("A".charCodeAt(0) + i);
  }

  function getCodeCount(inputStr: string, encodeStr: string): void {
    switch (inputStr.length) {
      case 0:
        if (encodeStr !== "") {
          cacheMap.set(encodeStr, 1);
        }
        return;
      case 1:
        if (inputStr !== "0") {
          let lastChar = keyDict[inputStr];
          cacheMap.set(encodeStr + lastChar, 1);
          return;
        } else {
          if (encodeStr !== "") {
            cacheMap.set(encodeStr, 1);
          }
          return;
        }
    }

    let char_1 = inputStr.slice(0, 1);
    let char_1_remain = inputStr.slice(1);
    if (char_1 !== "0") {
      let char_1_at = keyDict[char_1];
      getCodeCount(char_1_remain, encodeStr + char_1_at);
    }

    let char_2 = inputStr.slice(0, 2);
    let char_2_remain = inputStr.slice(2);
    let char_2_at = keyDict[char_2];
    if (char_2_at !== undefined) {
      getCodeCount(char_2_remain, encodeStr + char_2_at);
    }
    return;
  }

  getCodeCount(s, "");
  return cacheMap.size;
}

let result91 = numDecodings("0123456789");
console.log("result91 =>", result91);
