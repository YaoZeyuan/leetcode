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

function rightSideView(root: TreeNode | null): number[] {
    // 层序遍历
    let resultList: number[][] = []
    function travelByLevel(currentNodeList: TreeNode[]) {
        let nextNodeList = []
        let currentValueList: number[] = []
        for (let node of currentNodeList) {
            if (node !== null) {
                currentValueList.push(node.val)
                nextNodeList.push(node.left)
                nextNodeList.push(node.right)
            }
        }
        if(currentValueList.length > 0){
            resultList.push(currentValueList)
        }
        if (nextNodeList.length > 0) {
            travelByLevel(nextNodeList)
        }
        return
    }
    travelByLevel([root])

    let rightSideViewList = resultList.map((item) => item[item.length - 1])
    return rightSideViewList
}
