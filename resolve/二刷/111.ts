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

    function minDepth(root: TreeNode | null): number {
        // 广度优先遍历二叉树
        // 还有一点是, 需要注意, 叶子节点指的是两个子节点都为null. 最短距离是从根节点到叶子结点的距离, 而非从根节点到null的距离
        let currentLevel = 0
        let currentNodeList: TreeNode[] = [root]
        let nextNodeList: TreeNode[] = []
        while (currentNodeList.length > 0) {
            currentLevel = currentLevel + 1
            for (let node of currentNodeList) {
                if (node === null) {
                    return currentLevel - 1
                }
                if (node.left === null && node.right === null) {
                    return currentLevel
                }
                if (node.left !== null) {
                    nextNodeList.push(node.left)
                }
                if (node.right !== null) {
                    nextNodeList.push(node.right)
                }
            }
            currentNodeList = nextNodeList
            nextNodeList = []
        }
        return currentLevel
    }
