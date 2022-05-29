function canJump(nums: number[]): boolean {
    // 要求检测能否跳到最后一个位置.
    // 那么, 可以从第一个位置开始, 将能跳跃的位置都标记为1, 看最后一个位置有没有被标记上即可
    // o(n)
    const Const_Can_Jump = 1
    const Const_Can_Not_Jump = 0

    let checkResultList = []
    // 初始化
    for (let item of nums) {
        checkResultList.push(Const_Can_Not_Jump)
    }
    // 第一个位置肯定可以跳到
    checkResultList[0] = Const_Can_Jump

    for (let checkIndex = 0; checkIndex < nums.length; checkIndex++) {
        if (checkResultList[checkIndex] !== Const_Can_Jump) {
            // 其实可以直接return false
            break
        }
        let jumpLength = nums[checkIndex]
        for (let offset = 0; offset <= jumpLength; offset++) {
            checkResultList[checkIndex + offset] = Const_Can_Jump
        }
        if (checkResultList[nums.length - 1] === Const_Can_Jump) {
            return true
        }
    }
    return checkResultList[nums.length - 1] === Const_Can_Jump
}

// console.log(canJump([2, 3, 1, 1, 4]))
