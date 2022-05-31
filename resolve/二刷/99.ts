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
function recoverTree(root: TreeNode | null): void {
    if (root === null) {
        return
    }

    let rawNumList: number[] =[]
    function tree2List(head: TreeNode) {
        if (head === null) {
            return
        }
        tree2List(head.left)
        rawNumList.push(head.val)
        tree2List(head.right)
    }
    // 先拿到对应的数组
    tree2List(root)

    let sortedNumList = [...rawNumList].sort((a, b) => {
        return a - b
    })
    let errorValueSet: Set<number> = new Set()
    for (let i = 0; i < rawNumList.length; i++) {
        if (sortedNumList[i] !== rawNumList[i]) {
            errorValueSet.add(rawNumList[i])
        }
    }
    // 一共会有两个, 再查找到对应的节点即可
    let errorNodeList: TreeNode[] = []
    function findNode(head: TreeNode) {
        if (head === null) {
            return
        }
        findNode(head.left)
        findNode(head.right)
        if (errorValueSet.has(head.val)) {
            errorNodeList.push(head)
        }
    }

    findNode(root)
    let [errorNode1, errorNode2] = errorNodeList
    let buf = errorNode1.val
    errorNode1.val = errorNode2.val
    errorNode2.val = buf

    return
}
