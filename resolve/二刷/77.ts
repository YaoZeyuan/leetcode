function combine(n: number, k: number): number[][] {
    let pickerNumList = []
    let totalCounter = 0
    for (let i = 1; i <= n; i++) {
        pickerNumList.push(i)
    }

    let globalCacheMap = new Map<string, number[][]>()

    function sorter(a, b) {
        return a - b
    }
    function getNumListKey(numList: number[]) {
        return JSON.stringify([...numList].sort(sorter))
    }

    function getCacheKey(pickerParam) {
        return JSON.stringify({
            canPickerList: [...pickerParam.canPickerList].sort(sorter),
            pickerCount: pickerParam.pickerCount,
        })
    }

    let answerList = []
    // 递归生成
    function generateList(currentPos: number, tempList: number[], numberList: number[], pickerCount) {
        if (tempList.length === pickerCount) {
            answerList.push(tempList)
            return
        }
        if (tempList.length + numberList.length - currentPos < pickerCount) {
            // 不可能凑够数
            return
        }
        // 选择当前位置
        generateList(currentPos + 1, [...tempList, numberList[currentPos]], numberList, pickerCount)
        // 不选择当前位置
        generateList(currentPos + 1, [...tempList], numberList, pickerCount)

        // let cacheKey = getCacheKey({
        //     pickerCount,
        //     canPickerList,
        // })
        // if (globalCacheMap.has(cacheKey)) {
        //     return globalCacheMap.get(cacheKey)
        // }
        // totalCounter++
        // let answerMap = new Map<string, number[]>()
        // let resultNumList: number[][] = []
        // if (pickerCount === 0) {
        //     return []
        // }
        // if (pickerCount === 1) {
        //     for (let num of canPickerList.values()) {
        //         resultNumList.push([num])
        //     }
        //     return resultNumList
        // }
        // if (pickerCount === canPickerList.length) {
        //     // 无法细分
        //     return [canPickerList]
        // }
        // if (pickerCount > canPickerList.length) {
        //     // 不可能存在该情况
        //     return []
        // }
        // for (let num of canPickerList) {
        //     let newCanPickerSet = new Set([...canPickerList])
        //     newCanPickerSet.delete(num)
        //     let bufList = generateList([...newCanPickerSet.values()], pickerCount - 1)
        //     for (let buf of bufList) {
        //         answerMap.set(getNumListKey([num, ...buf]), [num, ...buf].sort(sorter))
        //     }
        // }
        // globalCacheMap.set(cacheKey, [...answerMap.values()])
        // return [...answerMap.values()]
    }
    generateList(0, [], pickerNumList, k)
    return answerList
}

var combine2 = function (n, k) {
    const ans = []
    const dfs = (cur, n, k, temp) => {
        // 剪枝：temp 长度加上区间 [cur, n] 的长度小于 k，不可能构造出长度为 k 的 temp
        if (temp.length + (n - cur + 1) < k) {
            return
        }
        // 记录合法的答案
        if (temp.length == k) {
            ans.push(temp)
            return
        }
        // 考虑选择当前位置
        dfs(cur + 1, n, k, [...temp, cur])
        // 考虑不选择当前位置
        dfs(cur + 1, n, k, temp)
    }
    dfs(1, n, k, [])
    return ans
}

console.log(combine(20, 15))
