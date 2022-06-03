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

function insertionSortList(head: ListNode | null): ListNode | null {
    if (head === null) {
        return head
    }

    // 冒泡排序
    let dummyNode: ListNode = {
        val: 0,
        next: head,
    }
    // 记录下一个待排序节点
    let currentSortNode = head

    // 用于关闭链表
    let prevCurrentSortNode = dummyNode
    while (currentSortNode !== null) {
        // 需要一直排序到最后一位
        // 然后, 从第一个位置开始比较,

        // 排序开始节点
        let compareNode = dummyNode.next
        let prevCompareNode = dummyNode
        // 排序结束节点
        let nextNode = currentSortNode.next

        // 比较到排序节点, 或者尾节点即可终止比较
        while (compareNode !== null && compareNode !== currentSortNode) {
            if (compareNode.val < currentSortNode.val) {
                prevCompareNode = compareNode
                compareNode = compareNode.next
            } else {
                // 插入到该节点之前
                prevCompareNode.next = currentSortNode
                currentSortNode.next = compareNode
                // 本轮循环结束
                break
            }
        }

        if (currentSortNode.next === nextNode) {
            // 没有发生交换, 可以略过
        } else {
            // 发生了交换, 需要将原本下一个指向currentSortNode的节点改为指向nextNode
            // 继续向后推进compareNode, 找到下一个节点是currentSortNode的节点
            while (compareNode !== null && compareNode.next !== currentSortNode) {
                compareNode = compareNode.next
            }
            if (compareNode !== null) {
                compareNode.next = nextNode
            }
        }

        // 将待比较节点替换为下一个节点
        currentSortNode = nextNode
    }
    return dummyNode.next
}
