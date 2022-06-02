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

function levelOrderBottom(root: TreeNode | null): number[][] {
    let resultList: number[][] = []
    function travelByLevel(nodeList: TreeNode[]) {
        let valList: number[] = []
        let nextNodeList: TreeNode[] = []
        if (nodeList.length === 0) {
            return
        }
        for (let node of nodeList) {
            if (node !== null) {
                nextNodeList.push(node.left)
                nextNodeList.push(node.right)
                valList.push(node.val)
            }
        }
        if (valList.length > 0) {
            resultList.push(valList)
        }
        travelByLevel(nextNodeList)
    }
    travelByLevel([root])
    return resultList.reverse()
}
