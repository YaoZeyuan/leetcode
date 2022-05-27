function jump(nums: number[]): number {
    // 初始化一个巨大值
    const Const_Jump_Overflow = 99999999999999999999
    // 问题分析:
    // 题目确保了一定可以跳到最后一个
    // 那么思考问题: 有没有一种情况, 必须经过A才能跳到x, 且之前每一步A3/A2/A1都必须是准确选择, 否则就无法跳转?
    // 并不存在, 因为如果可以从A2跳到A3, 则A3一定在A2的半径之内.
    // 因此可以考虑通过贪心算法解决问题, 每次尽可能跳的远 => 尽可能的含义指: 从a[0]开始, 选a[0]范围内能跳的最远的范围
    // 状态转移方程
    // Step[0] = 1
    // Step[i] = Min(
    // 如果有可以通过Step[i] - 1 位置+自身跳跃抵达改为值得点 + 1
    // )

    let minStepList = nums.map((item) => {
        return Const_Jump_Overflow
    })
    // 第一个点位是0, 不用跳
    minStepList[0] = 0

    // 开始构建step列表
    for (let index = 0; index < minStepList.length; index = index + 1) {
        let jumpRange = nums[index]
        for (let jumpOffset = 1; jumpOffset <= jumpRange && index + jumpOffset < minStepList.length; jumpOffset = jumpOffset + 1) {
            // 对每一步计算最小点位
            let updatePosAt = index + jumpOffset
            // 使用常量进行标记, 将来方便替换为nil
            if (minStepList[updatePosAt] === Const_Jump_Overflow) {
                minStepList[updatePosAt] = minStepList[index] + 1
            } else {
                minStepList[updatePosAt] = Math.min(minStepList[updatePosAt], minStepList[index] + 1)
            }
        }
    }
    return minStepList[minStepList.length - 1]
}

// console.log(jump([1, 5, 3, 4, 5]))
