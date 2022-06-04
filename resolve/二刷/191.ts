function hammingWeight(n: number): number {
    function number2bit(inputNumber: number) {
        let charList: string[] = []
        let remainNum = inputNumber
        while (remainNum !== 0) {
            let char = `${remainNum % 2}`
            charList.push(char)
            remainNum = Math.floor(remainNum / 2)
        }
        return charList
    }

    function bit2Number(inputCharList: string[]) {
        let result = 0
        for (let pos = 0; pos < inputCharList.length; pos++) {
            if (inputCharList[pos] === '1') {
                result = result + Math.pow(2, pos)
            }
        }
        return result
    }
    // let result = bit2Number(`11111111111111111111111111111101`.split(''))

    let charList = number2bit(n).filter((item) => item === '1')
    return charList.length
}

// console.log(hammingWeight(3221225471))
