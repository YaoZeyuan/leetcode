function simplifyPath(path: string): string {
  let itemList = path.split("/");
  // 倒查
  itemList.reverse();
  let finalPathList = [];
  let skipThisLevel = 0;
  for (let item of itemList) {
    // 处理之前..的情况
    if (skipThisLevel > 0) {
      switch (item) {
        case "":
          continue;
        case ".":
          continue;
        case "..":
          skipThisLevel++;
          continue;
        default:
          skipThisLevel--;
          continue;
      }
    }

    switch (item) {
      case "":
        break;
      case ".":
        break;
      case "..":
        skipThisLevel++;
        break;
      default:
        finalPathList.push(item);
    }
  }
  return "/" + finalPathList.reverse().join("/");
}
let result71 = simplifyPath(
  // "//../../c/"
  //   "/a/./b/../../c/"
  //   "/a//b////c/d//././/.."
  "/../..///."
);
console.log(result71);
