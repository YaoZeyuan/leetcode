function isScramble(s1: string, s2: string): boolean {
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

    // 列举所有可能的扰乱字符串
    function generateAllScreamStringList(targetString: string): Set<string> {
        if (targetString.length <= 1) {
            return new Set([targetString])
        }
        let maybeSet = new Set([])
        for (let splitAt = 0; splitAt < targetString.length - 1; splitAt++) {
            let leftString = targetString.substring(0, splitAt + 1)
            let rightString = targetString.substring(splitAt + 1)
            let allLeftScreamList = generateAllScreamStringList(leftString)
            let allRightScreamList = generateAllScreamStringList(rightString)
            for (let leftScream of allLeftScreamList) {
                for (let rightScream of allRightScreamList) {
                    maybeSet.add(`${leftScream}${rightScream}`)
                    maybeSet.add(`${rightScream}${leftScream}`)
                }
            }
        }
        // 去重
        return maybeSet
    }

    // 如果一个字符串, 左侧是扰乱字符串, 右侧也是扰乱字符串, 那么整体就是扰乱字符串
    // 扰乱字符串的特点: 字母出现频率必然一致
    let globalIsScramble = false;

    let originString = s1
    let needCheckString = s2

    // 只有0/1/2位时, 可以手工检测
    if (originString.length !== needCheckString.length) {
        // 位数不同, 一定不等
        return false
    }
    if (originString.length === 0) {
        return true
    }
    if (originString.length === 1) {
        return originString === needCheckString
    }
    if (originString.length === 2) {
        return (originString === needCheckString) || (originString.split("").reverse().join("") === needCheckString)
    }
    let originTimeCount = new TimeCount(originString)
    let needCheckTimeCount = new TimeCount(needCheckString)
    // 若hash不对, 也不需要继续向下比较
    if (originTimeCount.timeCountHash !== needCheckTimeCount.timeCountHash) {
        return false
    }

    // 检测本身是否为扰乱字符串
    if (originString === needCheckString) {
        // 两个字符串相等, 肯定是扰乱字符串
        return true
    }

    // 3位以上, 需要分区域检测
    for (let splitAt = 0; splitAt < needCheckString.length - 1; splitAt++) {
        let leftNeedCheckString = needCheckString.substring(0, splitAt + 1)
        let rightNeedCheckString = needCheckString.substring(splitAt + 1)
        let leftOriginCheckString_1 = originString.substring(0, splitAt + 1)
        let rightOriginCheckString_1 = originString.substring(splitAt + 1)
        let leftOriginCheckString_2 = originString.substring(0, originString.length - splitAt - 1)
        let rightOriginCheckString_2 = originString.substring(originString.length - splitAt - 1)

        // 先看是不是一次扰乱字符串
        let leftCheckResult = isScramble(leftNeedCheckString, rightOriginCheckString_2)
        let rightCheckResult = isScramble(rightNeedCheckString, leftOriginCheckString_2)

        if (leftCheckResult && rightCheckResult) {
            // 只要左右分支均为混淆字符串, 则总体即为混淆字符串
            return true
        }

        // 然后看, 有没有可能是一次扰乱字符串
        leftCheckResult = isScramble(leftNeedCheckString, leftOriginCheckString_1)
        rightCheckResult = isScramble(rightNeedCheckString, rightOriginCheckString_1)


        if (leftCheckResult && rightCheckResult) {
            // 只要左右分支均为混淆字符串, 则总体即为混淆字符串
            return true
        }

        // let allLeftScreamList = generateAllScreamStringList(leftString)
        // let allRightScreamList = generateAllScreamStringList(rightString)
        // for (let leftScream of allLeftScreamList) {
        //     for (let rightScream of allRightScreamList) {
        //         maybeList.push(`${leftScream}${rightScream}`)
        //         maybeList.push(`${rightScream}${leftScream}`)
        //     }
        // }
    }

    return false

    // let test1 = generateAllScreamStringList("aaaaaaaaaaaaaaaaaa")
    // console.log(test1.length)
    // return true
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
    }
}
let useTestCase87 = '测试2'
let testResult87 = testCase87[useTestCase87].target === isScramble(testCase87[useTestCase87].input_1, testCase87[useTestCase87].input_2) ? "测试通过" : "测试失败"

console.log(testResult87)