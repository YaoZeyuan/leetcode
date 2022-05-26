function removeDuplicates(nums: number[]): number {
    // 工具函数: 删除数组中的指定项, 并将后续值提前
    function removeItemInArray(inputNumList: number[], removePos: number) {
        inputNumList[removePos] = undefined
        for (let pos = removePos; pos < inputNumList.length - 1; pos++) {
            inputNumList[pos] = inputNumList[pos + 1]
        }
        // 删除最后一个元素
        inputNumList.pop()
        return
    }

    // 依次对元素进行比较, 如果和后一个元素相同, 则移除当前元素
    for (let pos = 0; pos < nums.length && nums.length > 1; ) {
        if (nums[pos] === nums[pos + 1]) {
            // 移除当前元素
            removeItemInArray(nums, pos)
        } else {
            pos = pos + 1
        }
    }
    return nums.length
}

console.log(removeDuplicates([1,1,1,2]))
