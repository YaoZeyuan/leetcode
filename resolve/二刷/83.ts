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

function deleteDuplicates(head: ListNode | null): ListNode | null {
    // 链表问题先建dummy
    let dummyHead: ListNode = {
        val: -999,
        next: head,
    }
    let currentItem = head?.next ?? null
    let prevItem = head
    while (currentItem !== null) {
        if (prevItem.val === currentItem.val) {
            // 有重合项, 删除之
            prevItem.next = currentItem.next
            currentItem = currentItem.next
        } else {
            // 没有重合项, 正常向后推进
            prevItem = currentItem
            currentItem = currentItem.next
        }
    }
    return dummyHead.next
}
