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

/**
 Do not return anything, modify head in-place instead.
 */
function reorderList(head: ListNode | null): void {
    if (head === null) {
        return
    }

    // 将链表转为数组
    let nodeList: ListNode[] = []
    for (let currentNode = head; currentNode !== null; currentNode = currentNode.next) {
        nodeList.push(currentNode)
    }
    // 将数组分为两部分
    let prevNodeList = nodeList.slice(0, Math.ceil(nodeList.length / 2))
    let afterNodeList = nodeList.slice(Math.ceil(nodeList.length / 2))

    // 将最后一项的数组置为null
    prevNodeList[prevNodeList.length - 1].next = null

    // 依次插入到prev中

    // 在总长度为奇数时, 分为[0,1], 和[2]两组,prevNodeList长度足够
    // 在总长度为偶数时, 分为[0], 和[1]两组,prevNodeList长度依然足够
    // 因此执行上不会有问题
    let currentNode = prevNodeList[0]
    while (afterNodeList.length > 0) {
        // 从最后往前弹
        let insertNode = afterNodeList.pop()
        let rawNextNode = currentNode.next
        // 插入到链表中
        insertNode.next = currentNode.next
        currentNode.next = insertNode

        currentNode = rawNextNode
    }
    return
}
