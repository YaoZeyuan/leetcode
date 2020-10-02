function generateMatrix(n: number): number[][] {
  /**
   * 按x,y在result数组内设置值
   * @param x
   * @param y
   * @param val
   */
  function setResult(x: number, y: number, val: number) {
    result[y][x] = val;
  }
  let max = n * n;
  let MartixWidth = n;
  let MartixHeight = n;
  // 生成占位数组列表
  let result:number[][] = [];
  for (let i = 0; i < n; i++) {
    result.push([]);
  }

  // 开始填充
  let marginTop = 0;
  let marginBottom = 0;
  let marginLeft = 0;
  let marginRight = 0;
  let x = 0;
  let y = 0;
  let count = 1;

  while (count <= max) {
    // 先遍历填充顶边
    while (x < MartixWidth - marginRight) {
      setResult(x, y, count);
      x++;
      count++;
    }
    // 会多计算一次x和count, 在这里还原之
    x = x - 1;
    marginTop = marginTop + 1; // 顶部容积-1

    // 启动前日常监测
    if (count > max) {
      break;
    }

    // 再遍历填充右边
    y = y + 1; // 顶部已填充
    while (y < MartixHeight - marginBottom) {
      setResult(x, y, count);
      y++;
      count++;
    }
    y = y - 1;
    marginRight = marginRight + 1;

    // 启动前日常监测
    if (count > max) {
      break;
    }

    // 然后是下边
    x = x - 1; // 最右已填充
    while (0 + marginLeft - 1 < x) {
      setResult(x, y, count);
      x--;
      count++;
    }
    x = x + 1;
    marginBottom = marginBottom + 1;

    // 启动前日常监测
    if (count > max) {
      break;
    }

    // 最后是左边
    y = y - 1;
    while (0 + marginTop - 1 < y) {
      setResult(x, y, count);
      y--;
      count++;
    }
    y = y + 1;
    marginLeft = marginLeft + 1;

    //
    x = x + 1;
  }

  return result;
}

let result59 = generateMatrix(6);
for (let item of result59) {
  console.log(item.join("\t"));
}
