function partition(s: string): string[][] {
    // 通过递归解决
    // 1. 生成s所有可能分割
    // 2. 对于所有属于回文的分割, 拆分为两部分: 已分割部分, 剩余待分割部分
    // 3. 对待分割部分进行递归执行. 结果返回两个: 可能的分割结果 & 是否可以分割

    // 检查是否为回文字符串
    function isPartition(str: string) {
        return str === str.split('').reverse().join('')
    }

    // 生成回文切割方案
    function generateSolution(inputStr: string): {
        solutionList: string[][]
        isLegal: boolean
    } {
        if (inputStr === '') {
            return {
                solutionList: [[]],
                isLegal: true,
            }
        }
        if (inputStr.length === 1) {
            return {
                solutionList: [[inputStr]],
                isLegal: true,
            }
        }

        let answerList: string[][] = []

        for (let sliceAt = 1; sliceAt <= inputStr.length; sliceAt++) {
            let splitStr = inputStr.slice(0, sliceAt)
            if (isPartition(splitStr) === false) {
                // 该方案不可行
                continue
            }
            let remainStr = inputStr.slice(sliceAt)
            let subSolutionResult = generateSolution(remainStr)
            if (subSolutionResult.isLegal === false) {
                continue
            }
            // 说明方案可行
            for (let subSolution of subSolutionResult.solutionList) {
                answerList.push([splitStr, ...subSolution])
            }
        }
        if (answerList.length > 0) {
            return {
                isLegal: true,
                solutionList: answerList,
            }
        }
        return {
            solutionList: [],
            isLegal: false,
        }
    }

    let checkResult = generateSolution(s)
    return checkResult.solutionList
}

console.log(partition('1111111111111111'))
