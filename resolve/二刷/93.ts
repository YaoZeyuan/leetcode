function restoreIpAddresses(s: string): string[] {
    // 拆分类问题
    // 将字符串按1~3位进行拆分, 要求拆分后每段必须在0~255之间, 且不能含前导0
    // 且最终一定是拆分出4段

    type Type_Split_Result = {
        isLegal: boolean
        subList: string[]
    }

    // 判断ip字段是否合法
    function isLegal(ip: string) {
        if (ip.length > 1 && ip.startsWith('0')) {
            return false
        }
        let intIp = parseInt(ip)
        if (0 <= intIp && intIp <= 255) {
            return true
        }
        return false
    }

    // 工具函数, 递归拆分
    function generateIp(inputStr: string, currentLevel = 0): Type_Split_Result {
        // 防御函数
        if (currentLevel > 3) {
            if (inputStr === '') {
                return {
                    isLegal: true,
                    subList: [''],
                }
            }
            return {
                isLegal: false,
                subList: [],
            }
        }
        if (currentLevel === 3) {
            if (inputStr.length > 3) {
                return {
                    isLegal: false,
                    subList: [],
                }
            }
        }

        let resultList: string[] = []

        let guess1 = inputStr.slice(0, 1)
        if (isLegal(guess1)) {
            let guess1RemainResult = generateIp(inputStr.slice(1), currentLevel + 1)
            if (guess1RemainResult.isLegal) {
                resultList = [...resultList, ...guess1RemainResult.subList.map((item) => `${guess1}.${item}`.replace(/\.$/, ''))]
            }
        }
        let guess2 = inputStr.slice(0, 2)
        if (isLegal(guess2)) {
            let guess2RemainResult = generateIp(inputStr.slice(2), currentLevel + 1)
            if (guess2RemainResult.isLegal) {
                resultList = [...resultList, ...guess2RemainResult.subList.map((item) => `${guess2}.${item}`.replace(/\.$/, ''))]
            }
        }
        let guess3 = inputStr.slice(0, 3)
        if (isLegal(guess3)) {
            let guess3RemainResult = generateIp(inputStr.slice(3), currentLevel + 1)
            if (guess3RemainResult.isLegal) {
                resultList = [...resultList, ...guess3RemainResult.subList.map((item) => `${guess3}.${item}`.replace(/\.$/, ''))]
            }
        }

        return {
            isLegal: resultList.length > 0,
            subList: [...new Set(resultList).values()],
        }
    }
    let result = generateIp(s)
    return result.subList
}

// console.log(restoreIpAddresses('2525511135'))
