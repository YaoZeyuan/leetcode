/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  if (head.next === null) {
    if (n >= 1) {
      return null
    } else {
      return head
    }
  }

  let item_list = []
  while (head !== null) {
    item_list.push(head)
    head = head.next
  }

  let reverse_list = item_list.reverse()
  delete reverse_list[n - 1]

  let hook = null
  let hook_now = null
  for (let item of reverse_list) {
    if(item){
      let new_head = new ListNode(item.val)
      new_head.next = hook
      hook = new_head
      hook_now = new_head
    }
  }

  return hook_now
};