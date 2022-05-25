function isValid(s: string): boolean {
  type Type_Char = "(" | ")" | "[" | "]" | "{" | "}";
  let stack: Type_Char[] = [];
  // 从左到右进行压栈/出栈处理
  // 要求: 1. 最终for循环结束时, 栈必须为空
  //      2.  每次弹出时, 都必须互相匹配
  for (let pos = 0; pos < s.length; pos = pos + 1) {
    let testChar: Type_Char = s[pos] as Type_Char;
    switch (testChar) {
      case "(":
      case "[":
      case "{":
        stack.push(testChar);
        break;
      case ")":
      case "}":
      case "]":
        {
          if (stack.length === 0) {
            return false;
          } else {
            let popChar = stack.pop();
            if (testChar === ")" && popChar !== "(") {
              return false;
            }
            if (testChar === "]" && popChar !== "[") {
              return false;
            }
            if (testChar === "}" && popChar !== "{") {
              return false;
            }
          }
        }
        break;
    }
  }
  return stack.length === 0;
}
