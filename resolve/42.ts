/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height: number[]) {
  // 本质上是一个寻找转折点的问题
  // 1. 遍历数组, 找到序数关系的转折点
  // 转折点 = 左侧为小于关系, 右侧为大于关系

  if (height.length <= 2) {
    // 小于2一定为0
    return 0;
  }

  // 1. 找到最左侧的从小于到大于的转折点

  /**
   * 1. 从左侧起, 找到第一个右边大于左边的节点
   * 2. 从右侧起, 找到第一个左边大于右边的节点
   * 3. 找到中间的突变节点(大于等于左边, 小于等于右边)
   * @param itemList
   */
  function findChangeIndex(itemList: number[]) {
    let firstItem = itemList[0];
    let lastItem = itemList[itemList.length - 1];
    // 第一个节点
    let firstChangeIndexAt = NaN;
    // 最后一个变化的节点
    let lastChangeIndexAt = NaN;
    // 期间变化的节点列表
    let changeIndexAtList = [];

    // 寻找第一个左侧变化节点
    for (let i = 1; i < itemList.length; i++) {
      let testItem = itemList[i];
      if (testItem >= firstItem) {
        firstItem = testItem;
        continue;
      }
      // 开始计算的位置
      firstChangeIndexAt = i - 1;
      break;
    }

    // 寻找最后一个右侧变化节点
    for (let i = itemList.length - 2; i > 0; i--) {
      let testItem = itemList[i];
      if (testItem >= lastItem) {
        lastItem = testItem;
        continue;
      }
      // 开始计算的位置
      lastChangeIndexAt = i + 1;
      break;
    }

    if (
      firstChangeIndexAt !== NaN &&
      lastChangeIndexAt !== NaN &&
      firstChangeIndexAt < lastChangeIndexAt
    ) {
      changeIndexAtList.push(firstChangeIndexAt);

      // 满足条件后, 查找里边的变化点(右边低于左边的点)
      // 从第二个值开始
      let lastSplitIndex = firstChangeIndexAt;
      let finalSplitIndex = lastChangeIndexAt;
      for (let i = firstChangeIndexAt + 1; i <= lastChangeIndexAt; i++) {
        let currentItem = itemList[i];
        let lastItem = itemList[i - 1];
        let nextItem = itemList[i + 1];

        let lastSplitItemHeight = itemList[lastSplitIndex];
        let finalSplitItemHeight = itemList[finalSplitIndex];

        if (lastItem === undefined || nextItem === undefined) {
          lastItem = -1;
          nextItem = -1;
          // continue;
        }
        // 寻找右边低于左边的点
        if (
          lastItem <= currentItem &&
          currentItem > nextItem &&
          (currentItem >= lastSplitItemHeight ||
            currentItem >= finalSplitItemHeight)
        ) {
          changeIndexAtList.push(i);
          lastSplitIndex = i;
        }
      }
    }

    let isChangeHappen = true;
    let newChangeIndexList = [];
    while (isChangeHappen) {
      // 本轮发生变动, 则再改为true
      isChangeHappen = false;
      newChangeIndexList = [changeIndexAtList[0]];

      for (let indexAt = 1; indexAt < changeIndexAtList.length - 1; indexAt++) {
        let leftCheckIndexAt = changeIndexAtList[indexAt - 1];
        let checkIndexAt = changeIndexAtList[indexAt];
        let rightCheckIndexAt = changeIndexAtList[indexAt + 1];

        let leftCheckPointHeight = itemList[leftCheckIndexAt];
        let currentPointHeight = itemList[checkIndexAt];
        let rightCheckPointHeight = itemList[rightCheckIndexAt];

        if (
          (leftCheckPointHeight < currentPointHeight ||
            currentPointHeight > rightCheckPointHeight) === true
        ) {
          // 变化点应至少大于左右一个变化点的高度
          newChangeIndexList.push(checkIndexAt);
          isChangeHappen = false;
        } else {
          // 否则记录该变化, 跳过此轮循环
          isChangeHappen = true;
          let sliceList = changeIndexAtList.slice(indexAt + 1);
          changeIndexAtList = [...newChangeIndexList, ...sliceList];
          break;
        }
      }
    }

    return {
      firstChangeIndexAt,
      changeIndexAtList,
    };
  }
  /**
   * 按index将数组切分为小数组
   * @param itemList
   * @param indexAtList
   */
  function splitByIndexList(itemList: number[], indexAtList: number[]) {
    let resultList = [];
    let startIndexAt = indexAtList[0];
    for (let i = 1; i < indexAtList.length; i++) {
      let endIndexAt = indexAtList[i];

      let targetList = itemList.slice(startIndexAt, endIndexAt + 1);
      resultList.push(targetList);
      startIndexAt = endIndexAt;
    }
    return resultList;
  }

  /**
   * 计算每个数组中的水容量
   * @param itemList
   */
  function computeContain(itemList: number[]) {
    // 水位取决于最短的那块板
    let waterHeight =
      itemList[0] < itemList[itemList.length - 1]
        ? itemList[0]
        : itemList[itemList.length - 1];

    let total = 0;
    for (let item of itemList) {
      let itemHeight = waterHeight - item;
      if (itemHeight < 0) {
        itemHeight = 0;
      }
      total += itemHeight;
    }
    return total;
  }

  // 拿到第一个点和后续所有变化点
  let { firstChangeIndexAt, changeIndexAtList } = findChangeIndex(height);
  if (firstChangeIndexAt === NaN || changeIndexAtList.length === 1) {
    return 0;
  }
  // 按changeIndexAtList将其切分为n个数组
  let resultList = splitByIndexList(height, changeIndexAtList);
  // 依次计算每个数组中可以容纳的水量
  let totalCoutain = 0;
  for (let result of resultList) {
    totalCoutain += computeContain(result);
  }
  return totalCoutain;
};

function testIt() {
  // let input = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
  // let input = [2,0,2];
  // let input = [5, 2, 1, 2, 1, 5];
  // let input = [5, 5, 1, 7, 1, 1, 5, 2, 7, 6];
  let input = [
    6,
    4,
    2,
    0,
    3,
    2,
    0,
    3,
    1,
    4,
    5,
    3,
    2,
    7,
    5,
    3,
    0,
    1,
    2,
    1,
    3,
    4,
    6,
    8,
    1,
    3,
  ];
  let result = trap(input);
  console.log("result =>", result);
}
testIt();
