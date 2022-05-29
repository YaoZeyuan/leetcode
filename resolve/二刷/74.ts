function searchMatrix(matrix: number[][], target: number): boolean {
    // 二分查找

    function binarySearch(leftPos: number, rightPos: number, targetInput: number, inputList: number[]) {
        if (leftPos >= rightPos) {
            return targetInput === inputList[leftPos]
        }
        // 不在区间内
        if (inputList[leftPos] > targetInput) {
            return false
        }
        if (inputList[rightPos] < targetInput) {
            return false
        }

        let midPos = leftPos + Math.floor((rightPos - leftPos) / 2)

        // 检查位置
        if (inputList[leftPos] === targetInput || inputList[rightPos] === targetInput || inputList[midPos] === targetInput) {
            return true
        }
        // 缩小区间
        if (inputList[midPos] > targetInput) {
            // 左侧
            return binarySearch(leftPos + 1, midPos - 1, targetInput, inputList)
        } else {
            // 右侧
            return binarySearch(midPos + 1, rightPos - 1, targetInput, inputList)
        }
    }

    for (let line of matrix) {
        let result = binarySearch(0, line.length - 1, target, line)
        if (result) {
            return true
        }
    }
    return false
}

// console.log(
//     searchMatrix(
//         [
//             [1, 3, 5, 7],
//             [10, 11, 16, 20],
//             [23, 30, 34, 50],
//         ],
//         5,
//     ),
// )
