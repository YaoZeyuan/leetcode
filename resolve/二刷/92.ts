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

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    // 链表问题先建dummy节点
    let dummyHead: ListNode = {
        val: 0,
        next: head,
    }
    // 保存待反转的节点
    let stackList: ListNode[] = []
    let prevLeftItem: ListNode = dummyHead
    let nextRightItem: ListNode = null
    // 遍历寻找待添加的节点
    let currentPos = 1
    let currentItem = head
    while (currentPos <= right) {
        if (currentPos < left) {
            // 定期更新前缀地址
            prevLeftItem = prevLeftItem.next
        }
        if (left <= currentPos && currentPos <= right) {
            stackList.push(currentItem)
        }
        currentPos++
        currentItem = currentItem.next
    }
    nextRightItem = currentItem

    // 然后开始构建翻转后的链表
    while (stackList.length > 0) {
        let popItem = stackList.pop()
        prevLeftItem.next = popItem
        prevLeftItem = popItem
    }
    prevLeftItem.next = nextRightItem

    return dummyHead.next
}
