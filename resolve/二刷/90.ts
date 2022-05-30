function subsetsWithDup(nums: number[]): number[][] {
    // 递归返回即可, 每一位数都分为: 有/无两种情况

    // 要求不能有重复的解
    function getKey(numList: number[]) {
        return JSON.stringify(numList.sort())
    }

    function generateList(rawInputList: number[]) {
        // 解除引用
        let inputList = [...rawInputList]
        if (inputList.length === 1) {
            return [[], [...inputList]]
        }
        // 对解集去重
        let map = new Map()
        // 否则, 取其一位
        let item = inputList.pop()

        let subResultList = generateList(inputList)

        for (let subList of subResultList) {
            map.set(getKey(subList), subList)
            map.set(getKey([item, ...subList]), [item, ...subList])
        }

        return [...map.values()]
    }

    return generateList(nums)
}
