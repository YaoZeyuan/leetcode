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
// @todo 推荐使用数组拍平的方法编写迭代器. 堆栈保存状态这个不好做, 实际上最终也只是勉强理解, 需要重新做一遍

class BSTIterator {
    currentNode: TreeNode = null
    stackList: TreeNode[] = []

    constructor(root: TreeNode | null) {
        this.currentNode = root
    }

    next(): number {
        // 从左侧开始深度递归, 进行压栈
        while (this.currentNode !== null) {
            this.stackList.push(this.currentNode)
            this.currentNode = this.currentNode.left
        }

        this.currentNode = this.stackList.pop()
        let val = this.currentNode.val
        this.currentNode = this.currentNode.right

        return val
    }

    hasNext(): boolean {
        return this.currentNode !== null || this.stackList.length > 0
    }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
