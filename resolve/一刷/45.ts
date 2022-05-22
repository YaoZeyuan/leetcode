function jump(nums: number[]): number {
  // 思路
  // 1. 步数为0
  // 1. 步数+1
  // 1. 获取第一个值
  // 2. 检查是否可以跳到终点
  // 3. 如果可以, 返回当前步数
  // 4. 如果不能到达终点, 寻找当前能触达区间中, 在触达点上, 能跳的最远的点
  // 2. 以该点为起始, 重复上诉流程
  // v2: 不能使用递归, 否则会溢出
  let initStep = 0;
  function checkNums(roadNumList: number[], currentStep = 0): number {
    if (roadNumList.length <= 1) {
      return 0;
    }

    currentStep = currentStep + 1;
    let currentCanReach = roadNumList[0];
    if (currentCanReach >= roadNumList.length - 1) {
      return currentStep;
    } else {
      // 寻找能触及的更远的点
      let maxIndexAt = 0;
      let maxJumpTo = 0;
      for (let i = 1; i <= currentCanReach; i++) {
        let thisCanReachAt = roadNumList[i] + i;
        if (thisCanReachAt > maxJumpTo) {
          maxJumpTo = thisCanReachAt;
          maxIndexAt = i;
        }
      }
      // maxIndexAt就是能跳的最远的
      let nextRoadList = roadNumList.splice(maxIndexAt);
      return checkNums(nextRoadList, currentStep);
    }
  }

  let isReachEnd = false;
  let currentStep = 0;
  let roadNumList = nums;
  while (isReachEnd === false) {
    if (roadNumList.length <= 1) {
      isReachEnd = true;
      continue;
    }

    currentStep = currentStep + 1;
    let currentCanReach = roadNumList[0];
    if (currentCanReach >= roadNumList.length - 1) {
      // 成功抵达终点
      isReachEnd = true;
      continue;
    } else {
      // 寻找能触及的更远的点
      let maxIndexAt = 0;
      let maxJumpTo = 0;
      for (let i = 1; i <= currentCanReach; i++) {
        let thisCanReachAt = roadNumList[i] + i;
        if (thisCanReachAt > maxJumpTo) {
          maxJumpTo = thisCanReachAt;
          maxIndexAt = i;
        }
      }
      // maxIndexAt就是能跳的最远的
      let nextRoadList = roadNumList.splice(maxIndexAt);
      roadNumList = nextRoadList;
      continue;
    }
  }

  return currentStep;
}

function test() {
  let inputList = [2];
  let step = jump(inputList);
  console.log("need jump =>", step);
}

test();
