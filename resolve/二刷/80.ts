function removeDuplicates(nums: number[]): number {
    // 使用数组的splice的方法
    let hasDuplicate: boolean = false
    let beforeNum: string | number = ''
    for (let checkPos = 0; checkPos < nums.length; checkPos++) {
        let currentNum = nums[checkPos]
        if (beforeNum !== currentNum) {
            // 重置状态机
            beforeNum = currentNum
            hasDuplicate = false
        } else if (hasDuplicate === true) {
            // 说明已经重复出现了2次
            // 删除该位置的元素
            nums.splice(checkPos, 1)
            // 重置状态机, 重新开始检测
            checkPos = -1
            hasDuplicate = false
            beforeNum = ''
        } else {
            hasDuplicate = true
        }
    }
    // 这样重复执行到最后, 一定是过滤掉重复字符的版本
    // 也可以用栈来处理
    return nums.length
}

console.log(removeDuplicates([1, 1, 1, 1]))
