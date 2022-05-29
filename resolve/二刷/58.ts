function lengthOfLastWord(s: string): number {
    let newS = s.trim().replace(/\ +/g, ',')
    let lastWord = newS.split(",").pop()
    return lastWord.length
}
