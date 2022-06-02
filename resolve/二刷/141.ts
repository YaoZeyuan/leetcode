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

function hasCycle(head: ListNode | null): boolean {
    let nodeSet: Set<ListNode> = new Set()
    let currentNode = head
    while (currentNode !== null) {
        if (nodeSet.has(currentNode)) {
            return true
        }
        nodeSet.add(currentNode)
        currentNode = currentNode.next
    }
    return false
}
