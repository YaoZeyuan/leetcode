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
let exist

const Const_Path_Split = '_===_'

let hasTestPathSet: Set<string> = new Set()
// 从位于pos上的点出发, 不可以达到的点的集合. 只记录完全不可能抵达的点, 如果只是由于路径不满足, 则不记录
let posCannotReachTargetMap: Map<string, Set<string>> = new Map()
// 状态堆栈
{
    /**
     * @param board 
     * @param word 
     * @param waitToCheckSolutionList 待检查的位置列表 
     * @param wordCheckPosition 待检查的字符位置, 从0开始. 若到最后一个仍符合要求, 那么返回true
     * @param isCheckHistoryPos 是否检查历史位置
     */
    let slove = (board: string[][], currentSolution: TypeSolution = {
        "matchedCharList": [],
        "positionList": [],
        "positionSet": new Set()
    }, needMatchPos: TypePosition, remainCharList: string[] = [], isCheckHistoryPos = true) => {

        // 解除引用关系
        remainCharList = [...remainCharList]

        computeCount++
        if (computeCount % 1000 == 0) {
            // console.log(`累计运算${computeCount}次`)
        }
        let currentNeedMatchChar = remainCharList[0]
        remainCharList = remainCharList.slice(1)

        if (currentNeedMatchChar === '' || currentNeedMatchChar === undefined) {
            // 没有剩余需要匹配的值了, 必然正确
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

        let { x, y } = needMatchPos

        // 位置是否合法
        if (Tools.isPositionLegal(x, y) === false) {
            return false
        }
        // 值是否匹配
        let pos_char = Tools.getPosition(x, y)
        if (pos_char !== currentNeedMatchChar) {
            return false
        }
        // 路径是否已被使用
        if (isCheckHistoryPos === true) {
            if (currentSolution.positionSet.has(Tools.getPositionKey(x, y))) {
                return false
            }
        }
        // 校验通过
        if (remainCharList.length === 0 && isCheckHistoryPos === true) {
            // 所有记录已匹配完毕, 直接返回
            // console.log("find it!")
            return true
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

        // 根据历史路径, 若从该点出发, 绝对不能抵达目标, 则记录到map里
        let posKey = Tools.getPositionKey(x, y)
        if (posKey === '{"x":3,"y":2}') {
            // console.log("123")
        }
        // 生成下一轮需要探测的目标

        // 当前状况
        let nextCheckSolution: TypeSolution = {
            matchedCharList: [...currentSolution.matchedCharList, currentNeedMatchChar],
            positionList: [...currentSolution.positionList, {
                x,
                y
            }],
            positionSet: new Set([...currentSolution.positionSet.values(), Tools.getPositionKey(x, y)])
        }


        // 再向下需要匹配的点
        let nextNeedMatchStr = remainCharList.join("")
        // 默认从该位置出发绝对不可满足目标
        let isAbsoluteCannotReach = true
        // 依次对位置进行检测
        for (let needCheckPosition of needCheckPositionList) {
            let nextPosKey = Tools.getPositionKey(needCheckPosition.x, needCheckPosition.y)
            // 看看是否曾经探测过
            if (posCannotReachTargetMap.has(nextPosKey)) {
                let oldSet = posCannotReachTargetMap.get(nextPosKey)
                if (oldSet.has(nextNeedMatchStr)) {
                    // 说明前人探过路了, 且探路失败, 直接略过即可
                    continue
                }
            } else {
                // 否则创建一个空记录
                posCannotReachTargetMap.set(nextPosKey, new Set([]))
            }
            // 预检查
            let firstCheckResult = slove(board, nextCheckSolution, needCheckPosition, remainCharList, false);
            if (firstCheckResult === false) {
                // 预检查不通过, 没必要再查后续的了
                continue
            } else {
                isAbsoluteCannotReach = false
            }

            let nextFloorCheckResult = slove(board, nextCheckSolution, needCheckPosition, remainCharList, true);
            if (nextFloorCheckResult === true) {
                return true
            }
        }

        if (isAbsoluteCannotReach === true) {
            // 四个方向都验证过, 绝对不可抵达, 记到map里
            // 所有可能解都测试过, 确实搞不定
            let oldSet: Set<string> = new Set()
            if (posCannotReachTargetMap.has(posKey)) {
                oldSet = posCannotReachTargetMap.get(posKey)
            }
            // 留个路标, 造福后人
            posCannotReachTargetMap.set(posKey, new Set([...oldSet.values(), nextNeedMatchStr]))
        }
        return false

    }

    exist = (board: string[][], word: string) => {
        if (word.length === 0) {
            return true
        }

        hasTestPathSet = new Set()
        posCannotReachTargetMap = new Map()

        let width = board[0].length
        let height = board.length

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let match_result = slove(board, {
                    matchedCharList: [],
                    positionList: [],
                    positionSet: new Set()
                },
                    {
                        x,
                        y
                    },
                    word.split(""),
                    true
                )
                if (match_result) {
                    return true
                }
            }
        }

        return false
    };
}

let testCaseList = [
    {
        input1: [
            ["C", "A", "A"],
            ["A", "A", "A"],
            ["B", "C", "D"]
        ],
        input2: "AAB",
        output: true
    },
    {
        input1: [
            ["A", "A", "A", "A", "A", "A"],
            ["A", "A", "A", "A", "A", "A"],
            ["A", "A", "A", "A", "A", "A"],
            ["A", "A", "A", "A", "A", "A"],
            ["A", "A", "A", "A", "A", "A"],
            ["A", "A", "A", "A", "A", "A"]
        ],
        input2: "AAAAAAAAAAAAAA"
        ,
        output: true
    },
    {
        input1: [
            ["A", "A", "A", "A", "A", "A"],
            ["A", "A", "A", "A", "A", "A"],
            ["A", "A", "A", "A", "A", "A"],
            ["A", "A", "A", "A", "A", "A"],
            ["A", "A", "A", "A", "A", "A"],
            ["A", "A", "A", "A", "A", "A"]
        ],
        input2: "AAAAAAAAAAAAAB",
        output: false
    },
    {
        input1: [["a", "a"]],
        input2: "aaa",
        output: false
    },

    {
        input1: [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"]
        ],

        input2: "ABCCED",
        output: true
    },
    {
        input1: [
            ["A", "B", "C", "E"],
            ["S", "F", "E", "S"],
            ["A", "D", "E", "E"]
        ],
        input2: "ABCESEEEFS",
        output: true
    },
    // {
    //     input1: ,
    //     input2: ,
    //     output: 
    // },
]

testCaseList = [testCaseList[0]]

let counter = -1
for (let testCase of testCaseList) {
    counter++
    console.info(`🕛开始第${counter}项测试`)
    let result = exist(testCase.input1, testCase.input2)
    if (result !== testCase.output) {
        console.warn(`🤦‍♂️第${counter}项测试失败, input1:${testCase.input1},input1:${testCase.input2},output:${testCase.output}, 实际回答:${result}`)
    } else {
        console.info(`🎉第${counter}项测试成功`)
    }
}