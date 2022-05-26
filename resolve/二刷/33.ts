function search(nums: number[], target: number): number {
    // 没规定非要用log(n)复杂度实现...
    for (let index = 0; index < nums.length; index = index + 1) {
        if (target === nums[index]) {
            return index
        }
    }
    return -1
}
