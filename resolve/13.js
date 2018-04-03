let roman_int_map = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000,
  '' : 0, // 没有表示0
}

function roman2int (roman) {
  if(roman.length > 1){
    if(roman_int_map[roman[0]] >= roman_int_map[roman.slice(1,2)]){
      return roman_int_map[roman[0]] + roman2int(roman.slice(1))
    }else{
      return roman_int_map[roman.slice(1,2)] - roman_int_map[roman[0]] + roman2int(roman.slice(2))
    }

  }else{
    return roman_int_map[roman]
  }
}