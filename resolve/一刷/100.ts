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

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  function node2String(inputNode: TreeNode | null): string {
    if (inputNode === null) {
      return "null";
    }
    return `${inputNode.val}-${node2String(inputNode.left)}-${node2String(
      inputNode.right
    )}`;
  }
  let pStr = node2String(p);
  let qStr = node2String(q);
  console.log("pStr => ", pStr);
  console.log("qStr => ", qStr);
  return pStr == qStr;
}
