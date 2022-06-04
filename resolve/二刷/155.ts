// @todo 这个题没想出来, 回头需要再看
class MinStack {
    stackList: number[] = []
    minStackList: number[] = []

    constructor() {}

    push(val: number): void {
        this.stackList.push(val)
        if (this.minStackList.length) {
            this.minStackList.push(Math.min(val, this.minStackList[this.minStackList.length - 1]))
        } else {
            this.minStackList.push(val)
        }
    }

    pop(): void {
        this.stackList.pop()
        this.minStackList.pop()
    }

    top(): number {
        return this.stackList[this.stackList.length - 1]
    }

    getMin(): number {
        // 需要在常数时间内获得最小值
        return this.minStackList[this.minStackList.length - 1]
    }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
