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

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    let listNode1Set = new Set<ListNode>()
    let currentHeadA = headA
    let currentHeadB = headB
    while (currentHeadA !== null) {
        listNode1Set.add(currentHeadA)
        currentHeadA = currentHeadA.next
    }
    while (currentHeadB !== null) {
        if (listNode1Set.has(currentHeadB)) {
            return currentHeadB
        }
        currentHeadB = currentHeadB.next
    }
    return null
}
