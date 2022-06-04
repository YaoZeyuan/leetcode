function reverseBits(n: number): number {
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
    let charList = number2bit(n)
    while (charList.length < 32) {
        charList.push('0')
    }
    charList.reverse()

    let result = bit2Number(charList)
    return result
}

console.log(reverseBits(43261596))
