// @alert 第53题没想出解答方法, 看答案解决的
function maxSubArray(nums: number[]): number {
    if (nums.length === 0) {
        return 0
    }

    // 首先使用基础方案进行解决
    // 当前最大连续子数组和为: Math.max(preNum + currentNum, currentNum), 而最大子数组和为历史上出现过的最大子数组和

    // let preMaxSum = nums[0]
    // let maxSumInHistory = nums[0]
    // for (let num of nums.slice(1)) {
    //     preMaxSum = Math.max(preMaxSum + num, num)
    //     maxSumInHistory = Math.max(maxSumInHistory, preMaxSum)
    // }
    // return maxSumInHistory

    // 第二种方案, 线段树

    // 对于每一个区段, 记录
    // leftSum : 从左起, 连续数组的最大和
    // rightSum : 从右起, 连续数组的最大和
    // innerSum : 区段内连续数组最大和
    // allSum : 整个区段之和

    // 对每个区段进行合并
    // 合并规则为
    // leftSum: Max(左侧区段leftSum,  左侧区段allSum + 右侧区段rightSum)
    // rightSum: Max(左侧区段allSum + 右侧区段rightSum, 右侧区段rightSum)
    // innerSum: Max(左侧区段 innerSum, 右侧区段 innerSum, 左区间rightSum+右区间leftSum)
    // allSum: 左侧区段allSum + 右侧区段allSum

    type Type_Analyze_Result = {
        leftSum: number
        rightSum: number
        innerSum: number
        allSum: number
    }

    function getAnalyzeInRange(leftResult: Type_Analyze_Result, rightResult: Type_Analyze_Result): Type_Analyze_Result {
        return {
            leftSum: Math.max(leftResult.leftSum, leftResult.allSum + rightResult.leftSum),
            rightSum: Math.max(leftResult.rightSum + rightResult.allSum, rightResult.rightSum),
            innerSum: Math.max(leftResult.innerSum, leftResult.rightSum + rightResult.leftSum, rightResult.innerSum),
            allSum: leftResult.allSum + rightResult.allSum,
        }
    }

    function getInfo(leftPos: number, rightPos: number): Type_Analyze_Result {
        if (leftPos === rightPos) {
            return {
                leftSum: nums[leftPos],
                rightSum: nums[leftPos],
                innerSum: nums[leftPos],
                allSum: nums[leftPos],
            }
        }

        let midPos = Math.floor((rightPos - leftPos) / 2) + leftPos
        let leftInfo = getInfo(leftPos, midPos)
        let rightInfo = getInfo(midPos + 1, rightPos)
        let currentInfo = getAnalyzeInRange(leftInfo, rightInfo)

        return currentInfo
    }
    return getInfo(0, nums.length - 1).innerSum
}

// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4, 5]))
