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

function rotateRight(head: ListNode | null, k: number): ListNode | null {
    // 快慢指针法
    // 哑节点
    let dummyHead: ListNode = {
        val: 0,
        next: head,
    }

    let fastNode = dummyHead
    let slowNode = dummyHead

    let counterNode = head
    let counter = 0
    while (counterNode !== null) {
        counterNode = counterNode.next
        counter++
    }
    k = k % counter

    // 错误拦截
    if (counter < 2) {
        return head
    }
    if (k === 0) {
        return head
    }

    for (let i = 0; i < k; i++) {
        fastNode = fastNode.next
    }
    while (fastNode.next !== null) {
        fastNode = fastNode.next
        slowNode = slowNode.next
    }
    dummyHead.next = slowNode.next
    slowNode.next = null
    fastNode.next = head
    return dummyHead.next
}
