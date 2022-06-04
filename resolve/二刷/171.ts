function titleToNumber(columnTitle: string): number {
    // 反向进制转换
    let charList = columnTitle.split('').reverse()
    let result = 0
    for (let index = 0; index < charList.length; index++) {
        let char = charList[index]
        let transNum = char.charCodeAt(0) - 'A'.charCodeAt(0) + 1
        result = result + transNum * Math.pow(26, index)
    }
    return result
}
console.log(titleToNumber('ZY'))
