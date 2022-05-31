function numTrees(n: number): number {
    // 同95题
    let cacheMap = new Map<number, number>()

    function getSubNum(inputNum: number) {
        if (inputNum === 0) {
            return 1
        }
        if (inputNum === 1) {
            return 1
        }
        if (cacheMap.has(inputNum)) {
            return cacheMap.get(inputNum)
        }
        let result = 0
        for (let i = 1; i <= inputNum; i++) {
            // 左侧树可能值(小于i的数之和) * 右侧树可能值(大于i的数之和)
            result = result + getSubNum(i - 1) * getSubNum(inputNum - i)
        }
        cacheMap.set(inputNum, result)
        return result
    }
    let result = getSubNum(n)
    return result
}

// console.log(numTrees(3))
