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

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    // 和前序中序构建二叉树思路一致
    // 先找到根节点(后序的最后一项), 然后将遍历结果拆分为左右两颗子树, 递归构建即可
    if (inorder.length === 0) {
        return null
    }

    // 根节点
    let rootNodeVal = postorder[postorder.length - 1]

    // 根节点在中序中的位置
    let rootNodePos = inorder.indexOf(rootNodeVal)

    // 开始拆分
    let leftList_inorder = inorder.slice(0, rootNodePos)
    let rightList_inorder = inorder.slice(rootNodePos + 1)
    let leftList_postorder = postorder.slice(0, leftList_inorder.length)
    let rightList_postorder = postorder.slice(leftList_inorder.length, postorder.length - 1)

    let node = new TreeNode(rootNodeVal, buildTree(leftList_inorder, leftList_postorder), buildTree(rightList_inorder, rightList_postorder))
    return node
}
