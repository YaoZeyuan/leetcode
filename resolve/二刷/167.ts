function twoSum(numbers: number[], target: number): number[] {
    // 双指针法解题
    let leftPos = 0
    let rightPos = numbers.length - 1

    while (leftPos < rightPos) {
        let sum = numbers[leftPos] + numbers[rightPos]
        if (sum === target) {
            return [leftPos + 1, rightPos + 1]
        } else if (sum < target) {
            // 偏小
            leftPos++
        } else {
            // 偏大
            rightPos--
        }
    }
    return
}
