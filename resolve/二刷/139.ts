function wordBreak(s: string, wordDict: string[]): boolean {
    // 递归进行检测即可

    let globalCacheMap = new Map<string, boolean>()

    function check(inputStr: string) {
        if (inputStr === '') {
            return true
        }
        if (globalCacheMap.has(inputStr)) {
            return globalCacheMap.get(inputStr)
        }
        for (let wordCheck of wordDict) {
            if (inputStr.startsWith(wordCheck)) {
                // 如果可以, 则递归测试
                let remainStr = inputStr.slice(wordCheck.length)
                let subCheckResult = check(remainStr)
                if (subCheckResult) {
                    globalCacheMap.set(inputStr, true)
                    return true
                }
            }
        }
        globalCacheMap.set(inputStr, false)
        return false
    }
    let result = check(s)
    return result
}

console.log(
    wordBreak('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab', [
        'a',
        'aa',
        'aaa',
        'aaaa',
        'aaaaa',
        'aaaaaa',
        'aaaaaaa',
        'aaaaaaaa',
        'aaaaaaaaa',
        'aaaaaaaaaa',
    ]),
)
