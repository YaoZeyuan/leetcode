function myPow(x: number, n: number): number {
    if (n === 0) {
        return 1
    }
    if (n < 0) {
        x = 1 / x
        n = Math.abs(n)
    }
    if (n < 10) {
        let result = x
        for (let i = 1; i < n; i++) {
            result = result * x
        }
        return result
    }
    // 需要实现一个快速幂次运算

    let result = x
    let basePow = 1
    basePow = basePow + basePow
    while (basePow < n - basePow) {
        result = result * result
        basePow = basePow + basePow
    }
    // 会多算一次
    basePow = basePow / 2

    let remainPow = n - basePow

    let remainResult = myPow(x, remainPow)
    return result * remainResult
}

// console.log(myPow(2, 10))
