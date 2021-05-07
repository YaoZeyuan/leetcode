let callCount = 0

function isScramble(s1: string, s2: string): boolean {
    function getKey(inputString: string, checkString: string) {
        return `${inputString}_${checkString}`
    }
    class TimeCount {
        private timeCount: { [key: string]: number } = {}
        public timeCountHash: string = ''

        constructor(inputString: string) {
            // 初始化频率统计, 作为指纹
            for (let char of inputString) {
                if (this.timeCount[char]) {
                    this.timeCount[char] += 1
                } else {
                    this.timeCount[char] = 1
                }
            }
            // 生成指纹, 方便比较
            let keyList = [...Object.keys(this.timeCount)].sort()
            for (let key of keyList) {
                this.timeCountHash = this.timeCountHash + `${key}:${this.timeCount[key]}`
            }
        }

        hasSameTimeCount(other: TimeCount) {
            return other.timeCountHash === this.timeCountHash
        }

    }

    class CacheMap {
        private cacheMap = new Map<string, boolean>()
        public add(key: string, result: boolean) {
            // callCount++
            // if (result) {
            //     console.log(`${key} => true`)
            // }
            this.cacheMap.set(key, result)
        }
        public isExist(key: string) {
            return this.cacheMap.has(key)
        }
        public get(key: string) {
            return this.cacheMap.get(key)
        }
    }
    let cacheMap = new CacheMap()

    function check(inputString: string, checkString: string) {
        let public_key = getKey(inputString, checkString)
        if (cacheMap.isExist(public_key)) {
            return cacheMap.get(public_key)
        }




        // 如果一个字符串, 左侧是扰乱字符串, 右侧也是扰乱字符串, 那么整体就是扰乱字符串
        // 扰乱字符串的特点: 字母出现频率必然一致
        let originString = inputString
        let needCheckString = checkString

        // 只有0/1/2位时, 可以手工检测
        if (originString.length !== needCheckString.length) {
            // 位数不同, 一定不等
            return false
        }
        if (originString.length === 0) {
            return true
        }
        let originTimeCount = new TimeCount(originString)
        let needCheckTimeCount = new TimeCount(needCheckString)

        if (originString.length <= 3) {
            // 3位及以下, 只要字母频率一样, 就一定是混淆字符串
            return originTimeCount.timeCountHash === needCheckTimeCount.timeCountHash
        }

        // 若hash不对, 也不需要继续向下比较
        if (originTimeCount.timeCountHash !== needCheckTimeCount.timeCountHash) {
            return false
        }

        // 1 => 1
        // 2 => 2
        // 3 => 6
        // 4 => 22
        // 5 => 90
        // 6 => 394
        // 形如1234的4位字符 => 应有24种, 实有22种, 3142 和 2431 没有
        // 形如12345的5位字符 => 应有120种, 实有90种
        // 形如123456的6位字符 => 应有720种, 实有394种
        // if (originString.length === 4) {
        //     let [a, b, c, d] = originString
        //     // 长度为4的字符串只有两种情况不是混淆字符串
        //     if (needCheckString === [c, a, d, b].join("") || needCheckString === [b, d, c, a].join("")) {
        //         return false
        //     }
        //     return true
        // }


        // 4位字符及以上, 需要特别处理

        // 检测本身是否为扰乱字符串
        if (originString === needCheckString) {
            // 两个字符串相等, 肯定是扰乱字符串
            return true
        }

        // 4位字符及以上, 需要分区域检测
        for (let splitAt = 0; splitAt < needCheckString.length - 1; splitAt++) {
            let leftNeedCheckString = needCheckString.substring(0, splitAt + 1)
            let rightNeedCheckString = needCheckString.substring(splitAt + 1)
            let leftOriginCheckString_1 = originString.substring(0, splitAt + 1)
            let rightOriginCheckString_1 = originString.substring(splitAt + 1)
            let leftOriginCheckString_2 = originString.substring(0, originString.length - splitAt - 1)
            let rightOriginCheckString_2 = originString.substring(originString.length - splitAt - 1)

            // 先看是不是一次扰乱字符串 - 1 左右未扰乱
            let leftCheckResult = check(leftNeedCheckString, leftOriginCheckString_1)
            cacheMap.add(getKey(leftNeedCheckString, leftOriginCheckString_1), leftCheckResult)
            let rightCheckResult = false
            if (leftCheckResult === true) {
                // 若左侧不对, 右侧没必要在进行运算
                rightCheckResult = check(rightNeedCheckString, rightOriginCheckString_1)
                cacheMap.add(getKey(rightNeedCheckString, rightOriginCheckString_1), rightCheckResult)
                if (rightCheckResult === true) {
                    // 只要左右分支均为混淆字符串, 则总体即为混淆字符串
                    return true
                }
            }

            // 先看是不是一次扰乱字符串 - 2 左右扰乱
            leftCheckResult = check(leftNeedCheckString, rightOriginCheckString_2)
            cacheMap.add(getKey(leftNeedCheckString, rightOriginCheckString_2), leftCheckResult)

            if (leftCheckResult === true) {
                // 若左侧不对, 右侧没必要在进行运算
                rightCheckResult = check(rightNeedCheckString, leftOriginCheckString_2)
                cacheMap.add(getKey(rightNeedCheckString, leftOriginCheckString_2), rightCheckResult)
                if (rightCheckResult === true) {
                    // 只要左右分支均为混淆字符串, 则总体即为混淆字符串
                    return true
                }
            }
        }
        return false
    }

    return check(s1, s2)
};

let testCase87 = {
    "测试1": {
        input_1: '',
        input_2: "",
        target: true,
    },
    "测试2": {
        input_1: 'abcdefghihigfabcde',
        input_2: "higfabcdeabcdefghi",
        target: true,
    },
    "测试3": {
        input_1: 'dace',
        input_2: 'aedc',
        target: false,
    },
    "官方1": {
        // 超时
        input_1: 'ebaacbcbcadaaedceaaacadccd',
        input_2: "adcaacabaddaceacbceaabeccd",
        target: false,
    },
    "官方2": {
        input_1: 'great',
        input_2: "rgeat",
        target: true,
    },
}
let useTestCase87 = '官方1'
// let useTestCase87 = '测试3'
let testResult87 = testCase87[useTestCase87].target === isScramble(testCase87[useTestCase87].input_1, testCase87[useTestCase87].input_2) ? "测试通过" : "测试失败"
