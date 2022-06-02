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

function inorderTraversal(root: TreeNode | null): number[] {
    class TreeNode {
        val: number
        left: TreeNode | null
        right: TreeNode | null
        constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
            this.val = val === undefined ? 0 : val
            this.left = left === undefined ? null : left
            this.right = right === undefined ? null : right
        }
    }

    let result: number[] = []

    function traversal(node: TreeNode | null) {
        if (node === null) {
            return
        }
        traversal(node.left)
        result.push(node.val)
        traversal(node.right)
    }
    traversal(root)
    return result
}
