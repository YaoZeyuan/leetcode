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

function reverseBetween(
  head: ListNode | null,
  m: number,
  n: number
): ListNode | null {
  if (head === null) {
    return null;
  }
  let counter = 1;
  // 第0位指针
  let topHead: ListNode | null = new ListNode(0, head);

  let beforeNode: ListNode | null = topHead;
  let currentNode: ListNode | null = head;
  let node_before_m: ListNode | null = beforeNode;
  let node_m: ListNode | null = currentNode;
  let node_n_after: ListNode | null = null;
  let node_n: ListNode | null = null;

  // 遍历链表, 拿到关键节点
  while (counter <= n) {
    let currentProcessNode = currentNode;
    // @ts-ignore
    let nextItem = currentNode.next;
    if (m < counter && counter < n) {
      // @ts-ignore
      currentProcessNode.next = beforeNode;
    }

    if (counter === m - 1) {
      // @ts-ignore
      node_before_m = currentNode;
      // @ts-ignore
      node_m = currentNode.next;
    }
    if (counter === n) {
      // @ts-ignore
      node_n = currentNode;
      // @ts-ignore
      node_n_after = currentNode.next;

      // @ts-ignore
      node_n.next = beforeNode;
      // @ts-ignore
      node_before_m.next = node_n;
      // @ts-ignore
      node_m.next = node_n_after;
    }

    beforeNode = currentProcessNode;
    // @ts-ignore
    currentNode = nextItem;
    counter++;
  }
  return topHead.next;
}

function createList(optionList: number[]) {
  let head = new ListNode(0, null);
  let beforeNode = head;
  for (let item of optionList) {
    let node = new ListNode(item, null);
    beforeNode.next = node;
    beforeNode = node;
  }
  return head.next;
}

let node = createList([1, 2, 3, 4, 5]);

let newNode = reverseBetween(node, 2, 4);
console.log(newNode);
