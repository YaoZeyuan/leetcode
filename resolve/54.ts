function spiralOrder(matrix: number[][]): number[] {
  // 实质上是每次周游一圈的问题
  // 周游完成后, 检测是否还有剩余空格未遍历
  // 如有, 传入四角坐标, 继续遍历
  // 若无. 返回结果

  /**
   * 通过函数实现get方法, 使xy符合直觉
   * @param x
   * @param y
   */
  function getFromMatrix(x: number, y: number) {
    return matrix[y][x];
  }

  /**
   * 遍历的起止位置, 包括该位置
   */
  function traversalBorder(
    startX: number,
    startY: number,
    endAtX: number,
    endAtY: number
  ) {
    let resultList: number[] = [];
    let x = startX;
    let y = startY;
    // 先遍历上边
    for (; x <= endAtX; x++) {
      let target = getFromMatrix(x, y);
      resultList.push(target);
    }
    // 由于判断时需要执行一次加法, x会多加一次, 这里移回来
    x = x - 1;
    // 然后是右边
    for (y = y + 1; y <= endAtY; y++) {
      let target = getFromMatrix(x, y);
      resultList.push(target);
    }
    // 由于判断时需要执行一次加法, y也会多加一次, 移回来
    y = y - 1;

    // 避免单行矩阵
    if (startY !== endAtY) {
      // 然后下方
      for (x = x - 1; x >= startX; x--) {
        let target = getFromMatrix(x, y);
        resultList.push(target);
      }
      // 由于判断时需要执行一次减法, x会多减一次, 这里移回来
      x = x + 1;
    }

    // 避免单列矩阵
    if (startX !== endAtX) {
      // 最后是上边, 此时第一行已被遍历, 不需要再来一遍, 因此额外加一
      for (y = y - 1; y >= startY + 1; y--) {
        let target = getFromMatrix(x, y);
        resultList.push(target);
      }
    }

    return resultList;
  }

  let startAtX = 0;
  let startAtY = 0;
  if (matrix[0] === undefined) {
    // 避免纯空数组
    return [];
  }

  let endAtX = matrix[0].length - 1;
  let endAtY = matrix.length - 1;

  let finalResultList: number[] = [];
  while (startAtX <= endAtX && startAtY <= endAtY) {
    let buf: number[] = traversalBorder(startAtX, startAtY, endAtX, endAtY);
    finalResultList = [...finalResultList, ...buf];
    if (startAtX <= endAtX) {
      startAtX++;
      endAtX--;
    }
    if (startAtY <= endAtY) {
      startAtY++;
      endAtY--;
    }
  }
  return finalResultList;
}

let result = spiralOrder([
  // [1, 2, 3, 4],
  // [5, 6, 7, 8],
  // [9, 10, 11, 12],
  // [ 1, 2, 3 ],
  // [ 4, 5, 6 ],
  // [ 7, 8, 9 ]
  // [1]
  // []
  // [1, 2, 3, 4],
  // [1],
  // [2],
  // [3],
  // [4],
  // 纯空数组也是一种输入
]);
console.log(" result =>", result);
