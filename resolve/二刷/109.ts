/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function sortedListToBST(head: ListNode | null): TreeNode | null {
    function linkList2NumList(node: ListNode) {
        let numList: number[] = []
        while (node !== null) {
            numList.push(node.val)
            node = node.next
        }
        return numList
    }

    function sortedArrayToBST(nums: number[]): TreeNode | null {
        // 创建思路为
        // 将数组分为 [左数组] 中间值 [右数组] 三部分, 只要左右之分小于2, 即可保证创建的子树高度相差不大于1
        switch (nums.length) {
            case 0:
                return null
            case 1:
                return new TreeNode(nums[0], null, null)
            case 2:
                return new TreeNode(nums[1], new TreeNode(nums[0]), null)
            case 3:
                return new TreeNode(nums[1], new TreeNode(nums[0]), new TreeNode(nums[2]))
        }

        let midPos = Math.floor(nums.length / 2)

        let leftList = nums.slice(0, midPos)
        let rightList = nums.slice(midPos + 1)

        return new TreeNode(nums[midPos], sortedArrayToBST(leftList), sortedArrayToBST(rightList))
    }

    let numList = linkList2NumList(head)
    return sortedArrayToBST(numList)
}
