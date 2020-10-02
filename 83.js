/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (head === null || head.next === null) {
    return head;
  }

  let currentNode = head;
  while (currentNode !== null && currentNode.next !== null) {
    while (currentNode.next !== null && currentNode.val === currentNode.next.val) {
      currentNode.next = currentNode.next.next;
    }
    currentNode = currentNode.next;
  }
  return head;
};
