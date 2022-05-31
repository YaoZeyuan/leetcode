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

function generateTrees(n: number): Array<TreeNode | null> {
    class TreeNode {
        right: TreeNode
        left: TreeNode
        val: number
        constructor(val, left = null, right = null) {
            this.val = val
            this.left = left
            this.right = right
        }
    }

    // 尝试生成所有的二叉搜索树
    // @todo (这个题是看答案做的)
    // 动态规划法
    // 任选一个节点i, 构建二叉树
    // 对于剩余节点, 可能的情况为L(i[左侧]), R(i[右侧]), 相乘即为总组合
    // 由于节点本身互不重复, 因此L和R对于同样的n值等效

    // 同96题
    let cacheMap = new Map<string, TreeNode[]>()

    function array2key(numberList: number[]) {
        return [...numberList].sort().join(',')
    }
    function generateSubTree(numberList: number[]) {
        if (numberList.length === 0) {
            return [null]
        }
        if (numberList.length === 1) {
            return [new TreeNode(numberList[0], null, null)]
        }
        let key = array2key(numberList)
        if (cacheMap.has(key)) {
            return cacheMap.get(key)
        }
        let resultList: TreeNode[] = []
        for (let i = 0; i < numberList.length; i++) {
            let leftTreeList = generateSubTree(numberList.slice(0, i))
            let rightTreeList = generateSubTree(numberList.slice(i + 1))
            for (let leftTree of leftTreeList) {
                for (let rightTree of rightTreeList) {
                    let currentNode = new TreeNode(numberList[i], leftTree, rightTree)
                    resultList.push(currentNode)
                }
            }
        }
        cacheMap.set(key, resultList)
        return resultList
    }
    let numberList: number[] = []
    for (let i = 1; i <= n; i++) {
        numberList.push(i)
    }
    let result = generateSubTree(numberList)
    return result
}

// console.log(generateTrees(3))
