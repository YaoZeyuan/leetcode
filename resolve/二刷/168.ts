function convertToTitle(columnNumber: number): string {
    // 进制转换器
    function number2Char(inputNum: number) {
        return String.fromCharCode('A'.charCodeAt(0) + inputNum)
    }

    let charList: string[] = []

    let remainNum = columnNumber
    while (remainNum > 0) {
        // 1~25 映射对应于 A-Y, 其中0对应26
        let baseNum = remainNum % 26
        if (baseNum === 0) {
            baseNum = 26
        }
        let baseChar = number2Char(baseNum - 1)
        charList.push(baseChar)
        remainNum = Math.floor((remainNum - baseNum) / 26)
    }
    return charList.reverse().join('')
}

console.log(convertToTitle(701))
