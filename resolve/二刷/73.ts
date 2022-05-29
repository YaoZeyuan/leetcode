/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix: number[][]): void {
    type Type_Pos = {
        x: number
        y: number
    }

    let needProcessPosList: Type_Pos[] = []
    function getXY(pos: Type_Pos) {
        let { x, y } = pos
        return matrix[y][x]
    }
    function setXY(pos: Type_Pos, val: number) {
        let { x, y } = pos
        matrix[y][x] = val
        return
    }

    let maxX = matrix[0].length
    let maxY = matrix.length

    // 首先检查需要置0的项
    for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < maxY; y++) {
            let result = getXY({
                x,
                y,
            })
            if (result === 0) {
                needProcessPosList.push({ x, y })
            }
        }
    }

    for (let processPos of needProcessPosList) {
        for (let x = 0; x < maxX; x++) {
            setXY(
                {
                    x,
                    y: processPos.y,
                },
                0,
            )
        }
        for (let y = 0; y < maxY; y++) {
            setXY(
                {
                    x: processPos.x,
                    y: y,
                },
                0,
            )
        }
    }
    return 
}
