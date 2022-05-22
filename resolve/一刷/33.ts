function search(nums: number[], target: number): number {
  function findReverseAtIndex(
    checkList: number[],
    startIndex: number,
    endIndex: number
  ): number {
    if (checkList[startIndex] < checkList[endIndex]) {
      return -1;
    }
    if (endIndex - startIndex === 0) {
      return startIndex;
    }
    if (endIndex - startIndex === 1) {
      if (checkList[startIndex] > checkList[startIndex + 1]) {
        // 返回最后一个地址
        return startIndex;
      }
      return -1;
    }

    if (checkList[startIndex] > checkList[endIndex]) {
      // 应该是从小到大, 从大到小, 说明这中间发生过旋转
      let splitIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
      if (checkList[startIndex] > checkList[splitIndex]) {
        return findReverseAtIndex(checkList, startIndex, splitIndex);
      } else {
        return findReverseAtIndex(checkList, splitIndex, endIndex);
      }
    } else {
      return -1;
    }
  }
  let reverseIndexAt = findReverseAtIndex(nums, 0, nums.length - 1);

  let trueList = [
    ...nums.slice(reverseIndexAt + 1, nums.length),
    ...nums.slice(0, reverseIndexAt + 1),
  ];

  function find(
    checkList: number[],
    startIndex: number,
    endIndex: number
  ): number {
    if (endIndex - startIndex <= 3) {
      if (checkList[startIndex] === target) {
        return startIndex;
      }
      if (checkList[startIndex + 1] === target) {
        return startIndex + 1;
      }
      if (checkList[startIndex + 2] === target) {
        return startIndex + 2;
      }
      if (checkList[startIndex + 3] === target) {
        return startIndex + 3;
      }
      return -1;
    }
    let splitIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
    if (checkList[splitIndex] === target) {
      return splitIndex;
    } else if (checkList[splitIndex] > target) {
      return find(checkList, startIndex, splitIndex);
    } else {
      return find(checkList, splitIndex, endIndex);
    }
  }
  let leftCheckList = nums.slice(0, reverseIndexAt + 1);
  let rightCheckList = nums.slice(reverseIndexAt + 1, nums.length);
  let leftCheckIndex = find(leftCheckList, 0, leftCheckList.length - 1);
  let rightCheckIndex = find(rightCheckList, 0, rightCheckList.length - 1);
  if (leftCheckIndex != -1) {
    return leftCheckIndex;
  }
  if (rightCheckIndex != -1) {
    return rightCheckIndex + leftCheckList.length;
  }
  return -1;
}
