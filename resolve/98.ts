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

function isValidBST(root: TreeNode | null): boolean {
  function getChildNodeList(node: TreeNode | null): number[] {
    if (node === null) {
      return [];
    }
    let list = [node.val];
    if (node.left !== null) {
      list = [...list, ...getChildNodeList(node.left)];
    }
    if (node.right !== null) {
      list = [...list, ...getChildNodeList(node.right)];
    }
    return list;
  }

  if (root === null) {
    return true;
  }
  if (root.left !== null) {
    let leftNodeList = getChildNodeList(root.left);
    for (let item of leftNodeList) {
      if (root.val <= item) {
        return false;
      }
    }
    if (isValidBST(root.left) === false) {
      return false;
    }
  }
  if (root.right !== null) {
    let rightNodeList = getChildNodeList(root.right);
    for (let item of rightNodeList) {
      if (root.val >= item) {
        return false;
      }
    }
    if (isValidBST(root.right) === false) {
      return false;
    }
  }
  return true;
}
