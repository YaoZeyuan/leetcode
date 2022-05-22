/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindromic(check_str) {
    if (check_str.length < 1) {
        return false
    }
    reverse_check_str = check_str.split('').reverse().join('')
    return reverse_check_str === check_str
}
var isPalindrome = function(x) {
    let a = x + ''
    return isPalindromic(a)
};