function singleNumber(nums: number[]): number {
    let hashObj = {}
    for (let num of nums) {
        if (hashObj[num]) {
            hashObj[num] = hashObj[num] + 1
        } else {
            hashObj[num] = 1
        }
    }

    for (let key of Object.keys(hashObj)) {
        if (hashObj[key] === 1) {
            return parseInt(key)
        }
    }
    return 0
}
