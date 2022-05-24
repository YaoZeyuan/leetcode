function reverse(x: number): number {
  const Const_Max = Math.pow(2, 31) - 1;
  const Const_Min = 0 - Math.pow(2, 31);

  let xCharList = `${x}`.split("");
  let resultFlag = xCharList[0] === "-" ? false : true;
  if (resultFlag === false) {
    // 移除符号
    xCharList.shift();
  }
  let storageNum = 0;
  let counter = 1;
  for (let item of xCharList) {
    let val = parseInt(item);
    storageNum += val * counter;
    counter = counter * 10;
  }

  // 同步符号
  if (resultFlag === false) {
    storageNum = -storageNum;
  }

  if (storageNum < Const_Min || storageNum > Const_Max) {
    storageNum = 0;
  }
  return storageNum;
}

// console.log(reverse(-23333));
