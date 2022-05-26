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

function swapPairs(head: ListNode | null): ListNode | null {
    // 基于递归法重做
    if (head === null || head.next === null) {
        return head
    }
    let newHead = head.next
    // 交换两个节点的位置
    let head_1 = head
    let head_2 = head.next
    head_1.next = head_2.next
    head_2.next = head_1
    // 递归处理后续节点
    head_1.next = swapPairs(head_1.next)
    return newHead
}
