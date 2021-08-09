// 改成使用深度优先方法实现----广度优先会爆内存, 无法使用
type TypePosition = { x: number, y: number }
type TypeSolution = {
    // 匹配文字序列
    matchedCharList: string[]
    // 匹配坐标序列
    positionList: TypePosition[],
    // 已有位置列表
    positionSet: Set<string>
}

let computeCount = 0
let slove

const Const_Path_Split = '_===_'

let hasTestPathSet: Set<string> = new Set()
// 从位于pos上的点出发, 不可以达到的点的集合
let posCannotReachTargetMap: Map<string, Set<string>> = new Map()
// 状态堆栈
{
    /**
     * @param board 
     * @param word 
     * @param waitToCheckSolutionList 待检查的位置列表 
     * @param wordCheckPosition 待检查的字符位置, 从0开始. 若到最后一个仍符合要求, 那么返回true
     */
    slove = (board: string[][], word: string, needCheckSolution: TypeSolution = {
        "matchedCharList": [],
        "positionList": [],
        "positionSet": new Set()
    }, wordCheckPosition: number = 0) => {

        computeCount++
        if (computeCount % 1000 == 0) {
            console.log(`累计运算${computeCount}次`)
        }

        if (word.length === 0) {
            // 长度为0必然正确
            return true;
        }

        // 第一步, 找到所有符合要求的第一个格子
        let width = board[0].length
        let height = board.length

        let Tools = {
            /**
             * 获取指定位置上的记录
             * @param board 
             * @param x 
             * @param y 
             * @returns 
             */
            getPosition: (x: number, y: number) => {
                if (Tools.isPositionLegal(x, y) === false) {
                    return "肯定出错, 没有该值"
                }
                return board[y][x]
            },

            /**
             * 判断坐标值是否合法
             * @param x 
             * @param y 
             * @returns 
             */
            isPositionLegal: (x: number, y: number) => {
                if (x >= 0 && x <= width - 1) {
                    if (y >= 0 && y <= height - 1) {
                        return true
                    }
                }
                return false
            },
            getPositionKey: (x: number, y: number) => {
                return JSON.stringify({ x, y })
            },
            positionList2Key: (positionList: TypePosition[]) => {
                positionList = [...positionList]
                let positionKeyList = []
                for (let position of positionList) {
                    positionKeyList.push(Tools.getPositionKey(position.x, position.y))
                }
                // positionKeyList.sort()
                let itemkey = positionKeyList.join("_")
                return itemkey
            }
        }

        let needToMatchChar = word[wordCheckPosition]

        if (needCheckSolution.positionList.length === 0) {
            // 首次匹配
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    // 从第0个节点开始遍历
                    // 待匹配的值
                    let nextCheckSolution: TypeSolution = {
                        matchedCharList: [],
                        positionList: [
                            {
                                x,
                                y
                            },
                        ],
                        positionSet: new Set()
                    }

                    let nextFloorCheckResult = slove(board, word, nextCheckSolution, wordCheckPosition);
                    if (nextFloorCheckResult === true) {
                        return true
                    } else {
                        // 根据历史路径, 该点出发, 不能抵达目标, 记录到map里
                        let posParentPathKey = Tools.positionList2Key([...nextCheckSolution.positionList].slice(0, nextCheckSolution.positionList.length - 1))
                        let posKey = posParentPathKey + Const_Path_Split + Tools.getPositionKey(x, y)
                        if (posCannotReachTargetMap.has(posKey)) {
                            let oldSet = posCannotReachTargetMap.get(posKey)
                            posCannotReachTargetMap.set(posKey, new Set([...oldSet.values(), word]))
                        } else {
                            posCannotReachTargetMap.set(posKey, new Set([word]))
                        }
                    }

                }
            }

            // 没有匹配到可行解
            return false
        } else {
            // 继续匹配, 先检查当前位置是否匹配上了
            let needCheckPosition = needCheckSolution.positionList[needCheckSolution.positionList.length - 1]
            let { x, y } = needCheckPosition
            // 没匹配上返回false
            if (Tools.isPositionLegal(x, y) === false) {
                return false
            }
            let posChar = Tools.getPosition(x, y)
            if (posChar !== needToMatchChar) {
                return false
            }
            // 路径已被使用返回false
            if (needCheckSolution.positionSet.has(Tools.getPositionKey(x, y))) {
                return false
            }
            // 校验通过, 可以添加到已匹配列表中
            needCheckSolution.matchedCharList.push(needToMatchChar)

            if (word.length <= needCheckSolution.matchedCharList.length) {
                if (word === needCheckSolution.matchedCharList.join("")) {
                    console.log("find it!")
                    return true
                }
                return false
            }

            // 都符合条件, 则该位置可以继续探索
            let current_Position_X = x
            let current_Position_Y = y
            // 下一个位置

            // 判断上下左右是否有符合要求的位置
            let needCheckPositionList: TypePosition[] = [
                {
                    x: current_Position_X + 1,
                    y: current_Position_Y,
                },
                {
                    x: current_Position_X - 1,
                    y: current_Position_Y,
                },
                {
                    x: current_Position_X,
                    y: current_Position_Y + 1,
                },
                {
                    x: current_Position_X,
                    y: current_Position_Y - 1,
                },
            ]

            // 根据历史路径, 该点出发, 不能抵达目标, 记录到map里
            let posParentPathKey = Tools.positionList2Key([...needCheckSolution.positionList])
            let posKey = posParentPathKey + Const_Path_Split + Tools.getPositionKey(x, y)
            if (posKey === '{"x":3,"y":1}') {
                console.log("123")
            }
            // 下一轮需要探测的目标
            let nextNeedMatchStr = word.slice(wordCheckPosition + 1)

            // 依次对位置进行检测
            for (let needCheckPosition of needCheckPositionList) {
                // 拼接解
                let nextCheckSolution: TypeSolution = {
                    matchedCharList: [...needCheckSolution.matchedCharList],
                    positionList: [...needCheckSolution.positionList, {
                        x: needCheckPosition.x,
                        y: needCheckPosition.y
                    }],
                    positionSet: new Set([...needCheckSolution.positionSet.values(), Tools.getPositionKey(current_Position_X, current_Position_Y)])
                }



                // 看看是否曾经探测过
                if (posCannotReachTargetMap.has(posKey)) {
                    let oldSet = posCannotReachTargetMap.get(posKey)
                    if (oldSet.has(nextNeedMatchStr)) {
                        // 说明前人探过路了, 且探路失败, 直接略过即可
                        continue
                    }
                } else {
                    // 否则创建一个空记录
                    posCannotReachTargetMap.set(posKey, new Set([]))
                }

                let nextFloorCheckResult = slove(board, word, nextCheckSolution, wordCheckPosition + 1);
                if (nextFloorCheckResult === true) {
                    return true
                }
            }

            // 所有可能解都测试过, 确实搞不定
            let oldSet = posCannotReachTargetMap.get(posKey)
            // 留个路标, 造福后人
            posCannotReachTargetMap.set(posKey, new Set([...oldSet.values(), nextNeedMatchStr]))
            return false
        }

    }

}
function exist(board: string[][], word: string): boolean {
    hasTestPathSet = new Set()
    posCannotReachTargetMap = new Map()
    let result = slove(board, word, {
        matchedCharList: [],
        positionList: [],
        positionSet: new Set()
    }, 0)
    return result
};

let a = exist(
    // case 1
    // [
    //     ["A", "A", "A", "A", "A", "A"],
    //     ["A", "A", "A", "A", "A", "A"],
    //     ["A", "A", "A", "A", "A", "A"],
    //     ["A", "A", "A", "A", "A", "A"],
    //     ["A", "A", "A", "A", "A", "A"],
    //     ["A", "A", "A", "A", "A", "A"]
    // ],
    // "AAAAAAAAAAAAAA"

    // case 2
    // [["a", "a"]],
    // "aa"

    // case 3
    // [
    //     ["C", "A", "A"],
    //     ["A", "A", "A"],
    //     ["B", "C", "D"]
    // ],
    // "AAB"

    // case4
    // [
    //     ["A", "A", "A", "A", "A", "A"],
    //     ["A", "A", "A", "A", "A", "A"],
    //     ["A", "A", "A", "A", "A", "A"],
    //     ["A", "A", "A", "A", "A", "A"],
    //     ["A", "A", "A", "A", "A", "A"],
    //     ["A", "A", "A", "A", "A", "A"]
    // ],
    // "AAAAAAAAAAAAAB"

    // case5
    // [["a", "a"]],
    // "aaa"

    // case6
    // [
    //     ["A", "B", "C", "E"],
    //     ["S", "F", "C", "S"],
    //     ["A", "D", "E", "E"]
    // ],
    // "ABCCED"

    // case7
    [
        ["A", "B", "C", "E"],
        ["S", "F", "E", "S"],
        ["A", "D", "E", "E"]
    ],
    "ABCESEEEFS"
)
console.log("result => ", a)