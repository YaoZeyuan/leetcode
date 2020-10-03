function getPermutation(n: number, k: number): string {
  function getFactorial(m: number) {
    let result = 1;
    while (m > 1) {
      result = result * m;
      m--;
    }
    return result;
  }

  // 返回可选择列表
  function getChooseList(m: number): number[] {
    let result = [];
    let i = 0;
    while (i < m) {
      i++;
      result.push(i);
    }
    return result;
  }

  // 题目核心是除法&取余问题
  let result = [];

  let chooseList = getChooseList(n);
  // 从k中获取对应的分组信息
  // 隶属的组别列表, 最后一组一定是第0组
  let groupIndexList = [];
  let currentGroupLevel = n;
  while (groupIndexList.length < n - 1) {
    // 获取当前单个分组的元素数量
    let groupSize = getFactorial(currentGroupLevel - 1);
    // k 除以单个组的元素数量, 就是第currentGroupLevel对应的组别
    let groupIndex = Math.floor((k - 1) / groupSize);
    groupIndexList.push(groupIndex);

    k = k - groupIndex * groupSize;
    currentGroupLevel--;
  }
  // 最后一组一定是第0组
  groupIndexList.push(0);
  let backupGroupIndexList = JSON.stringify(groupIndexList);
  let backupChooseList = JSON.stringify(chooseList);

  while (groupIndexList.length > 0) {
    let targetIndex = groupIndexList.splice(0, 1)[0];
    let target = chooseList[targetIndex];
    chooseList.splice(targetIndex, 1);
    result.push(target);
  }
  return result.join("");
}

let result60 = getPermutation(4, 2);
console.log("result60 =>", result60);
