function numDecodings(s: string): number {
    // 分别取1位或2位字符, 进行匹配
    function transNum2Str(char: string) {
        if (char === '0') {
            return ''
        }
        if (parseInt(char) > 26) {
            return ''
        }
        return String.fromCharCode('A'.charCodeAt(0) + parseInt(char) - 1)
    }

    const Const_Parse_Error_Flag = false
    let answerCache = new Map<string, number | typeof Const_Parse_Error_Flag>()

    // 通过子函数进行匹配工作
    // 目标是生成inputStr对应的所有可能子字符串Set
    function generateMatchStr(inputStr: string): number | false {
        let key = inputStr
        if (answerCache.has(key)) {
            return answerCache.get(key)
        }
        if (inputStr.length === 0) {
            return 0
        } else if (inputStr.length === 1) {
            let transChar_1 = transNum2Str(inputStr.slice(0, 1))
            if (transChar_1 === '') {
                return Const_Parse_Error_Flag
            } else {
                return 1
            }
        }

        // 长度大于2时
        let subTransChar_1_Count = 0
        let is_1_success = true
        let transChar_1 = transNum2Str(inputStr.slice(0, 1))
        if (transChar_1 === '') {
            return Const_Parse_Error_Flag
        } else {
            let buf = generateMatchStr(inputStr.slice(1))
            // 缓存结果
            answerCache.set(inputStr.slice(1), buf)
            if (buf !== Const_Parse_Error_Flag) {
                if (buf === 0) {
                    subTransChar_1_Count = 1
                } else {
                    subTransChar_1_Count = buf
                }
            } else {
                is_1_success = false
            }
        }

        let subTransChar_2_Count: number = 0
        let transChar_2 = transNum2Str(inputStr.slice(0, 2))
        let is_2_success = true
        if (transChar_2 === '') {
            if (is_1_success) {
                // 2字符不成立时, 字符为1的可能仍然成立
                return subTransChar_1_Count
            } else {
                return Const_Parse_Error_Flag
            }
        } else {
            let buf = generateMatchStr(inputStr.slice(2))
            // 缓存结果
            answerCache.set(inputStr.slice(2), buf)
            if (buf !== Const_Parse_Error_Flag) {
                if (buf === 0) {
                    subTransChar_2_Count = 1
                } else {
                    subTransChar_2_Count = buf
                }
            } else {
                is_2_success = false
            }
        }
        let result: number | typeof Const_Parse_Error_Flag = 0
        if (is_1_success || is_2_success) {
            result = subTransChar_1_Count + subTransChar_2_Count
        } else {
            result = Const_Parse_Error_Flag
        }
        answerCache.set(key, result)
        return result
    }

    // 执行匹配
    let result = generateMatchStr(s)

    return result === false ? 0 : result
}

// console.log(numDecodings('12'))