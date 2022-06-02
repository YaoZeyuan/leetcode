/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function sortList(head: ListNode | null): ListNode | null {
    // 获取节点数组
    function list2Array(node: ListNode) {
        let nodeArray: ListNode[] = []
        let currentNode = node
        while (currentNode !== null) {
            nodeArray.push(currentNode)
            currentNode = currentNode.next
        }
        return nodeArray
    }

    function array2List(nodeList: ListNode[]) {
        let headNode = new ListNode(nodeList[0].val)
        let prevNode = headNode

        for (let index = 1; index < nodeList.length; index++) {
            let currentNode = new ListNode(nodeList[index].val)
            prevNode.next = currentNode
            prevNode = currentNode
        }
        return headNode
    }

    if (head === null) {
        return head
    }

    // 重新排序
    let nodeList = list2Array(head)
    nodeList.sort((a, b) => {
        return a.val - b.val
    })
    let newHead = array2List(nodeList)
    return newHead
}
