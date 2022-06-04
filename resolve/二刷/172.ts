function trailingZeroes(n: number): number {
    // 实际上是统计5的数量(因为2的数量一定足够)

    let counter = Math.floor(n / 5)
    let remain = counter
    while (remain > 0) {
        remain = Math.floor(remain / 5)
        counter = counter + remain
    }

    return counter

    // 1 / 2 / 3 / 4 / 5 / 6 / 7 / 8 / 9 / 10 / 11 / 12 / 13 / 14 / 15

    // 5
    // 10
    // 15
}

console.log(trailingZeroes(50))
