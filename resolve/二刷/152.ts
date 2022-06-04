function maxProduct(nums: number[]): number {
    // @todo 这个没记住状态转移公式, 看答案后做出来的, 需要重做
    // 记录最大乘积和最小乘积
    // 特别注意: 只要求是子数组, 没说必须是连续的数列. 如果是连续数列, 该状态转移方程不成立
    // F_max(n) = Math.max(Math.max(F_max(n-1) * n, n), F_min(n -1) * n), 当n符号发生改变时, Math.max(F_max(n-1) * n, n)会清空历史值, 从而实现历史重置
    // F_min(n) = Math.min(F_min(n-1), F_max(n-1) * n, F_min(n-1) * n)
    // max = max(max, F_max(n)) => 历史上出现的最大值

    if (nums.length === 0) {
        return 0
    }

    let fMax: number[] = [nums[0]]
    let fMin: number[] = [nums[0]]
    let max = nums[0]

    for (let i = 1; i < nums.length; i++) {
        let currentNum = nums[i]
        fMax[i] = Math.max(currentNum, fMin[i - 1] * currentNum, fMax[i - 1] * currentNum)
        fMin[i] = Math.min(currentNum, fMin[i - 1] * currentNum, fMax[i - 1] * currentNum)
        max = Math.max(fMax[i], max)
    }
    return max
}

console.log(maxProduct([7, -2, -4]))
