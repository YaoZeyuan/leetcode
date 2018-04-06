/**
 * 翻转链表(只能用常数的存储空间, 所以采用的冒泡排序)
 * @param head
 * @param k
 * @return {*}
 */
var reverseList = function(head, k){
  let k_backup = k
  if(k <= 0 || head === null){
    return head
  }
  let item = head
  let next_item = head.next
  let buf
  while (k > 0){
    buf = item.val
    item.val = next_item.val
    next_item.val = buf
    item = item.next
    next_item = next_item.next
    k--
  }
  return reverseList(head, k_backup - 1)
};



/**
 * 关键 => 没规定过非要换指针啊
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  if (head === null || head.next === null) {
    return head
  }
  let k_backup = k
  let head_backup = head
  let target_item = head
  let last_item = null
  while (head_backup !== null) {

    // 先减为敬
    k = k - 1
    while (k > 0) {
      last_item = target_item
      target_item = target_item.next
      k = k - 1
      if (target_item === null || (k > 0 && target_item.next === null)) {
        // 越界了
        return head
      }
    }
    reverseList(head_backup, k_backup - 1)

    // 对后续的链表再来一次循环
    head_backup = target_item.next
    target_item = target_item.next
    last_item = null
    k = k_backup
  }

  return head
};