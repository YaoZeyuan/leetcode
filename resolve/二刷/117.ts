/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     left: Node | null
 *     right: Node | null
 *     next: Node | null
 *     constructor(val?: number, left?: Node, right?: Node, next?: Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

// class Node {
//     val: number
//     left: Node | null
//     right: Node | null
//     next: Node | null
//     constructor(val?: number, left?: Node, right?: Node, next?: Node) {
//         this.val = val === undefined ? 0 : val
//         this.left = left === undefined ? null : left
//         this.right = right === undefined ? null : right
//         this.next = next === undefined ? null : next
//     }
// }

function connect(root: Node | null): Node | null {
    // 层序遍历
    let levelList: Node[][] = []

    function travelByLevel(nodeList: Node[]) {
        let nextNodeList: Node[] = []
        let currentLevelList: Node[] = []
        for (let node of nodeList) {
            if (node !== null) {
                currentLevelList.push(node)
                nextNodeList.push(node.left)
                nextNodeList.push(node.right)
            }
        }
        if (currentLevelList.length > 0) {
            levelList.push(currentLevelList)
        }
        if (nextNodeList.length > 0) {
            travelByLevel(nextNodeList)
        }
        return
    }
    travelByLevel([root])
    for (let nodeList of levelList) {
        if (nodeList.length <= 1) {
            continue
        }
        for (let i = 0; i < nodeList.length - 1; i++) {
            nodeList[i].next = nodeList[i + 1]
        }
    }
    return root
}
