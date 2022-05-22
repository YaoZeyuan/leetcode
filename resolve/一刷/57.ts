function insert(intervals: number[][], newInterval: number[]): number[][] {
  // 将新元素直接插入旧列表中
  intervals.push(newInterval);
  // 然后重新进行排序
  let sortedList = intervals.sort((a, b) => {
    return a[0] - b[0];
  });

  // 则可复用第56题逻辑

  // 初始化结果数组
  let resultList: number[][] = [];
  for (let item of sortedList) {
    // 依次进行处理
    let startAt = item[0];
    let endAt = item[1];
    if (resultList.length === 0) {
      resultList.push(item);
      continue;
    }

    let checkItem = resultList.pop() as number[];
    let checkStartAt = checkItem[0];
    let checkEndAt = checkItem[1];
    // 由于是对已排序数组进行添加, 因此一定有 checkStartAt < startAt
    if (startAt <= checkEndAt) {
      let finalEndAt = Math.max(checkEndAt, endAt);
      // 进行融合处理
      let newItem = [checkStartAt, finalEndAt];
      resultList.push(newItem);
    } else {
      // 直接插入
      resultList.push(checkItem);
      resultList.push(item);
    }
  }

  return resultList;
}

let result57 = insert(
  // [
  //   [1, 3],
  //   [8, 10],
  //   [15, 18],
  //   [2, 6],
  // ]
  [
    [1, 3],
    [6, 9],
  ],
  [2, 5]
);
console.log("result => ", JSON.stringify(result57, null, 2));
