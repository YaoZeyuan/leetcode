function isPalindrome(s: string): boolean {
    // 过滤出字母和数字
    let targetCharList = s
        .toLowerCase()
        .split('')
        .filter((item) => {
            return item.match(/[a-z0-9]/) !== null
        })

    return targetCharList.join('') === [...targetCharList].reverse().join('')
}

