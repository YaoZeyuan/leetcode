function numIslands(grid: string[][]): number {
    // 思路: 计算联通的1的数量
    const Const_Main_Land = '1'
    const Const_Sea = '0'
    const Const_Max_X = grid[0].length
    const Const_Max_Y = grid.length

    type Type_Pos = {
        x: number
        y: number
    }

    function getXY({ x, y }: Type_Pos) {
        return grid[y][x]
    }
    function setXY({ x, y }: Type_Pos, val) {
        grid[y][x] = val
        return
    }
    function isPosLegal({ x, y }: Type_Pos) {
        if (0 <= x && x < Const_Max_X) {
            if (0 <= y && y < Const_Max_Y) {
                return true
            }
        }
        return false
    }

    function resetIntoSea({ x, y }: Type_Pos) {
        // 从指定位置开始, 将所有联通的陆地重置为岛屿
        if (isPosLegal({ x, y }) === false) {
            return
        }
        setXY({ x, y }, Const_Sea)

        let nextCheckPos: Type_Pos[] = [
            {
                x: x - 1,
                y,
            },
            {
                x: x + 1,
                y,
            },
            {
                x: x,
                y: y - 1,
            },
            {
                x: x,
                y: y + 1,
            },
        ]
        for (let pos of nextCheckPos) {
            if (isPosLegal(pos) === false) {
                continue
            }
            if (getXY(pos) === Const_Main_Land) {
                // 递归重置联通的陆地
                resetIntoSea(pos)
            }
        }
        return
    }

    let counter = 0
    for (let x = 0; x < Const_Max_X; x++) {
        for (let y = 0; y < Const_Max_Y; y++) {
            if (
                getXY({
                    x,
                    y,
                }) === Const_Main_Land
            ) {
                // 岛屿数+1
                counter++
                // 将关联的陆地置为海洋, 避免干扰后续的检查
                resetIntoSea({
                    x,
                    y,
                })
            }
        }
    }
    return counter
}
