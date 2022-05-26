function divide(dividend: number, divisor: number): number {
    const Const_Min = -Math.pow(2, 31)
    const Const_Max = Math.pow(2, 31) - 1

    // 判断结果是否为正数
    let flag = (dividend > 0 && divisor > 0) || (dividend < 0 && divisor < 0)

    dividend = Math.abs(dividend)
    divisor = Math.abs(divisor)

    // 暴力解
    // let result = 0
    // let currentNum = divisor
    // while (dividend >= currentNum) {
    //     currentNum = currentNum + divisor
    //     result = result + 1
    // }

    // 需要实现一个快速除法

    // 工具函数: 乘以2
    function doubleIt(inputNum: number) {
        return inputNum + inputNum
    }

    // 快速除法的思路: 将除数每次乘以2, 从而快速接近结果

    //
    /**
     * 快速除法:
     * 以最快速度, 找到距离被除数最小的二倍数, 以及其余数
     */
    // 1.   被除数 > 除数 * 2
    // 2.   被除数 > 除数 * 2

    function getNearestTimesAndRemain(
        targetNum: number,
        baseNum: number,
    ): {
        val: number
        remain: number
    } {
        let value = 1
        if (targetNum < baseNum) {
            return {
                val: 0,
                remain: targetNum,
            }
        }
        if (targetNum === baseNum) {
            return {
                val: 1,
                remain: 0,
            }
        }
        let countNum = baseNum
        while (targetNum > countNum + countNum) {
            countNum = countNum + countNum
            value = value + value
        }
        return {
            val: value,
            remain: targetNum - countNum,
        }
    }

    function quickDivide(inputDividend: number, inputDivisor: number) {
        if (inputDividend < inputDivisor) {
            return 0
        }
        if (inputDividend === inputDivisor) {
            return 1
        }

        let remain = inputDividend
        let result = 0
        while (remain >= inputDivisor) {
            let { val: currentResult, remain: currentRemain } = getNearestTimesAndRemain(remain, inputDivisor)
            result = result + currentResult
            remain = currentRemain
        }
        return result
    }

    let result = quickDivide(dividend, divisor)
    let finalResult = flag ? result : 0 - result

    if (finalResult < Const_Min || Const_Max < finalResult) {
        return Const_Max
    }
    return finalResult
}

// console.log(divide(2147483647, 1))
