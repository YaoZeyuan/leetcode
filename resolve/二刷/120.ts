function minimumTotal(triangle: number[][]): number {
    // 需要使用动态规划解题(贪心不可以)
    // 对于每一层的元素, 都有到这个位置的最小和
    // 那么按位置计算新一层元素的最小和即可
    //
    // 前提是col-1/col/col+1存在
    // F[row][col] = min(F[row -1 ][col], F[row -1 ][col - 1], F[row -1 ][col + 1]) + n[row][col]
    //

    // 工具数组, 指定位置最小和
    let minSum: number[][] = []

    const Const_Max_Row = triangle.length

    for (let currentRow = 0; currentRow < Const_Max_Row; currentRow++) {
        if (currentRow === 0) {
            // 第0层为确定值
            minSum.push([triangle[0][0]])
        } else {
            // 此后每一层的最小值, 都是上一层可能的值中最小的那个+当前的值
            let prevList = minSum[currentRow - 1]
            let currentNumList = triangle[currentRow]
            let currentSumList = []
            for (let currentCol = 0; currentCol < currentNumList.length; currentCol++) {
                // 此后每一层最小值都只和上一层有关系
                let existValList: number[] = []
                if (prevList[currentCol - 1] !== undefined) {
                    existValList.push(prevList[currentCol - 1])
                }
                if (prevList[currentCol] !== undefined) {
                    existValList.push(prevList[currentCol])
                }
                // if (prevList[currentCol - 1] !== undefined) {
                //     existValList.push(prevList[currentCol - 1])
                // }
                let minVal = currentNumList[currentCol] + Math.min(...existValList)
                currentSumList.push(minVal)
            }
            minSum.push(currentSumList)
        }
    }
    return Math.min(...minSum[Const_Max_Row - 1])
}

// console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]))
