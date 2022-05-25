function fourSum(nums: number[], target: number): number[][] {
  // 还是双指针法, 只不过前边要固定两个值

  function sorter(a: number, b: number) {
    return b - a;
  }

  // 先固定顺序, 从大到小排列
  nums.sort(sorter);

  // 三数字和, 没有则返回空列表
  function threeSum(inputNumList: number[], targetNum: number): number[][] {
    function getMatchList(startPos: number) {
      let remainCharList = inputNumList.slice(startPos + 1);
      if (remainCharList.length < 2) {
        return [];
      }
      let resultList: number[][] = [];
      let leftCheckPos = 0;
      let rightCheckPos = remainCharList.length - 1;

      let baseNum = inputNumList[startPos];
      while (leftCheckPos < rightCheckPos) {
        let leftCheckNum = remainCharList[leftCheckPos];
        let rightCheckNum = remainCharList[rightCheckPos];

        let checkResult = baseNum + leftCheckNum + rightCheckNum - targetNum;
        if (checkResult < 0) {
          // 偏小
          rightCheckPos = rightCheckPos - 1;
        } else if (checkResult === 0) {
          // 成功, 记录结果
          resultList.push([baseNum, leftCheckNum, rightCheckNum].sort(sorter));
          leftCheckPos = leftCheckPos + 1;
        } else {
          // 偏大
          leftCheckPos = leftCheckPos + 1;
        }
      }
      return resultList;
    }
    if (inputNumList.length < 3) {
      return [];
    }

    let threeResultList: number[][] = [];
    for (let pos = 0; pos < inputNumList.length; pos = pos + 1) {
      let checkResultList = getMatchList(pos);
      if (checkResultList.length > 0) {
        // 记录结果(后续统一进行去重)
        threeResultList = [...threeResultList, ...checkResultList];
      }
    }
    return threeResultList;
  }

  // 实际执行代码
  let fourResultMap: Map<string, number[]> = new Map();

  for (let pos = 0; pos < nums.length; pos = pos + 1) {
    let remainList = nums.slice(pos + 1);
    let baseNum = nums[pos];
    let remainValue = target - baseNum;

    // 开始执行三数匹配查询
    let threeAnswerList = threeSum(remainList, remainValue);
    for (let threeAnswer of threeAnswerList) {
      // 先排序再生成key, 方便去重
      let answerList = [baseNum, ...threeAnswer].sort(sorter);
      fourResultMap.set(JSON.stringify(answerList), answerList);
    }
  }
  return [...fourResultMap.values()];
}

// console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
