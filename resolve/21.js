

function list2Array (header) {
  let result = []
  while(header !== null){
    result.push(header.val)
    header = header.next
  }
  return result
}

function array2List (array) {
  if(array.length === 0){
    return null
  }
  let item = array[0]
  let header = new ListNode(item)
  array = array.slice(1)
  let hook = header
  for(let array_item of array){
    let next_item = new ListNode(array_item)
    hook.next = next_item
    hook = next_item
  }
  return header
}
var mergeKLists = function(lists) {
  let transfer_list = []
  for(let list of lists){
    let array_list = list2Array(list)
    transfer_list = transfer_list.concat(array_list)
  }
  transfer_list = transfer_list.sort((a,b)=>{return a-b})
  return array2List(transfer_list)
};


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  return mergeKLists([l1,l2])
};