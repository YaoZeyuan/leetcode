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

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  // 解题思路:
  // 从L1和L2中, 找到一个较小值作为head, 记录下来
  // 比较当前的currentL1和currentL2, 将较小值作为next, 然后前进
  // 如果有一方是null, 则忽略比较
  // 当双方都是null时, 完成合并, 返回结果

  let currentL1 = list1;
  let currentL2 = list2;

  // 假设其为一个哑节点
  let mergeHead = {
    val: 0,
    next: null,
  };

  let prevCurrentNode = mergeHead;
  let currentNode = {
    val: 0,
    next: null,
  };
  while (currentL1 !== null || currentL2 !== null) {
    if (currentL1 === null) {
      currentNode = currentL2;
      prevCurrentNode.next = currentNode;
      prevCurrentNode = currentNode;
      currentL2 = currentL2.next;
      continue;
    }
    if (currentL2 === null) {
      currentNode = currentL1;
      prevCurrentNode.next = currentNode;
      prevCurrentNode = currentNode;
      currentL1 = currentL1.next;
      continue;
    }

    if (currentL1.val < currentL2.val) {
      currentNode = currentL1;
      prevCurrentNode.next = currentNode;
      prevCurrentNode = currentNode;
      currentL1 = currentL1.next;
    } else {
      currentNode = currentL2;
      prevCurrentNode.next = currentNode;
      prevCurrentNode = currentNode;
      currentL2 = currentL2.next;
    }
  }
  return mergeHead.next;
}
