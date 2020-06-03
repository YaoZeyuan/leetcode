function groupAnagrams(strs: string[]): string[][] {
  let collection = new Map();
  for (let str of strs) {
    let key = str.split("").sort().join("");
    if (collection.has(key)) {
      collection.get(key).push(str);
    } else {
      collection.set(key, [str]);
    }
  }
  let result = [];
  for (let item of collection.values()) {
    result.push(item);
  }

  return result;
}
