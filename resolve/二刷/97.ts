function isInterleave(s1: string, s2: string, s3: string): boolean {
    // 动态规划类问题.
    // f(i,j) = f(i-1,j) === true && s1(i) === s3(i+j) || f(i,j-1) === true && s2(j) === s3(i+j)
    // @todo 这道题没完全做出来, 看答案写的

    // 适配特殊情况
    if (s1.length + s2.length !== s3.length) {
        return false
    }

    if (s1 === '') {
        return s2 === s3
    }
    if (s2 === '') {
        return s1 === s3
    }

    // 利用数组法
    let y_s1_char_list = ['', ...s1.split('')]
    let x_s2_char_list = ['', ...s2.split('')]
    let s3_char_list = ['', ...s3.split('')]

    // 先进行初始化
    let checkResultMartix: boolean[][] = []
    for (let y = 0; y < y_s1_char_list.length; y++) {
        let line: boolean[] = []
        for (let x = 0; x < x_s2_char_list.length; x++) {
            // 初始化时除了0,0. 其他位置都要受前一个值的影响
            if (y === 0 && x === 0) {
                // 初始化第一行
                line.push(true)
                continue
            }
            if (y === 0) {
                // 初始化第一行
                line.push(s3_char_list[x + y] === x_s2_char_list[x] && line[x - 1])
                continue
            }
            if (x === 0) {
                // 初始化第一列
                line.push(s3_char_list[x + y] === y_s1_char_list[y] && getXY(0, y - 1))
                continue
            }
            line.push(undefined)
        }
        checkResultMartix.push(line)
    }

    function getXY(x, y) {
        return checkResultMartix[y][x]
    }
    function setXY(x, y, val) {
        checkResultMartix[y][x] = val
        return
    }

    // 然后重新计算
    for (let y = 0; y < y_s1_char_list.length; y++) {
        for (let x = 0; x < x_s2_char_list.length; x++) {
            if (y === 0) {
                // 第一行是定值
                continue
            }
            if (x === 0) {
                // 第一行是定值
                continue
            }

            let needCheckChar = s3_char_list[y + x]
            let xCheckChar = x_s2_char_list[x]
            let yCheckChar = y_s1_char_list[y]
            let xBefore = getXY(x - 1, y)
            let yBefore = getXY(x, y - 1)

            let checkX = xBefore && needCheckChar === xCheckChar
            let checkY = yBefore && needCheckChar === yCheckChar
            let checkResult = checkX || checkY
            setXY(x, y, checkResult)
        }
    }
    return getXY(x_s2_char_list.length - 1, y_s1_char_list.length - 1)
}

console.log(
    isInterleave(
        'db',
        'b',
        'cbb',

        // 'abababababababababababababababababababababababababababababababababababababababababababababababababbb',
        // 'babababababababababababababababababababababababababababababababababababababababababababababababaaaba',
        // 'abababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababbb',
    ),
)
