function reverseWords(s: string): string {
    let targetStr = s.trim()
    let result = targetStr
        .split(' ')
        .filter((item) => item !== '')
        .reverse()
        .join(' ')
    return result
}
