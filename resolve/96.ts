// 题目本质是卡特兰数
function numTrees(n: number): number {
  // 不存在该情况
  if (n < 1) {
    return 0;
  }

  function getCount(optionList: number[]) {
    switch (optionList.length) {
      case 0:
        // null 的情况
        return 1;
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 5;
    }

    let countSum = 0;
    for (let i = 0; i < optionList.length; i++) {
      let option = optionList[i];

      let leftOptionList = optionList.filter((item) => item < option);
      let rightOptionList = optionList.filter((item) => item > option);
      let leftCount = getCount(leftOptionList);
      let rightCount = getCount(rightOptionList);
      countSum += leftCount * rightCount;
    }
    return countSum;
  }
  let optionList = [];
  for (let i = 1; i <= n; i++) {
    optionList.push(i);
  }

  return getCount(optionList);
}

let result96 = numTrees(5);
console.log(result96);
