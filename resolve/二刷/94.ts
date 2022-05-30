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
    let globalList: number[] = []
    function travel(root: TreeNode) {
        if (root === null) {
            return
        }
        if (root.left) {
            travel(root.left)
        }
        globalList.push(root.val)
        if (root.right) {
            travel(root.right)
        }
    }
    travel(root)
    return globalList
}
