/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {
    // 手写一个冒泡排序
    if (nums.length < 2) {
        return
    }

    for (let startPos = 1; startPos < nums.length; startPos++) {
        for (let checkPos = startPos; checkPos > 0; checkPos--) {
            let a = nums[checkPos - 1]
            let b = nums[checkPos]
            if (a > b) {
                // 交换ab的位置
                ;[nums[checkPos], nums[checkPos - 1]] = [nums[checkPos - 1], nums[checkPos]]
            }
        }
    }
    return
}
