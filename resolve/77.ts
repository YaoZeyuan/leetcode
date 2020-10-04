function combine(n: number, k: number): number[][] {
  // 不考虑这种情况
  if (k > n) {
    return [];
  }
  let resultSet: Set<number[]> = new Set();
  let resultKeySet: Set<string> = new Set();
  function generate(
    currentList: number[],
    chooseList: number[],
    remainPlace: number
  ) {
    if (remainPlace === 0) {
      let key = currentList.join(",");
      if (resultKeySet.has(key) === false) {
        resultSet.add(currentList);
        resultKeySet.add(key);
      }
      return;
    }
    for (let item of chooseList) {
      let newCurrentList = [...currentList, item];
      let newChooseList = chooseList.filter((num) => {
        return num > item;
      });
      generate(newCurrentList, newChooseList, remainPlace - 1);
    }
  }

  let chooseList: number[] = [];
  for (let i = 1; i <= n; i++) {
    chooseList.push(i);
  }
  generate([], chooseList, k);
  let result: number[][] = [];
  for (let item of resultSet) {
    result.push(item);
  }
  return result;
}
let result77 = combine(4, 2);
console.log(result77.length);
