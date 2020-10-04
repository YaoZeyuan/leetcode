function search(nums: number[], target: number): boolean {
  // 在存在重复值的情况下, 查找效率会劣化为o(n), 因此不如直接遍历查找
  return nums.includes(target);
}

let result81 = search([1, 3, 1, 1, 1], 3);
console.log("result81 => ", result81);
