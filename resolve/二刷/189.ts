/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
    let realRotate = k % nums.length
    let counter = 0
    while (counter < realRotate) {
        let val = nums.pop()
        nums.unshift(val)
        counter++
    }
    return
}

// console.log(rotate([0, 1, 2, 3, 4, 5], 20))
