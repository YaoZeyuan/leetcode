function minDistance(word1: string, word2: string): number {
    if (word1.length === 0 || word2.length === 0) {
        return Math.max(word1.length, word2.length)
    }

    const Tools = {
        /**
             * 获取指定位置上的记录
             * @param rect 
             * @param x 
             * @param y 
             * @returns 
             */
        getPosition: (rect: string[][], x: number, y: number) => {
            return rect[y][x]
        },
    }

    // 创建表格
    let x_word1Length = word1.length
    let y_word2Length = word2.length

    // 初始化缓存矩阵, 缓存矩阵表示从x轴字符串转换到y轴字符串所需的最小编辑距离.
    let cacheRect = []
    for (let x = 0; x < x_word1Length; x++) {
        for (let y = 0; y < y_word2Length; y++) {
            if (cacheRect[y] === undefined) {
                cacheRect[y] = []
            }
            cacheRect[y][x] = 0
        }
    }

    // 开始比较矩阵内的值
    // 首先, 初始化(0,y) 和 (x, 0)内的值. 第一排只有一个字母, 所以容易计算
    // 若两个char相等, 则取左侧值
    // 若两个char不等, 则取左侧值+1

    // x/y只能用一次
    let x_has_use = false
    let y_has_use = false

    for (let x = 0; x < x_word1Length; x++) {
        for (let y = 0; y < y_word2Length; y++) {
            if (x === 0) {
                let xChar = word1[x]
                let yChar = word2[y]

                let last_y_value = cacheRect?.[y - 1]?.[x] || 0

                if (xChar === yChar && y_has_use === false) {
                    cacheRect[y][x] = last_y_value
                    y_has_use = true
                    if (y === 0) {
                        x_has_use = true
                    }
                } else {
                    cacheRect[y][x] = last_y_value + 1
                }
            } else {

                if (y === 0) {
                    let xChar = word1[x]
                    let yChar = word2[y]

                    let last_x_value = cacheRect?.[y]?.[x - 1] || 0
                    if (xChar === yChar && x_has_use === false) {
                        cacheRect[y][x] = last_x_value
                        x_has_use = true
                    } else {
                        cacheRect[y][x] = last_x_value + 1
                    }
                }
            }

        }
    }
    // 然后, 从第二排开始比较
    // 比较原则:
    // 若两个char相等, 则取min([x-1][y-1] -1, [x-1][y], [x][y-1]) + 1
    // 若两个char不等, 则取min([x-1][y-1], [x-1][y], [x][y-1]) + 1
    for (let x = 1; x < x_word1Length; x++) {
        for (let y = 1; y < y_word2Length; y++) {
            let xChar = word1[x]
            let yChar = word2[y]

            if (xChar === yChar) {
                cacheRect[y][x] = 1 + Math.min(cacheRect[y - 1][x], cacheRect[y][x - 1], cacheRect[y - 1][x - 1] - 1)
            } else {
                cacheRect[y][x] = 1 + Math.min(cacheRect[y - 1][x], cacheRect[y][x - 1], cacheRect[y - 1][x - 1])
            }
        }
    }

    let rectStr = ''
    for (let line of cacheRect) {
        rectStr += line.map(item => `${item}`.padEnd(2, ' ')).join(" ") + '\n'
    }
    // console.log(rectStr)

    return cacheRect[y_word2Length - 1][x_word1Length - 1];
};





let testCaseList = [
    {
        inputList: [
            "ABCDG",
            "ABCD",
        ],
        output: 1
    },
    {
        inputList: [
            "intention",
            "execution",
        ],
        output: 5
    },
    {
        inputList: [
            "",
            "",
        ],
        output: 0
    },
    {
        inputList: [
            "zoologicoarchaeologist",
            "zoogeologist"
        ],
        output: 10
    },
    {
        inputList: [
            "_lige",
            "_ge"
        ],
        output: 2
    },

    {
        inputList: [
            // "zoologicoarchaeologist",
            "zolo",
            "zo"
        ],
        output: 2
    },
    {
        inputList: [
            "itt",
            "eet",
        ],
        output: 2
    },


    {
        inputList: [
            "sea",
            "eat"
        ],
        output: 2
    },

    {
        inputList: [
            "ilige",
            "ige"
        ],
        output: 2
    },
]

// testCaseList = [testCaseList[testCaseList.length - 1]]

let counter = -1
for (let testCase of testCaseList) {
    counter++
    console.info(`🕛开始第${counter}项测试`)
    // @ts-ignore
    let result = minDistance(...testCase.inputList)
    if (result !== testCase.output) {
        console.warn(`🤦‍♂️第${counter}项测试失败, input:${testCase.inputList}, 预期值: ${testCase.output}, 实际回答: ${result} `)
    } else {
        console.info(`🎉第${counter} 项测试成功`)
    }
}