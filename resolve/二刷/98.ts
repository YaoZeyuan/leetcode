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

function isValidBST(root: TreeNode | null): boolean {
    // 合法的二叉搜索树也是有序数组, 且不包含重复值
    let numList = []
    function tree2List(head: TreeNode) {
        if (head === null) {
            return
        }
        tree2List(head.left)
        numList.push(head.val)
        tree2List(head.right)
    }

    tree2List(root)

    if(numList.length !== new Set(numList).size){
        return false
    }


    return (
        numList.join(',') ===
        [...numList]
            .sort((a, b) => {
                return a - b
            })
            .join(',')
    )
}

// [5,4,6,null,null,3,7]
