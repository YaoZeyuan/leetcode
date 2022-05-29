function minPathSum(grid: number[][]): number {
    // 和总路径和一样, 也是道动态规划题

    // 初始化结果
    let maxY = grid.length
    let maxX = grid[0].length

    let resultMap = []

    function getXY(x: number, y: number, targetMap: number[][]) {
        // 避免没有数据的情况
        return targetMap?.[y]?.[x] ?? 0
    }
    function setXY(x: number, y: number, val: number, targetMap: number[][]) {
        targetMap[y][x] = val
    }
    // 初始化缓存结果
    for (let y = 0; y < maxY; y++) {
        let line = []
        for (let x = 0; x < maxX; x++) {
            line.push(0)
        }
        resultMap.push(line)
    }
    // 最小路径和Sum(x,y) = Math.min( Sum(x-1,y)+xy, Sum(x,y-1)+xy)

    // 开始计算结果
    for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < maxY; y++) {
            let leftVal = getXY(x - 1, y, resultMap)
            let topVal = getXY(x, y - 1, resultMap)
            let selfVal = getXY(x, y, grid)

            if (x === 0 || y === 0) {
                // 数据初始化
                if (x === 0) {
                    setXY(x, y, Math.max(topVal + selfVal), resultMap)
                } else {
                    setXY(x, y, Math.max(leftVal + selfVal), resultMap)
                }
            } else {
                setXY(x, y, Math.min(leftVal + selfVal, topVal + selfVal), resultMap)
            }
        }
    }
    return getXY(maxX - 1, maxY - 1, resultMap)
}

// console.log(
//     minPathSum([
//         [1, 2],
//         [5, 6],
//         [1, 1],
//     ]),
// )
