function simplifyPath(path: string): string {
    // 思路:
    // 先按/拆分, 然后按情况进行处理即可
    // 文本 => 压栈
    // .. => 弹栈
    // / => 略过
    let pathStack: string[] = []
    let rawPathList = path.split('/')
    for (let item of rawPathList) {
        switch (item) {
            case '..':
                pathStack.pop()
                break
            case '/':
            case '.':
            case '':
                break
            default:
                pathStack.push(item)
        }
    }
    return `/${pathStack.join('/')}`
}
