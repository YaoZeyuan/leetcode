function maxArea(height: number[]): number {
  // 双指针法解题
  //
  /**
   * 其实有两种思路
   * 1.  假设从天而降一根水平线, 那么会依次被柱子顶住. 其触及一根柱子的顶点且和另一根柱子相交时, 为一种可能的盛水方案
   * 2.  使用双指针法
   *     1.    该问题并非不能暴力求解, 只是暴力求解复杂度为O(n²), 会超出预期
   *     2.    所以可以使用双指针法, 以起到降低复杂度的效果.
   *     3.    基本思路:
   *           1.   两个指针分别处于最左和最右, 此时可盛水面积为 Min(L, R) * (L-R)
   *           2.   移动将L/R中较小的指针向对侧移动 => 理由: 由于L-R为当前最大长度, 因此对于所有移动较大指针的方案, 无论如何也不会超过T(小) * (L-R)的值, 因此可以省略对移动较大指针方案的探索->所以只需要考虑移动较小指针中是否有可能值即可
   *           3.   移动指针, 直到L和R相交. 拿到所有可能值中最大的结果, 即为全局最优结果
   *     4.    思路概况: 论如何合理剪枝.
   */

  let l_Index = 0;
  let r_Index = height.length - 1;

  // 工具函数, 方便快速计算体积
  function getContainerArea(startPos: number, endPos: number) {
    if (startPos >= endPos) {
      return 0;
    }
    let length = endPos - startPos;
    return length * Math.min(height[startPos], height[endPos]);
  }

  let currentMaxArea = 0;
  // 开始循环
  while (l_Index < r_Index) {
    let area = getContainerArea(l_Index, r_Index);
    currentMaxArea = Math.max(currentMaxArea, area);

    // 高度较小的那一侧向内前进
    if (height[l_Index] < height[r_Index]) {
      l_Index = l_Index + 1;
    } else {
      r_Index = r_Index - 1;
    }
  }
  return currentMaxArea;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
