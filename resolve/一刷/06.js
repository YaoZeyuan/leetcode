/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    function isChar(index, column, row) {
        if (column % (row - 1) === 1) {
            return true
        }
        // =V181 * 5 - 5 + MOD(V181, 4)

        let guess = (column - 1) * row + column % (row - 1) - 1
        if (column % (row - 1) === 0) {
            guess += (row - 1)
        }
        return index === guess
    }

    function zip(string, row) {
        if (string.length === 1 || row === 1) {
            return string
        }
        if (row === 2) {
            let buf_list = string.split('')
            return buf_list.filter((item, index) => { return index % 2 === 0 }).join("") + buf_list.filter((item, index) => { return index % 2 !== 0 }).join("")
        }

        // 初始化容器列表
        let container = []
        for (let i = 0; i < row; i++) {
            container[i] = []
        }
        // console.log(container)
        let string_list = string.split('').reverse()
        let index = 0
        let column = 1
        while (string_list.length > 0) {
            let container_index = 0
            if (column % (row - 1) === 1) {
                container_index = index % row
            } else {
                container_index = row - (index % row) - 1
            }

            if (isChar(index, column, row)) {
                container[container_index].push(string_list.pop())
            } else {
                container[container_index].push(' ')
            }
            index++
            if (index % row === 0) {
                column++
            }
        }
        let result = ''
        for (let c of container) {
            result += c.filter((item) => { return item != ' ' }).join('')
        }
        return result
    }
    return zip(s, numRows)
};