/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {

    if (Math.abs(x) > Math.pow(2, 31)) {
        return 0
    }

    let a = '' + Math.abs(x)

    let b = a.split('').reverse().join('')
    let c = parseInt(b)
    if (Math.abs(c) > Math.pow(2, 31)) {
        return 0
    }

    return x > 0 ? c : -c

};