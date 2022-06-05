function rob(nums: number[]): number {
    // 对于每一家, 都只有偷或者不偷两种可能.
    // 其中, 对于第F(n)家, 其最大收益为: Max( F(n)[不偷], F(n)[不偷] + n) 两种
    // F(n)[不偷] = Max( F(n-1)[偷], F(n-1)[不偷])
    type Type_Result = {
        tryResult: number
        notTryResult: number
    }
    let resultList: Type_Result[] = []

    for (let i = 0; i < nums.length; i++) {
        if (i === 0) {
            resultList.push({
                tryResult: nums[i],
                notTryResult: 0,
            })
            continue
        }
        let lastResult = resultList[resultList.length - 1]
        resultList.push({
            tryResult: lastResult.notTryResult + nums[i],
            notTryResult: Math.max(lastResult.notTryResult, lastResult.tryResult),
        })
    }

    let lastResult = resultList[resultList.length - 1]
    return Math.max(lastResult.notTryResult, lastResult.tryResult)
}

// console.log(rob([1, 2, 3, 1]))
