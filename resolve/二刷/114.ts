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

/**
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {
    if (root === null) {
        return
    }
    // 首先将节点打平
    let treeNodeList: TreeNode[] = []

    function travelTree(node: TreeNode) {
        if (node === null) {
            return
        }
        treeNodeList.push(node)
        travelTree(node.left)
        travelTree(node.right)
    }
    travelTree(root)

    for (let i = 0; i < treeNodeList.length - 1; i++) {
        treeNodeList[i].left = null
        treeNodeList[i].right = treeNodeList[i + 1]
    }
    treeNodeList[treeNodeList.length - 1].left = null
    treeNodeList[treeNodeList.length - 1].right = null
    return
}
