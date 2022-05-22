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

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  // 1. 实现链表转数组, 方便统一操作
  // 2. 将数组反转, 方便从最后一位开始进行处理
  // 3. 按位计算两数和, 将结果录入到新数组中
  // 4. 将数组转为链表

  // 先提供工具函数
  function transList2Array(listNode: ListNode | null): number[] {
    let resultList: number[] = [];
    let currentNode = listNode;
    while (currentNode !== null) {
      resultList.push(currentNode.val);
      currentNode = currentNode.next;
    }
    return resultList;
  }

  function transArray2List(numberList: number[]): ListNode | null {
    if (numberList.length === 0) {
      return null;
    }

    let headNode = new ListNode(numberList[0], null);
    let prevNode = headNode;
    let currentNode = null;
    for (let index = 1; index < numberList.length; index++) {
      currentNode = new ListNode(numberList[index], null);
      prevNode.next = currentNode;
      prevNode = currentNode;
    }
    return headNode;
  }

  // 开始实际计算->本来就是逆序, 不需要再进行倒转
  let reverseNumberList_1 = transList2Array(l1);
  let reverseNumberList_2 = transList2Array(l2);

  let resultList: number[] = [];
  // 记录进位数
  let increaseNum = 0;
  for (
    let index = 0;
    index < reverseNumberList_1.length || index < reverseNumberList_2.length;
    index++
  ) {
    let addResult = 0;
    if (reverseNumberList_1[index] === undefined) {
      addResult = reverseNumberList_2[index] + increaseNum;
    } else if (reverseNumberList_2[index] === undefined) {
      addResult = reverseNumberList_1[index] + increaseNum;
    } else {
      // 两位都有值
      addResult =
        reverseNumberList_1[index] + reverseNumberList_2[index] + increaseNum;
    }

    // 最终结果

    // 当前位数
    let currentNum = addResult % 10;
    // 下一轮进位值
    increaseNum = Math.floor(addResult / 10);
    resultList.push(currentNum);
  }
  // 全部计算完成后, 将进位值补上
  if (increaseNum > 0) {
    resultList.push(increaseNum);
  }

  // 转回list列表
  let finalListHead = transArray2List(resultList);

  return finalListHead;
}
