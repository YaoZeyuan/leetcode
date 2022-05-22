function fullJustify(words: string[], maxWidth: number): string[] {
  // 正常格式化文本
  function format(inputList: string[]) {
    // 先看有多少个字符
    let wordCount = inputList.length;
    let charCount = inputList.join("").length;
    let remainSpaceCount = maxWidth - charCount;

    // 每个单词间至少要插入几个空格
    let minPerWordSpaceCount = Math.floor(remainSpaceCount / (wordCount - 1));
    // 剩余未插入的空格(需要从左到右, 依次填补进单词间)
    let remainWordSpaceCount = remainSpaceCount % (wordCount - 1);

    // 只有一个单词的话, 直接左对齐即可
    if (wordCount === 1) {
      return inputList[0] + " ".repeat(remainSpaceCount);
    }
    let formatStr = inputList[0];
    let remainInputList = inputList.slice(1);
    for (let word of remainInputList) {
      let space = " ".repeat(minPerWordSpaceCount);
      if (remainWordSpaceCount > 0) {
        space = " " + space;
        remainWordSpaceCount--;
      }
      formatStr = formatStr + space + word;
    }
    return formatStr;
  }

  // 格式化最后一行文本, 直接右对齐即可
  function formatLastLine(inputList: string[]) {
    let foramtStr = inputList.join(" ");
    foramtStr = foramtStr + " ".repeat(maxWidth - foramtStr.length);
    return foramtStr;
  }

  // 第一步: 首先将输入字符按总长度不大于maxWidth分解为字符串组
  let wordGroupList: string[][] = [];
  let wordGroupBuffer: string[] = [];
  let wordGroupBufferCharLength = 0;
  for (let word of words) {
    // 判断分组中是否还能添加新单词
    // 组内文本+用于分割的空格 总长度要小于maxWidth

    let newAddWordLength = word.length;
    if (wordGroupBuffer.length > 0) {
      // 如果缓存区内已有单词, 则新加入单词长度应该加一(留出用于分割的空格的长度)
      newAddWordLength = newAddWordLength + 1;
    }

    if (wordGroupBufferCharLength + newAddWordLength > maxWidth) {
      // 如果长度溢出, 就新起一行
      wordGroupList.push(wordGroupBuffer);
      wordGroupBuffer = [word];
      wordGroupBufferCharLength = word.length;
    } else {
      // 否则直接加入到当前行中, 同时行内总文本长度 + newAddWordLength
      wordGroupBuffer.push(word);
      wordGroupBufferCharLength = wordGroupBufferCharLength + newAddWordLength;
    }
  }
  // 最后, 如果还有剩余未归并字符, 则将剩余字符一块push进容器中
  if (wordGroupBuffer.length > 0) {
    wordGroupList.push(wordGroupBuffer);
  }

  // 第二步: 针对每个数组进行format
  let result: string[] = [];
  for (let i = 0; i < wordGroupList.length; i++) {
    let formatStr = format(wordGroupList[i]);
    if (i === wordGroupList.length - 1) {
      formatStr = formatLastLine(wordGroupList[i]);
    }
    result.push(formatStr);
  }

  return result;
}

let result68 = fullJustify(
  ["This", "is", "an", "example", "of", "text", "justification."],
  16
);
for (let item of result68) {
  console.log(item);
}
