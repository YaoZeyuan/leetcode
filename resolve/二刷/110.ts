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

function isBalanced(root: TreeNode | null): boolean {
    let heightMap = new Map()

    function getTreeHight(node: TreeNode) {
        if (heightMap.has(node)) {
            return heightMap.get(node)
        }

        if (node === null) {
            heightMap.set(node, 0)
            return 0
        }
        let height = 1 + Math.max(getTreeHight(node.left), getTreeHight(node.right))
        heightMap.set(node, height)
        return height
    }

    // 利用子函数, 以便使用全局公共缓存
    function checkIsBalanced(node: TreeNode) {
        if (node === null) {
            return true
        }

        let leftHeight = getTreeHight(node.left)
        let rightHeight = getTreeHight(node.right)
        return Math.abs(leftHeight - rightHeight) <= 1 && isBalanced(node.left) && isBalanced(node.right)
    }

    return checkIsBalanced(root)
}
