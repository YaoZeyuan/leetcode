function generateMatrix(n: number): number[][] {
    // 核心点在于旋转生成x,y坐标
    let martix = []

    // 工具函数, 用于设置值
    function setXY(x: number, y: number, val: number) {
        martix[y][x] = val
    }

    let baseBottomY = 0
    let baseTopY = n
    let baseLeftX = 0
    let baseRightX = n

    let x = 0
    let y = 0

    // 初始化martix数组
    for (let rowIndex = 0; rowIndex < n; rowIndex++) {
        let row = []
        for (let i = 0; i < n; i++) {
            row.push(0)
        }
        martix.push(row)
    }

    // 开始顺序填充

    let counter = 1
    function checkNeedContinue() {
        return baseBottomY < baseTopY && baseLeftX < baseRightX
    }
    let needCotinue = checkNeedContinue()
    while (needCotinue) {
        // 检查是否满足条件
        needCotinue = checkNeedContinue()
        if (needCotinue === false) {
            break
        }
        // x从左加到右
        while (x < baseRightX) {
            setXY(x, y, counter)
            counter++
            x = x + 1
        }
        // 多加了一次x, 重置回来
        x = x - 1
        counter--
        // 底部抬升1
        baseBottomY = baseBottomY + 1

        // 检查是否满足条件
        needCotinue = checkNeedContinue()
        if (needCotinue === false) {
            break
        }
        // y从上加到下
        while (y < baseTopY) {
            setXY(x, y, counter)
            counter++
            y = y + 1
        }
        // 多加了一次y, 重置回来
        y = y - 1
        counter--
        // 右侧缩进1
        baseRightX = baseRightX - 1

        // 检查是否满足条件
        needCotinue = checkNeedContinue()
        if (needCotinue === false) {
            break
        }
        // x从右减到左
        while (x >= baseLeftX) {
            setXY(x, y, counter)
            counter++
            x = x - 1
        }
        // 多减了一次x, 重置回来
        x = x + 1
        counter--
        // 顶部下降1
        baseTopY = baseTopY - 1

        // 检查是否满足条件
        needCotinue = checkNeedContinue()
        if (needCotinue === false) {
            break
        }
        // y从下减到上
        while (y >= baseBottomY) {
            setXY(x, y, counter)
            counter++
            y = y - 1
        }
        // 多减了一次y, 重置回来
        y = y + 1
        counter--
        // 左侧缩进1
        baseLeftX = baseLeftX + 1
    }

    return martix
}

console.log(JSON.stringify(generateMatrix(1), null, 2))
