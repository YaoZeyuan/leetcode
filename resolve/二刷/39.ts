function combinationSum(candidates: number[], target: number): number[][] {
    // 递归
    // 思路为从candidates中过滤target小的值, 将target减去candidates任意一个值后, 传入新combinationSum中, 得到子结果

    function generate(inputNumList: number[], remainTarget: number) {
        if (remainTarget === 0) {
            return []
        }
        let resultMap = new Map<string, number[]>()
        let resultList: number[][] = []
        for (let num of inputNumList) {
            if (num === remainTarget) {
                resultMap.set(JSON.stringify([num]), [num])
            } else if (num > remainTarget) {
                continue
            } else {
                // 小于
                let subAnswerList = generate(inputNumList, remainTarget - num)
                if (subAnswerList.length > 0) {
                    for (let subAnswer of subAnswerList) {
                        resultMap.set(JSON.stringify([num, ...subAnswer].sort()), [num, ...subAnswer])
                    }
                }
            }
        }
        return [...resultMap.values()]
    }

    return generate(candidates, target)
}

// console.log(combinationSum([1, 2, 3, 4, 5], 10))
