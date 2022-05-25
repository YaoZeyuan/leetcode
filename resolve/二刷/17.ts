function letterCombinations(digits: string): string[] {
  if (digits.length === 0) {
    return [];
  }

  // 这里不会出现重复的情况
  const Const_Number_Char_Map = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };

  function trans(remainCharList: string[], parentList: string[] = []) {
    if (remainCharList.length === 0) {
      return;
    }
    let targetChar = remainCharList.shift();

    let targetList = Const_Number_Char_Map[targetChar];
    let newList = [];
    for (let item of parentList) {
      for (let newChar of targetList) {
        newList.push(`${item}${newChar}`);
      }
    }

    if (remainCharList.length === 0) {
      return newList;
    } else {
      return trans(remainCharList, newList);
    }
  }

  let resultList = trans(digits.split(""), [""]);
  return resultList;
}

// console.log(JSON.stringify(letterCombinations(""), null, 2));
