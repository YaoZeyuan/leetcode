function largestNumber(nums: number[]): string {
    // 思路:
    // 尽可能使用小数用于填充最后的位数
    // 对于宽度大于1的数
    // 例如 10, 9 => 910 > 109
    // 所以应按照首位进行排序, 未填充的位置需要使用9来填充
    // 90, 9 => 990 > 909

    let trargetNum = [...nums]
    trargetNum.sort((a, b) => {
        let lenA = `${a}`.length
        let lenB = `${b}`.length
        let maxLength = Math.max(lenA, lenB)

        let lastCharA = `${a}`[`${a}`.length - 1]
        let lastCharB = `${b}`[`${b}`.length - 1]

        return parseInt(`${b}${a}`) - parseInt(`${a}${b}`)
    })

    let resultStr = trargetNum.join('').replace(/^0+/, '')
    if (resultStr === '') {
        return '0'
    }
    return resultStr
}
