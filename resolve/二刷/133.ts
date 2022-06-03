/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     neighbors: Node[]
 *     constructor(val?: number, neighbors?: Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 */

function cloneGraph(node: Node | null): Node | null {
    // class Node {
    //     val: number
    //     neighbors: Node[]
    //     constructor(val?: number, neighbors?: Node[]) {
    //         this.val = val === undefined ? 0 : val
    //         this.neighbors = neighbors === undefined ? [] : neighbors
    //     }
    // }

    let globalCacheMap = new Map<Node, Node>()

    // 通过一个map, 记录引用对应的节点值

    // 需要独立实现一套克隆方法
    function privateClone(inputNode: Node | null) {
        if (inputNode === null) {
            return
        }
        let newNode = new Node(inputNode.val, [])
        globalCacheMap.set(inputNode, newNode)
        for (let nighborNode of inputNode.neighbors) {
            if (globalCacheMap.has(nighborNode)) {
                newNode.neighbors.push(globalCacheMap.get(nighborNode))
            } else {
                // 如果出现循环引用, 可以通过globalCacheMap予以避免, 且保留循环引用关系
                let newNighborNode = privateClone(nighborNode)
                newNode.neighbors.push(newNighborNode)
            }
        }
        return newNode
    }
    let cloneNode = privateClone(node)
    return cloneNode
}
