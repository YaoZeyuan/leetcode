/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  // 将nums1在$targetIndex后的数整体后移一位
  function move1Pos(startMoveAt: number) {
    let endMoveAt = nums1.length - 1;
    while (endMoveAt > startMoveAt) {
      nums1[endMoveAt] = nums1[endMoveAt - 1];
      endMoveAt--;
    }
  }
  let nums1_check_at = 0;
  let nums1_max_legal_at = m - 1;
  for (let item of nums2) {
    // 找到插入位点
    let nums1_check_item = nums1[nums1_check_at];
    while (item > nums1_check_item && nums1_check_at <= nums1_max_legal_at) {
      nums1_check_at++;
      nums1_check_item = nums1[nums1_check_at];
    }
    // 执行插入
    move1Pos(nums1_check_at);
    nums1[nums1_check_at] = item;
    nums1_max_legal_at++;
  }
}

let result88 = merge([-1, 0, 0, 3, 3, 3, 0, 0, 0], 6, [1, 2, 2], 3);
console.log(result88);
