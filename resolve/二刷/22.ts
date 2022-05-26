function generateParenthesis(n: number): string[] {
    // 每加入一个新括号, 意味着对于旧括号中的每一个单元, 都有 ()A , (A), A() 三种可能.
    // 所以分为两步:
    // 1. 当n === 1时, 结果只有() 一种可能
    // 2. 当n > 1时, 结果为针对f(n-1)的所有可能结果, 解析其中的()单元数, 然后进行添加
    // 结果需要去重

    if (n === 1) {
        return ['()']
    }

    let subList = generateParenthesis(n - 1)
    // 对于结果中的每一种情况, 都要寻找()的单元位置, 进行添加

    // 首先需要一个工具函数, 解析出指定字符串中, 所有匹配()的单元位置
    function getAllMatchPairPosPair(inputStr = '()') {
        let posStack = []
        let pariList: {
            left: number
            right: number
        }[] = []
        for (let pos = 0; pos < inputStr.length; pos = pos + 1) {
            if (inputStr[pos] === '(') {
                posStack.push(pos)
            } else {
                // 出栈
                let leftPos = posStack.pop()
                let rightPos = pos
                pariList.push({
                    left: leftPos,
                    right: rightPos,
                })
            }
        }
        return pariList
    }

    // 结果集
    let resultSet = new Set<string>()
    // 拿到所有单元位置后, 对每一个单元执行 ()A, (A), A() 操作
    for (let subStr of subList) {
        let posPariList = getAllMatchPairPosPair(subStr)
        for (let posPair of posPariList) {
            resultSet.add(`${subStr.slice(0, posPair.left)}()${subStr.slice(posPair.left, posPair.right)}${subStr.slice(posPair.right)}`)
            resultSet.add(`${subStr.slice(0, posPair.left)}(${subStr.slice(posPair.left, posPair.right)})${subStr.slice(posPair.right)}`)
            resultSet.add(`${subStr.slice(0, posPair.left)}${subStr.slice(posPair.left, posPair.right)}()${subStr.slice(posPair.right)}`)
        }
    }
    return [...resultSet.values()].sort()
}
