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

function partition(head: ListNode | null, x: number): ListNode | null {
    let dummyLessThanHead = {
        val: 0,
        next: null,
    }

    let dummyGreatThanHead = {
        val: 0,
        next: null,
    }

    let currentItem = head
    let lessThanItem: ListNode = null
    let greateAndEqualThan: ListNode = null

    // 防止错误数据混入
    if (head === null) {
        return head
    }

    // 遍历链表
    while (currentItem !== null) {
        // 进行过滤
        if (currentItem.val < x) {
            // 加到lessThan列表里
            if (lessThanItem === null) {
                // 首次
                lessThanItem = currentItem
                dummyLessThanHead.next = lessThanItem

                currentItem = currentItem.next
                // 先清零
                lessThanItem.next = null
            } else {
                lessThanItem.next = currentItem
                lessThanItem = currentItem

                currentItem = currentItem.next
                lessThanItem.next = null
            }
        } else {
            // 加到greateAndEqualThan列表里
            if (greateAndEqualThan === null) {
                // 首次
                greateAndEqualThan = currentItem
                dummyGreatThanHead.next = greateAndEqualThan

                currentItem = currentItem.next
                // 先清零
                greateAndEqualThan.next = null
            } else {
                greateAndEqualThan.next = currentItem
                greateAndEqualThan = currentItem

                currentItem = currentItem.next
                greateAndEqualThan.next = null
            }
        }
    }
    // 当分割完成后, 拼接链表并返回
    if (lessThanItem === null) {
        return dummyGreatThanHead.next
    } else {
        lessThanItem.next = dummyGreatThanHead.next
        return dummyLessThanHead.next
    }
}
