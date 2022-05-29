function plusOne(digits: number[]): number[] {
    let plusFlag = 0
    // 先加1
    digits[digits.length - 1]++
    // 然后开始处理进位问题
    for (let index = digits.length - 1; index >= 0; index--) {
        let val = digits[index]
        let newVal = (val + plusFlag) % 10
        plusFlag = val + plusFlag >= 10 ? 1 : 0
        digits[index] = newVal
    }
    if (plusFlag > 0) {
        digits = [1, ...digits]
    }
    return digits
}
