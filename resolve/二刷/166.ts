// @todo 这个题是看答案写的
function fractionToDecimal(numerator: number, denominator: number): string {
    // 标记正负性
    let flag = (numerator > 0 && denominator > 0) || (numerator < 0 && denominator < 0)

    // 避免异常值
    if (numerator === 0) {
        return '0'
    }

    let result = ''
    if (flag === false) {
        result = '-'
    }
    // 转换值
    let absDenominator = Math.abs(denominator)
    let absNumerator = Math.abs(numerator)

    // 首先拿到整数部分
    let num_int = Math.trunc(absNumerator / absDenominator)

    result = `${result}${num_int}`

    // 然后计算小数部分

    let remainNum = absNumerator % absDenominator
    if (remainNum === 0) {
        // 没有小数部分, 直接返回
        return result
    }
    //  有小数部分
    result = result + '.'

    // 如果是无限循环小数, 则可以通过: 相同余数对应的值相同判断是否出现循环节
    // 如果是有限小数, 则余数最终会为0

    // 工具函数, 用于快速计算除法
    function getResultAndRemain(
        inputNum: number,
        denoNum: number,
    ): {
        result: number
        remain: number
    } {
        if (inputNum < denoNum) {
            return {
                result: 0,
                remain: inputNum,
            }
        }

        let remain = inputNum % denoNum
        let result = Math.trunc(inputNum / denoNum)
        return {
            result,
            remain,
        }
    }

    // 需要手算结果
    let decimalResultList: number[] = []
    let markResultList: string[] = []
    let remainMap = new Map()

    function warpIntoKey(remian: number, result: number) {
        return JSON.stringify({
            remian,
            result,
        })
    }

    let hasFindRepeat = false
    while (remainNum !== 0 && hasFindRepeat === false) {
        // 第一个结果
        let nextResult = getResultAndRemain(remainNum * 10, absDenominator)
        decimalResultList.push(nextResult.result)
        let warpKey = warpIntoKey(remainNum, nextResult.result)
        if (nextResult.remain === 0) {
            // 整除完成
            result = result + decimalResultList.join('')
            return result
        } else {
            // 需要记录余数和商的关系
            if (remainMap.has(remainNum)) {
                let oldResult = remainMap.get(remainNum)
                if (oldResult === nextResult.result) {
                    // 开始出现循环
                    // 找到循环节
                    let repeatStartAt = markResultList.indexOf(warpKey)

                    // 不重复的商列表
                    let answerList = decimalResultList.slice(0, repeatStartAt)
                    // 重复的商列表
                    let repeatAnswerList = decimalResultList.slice(repeatStartAt, decimalResultList.length - 1)
                    result = result + answerList.join('') + `(${repeatAnswerList.join('')})`
                    hasFindRepeat = true
                    return result
                } else {
                    // 否则, 尚未出现循环, 更新结果即可
                    remainMap.set(remainNum, nextResult.result)
                }
            } else {
                remainMap.set(remainNum, nextResult.result)
            }
            // 记录key
            markResultList.push(warpKey)

            // 更新剩余余数
            remainNum = nextResult.remain
        }
    }
}

// console.log(fractionToDecimal(-22, -2))
