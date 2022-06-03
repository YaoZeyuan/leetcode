function longestConsecutive(nums: number[]): number {
    // key表示nums中出现的数, 值代表是否检查过 -> 检查过则不需要重复检查
    let hasCheckMap = {}
    // 可以只用一个变量记录结果, 但不容易维护. 因此改为map
    let maxLengthOfNum: { [key: string]: number } = {}

    for (let num of nums) {
        hasCheckMap[num] = false
    }
    // 开始检测
    for (let num of nums) {
        let maxStart = num
        let maxEnd = num

        // 这里如果发现值已经被check过, 其实可以略过后续所有探索. 节约运算量
        let hasCheckFlag = hasCheckMap[maxStart]
        if (hasCheckFlag) {
            continue
        }
        // 探索其最早和最晚的值
        while (hasCheckMap[maxStart] !== undefined && hasCheckFlag === false) {
            hasCheckFlag = hasCheckMap[maxStart]
            maxStart--
        }
        while (hasCheckMap[maxEnd] !== undefined && hasCheckFlag === false) {
            hasCheckFlag = hasCheckMap[maxEnd]
            maxEnd++
        }
        hasCheckMap[num] = true
        let result = maxEnd - 1 - (maxStart + 1) + 1
        maxLengthOfNum[num] = result
    }
    return Math.max(...Object.values(maxLengthOfNum), 0)
}

// console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))
