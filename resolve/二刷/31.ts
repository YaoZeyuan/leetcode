/**
 Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums: number[]): void {
    // 问题的难点在于: 定义并实现, 什么才是下一个排列
    // 分为如下两步
    // 1.   如果整体为升序排列, 则下一个排列为交换最后两位
    // 2.   如果整体为降序排列, 则下一个排列为重置为升序排列
    // 3.   如果不是以上两种情况, 则从后向前, 检查是否为从后向前的升序, 找到第一个不为升序的地方(3,4),交换其值(4,3), 并重置交换位置后的数据为升序.
    //      1.  情况1是情况3的特例, 因此只需要处理情况2和情况3就可以了

    // 降序函数
    let descOrderFunc = (a: number, b: number) => {
        return b - a
    }

    // 升序函数
    let ascOrderFunc = (a: number, b: number) => {
        return a - b
    }

    if (nums.length < 2) {
        // 没有数据不需要排列
        return
    }
    if ([...nums].sort(descOrderFunc).join(',') === nums.join(',')) {
        // 已经是全降序排列(情况2), 直接重拍即可
        nums.sort(ascOrderFunc)
        return
    }

    // 否则, 从后向前, 寻找第一个从后往前属于升序的地方
    let lastPos = nums.length - 1
    while (lastPos > 0) {
        let prevLastPos = lastPos - 1
        if (nums[prevLastPos] < nums[lastPos]) {
            // 满足要求
            break
        } else {
            lastPos = lastPos - 1
        }
    }
    // 交换(lastPos的后续所有元素中, 大于之前值的最小值)和其之前的值

    let cloudExchangeNums = nums
        .slice(lastPos)
        .filter((item) => {
            return item > nums[lastPos - 1]
        })
        .sort(descOrderFunc)
    // 拿到后续数组中待交换的值
    let cloudExchangeNum = cloudExchangeNums.pop()

    // 前面待交换的值
    let buf = nums[lastPos - 1]
    // nums[lastPos] = nums[lastPos - 1]
    // nums[lastPos - 1] = buf
    // 然后从lastPos之后, 进行一轮排序, 排为升序
    let remainList = nums.slice(lastPos - 1)
    // remainList里的值有可能是重复的, 因此不能使用这种过滤方法
    // .filter((item) => item !== cloudExchangeNum)

    let targetNumPos = remainList.indexOf(cloudExchangeNum)
    if (cloudExchangeNum === 0) {
        remainList.shift()
    } else {
        remainList = [...remainList.slice(0, targetNumPos), ...remainList.slice(targetNumPos + 1)]
    }

    // 替换占位符
    nums[lastPos - 1] = cloudExchangeNum

    // 手工排序后直接替换元素, 省的再手写快排了
    remainList.sort(ascOrderFunc)
    for (let index = lastPos; index < nums.length; index++) {
        nums[index] = remainList[index - lastPos]
    }
    return
}

// console.log(nextPermutation([2, 3, 1, 3, 3]))
