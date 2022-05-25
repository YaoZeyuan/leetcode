function longestCommonPrefix(strs: string[]): string {
  /**
   * 要求是最长公共前缀, 而非最长公共子串, 所以只要进行匹配即可
   */

  let maxLength = Math.min(...strs.map((item) => item.length));
  let resultList: string[] = [];
  /**
   * 检测字符串在指定位置上是否相同
   * @param pos
   * @returns
   */
  function checkPos(pos: number) {
    let result = false;
    let targetChar = strs[0][pos];
    if (targetChar === undefined) {
      return false;
    }
    for (let item of strs) {
      if (item[pos] !== targetChar) {
        return false;
      }
    }
    return true;
  }
  for (let i = 0; i < maxLength; i++) {
    if (checkPos(i)) {
      resultList.push(strs[0][i]);
    } else {
      return resultList.join("");
    }
  }
  return resultList.join("");
}
