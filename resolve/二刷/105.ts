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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
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

    // 思路是这样的:
    // 前序遍历的第一个节点为当前二叉树的根节点, 基于此, 可以将中序遍历结果分为三部分: 左子树, 根节点, 右子树
    // 得到左子树的长度后, 从前序结果中进行split选取对应长度, 则问题即可被递归分为两部分, 分别构建对应树即可

    // 开始实际编写

    // 所有树均已构造完毕
    if (preorder.length === 0) {
        return null
    }

    // 取到根节点值
    let firstNodeVal = preorder[0]
    let firstNodeInOrderIndex = inorder.indexOf(firstNodeVal)

    // 分别解析出左右子树节点
    let leftTree_inorder = inorder.slice(0, firstNodeInOrderIndex)
    let rightTree_inorder = inorder.slice(firstNodeInOrderIndex + 1)

    let leftTree_preorder = preorder.slice(1, 1 + leftTree_inorder.length)
    let rightTree_preorder = preorder.slice(1 + leftTree_inorder.length)

    let currentNode = new TreeNode(firstNodeVal, buildTree(leftTree_preorder, leftTree_inorder), buildTree(rightTree_preorder, rightTree_inorder))
    return currentNode
}

// console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]))
