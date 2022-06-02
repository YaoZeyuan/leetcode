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

function detectCycle(head: ListNode | null): ListNode | null {
    let nodeSet: Set<ListNode> = new Set()
    let currentNode = head
    while (currentNode !== null) {
        if (nodeSet.has(currentNode)) {
            return currentNode
        }
        nodeSet.add(currentNode)
        currentNode = currentNode.next
    }
    return null
}
