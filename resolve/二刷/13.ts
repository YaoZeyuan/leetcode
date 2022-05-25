function romanToInt(s: string): number {
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    let char = s[i];

    switch (char) {
      case "I":
        if (s[i + 1] === "X") {
          result = result + 9;
          i = i + 1;
        } else if (s[i + 1] === "V") {
          result = result + 4;
          i = i + 1;
        } else {
          result = result + 1;
        }
        break;
      case "V":
        result = result + 5;
        break;
      case "X":
        if (s[i + 1] === "C") {
          result = result + 90;
          i = i + 1;
        } else if (s[i + 1] === "L") {
          result = result + 40;
          i = i + 1;
        } else {
          result = result + 10;
        }
        break;
      case "L":
        result = result + 50;
        break;
      case "C":
        if (s[i + 1] === "M") {
          result = result + 900;
          i = i + 1;
        } else if (s[i + 1] === "D") {
          result = result + 400;
          i = i + 1;
        } else {
          result = result + 100;
        }
        break;
      case "D":
        result = result + 500;
        break;
      case "M":
        result = result + 1000;
        break;
    }
  }
  return result;
}

for (let item of [
  "III",
  "IV",
  "IX",
  //
  "LVIII",
  "MCMXCIV",
]) {
  console.log(`${item}=>${romanToInt(item)}`);
}
