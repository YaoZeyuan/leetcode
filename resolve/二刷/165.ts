function compareVersion(version1: string, version2: string): number {
    let version1List = version1.split('.')
    let version2List = version2.split('.')
    let maxLength = Math.max(version1List.length, version2List.length)
    // 补充到3位
    while (version1List.length < maxLength) {
        version1List.push('0')
    }
    while (version2List.length < maxLength) {
        version2List.push('0')
    }
    // 开始比较
    for (let pos = 0; pos < maxLength; pos++) {
        let v1 = parseInt(version1List[pos])
        let v2 = parseInt(version2List[pos])
        if (v1 === v2) {
            continue
        } else if (v1 < v2) {
            return -1
        } else {
            return 1
        }
    }
    return 0
}
