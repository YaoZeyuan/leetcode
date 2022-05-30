function exist(board: string[][], word: string): boolean {
    type Type_Pos = {
        x: number
        y: number
    }

    function getXY(pos: Type_Pos) {
        let { x, y } = pos
        return board[y][x]
    }

    function pos2String(pos: Type_Pos) {
        return JSON.stringify(pos)
    }

    // 暴力搜索即可
    type Type_Record = {
        // 剩余待匹配字符列表
        remainCharList: string[]
        // 已使用的pos, 值为通过pos2String转换的值, 方便测试
        usedPosSet: Set<string>
        currentPos: Type_Pos
        // 已验证的字母序, 方便debug
        hasCheckdCharList: { char: string; pos: Type_Pos }[]
    }

    let guessRecordList: Type_Record[] = []
    const Const_Max_X = board[0].length
    const Const_Max_Y = board.length
    // 剩余待匹配的字符
    let remainCharList = word.split('')
    remainCharList.shift()
    // 找到首字母可以匹配的项, 然后进行计算
    for (let x = 0; x < Const_Max_X; x++) {
        for (let y = 0; y < Const_Max_Y; y++) {
            let char = getXY({
                x,
                y,
            })
            if (char === word[0]) {
                guessRecordList.push({
                    remainCharList: remainCharList,
                    usedPosSet: new Set([
                        pos2String({
                            x,
                            y,
                        }),
                    ]),
                    currentPos: {
                        x,
                        y,
                    },
                    hasCheckdCharList: [
                        {
                            char: char,
                            pos: {
                                x,
                                y,
                            },
                        },
                    ],
                })
            }
        }
    }

    function checkIsLegal(startRecordPos: Type_Record) {
        // 解除引用
        let currentRecord = {
            ...startRecordPos,
        }
        // 从第一个位置开始, 检查可能性
        // 深度优先进行检测
        let nextRemainCharList = [...currentRecord.remainCharList]
        if (nextRemainCharList.length === 0) {
            // 检测成功
            return true
        }
        // 否则, 弹出第一个char, 进行检测
        let nextChar = nextRemainCharList.shift()
        let currentPos = { ...currentRecord.currentPos }
        let checkPosList: Type_Pos[] = [
            {
                x: currentPos.x - 1,
                y: currentPos.y,
            },
            {
                x: currentPos.x,
                y: currentPos.y - 1,
            },
            {
                x: currentPos.x + 1,
                y: currentPos.y,
            },
            {
                x: currentPos.x,
                y: currentPos.y + 1,
            },
        ]
        for (let checkPos of checkPosList) {
            // 位置本身不合法
            if (checkPos.x < 0 || checkPos.x >= Const_Max_X) {
                continue
            }
            if (checkPos.y < 0 || checkPos.y >= Const_Max_Y) {
                continue
            }
            // 位置已经出现过
            if (currentRecord.usedPosSet.has(pos2String(checkPos))) {
                continue
            }
            // 字符不对
            if (getXY(checkPos) !== nextChar) {
                continue
            }
            // 深度搜索, 拿到下一个值
            let nextRecord = {
                ...currentRecord,
            }
            nextRecord.currentPos = checkPos
            nextRecord.remainCharList = [...nextRemainCharList]
            nextRecord.usedPosSet = new Set([...nextRecord.usedPosSet.values(), pos2String(checkPos)])
            nextRecord.hasCheckdCharList = [
                ...nextRecord.hasCheckdCharList,
                {
                    char: nextChar,
                    pos: checkPos,
                },
            ]
            let isSubLegal = checkIsLegal(nextRecord)
            if (isSubLegal === true) {
                return true
            }
            // 否则继续向后检测
        }
        return false
    }
    for (let guessRecord of guessRecordList) {
        let isLegal = checkIsLegal(guessRecord)
        if (isLegal) {
            return true
        }
    }
    return false
}

console.log(
    exist(
        [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'E', 'S'],
            ['A', 'D', 'E', 'E'],
        ],
        'ABCESEEEFS',
    ),
)
