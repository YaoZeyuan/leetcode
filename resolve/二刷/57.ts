function insert(intervals: number[][], newInterval: number[]): number[][] {
    // 第一步插入区间

    let newIntervalStart = newInterval[0]
    // 默认插入到最后
    let insertPos = intervals.length
    for (let checkPos = 0; checkPos < intervals.length; checkPos++) {
        let currentStartValue = intervals[checkPos][0]
        if (currentStartValue > newIntervalStart) {
            // 从这里插入即可
            insertPos = checkPos
            break
        }
    }
    intervals = [...intervals.slice(0, insertPos), newInterval, ...intervals.slice(insertPos)]
    // 第二步合并区间
    let currentItem = intervals[0]
    let newIntervalList: number[][] = []
    for (let nextPos = 1; nextPos < intervals.length; nextPos++) {
        let nextItem = intervals[nextPos]
        if (
            // 左侧重合
            currentItem[0] <= nextItem[0] &&
            nextItem[0] <= currentItem[1]
        ) {
            currentItem = [Math.min(currentItem[0], nextItem[0]), Math.max(currentItem[1], nextItem[1])]
        } else {
            newIntervalList.push(currentItem)
            currentItem = nextItem
        }
    }
    newIntervalList.push(currentItem)
    return newIntervalList
}

console.log(
    insert(
        // [
        //     [1, 2],
        //     [3, 5],
        //     [6, 7],
        //     [8, 10],
        //     [12, 16],
        // ],
        // [4, 8],
        //v2
        [[1, 5]],
        [2, 3],
    ),
)
