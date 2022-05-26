function groupAnagrams(strs: string[]): string[][] {
    function getHashKey(str: string) {
        let obj = {}
        for (let i = 0; i < str.length; i++) {
            let char = str[i]
            if (obj[char]) {
                obj[char] = obj[char] + 1
            } else {
                obj[char] = 1
            }
        }

        let resultList: string[] = []
        for (let key of Object.keys(obj)) {
            resultList.push(`${key}:${obj[key]}`)
        }
        return resultList.sort().join()
    }

    let strObj: {
        [key: string]: string[]
    } = {}
    for (let str of strs) {
        let key = getHashKey(str)
        if (strObj[key]) {
            strObj[key].push(str)
        } else {
            strObj[key] = [str]
        }
    }
    return [...Object.values(strObj)]
}
