function mySqrt(x: number): number {
    // 二分搜索
    let min = 0
    let max = x
    while (max > min + 1) {
        if (x >= max * max) {
            // max 偏小, 则此时的max为下限, 旧max为上限
            min = max
            max = max + Math.ceil((max * 2 - min) / 2)
        } else {
            // max 偏大, 只缩减max即可
            max = max - Math.floor((max - min) / 2)
        }
        if (max < min) {
            // 交换max和min
            ;[max, min] = [min, max]
        }
    }

    let target = max
    // 在3以内, 遍历即可
    for (; target * target > x; target--) {}

    return target
}

for (let x of [2147395599, 6, 1764975709]) {
    console.log(x, '=>', mySqrt(x))
}
