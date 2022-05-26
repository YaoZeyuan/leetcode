function searchInsert(nums: number[], target: number): number {
    // 要求必须使用log(n)的算法
    // 那么一定利用二分查找, 找到一个位置, 要么等于target 要么 左侧小于target 且 右侧大于target

    let baseLength = nums.length
    baseLength = Math.floor(baseLength / 2)

    let checkPos = baseLength

    while (checkPos >= 0 && checkPos < nums.length) {
        // 下边三种情况都算找到结果
        // 相等
        if (nums[checkPos] === target) {
            return checkPos
        }
        if (nums[checkPos] < target && target < nums[checkPos + 1]) {
            return checkPos + 1
        }
        if (nums[checkPos - 1] < target && target < nums[checkPos]) {
            return checkPos
        }
        // 避免为0
        baseLength = Math.max(1, Math.floor(baseLength / 2))
        // 判断失效
        if (nums[checkPos] < target) {
            // 当前位置偏小, 向右挪
            checkPos = checkPos + baseLength
        } else {
            // 向左走
            checkPos = checkPos - baseLength
        }
    }

    if (checkPos < 0) {
        return 0
    } else {
        return nums.length
    }
}

// console.log(searchInsert([1, 3, 5], 2))
