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
    // 链表问题, 二话不说, 先建dummy
    let dummyHead: ListNode = {
        val: -999, // 题目规定是-100~100,所以一定不会出现-999
        next: head,
    }
    // 从head开始检测, 删除重复元素
    let currentItem = head
    let prevItem = dummyHead
    let bufVal = dummyHead.val
    while (currentItem !== null) {
        let removeCurrentFlag = false
        while (currentItem?.val === currentItem?.next?.val && currentItem !== null) {
            // 将currentItem向后推进
            currentItem = currentItem?.next ?? null
            // 记录当前元素本身就需要删除
            removeCurrentFlag = true
        }

        if (removeCurrentFlag) {
            prevItem.next = currentItem?.next
            currentItem = currentItem?.next
            removeCurrentFlag = false
        } else {
            // 正常向后推进
            prevItem = currentItem
            currentItem = currentItem?.next
        }
    }
    return dummyHead.next
}
