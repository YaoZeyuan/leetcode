function strStr(haystack: string, needle: string): number {
    // 使用滑动窗口法解题
    let startPos = 0
    let endPos = needle.length
    while (endPos <= haystack.length) {
        if (haystack.slice(startPos, endPos) === needle) {
            return startPos
        }
        // 否则向前推进
        startPos = startPos + 1
        endPos = endPos + 1
    }
    return -1
}

console.log(strStr('211111', '111'))
