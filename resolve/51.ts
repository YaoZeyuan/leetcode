function printQueenMap(checkBoard: string[][]) {
  for (let line of checkBoard) {
    console.log(line.join(" "));
  }
  console.log("---------------");
}

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n: number) {
  type Option = {
    x: number;
    y: number;
  };
  const Queen = "Q";
  const Holder = ".";
  /**
   * 生成n*n棋盘
   * @param n
   */
  function generateCheckerBoard(n: number) {
    let board = [];
    for (let i = 0; i < n; i++) {
      let line = [];
      for (let k = 0; k < n; k++) {
        line.push(Holder);
      }
      board.push(line);
    }
    return board;
  }
  /**
   * 将已有棋盘复制一份
   * @param checkBoard
   */
  function copyBoard(checkBoard: string[][]) {
    let other = [];
    for (let line of checkBoard) {
      let newLine = [];
      for (let item of line) {
        newLine.push(item);
      }
      other.push(newLine);
    }
    return other;
  }
  /**
   * 向棋盘x,y处放一个新棋盘
   * @param x
   * @param y
   * @param lastBoard
   */
  function addQueen(x: number, y: number, lastBoard: string[][]) {
    let board = copyBoard(lastBoard);
    board[x][y] = Queen;
    return board;
  }
  /**
   * 检查在x,y上加入Queen后, 棋局是否还成立
   * @param x
   * @param y
   * @param checkBoard
   */
  function checkIsLegal(x: number, y: number, checkBoard: string[][]) {
    // 检查行上有没有其他Queen
    for (let checkX = 0; checkX < n; checkX++) {
      if (checkX != x && checkBoard[checkX][y] === Queen) {
        return false;
      }
    }

    // 检查列上有没有其他Queen
    for (let checkY = 0; checkY < n; checkY++) {
      if (checkY != y && checkBoard[x][checkY] === Queen) {
        return false;
      }
    }
    // 检查对角线上有没有其他Queen
    // 从左到右
    for (let checkX = x, checkY = y; checkX >= 0 && checkY >= 0; ) {
      if (checkX !== x && checkY !== y) {
        if (checkBoard[checkX][checkY] === Queen) {
          return false;
        }
      }
      checkX--;
      checkY--;
    }
    for (let checkX = x, checkY = y; checkX < n && checkY < n; ) {
      if (checkX !== x && checkY !== y) {
        if (checkBoard[checkX][checkY] === Queen) {
          return false;
        }
      }
      checkX++;
      checkY++;
    }
    // 从右到左
    for (let checkX = x, checkY = y; checkX < n && checkY >= 0; ) {
      if (checkX !== x && checkY !== y) {
        if (checkBoard[checkX][checkY] === Queen) {
          return false;
        }
      }
      checkX++;
      checkY--;
    }
    for (let checkX = x, checkY = y; checkX >= 0 && checkY < n; ) {
      if (checkX !== x && checkY !== y) {
        if (checkBoard[checkX][checkY] === Queen) {
          return false;
        }
      }
      checkX--;
      checkY++;
    }
    return true;
  }

  /**
   * 生成在x,y放置一个新皇后后, 可供选择的选项列表
   */
  function getLegalChooseOptionListAfterXY(
    x: number,
    y: number,
    lastOptionList: Option[]
  ) {
    // 首先过滤掉横轴纵轴上的所有点
    let remainOptionList = lastOptionList.filter(
      (item) => item.x !== x && item.y !== y
    );
    // 然后过滤掉对角线上的所有点
    remainOptionList = remainOptionList.filter(
      (item) => Math.abs(item.x - x) !== Math.abs(item.y - y)
    );
    return remainOptionList;
  }
  /**
   * 生成初始的选项列表
   * @param n
   */
  function generateInitOptionList(n: number) {
    let optionList: Option[] = [];
    for (let x = 0; x < n ; x++) {
      for (let y = 0; y < n; y++) {
        optionList.push({
          x,
          y,
        });
      }
    }
    return optionList;
  }

  /**
   * 在全局记录所有合法的board结果
   */
  let gloablResultList = [];
  let gloablCheckedOptionSet: Set<string> = new Set();
  let globalTryCounter = 0;
  let globalSkipCounter = 0;

  function optionList2Str(optionList: string[]) {
    return optionList.join(",");
  }

  function tryIt(
    currentBoard: string[][],
    currentDepth = n,
    remainOptionList: Option[] = [],
    chooseOptionList: string[] = []
  ) {
    if (currentDepth > n) {
      // 成功抵达终点
      gloablResultList.push(currentBoard);

      gloablCheckedOptionSet.add(optionList2Str(chooseOptionList));
      return;
    }
    if (remainOptionList.length === 0) {
      // 没有继续尝试的意义

      gloablCheckedOptionSet.add(optionList2Str(chooseOptionList));
      return;
    }

    // 否则, 继续向下探索
    for (let option of remainOptionList) {
      globalTryCounter++;

      let currentOptionList = [
        ...chooseOptionList,
        `${option.x}-${option.y}`,
      ].sort();
      let currentOptionListStr = optionList2Str(currentOptionList);
      if (gloablCheckedOptionSet.has(currentOptionListStr)) {
        // console.log("该组合已尝试过, 自动跳过");
        globalSkipCounter++;
        continue;
      }

      // 从可选项中获取一个值
      let isLegal = checkIsLegal(option.x, option.y, currentBoard);
      if (isLegal === false) {
        gloablCheckedOptionSet.add(currentOptionListStr);
        continue;
      }
      // 如果该位置可以放置皇后
      // 获取新的, optionList
      let newOptionList = getLegalChooseOptionListAfterXY(
        option.x,
        option.y,
        remainOptionList
      );
      // 复制当前面板
      let newBoard = copyBoard(currentBoard);
      newBoard = addQueen(option.x, option.y, newBoard);
      // 继续向下探索
      tryIt(newBoard, currentDepth + 1, newOptionList, currentOptionList);
    }
  }

  let board = generateCheckerBoard(n);
  let initOptionList = generateInitOptionList(n);

  tryIt(board, 1, initOptionList);
  console.log(`${globalSkipCounter}/${globalTryCounter}`);
  gloablResultList.map((item, index) => {
    console.log("index =>", index);
    printQueenMap(item);
  });
  let result = [];
  for (let solve of gloablResultList) {
    result.push(solve.map((item) => item.join("")));
  }
  return result;
};

solveNQueens(4);
