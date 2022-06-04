function majorityElement(nums: number[]): number {
    let countSumMap = new Map<number, number>()
    for (let num of nums) {
        if (countSumMap.has(num)) {
            countSumMap.set(num, countSumMap.get(num) + 1)
        } else {
            countSumMap.set(num, 1)
        }
    }
    for (let key of countSumMap.keys()) {
        let count = countSumMap.get(key)
        if (count > Math.floor(nums.length / 2)) {
            return key
        }
    }
    // 异常情况
    return 0
}
