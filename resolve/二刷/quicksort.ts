function quickSort(inputNumList: number[]) {
    // 核心思想: 分治

    // 若长度为0/1说明不需要排序, 直接返回即可
    if (inputNumList.length < 2) {
        return inputNumList
    }

    // 否则, 随机选择一个数
    let checkNum = inputNumList[0]

    // 将数组拆分为两部分, 进行划分
    let leftList = inputNumList.filter((item) => item < checkNum)
    // 专门划分出相等的一部分, 减少递归深度
    let equalList = inputNumList.filter((item) => item === checkNum)
    let rightList = inputNumList.filter((item) => item > checkNum)
    // 对新划分出的部分进行排序合并
    let sortedLeftList = quickSort(leftList)
    let sortedRightList = quickSort(rightList)
    // 合并起来
    return [...sortedLeftList, ...equalList, ...sortedRightList]
}

console.log(quickSort([1, 2, 3, 4, 11, 2, 33, 2, 5, 6, 7, 8]).join(' , '))
