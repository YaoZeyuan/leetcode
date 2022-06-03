/**
 Do not return anything, modify board in-place instead.
 */
function solve(board: string[][]): void {
    // 基本思路
    // 从边界开始查找, 凡是和边界不连通的O都是被X围绕的区域
    // 查找可以通过标记进行

    const Const_Flag_待检查 = 'no_check'
    const Const_Flag_已联通 = 'has_connected'
    const Const_Flag_不需要检查 = 'without_check'
    const Const_Char_未联通 = 'X'
    const Const_Char_已联通 = 'O'

    const Const_Max_X = board[0].length
    const Const_Max_Y = board.length

    type Type_Pos = {
        x: number
        y: number
    }

    function getXY({ x, y }: Type_Pos, target: string[][]) {
        return target[y][x]
    }
    function setXY({ x, y }: Type_Pos, value: string, target: string[][]) {
        target[y][x] = value
        return
    }

    let flagBoard: string[][] = []
    for (let rawLine of board) {
        let line: string[] = []
        for (let char of rawLine) {
            line.push(char === 'X' ? Const_Flag_不需要检查 : Const_Flag_待检查)
        }
        flagBoard.push(line)
    }

    // 更新处于联通状态下的节点标记
    function updateMark({ x, y }: Type_Pos) {
        // 若坐标是否越界, 则不需要继续检查
        if (x < 0 || x >= Const_Max_X) {
            return
        }
        if (y < 0 || y >= Const_Max_Y) {
            return
        }

        let currentFlag = getXY({ x, y }, flagBoard)
        if (currentFlag !== Const_Flag_待检查) {
            return
        }
        // 只有联通状态下才会调用updateMark方法
        setXY({ x, y }, Const_Flag_已联通, flagBoard)
        // 对上下左右进行扩展标记
        updateMark({ x: x + 1, y })
        updateMark({ x: x - 1, y })
        updateMark({ x: x, y: y + 1 })
        updateMark({ x: x, y: y - 1 })
    }

    // 开始检查
    for (let x = 0; x < Const_Max_X; x++) {
        for (let y of [0, Const_Max_Y - 1]) {
            // 只检查四周
            let checkFlag = getXY({ x, y }, flagBoard)
            if (checkFlag === Const_Flag_待检查) {
                updateMark({ x, y })
            }
        }
    }
    for (let y = 0; y < Const_Max_Y; y++) {
        for (let x of [0, Const_Max_X - 1]) {
            // 只检查四周
            let checkFlag = getXY({ x, y }, flagBoard)
            if (checkFlag === Const_Flag_待检查) {
                updateMark({ x, y })
            }
        }
    }
    // 此时, 所有已联通的节点都已标记完毕, 则将所有未联通节点置为X即可
    for (let x = 0; x < Const_Max_X; x++) {
        for (let y = 0; y < Const_Max_Y; y++) {
            let flag = getXY({ x, y }, flagBoard)
            if (flag !== Const_Flag_已联通) {
                setXY({ x, y }, Const_Char_未联通, board)
            }
        }
    }
    return
}
