function isValidSudoku(board: string[][]): boolean {
    // 分成三步进行检测
    //  1.  每一行是否有效
    //  2.  每一列是否有效
    //  3.  每一块是否有效

    // 检测方法: 看传入的9个数, 除了空格外是否有重复值
    function checkTools(valueList: string[]) {
        valueList = valueList.filter((item) => {
            return item !== '.'
        })
        return new Set(valueList).size === valueList.length
    }

    // 先按行检查
    for (let row = 0; row < 9; row = row + 1) {
        if (checkTools(board[row]) === false) {
            return false
        }
    }

    // 再按列检查
    for (let col = 0; col < 9; col = col + 1) {
        let colList = board
            .map((item) => {
                return item[col]
            })
            .flat()
        if (checkTools(colList) === false) {
            return false
        }
    }
    // 再按块检查
    for (let i = 0; i < 9; i = i + 3) {
        for (let j = 0; j < 9; j = j + 3) {
            let block = [
                // 手工拼接出这9个值
                board[i][j],
                board[i][j + 1],
                board[i][j + 2],

                board[i + 1][j],
                board[i + 1][j + 1],
                board[i + 1][j + 2],

                board[i + 2][j],
                board[i + 2][j + 1],
                board[i + 2][j + 2],
            ]
            if (checkTools(block) === false) {
                return false
            }
        }
    }
    return true
}
