function combinationSum2(candidates: number[], target: number): number[][] {
    // 递归
    // 思路为从candidates中过滤target小的值, 将target减去candidates任意一个值后, 传入新combinationSum中, 得到子结果

    // 在39题基础上添加缓存
    let cacheMap = new Map<string, number[][]>()

    function getKey(inputNumList: number[], remainTarget: number) {
        return `inputNumList:${[...inputNumList].sort().join(',')},remainTarget:${remainTarget}`
    }

    function generate(inputNumList: number[], remainTarget: number) {
        if (remainTarget === 0) {
            return []
        }
        let key = getKey(inputNumList, remainTarget)
        if (cacheMap.has(key)) {
            return cacheMap.get(key)
        }
        let resultMap = new Map<string, number[]>()
        for (let pos = 0; pos < inputNumList.length; pos = pos + 1) {
            let num = inputNumList[pos]
            let remainInputNumList = [...inputNumList.slice(0, pos), ...inputNumList.slice(pos + 1)]
            if (num === remainTarget) {
                resultMap.set(JSON.stringify([num]), [num])
            } else if (num > remainTarget) {
                continue
            } else {
                // 小于
                let subAnswerList = generate(remainInputNumList, remainTarget - num)
                if (subAnswerList.length > 0) {
                    for (let subAnswer of subAnswerList) {
                        resultMap.set(JSON.stringify([num, ...subAnswer].sort()), [num, ...subAnswer])
                    }
                }
            }
        }
        // 记录结果
        cacheMap.set(key, [...resultMap.values()])
        return [...resultMap.values()]
    }

    return generate(candidates, target)
}

// console.log(combinationSum2([1, 1, 1, 1, 1, 1, 1, 1], 6))
