function uniquePaths(m: number, n: number): number {
    // 动态规划问题
    // 顶部和最左侧都为1, 其他部分的路径和为
    // F(i,j) = F(i-1,j) + F(i, j-1)
    let resultMap = []

    function setXY(x, y, val) {
        resultMap[y][x] = val
    }
    function getXY(x, y) {
        return resultMap[y][x]
    }
    for (let row = 0; row < n; row++) {
        let line = []
        for (let col = 0; col < m; col++) {
            line.push(0)
        }
        resultMap.push(line)
    }

    // 初始化两边
    for (let x = 0; x < m; x++) {
        setXY(x, 0, 1)
    }
    for (let y = 0; y < n; y++) {
        setXY(0, y, 1)
    }
    // 初始化结果
    for (let x = 1; x < m; x++) {
        for (let y = 1; y < n; y++) {
            setXY(x, y, getXY(x - 1, y) + getXY(x, y - 1))
        }
    }
    return getXY(m - 1, n - 1)
}

// console.log(uniquePaths(3, 7))
