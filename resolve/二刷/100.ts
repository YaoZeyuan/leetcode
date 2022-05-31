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

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    function canSameTravel(node1: TreeNode, node2: TreeNode) {
        if (node1 === null) {
            if (node2 === null) {
                return true
            }
            return false
        } else {
            if (node2 === null) {
                return false
            }
        }
        // 到这一步说明两边都不是null
        if (node1.val !== node2.val) {
            return false
        }
        // 然后同时检测左侧和右侧
        return canSameTravel(node1.left, node2.left) && canSameTravel(node1.right, node2.right)
    }
    return canSameTravel(p, q)
}
