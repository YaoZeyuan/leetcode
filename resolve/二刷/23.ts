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
    // 哑节点
    let dummyHeadNode: ListNode = {
        val: 0,
        next: head,
    }

    // 思路: 基于双指针法进行
    // 有两个指针, 一前一后, 每次两个指针指向的位置互相交换next. 为了方便进行下一轮计算, 可以使用4个变量
    // 需要小心为null的情况

    // 当前待交换的节点
    let node_1 = head
    let node_2 = node_1?.next ?? null
    let node_3 = node_2?.next ?? null
    let node_4 = node_3?.next ?? null

    if (node_1 === null || node_2 === null) {
        // 有一个为null就停止交换
        return dummyHeadNode.next
    }

    // 先手工交换一轮, 方便生成head
    dummyHeadNode.next = node_2
    node_1.next = node_2.next
    node_2.next = node_1

    // 交换node_1和node_2的值, 保持1/2正确性(1要在2前面)
    let tmp: ListNode = node_2
    node_2 = node_1
    node_1 = tmp

    // 由3/4去执行交换, 1/2作为前缀节点进行保留

    // 开始交换, 只有当两个节点都不是null的时候才能交换
    while (node_3 !== null && node_4 !== null) {
        node_2.next = node_4

        node_3.next = node_4.next
        node_4.next = node_3

        // 然后生成下一轮的节点
        node_1 = node_2?.next ?? null // 4
        node_2 = node_2?.next?.next ?? null // 3

        node_3 = node_3?.next ?? null
        node_4 = node_3?.next ?? null
    }
    return dummyHeadNode.next
}
