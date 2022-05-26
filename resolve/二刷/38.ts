function countAndSay(n: number): string {
    // 分成两个功能
    //  1.  将字符串按字符是否相同进行拆解
    //  2.  合并其结果

    function getNextResult(targetStr: string) {
        let sameStrList: string[] = []
        let targetCharList = targetStr.split('')
        let subResult = []
        for (let item of targetCharList) {
            if (subResult.length === 0) {
                subResult.push(item)
            } else if (subResult[0] !== item) {
                // 换值
                sameStrList.push(subResult.join(''))
                subResult = [item]
            } else {
                subResult.push(item)
            }
        }
        if (subResult.length > 0) {
            sameStrList.push(subResult.join(''))
        }
        // 生成计数字符串
        let resultStr = sameStrList
            .map((item) => {
                return `${item.length}${item[0]}`
            })
            .join('')
        return resultStr
    }

    if (n === 1) {
        return '1'
    }

    let counter = 1
    let finalResult = '1'
    while (counter < n) {
        finalResult = getNextResult(finalResult)
        counter = counter + 1
    }
    return finalResult
}

// console.log(countAndSay(4))
