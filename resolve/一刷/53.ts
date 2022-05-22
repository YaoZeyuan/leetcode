function maxSubArray(nums: number[]): number {
  // 假设n,m为最大子序和
  // 那么这个子序的条件为: (0~n)和(m~+∞)区间中, 任意一端从子序边界向数组边界的子序和, 均小于0
  // 即: 补充该段子序, 不能让子序和增加

  // 求子序和, 第一步是合并, 将紧邻的非负数合并为一项, 将相邻负数合并为一项
  // 合并后状态一定为正负交替
  // 若正负之和大于0, 则亦应合并(吞噬成本小于负数成本)
  // 此时向哪侧合并的问题不成立. 因为, 如果合并后收益为正, 会重新出现合并case, 一直到满足最大子序和为止

  // 执行合并, 直到没有新合并发生, 此时最大的整数即为最大子序和(支持负数的情况)

  function baseMergeIt(inputNums: number[]) {
    // 处理特殊情况
    if (inputNums.length === 2) {
      let a = inputNums[0];
      let b = inputNums[1];
      if (a * b > 0) {
        return {
          mergedList: [a + b],
          hasMerge: true,
        };
      }
    }
    if (inputNums.length === 3) {
      let a = inputNums[0];
      let b = inputNums[1];
      let c = inputNums[2];
      if (a > 0 && c > 0) {
        if (a + b + c > a && a + b + c > c)
          return {
            mergedList: [a + b + c],
            hasMerge: true,
          };
      }
    }

    let mergedList = [];
    let hasMerge = false;
    let mergedAt = -1;

    // 先进行基础合并
    for (let index = 0; index < inputNums.length; index++) {
      let a = inputNums[index];
      let b = inputNums[index + 1];
      let c = inputNums[index + 2];

      mergedAt++;
      mergedList[mergedAt] = a;

      if (a !== undefined && b !== undefined) {
        // 符号相同, 直接合并
        let condition_1 = a * b > 0;
        // 有一项为0, 直接合并
        let condition_2 = a * b === 0;
        // 符号不同, 需要abc三项存在, 且三项和大于每一项的值, 才应该合并
        // let condition_3 =
        //   a > 0 && c > 0 && a + b + c > a && a + b + c > b && a + b + c > c;
        if (condition_1 || condition_2) {
          mergedList[mergedAt] = mergedList[mergedAt] + b;
          hasMerge = true;
          // 跳过b项
          index++;
          continue;
        }
      }
    }
    return {
      mergedList,
      hasMerge,
    };
  }

  function sumIt(inputList: number[], startAt: number, endAt: number) {
    let sum = 0;
    for (let index = startAt; index <= endAt; index++) {
      sum += inputList[index];
    }
    return sum;
  }
  /**
   * 针对大于3个的情况进行合并
   * @param inputNums
   */
  function plusMergeIt(inputNums: number[]) {
    // 处理特殊情况
    if (inputNums.length === 2) {
      let a = inputNums[0];
      let b = inputNums[1];
      if (a * b > 0) {
        return {
          mergedList: [a + b],
          hasMerge: true,
        };
      }
    }

    let mergedList = inputNums;
    let hasMerge = false;

    // 先从3个元素开始检查
    let checkLength = 3;
    while (checkLength <= mergedList.length) {
      let startIndexAt = 0;
      let endIndexAt = startIndexAt + checkLength - 1;
      while (endIndexAt < mergedList.length && startIndexAt < endIndexAt) {
        let rangeSum = sumIt(mergedList, startIndexAt, endIndexAt);
        let isMoreThanAll = true;
        for (let i = startIndexAt; i <= endIndexAt; i++) {
          if (mergedList[i] > rangeSum) {
            isMoreThanAll = false;
            break;
          }
        }

        if (isMoreThanAll === false) {
          // 继续检查下一个组合
          startIndexAt++;
          endIndexAt++;
        } else {
          // 进行合并操作
          mergedList = [
            ...mergedList.slice(0, startIndexAt),
            rangeSum,
            ...mergedList.slice(endIndexAt + 1),
          ];
          // 打印合并后数组
          console.log(mergedList.join(", "));
          // 有一个合并成功, 就返回
          return {
            mergedList,
            hasMerge: true,
          };
        }
      }
      checkLength = checkLength + 1;
    }

    return {
      mergedList,
      hasMerge,
    };
  }

  // 首先检测是不是全为负数的数组
  let isAllNegative = nums.filter((item) => item > 0).length === 0;

  let hasMerge = true;
  let mergedList = nums;
  console.log(mergedList.join(", "));
  if (isAllNegative === false) {
    while (hasMerge) {
      let result = baseMergeIt(mergedList);
      mergedList = result.mergedList;
      console.log(mergedList.join(", "));
      hasMerge = result.hasMerge;
    }
    hasMerge = true;
    while (hasMerge) {
      let result = plusMergeIt(mergedList);
      mergedList = result.mergedList;
      console.log(mergedList.join(", "));
      hasMerge = result.hasMerge;
    }
  }
  // 简单贪心算法对[-5, 8, -5, 2, -3, 14, -26]无效
  // 应该用复合贪心算法
  // 首先: 对数组长度的组合进行合并: 1次, 如果合并后结果大于每个值, 则合并之
  // 其次: 对数组长度的组合-1进行合并: 2次, 如果合并后结果大于每个值, 则合并之
  // 一直到数组长度组合为1的情况
  // 然后选出最大的数组

  // 在合并完成的基础上继续查找最大子序列

  let max = Number.MIN_SAFE_INTEGER;
  for (let item of mergedList) {
    if (item > max) {
      max = item;
    }
  }
  return max;
}

function test() {
  let a = [4,8,0,-2,5,2,-8,7,1,-4,4,8,-2,5,-5,-2,8];
  let result = maxSubArray(a);
  console.log(result);
}
test();
