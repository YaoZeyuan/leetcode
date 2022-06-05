function canCompleteCircuit(gas: number[], cost: number[]): number {
    const Const_Router_Length = gas.length

    // 从startAt处启动, 检查能否抵达startAt - 1的位置, 可以返回true, 不可以返回false
    function checkAt(startAt: number): boolean {
        let currentSize = 0
        let currentCheckAt = startAt
        while (currentCheckAt < Const_Router_Length) {
            currentSize = currentSize + gas[currentCheckAt]
            let nextCost = cost[currentCheckAt]
            if (currentSize < nextCost) {
                return false
            }
            // 减去前进后的消耗
            currentSize = currentSize - nextCost
            currentCheckAt++
        }
        // 抵达旅程终点后, 回到第一行进行检查
        currentCheckAt = 0
        while (currentCheckAt < startAt) {
            currentSize = currentSize + gas[currentCheckAt]
            let nextCost = cost[currentCheckAt]
            if (currentSize < nextCost) {
                return false
            }
            // 减去前进后的消耗
            currentSize = currentSize - nextCost
            currentCheckAt++
        }
        return true
    }

    for (let startAt = 0; startAt < Const_Router_Length; startAt++) {
        let checkResult = checkAt(startAt)
        if (checkResult) {
            return startAt
        }
    }
    return -1
}
