function addBinary(a: string, b: string): string {
    let a_reverse_list = a
        .split('')
        .reverse()
        .map((item) => (item === '0' ? 0 : 1))
    let b_reverse_list = b
        .split('')
        .reverse()
        .map((item) => (item === '0' ? 0 : 1))

    let resultList = []
    let plusFlag = 0

    let a_index = 0
    let b_index = 0
    while (a_index < a.length || b_index < b.length) {
        let a_val = a_reverse_list?.[a_index] ?? 0
        let b_val = b_reverse_list?.[b_index] ?? 0

        let newVal = (a_val + b_val + plusFlag) % 2
        resultList.push(newVal)
        plusFlag = Math.floor((a_val + b_val + plusFlag) / 2)
        a_index++
        b_index++
    }
    if (plusFlag > 0) {
        resultList.push(1)
    }
    resultList.reverse()
    return resultList.join('')
}
