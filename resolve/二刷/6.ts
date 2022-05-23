// 基本思路
// 坐标转换
// 纵向行高: numRows
// 间隔行距离: numRows - 2
// 任务目标: 给出一个字符在字符串中的位置pos(一维)
// 转换为(x,y)坐标

function convert(s: string, numRows: number): string {
  if (numRows === 1) {
    return s;
  }
  // 当numRows大于1时, 主动生成二维数组, 进行排列
  // 初始化二维矩阵
  let martix: string[][] = [];
  for (let i = 0; i < numRows; i++) {
    // 生成足够宽的数组
    martix.push("".repeat(s.length).split(""));
  }
  // 将字符按x,y坐标放入坐标系中
  function putByXY(char: string, x: number, y: number) {
    martix[y][x] = char;
  }

  let currentX = 0;
  let currentY = 0;
  let currentArrow: "down" | "up" = "down"; // 当前方向: 向下
  // 开始向矩阵中填充字符串
  for (let pos = 0; pos < s.length; pos = pos + 1) {
    let targetChar = s[pos];

    putByXY(targetChar, currentX, currentY);
    if (currentArrow === "down") {
      currentY = currentY + 1;

      if (currentY === numRows) {
        // 抵达终点, 重置状态
        currentArrow = "up";
        currentY = currentY - 1 - 1; // 第一次-1恢复到边缘位置, 第二次-1为回到应处的位置, 将y值增加1换为y减少1, x加1
        currentX = currentX + 1;
      }
    } else {
      currentY = currentY - 1;
      currentX = currentX + 1;
      if (currentY === -1) {
        // 抵达重点, 重置状态
        currentArrow = "down";
        currentY = 1;
        currentX = currentX - 1;
      }
    }
  }
  console.log("martix => ", martix);
  let result = martix.map((row) => row.join("")).join("");
  return result;
}

// let testResult = convert("PAYPALISHIRING", 3);
// console.log(testResult);
