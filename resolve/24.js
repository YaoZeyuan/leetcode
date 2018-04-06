/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
//  function ListNode(val) {
//   this.val = val;
//   this.next = null;
// }
//
// function list2Array (header) {
//   let result = []
//   while(header !== null){
//     result.push(header.val)
//     header = header.next
//   }
//   return result
// }
//
// function array2List (array) {
//   if(array.length === 0){
//     return null
//   }
//   let item = array[0]
//   let header = new ListNode(item)
//   array = array.slice(1)
//   let hook = header
//   for(let array_item of array){
//     let next_item = new ListNode(array_item)
//     hook.next = next_item
//     hook = next_item
//   }
//   return header
// }
//


var swapPairs = function (head) {
  if (head === null || head.next === null) {
    return head
  }
  let new_head = head.next
  // debugger
  let buf_item = head
  let last_tail_hook = head
  while(buf_item !== null && buf_item.next !== null){
    let buf_item_next = buf_item.next
    let back_up_next_loop_start_at = buf_item_next.next
    last_tail_hook.next = buf_item_next
    buf_item_next.next = buf_item
    buf_item.next = back_up_next_loop_start_at
    buf_item = back_up_next_loop_start_at
    last_tail_hook = buf_item_next.next
  }


  return new_head

};