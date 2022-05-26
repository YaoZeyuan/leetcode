function multiply(num1: string, num2: string): string {
    // 手工实现乘法
    let num1ValueList = num1
        .split('')
        .reverse()
        .map((item) => {
            return parseInt(item)
        })
    let num2ValueList = num2
        .split('')
        .reverse()
        .map((item) => {
            return parseInt(item)
        })

    // 按层添加结果

    // 手工实现一个按数组计算功能, 这里的所有数组均为倒序录入, 方便计算
    function addByNumList(num1: number[], num2: number[]) {
        let resultList = []
        let index = 0
        let addToNext = 0
        while (index < num1.length || index < num2.length) {
            let currentAddVal = (num1[index] ?? 0) + (num2[index] ?? 0) + addToNext
            let currentNum = currentAddVal % 10
            addToNext = Math.floor(currentAddVal / 10)
            resultList.push(currentNum)
            index = index + 1
        }
        if (addToNext > 0) {
            resultList.push(addToNext)
        }
        return resultList
    }

    // 需要手工实现带进位的按位乘法
    let totalResult: number[] = []
    for (let num1_index = 0; num1_index < num1ValueList.length; num1_index++) {
        let num1RealValue = num1ValueList[num1_index]
        for (let num2_index = 0; num2_index < num2ValueList.length; num2_index++) {
            let num2RealValue = num2ValueList[num2_index]
            let resultValue = num1RealValue * num2RealValue

            let num_个位 = resultValue % 10
            let num_十位 = Math.floor(resultValue / 10)
            let currentLevelResult: number[] = []
            // 先补0
            for (let i = 0; i < num1_index; i++) {
                currentLevelResult.push(0)
            }
            for (let i = 0; i < num2_index; i++) {
                currentLevelResult.push(0)
            }
            currentLevelResult.push(num_个位)
            if (num_十位 > 0) {
                currentLevelResult.push(num_十位)
            }
            totalResult = addByNumList(totalResult, currentLevelResult)
        }
    }

    // 最终需要把结果再倒过来
    let finalResult = totalResult.reverse()

    // 移除前导0
    while (finalResult[0] === 0) {
        finalResult.shift()
    }
    if (finalResult.length > 0) {
        return finalResult.join('')
    } else {
        return '0'
    }
}

// console.log(multiply('123456789', '123456789888'))
