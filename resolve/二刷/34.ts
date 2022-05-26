function searchRange(nums: number[], target: number): number[] {
    let startPos = -1
    let endPos = -1
    for (let index = 0; index < nums.length; index = index + 1) {
        if (nums[index] === target) {
            if (startPos === -1) {
                // 说明是第一次匹配
                startPos = index
            }
            if (nums[index + 1] !== target) {
                // 说明是最后一次匹配到
                endPos = index
                break
            }
        }
    }
    return [startPos, endPos]
}
