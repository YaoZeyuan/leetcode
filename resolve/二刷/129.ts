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

function sumNumbers(root: TreeNode | null): number {
    let allNumberList: number[] = []
    // 深度优先
    function travel(node: TreeNode, parentValue: number) {
        if (node === null) {
            return
        }
        let currentNum = parentValue * 10 + node.val
        if (node.left === null && node.right === null) {
            // 叶子节点
            // 添加结果
            allNumberList.push(currentNum)
            return
        }
        travel(node.left, currentNum)
        travel(node.right, currentNum)
    }
    travel(root, 0)

    let sum = 0
    for (let num of allNumberList) {
        sum = sum + num
    }
    return sum
}
