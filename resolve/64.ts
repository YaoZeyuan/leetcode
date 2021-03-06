function minPathSum(grid: number[][]): number {
  let height = grid.length;
  let width = grid[0].length;
  let counter = 0;

  // 记录已获得结果, 避免重复计算
  let resultMap: Map<string, number> = new Map();

  // 按照x,y获取单位值
  function getXY(x: number, y: number) {
    return grid[y][x];
  }
  function getKey(x: number, y: number) {
    return `${x},${y}`;
  }

  function getMin(x: number, y: number, currentSum: number = 0): number {
    let key = getKey(x, y);
    if (resultMap.has(key)) {
      return resultMap.get(key) as number;
    }

    let hereValue = getXY(x, y);
    counter++;

    if (x === width - 1 && y === height - 1) {
      // 已经到底部了
      return hereValue;
    }
    if (x === width - 1) {
      // 已经到了最右侧, 无法继续向右移动
      return getMin(x, y + 1, 0) + hereValue;
    }
    if (y === height - 1) {
      // 已经到了最底侧, 无法继续向下移动
      return getMin(x + 1, y, 0) + hereValue;
    }

    let x_1 = getMin(x + 1, y, 0) + hereValue;
    let y_1 = getMin(x, y + 1, 0) + hereValue;

    let minValue = Math.min(x_1, y_1);

    return minValue;
  }

  for (let x = width - 1; x >= 0; x--) {
    for (let y = height - 1; y >= 0; y--) {
      let minXY = getMin(x, y, 0);
      let key = getKey(x, y);
    //   console.log(`(${x},${y}) min value => ${minXY}`);
      resultMap.set(key, minXY);
    }
  }

  let result = getMin(0, 0, 0);
  console.log("computer => ", counter);
  return result;
}

let result64 = minPathSum(
  //     [
  //   [1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // ]
  [
    [1, 4, 8, 6, 2, 2, 1, 7],
    [4, 7, 3, 1, 4, 5, 5, 1],
    [8, 8, 2, 1, 1, 8, 0, 1],
    [8, 9, 2, 9, 8, 0, 8, 9],
    [5, 7, 5, 7, 1, 8, 5, 5],
    [7, 0, 9, 4, 5, 6, 5, 6],
    [4, 9, 9, 7, 9, 1, 9, 0],
  ]
);
console.log(result64);
