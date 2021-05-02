type TypeMatrix = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}
// 获取矩阵记录
function getMatrixKey(matrixDefine: TypeMatrix) {
    return `${matrixDefine.startX}_${matrixDefine.endX}_${matrixDefine.startY}_${matrixDefine.endY}`
}

function maximalRectangle(matrix: string[][]): number {
    let height = matrix.length
    if (height === 0) {
        return 0
    }
    let width = matrix[0].length
    if (width === 0) {
        return 0
    }
    let matrixMap = new Map<string, {
        matrix: TypeMatrix,
        size: number,
        isLegal: boolean,
    }>()

    // 按x/y获取矩阵节点, 符合习惯
    function getMatrixItem(x: number, y: number) {
        return matrix[y][x]
    }
    /**
     * 检查矩阵是否合法, 若非法(包含0节点)返回false, 合法返回true, 并加入matrixMap中
     * @param testMatrix 
     */
    function testMatrixLegalAndAppendIntoMatrixMap(testMatrix: TypeMatrix) {
        let testMatrixKey = getMatrixKey(testMatrix)
        if (matrixMap.has(testMatrixKey)) {
            return matrixMap.get(testMatrixKey).isLegal
        }

        // 不需要考虑小于0和大于宽高的情况, 我们是有节操的人, 不需要考虑防御式编程
        for (let testX = testMatrix.startX; testX <= testMatrix.endX; testX++) {
            for (let testY = testMatrix.startY; testY <= testMatrix.endY; testY++) {
                if (getMatrixItem(testX, testY) === '0') {
                    matrixMap.set(testMatrixKey, {
                        isLegal: false,
                        size: 0,
                        matrix: {
                            ...testMatrix
                        },
                    })
                    return false
                }
            }
        }
        matrixMap.set(testMatrixKey, {
            isLegal: true,
            size: (testMatrix.endX - testMatrix.startX + 1) * (testMatrix.endY - testMatrix.startY + 1),
            matrix: {
                ...testMatrix
            },
        })
        return true
    }

    // 第一步, 给定横纵坐标, 给出包含该节点下所有符合要求的矩阵列表
    function getMatrixList(x: number, y: number) {
        // 先看x/y本身是不是一个矩阵
        let testMatrix: TypeMatrix = {
            startX: x,
            endX: x,
            startY: y,
            endY: y,
        }
        let testResult = testMatrixLegalAndAppendIntoMatrixMap(testMatrix);
        if (testResult === false) {
            return
        }
        // 先测x轴

        // 测最小startX
        let legalMinStartX = x - 1

        while (testResult === true && legalMinStartX > 0) {
            testResult = testMatrixLegalAndAppendIntoMatrixMap({
                startX: legalMinStartX,
                endX: x,
                startY: y,
                endY: y
            });
            if (testResult) {
                legalMinStartX = legalMinStartX - 1
            }
        }
        legalMinStartX = legalMinStartX + 1
        // 测最大endX
        testResult = true
        let legalMaxEndX = x + 1
        while (testResult === true && legalMaxEndX < width) {
            testResult = testMatrixLegalAndAppendIntoMatrixMap({
                startX: x,
                endX: legalMaxEndX,
                startY: y,
                endY: y
            });
            if (testResult) {
                legalMaxEndX = legalMaxEndX + 1
            }
        }
        legalMaxEndX = legalMaxEndX - 1
        // 针对x轴上每一个可能的节点, 向两个方向测试最大的y

        // x轴的上下界
        let testStartX = legalMinStartX
        let testEndX = legalMaxEndX

        let nextStep: 'testStartX + 1' | 'testEndX - 1' = 'testStartX + 1'
        for (; testStartX >= 0 && testStartX <= x && testEndX >= x && testEndX < width;) {
            // 给定startX和endX, 求允许的y上下界

            // 检测出基于testStartX和testEndX的y的上下界
            // 先不断递减startY, 直到非法, 找到startY的下界

            let isMatrixLegal = true
            let legalMinStartY = y
            while (isMatrixLegal === true && legalMinStartY >= 0) {
                isMatrixLegal = testMatrixLegalAndAppendIntoMatrixMap({
                    startX: testStartX,
                    endX: testEndX,
                    startY: legalMinStartY,
                    endY: y
                })
                if (isMatrixLegal) {
                    legalMinStartY = legalMinStartY - 1
                }
            }
            legalMinStartY = legalMinStartY + 1

            // 然后找到EndY的上界
            // 不断递增endY, 直到非法
            isMatrixLegal = true
            let legalMaxEndY = y
            while (isMatrixLegal === true && legalMaxEndY < height) {
                isMatrixLegal = testMatrixLegalAndAppendIntoMatrixMap({
                    startX: testStartX,
                    endX: testEndX,
                    startY: legalMinStartY,
                    endY: legalMaxEndY
                })
                if (isMatrixLegal) {
                    legalMaxEndY = legalMaxEndY + 1
                }
            }
            legalMaxEndY = legalMaxEndY - 1
            // 然后依次startX+1或endX减1, 缩小范围, 重复循环
            switch (nextStep) {
                case "testStartX + 1":
                    testStartX = testStartX + 1;
                    nextStep = 'testEndX - 1'
                    break;
                case "testEndX - 1":
                    testEndX = testEndX - 1
                    nextStep = 'testStartX + 1'
                    break;
            }
        }

        return
    }
    // 遍历矩阵中每一个元素
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            getMatrixList(x, y)
        }
    }

    // 第二部, 判断所有矩阵列表, 给出最大体积
    let maxMatrixSize = 0
    for (let config of matrixMap.values()) {
        if (config.isLegal === true) {
            if (config.size > maxMatrixSize) {
                maxMatrixSize = config.size
            }
        }
    }
    return maxMatrixSize
};

let testCase = {
    "官方": [
        ["1", "0", "1", "0", "0"],
        ["1", "0", "1", "1", "1"],
        ["1", "1", "1", "1", "1"],
        ["1", "0", "0", "1", "0"]
    ],
    "官方-2": [
        ["0", "1", "1", "0", "0", "1", "0", "1", "0", "1"],
        ["0", "0", "1", "0", "1", "0", "1", "0", "1", "0"],
        ["1", "0", "0", "0", "0", "1", "0", "1", "1", "0"],
        ["0", "1", "1", "1", "1", "1", "1", "0", "1", "0"],
        ["0", "0", "1", "1", "1", "1", "1", "1", "1", "0"],
        ["1", "1", "0", "1", "0", "1", "1", "1", "1", "0"],
        ["0", "0", "0", "1", "1", "0", "0", "0", "1", "0"],
        ["1", "1", "0", "1", "1", "0", "0", "1", "1", "1"],
        ["0", "1", "0", "1", "1", "0", "1", "0", "1", "1"]
    ],
    '测试': [['1', '1', '1'], ['1', '1', '1'], ['1', '1', '1'], ['1', '1', '1'], ['1', '0', '1'], ['1', '1', '1']],
    "测试-2": [
        ["1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1"],
    ],
    "测试-3": []
}

let result = maximalRectangle(testCase['官方-2'])


console.log(result)