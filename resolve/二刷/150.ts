function evalRPN(tokens: string[]): number {
    let stackList: number[] = []
    for (let item of tokens) {
        let stack1: number
        let stack2: number
        let result: number
        switch (item) {
            case '+':
                stack2 = stackList.pop()
                stack1 = stackList.pop()
                result = stack1 + stack2
                stackList.push(result)
                break
            case '-':
                stack2 = stackList.pop()
                stack1 = stackList.pop()
                result = stack1 - stack2
                stackList.push(result)
                break
            case '*':
                stack2 = stackList.pop()
                stack1 = stackList.pop()
                result = stack1 * stack2
                stackList.push(result)
                break
            case '/':
                stack2 = stackList.pop()
                stack1 = stackList.pop()
                // 只取整数部分
                result = Math.trunc(stack1 / stack2)
                stackList.push(result)
                break
            default:
                // 普通数字
                stackList.push(parseInt(item))
        }
    }
    return stackList.pop()
}

// console.log(evalRPN(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']))
