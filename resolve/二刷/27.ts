function removeElement(nums: number[], val: number): number {
    // 编写工具函数, 使用冒泡法移除元素
    function removeItemInArray(inputNumList: number[], targetPos: number) {
        inputNumList[targetPos] = undefined
        for (let pos = targetPos; pos < inputNumList.length; pos = pos + 1) {
            inputNumList[pos] = inputNumList[pos + 1]
        }
        inputNumList.pop()
        return
    }

    for(let checkPos = 0; checkPos < nums.length && nums.length > 0;){
        if(nums[checkPos] === val){
            removeItemInArray(nums, checkPos)
        }else{
            checkPos = checkPos + 1
        }
    }
    return nums.length
}
