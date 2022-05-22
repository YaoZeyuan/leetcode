function subsetsWithDup(nums: number[]): number[][] {
  let resultSet: Set<number[]> = new Set();
  let resultKeySet: Set<string> = new Set();

  function generate(currentList: number[], chooseList: number[]) {
    if (chooseList.length === 0) {
      return;
    }
    for (let i = 0; i < chooseList.length; i++) {
      let item = chooseList[i];
      let newCurrentList = [...currentList, item];

      let key = newCurrentList.join(",");
      if (resultKeySet.has(key) === false) {
        resultSet.add(newCurrentList);
        resultKeySet.add(key);
      }

      let newChooseList = chooseList.slice(i + 1);
      generate(newCurrentList, newChooseList);
    }
  }
  generate([], nums.sort());
  let result: number[][] = [[]];
  for (let item of resultSet) {
    result.push(item);
  }
  return result;
}

let result90 = subsetsWithDup([4, 4, 4, 1, 4]);
// console.log(JSON.stringify(result90, null, 2));
console.log(result90.length);
