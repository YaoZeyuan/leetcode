function permute(nums: number[]): number[][] {
    // 其实是一个树遍历问题
    // 第一层为 n 中可能, 第二层n-1 , 该过程可以一直持续下去

    function generate(inputNumList: number[], prefixList: number[]): number[][] {
        let answerMap = new Map<string, number[]>()
        if (inputNumList.length === 0) {
            // 只有这一种情况
            return [prefixList]
        }
        // 大于1
        for (let index = 0; index < inputNumList.length; index = index + 1) {
            let currentNum = inputNumList[index]
            let remainList = [...inputNumList.slice(0, index), ...inputNumList.slice(index + 1)]
            let subAnswerList = generate(remainList, [...prefixList, currentNum])
            // 利用map自动去重
            for (let subAnswer of subAnswerList) {
                answerMap.set(JSON.stringify(subAnswer), subAnswer)
            }
        }
        return [...answerMap.values()]
    }

    return generate(nums, [])
}
