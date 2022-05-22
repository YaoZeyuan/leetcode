/**
 * 题目分析
 * 输入9x9数组
 * 需要测试每一种可能
 * 每输入一个数字, 检查当前是否符合规则.
 * 若符合, 则进入下一步
 * 不符合, 则跳过该数字
 */
// 循环到8,8为之
// 每次尝试一个数字
// 此处需要一个获取合法数字列表的函数
// 检测是否合法
// 如果合法, 递归插入下一个数字
// 不合法, 回退修改
// 先使用递归模式

/**
 * X最大值
 */
const MaxX = 9;
/**
 * y最大值
 */
const MaxY = 9;

/**
 * 占位符
 */
const Placeholder = ".";

const LegalSet = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);

const ModeBaseIndexAtX = {};
const ModeBaseIndexAtY = {};
// x . .
// . . .
// . . .
// 初始化X/Y对应模块的baseIndex值(x即为每个模块baseIndex的位置)
for (let x = 0; x < MaxX; x++) {
  ModeBaseIndexAtX[x] = Math.floor(x / 3);
}
for (let y = 0; y < MaxY; y++) {
  ModeBaseIndexAtY[y] = Math.floor(y / 3);
}

/**
 * 测试用
 * @param item
 */
function printIt(item: string[][]) {
  let result = "";
  for (let key of item) {
    result = result + key.join(" ") + "\n";
  }
  console.log(result);
}

/**
 Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board: string[][]): void {
  /**
   * 有一个算出来就可以
   */
  let isResolveFlag = false;
  /**
   * 最终结果
   */
  let realFinalResult: string[][];

  /**
   * 将board复制一份, 返回复制的元素. 方便修改
   * @param inputBoard
   */
  function copyItem(inputBoard: string[][]) {
    let bufItem: string[][] = [];
    let x = 0;
    for (let itemList of inputBoard) {
      bufItem[x] = [];
      let y = 0;
      for (let yItem of itemList) {
        bufItem[x][y] = inputBoard[x][y];
        y++;
      }
      x++;
    }
    return bufItem;
  }

  /**
   * 返回指定位置的可选参数列表
   * @param x
   * @param y
   * @param target
   */
  function generateOptionList(
    x: number,
    y: number,
    target: string[][]
  ): string[] {
    let 已出现元素集合 = new Set();
    // 检查本列
    for (let x_i = 0; x_i < MaxX; x_i++) {
      已出现元素集合.add(target[x_i][y]);
    }
    // 检查本行
    for (let y_i = 0; y_i < MaxY; y_i++) {
      已出现元素集合.add(target[x][y_i]);
    }
    // 检查本模块
    let baseX = ModeBaseIndexAtX[x];
    let baseY = ModeBaseIndexAtY[y];
    for (let x_i = baseX * 3; x_i < baseX * 3 + 3; x_i++) {
      for (let y_i = baseY * 3; y_i < baseY * 3 + 3; y_i++) {
        已出现元素集合.add(target[x_i][y_i]);
      }
    }

    // 肯定要删除 .
    已出现元素集合.delete(".");

    // 取所有没出现过的元素
    let result = [];
    for (let item of LegalSet.values()) {
      if (已出现元素集合.has(item) === false) {
        result.push(item);
      }
    }
    return result;
  }

  function testSolve(
    startX: number,
    startY: number,
    inputBoard: string[][],
    level: number = 0
  ): string[][] | false {
    // 先把原数组复制一份
    let newBoard = copyItem(inputBoard);
    let charAt = newBoard[startX][startY];
    if (charAt !== ".") {
      // 该值已填完了, 直接测试下一个值
      if (startY === 8 && startX === 8) {
        // 已抵达最后一个值, 该方案可行, 返回结果
        isResolveFlag = true;
        realFinalResult = copyItem(newBoard);
        return newBoard;
      }
      let test_result;
      if (startY < MaxY) {
        // 本轮循环没结束, y+1, 测试在该情况下, 下一个方案是否有可行值
        test_result = testSolve(startX, startY + 1, newBoard, level + 1);
      } else {
        // 前面已经检查过了x=8,y=8的情况, 所以不需要对该case进行特殊处理

        // 本轮循环已结束. 开始检查下一行, x+1, y置为0
        test_result = testSolve(startX + 1, 0, newBoard, level + 1);
      }
      return test_result;
    }
    // 没有填过, 看看有多少可能的值
    let optionList = generateOptionList(startX, startY, newBoard);
    if (optionList.length === 0) {
      // 一个都没有, 说明该方案无效, 直接返回false
      return false;
    }

    let counter = 0;
    // 有n个, 需要依次测试方案是否有效
    for (let testInput of optionList) {
      newBoard[startX][startY] = testInput;
      counter++;
      console.log(
        `第${level}层, ${startX},${startY}, input => ${testInput} 第${counter}/${optionList.length}次尝试`
      );
      console.log("当前可选结果=>", optionList.join(","));
      // 递归选择该值后, 后续是否存在基于该选择的解
      let test_result: boolean | string[][] = false;
      if (startY === 8 && startX === 8) {
        // 已抵达最后一个值, 该方案可行, 返回结果
        return newBoard;
      }

      // 检测后续是否有方案
      if (startY < MaxY) {
        // 本轮循环没结束, y+1, 测试在该情况下, 下一个方案是否有可行值
        test_result = testSolve(startX, startY + 1, newBoard, level + 1);
      } else {
        // 前面已经检查过了x=8,y=8的情况, 所以不需要对该case进行特殊处理

        // 本轮循环已结束. 开始检查下一行, x+1, y置为0
        test_result = testSolve(startX + 1, 0, newBoard, level + 1);
      }

      // 如果后续也能正常填充, 返回填充后结果
      if (test_result) {
        // 该方案成立, 返回新方案
        return test_result;
      } else {
        console.log(
          `[尝试失败, 向后回退]第${level}层, ${startX},${startY}, input => ${testInput} 第${counter}/${optionList.length}次尝试`
        );
        console.log("失败数独为=>");
        printIt(newBoard);
      }
      // 否则, 说明该方案不可行, 继续尝试下一个方案
    }
    // 所有方案测试完毕, 没有返回, 说明都不可行, 返回false
    return false;
  }

  let result = board;
  // 依次检测每一个值
  for (let x_i = 0; x_i < MaxX; x_i++) {
    for (let y_i = 0; y_i < MaxY; y_i++) {
      let charAt = result[x_i][y_i];
      if (charAt !== ".") {
        continue;
      }
      if (isResolveFlag) {
        // 已经验证出结果了, 跳过后续所有流程
        result = realFinalResult;
        continue;
      }

      let checkResult = testSolve(x_i, y_i, result);
      if (checkResult === false) {
        console.log(
          `第(${x_i},${y_i})个元素填充失败, 在当前配置下, 无法继续填充, 需要回退`
        );
        console.warn("不应该出现这种情况, 直接crash");
        console.log("当前数独为\n");
        printIt(result);
        return;
      } else {
        console.log(
          `第(${x_i},${y_i})个元素填充完毕, 填充值为${result[x_i][y_i]}`
        );
        printIt(checkResult);
        result = checkResult;
      }
      console.log("------------------------------");
    }
  }

  printIt(result);

  // 将结果同步到inputBoard
  for (let x_i = 0; x_i < MaxX; x_i++) {
    for (let y_i = 0; y_i < MaxY; y_i++) {
      board[x_i][y_i] = result[x_i][y_i];
    }
  }
};

// function test() {
//   let inputDemo = [
//     ["5", "3", ".", ".", "7", ".", ".", ".", "."],
//     ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//     [".", "9", "8", ".", ".", ".", ".", "6", "."],
//     ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//     ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//     ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//     [".", "6", ".", ".", ".", ".", "2", "8", "."],
//     [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//     [".", ".", ".", ".", "8", ".", ".", "7", "9"],
//   ];
//   solveSudoku(inputDemo);
// }

// test();
