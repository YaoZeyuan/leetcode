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

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    // 深度优先检测
    function checkNode(node: TreeNode, parentSum: number) {
        if (node === null) {
            return false
        }
        // 叶子节点
        if (node.left === null && node.right === null) {
            return node.val + parentSum === targetSum
        }

        if (node.left !== null) {
            let leftCheck = checkNode(node.left, node.val + parentSum)
            if (leftCheck) {
                return true
            }
        }
        if (node.right !== null) {
            let rightCheck = checkNode(node.right, node.val + parentSum)
            if (rightCheck) {
                return true
            }
        }
        return false
    }
    return checkNode(root, 0)
}
