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

function levelOrder(root: TreeNode | null): number[][] {
    let resultList: number[][] = []
    function travelByLevel(nodeList: TreeNode[]) {
        if (nodeList.length === 0) {
            return
        }
        let valList: number[] = []
        let nextNodeList: TreeNode[] = []
        for (let node of nodeList) {
            if (node !== null) {
                valList.push(node.val)
                nextNodeList.push(node.left, node.right)
            }
        }
        if (valList.length > 0) {
            resultList.push(valList)
        }
        travelByLevel(nextNodeList)
    }
    travelByLevel([root])
    return resultList
}
