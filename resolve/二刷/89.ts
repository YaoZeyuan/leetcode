function grayCode(n: number): number[] {
    // 格雷编码的关键在于:
    // 不需要理解格雷码本身, 只要按要求生成相邻整数二进制位正好不同的二进制序列即可
    // 需要配合二进制转十进制函数

    // 工具函数: 将二进制字符串转为十进制数
    function binary2int(inputStr: string) {
        let result = 0
        for (let pos = 0; pos < inputStr.length; pos++) {
            if (inputStr[pos] === '1') {
                result = result + Math.pow(2, pos)
            } else {
                // 为0则不需要加
                continue
            }
        }
        return result
    }

    // 生成二进制字符串
    function generate(inputNum: number) {
        if (inputNum === 1) {
            return ['0', '1']
        }
        // 否则
        let subResultList = generate(inputNum - 1)
        return [...subResultList.map((item) => `${0}${item}`), ...[...subResultList].reverse().map((item) => `${1}${item}`)]
    }
    let strList = generate(n)
    let resultList = strList.map((item) => binary2int(item))
    return resultList
}

// console.log(grayCode(2))
