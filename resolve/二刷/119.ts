// 和118一样
function getRow(rowIndex: number): number[] {
    let cacheMap = new Map<number, number[]>()
    cacheMap.set(1, [1])
    cacheMap.set(2, [1, 1])
    // 逐层生成
    function generateByLevel(level: number) {
        if (cacheMap.get(level)) {
            // 已经初始化了1/2的解
            return cacheMap.get(level)
        }
        let lastLevelList = generateByLevel(level - 1)
        let nextLevel = [1]
        for (let i = 0; i < lastLevelList.length - 1; i++) {
            let nextVal = lastLevelList[i] + lastLevelList[i + 1]
            nextLevel.push(nextVal)
        }
        nextLevel.push(1)
        cacheMap.set(level, nextLevel)
        return nextLevel
    }
    return generateByLevel(rowIndex +1)
}
