function isMatch(s: string, p: string): boolean {
  const SingleFlag = "?";
  const MuiltFlag = "*";
  function canMatch(s: string, p: string): boolean {
    // 确保p[0]一定有值
    if (p === "" && s !== "") {
      return false;
    }
    if (p === "" && s === "") {
      return true;
    }
    let firstChar = p[0];
    if (firstChar !== SingleFlag && firstChar !== MuiltFlag) {
      // 若模式字符串第一个元素非模板字符, 则需要100%匹配
      // 直接进行检测
      if (s[0] !== firstChar) {
        return false;
      } else {
        // 检测通过, 检查后续case
        return canMatch(s.slice(1), p.slice(1));
      }
    }
    if (firstChar === SingleFlag) {
      // 若为单字符匹配
      if (s === "") {
        // 没有任何字母可供匹配
        return false;
      } else {
        // 各减一个字, 继续匹配
        return canMatch(s.slice(1), p.slice(1));
      }
    }
    // 一定为多字母匹配
    let newP = p.slice(1);
    if (newP === "") {
      // *可以匹配所有
      return true;
    }
    while (newP.length > 0 && newP[0] === MuiltFlag) {
      // 合并多个*
      newP = newP.slice(1);
    }

    // 依次检测s从去除0个到去除n个是否可以匹配
    // 只要能有一种情况可以匹配, 即为匹配成功
    for (let checkLength = 0; checkLength <= s.length; checkLength++) {
      let newS = s.slice(checkLength);
      if (canMatch(newS, newP) === true) {
        return true;
      }
    }
    // 所有case都不成功, 为false
    return false;
  }
  return canMatch(s, p);
}

function test() {
  let s = "aaabbbaabaaaaababaabaaabbabbbbbbbbaabababbabbbaaaaba";
  let p = "a*******b";
  let result = isMatch(s, p);
  console.log("result =>", result);
}
test();
