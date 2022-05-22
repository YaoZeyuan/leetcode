function uniquePaths(m: number, n: number): number {
  let pathCounterMap: Map<string, number> = new Map();
  function getKey(x: number, y: number): string {
    return `${x},${y}`;
  }

  function getPathCount(x: number, y: number): number {
    let key = getKey(x, y);
    if (pathCounterMap.has(key)) {
      return pathCounterMap.get(key) as number;
    }

    if (x === m - 1) {
      // 已经到达最右侧
      return 1;
    }
    if (y === n - 1) {
      // 已经到达最左侧
      return 1;
    }

    return getPathCount(x + 1, y) + getPathCount(x, y + 1);
  }

  for (let x = m - 1; x >= 0; x--) {
    for (let y = n - 1; y >= 0; y--) {
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

let result62 = uniquePaths(3, 2);
console.log(result62);
