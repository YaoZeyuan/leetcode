/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {

    function getMiddleNumber(number_list) {
        let length = number_list.length
        if (length === 1) {
            return number_list[0]
        }

        let half_length = length / 2
        if (Number.isInteger(half_length)) {
            return (number_list[half_length] + number_list[half_length - 1]) / 2
        } else {
            half_length = Math.floor(half_length)
            return number_list[half_length]
        }
    }

    function mergeTwoList(number_list_1, number_list_2) {
        let result = []
        let total_length = number_list_1.length + number_list_2.length
        let number_1_index = 0
        let number_2_index = 0
        debugger
        while (result.length < total_length) {
            if (number_1_index < number_list_1.length && number_2_index < number_list_2.length) {
                if (number_list_1[number_1_index] < number_list_2[number_2_index]) {
                    result.push(number_list_1[number_1_index])
                    number_1_index += 1
                } else {
                    result.push(number_list_2[number_2_index])
                    number_2_index += 1
                }
            } else {
                if (number_1_index < number_list_1.length) {
                    result = result.concat(number_list_1.slice(number_1_index))
                } else {
                    result = result.concat(number_list_2.slice(number_2_index))
                }

            }
        }
        return getMiddleNumber(result)
    }

    return mergeTwoList(nums1, nums2)
};