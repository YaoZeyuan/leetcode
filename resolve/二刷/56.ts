function merge(intervals: number[][]): number[][] {
    // 先进行排序, 确保元素递增展示
    intervals.sort((a, b) => {
        return a[0] - b[0]
    })

    let resultList: number[][] = []

    let currentItem = intervals[0]
    for (let i = 1; i < intervals.length; i++) {
        let nextItem = intervals[i]
        if (currentItem[1] >= nextItem[0]) {
            currentItem[1] = Math.max(currentItem[1], nextItem[1])
        } else {
            resultList.push(currentItem)
            currentItem = nextItem
        }
    }
    resultList.push(currentItem)
    return resultList
}

// console.log(
//     merge([
//         [1, 2],
//         [3, 5],
//         [2, 4],
//         [8, 9],
//     ]),
// )
