function addBinary(a: string, b: string): string {
  let aList = a.split("").reverse();
  let bList = b.split("").reverse();
  let resultList = [];
  let needPlus = false;
  for (let i = 0; i < a.length || i < b.length; i++) {
    // undefined 也视为0
    let aPosI = aList[i] === "1" ? 1 : 0;
    let bPosI = bList[i] === "1" ? 1 : 0;
    switch (aPosI + bPosI) {
      case 0:
        if (needPlus) {
          resultList.push(1);
          needPlus = false;
        } else {
          resultList.push(0);
          needPlus = false;
        }
        break;
      case 1:
        if (needPlus) {
          resultList.push(0);
          needPlus = true;
        } else {
          resultList.push(1);
          needPlus = false;
        }
        break;

      case 2:
        if (needPlus) {
          resultList.push(1);
          needPlus = true;
        } else {
          resultList.push(0);
          needPlus = true;
        }
        break;
    }
  }
  if (needPlus) {
    resultList.push(1);
  }
  return resultList.reverse().join("");
}

let result = addBinary("1", "1");
console.log("result => ", result)