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

function pathSum(root: TreeNode | null, targetSum: number): number[][] {
    let pathList = []
    // 深度优先检测
    function checkNode(node: TreeNode, parentSum: number, parentPathList: number[] = []) {
        if (node === null) {
            return false
        }
        let currentPath: number[] = [...parentPathList, node.val]
        // 叶子节点
        if (node.left === null && node.right === null) {
            if (node.val + parentSum === targetSum) {
                pathList.push(currentPath)
                return
            }
        }

        if (node.left !== null) {
            checkNode(node.left, node.val + parentSum, currentPath)
        }
        if (node.right !== null) {
            checkNode(node.right, node.val + parentSum, currentPath)
        }
        return
    }
    checkNode(root, 0, [])
    return pathList
}
