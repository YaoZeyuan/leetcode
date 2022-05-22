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
  // 计算链表长度
  function getListLength(head: ListNode | null) {
    let length = 0;
    let currentNode = head;
    while (currentNode !== null) {
      length++;
      currentNode = currentNode.next;
    }
    return length;
  }
  if (head === null) {
    return head;
  }

  let listLength = getListLength(head);

  // 移动距离为0时, 不需要考虑
  if (k === 0 || listLength === 0) {
    return head;
  }

  // 真实移动距离为 k % listLength
  let realOffset = k % listLength;

  // 真实需要移动距离为0时, 也不需要考虑
  if (realOffset === 0) {
    return head;
  }

  // 问题实质是把链表最后realOffset个数移动到最前方
  // 从0开始计数
  let newHeadStartAt = listLength - realOffset;

  let newHeadNode: ListNode;
  let newLastTrailNode: ListNode;
  let oldLastTrailNode: ListNode;
  let currentNode: ListNode;
  currentNode = head;
  for (let i = 0; i < listLength; i++) {
    if (i === newHeadStartAt - 1) {
      newLastTrailNode = currentNode;
    }
    // 不能用switch, 因为newHeadStartAt 可能等于listLength - 1
    if (i === newHeadStartAt) {
      newHeadNode = currentNode;
    }
    if (i === listLength - 1) {
      oldLastTrailNode = currentNode;
    }
    // @ts-ignore
    currentNode = currentNode.next;
  }
  // 然后简单处理即可
  // @ts-ignore
  newLastTrailNode.next = null;
  // @ts-ignore
  oldLastTrailNode.next = head;
  // @ts-ignore
  return newHeadNode;
}
