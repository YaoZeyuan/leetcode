/**
 * @param {string} s
 * @return {string}
 */
function isPalindromic(check_str) {
    if (check_str.length < 1) {
        return false
    }
    let str_length = check_str.length
    for (let i = 0; i < str_length; i++) {
        if (check_str[i] != check_str[str_length - 1 - i]) {
            return false
        }
    }
    return true
}

function generateCheckStrList(base_char_list, check_end_at) {
    let result_list = []
    let start_index = 0
    while (check_end_at <= base_char_list.length) {
        if (base_char_list[start_index] == base_char_list[check_end_at - 1]) {
            result_list.push(
                base_char_list.slice(start_index, check_end_at)
            )
        }

        start_index += 1
        check_end_at += 1
    }
    return result_list
}


function findLonggestPalindromic(input_str) {
    let char_list = input_str.split('')
    let input_str_length = char_list.length
    let check_length = input_str_length
    while (check_length >= 1) {
        let check_str_list = generateCheckStrList(input_str, check_length)
        for (let check_str of check_str_list) {
            if (isPalindromic(check_str)) {
                return check_str
            }
        }

        check_length = check_length - 1
    }


    return ''
}



var longestPalindrome = function(s) {
    return findLonggestPalindromic(s)
};