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

function zigzagLevelOrder(root: TreeNode | null): number[][] {
    let resultList = []
    function travelByLevel(nodeList: TreeNode[], reverseFlag = false) {
        if (nodeList.length === 0) {
            return
        }
        let valList: number[] = []
        let nextNodeList: TreeNode[] = []
        for (let node of nodeList) {
            if (node !== null) {
                valList.push(node.val)
                nextNodeList.push(node.left)
                nextNodeList.push(node.right)
            }
        }
        if (reverseFlag) {
            valList.reverse()
        }
        if (valList.length > 0) {
            resultList.push(valList)
        }
        // 取反, 以实现锯齿型遍历
        travelByLevel(nextNodeList, !reverseFlag)
    }
    travelByLevel([root])
    return resultList
}
