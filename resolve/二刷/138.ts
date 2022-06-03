/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     next: Node | null
 *     random: Node | null
 *     constructor(val?: number, next?: Node, random?: Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *         this.random = (random===undefined ? null : random)
 *     }
 * }
 */

function copyRandomList(head: Node | null): Node | null {
    // 基本思路和133一致, 通过全局map保留引用和引用关系
    let globalCacheMap = new Map<Node, Node>()
    function privateClone(targetNode: Node) {
        if (targetNode === null) {
            return null
        }
        if (globalCacheMap.has(targetNode)) {
            return globalCacheMap.get(targetNode)
        }

        let newNode = new Node(targetNode.val)
        globalCacheMap.set(targetNode, newNode)

        let nextNode = privateClone(targetNode.next)
        let randomNode = privateClone(targetNode.random)
        newNode.next = nextNode
        newNode.random = randomNode
        return newNode
    }
    return privateClone(head)
}
