function climbStairs(n: number): number {
    // 动态规划
    let resultList = []
    for (let i = 0; i < n; i++) {
        if (i === 0) {
            // 规定
            resultList[i] = 1
        } else if (i === 1) {
            resultList[i] = 2
        } else {
            resultList[i] = resultList[i - 1] + resultList[i - 2]
        }
    }
    return resultList[resultList.length - 1]
}
