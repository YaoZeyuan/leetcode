function intToRoman(num: number): string {
  // 属于状态机问题
  const Const_Roma_I = 1;
  const Const_Roma_V = 5;
  const Const_Roma_X = 10;
  const Const_Roma_L = 50;
  const Const_Roma_C = 100;
  const Const_Roma_D = 500;
  const Const_Roma_M = 1000;

  /**
   * 解题思路: 对num进行拆解
   * 10以内数字处理
   * 100以内数字处理
   * 1000以内数字处理
   * 4000以内数字处理
   */

  let resultList: string[] = [];

  // 1.是对4000~1000的数字进行处理
  // 得到的数介于M/MM/MMM之间
  let pos_千位 = Math.floor(num / 1000);
  if (pos_千位 !== 0) {
    switch (pos_千位) {
      case 0:
        break;
      case 1:
        resultList.push("M");
        break;
      case 2:
        resultList.push("MM");
        break;
      case 3:
        resultList.push("MMM");
        break;
    }
  }

  // 2. 对剩下的数(999~100)之间进行处理
  // 得到的数介于 MC(900)/DCCC/DCC/DC/D(500)/CD/CCC/CC/C(100)
  let pos_百位 = Math.floor((num % 1000) / 100);
  switch (pos_百位) {
    case 0:
      resultList.push("");
      break;
    case 1:
      resultList.push("C");
      break;
    case 2:
      resultList.push("CC");
      break;
    case 3:
      resultList.push("CCC");
      break;
    case 4:
      resultList.push("CD");
      break;
    case 5:
      resultList.push("D");
      break;
    case 6:
      resultList.push("DC");
      break;
    case 7:
      resultList.push("DCC");
      break;
    case 8:
      resultList.push("DCCC");
      break;
    case 9:
      resultList.push("CM");
      break;
  }

  // 1900表示 => MCM

  // 3. 然后是99~10之间的数
  let pos_十位 = Math.floor((num % 100) / 10);
  switch (pos_十位) {
    case 0:
      resultList.push("");
      break;
    case 1:
      resultList.push("X");
      break;
    case 2:
      resultList.push("XX");
      break;
    case 3:
      resultList.push("XXX");
      break;
    case 4:
      resultList.push("XL");
      break;
    case 5:
      resultList.push("L");
      break;
    case 6:
      resultList.push("LX");
      break;
    case 7:
      resultList.push("LXX");
      break;
    case 8:
      resultList.push("LXXX");
      break;
    case 9:
      resultList.push("XC");
      break;
  }

  // 4. 然后是10~0之间的数

  let pos_个位 = num % 10;
  switch (pos_个位) {
    case 0:
      resultList.push("");
      break;
    case 1:
      resultList.push("I");
      break;
    case 2:
      resultList.push("II");
      break;
    case 3:
      resultList.push("III");
      break;
    case 4:
      resultList.push("IV");
      break;
    case 5:
      resultList.push("V");
      break;
    case 6:
      resultList.push("VI");
      break;
    case 7:
      resultList.push("VII");
      break;
    case 8:
      resultList.push("VIII");
      break;
    case 9:
      resultList.push("IX");
      break;
  }

  return resultList.join("");
}
