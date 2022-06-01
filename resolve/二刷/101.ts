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

function isSymmetric(root: TreeNode | null): boolean {
    // 实际上是检测左右两侧按层遍历时, 是否一致

    function travelByLevel(baseNode: TreeNode) {
        let valueListList = []
        function tree2List(headList: TreeNode[]): (number | null)[] {
            let nextNodeList = []
            let currentValueList = []
            if (headList.length === 0) {
                return
            }
            for (let head of headList) {
                if (head === null) {
                    // 专门push一个null, 以保证在最终合成字符串时左右对称
                    currentValueList.push(null)
                } else {
                    nextNodeList.push(head.left, head.right)
                    currentValueList.push(head.val)
                }
            }
            valueListList.push(currentValueList)
            tree2List(nextNodeList)
        }
        tree2List([baseNode])
        return valueListList
    }

    let leftListList = travelByLevel(root.left)
    let rightListList = travelByLevel(root.right)
    if (leftListList.length !== rightListList.length) {
        return false
    }
    for (let level = 0; level < leftListList.length; level++) {
        let leftList = leftListList[level]
        let rightList = rightListList[level]
        // 左侧右侧对称
        if (leftList.join(',') !== [...rightList].reverse().join(',')) {
            return false
        }
    }

    return true
}
