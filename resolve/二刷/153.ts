function findMin(nums: number[]): number {
    // 二分查找
    if (nums.length === 1) {
        return nums[0]
    }
    if (nums.length <= 3) {
        return Math.min(...nums)
    }
    let startPos = 0
    let endPos = nums.length - 1
    let midPos = Math.floor((endPos - startPos) / 2)

    let startPosNum = nums[startPos]
    let endPosNum = nums[endPos]
    let midPosNum = nums[midPos]

    // 核心是找到有序的区间
    if (startPosNum < endPosNum) {
        // 说明该段为有序区间, 直接返回首值即可
        return startPosNum
    }
    // 否则, 需要看从中间分开, 哪个区间是有序区间
    if (startPosNum < midPosNum) {
        return Math.min(startPosNum, findMin(nums.slice(midPos + 1)))
    } else if (midPosNum < endPosNum) {
        return Math.min(findMin(nums.slice(startPos, midPos)), midPosNum)
    } else {
        // 两侧都符合要求, 难以判断
        return Math.min(
            // 只能进一步向下递归查找
            startPosNum,
            findMin(nums.slice(startPos + 1, midPos)),
            midPosNum,
            findMin(nums.slice(midPos + 1)),
            endPosNum,
        )
    }
}

console.log(findMin([3, 4, 5, 1, 2]))
