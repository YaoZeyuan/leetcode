function getPairPosList(targetStr = "()") {
  // 解析每一个匹配的()单元位置
  // 进行匹配, 记录每一对()的起始位置
  let checkStack = [];
  let pairPosList = [];
  for (let currentPos = 0; currentPos < targetStr.length; currentPos++) {
    let currentChar = targetStr[currentPos];
    if (currentChar === "(") {
      // 压栈
      checkStack.push(currentPos);
    } else {
      // 出栈
      let leftPos = checkStack.pop();
      let rightPos = currentPos;
      // 记到结果数组内
      pairPosList.push({
        leftPos,
        rightPos,
      });
    }
  }
  return pairPosList;
}

function generateList(n) {
  if (n <= 0) {
    return [];
  }
  if (n === 1) {
    return ["()"];
  }

  // 对于每一个匹配的()单元, 都只有在单元左边加(), 用括号包裹单元, 在单元右边加()三种可能

  let subList = generateList(n - 1);
  let resultList = [];
  for (let item of subList) {
    // 需要解析每一个匹配的()位置, 然后添加括号
    let pairPosList = getPairPosList(item);
    for (let pariPos of pairPosList) {
      let leftPos = pariPos.leftPos;
      let rightPos = pariPos.rightPos;
      resultList.push(
        // 左侧
        `${item.slice(0, leftPos)}()${item.slice(leftPos)}`,
        // 包裹
        `${item.slice(0, leftPos)}(${item.slice(
          leftPos,
          rightPos + 1
        )})${item.slice(rightPos + 1)}`,
        // 右侧
        `${item.slice(0, rightPos + 1)}()${item.slice(rightPos + 1)}`
      );
    }
  }
  return [...new Set(resultList).values()];
}

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  return generateList(n).sort();
};
