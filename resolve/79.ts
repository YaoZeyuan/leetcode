type TypePosition = { x: number, y: number }
type TypeSolution = {
    // 匹配文字序列
    charList: string[]
    // 匹配坐标序列
    positionList: TypePosition[],
    // 已有位置列表
    positionSet: Set<string>
}

let slove
let pathHasCheckSet: Set<string>

{
    let total_第n轮匹配 = 0

    // 记录检查过的路径
    pathHasCheckSet = new Set()

    /**
     * @param board 
     * @param word 
     * @param waitToCheckSolutionList 待检查的位置列表 
     * @param wordCheckPosition 待检查的字符位置, 从0开始. 若到最后一个仍符合要求, 那么返回true
     */
    slove = (board: string[][], word: string, waitToCheckSolutionList: TypeSolution[], wordCheckPosition: number) => {
        if (word.length === 0) {
            // 长度为0必然正确
            return true;
        }
        if (word.length <= wordCheckPosition) {
            // 所有待检验位置均已匹配完毕
            if (waitToCheckSolutionList.length > 0) {
                return true;
            } else {
                return false;
            }
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


        // 待检查的char
        let needToMatchChar = word[wordCheckPosition]

        if (wordCheckPosition === 0) {
            // 首次匹配
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    let char = Tools.getPosition(x, y)
                    if (char === needToMatchChar) {
                        let newPosition = {
                            charList: [char],
                            "positionList": [
                                { x, y }
                            ],
                            positionSet: new Set([Tools.getPositionKey(x, y)])
                        }
                        waitToCheckSolutionList.push(
                            newPosition
                        )
                        let key = Tools.positionList2Key(newPosition.positionList)
                        pathHasCheckSet.add(key)
                    }
                }
            }

            console.log(`第${total_第n轮匹配++}轮匹配, 待匹配项目数${waitToCheckSolutionList.length}个`)
            return slove(board, word, [...waitToCheckSolutionList], wordCheckPosition + 1)
        } else {
            // 后续匹配

            let nextLegalPositionList: TypeSolution[] = []
            // 针对已有的记录进行检查, 后续对首元素而言, 必然是剪枝操作, 不会新增
            for (let existLegalPosition of waitToCheckSolutionList) {
                // 拿到当前定位
                let currentPosition = existLegalPosition.positionList[existLegalPosition.positionList.length - 1]
                let current_Position_X = currentPosition.x
                let current_Position_Y = currentPosition.y

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
                // 依次对位置进行检测
                for (let needCheckPosition of needCheckPositionList) {
                    let { x, y } = needCheckPosition
                    // console.debug({ x, y }, "=>", Tools.getPosition(x, y))
                    // 位置不合法不要
                    if (Tools.isPositionLegal(x, y) === false) {
                        continue;
                    }
                    // 匹配不上不要
                    if (Tools.getPosition(x, y) !== needToMatchChar) {
                        continue;
                    }
                    // 曾经出现过不要
                    let positionKey = Tools.getPositionKey(x, y)
                    if (existLegalPosition.positionSet.has(positionKey)) {
                        continue
                    }
                    // 都符合条件, 则该位置可以继续探索

                    let newPosition = {
                        charList: [...existLegalPosition.charList, needToMatchChar],
                        "positionList": [...existLegalPosition.positionList, { x, y }],
                        "positionSet": new Set([...existLegalPosition.positionSet.values(), Tools.getPositionKey(x, y)])
                    }
                    let key = Tools.positionList2Key(newPosition.positionList)
                    if (pathHasCheckSet.has(key) === false) {
                        nextLegalPositionList.push(newPosition)
                        pathHasCheckSet.add(key)
                    } else {
                        // 剪枝
                        continue;
                    }
                }


            }
            console.log(`第${total_第n轮匹配++}轮匹配, 待匹配项目数${waitToCheckSolutionList.length}个`)
            if (nextLegalPositionList.length === 0) {
                return false
            } else {
                // 对nextLegalPositionList进行去重
                console.log(`本轮共有${nextLegalPositionList.length}条结果`)
                return slove(board, word, nextLegalPositionList, wordCheckPosition + 1)
            }
        }

        // 深度优先策略

        // 第二步, 针对每一个符合要求的格子, 检查其上下左右是否仍符合要求
        // 若符合要求, 则继续向下递归查找
        // 若不符合要求, 则跳过


    }
}


function exist(board: string[][], word: string): boolean {
    let result = slove(board, word, [], 0)
    pathHasCheckSet = new Set()
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

    [
        ["A", "A", "A", "A", "A", "A"],
        ["A", "A", "A", "A", "A", "A"],
        ["A", "A", "A", "A", "A", "A"],
        ["A", "A", "A", "A", "A", "A"],
        ["A", "A", "A", "A", "A", "A"],
        ["A", "A", "A", "A", "A", "A"]
    ],
    "AAAAAAAAAAAAAAB"
)
console.log("result => ", a)