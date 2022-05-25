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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // 使用快慢指针方案
  // 慢指针在快指针出发n个单位后出发,则, 当快指针抵达重点时, 慢指针位置即为该点

  let fastPoint = head;
  // 先指向哑节点
  let dummyNode: ListNode = {
    val: 0,
    next: head,
  };
  let slowPoint = dummyNode;

  // 先前进n个
  for (
    let startCounter = 0;
    startCounter < n;
    startCounter = startCounter + 1
  ) {
    fastPoint = fastPoint.next;
  }
  while (fastPoint !== null) {
    fastPoint = fastPoint.next;
    slowPoint = slowPoint.next;
  }
  slowPoint.next = slowPoint.next.next;

  if (slowPoint === dummyNode) {
    // 没有往后移动, 则直接返回哑节点的下一节点
    return slowPoint.next;
  } else {
    // 返回head即可
    return head;
  }
}
