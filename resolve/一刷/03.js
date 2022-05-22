/**
 * @param {string} s
 * @return {number}
 */
function StringContainer() {
    let containue_list = []
    let finish_list = []

    function addChar(char) {
        new_container_list = []
        containue_list.map((item) => {
            if (item.sub_char_set.has(char)) {
                item.can_be_add = false
                finish_list.push(item)
                return
            } else {
                item.sub_char_set.add(char)
                new_container_list.push(item)
                return
            }
        })
        let newItem = {
            can_be_add: true,
            sub_char_set: new Set(char),
        }
        new_container_list.push(newItem)
        containue_list = new_container_list
    }

    function getMaxLengthMap() {
        let max_length_map = null
        let find_list = containue_list.concat(finish_list)
        find_list.map((item) => {
            if (max_length_map === null) {
                max_length_map = item
            } else {
                if (max_length_map.sub_char_set.size < item.sub_char_set.size) {
                    max_length_map = item
                }
            }
        })
        return max_length_map
    }
    return {
        addChar,
        getMaxLengthMap
    }
}


function findLongestSubstring(s) {
    let char_list = s.split('')
    let container = new StringContainer()
    for (let char of char_list) {
        container.addChar(char)
    }
    let max_length_map = container.getMaxLengthMap()
    return max_length_map.sub_char_set.size
}
var lengthOfLongestSubstring = function(s) {
    if (s.length === 0) {
        return 0
    }
    return findLongestSubstring(s)
};