function subsets(nums: number[]): number[][] {
    let resultList = []
    function generateList(rawInputNumList: number[]) {
        // 解除引用关系
        let inputNumList = [...rawInputNumList]

        if (inputNumList.length === 0) {
            return [[]]
        } else if (inputNumList.length === 1) {
            return [[], [inputNumList[0]]]
        }
        let currentNum = inputNumList.shift()
        let subList = generateList(inputNumList)
        // 分为包含currentNum和不包含currentNum两种情况
        return [...subList, ...subList.map((item) => [currentNum, ...item])]
    }
    return generateList(nums)
}

console.log(subsets([1, 2, 3]))
