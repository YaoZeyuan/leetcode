/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
    // 其实难点在于, 如何计算旋转后的坐标
    // 对于矩阵中第 i 行的第 j 个元素，在旋转后，它出现在倒数第 i 列的第 j 个位置

    type Type_Pos = {
        x: number
        y: number
    }
    let n = matrix.length

    // 工具函数, 方便用xy体系运算
    function getXY(pos: Type_Pos, targetMatrix: number[][]) {
        let { x, y } = pos
        return targetMatrix[y][x]
    }
    function setXY(pos: Type_Pos, newVal: number, targetMatrix: number[][]) {
        let { x, y } = pos
        targetMatrix[y][x] = newVal
        return
    }

    // 别整这么复杂了, 直接写o(n²)算法吧

    // 初始化翻转后的矩阵(值的内容可以忽略)
    let rotateMatrix = []
    for (let i = 0; i < n; i++) {
        rotateMatrix[i] = [...matrix[i]]
    }
    // 对新矩阵进行填充
    for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
            let oldVal = getXY(
                {
                    x,
                    y,
                },
                matrix,
            )
            setXY(
                {
                    x: n - y - 1,
                    y: x,
                },
                oldVal,
                rotateMatrix,
            )
        }
    }

    // 重新设置旧矩阵的值
    for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
            let oldVal = getXY(
                {
                    x,
                    y,
                },
                rotateMatrix,
            )
            setXY(
                {
                    x,
                    y,
                },
                oldVal,
                matrix,
            )
        }
    }
}

// console.log(
//     rotate([
//         [1, 2, 3, 4],
//         [4, 5, 6, 5],
//         [7, 8, 9, 6],
//         [10, 11, 12, 13],
//     ]),
// )
