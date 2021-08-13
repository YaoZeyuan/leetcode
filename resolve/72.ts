function minDistance(word1: string, word2: string): number {
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
    for (let x = 0; x < x_word1Length; x++) {
        for (let y = 0; y < y_word2Length; y++) {
            if (x === 0) {
                let xChar = word1[x]
                let yChar = word2[y]
                if (xChar === yChar) {
                    cacheRect[y][x] = cacheRect?.[y - 1]?.[x] || 0
                } else {
                    cacheRect[y][x] = (cacheRect?.[y - 1]?.[x] || 0) + 1
                }
            }
            if (y === 0) {
                let xChar = word1[x]
                let yChar = word2[y]
                if (xChar === yChar) {
                    cacheRect[y][x] = cacheRect?.[y]?.[x - 1] || 0
                } else {
                    cacheRect[y][x] = (cacheRect?.[y]?.[x - 1] || 0) + 1
                }
            }
        }
    }
    // 然后, 从第二排开始比较
    // 比较原则:
    // 若两个char相等, 则取左侧上侧中较小值
    // 若两个char不等, 则取左侧上侧中较大值
    for (let x = 1; x < x_word1Length; x++) {
        for (let y = 1; y < y_word2Length; y++) {
            let xChar = word1[x]
            let yChar = word2[y]
            if (xChar === yChar) {
                cacheRect[y][x] = Math.min(cacheRect[y - 1][x], cacheRect[y][x - 1])
            } else {
                cacheRect[y][x] = Math.max(cacheRect[y - 1][x], cacheRect[y][x - 1])
            }
        }
    }

    console.log(cacheRect)

    return cacheRect[y_word2Length - 1][x_word1Length - 1];
};





let testCaseList = [
    {
        inputList: [
            "ABCDEB",
            "ABCDEB",
        ],
        output: 0
    },
]

// testCaseList = [testCaseList[0]]

let counter = -1
for (let testCase of testCaseList) {
    counter++
    console.info(`🕛开始第${counter}项测试`)
    // @ts-ignore
    let result = minDistance(...testCase.inputList)
    if (result !== testCase.output) {
        console.warn(`🤦‍♂️第${counter}项测试失败, input:${testCase.inputList}, output: ${testCase.output}, 实际回答: ${result} `)
    } else {
        console.info(`🎉第${counter} 项测试成功`)
    }
}