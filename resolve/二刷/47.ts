function permuteUnique(nums: number[]): number[][] {
    if (nums.length === 0) {
        return [[]]
    }
    let answerMap = new Map<string, number[]>()

    for (let pos = 0; pos < nums.length; pos = pos + 1) {
        let currentNum = nums[pos]
        let remainList = [...nums.slice(0, pos), ...nums.slice(pos + 1)]

        let subAnswerList = permuteUnique(remainList)
        for (let subAnswer of subAnswerList) {
            answerMap.set(`${JSON.stringify([currentNum, ...subAnswer])}`, [currentNum, ...subAnswer])
        }
    }
    return [...answerMap.values()]
}

// console.log(permuteUnique([1]))
