function findPeakElement(nums: number[]): number {
    for (let pos = 0; pos < nums.length; pos++) {
        let leftValue = nums[pos - 1]
        let selfValue = nums[pos]
        let rightValue = nums[pos + 1]

        let leftCheck = false
        let rightCheck = false
        if (leftValue === undefined) {
            leftCheck = true
        } else {
            leftCheck = leftValue < selfValue
        }

        if (rightValue === undefined) {
            rightCheck = true
        } else {
            rightCheck = rightValue < selfValue
        }
        if (leftCheck && rightCheck) {
            return pos
        }
    }
    return 0
}
