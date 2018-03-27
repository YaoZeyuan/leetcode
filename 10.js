/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    function reg(input, pattern) {

        if (input.length === 1) {
            if (pattern.length === 3 && pattern[1] === '*' && pattern[3] === input) {
                return true
            }
        }


        if (input.length === 0) {
            switch (pattern.length) {
                case 0:
                    return true
                case 2:
                    if (pattern.length === 2 && pattern[0] !== '*' && pattern[1] === '*') {
                        return true
                    } else {
                        return false
                    }
                case 3:
                    switch (pattern[0]) {
                        case '.':
                            return false
                        default:
                            // if (pattern[0] === pattern[2] && pattern[1] === '*') {
                            //     return reg(input, pattern.slice(0, 2) + pattern.slice(3, ))
                            // }
                            return false
                    }
                default:
                    switch (pattern[1]) {
                        case '*':
                            return reg(input, pattern.slice(2))
                        default:
                            return false
                    }
            }
        }

        switch (pattern[0]) {
            case ".":
                if (pattern[1] === '*') {
                    return reg(input.slice(1), pattern) || reg(input, pattern.slice(2))
                } else {
                    return reg(input.slice(1), pattern.slice(1))
                }
                break;
            case "*":
                return false
            default:
                if (input[0] !== pattern[0]) {
                    if (pattern[1] === '*') {
                        return reg(input, pattern.slice(2))
                    } else {
                        return false
                    }
                }
                if (pattern[1] === '*') {
                    return reg(input.slice(1), pattern) || reg(input, pattern.slice(2))
                } else {
                    return reg(input.slice(1), pattern.slice(1))
                }
        }
    }

    return reg(s, p)
};