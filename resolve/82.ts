class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
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
  if (head === null) {
    return head;
  }
  let realHead = null;
  let currentNode: ListNode | null = head;
  let isNextNodeNeedRemove = false;
  // 直接使用数组记录每一个需要保留的元素
  let remainNodeList = [];
  while (currentNode !== null) {
    // 遍历链表
    if (currentNode.next !== null && currentNode.val === currentNode.next.val) {
      // 如果当前元素值和下一个元素重复, 则打开移除flag, 同时径直向后移动
      isNextNodeNeedRemove = true;
      currentNode = currentNode.next;
      continue;
    } else {
      if (isNextNodeNeedRemove) {
        currentNode = currentNode.next;
        isNextNodeNeedRemove = false;
      } else {
        // 如果该元素符合保留条件, 则手工加入列表中
        remainNodeList.push(currentNode);
        currentNode = currentNode.next;
      }
    }
  }

  if (remainNodeList.length === 0) {
    return null;
  }

  // 修正next值
  for (let i = 0; i < remainNodeList.length; i++) {
    if (remainNodeList[i + 1] === undefined) {
      remainNodeList[i].next = null;
    } else {
      remainNodeList[i].next = remainNodeList[i + 1];
    }
  }
  realHead = remainNodeList[0];

  return realHead;
}
