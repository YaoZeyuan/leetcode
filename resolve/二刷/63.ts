function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    // 依然是动态规划问题, 只是添加了阻塞点
    // 新增逻辑: 若该点位为阻塞点位, 则路径值清0
    let m = obstacleGrid[0].length
    let n = obstacleGrid.length

    let resultMap = []

    function setXY(x, y, val) {
        resultMap[y][x] = val
    }
    function getXY(x, y) {
        return resultMap[y][x]
    }
    function getXYIsObstacleGrid(x, y) {
        return obstacleGrid[y][x] === 1
    }
    for (let row = 0; row < n; row++) {
        let line = []
        for (let col = 0; col < m; col++) {
            line.push(0)
        }
        resultMap.push(line)
    }

    // 初始化两边
    let hasXObstacle = false
    for (let x = 0; x < m; x++) {
        let isObstacleGrid = getXYIsObstacleGrid(x, 0)
        if (isObstacleGrid || hasXObstacle) {
            setXY(x, 0, 0)
            hasXObstacle = true
        } else {
            setXY(x, 0, 1)
        }
    }
    let hasYObstacle = false
    for (let y = 0; y < n; y++) {
        let isObstacleGrid = getXYIsObstacleGrid(0, y)
        if (isObstacleGrid || hasYObstacle) {
            setXY(0, y, 0)
            hasYObstacle = true
        } else {
            setXY(0, y, 1)
        }
    }
    // 初始化结果
    for (let x = 1; x < m; x++) {
        for (let y = 1; y < n; y++) {
            let isObstacleGrid = getXYIsObstacleGrid(x, y)
            if (isObstacleGrid) {
                setXY(x, y, 0)
            } else {
                setXY(x, y, getXY(x - 1, y) + getXY(x, y - 1))
            }
        }
    }
    return getXY(m - 1, n - 1)
}
