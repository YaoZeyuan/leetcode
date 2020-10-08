function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  let height = obstacleGrid.length;
  let width = obstacleGrid[0].length;

  let pathCounterMap: Map<string, number> = new Map();
  function getKey(x: number, y: number): string {
    return `${x},${y}`;
  }

  function getByXY(x: number, y: number): number {
    return obstacleGrid[y][x];
  }

  // 需要检查通往出口的路是不是被封死了
  // 封死则直接返回0. 未封死则可正常执行程序
  function checkIsLegal() {
    // 检查最后一层
    if (getByXY(width - 1, height - 1) === 1) {
      return true;
    }
    //
  }

  function getPathCount(x: number, y: number): number {
    let key = getKey(x, y);
    if (pathCounterMap.has(key)) {
      return pathCounterMap.get(key) as number;
    }
    let item = getByXY(x, y);
    if (item === 1) {
      // 此路不通
      return 0;
    }

    if (x === width - 1 && y === height - 1) {
      return 1;
    }
    if (x === width - 1) {
      // 已经到达最右侧
      return getPathCount(x, y + 1);
    }
    if (y === height - 1) {
      // 已经到达最左侧
      return getPathCount(x + 1, y);
    }

    return getPathCount(x + 1, y) + getPathCount(x, y + 1);
  }

  for (let x = width - 1; x >= 0; x--) {
    for (let y = height - 1; y >= 0; y--) {
      let minXY = getPathCount(x, y);
      let key = getKey(x, y);
      //   console.log(`(${x},${y}) min value => ${minXY}`);
      pathCounterMap.set(key, minXY);
    }
  }

  let key = getKey(0, 0);
  let result = pathCounterMap.get(key) as number;
  return result;
}

let result63 = uniquePathsWithObstacles([
  [0, 0, 0, 0, 1],
//   [0, 0, 0, 1, 1],
//   [0, 0, 0, 1, 0],
//   [0, 0, 0, 1, 0],
]);
console.log(result63);
