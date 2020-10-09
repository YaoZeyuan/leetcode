class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function generateTrees(n: number): Array<TreeNode | null> {
  // 不存在该情况
  if (n < 1) {
    return [];
  }
  let resultMap: Map<string, TreeNode | null> = new Map();

  // 基于中序遍历生成二叉搜索树的key, 便于检测唯一性
  function generateKey(node: TreeNode | null): string {
    if (node === null) {
      return "null";
    }
    return `${node.val},${generateKey(node.left)},${generateKey(node.right)}`;
  }
  // 复制节点
  function copyNode(node: TreeNode | null): TreeNode | null {
    if (node === null) {
      return null;
    }
    let newNode = new TreeNode(node.val, null, null);
    newNode.left = copyNode(node.left);
    newNode.right = copyNode(node.right);
    return newNode;
  }

  function addItemIntoNode(
    head: TreeNode | null,
    option: number
  ): TreeNode | null {
    if (head === null) {
      return null;
    }
    let currentNode = head;
    while (currentNode !== null) {
      if (option > currentNode.val) {
        if (currentNode.right === null) {
          currentNode.right = new TreeNode(option, null, null);
          return head;
        } else {
          currentNode = currentNode.right;
        }
      } else {
        if (currentNode.left === null) {
          currentNode.left = new TreeNode(option, null, null);
          return head;
        } else {
          currentNode = currentNode.left;
        }
      }
    }
    return currentNode;
  }

  function generateNodeTree(head: TreeNode | null, optionList: number[]): void {
    if (optionList.length === 0) {
      // 添加完成
      let key = generateKey(head);
      //   console.log("key =>", key)
      //   console.log("head =>", head)
      if (resultMap.has(key) === false) {
        resultMap.set(key, head);
      }
      return;
    }
    // 否则, 则向head内添加数据
    for (let i = 0; i < optionList.length; i++) {
      let option = optionList[i];

      let otherOptionList = [...optionList];
      // 移除第i位元素, 形成新optionList
      otherOptionList.splice(i, 1);
      let newHead = copyNode(head);
      if (head === null) {
        newHead = new TreeNode(option, null, null);
        generateNodeTree(newHead, otherOptionList);
      } else {
        // 将当前option加到TreeNode树中
        addItemIntoNode(newHead, option);
        generateNodeTree(newHead, otherOptionList);
      }
    }
  }

  let optionList = [];
  for (let i = 1; i <= n; i++) {
    optionList.push(i);
  }
  generateNodeTree(null, optionList);
  let resultList = [];
  for (let item of resultMap.values()) {
    resultList.push(item);
  }
  return resultList;
}

let result95 = generateTrees(3);
console.log(result95.length);
