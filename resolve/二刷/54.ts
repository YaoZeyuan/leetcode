function spiralOrder(matrix: number[][]): number[] {
    // 第一步, 找到matrix的col/row值
    // 第二步, 正常生成坐标
    let resultList: number[] = []

    // 工具函数, 根据x,y取值
    function getXY(x: number, y: number) {
        return matrix[y][x]
    }

    let maxY = matrix.length
    let maxX = matrix[0].length

    // 先增加x(然后baseY+1), 再增加y(然后baseX+1), 再减少x(然后baseY+1), 再减少y(然后baseX+1)
    // 直到maxX和maxY为0

    let baseLeftX = 0
    let baseBottomY = 0
    let baseRightX = maxX
    let baseTopY = maxY

    let x = 0
    let y = 0

    function checkNeedContinue() {
        return baseLeftX < baseRightX && baseBottomY < baseTopY
    }

    let needCotinue = checkNeedContinue()
    while (needCotinue) {
        // 先增加x
        if (x < baseRightX) {
            while (x < baseRightX) {
                resultList.push(getXY(x, y))
                x = x + 1
            }
            x = baseRightX - 1 // 重置溢出后的值
            baseBottomY = baseBottomY + 1
        }

        // 每轮检测一次
        needCotinue = checkNeedContinue()
        if (needCotinue === false) {
            break
        }
        // 再增加y
        if (y < baseTopY) {
            y = y + 1
            while (y < baseTopY) {
                resultList.push(getXY(x, y))
                y = y + 1
            }
        }
        y = baseTopY - 1 // 重置溢出后的值
        baseRightX = baseRightX - 1
        // 每轮检测一次
        needCotinue = checkNeedContinue()
        if (needCotinue === false) {
            break
        }
        // 再减少x
        if (x >= baseLeftX) {
            x = x - 1
            while (x >= baseLeftX) {
                resultList.push(getXY(x, y))
                x = x - 1
            }
            baseTopY = baseTopY - 1
        }
        x = baseLeftX // 重置溢出后的值
        // 每轮检测一次
        needCotinue = checkNeedContinue()
        if (needCotinue === false) {
            break
        }
        // 再减少y, 但是不能小于左侧边界
        if (y >= baseBottomY) {
            y = y - 1
            while (y >= baseBottomY) {
                resultList.push(getXY(x, y))
                y = y - 1
            }
            y = baseBottomY // 重置溢出后的值
            baseLeftX = baseLeftX + 1
        }
        // 每轮检测一次
        needCotinue = checkNeedContinue()
        if (needCotinue === false) {
            break
        }
        // 额外多做一次检测, 保持逻辑一致
        if (x < baseRightX) {
            // 提前为下一轮做好准备
            x = x + 1
        }
    }
    return resultList
}

console.log(
    spiralOrder([
        [1]
        // v1
        // [1, 2, 3],
        // [4, 5, 6],
        // [7, 8, 9],
        // v2
        // [1, 2],
        // [4, 5],
        // v3
        // [1, 2, 3, 4],
        // [5, 6, 7, 8],
        // [9, 10, 11, 12],
    ]),
)
