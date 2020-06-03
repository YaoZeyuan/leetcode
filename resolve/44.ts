function isMatch(s: string, p: string): boolean {
  const SingleFlag = "?";
  const MuiltFlag = "*";
  let counter = 0;

  /**
   * 检测两段文本是否匹配
   * @param s
   * @param p
   */
  function isTwoStringMatchWithSingleFlag(s: string, p: string) {
    if (s.length !== p.length) {
      return false;
    }
    for (let i = 0; i < s.length; i++) {
      if (p[i] === SingleFlag) {
        continue;
      } else {
        if (s[i] !== p[i]) {
          return false;
        }
        continue;
      }
    }
    return true;
  }

  /**
   * 返回匹配完p之后的剩余s部分, 如果不能匹配, 返回false
   * @param s
   * @param p
   */
  function findMatchPatternRemain(s: string, p: string) {
    // 在s中, 寻找第一个可以和p匹配的段, 返回剩余段落, p中只会出现?
    if (p === "") {
      return s;
    }
    if (s === "" || s.length < p.length) {
      return false;
    }

    // 如果没有满足的地方, 返回false
    for (let i = 0; i <= s.length - p.length; i++) {
      let testString = s.slice(i, i + p.length);
      if (isTwoStringMatchWithSingleFlag(testString, p) === true) {
        return s.slice(i + p.length);
      }
    }
    // 没有找到可匹配部分
    return false;
  }

  function canMatch(s: string, p: string): boolean {
    // 合并多余*
    p = p.replace(/\*+/g, "*");

    counter++;

    // 确保p[0]一定有值
    if (p === "" && s !== "") {
      return false;
    }
    if (p === "" && s === "") {
      return true;
    }

    // console.log("----------------");
    // console.log(`第${counter}次正经比较`);
    // console.log(`s => ${s}`);
    // console.log(`p => ${p}`);

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
    let newP = p.slice(1);
    if (newP === "") {
      // *可以匹配所有
      return true;
    }

    // 加快运算速度v2
    // 对于*类型, 本质问题是, 将模式字符串按*分开, 原字符串是否可以按顺序, 依次和剩余子段匹配成功
    // 如果剩余字段不能完全匹配, 则一定匹配不成功
    let splitPatternList = newP.split("*");
    let remainPattern: string | boolean = s;
    for (let testPattern of splitPatternList) {
      let matchResult = findMatchPatternRemain(remainPattern, testPattern);
      if (matchResult === false) {
        return false;
      }
      remainPattern = matchResult;
    }
    // 如果可以完全匹配, 则要分两种情况
    // 如果最后一位是*, 一定是匹配成功
    if (p[p.length - 1] === MuiltFlag) {
      return true;
    }
    // 如果最后一位不是*, 需要检测末尾是否可以匹配成功, 成功为true, 否则为false
    // 首位不需要考虑, 走到这里, 首位一定有能匹配上的部分(首位之前有*存在), 只需考虑末位
    let lastMatchPattern = splitPatternList[splitPatternList.length - 1];
    let lastS = s.slice(s.length - lastMatchPattern.length);
    let finalMatchResult = isTwoStringMatchWithSingleFlag(
      lastS,
      lastMatchPattern
    );
    return finalMatchResult;
  }
  return canMatch(s, p);
}

function test() {
  let s =
    "abbabaaabbabbaababbabbbbbabbbabbbabaaaaababababbbabababaabbababaabbbbbbaaaabababbbaabbbbaabbbbababababbaabbaababaabbbababababbbbaaabbbbbabaaaabbababbbbaababaabbababbbbbababbbabaaaaaaaabbbbbaabaaababaaaabb";
  let p =
    "abbabaaabbabba*babbbabbbabaaaaababababbbabababaabbababaabbbbbbaaaabababbbaabbbbaabbbbababababb*bbababababbbbaaabbbbbabaaaabbaba***********bbbbba*abbbbbaa*ababa?aa??b";
  let result = isMatch(s, p);
  console.log("result =>", result);
}
test();
