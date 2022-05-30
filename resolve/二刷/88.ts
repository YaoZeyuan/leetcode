/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    // 思路: 开一个新数组存储合并结果, 然后覆盖道nums1中

    let needMergeNums1 = nums1.slice(0, m)
    let needMergeNums2 = nums2.slice(0, n)
    let mergeResultList: number[] = []
    while (needMergeNums1.length > 0 || needMergeNums2.length > 0) {
        if (needMergeNums1.length === 0) {
            let num2_num = needMergeNums2.shift()
            mergeResultList.push(num2_num)
            continue
        } else if (needMergeNums2.length === 0) {
            let num1_num = needMergeNums1.shift()
            mergeResultList.push(num1_num)
            continue
        } else {
            let num1_num = needMergeNums1[0]
            let num2_num = needMergeNums2[0]
            // 选一个更小的加进去
            if (num1_num < num2_num) {
                mergeResultList.push(num1_num)
                needMergeNums1.shift()
            } else {
                mergeResultList.push(num2_num)
                needMergeNums2.shift()
            }
        }
    }
    // 将结果填回
    for (let pos = 0; pos < mergeResultList.length; pos++) {
        nums1[pos] = mergeResultList[pos]
    }
    return
}

// console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3))
